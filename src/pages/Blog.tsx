import MediaImage from '../components/MediaImage';
import { useContentSnapshot } from '../lib/content';
import NotFound from './NotFound';
import LegalLinks from '../components/LegalLinks';
import SiteHeader from '../components/SiteHeader';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, Search, Clock, ChevronRight, Tag, ArrowUpRight } from 'lucide-react';
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
  type PortableTextComponentProps,
  type PortableTextMarkComponentProps,
  type PortableTextTypeComponentProps,
} from '@portabletext/react';
import type { TypedObject } from '@portabletext/types';
import type { SanityImageSource } from '@sanity/image-url';
import { Seo } from '../lib/seo';
import { AuthorBio } from '../components/AuthorBio';
import { sanity, safeSanityFetch, urlFor } from '../lib/sanity';
import {
  DEFAULT_IMAGE,
  SITE_URL,
  X_HANDLE,
  X_URL,
  absoluteUrl,
  breadcrumbSchema,
} from '../lib/seoData';

import '../blog.css';

function Footer() { return <footer className="container footer"><Link to="/">Ronald Obal · Research &amp; M&amp;E</Link><span>Thoughtful evidence. Meaningful progress.</span><a href="/#contact">Get in touch<ArrowUpRight size={14}/></a><LegalLinks/></footer>; }

function safeHref(href?: string) {
  if (!href) return undefined;
  try { const url = new URL(href, SITE_URL); return ['http:', 'https:', 'mailto:'].includes(url.protocol) ? url.href : undefined; } catch { return undefined; }
}


const X_FOLLOW_URL = `https://twitter.com/intent/follow?screen_name=${X_HANDLE}`;

interface SanityImageValue extends TypedObject {
  asset?: {
    _ref?: string;
  };
  alt?: string;
  caption?: string;
  attribution?: string;
}

interface LinkMark extends TypedObject {
  href?: string;
}

interface CalloutValue extends TypedObject {
  label?: string;
  body?: string;
}

interface BlogPost {
  _id: string;
  title: string;
  mainImage?: SanityImageSource;
  body?: PortableTextBlock[];
  created_at?: string;
  updatedAt?: string;
  authorName?: string;
  categories?: string[];
  slug?: {
    current?: string;
  };
}

function blockToText(block: PortableTextBlock): string {
  return block.children
    ?.map((child) => ('text' in child && typeof child.text === 'string' ? child.text : ''))
    .join('') || '';
}

// -- X (Twitter) logo SVG ------------------------------------------------------
const XLogo = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// -- Reusable X Follow button --------------------------------------------------
const XFollowButton = () => (
  <a
    href={X_FOLLOW_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
  >
    <XLogo size={14} />
    Follow @{X_HANDLE}
  </a>
);

// -- Estimate read time --------------------------------------------------------
function estimateReadTime(body?: PortableTextBlock[]): number {
  if (!body) return 1;
  const text = body
    .filter((b) => b._type === 'block')
    .map(blockToText)
    .join(' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// -- Portable Text components --------------------------------------------------
function normalizeHeadings(body: PortableTextBlock[]) {
  let previous = 1;
  return body.map(block => {
    if (block._type !== 'block' || !/^h[1-6]$/.test(block.style || '')) return block;
    const level = Math.min(Math.max(2, Number(block.style?.slice(1))), previous + 1);
    previous = level;
    return {...block, style: 'h' + level};
  });
}

const blogComponents: PortableTextComponents = {
  block: {
    h1: ({ children }: PortableTextComponentProps<PortableTextBlock>) => <h2 className="blog-h2">{children}</h2>,
    h2: ({ children }: PortableTextComponentProps<PortableTextBlock>) => <h2 className="blog-h2">{children}</h2>,
    h3: ({ children }: PortableTextComponentProps<PortableTextBlock>) => <h3 className="blog-h3">{children}</h3>,
    normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => <p className="blog-p">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="blog-ul">{children}</ul>,
    number: ({ children }) => <ol className="blog-ol">{children}</ol>,
  },
  marks: {
    bold: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
    link: ({ value, children }: PortableTextMarkComponentProps<LinkMark>) => (
      <a href={safeHref(value?.href)} target="_blank" rel="noopener noreferrer" className="text-[#b48229] hover:underline font-medium">
        {children} <ExternalLink size={14} className="inline mb-1" />
      </a>
    ),
  },
  types: {
    image: ({ value }: PortableTextTypeComponentProps<SanityImageValue>) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8">
          <img
            src={urlFor(value as SanityImageSource).width(800).url()}
            alt={value.alt || 'Blog image'}
            className="w-full rounded-lg object-cover"
          />
          {(value.caption || value.attribution) && (
            <figcaption className="text-sm text-gray-500 mt-2 text-center">{[value.caption, value.attribution].filter(Boolean).join(' ? ')}</figcaption>
          )}
        </figure>
      );
    },
    callout: ({ value }: PortableTextTypeComponentProps<CalloutValue>) => (
      <div className="my-8 rounded-lg border border-gray-300 bg-white px-6 py-5">
        {value.label && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-700">
            {value.label}
          </p>
        )}
        <p className="text-sm leading-relaxed text-gray-600">
          {value.body}
        </p>
      </div>
    ),
  },
};

// --- SINGLE POST VIEW ---------------------------------------------------------
function SinglePost({ slug }: { slug: string }) {
  const snapshot = useContentSnapshot<BlogPost>();
  const [post, setPost] = useState<BlogPost | null>(() => snapshot?.find(item => item.slug?.current === slug) || null);
  const [loading, setLoading] = useState(snapshot === null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (snapshot !== null) return;
    let active = true;
    setLoading(true);
    const q = `*[_type == "post" && slug.current == $slug][0]{
      _id, title, mainImage, body,
      "created_at": coalesce(publishedAt, _createdAt),
      "updatedAt": _updatedAt,
      "authorName": author->name,
      "categories": categories[]->title,
      "slug": slug
    }`;
    sanity.fetch<BlogPost | null>(q, { slug }).then(data => { if (active) setPost(data); }).catch(() => { if (active) setFailed(true); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug, snapshot]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#f7f6f0]">
      <div className="w-12 h-12 border-4 border-[#b48229] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (failed) return <main id="main" className="container collection-page"><h1>Insights are temporarily unavailable.</h1><p>Please try again shortly.</p><button onClick={() => window.location.reload()}>Try again</button></main>;
  if (!post) return <NotFound embedded/>;

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).fit('crop').url()
    : null;

  const readTime = estimateReadTime(post.body);
  const articlePath = `/blog/${encodeURIComponent(post.slug?.current || slug)}`;
  const articleUrl = absoluteUrl(articlePath);
  const articleDescription = post.body
    ?.filter((b) => b._type === 'block' && b.style === 'normal')
    .slice(0, 2)
    .map(blockToText)
    .join(' ')
    .slice(0, 155) || `Read ${post.title} by Ronald Obal.`;
  const publishedDate = post.created_at;
  const articleImage = imageUrl || DEFAULT_IMAGE;
  const authorUrl = absoluteUrl('/#profile');
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${articleUrl}#blogposting`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    headline: post.title,
    description: articleDescription,
    image: articleImage,
    datePublished: publishedDate,
    dateModified: post.updatedAt || publishedDate,
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: post.authorName || 'Ronald Obal',
      url: authorUrl,
    },
    publisher: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Ronald Obal',
      url: authorUrl,
      image: DEFAULT_IMAGE,
    },
  };

  return (
    <main id="main" className="original-blog min-h-screen bg-[#f7f6f0] pb-20">
      <style>{`
        .blog-h1 { font-family: var(--serif); font-size: 2rem; font-weight: 700; margin: 2rem 0 1rem; color: #173b32; }
        .blog-h2 { font-family: var(--serif); font-size: 1.5rem; font-weight: 700; margin: 1.75rem 0 0.75rem; color: #173b32; border-left: 4px solid #b48229; padding-left: 0.75rem; }
        .blog-h3 { font-family: var(--serif); font-size: 1.25rem; font-weight: 700; margin: 1.5rem 0 0.5rem; color: #173b32; }
        .blog-p { margin-bottom: 1.25rem; color: #586359; line-height: 1.85; font-size: 1.05rem; text-align: justify; }
        .blog-ul { list-style: disc; margin-left: 1.5rem; margin-bottom: 1.5rem; color: #586359; }
        .blog-ol { list-style: decimal; margin-left: 1.5rem; margin-bottom: 1.5rem; color: #586359; }
        .blog-ul li, .blog-ol li { margin-bottom: 0.5rem; line-height: 1.75; }
      `}</style>

      <Seo
        title={`${post.title} | Ronald Obal Insights`}
        description={articleDescription}
        path={articlePath}
        type="article"
        publishedAt={publishedDate}
        modifiedAt={post.updatedAt || publishedDate}
        image={articleImage}
        jsonLd={[
          articleSchema,
          breadcrumbSchema([
            { name: 'Ronald Obal Official Website', path: '/' },
            { name: 'Insights', path: '/blog' },
            { name: post.title, path: articlePath },
          ]),
        ]}
      >
      </Seo>

      {/* Post header */}
      <div className="bg-[#173b32] text-white py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center text-[#b48229] text-sm font-semibold hover:underline mb-6 group">
            <ChevronRight size={14} className="rotate-180 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to All Posts
          </Link>
          <Link to="/" className="block text-[#b48229] text-xs font-bold uppercase tracking-[0.25em] mb-5 hover:text-white transition-colors">
            Ronald Obal Official Website
          </Link>

          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((cat: string) => (
                <span key={cat} className="bg-[#b48229]/20 text-[#b48229] border border-[#b48229]/40 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  {cat}
                </span>
              ))}
            </div>
          )}

            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4" style={{ fontFamily: 'var(--serif)' }}>

            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1.5">
              <span className="w-7 h-7 rounded-full bg-[#b48229] text-[#173b32] flex items-center justify-center font-bold text-xs">
                {(post.authorName || 'Ronald Obal').charAt(0)}
              </span>
              <span>{post.authorName || 'Ronald Obal'}</span>
            </span>
            <span className="text-gray-500">|</span>
            <span>{formatDate(post.created_at, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="text-gray-500">|</span>
            <span className="flex items-center gap-1"><Clock size={13} /> {readTime} min read</span>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {post.mainImage && (
          <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
            <MediaImage src={urlFor(post.mainImage).width(1200).url()} alt={post.title} className="w-full h-auto object-cover" />
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-10">
          <PortableText value={normalizeHeadings(post.body || [])} components={blogComponents} />
        </div>

        {/* Author bio section */}
        <div className="mt-10">
          <AuthorBio authorName={post.authorName || 'Ronald Obal'} />
        </div>

        {/* Post footer: back link + X follow */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl shadow-sm px-6 py-5 border border-gray-100">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-[#173b32] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#285447] transition-colors text-sm"
          >
            <ChevronRight size={15} className="rotate-180" /> Back to All Posts
          </Link>
          <div className="flex flex-col items-center sm:items-end gap-1">
            <p className="text-xs text-gray-400 font-medium">Enjoyed this post? Follow for more.</p>
            <XFollowButton />
          </div>
        </div>
      </article>
    </main>
  );
}

// -- Safe date formatter -------------------------------------------------------
function formatDate(dateStr: string | undefined, opts?: Intl.DateTimeFormatOptions): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', {timeZone:'UTC', ...opts});
}

// --- POST CARD ----------------------------------------------------------------
function PostCard({ post }: { post: BlogPost }) {
  const imgSrc = post.mainImage
    ? urlFor(post.mainImage).width(600).height(338).fit('crop').url()
    : '/About.JPG';

  const readTime = estimateReadTime(post.body);

  const excerpt = post.body
    ?.filter((b) => b._type === 'block' && b.style === 'normal')
    .slice(0, 2)
    .map(blockToText)
    .join(' ')
    .slice(0, 180) || '';

  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col sm:flex-row group">
      <Link to={`/blog/${encodeURIComponent(post.slug?.current || post._id)}`} className="sm:w-56 flex-shrink-0 block overflow-hidden">
        <img
          src={imgSrc}
          alt={post.title}
          loading="lazy"
          className="w-full h-48 sm:h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="flex flex-col justify-between p-5 flex-1">
        <div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#b48229] bg-[#b48229]/10 px-2.5 py-1 rounded-full mb-3">
            <Clock size={11} /> {readTime} Min Read
          </span>

          <Link to={`/blog/${encodeURIComponent(post.slug?.current || post._id)}`} className="block group/title">
            <h2 className="text-lg font-bold text-[#173b32] leading-snug mb-2 group-hover/title:text-[#b48229] transition-colors" style={{ fontFamily: 'var(--serif)' }}>
              {post.title}
            </h2>
          </Link>

          {excerpt && (
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3">{excerpt}...</p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <span className="w-5 h-5 rounded-full bg-[#173b32] text-white flex items-center justify-center font-bold text-xs">
              {(post.authorName || 'R').charAt(0)}
            </span>
            <span className="font-medium text-gray-600">{post.authorName || 'Ronald Obal'}</span>
            <span>|</span>
            <span>{formatDate(post.created_at, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>

          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.categories.map((cat: string) => (
                <span key={cat} className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  <Tag size={9} /> {cat}
                </span>
              ))}
            </div>
          )}

          <Link
            to={`/blog/${encodeURIComponent(post.slug?.current || post._id)}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#173b32] hover:text-[#b48229] transition-colors"
          >
            Discover More <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}

// --- BLOG LISTING -------------------------------------------------------------
function BlogListing() {
  const snapshot = useContentSnapshot<BlogPost>();
  const [posts, setPosts] = useState<BlogPost[]>(snapshot || []);
  const [loading, setLoading] = useState(snapshot === null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [archive, setArchive] = useState('');

  useEffect(() => {
    if (snapshot !== null) return;
    setLoading(true);
    setError(null);
    const query = `*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) {
      _id, title, mainImage, slug, body,
      publishedAt,
      "created_at": coalesce(publishedAt, _createdAt),
      "updatedAt": _updatedAt,
      "authorName": author->name,
      "categories": categories[]->title
    }`;
    safeSanityFetch<BlogPost[] | null>(query, undefined, null)
      .then((data) => {
        if (data === null) {
          setError('Posts are temporarily unavailable.');
          setPosts([]);
          setLoading(false);
          return;
        }

        setPosts(data || []);
        setLoading(false);
      });
  }, [snapshot]);

  const archiveMap: Record<string, number> = {};
  posts.forEach((p) => {
    const key = formatDate(p.created_at, { month: 'long', year: 'numeric' });
    if (key) {
      archiveMap[key] = (archiveMap[key] || 0) + 1;
    }
  });

  const allCategories = Array.from(new Set(posts.flatMap((p) => p.categories || [])));

  const filtered = posts.filter((p) => {
    const q = search.trim().toLowerCase();
    return (!category || p.categories?.includes(category)) &&
      (!archive || formatDate(p.created_at, { month: 'long', year: 'numeric' }) === archive) && (
      !q ||
      p.title?.toLowerCase().includes(q) ||
      (p.categories || []).some((c: string) => c.toLowerCase().includes(q)) ||
      p.authorName?.toLowerCase().includes(q)
    );
  });

  return (
    <main id="main" className="original-blog min-h-screen bg-[#f7f6f0] pb-20">
      <Seo
        title="Ronald Obal Insights | MEAL Field Notes & Development Learning"
        description="Read Ronald Obal's insights on Monitoring, Evaluation, Accountability, Research and Learning in social impact, humanitarian, and development programs."
        path="/blog"
        twitterCard="summary_large_image"
        jsonLd={breadcrumbSchema([
          { name: 'Ronald Obal Official Website', path: '/' },
          { name: 'Insights', path: '/blog' },
        ])}
      >
      </Seo>

      {/* Hero banner with X follow in top-right */}
      <section className="insights-photo-banner bg-[#173b32] text-white py-16 relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <Link to="/" className="inline-flex text-[#b48229] text-xs font-bold uppercase tracking-[0.25em] mb-5 hover:text-white transition-colors">
              Ronald Obal Official Website
            </Link>
            <p className="text-[#b48229] text-xs font-bold uppercase tracking-[0.3em] mb-3">Ronald Obal</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'var(--serif)' }}>
              MEAL Insights &<br className="hidden sm:block" /> Field Notes
            </h1>
            <p className="text-gray-300 text-lg max-w-xl">
              Evidence-based lessons from the field on Monitoring, Evaluation, Accountability, and Learning.
            </p>
          </div>
          <div className="flex-shrink-0 pb-1">
            <XFollowButton />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* -- MAIN FEED -- */}
          <div className="flex-1 min-w-0">
            {(search || category || archive) && <div className="blog-filter-summary"><p role="status">{filtered.length} posts {category} {archive}</p><button onClick={() => { setSearch(''); setCategory(''); setArchive(''); }}>Clear filters</button></div>}
            {loading ? (
              <div className="flex justify-center py-24">
                <div className="w-10 h-10 border-4 border-[#b48229] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : error ? (
              <div className="text-center py-24 text-red-500">
                <p className="font-semibold mb-2">Failed to load posts</p>
                <p className="text-sm text-gray-400">{error}</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24 text-gray-400">No posts found.</div>
            ) : (
              <div className="flex flex-col gap-5">
                {filtered.map((post) => <PostCard key={post._id} post={post} />)}
              </div>
            )}
          </div>

          {/* -- SIDEBAR -- */}
          <aside className="lg:w-72 flex-shrink-0 space-y-6">

            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="sidebar-title text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Search</h2>
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  aria-label="Search posts"
                  placeholder="Search posts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b48229]/40 focus:border-[#b48229]"
                />
              </div>
            </div>

            {/* Follow on X */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="sidebar-title text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Follow on X (Twitter)</h2>
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 mb-4 group"
              >
                <span className="w-10 h-10 rounded-full bg-black flex items-center justify-center flex-shrink-0 text-white">
                  <XLogo size={18} />
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-800 group-hover:underline leading-tight">Ronald Obal</p>
                  <p className="text-xs text-gray-400">@{X_HANDLE}</p>
                </div>
              </a>
              <XFollowButton />
            </div>

            {/* Categories */}
            {allCategories.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="sidebar-title text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map((cat) => (
                    <button
                      key={cat}
                      aria-pressed={category === cat}
                      onClick={() => setCategory(category === cat ? '' : cat)}
                      className="text-xs bg-gray-100 hover:bg-[#b48229]/15 hover:text-[#9a7a1a] text-gray-600 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Archive */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="sidebar-title text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Archives</h2>
              <ul className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                {Object.entries(archiveMap).map(([month, count]) => (
                  <li key={month} className="flex items-center justify-between text-sm">
                    <button
                      aria-pressed={archive === month}
                      onClick={() => setArchive(archive === month ? '' : month)}
                      className="text-gray-600 hover:text-[#b48229] transition-colors text-left"
                    >
                      {month}
                    </button>
                    <span className="text-xs text-gray-400 bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center">{count}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div className="bg-[#173b32] rounded-xl shadow-sm p-5 text-white">
              <h2 className="sidebar-title text-xs font-bold uppercase tracking-widest text-[#b48229] mb-3">About</h2>
              <div className="flex items-center gap-3 mb-3">
                <MediaImage src="/ronald-profile.PNG" alt="Ronald Obal" width="48" height="48" loading="lazy" className="w-12 h-12 rounded-full object-cover border-2 border-[#b48229]" />
                <div>
                  <p className="font-bold text-white text-sm">Ronald Obal</p>
                  <p className="text-xs text-gray-400">MEAL Specialist</p>
                </div>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">
                Writing evidence-based insights on Monitoring, Evaluation, Accountability & Learning in humanitarian and development contexts.
              </p>
            </div>

          </aside>
        </div>
      </div>
    </main>
  );
}

// --- ROOT EXPORT --------------------------------------------------------------
export default function Blog() {
  const { slug } = useParams<{ slug?: string }>();
  return <><SiteHeader />{slug ? <SinglePost key={slug} slug={slug} /> : <BlogListing />}<Footer /></>;
}
