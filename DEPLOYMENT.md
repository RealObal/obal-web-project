# Deployment

## Vercel

Use Vercel as the only production deployment target.

- Production branch: `main`
- Root directory: repository root (`.`)
- Install command: `npm ci --legacy-peer-deps`
- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Vite

Do not connect Vercel to `gh-pages`. That branch only contains static deployment output and does not include the source tree or root `package.json`.

## GitHub Pages

GitHub Pages deployment is intentionally disabled. The CI workflow builds and uploads `dist` as an artifact only; it does not publish or force-push a `gh-pages` branch.

## Optional environment variables

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Use the existing Sanity project/dataset and the public Supabase anonymous key only. Never expose a Sanity write token or Supabase service-role key in a `VITE_` variable. See `.env.example` for placeholders.

## Preview indexing

Canonical URLs always use `https://ronaldobal.com`. At runtime, pages served from localhost or a Vercel preview hostname emit `noindex, nofollow`; the public production hostname emits `index, follow`. Keep Vercel previews access-restricted where the project plan supports it and review the deployment URL before sharing it.

## Integrated routes

The SPA rewrite in `vercel.json` supports direct requests and browser refreshes for `/work/:id`, `/blog/:slug`, and the retained `/about`, `/services`, `/portfolio`, `/data-analytics-research-portfolio`, and `/contact` routes. The build generates a sitemap containing the static work-detail routes plus any Sanity post slugs available at build time.

For local blog testing, add the exact Vite origin (for example `http://127.0.0.1:5173`) to the existing Sanity project's CORS origins. Production content remains on project `khbx2r3z`, dataset `blog`; no token is required for the public read client. The optional `ENABLE_PRERENDER=true` path also requires the Puppeteer Chromium revision to be installed in the build environment. Leave it disabled unless that renderer dependency is provisioned.

The app and build must remain stable when these variables are missing. Sanity-backed content falls back to empty states, the sitemap still includes static routes, and the contact form asks users to email directly when Supabase is not configured.

## Optional prerender

The normal Vercel build does not require prerendering. To run the optional local prerender path:

```bash
ENABLE_PRERENDER=true npm run build
```
