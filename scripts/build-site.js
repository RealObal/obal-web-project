import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build, loadEnv } from 'vite';
import { createClient } from '@sanity/client';
import { work } from '../src/portfolioData.js';
import { staticRoutes, redirects, postPath, buildSitemap, headMarkup, safeJson } from './site-utils.js';
import { prepareImages } from './prepare-images.js';

const env = {...loadEnv('production', process.cwd(), ''), ...process.env};
const client = createClient({ projectId:env.VITE_SANITY_PROJECT_ID || 'khbx2r3z', dataset:env.VITE_SANITY_DATASET || 'blog', apiVersion:'2026-02-26', useCdn:false });
// Fail on CMS failure: never publish an incomplete replacement sitemap.
const posts = await client.fetch('*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(coalesce(publishedAt,_createdAt) desc){_id,title,slug,mainImage,body,publishedAt,"created_at":coalesce(publishedAt,_createdAt),"updatedAt":_updatedAt,"authorName":author->name,"categories":categories[]->title}');
if (!Array.isArray(posts)) throw new Error('Invalid CMS response');
const blogRoutes = posts.map(post => postPath(post.slug.current));
if (new Set(blogRoutes).size !== blogRoutes.length) throw new Error('Duplicate blog slugs');
const routes = [...staticRoutes, ...work.map(item => `/work/${item.id}`), ...blogRoutes];
const indexable = !env.VERCEL_ENV || env.VERCEL_ENV === 'production';
const media = await prepareImages();

await build();
const template = await fs.readFile('dist/index.html','utf8');
await build({ build:{ssr:'src/entry-server.tsx',outDir:'.build/server',emptyOutDir:true,copyPublicDir:false} });
const {render} = await import(pathToFileURL(path.resolve('.build/server/entry-server.js')).href);
for (const route of [...routes, '/404']) {
  const {html, metadata} = render(route, posts);
  const page = template.replace('<html lang="en">', `<html lang="en" data-indexable="${indexable}">`).replace('<!--site-head-->',headMarkup(metadata,indexable)).replace('<div id="root"></div>',`<div id="root">${html}</div><script id="site-content" type="application/json">${safeJson(posts)}</script>`);
  const file = route === '/' ? 'dist/index.html' : `dist${route}.html`;
  await fs.mkdir(path.dirname(file),{recursive:true});
  await fs.writeFile(file,page);
}
const sitemap = buildSitemap(routes, posts);
await fs.writeFile('dist/sitemap.xml',sitemap);
await fs.writeFile('public/sitemap.xml',sitemap);
// Publish only resized, metadata-free variants, never original photographs.
for (const original of Object.keys(media)) await fs.unlink(path.join('dist',original.slice(1)));
const output = path.resolve('.vercel/output');
if (!output.startsWith(path.resolve('.') + path.sep)) throw new Error('Unsafe output path');
await fs.rm(output,{recursive:true,force:true});
await fs.mkdir(output,{recursive:true});
await fs.cp('dist',path.join(output,'static'),{recursive:true});
const securityHeaders = {'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Permissions-Policy':'camera=(), microphone=(), geolocation=()'};
if (!indexable) securityHeaders['X-Robots-Tag']='noindex, nofollow';
const routing = [
  {src:'/(.*)',headers:securityHeaders,continue:true},
  {src:'/(.*)',has:[{type:'host',value:'ronaldobal.com'}],headers:{Location:'https://www.ronaldobal.com/$1'},status:308},
  {src:'/(.+)/',headers:{Location:'/$1'},status:308},
  ...Object.entries(redirects).map(([src,dest])=>({src,headers:{Location:dest},status:308})),
  ...Object.entries(media).map(([src,value])=>({src:encodeURI(src).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),headers:{Location:value.src},status:308})),
  {src:'/index.html',headers:{Location:'/'},status:308},
  ...routes.filter(route=>route!=='/').map(route=>({src:`${route}\\.html`,headers:{Location:route},status:308})),
  ...routes.filter(route=>route!=='/').map(route=>({src:route,dest:`${route}.html`})),
  {src:'/api/contact',dest:'/api/contact'},
  {src:'/api/revalidate',dest:'/api/revalidate'},
  {handle:'filesystem'},
  {src:'/(.*)',dest:'/404.html',status:404},
];
await fs.writeFile(path.join(output,'config.json'),JSON.stringify({version:3,routes:routing},null,2));
for (const name of ['contact','revalidate']) {
  const fn = path.join(output,`functions/api/${name}.func`);
  await fs.mkdir(fn,{recursive:true});
  await fs.copyFile(`api/${name}.js`,path.join(fn,'index.mjs'));
  await fs.writeFile(path.join(fn,'.vc-config.json'),JSON.stringify({runtime:'nodejs22.x',handler:'index.mjs',launcherType:'Nodejs'}));
}
console.log(`Rendered ${routes.length} public pages plus 404; sitemap and Vercel output generated.`);
