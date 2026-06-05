# Submission Checklist

## Ready Now

- Static demo app: `index.html`
- Responsive UI: `styles.css`
- Core triage engine: `app.js`
- Logo: `assets/logo.svg`
- Tests: `tests/triage.test.mjs`
- Scenario benchmark: `benchmarks/run.mjs`
- Evaluation report: `EVALUATION_REPORT.md`, `assets/evaluation-report.json`
- AI-native architecture note: `AI_NATIVE_ARCHITECTURE.md`
- Chinese final submission playbook: `FINAL_SUBMISSION_PLAYBOOK_CN.md`
- Privacy redaction, resource matching, and follow-up clock built into the demo
- Interactive Crisis Map workflow visualization built into the demo
- Hackathon Constellation Hub built into the demo for idea-to-submission star-map visualization
- Guided Project Wall field builder built into the Hub
- Static Codex bridge API: `window.AidBridgeCodex`, `api/codex-bridge.mjs`, and `api/hub-schema.json`
- Local CSV resource-directory import built into the demo
- Judge Lens case-quality audit and JSON export built into the demo
- Impact Lens outcome estimate built into the demo
- Local server: `tools/serve.mjs`
- UCWS copy-ready fields: `PROJECT_WALL_FIELDS.md`
- Official platform/API research: `OFFICIAL_PLATFORM_API_RESEARCH.md`
- Submission audit: `SUBMISSION_AUDIT.md`
- Demo script: `DEMO_SCRIPT.md`
- Judge Q&A: `JUDGE_QA.md`
- Editable pitch deck: `assets/AidBridge_UCWS_Pitch.pptx`
- Hub screenshots: `assets/screenshot-hub.png`, `assets/screenshot-hub-mobile.png`
- Ethics and safety note: `ETHICS_AND_SAFETY.md`
- Community vote copy: `COMMUNITY_VOTE_KIT.md`
- Social card: `assets/social-card.svg`
- Vercel config: `vercel.json`
- Netlify config: `netlify.toml`
- GitHub Pages branch deployment config: `.nojekyll`
- Competitive strategy: `HACKATHON_STRATEGY.md`
- Research notes: `COMPETITOR_RESEARCH.md`

## Before Final Project Wall Submission

- Deploy the app and paste the public Demo URL.
- Push the project to GitHub and paste the Repo URL.
- Add the actual team member names.
- Generate and upload a fresh screenshot from the deployed app.
- Optional: record a 60-90 second demo video using the script in `PROJECT_WALL_FIELDS.md`.
- Optional: upload `assets/AidBridge_UCWS_Pitch.pptx` as pitch/demo file if the platform exposes a file field.
- Optional: replace `[DEMO_URL]`, `[REPO_URL]`, and `[PROJECT_WALL_URL]` in `COMMUNITY_VOTE_KIT.md` after deployment/submission.

## Suggested Track Selection

Primary: Application

Secondary if allowed: DeepResearch

Reason: the platform reminder says only DeepResearch can be selected along with the three main tracks. AidBridge is mainly a public-good application, with a research-ready evidence and routing layer.

## Submission Positioning

Lead with the user:

> Community helpers receive urgent, multilingual, incomplete requests every day. AidBridge turns those messages into a safe action plan, evidence ledger, and human handoff in seconds.

Avoid overclaiming:

- Do not claim it replaces emergency services.
- Do not claim medical/legal advice.
- Present it as a triage and handoff assistant for trained humans.

## Demo Flow

1. Load the migrant worker sample.
2. Show detected Medical care and Legal or work rights.
3. Show urgent score, interactive Crisis Map, redacted brief, matched resources, and evidence ledger.
4. Click Hub and show the Hackathon Constellation star map generated from the AidBridge idea seed.
5. Paste a new UCWS idea sentence, click Build Stars, then click a node and show the guided Project Wall fields plus Codex bridge JSON.
6. Click Directory, apply a custom CSV, and show matching changes.
7. Click Judge Lens and show the 100/100 case-quality audit, Impact Lens, and JSON export.
8. Click Field Pack.
9. Copy the pack and explain how it fits WhatsApp, NGO CRM, or helpdesk notes.

## What Still Needs External User Action

- Epic Connector login is required for the actual Project Wall submission.
- Public deployment and GitHub push require the user's hosting/GitHub account.
