# Deployment

AidBridge is a static app. Deploy the `aidbridge/` directory as the site root.

## GitHub Pages

1. Push the `aidbridge/` directory to a GitHub repository.
2. Enable Pages for the repository.
3. Set the publishing source to the `main` branch root.
4. Use the Pages URL as the UCWS Demo URL.

The `.nojekyll` file is included so GitHub Pages serves static assets directly.

## Netlify

1. Drag and drop the `aidbridge/` folder into Netlify Drop, or connect the GitHub repo.
2. Build command: none.
3. Publish directory: `aidbridge` if deploying from the parent repo, or `.` if the repo root is `aidbridge`.

`netlify.toml` is included for static publishing and basic security headers.

## Vercel

1. Import the GitHub repo.
2. Framework preset: Other.
3. Build command: none.
4. Output directory: `aidbridge` if deploying from the parent repo, or `.` if the repo root is `aidbridge`.

`vercel.json` is included for clean URLs and basic security headers.

## Optional Supabase Backend

AidBridge can stay fully static while syncing action packs and Ops Desk snapshots to Supabase.

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Deploy AidBridge to GitHub Pages, Netlify, or Vercel.
4. Open the deployed app and go to `Ops Desk`.
5. Paste the Supabase project URL and anon public key.
6. Click `Sync Pack`, `Sync Ops`, or `Load Recent`.

Do not use a Supabase service-role key in the browser. For production, tighten the included demo RLS policies with authenticated users and team ownership.

## Local Smoke Test

```bash
node tools/serve.mjs
```

Then open:

```text
http://localhost:8080/
```
