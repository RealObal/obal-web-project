# Deployment and privacy handoff

## What the build does

`npm run build` fetches one public Sanity snapshot, generates metadata-free image
variants, builds the client and React server renderer, and renders all public
routes. It writes `dist` and Vercel Build Output API files in `.vercel/output`.
The build fails if Sanity cannot be read or contains duplicate/invalid slugs.
Do not deploy a partially completed `dist` directory after a failed build.

Use Node 22 or newer. Vercel must run the repository build command and consume
the generated `.vercel/output`. This includes real 404 responses, permanent
redirects, preview noindex headers, and the two server functions. A static-only
upload of `dist` does not include those functions or routing rules.

The live Vercel project uses `www.ronaldobal.com` as its primary domain. The generated routes and canonical URLs follow that setting; the apex domain redirects to `www`. Production must not have a dashboard noindex header.
Preview builds are detected through Vercel's `VERCEL_ENV` and receive both
noindex HTML and an X-Robots-Tag header. Vercel deployment protection is also
recommended for private previews.

## Sanity publishing

Create a Vercel Deploy Hook for the production branch and store its URL as
`VERCEL_DEPLOY_HOOK`. Generate a random secret of at least 32 characters and
store it as `SANITY_WEBHOOK_SECRET` in Vercel.

In Sanity project settings, create a webhook to
`https://www.ronaldobal.com/api/revalidate`, triggered on create/update/delete for
published posts (`_type == "post" && !(_id in path("drafts.**"))`). Configure
the custom header `Authorization: Bearer <the same secret>`. Include deletions
so removed posts leave the sitemap. Also rebuild after author/category changes.
Never put either secret into a VITE_ variable or browser code. The generated
HTML and browser content use the same snapshot; a completed deployment is
required for newly published content to appear.

## Enquiry storage: disabled until configured

The website currently offers email contact. To enable secure online enquiries:

1. Choose a retention period (1–365 days). The owner has not yet supplied one.
2. Review the Supabase processing location, processor terms, cross-border
   safeguards and applicable Ugandan registration obligations with the owner.
3. Review/apply `supabase/migrations/20260924_contact_security.sql` in the actual
   project. Enable Supabase Cron and schedule both deletion statements daily.
4. Check legacy `contact_submissions` policies and grants separately. Existing
   records are not deleted by the migration; legacy public grants are revoked. Verify anonymous
   clients cannot SELECT, UPDATE or DELETE any enquiries.
5. Set server-only Vercel variables: `SUPABASE_URL`,
   `SUPABASE_SERVICE_ROLE_KEY`, `CONTACT_HASH_SECRET` (random, 32+ characters),
   `CONTACT_RETENTION_DAYS=90`, and `CONTACT_PRIVACY_READY=true`.
6. Review `/privacy` against the verified processing arrangements. The notice already states 90-day retention. Record
   the date and update the form/API notice version together if wording changes.
7. Set `VITE_CONTACT_ENABLED=true`, rebuild, and test a consented enquiry.
   Test that expired records are deleted, a fourth submission within an hour
   is rejected, and anonymous reads are denied. Do not use real sensitive data.

No backend settings or database migrations have been applied by this code task.
No service-role key should ever be exposed as VITE_SUPABASE_ANON_KEY or another
VITE_ variable. The old direct-to-database browser implementation was removed.

## Photos and cookies

The owner confirmed on 24 September 2026 that permission exists for identifiable
people and that faces are blurred where permission is absent. This statement
is not an independent verification of releases. Keep the underlying consent
records private, honour removal requests, and re-check new photos before upload.
The build publishes resized WebP derivatives, strips EXIF/XMP/IPTC metadata,
and omits the original images from deployment. Local source images remain in
`public` for development and must not be deployed separately.

No optional analytics or advertising trackers are installed. Do not add a
cosmetic consent banner that does not block tracking. If optional tracking is
introduced, add a consent manager that defaults to rejection, supports withdrawal,
and prevents those scripts from loading until the required consent is given.

## Required live verification after deployment

- Follow each sitemap URL: direct 200, correct canonical, no production noindex.
- `/missing-page`, invalid work IDs and unpublished article URLs: HTTP 404.
- `/privacy`, `/terms`, sitemap, robots and all image/font/JS assets: accessible.
- `/about`, `/services`, `/portfolio`, `/contact`, old image URLs and trailing
  slash variants: expected permanent redirect, no loops.
- Preview: X-Robots-Tag noindex; production: no such header.
- Keyboard navigation, skip links, focus order and mobile layouts in a browser.
- External accounts: Supabase RLS, retention job, webhook and Vercel domain.

Run `npm run test:site` after each build. These tests do not certify legal
compliance or replace the account-level checks above.
