# Deployment

See [OPERATIONS.md](./OPERATIONS.md) for the current build, routing, privacy, contact-storage and Sanity webhook instructions.

Production target: Vercel, branch `main`, repository root.
Install: `npm ci --legacy-peer-deps`. Build: `npm run build`.
Use Node 22+. Deploy the generated Vercel Build Output API output; do not restore the old catch-all SPA rewrite.
