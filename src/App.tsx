import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PortfolioExperience from './PortfolioExperience.jsx';

const Blog = lazy(() => import('./pages/Blog'));

function RouteFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-[#f7f5f0]">
      <div className="h-10 w-10 rounded-full border-4 border-[#C9A227] border-t-transparent animate-spin" />
    </div>
  );
}

function PortfolioRoute() {
  const location = useLocation();
  return <PortfolioExperience initialPath={location.pathname} />;
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="/work/:id" element={<PortfolioRoute />} />
          <Route path="/" element={<PortfolioRoute />} />
          <Route path="/about" element={<PortfolioRoute />} />
          <Route path="/services" element={<PortfolioRoute />} />
          <Route path="/portfolio" element={<PortfolioRoute />} />
          <Route path="/data-analytics-research-portfolio" element={<PortfolioRoute />} />
          <Route path="/contact" element={<PortfolioRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
