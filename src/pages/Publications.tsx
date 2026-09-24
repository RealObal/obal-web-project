import LegalLinks from '../components/LegalLinks';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import { Seo } from '../lib/seo';
import { work } from '../portfolioData.js';

export default function Publications() {
  const papers = work.filter(item => item.type === 'Publication' || item.status === 'Preprint');
  return <><SiteHeader/><main id="main" className="container collection-page">
    <Seo title="Publications | Ronald Obal" description="Published research and preprints by Ronald Obal, with links to the original papers." path="/publications"/>
    <span className="eyebrow">RESEARCH & PUBLICATIONS</span>
    <h1>Ideas grounded in<br/><em>evidence.</em></h1>
    <p className="collection-intro">Published papers and emerging research in public health, community development, and programme learning.</p>
    <div className="publication-list">{papers.map(paper => <article className="publication-entry" key={paper.id}>
      <div className="publication-marker"><BookOpen size={28}/><span>{paper.year}</span></div>
      <div><div className="publication-meta"><span className="eyebrow">{paper.theme}</span><span className={`status ${paper.status.toLowerCase()}`}>{paper.status}</span></div>
        <h2><Link to={`/work/${paper.id}`}>{paper.fullTitle}</Link></h2>
        <p>{paper.summary}</p>
        <div className="publication-links"><Link className="text-button" to={`/work/${paper.id}`}>Research details<ArrowUpRight size={16}/></Link>{paper.source && <a className="text-button" href={paper.source} target="_blank" rel="noopener noreferrer">{paper.sourceLabel}<ArrowUpRight size={16}/></a>}</div>
      </div>
    </article>)}</div>
    <a className="button secondary" href="/#work">Explore all research & projects<ArrowUpRight size={16}/></a>
  </main><footer className="container footer"><Link to="/">Ronald Obal · Research & M&amp;E</Link><Link to="/gallery">Explore the gallery →</Link><LegalLinks/></footer></>;
}
