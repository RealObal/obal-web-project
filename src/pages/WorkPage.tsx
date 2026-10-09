import { useParams, Link } from 'react-router-dom';
import { work } from '../portfolioData.js';
import SiteHeader from '../components/SiteHeader';
import LegalLinks from '../components/LegalLinks';
import { Seo } from '../lib/seo';
import NotFound from './NotFound';
import MediaImage from '../components/MediaImage';

export default function WorkPage() {
  const { id } = useParams();
  const item = work.find(entry => entry.id === id);
  if (!item) return <NotFound/>;
  return <><SiteHeader/><main id="main" className="container collection-page legal-page">
    <Seo title={`${item.fullTitle} | Ronald Obal`} description={item.summary} path={`/work/${item.id}`} type={item.type === 'Publication' ? 'article' : 'website'} jsonLd={{'@context':'https://schema.org','@type':item.type === 'Publication' ? 'ScholarlyArticle' : 'CreativeWork',name:item.fullTitle,description:item.summary,url:`https://www.ronaldobal.com/work/${item.id}`,sameAs:item.source}}/>
    <Link to="/publications">← Publications</Link><p className="eyebrow">{item.type} · {item.status} · {item.year}</p>
    <h1>{item.fullTitle}</h1><p>{item.summary}</p>
    {item.id === 'drought-soya-bean' && <figure className="research-field-photo"><MediaImage src={item.image} alt="Ronald Obal and a participant examining produce in a cultivated field" fetchPriority="high"/><figcaption>{item.imageCaption}</figcaption></figure>}
    <dl><dt>Role / contribution</dt><dd>{item.role}</dd><dt>Context</dt><dd>{item.context}</dd></dl>
    <h2>Overview</h2><p>{item.detail}</p><h2>At a glance</h2><ul>{item.takeaways.map(point => <li key={point}>{point}</li>)}</ul>
    {item.source?.startsWith('https://doi.org/') ? <><h2>Evidence &amp; source</h2><p>{item.citation ? item.citation.replace(item.source, '').trim() : item.context}</p><p>DOI: <a href={item.source} target="_blank" rel="noopener noreferrer">{item.source.replace('https://doi.org/', '')}</a></p></> : <><h2>Evidence &amp; source</h2><p>{item.evidence}</p></>}
    {item.source && <a className="button primary" href={item.source} target="_blank" rel="noopener noreferrer">{item.sourceLabel}</a>}
    <p><a href="/#work">Explore all work</a></p>
  </main><footer className="container footer"><LegalLinks/></footer></>;
}
