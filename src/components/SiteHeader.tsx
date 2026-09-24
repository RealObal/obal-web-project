import { NavLink } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function SiteHeader() {
  return <><a className="skip-link" href="#main">Skip to content</a><header className="site-header page-header"><div className="container header-inner">
    <NavLink to="/" className="brand" aria-label="Ronald Obal home">ro<span>.</span></NavLink>
    <nav aria-label="Main navigation">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/publications">Publications</NavLink>
      <NavLink to="/blog">Insights</NavLink>
      <NavLink to="/gallery">Gallery</NavLink>
    </nav>
    <a className="header-contact" href="/#contact">Let’s connect<ArrowUpRight size={17}/></a>
  </div></header></>;
}
