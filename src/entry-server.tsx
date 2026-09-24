import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { SiteRoutes } from './App';
import { ContentContext } from './lib/content';
import { SeoCollector, type SeoProps } from './lib/seo';

export function render(path: string, posts: unknown[]) {
  let metadata: SeoProps | undefined;
  const html = renderToString(<ContentContext.Provider value={posts}><SeoCollector.Provider value={value => { metadata = value; }}><StaticRouter location={path}><SiteRoutes/></StaticRouter></SeoCollector.Provider></ContentContext.Provider>);
  if (!metadata) throw new Error(`Missing metadata for ${path}`);
  return { html, metadata };
}
