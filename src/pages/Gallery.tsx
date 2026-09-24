import MediaImage, {publicImage} from '../components/MediaImage';
import LegalLinks from '../components/LegalLinks';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import { Seo } from '../lib/seo';

const photos = [
  {src:'/Problem.JPG', title:'Programme planning', description:'Workshop and programme planning.'},
  {src:'/community-work.webp', title:'Community learning', description:'Community engagement and learning.'},
  {src:'/About.JPG', title:'Learning together', description:'Facilitated group learning.'},
  {src:'/About%20image.JPEG', title:'Reflection in practice', description:'Reflection and shared learning.'},
  {src:'/Experience.JPEG', title:'Community connections', description:'Community development in practice.'},
  {src:'/M%26E%20collab.png', title:'Working together', description:'Monitoring and evaluation collaboration.'},
];

export default function Gallery() {
  return <><SiteHeader/><main id="main" className="container collection-page">
    <Seo title="Gallery | Ronald Obal" description="Photos from Ronald Obal’s portfolio: community engagement, programme planning, and shared learning." path="/gallery"/>
    <span className="eyebrow">PEOPLE, PRACTICE & PLACE</span>
    <h1>Beyond the<br/><em>numbers.</em></h1>
    <p className="collection-intro">A collection of moments from community work, collaboration, and learning. Select a photo to view the full image.</p>
    <div className="gallery-grid">{photos.map(photo => <figure key={photo.src}>
      <a href={publicImage(photo.src)?.src || photo.src} target="_blank" rel="noopener noreferrer" aria-label={`View ${photo.title.toLowerCase()} photo in a new tab`}><MediaImage src={photo.src} alt={photo.description} loading="lazy"/><span><ArrowUpRight size={20}/></span></a>
      <figcaption><h2>{photo.title}</h2><p>{photo.description}</p></figcaption>
    </figure>)}</div>
  </main><footer className="container footer"><Link to="/">Ronald Obal · Research & M&amp;E</Link><Link to="/publications">Explore publications →</Link><LegalLinks/></footer></>;
}
