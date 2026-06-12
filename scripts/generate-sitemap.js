import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const sanity = createClient({
  projectId: 'khbx2r3z',
  dataset: 'blog',
  useCdn: true,
  apiVersion: '2026-02-26',
});

const BASE_URL = 'https://ronaldobal.com';

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/services', priority: '0.7', changefreq: 'monthly' },
  { url: '/portfolio', priority: '0.7', changefreq: 'monthly' },
  { url: '/data-analytics-research-portfolio', priority: '0.7', changefreq: 'monthly' },
  { url: '/blog', priority: '0.6', changefreq: 'weekly' },
  { url: '/contact', priority: '0.5', changefreq: 'monthly' },
];

async function generateSitemap() {
  try {
    // Fetch all blog posts with slugs
    const posts = await sanity.fetch(
      `*[_type == "post"] { slug, _updatedAt } | order(_updatedAt desc)`
    );

    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static pages
    staticPages.forEach(page => {
      const lastmod = new Date().toISOString().split('T')[0];
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${BASE_URL}${page.url}</loc>\n`;
      sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
      sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${page.priority}</priority>\n`;
      sitemap += `  </url>\n`;
    });

    // Add blog posts
    posts.forEach(post => {
      if (post.slug && post.slug.current) {
        const lastmod = post._updatedAt ? post._updatedAt.split('T')[0] : new Date().toISOString().split('T')[0];
        sitemap += `  <url>\n`;
        sitemap += `    <loc>${BASE_URL}/blog/${post.slug.current}</loc>\n`;
        sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
        sitemap += `    <changefreq>monthly</changefreq>\n`;
        sitemap += `    <priority>0.7</priority>\n`;
        sitemap += `  </url>\n`;
      }
    });

    sitemap += '</urlset>';

    // Write to public folder so it's served statically
    const publicDir = path.join(path.resolve('./public'), 'sitemap.xml');
    fs.writeFileSync(publicDir, sitemap, 'utf-8');
    console.info(`OK Sitemap generated with ${staticPages.length} static pages + ${posts.length} blog posts`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
