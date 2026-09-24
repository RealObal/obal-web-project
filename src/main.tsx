import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import './fonts.css';
import './portfolio.css';

const app = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);

const root = document.getElementById('root')!;
if (root.hasChildNodes()) hydrateRoot(root, app); else createRoot(root).render(app);
