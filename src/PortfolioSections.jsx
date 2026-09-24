import MediaImage from './components/MediaImage';
import {useContentSnapshot} from './lib/content';
import React,{useEffect,useState} from 'react';
import {ArrowUpRight,ExternalLink} from 'lucide-react';
import {services,experiences} from './portfolioImportedData.js';
import {safeSanityFetch,urlFor} from './lib/sanity';
const researchLinks=[['ResearchGate','https://www.researchgate.net/profile/Ronald-Obal','/ResearchGate%20logo.png'],['Google Scholar','https://scholar.google.com/citations?user=0ks04t8AAAAJ&hl=en','/GoogleScholar.png'],['X / @real_obal','https://x.com/real_obal']];
export function ImportedSections(){return <>
<section className="container imported-section" id="experience"><div className="section-heading"><div><span className="eyebrow">PROFESSIONAL EXPERIENCE</span><h2>Practice shaped<br/>by <em>people.</em></h2></div><p>Community development, education, trauma care, and programme learning.</p></div>
<div className="experience-layout"><MediaImage className="context-photo" src="/community-work.webp" alt="A community training session" loading="lazy"/><div>{experiences.map((exp,i)=><details className="experience-item" key={exp.role} open={i===0}><summary><span>{exp.organization}</span><h3>{exp.role}</h3><span>{exp.period} · {exp.location}</span></summary><ul>{exp.achievements.map(a=><li key={a}>{a}</li>)}</ul></details>)}<p className="source-note">Roles and dates shown as listed in the original website.</p></div></div>
<div className="profile-links">{researchLinks.map(([label,url,logo])=><a key={label} href={url} target="_blank" rel="noopener noreferrer">{logo&&<MediaImage className="research-profile-logo" src={logo} alt="" sizes="28px"/>}{label}<ExternalLink size={15}/></a>)}</div>
</section>
<section className="container imported-section" id="services"><div className="section-heading"><div><span className="eyebrow">CONSULTANCY & SUPPORT</span><h2>From measurement<br/>to <em>learning.</em></h2></div><p>Practical support for organisations working towards better programme outcomes.</p></div><div className="services-grid">{services.map(s=><details className="service-card" key={s.title}><summary><h3>{s.title}</h3><p>{s.description}</p><span>Explore support +</span></summary><ul>{s.features.map(f=><li key={f}>{f}</li>)}</ul></details>)}</div></section>
<section className="container imported-section" id="insights"><div className="insights-banner"><MediaImage src="/M&E collab.png" alt="Monitoring and evaluation collaboration" loading="lazy"/><div><span className="eyebrow">MEAL INSIGHTS & FIELD NOTES</span><h2>Learning beyond<br/><em>the numbers.</em></h2><p>Reflections on monitoring, evaluation, accountability, research, and community development.</p><a className="button primary" href="/blog/">Read my insights<ArrowUpRight size={17}/></a></div></div></section>
</>;}

function postExcerpt(body=[]){const blocks=Array.isArray(body)?body:[];return blocks.filter(block=>block._type==='block').map(block=>(block.children||[]).map(child=>child.text||'').join('')).join(' ').trim().slice(0,150);}

export function RecentBlogSection(){
  const snapshot=useContentSnapshot();
  const [posts,setPosts]=useState(snapshot?.slice(0,3)||[]); const [status,setStatus]=useState(snapshot===null?'loading':'ready');
  useEffect(()=>{
    if(snapshot!==null)return;
    const query=`*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt,_createdAt) desc)[0..2]{_id,title,slug,mainImage,body,publishedAt,"created_at":_createdAt,"categories":categories[]->title}`;
    safeSanityFetch(query,undefined,null).then(data=>{setPosts(Array.isArray(data)?data:[]);setStatus(data===null?'error':'ready');});
  },[snapshot]);
  return <section className="recent-writing container" id="recent-writing" aria-labelledby="recent-writing-title"><div className="recent-heading"><div><span className="eyebrow">LATEST WRITING</span><h2 id="recent-writing-title">Read Recent <em>Blog</em></h2></div><a className="recent-all" href="/blog">All Posts <ArrowUpRight size={18}/></a></div>{status==='loading'&&<p className="recent-status" role="status">Loading recent writing…</p>}{status==='error'&&<div className="recent-status" role="status">Recent writing is temporarily unavailable. <a href="/blog">View the insights archive</a>.</div>}{status==='ready'&&!posts.length&&<p className="recent-status">No published insights are available yet.</p>}{status==='ready'&&posts.length>0&&<div className="recent-grid">{posts.map(post=>{const slug=post.slug?.current||post._id; const image=post.mainImage?urlFor(post.mainImage).width(900).height(520).fit('crop').auto('format').url():'/About.JPG'; const excerpt=postExcerpt(post.body); return <article className="recent-card" key={post._id}><a href={`/blog/${encodeURIComponent(slug)}`} className="recent-image-link"><MediaImage src={image} alt="" loading="lazy"/><span className="recent-arrow"><ArrowUpRight size={17}/></span></a><div className="recent-card-body"><div className="recent-tags">{(post.categories||[]).slice(0,2).map(category=><span key={category}>{category}</span>)}</div><h3><a href={`/blog/${encodeURIComponent(slug)}`}>{post.title}</a></h3>{excerpt&&<p>{excerpt}{excerpt.length===150?'…':''}</p>}<div className="recent-meta">{post.publishedAt||post.created_at?new Date(post.publishedAt||post.created_at).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}):'Field notes'}<a href={`/blog/${encodeURIComponent(slug)}`}>Read article <ArrowUpRight size={14}/></a></div></div></article>})}</div>}</section>;
}
