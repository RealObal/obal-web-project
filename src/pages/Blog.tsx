import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, Search } from 'lucide-react';
import { PortableText, type PortableTextBlock, type PortableTextComponents, type PortableTextMarkComponentProps, type PortableTextTypeComponentProps } from '@portabletext/react';
import type { TypedObject } from '@portabletext/types';
import type { SanityImageSource } from '@sanity/image-url';
import { safeSanityFetch, urlFor } from '../lib/sanity';
import { Seo } from '../lib/seo';
import { DEFAULT_IMAGE, SITE_URL, breadcrumbSchema } from '../lib/seoData';

interface SanityImageValue extends TypedObject { asset?: { _ref?: string }; alt?: string; caption?: string; attribution?: string }
interface LinkMark extends TypedObject { href?: string }
interface CalloutValue extends TypedObject { label?: string; body?: string }
interface BlogPost { _id: string; title: string; slug?: { current?: string }; mainImage?: SanityImageSource; body?: PortableTextBlock[]; publishedAt?: string; createdAt?: string; updatedAt?: string; authorName?: string; categories?: string[] }

const postFields = `_id,title,slug,mainImage,body,publishedAt,"createdAt":_createdAt,"updatedAt":_updatedAt,"authorName":author->name,"categories":categories[]->title`;

function plainText(body: PortableTextBlock[] = []) {
  return body.filter((block) => block._type === 'block').map((block) => block.children?.map((child) => ('text' in child ? child.text : '')).join('') || '').join(' ').trim();
}

function safeHref(href?: string) {
  if (!href) return undefined;
  try { const url = new URL(href, SITE_URL); return ['http:', 'https:', 'mailto:'].includes(url.protocol) ? url.href : undefined; } catch { return undefined; }
}

const portableComponents: PortableTextComponents = {
  marks: { link: ({ value, children }: PortableTextMarkComponentProps<LinkMark>) => { const href = safeHref(value?.href); return href ? <a href={href} target="_blank" rel="noopener noreferrer">{children}<ExternalLink size={13}/></a> : <>{children}</>; } },
  types: {
    image: ({ value }: PortableTextTypeComponentProps<SanityImageValue>) => value?.asset?._ref ? <figure><img src={urlFor(value as SanityImageSource).width(1200).fit('max').auto('format').url()} alt={value.alt || ''} loading="lazy"/>{(value.caption || value.attribution) && <figcaption>{[value.caption, value.attribution].filter(Boolean).join(' · ')}</figcaption>}</figure> : null,
    callout: ({ value }: PortableTextTypeComponentProps<CalloutValue>) => <aside>{value.label && <strong>{value.label}</strong>}<p>{value.body}</p></aside>,
  },
};

function Header() { return <header className="site-header"><div className="container header-inner"><Link className="brand" to="/" aria-label="Ronald Obal home">ro<span>.</span></Link><nav aria-label="Main navigation"><a href="/#work">Selected work</a><a href="/#toolkit">Toolkit</a><Link to="/blog">Insights</Link></nav><a className="header-contact" href="/#contact">Let’s connect<ArrowUpRight size={17}/></a></div></header>; }
function Footer() { return <footer className="container footer"><Link to="/">Ronald Obal · Research &amp; M&amp;E</Link><span>Thoughtful evidence. Meaningful progress.</span><a href="/#contact">Get in touch<ArrowUpRight size={14}/></a></footer>; }
function Loading() { return <p className="blog-status" role="status">Loading insights…</p>; }

function BlogArticle({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => { setStatus('loading'); safeSanityFetch<BlogPost | null>(`*[_type == "post" && slug.current == $slug][0]{${postFields}}`, { slug }, null).then((result) => { setPost(result); setStatus('ready'); }).catch(() => setStatus('error')); }, [slug, attempt]);
  const description = post ? plainText(post.body).slice(0, 158) || `Read ${post.title} by Ronald Obal.` : 'Research and programme-learning insights by Ronald Obal.';
  const path = `/blog/${slug}`;
  const image = post?.mainImage ? urlFor(post.mainImage).width(1200).height(630).fit('crop').auto('format').url() : DEFAULT_IMAGE;
  const published = post?.publishedAt || post?.createdAt;
  const articleSchema = post ? { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description, url: `${SITE_URL}${path}`, image, datePublished: published, dateModified: post.updatedAt || published, author: { '@type': 'Person', name: post.authorName || 'Ronald Obal', url: `${SITE_URL}/about` } } : undefined;
  return <><Header/><main className="container blog-page"><Link className="text-button" to="/blog">← All insights</Link>{status === 'loading' && <Loading/>}{status === 'error' && <div className="empty-state"><h1>Insights are temporarily unavailable.</h1><p>The Sanity content service could not be reached.</p><button className="button secondary" onClick={() => setAttempt((value) => value + 1)}>Try again</button></div>}{status === 'ready' && !post && <div className="empty-state"><h1>Article not found.</h1><p>This address may have changed or the article may be unpublished.</p><Link className="button primary" to="/blog">Browse all insights</Link></div>}{post && <><Seo title={`${post.title} | Ronald Obal`} description={description} path={path} type="article" image={image} jsonLd={[articleSchema, breadcrumbSchema([{name:'Ronald Obal',path:'/'},{name:'Insights',path:'/blog'},{name:post.title,path}])]}/><article className="blog-article"><span className="eyebrow">{post.categories?.join(' / ') || 'MEAL INSIGHTS & FIELD NOTES'}</span><h1>{post.title}</h1><p className="article-meta">{post.authorName || 'Ronald Obal'}{published ? ` · ${new Date(published).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })}` : ''}</p>{post.mainImage && <img className="article-image" src={urlFor(post.mainImage).width(1200).fit('max').auto('format').url()} alt={post.title}/>}<PortableText value={post.body || []} components={portableComponents}/></article></>}</main><Footer/></>;
}

function BlogListing() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All topics');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => { setStatus('loading'); safeSanityFetch<BlogPost[] | null>(`*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt,_createdAt) desc){${postFields}}`, undefined, null).then((result) => { if (result === null) setStatus('error'); else { setPosts(result); setStatus('ready'); } }); }, [attempt]);
  const categories = useMemo(() => ['All topics', ...new Set(posts.flatMap((post) => post.categories || []))], [posts]);
  const filtered = posts.filter((post) => (category === 'All topics' || post.categories?.includes(category)) && `${post.title} ${plainText(post.body)}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <><Header/><main className="container blog-page"><Seo title="MEAL Insights & Field Notes | Ronald Obal" description="Insights on monitoring, evaluation, accountability, research, learning, and community development by Ronald Obal." path="/blog" jsonLd={breadcrumbSchema([{name:'Ronald Obal',path:'/'},{name:'Insights',path:'/blog'}])}/><Link className="text-button" to="/">← Back to portfolio</Link><span className="eyebrow">MEAL INSIGHTS & FIELD NOTES</span><h1>Learning from<br/><em>practice.</em></h1><p className="blog-intro">Reflections on monitoring, evaluation, accountability, research, and community development—published through the original Sanity CMS.</p>{status === 'loading' && <Loading/>}{status === 'error' && <div className="empty-state"><h2>Insights are temporarily unavailable.</h2><p>The Sanity content service could not be reached. No static articles have been substituted.</p><button className="button secondary" onClick={() => setAttempt((value) => value + 1)}>Try again</button></div>}{status === 'ready' && <><div className="blog-filters"><label className="search-field"><Search size={19}/><span className="sr-only">Search insights</span><input placeholder="Search insights…" value={query} onChange={(event) => setQuery(event.target.value)}/></label><label>Topic<select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label></div><p role="status">{filtered.length} {filtered.length === 1 ? 'article' : 'articles'}</p><div className="blog-grid">{filtered.map((post) => { const slug = post.slug?.current || post._id; const excerpt = plainText(post.body).slice(0, 190); return <article className="blog-card" key={post._id}>{post.mainImage && <img src={urlFor(post.mainImage).width(800).height(450).fit('crop').auto('format').url()} alt="" loading="lazy"/>}<div><span className="eyebrow">{post.categories?.join(' / ') || 'FIELD NOTES'}</span><h2><Link to={`/blog/${slug}`}>{post.title}<ArrowUpRight size={18}/></Link></h2>{excerpt && <p>{excerpt}{excerpt.length === 190 ? '…' : ''}</p>}<Link className="text-button" to={`/blog/${slug}`}>Read article →</Link></div></article>; })}</div>{!filtered.length && <div className="empty-state"><h2>No matching articles.</h2><p>Try another search or topic.</p></div>}</>}</main><Footer/></>;
}

export default function Blog() { const { slug } = useParams<{ slug?: string }>(); return slug ? <BlogArticle slug={slug}/> : <BlogListing/>; }
