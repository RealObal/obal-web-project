export const SITE_URL = 'https://www.ronaldobal.com';
export const redirects = { '/home':'/', '/about':'/#profile', '/services':'/#services', '/portfolio':'/#experience', '/data-analytics-research-portfolio':'/#work', '/contact':'/#contact' };
export const staticRoutes = ['/', '/publications', '/gallery', '/blog', '/privacy', '/terms'];
export const escapeXml = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&apos;');
export const safeJson = value => JSON.stringify(value).replaceAll('<','\\u003c').replaceAll('\u2028','\\u2028').replaceAll('\u2029','\\u2029');
export function postPath(slug) {
  if (typeof slug !== 'string' || !slug || slug !== slug.trim() || /[\/?#\u0000-\u001f]/.test(slug)) throw new Error('Invalid post slug');
  return `/blog/${encodeURIComponent(slug)}`;
}
export function buildSitemap(routes, posts) {
  const modified = new Map(posts.map(post => [postPath(post.slug.current), post.updatedAt]));
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + [...new Set(routes)].map(route => {
    const date = modified.get(route);
    const lastmod = date && Number.isFinite(Date.parse(date)) ? `<lastmod>${new Date(date).toISOString()}</lastmod>` : '';
    return `  <url><loc>${escapeXml(SITE_URL + route)}</loc>${lastmod}</url>`;
  }).join('\n') + '\n</urlset>\n';
}
export function headMarkup(meta, indexable) {
  const url = SITE_URL + (meta.path || '/');
  const image = meta.image || `${SITE_URL}/media/ronald-profile-1024.webp`;
  const tags = {description:meta.description,robots:indexable && !meta.noindex ? 'index, follow' : 'noindex, nofollow','twitter:card':meta.twitterCard || 'summary_large_image','twitter:site':'@real_obal','twitter:title':meta.title,'twitter:description':meta.description,'twitter:image':image};
  const og = {'og:type':meta.type || 'website','og:title':meta.title,'og:description':meta.description,'og:image':image,'og:url':url,'og:site_name':'Ronald Obal'};
  if (meta.publishedAt) og['article:published_time'] = meta.publishedAt;
  if (meta.modifiedAt) og['article:modified_time'] = meta.modifiedAt;
  const schemas = meta.jsonLd ? (Array.isArray(meta.jsonLd) ? meta.jsonLd : [meta.jsonLd]) : [];
  return `<title>${escapeXml(meta.title)}</title><link rel="canonical" href="${escapeXml(url)}">` + Object.entries(tags).map(([name,value]) => `<meta name="${name}" content="${escapeXml(value)}">`).join('') + Object.entries(og).map(([name,value]) => `<meta property="${name}" content="${escapeXml(value)}">`).join('') + schemas.filter(Boolean).map(schema=>`<script type="application/ld+json" data-site-jsonld="true">${safeJson(schema)}</script>`).join('');
}
