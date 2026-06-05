# AidBridge

AidBridge turns messy multilingual requests for help into verified, field-ready action packs for community volunteers, school counsellors, NGOs, and mutual-aid teams.

Built for **UCWS Singapore Hackathon 2026** as an Application + DeepResearch-ready public-good project.

## Problem

Frontline helpers often receive urgent requests through WhatsApp, hotlines, walk-in desks, or informal community chats. The message is usually incomplete, emotional, multilingual, and risky. A volunteer has to decide what to ask, what to solve first, what evidence to preserve, and who should own the follow-up.

That gap causes slow response, inconsistent records, and unsafe handoffs.

## Solution

AidBridge creates a structured aid plan in seconds:

- Detects urgent needs across medical, shelter, food, legal/work-rights, mental health, safeguarding, and document-access categories.
- Scores risk and confidence with a deterministic triage engine.
- Visualizes every case as an interactive Crisis Map from intake signal to human handoff, with a Play Flow tour for demos.
- Produces a first response, next-60-minute plan, evidence ledger, and human handoff script.
- Redacts phone numbers, emails, document IDs, and sensitive location fragments before export.
- Matches the case against a demo directory of trusted community resources with fit reasons, language fit, urgency fit, and trust score.
- Imports local CSV resource directories so teams can test their own verified services without a backend.
- Adds a follow-up clock so the operator knows what must happen in the first minutes, first hour, and later check-in.
- Runs a live case-quality audit for safety, privacy, evidence, resource fit, handoff clarity, and field readiness.
- Estimates operational impact: manual baseline minutes, AidBridge run minutes, time saved, privacy signals, and resource routes.
- Exports machine-readable evaluation JSON so judges or automated reviewers can inspect the product output.
- Exports a one-page field pack that can be pasted into an NGO case note, volunteer chat, or helpdesk record.

The demo works fully offline in the browser. The engine is deterministic by design so judges can verify behavior through tests. The schema can later support LLM extraction, retrieval over real local service directories, privacy review, and human case ownership.

## Why It Is Different

Public UCWS-related repositories and visible project references cluster around finance agents, voice assistants, developer tools, and agent skills. AidBridge is a finished user-facing application for a public-good workflow that non-technical people can immediately understand and test.

## Run Locally

Use any static file server. With Node:

```bash
npm start
```

Open:

```text
http://localhost:8080/
```

If your environment blocks the default `node` command, use the bundled Codex runtime or any local Node 18+ installation.

## Test

```bash
npm test
```

The test suite verifies need detection, risk scoring, privacy redaction, resource matching, CSV import/export, evidence output, Crisis Map generation, case-quality audit scoring, evaluation JSON, and field-pack formatting.

Run the scenario benchmark:

```bash
npm run benchmark
```

The benchmark generates `EVALUATION_REPORT.md` and `assets/evaluation-report.json` across four frontline scenarios. Current report: 4/4 cases passed, average audit score 100, average operator minutes saved 47, redaction pass rate 100%.

Without npm:

```bash
node tests/triage.test.mjs
node benchmarks/run.mjs
```

## Project Structure

```text
aidbridge/
  index.html                 App shell
  styles.css                 Responsive interface
  app.js                     Triage, redaction, resource matching, and UI binding
  benchmarks/run.mjs         Deterministic scenario benchmark
  LICENSE                    MIT license
  vercel.json                Vercel static deployment config
  netlify.toml               Netlify static deployment config
  site.webmanifest           PWA/share metadata
  robots.txt                 Public crawler policy
  assets/logo.svg            Project logo
  assets/social-card.svg     Open Graph / social preview card
  assets/screenshot.png      Desktop app screenshot
  assets/screenshot-mobile.png
  assets/screenshot-judge.png
  assets/evaluation-report.json
  assets/AidBridge_UCWS_Pitch.pptx
  tests/triage.test.mjs      Deterministic engine tests
  tools/serve.mjs            Tiny static server
  AI_NATIVE_ARCHITECTURE.md  LLM/RAG/DeepResearch upgrade path
  EVALUATION_REPORT.md       Benchmark output for judges and AI evaluation
  FINAL_SUBMISSION_PLAYBOOK_CN.md
  PROJECT_WALL_FIELDS.md     Copy-ready UCWS submission fields
  SUBMISSION.md              Submission checklist
  SUBMISSION_AUDIT.md        Requirement coverage and verification record
  HACKATHON_STRATEGY.md      Competitive strategy
  COMPETITOR_RESEARCH.md     Public research notes
  OFFICIAL_PLATFORM_API_RESEARCH.md
  DEMO_SCRIPT.md             75-90 second demo script
  JUDGE_QA.md                Expected judge questions and answers
  PITCH_DECK.md              Slide-by-slide pitch content
  ETHICS_AND_SAFETY.md       High-risk use boundaries
  COMMUNITY_VOTE_KIT.md      Ready-to-post community voting copy
```

## Roadmap

- Add Bring Your Own Key LLM extraction behind the same schema.
- Add signed verification dates for real-world resource directory entries.
- Add multilingual message templates for more languages.
- Add lightweight admin mode for team queues and follow-up status.

## License

MIT
