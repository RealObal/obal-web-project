import { useLocation, Link } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import LegalLinks from '../components/LegalLinks';
import { Seo } from '../lib/seo';

export default function NotFound({embedded = false}: {embedded?: boolean}) {
  const { pathname } = useLocation();
  return <>{!embedded && <SiteHeader/>}<main id="main" className="container collection-page">
    <Seo title="Page not found | Ronald Obal" description="This page could not be found." path={pathname} noindex/>
    <h1>Page not found.</h1><p>The address may have changed or the content may no longer be available.</p>
    <Link className="button primary" to="/">Return home</Link>
  </main>{!embedded && <footer className="container footer"><LegalLinks/></footer>}</>;
}
