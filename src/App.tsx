import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PortfolioExperience from './PortfolioExperience.jsx';

import Blog from './pages/Blog';
import Publications from './pages/Publications';
import Gallery from './pages/Gallery';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';
import WorkPage from './pages/WorkPage';
import { ContentContext, readContentSnapshot } from './lib/content';

function PortfolioRoute() {
  return <PortfolioExperience initialPath="/" />;
}


function PageScroll() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
    else requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
  }, [pathname, hash]);
  return null;
}

export function SiteRoutes() {
  return (
    <>
      <PageScroll />

        <Routes>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="/work/:id" element={<WorkPage />} />
          <Route path="/" element={<PortfolioRoute />} />
          <Route path="/about" element={<Navigate to="/#profile" replace />} />
          <Route path="/services" element={<Navigate to="/#services" replace />} />
          <Route path="/portfolio" element={<Navigate to="/#experience" replace />} />
          <Route path="/data-analytics-research-portfolio" element={<Navigate to="/#work" replace />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          <Route path="/privacy" element={<Legal kind="privacy" />} />
          <Route path="/terms" element={<Legal kind="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

    </>
  );
}

export default function App() {
  return <ContentContext.Provider value={readContentSnapshot()}><BrowserRouter><SiteRoutes/></BrowserRouter></ContentContext.Provider>;
}
