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

The app and build must remain stable when these variables are missing. Sanity-backed content falls back to empty states, the sitemap still includes static routes, and the contact form asks users to email directly when Supabase is not configured.

## Optional prerender

The normal Vercel build does not require prerendering. To run the optional local prerender path:

```bash
ENABLE_PRERENDER=true npm run build
```
