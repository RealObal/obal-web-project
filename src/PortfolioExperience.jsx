import MediaImage from './components/MediaImage';
import LegalLinks from './components/LegalLinks';
import SiteHeader from './components/SiteHeader';
import ProfessionalInterests from './components/ProfessionalInterests';
import React, {useEffect, useRef, useState} from 'react';
import {ArrowUpRight, ArrowRight, Search, MapPin, ChevronDown, X, BookOpen, SlidersHorizontal, ExternalLink, Check, Copy, Linkedin, Mail, ArrowDown, FileText, GraduationCap} from 'lucide-react';
import {work, tools, types, description} from './portfolioData.js';
import {ImportedSections,RecentBlogSection} from './PortfolioSections.jsx';
import {submitContactForm,isSupabaseConfigured} from './lib/supabase';
import {Seo} from './lib/seo';
import {breadcrumbSchema, personSchema, profilePageSchema, siteNavigationSchema, websiteSchema} from './lib/seoData';

const pathFor = item => `/work/${item.id}`;
const itemForPath = path => work.find(item => path.replace(/\/$/,'') === `/work/${item.id}`) || null;
const groups = ['Collect & organise','Analyse & interpret','Visualise & communicate','Design & learn'];

function Visual({item}) {
  const kind=item.visual;
  if(item.image)return <div className="work-visual photo-visual"><MediaImage className="work-photo" src={item.image} alt="" loading="lazy" style={{objectPosition:item.imagePosition||'center'}}/><span className="photo-kicker">{item.type} · {item.status}</span><span className="visual-caption">{item.imageCaption||item.theme}</span></div>;
  return <div className={`work-visual ${kind}`} aria-hidden="true">
    {kind==='publication' ? <><span className="journal-label">PUBLISHED RESEARCH</span><div className="paper"><div className="paper-label">RESEARCH · OPEN ACCESS</div><div className="paper-title">Research for<br/>better decisions.</div><div className="paper-lines"><i/><i/><i/></div><div className="paper-foot">UGANDA · 2026 <ArrowUpRight size={21}/></div></div><span className="visual-caption">Peer-reviewed publication</span></> :
    kind==='programme' ? <><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><span className="orbit-word">Listen.<br/>Measure.<br/><em>Learn.</em></span><span className="visual-caption">Community & programme learning</span></> :
    kind==='education' ? <><div className="step step-one"/><div className="step step-two"/><div className="step step-three"/><span className="visual-word">A pathway<br/>back to learning.</span><span className="visual-caption">Education & child protection</span></> :
    kind==='climate' ? <><div className="sun"/><div className="land land-one"/><div className="land land-two"/><div className="land land-three"/><span className="visual-caption">Climate & agricultural livelihoods</span></> :
    kind==='review' ? <><div className="review-circle circle-one"/><div className="review-circle circle-two"/><div className="review-circle circle-three"/><span className="review-word">Care.<br/><em>Connection.</em><br/>Community.</span><span className="visual-caption">Evidence synthesis</span></> :
    <><div className="dashboard-window"><span className="window-dots">● ● ●</span><div className="dash-title">FROM DATA TO UNDERSTANDING</div><div className="dash-bars"><i/><i/><i/><i/><i/><i/></div><span className="dash-note">Dashboard concept · illustration</span></div><span className="visual-caption">Data & visual storytelling</span></>}
  </div>;
}

function Detail({item,onClose,onSkill}) {
  const panel=useRef(null), close=useRef(null); const [copied,setCopied]=useState('');
  useEffect(()=>{
    const previous=document.activeElement;
    const oldOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden'; close.current?.focus();
    const onKey=e=>{
      if(e.key==='Escape')onClose();
      if(e.key==='Tab'){
        const nodes=Array.from(panel.current.querySelectorAll('a[href],button,input,select,[tabindex="0"]')).filter(n=>!n.disabled);
        const first=nodes[0], last=nodes[nodes.length-1];
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
        if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
      }
    };
    document.addEventListener('keydown',onKey);
    return ()=>{document.body.style.overflow=oldOverflow;document.removeEventListener('keydown',onKey);if(previous?.isConnected)previous.focus();};
  },[item.id,onClose]);
  async function copy(value,label){try{await navigator.clipboard.writeText(value);setCopied(label);}catch{setCopied('Copy unavailable — select the text below.');}}
  return <div className="detail-backdrop" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
    <article ref={panel} className="detail" role="dialog" aria-modal="true" aria-labelledby="detail-title">
      <div className="detail-top"><span className="eyebrow">{item.type} / {item.theme}</span><button ref={close} className="icon-button" onClick={onClose} aria-label="Close work details"><X size={22}/></button></div>
      <span className={`status ${item.status.toLowerCase()}`}>{item.status}</span>
      <h2 id="detail-title">{item.fullTitle}</h2>
      <p className="detail-intro">{item.summary}</p>
      <dl className="detail-facts"><div><dt>Role / contribution</dt><dd>{item.role}</dd></div><div><dt>Context</dt><dd>{item.context}</dd></div></dl>
      <h3>Overview</h3><p>{item.detail}</p>
      <h3>{item.status==='Published'?'Study at a glance':item.status==='Planned'?'Direction & next steps':'Work at a glance'}</h3>
      <ul className="takeaways">{item.takeaways.map(t=><li key={t}><Check size={17}/><span>{t}</span></li>)}</ul>
      <h3>Related skills & tools</h3><div className="skill-tags">{item.skills.map(s=><button key={s} onClick={()=>onSkill(s)}>{s}<ArrowUpRight size={13}/></button>)}</div>
      <div className="evidence-note"><BookOpen size={19}/><p>{item.evidence}</p></div>
      {item.citation&&<div className="citation"><h3>Citation</h3><p>{item.citation}</p><button className="text-button" onClick={()=>copy(item.citation,'Citation copied')}><Copy size={15}/>Copy citation</button></div>}
      <div className="detail-actions">{item.source&&<a className="button primary" href={item.source} target="_blank" rel="noopener noreferrer">{item.sourceLabel}<ExternalLink size={16}/></a>}<button className="button secondary" onClick={()=>copy(window.location.href,'Link copied')}><Copy size={15}/>Copy work link</button></div>
      <p className="copy-message" role="status">{copied}</p>
    </article>
  </div>;
}

function ContactPanel(){
  const [form,setForm]=useState({name:'',email:'',phone:'',message:'',consent:false,website:''});
  const [state,setState]=useState({sending:false,kind:'',message:''});
  const update=e=>setForm(current=>({...current,[e.target.name]:e.target.type==='checkbox'?e.target.checked:e.target.value}));
  async function submit(e){
    e.preventDefault();setState({sending:true,kind:'',message:''});
    const result=await submitContactForm(form);
    setState({sending:false,kind:result.ok?'success':'error',message:result.message});
    if(result.ok)setForm({name:'',email:'',phone:'',message:'',consent:false,website:''});
  }
  return <div className="contact-panel" id="contact"><div className="contact-intro"><span className="eyebrow">LET’S TURN EVIDENCE INTO ACTION</span><h2>Good work starts<br/>with a <em>conversation.</em></h2><p>Exploring a research collaboration, an M&E role, or a programme learning challenge? Send a note or connect directly.</p><div className="contact-direct"><a href="mailto:ronaldobal20@gmail.com"><Mail size={16}/>ronaldobal20@gmail.com</a><a href="tel:+256776280494">+256 776 280 494</a><a href="https://linkedin.com/in/ronaldobal" target="_blank" rel="noopener noreferrer"><Linkedin size={16}/>LinkedIn<ExternalLink size={14}/></a></div></div>{isSupabaseConfigured?<form className="contact-form" onSubmit={submit} aria-describedby="contact-privacy"><label>Name<input required maxLength={100} name="name" autoComplete="name" value={form.name} onChange={update}/></label><label>Email<input required maxLength={254} type="email" name="email" autoComplete="email" value={form.email} onChange={update}/></label><label>Phone <span>(optional)</span><input type="tel" maxLength={40} name="phone" autoComplete="tel" value={form.phone} onChange={update}/></label><label>Message<textarea required maxLength={5000} name="message" rows="5" value={form.message} onChange={update}/></label><p id="contact-privacy" className="contact-privacy">Your details are used to respond to your enquiry. <a href="/privacy">Privacy Policy</a>. Please do not include sensitive case details.</p><label className="contact-consent"><input type="checkbox" required name="consent" checked={form.consent} onChange={update}/>I consent to my details being used to respond to this enquiry.</label><label className="contact-trap" aria-hidden="true">Website<input name="website" value={form.website} onChange={update} tabIndex={-1} autoComplete="off"/></label><button className="button cream" type="submit" disabled={state.sending}>{state.sending?'Sending…':'Send message'}<ArrowUpRight size={18}/></button>{state.message&&<p className={`form-status ${state.kind}`} role="status">{state.message}</p>}</form>:<div><a className="button cream" href="mailto:ronaldobal20@gmail.com">Send an email<ArrowUpRight size={18}/></a><p className="contact-privacy">Please avoid including sensitive case details. <a href="/privacy">Privacy Policy</a></p></div>}</div>;
}

export default function App({initialPath='/'}){
  const [type,setType]=useState('All work'),[skill,setSkill]=useState('All tools'),[query,setQuery]=useState(''),[sort,setSort]=useState('featured');
  const [selected,setSelected]=useState(()=>itemForPath(initialPath));
  const [profileOpen,setProfileOpen]=useState(true);
  const [toolGroup,setToolGroup]=useState('All tools');
  const queryRef=useRef(null);

  useEffect(()=>{
    function sync(){const p=new URLSearchParams(window.location.search);setType(types.includes(p.get('type'))?p.get('type'):'All work');setSkill(tools.some(t=>t.name===p.get('tool'))?p.get('tool'):'All tools');setQuery(p.get('q')||'');setSort(p.get('sort')==='title'?'title':'featured');setSelected(itemForPath(window.location.pathname));}
    sync();window.addEventListener('popstate',sync);return()=>window.removeEventListener('popstate',sync);
  },[]);
  useEffect(()=>{
    const targetByPath={'/about':'profile','/services':'services','/portfolio':'experience','/data-analytics-research-portfolio':'work','/contact':'contact'};
    const id=targetByPath[initialPath.replace(/\/$/,'')];
    if(id)setTimeout(()=>document.getElementById(id)?.scrollIntoView(),0);
  },[initialPath]);
  function updateFilters(values){
    const next={type,skill,query,sort,...values};setType(next.type);setSkill(next.skill);setQuery(next.query);setSort(next.sort);
    const p=new URLSearchParams();if(next.type!=='All work')p.set('type',next.type);if(next.skill!=='All tools')p.set('tool',next.skill);if(next.query)p.set('q',next.query);if(next.sort!=='featured')p.set('sort',next.sort);
    window.history.replaceState(null,'',`/${p.size?'?'+p.toString():''}#work`);
  }
  function openItem(){ /* Follow the real work URL for standalone, indexable details. */ }
  // A stable handler avoids resetting dialog focus while its copy state changes.
  const closeRef=useRef(null);closeRef.current=()=>{setSelected(null);window.history.pushState(null,'','/'+window.location.search+'#work');};
  const stableClose=useRef(()=>closeRef.current()).current;
  function exploreSkill(s){setSelected(null);updateFilters({skill:s,type:'All work',query:''});requestAnimationFrame(()=>document.getElementById('work')?.scrollIntoView({behavior:'smooth'}));}
  const filtered=work.filter(item=>(type==='All work'||item.type===type||(type==='Research'&&item.type==='Publication'))&&(skill==='All tools'||item.skills.includes(skill))&&`${item.title} ${item.fullTitle} ${item.summary} ${item.theme} ${item.skills.join(' ')}`.toLowerCase().includes(query.toLowerCase().trim())).sort((a,b)=>sort==='title'?a.title.localeCompare(b.title):Number(!!b.featured)-Number(!!a.featured));
  const activeFilters=type!=='All work'||skill!=='All tools'||query||sort!=='featured';
  const pagePath=selected?pathFor(selected):initialPath;
  const routeMeta={
    '/about':{title:'About Ronald Obal | Research & Monitoring and Evaluation',description:'Biography, education, professional background, and research profiles for Ronald Obal.'},
    '/services':{title:'Monitoring, Evaluation & Research Services | Ronald Obal',description:'Monitoring, evaluation, research, learning, data collection, analysis, reporting, and capacity-building support.'},
    '/portfolio':{title:'Professional Experience | Ronald Obal',description:'Professional experience across programme learning, community development, education, child protection, and trauma care.'},
    '/data-analytics-research-portfolio':{title:'Research & Data Portfolio | Ronald Obal',description:'Explore Ronald Obal’s publications, research, programme work, planned projects, methods, and analytical tools.'},
    '/contact':{title:'Contact Ronald Obal | Research & M&E Collaboration',description:'Contact Ronald Obal about research, monitoring and evaluation, programme learning, or collaboration.'},
  };
  const currentMeta=routeMeta[initialPath.replace(/\/$/,'')];
  const pageTitle=selected?`${selected.fullTitle} | Ronald Obal`:currentMeta?.title||'Ronald Obal | Research & Monitoring and Evaluation';
  const pageDescription=selected?selected.summary:currentMeta?.description||description;
  const workSchema=selected?{'@context':'https://schema.org','@type':selected.type==='Publication'?'ScholarlyArticle':'CreativeWork',name:selected.fullTitle,description:selected.summary,url:`https://www.ronaldobal.com${pagePath}`,author:{'@type':'Person',name:'Ronald Obal',url:'https://www.ronaldobal.com/about'},sameAs:selected.source||undefined}:undefined;
  return <>
    <Seo title={pageTitle} description={pageDescription} path={pagePath} type={selected?.type==='Publication'?'article':'profile'} image="https://www.ronaldobal.com/media/ronald-portrait-720.webp" jsonLd={selected?[workSchema,breadcrumbSchema([{name:'Ronald Obal',path:'/'},{name:'Selected work',path:'/#work'},{name:selected.fullTitle,path:pagePath}])]:[personSchema,websiteSchema,profilePageSchema,siteNavigationSchema]}/>
    <div style={{display:'contents'}} inert={selected?true:undefined}><SiteHeader/></div>
    <main id="main" inert={selected?true:undefined}>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy"><div className="eyebrow hero-eyebrow"><span className="small-line"/>RESEARCH · MONITORING · EVALUATION</div><h1 id="hero-title">Evidence that<br/>moves people<br/><em>forward.</em></h1><p className="hero-description">I’m Ronald Obal, a researcher and M&E practitioner connecting data, community experience, and better decisions.</p><div className="hero-actions"><a href="#work" className="button primary">Explore my work<ArrowDown size={17}/></a><a href="#profile" className="profile-link" onClick={()=>setProfileOpen(true)}>A little about me<ArrowUpRight size={16}/></a></div><p className="location"><MapPin size={14}/>Based in Northern Uganda · Working with a wider perspective</p></div>
        <div className="hero-image-wrap"><div className="portrait-frame"><MediaImage src="/media/ronald-profile-1024.webp" width="720" height="900" alt="Ronald Obal" fetchPriority="high"/><div className="portrait-caption"><span>RONALD OBAL</span><span>Researcher & M&E practitioner</span></div></div><div className="hero-note"><span className="note-number">01 /</span><span>Grounded in community.<br/><strong>Guided by evidence.</strong></span><ArrowUpRight size={22}/></div><span className="image-side-label">CONTEXT MATTERS. PEOPLE MATTER.</span></div>
        <div id="profile" className="profile-row"><span className="profile-label">THE THREAD THROUGH MY WORK</span><p>Public health. Education. Youth development.<br/><strong>Better outcomes through better evidence.</strong></p><button className="text-button" onClick={()=>setProfileOpen(!profileOpen)} aria-expanded={profileOpen} aria-controls="profile-content">{profileOpen?'Less about me':'Professional background'}<ChevronDown size={17} className={profileOpen?'rotate':''}/></button></div>
        {profileOpen&&<div id="profile-content" className="profile-content"><div><span className="eyebrow">BACKGROUND</span><h2>Local context.<br/><em>Practical perspective.</em></h2><p>My work sits at the intersection of research, programme learning, and community development in Northern Uganda. I bring experience in education access, child protection, youth development, and data analysis.</p></div><div className="profile-credentials"><div><GraduationCap size={22}/><div><h3>Education & evaluation</h3><p>BA in Education (Geography & Economics), Gulu University.<br/>Postgraduate Diploma in Monitoring & Evaluation completed; graduation pending.</p></div></div><div><FileText size={22}/><div><h3>Practice & professional community</h3><p>Monitoring & evaluation experience at Laminopabo CYDC, alongside community development and programme support.<br/>Member of the Uganda Evaluation Association and EvalForward.</p></div></div><a className="text-button" href="https://linkedin.com/in/ronaldobal" target="_blank" rel="noopener noreferrer">View LinkedIn profile<ExternalLink size={15}/></a></div></div>}
      </section>

      <ProfessionalInterests/>
      <section id="work" className="work-section" aria-labelledby="work-title"><div className="container"><div className="section-heading"><div><span className="eyebrow">01 / SELECTED WORK</span><h2 id="work-title">From questions<br/>to <em>understanding.</em></h2></div><p>A closer look at my research, programme experience, and projects. Find the work that connects with your interests.</p></div>
        <div className="explorer"><div className="explorer-top"><div className="type-tabs" role="group" aria-label="Filter by work type">{types.map(t=><button key={t} className={type===t?'active':''} aria-pressed={type===t} onClick={()=>updateFilters({type:t})}>{t==='Publication'?'Publications':t==='Project'?'Projects':t}</button>)}</div><span className="explorer-label"><SlidersHorizontal size={15}/>EXPLORE THE PORTFOLIO</span></div>
        <div className="filter-row"><label className="search-field"><Search size={19}/><span className="sr-only">Search work</span><input ref={queryRef} value={query} placeholder="Search topics, projects, or methods…" onChange={e=>updateFilters({query:e.target.value})}/>{query&&<button aria-label="Clear search" onClick={()=>{updateFilters({query:''});queryRef.current?.focus();}}><X size={16}/></button>}</label><label className="select-field"><span>Related tool</span><select value={skill} onChange={e=>updateFilters({skill:e.target.value})}><option>All tools</option>{tools.map(t=><option key={t.name}>{t.name}</option>)}</select><ChevronDown size={15}/></label><label className="sort-field"><span className="sr-only">Sort work</span><select value={sort} onChange={e=>updateFilters({sort:e.target.value})}><option value="featured">Featured first</option><option value="title">Title: A–Z</option></select><ChevronDown size={15}/></label></div>
        <div className="results-row"><p role="status" aria-live="polite">{filtered.length} {filtered.length===1?'item':'items'}{skill!=='All tools'&&<> related to <strong>{skill}</strong></>}</p>{activeFilters?<button className="text-button" onClick={()=>updateFilters({type:'All work',skill:'All tools',query:'',sort:'featured'})}>Reset filters<X size={13}/></button>:<span>Published work and work in progress, clearly distinguished.</span>}</div>
        </div>
        <div className="work-grid">{filtered.map(item=><article className="work-card" key={item.id}><a className="visual-link" href={pathFor(item)} onClick={e=>openItem(e,item)} tabIndex={-1} aria-hidden="true"><Visual item={item}/></a><div className="card-body"><div className="card-meta"><span>{item.type.toUpperCase()} <span className="meta-dot">/</span> {item.year}</span><span className={`status ${item.status.toLowerCase()}`}>{item.status}</span></div><h3><a href={pathFor(item)} onClick={e=>openItem(e,item)}>{item.title}<ArrowUpRight size={21}/></a></h3><p>{item.summary}</p><div className="card-bottom"><span>{item.theme}</span><button onClick={()=>{window.location.href=pathFor(item);}} aria-label={`Open ${item.title}`}><ArrowRight size={18}/></button></div></div></article>)}</div>
        {!filtered.length&&<div className="empty-state"><Search size={30}/><h3>No work matches these filters.</h3><p>Try another topic or broaden the work type and tool.</p><button className="button secondary" onClick={()=>updateFilters({type:'All work',skill:'All tools',query:'',sort:'featured'})}>Show all work<ArrowRight size={16}/></button></div>}
        <div className="work-footnote"><BookOpen size={16}/><p>Tools connect work to relevant skills. Project details explain what is published, what is professional experience, and what is still being developed.</p></div>
      </div></section>

      <section className="home-quote container" aria-label="Professional philosophy">
        <figure><blockquote><p>Through evidence, accountability, and continuous learning, we shape programs that truly change lives.</p></blockquote><figcaption>— Ronald Obal</figcaption></figure>
      </section>
      <RecentBlogSection/>
      <ImportedSections/>
      <section id="toolkit" className="toolkit-section container" aria-labelledby="toolkit-title"><div className="section-heading"><div><span className="eyebrow">02 / METHODS & TOOLKIT</span><h2 id="toolkit-title">The right tools.<br/><em>The right questions.</em></h2></div><p>From field data to findings people can use. Explore the tools and methods behind my analytical practice.</p></div>
        <div className="tool-tabs" role="group" aria-label="Filter tools by purpose">{['All tools',...groups].map(g=><button aria-pressed={toolGroup===g} className={toolGroup===g?'active':''} key={g} onClick={()=>setToolGroup(g)}>{g}</button>)}</div>
        <div className="tool-grid">{tools.filter(t=>toolGroup==='All tools'||t.group===toolGroup).map(t=><button className="tool-card" key={t.name} onClick={()=>exploreSkill(t.name)}><span className={`tool-icon ${t.color}`}>{t.short}</span><div><h3>{t.name}<ArrowUpRight size={16}/></h3><p>{t.description}</p><span className="tool-note">{t.note||t.group}</span></div></button>)}</div>
        <ContactPanel/>
      </section>
    </main>
    <footer className="container footer" inert={selected?true:undefined}><div><span className="brand footer-brand">ro<span>.</span></span><span>Ronald Obal · Research & M&E</span></div><span>Thoughtful evidence. Meaningful progress.</span><a href="#main">Back to top<ArrowUpRight size={14}/></a><LegalLinks/></footer>
    {selected&&<Detail key={selected.id} item={selected} onClose={stableClose} onSkill={exploreSkill}/>}
  </>;
}
