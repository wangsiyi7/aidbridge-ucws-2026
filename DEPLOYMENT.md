# Deployment

AidBridge is a static app. Deploy the `aidbridge/` directory as the site root.

## GitHub Pages

1. Push the `aidbridge/` directory to a GitHub repository.
2. Enable Pages for the repository.
3. Recommended: set Pages source to GitHub Actions.
4. The included `.github/workflows/pages.yml` workflow runs `npm run verify`, uploads the static site, and deploys it.
5. Use the Pages URL as the UCWS Demo URL.

Alternative manual mode:

1. Enable Pages for the repository.
2. Set the publishing source to the `main` branch root.
3. Use the Pages URL as the UCWS Demo URL.

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

## Local Smoke Test

```bash
node tools/serve.mjs
```

Then open:

```text
http://localhost:8080/
```
