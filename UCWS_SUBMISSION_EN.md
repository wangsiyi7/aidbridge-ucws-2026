# AidBridge UCWS Submission Package (English)

## 1. Project Name

AidBridge

## 2. Tagline

Multilingual community-aid triage that turns messy help requests into safe, auditable action packs.

## 3. Track

Primary Track: Application

Secondary Track: DeepResearch, if the platform allows an additional selection.

Rationale: AidBridge is a working public-good application with a live browser demo, deterministic evaluation, structured evidence, resource routing, a visual submission Hub, and an AI/RAG-ready architecture.

## 4. Demo URL

Main demo:

https://wangsiyi7.github.io/aidbridge-ucws-2026/?demo=1

Final visual Hub:

https://wangsiyi7.github.io/aidbridge-ucws-2026/?view=hub

## 5. GitHub Repository

https://github.com/wangsiyi7/aidbridge-ucws-2026

## 6. Short Description

AidBridge helps frontline volunteers, school counsellors, NGOs, and mutual-aid teams turn messy WhatsApp, hotline, walk-in, or email help requests into safe, field-ready action packs. It generates risk scores, detected needs, privacy-safe summaries, trusted resource matches, evidence notes, follow-up clocks, and human handoff scripts. The new Ops Desk turns multiple active cases into a duty queue, sorts priority by urgency, watches resource pressure, rolls up minutes saved, and exports a copy-ready command brief for the duty lead. Its Singapore Surge Lab stress-tests migrant-worker, school-care, family-aid, and document-access spikes so judges can see how the system behaves when the night gets worse. The Partner Pilot Pack turns live case, Ops Desk, and Surge Lab evidence into a 14-day Singapore pilot plan for migrant-worker NGOs, school care teams, mutual-aid groups, or CSR community desks. Ops Desk now includes optional Supabase Backend Sync so teams can persist action packs and operations snapshots with a Supabase project URL and anon key.

The final-stage Hackathon Constellation Hub lets a judge or builder paste any UCWS idea and automatically turn it into a visual star map, Project Wall guidance, and a Codex bridge API payload.

## 7. Full Project Description

AidBridge addresses a real operational gap in community aid: urgent requests often arrive incomplete, emotional, multilingual, and risk-heavy. A frontline helper must quickly decide what to ask, what to solve first, what evidence to preserve, what information to redact, which resource can help, and who should own the follow-up.

Most chatbot demos stop at a generated answer. AidBridge is built as an operating layer for trained humans. A user pastes a messy request and receives a complete field-ready action pack:

- Safe first response
- Urgency and confidence score
- Ops Desk multi-case queue and resource-pressure view
- Singapore Surge Lab stress scenarios
- Partner Pilot Pack for 14-day Singapore pilots
- Supabase Backend Sync for persistence
- Detected need categories
- Next-60-minute action plan
- Privacy-safe redacted summary
- Trusted resource matches
- Resource routing guidance
- Evidence ledger
- Follow-up clock
- Human handoff script
- Judge Lens quality audit
- Impact Lens time-saving estimate
- Singapore Launch Lens go-to-market readiness score
- Copy-ready Field Pack
- Machine-readable Evaluation JSON

The Workspace includes an interactive Crisis Map that visualizes a case from intake signal to need radar, resource route, evidence lock, and human handoff. Play Flow automatically walks judges through the case path during a short demo.

The new final-stage Hackathon Constellation Hub extends the project beyond a single aid workflow. Inspired by graph dashboard interfaces, it turns any hackathon idea dump into a visual constellation of problem signals, beneficiaries, AI layers, data sources, safety guardrails, visual demo hooks, evaluation proof, and submission artifacts. The right-side console generates Project Wall guidance, including project name, tagline, description, demo/repo proof, screenshot guidance, missing human fields, and API JSON.

AidBridge also exposes a Codex bridge API through `window.AidBridgeCodex`, browser CustomEvents, and `api/codex-bridge.mjs`. Codex or another agent can inject new idea text, read the generated constellation payload, and use AidBridge as a submission-readiness and content-assembly layer.

The demo runs entirely in the browser. It does not require an account, backend, database, paid model, or API key. The current triage engine is deterministic so judges can verify it through tests and benchmark outputs. The same schema can later support LLM extraction, retrieval over verified local service directories, privacy review, and human case ownership.

## 8. Problem

The problem is not simply the absence of a chatbot response. The deeper issue is the lack of a safe, auditable, repeatable handoff workflow for frontline community-aid teams.

Key pain points:

- Help requests are messy, incomplete, and hard to triage quickly.
- Volunteers have uneven training and may miss safety-critical questions.
- Multilingual and cross-cultural contexts increase the risk of misinterpretation.
- Sensitive details are easily copied into chats or case notes.
- Local resources are fragmented and often depend on personal memory.
- Handoffs are inconsistent, making follow-up fragile.
- Hackathon submissions also become fragmented across demos, docs, screenshots, and proof artifacts.

## 9. Solution

AidBridge converts messy input into a structured aid response and makes the workflow visible, auditable, and copy-ready.

Core workflow:

1. Paste a WhatsApp, hotline, walk-in, or email request.
2. Select location, channel, language, and operator mode.
3. Generate an action pack.
4. Review urgency score, detected needs, and Crisis Map.
5. Review first response, action plan, evidence ledger, redacted summary, and resource matches.
6. Import a local CSV resource directory and rerun matching.
7. Use Judge Lens and Impact Lens to inspect quality and estimated outcome.
8. Copy the one-page Field Pack.
9. Use the Hub to convert project ideas into constellation nodes, Project Wall guidance, and Codex API JSON.
10. Use Ops Desk to inspect the multi-case queue, resource load, bottlenecks, and duty-lead brief.
11. Run Singapore Surge Lab to show a pressure scenario and copy the first-move surge brief.

## 10. Key Features

- Multilingual aid triage for messy help requests
- Deterministic urgency and confidence scoring
- Ops Desk for batch case triage, priority sorting, resource pressure, and duty-lead briefs
- Singapore Surge Lab for migrant-worker, school-care, family-aid, and document-access stress tests
- Partner Pilot Pack for NGO, school-care, mutual-aid, and CSR pilot planning
- Supabase Backend Sync for action packs and Ops Desk snapshots
- Need detection for medical care, shelter, food access, legal/work rights, mental health, safeguarding, documents, and access
- Interactive Crisis Map visualization
- Play Flow auto-tour for judge demos
- Privacy redaction for phone numbers, emails, document IDs, and sensitive location fragments
- Trusted resource matching by need, language, urgency fit, and trust score
- Local CSV resource directory import
- Evidence ledger generation
- Follow-up clock for first minutes, first hour, next day, and later check-ins
- Human handoff script
- Judge Lens audit for safety, privacy, evidence, resource fit, handoff clarity, and field readiness
- Impact Lens for manual baseline time, AidBridge run time, minutes saved, privacy signals, and resource routes
- Singapore Launch Lens for multilingual coverage, frontline channels, resource-directory portability, privacy-safe export, human handoff, proof package, and urgent-route readiness
- Machine-readable Evaluation JSON
- Hackathon Constellation Hub for idea-to-submission visualization
- Guided Project Wall field builder
- Static Codex bridge API for browser and module-based agent handoff

## 11. Technical Stack

- HTML5
- CSS3 responsive layout
- JavaScript ES modules
- Canvas 2D visualization
- Deterministic triage and risk-scoring engine
- Ops Desk multi-case queue and resource-pressure model
- Singapore Surge Lab stress simulator
- Partner Pilot Pack generator
- Supabase REST sync client
- Keyword and rule-based need detection
- Privacy redaction layer
- Resource matching directory
- Local CSV parser/importer
- Case-quality audit engine
- Impact/outcome estimation layer
- Singapore Launch Lens readiness engine
- Hackathon Constellation Hub renderer
- Browser CustomEvent integration
- Static Codex bridge API
- Browser Clipboard API
- Machine-readable JSON export
- Node.js test runner
- Scenario benchmark harness
- GitHub Pages static deployment
- Supabase SQL schema and RLS policies
- Vercel and Netlify static deployment configs

## 12. API / Codex Bridge

Browser global:

```js
window.AidBridgeCodex.buildFromIdea("AidBridge: visual hub for UCWS ideas and Project Wall guidance");
```

Browser event:

```js
window.dispatchEvent(new CustomEvent("aidbridge:codex-idea", {
  detail: {
    ideaText: "New UCWS idea",
    showHub: true
  }
}));
```

Static ES module:

```js
import { buildCodexHub } from "./api/codex-bridge.mjs";

const hub = buildCodexHub({
  ideaText: "New UCWS idea"
});
```

API schema:

https://wangsiyi7.github.io/aidbridge-ucws-2026/api/hub-schema.json

## 13. Evaluation Evidence

Current benchmark result:

- Scenario benchmark: 4/4 passed
- Average audit score: 100
- Average operator minutes saved: 47
- Redaction pass rate: 100%

Evidence files:

- `tests/triage.test.mjs`
- `benchmarks/run.mjs`
- `EVALUATION_REPORT.md`
- `assets/evaluation-report.json`
- `AI_NATIVE_ARCHITECTURE.md`

The test suite verifies:

- Need detection
- Risk scoring
- Privacy redaction
- Resource matching
- CSV import/export
- Evidence output
- Crisis Map generation
- Hub constellation generation
- Codex bridge metadata
- Judge Lens audit
- Impact Lens estimate
- Evaluation JSON
- Field Pack formatting

## 14. UCWS Alignment

### AI for Good

AidBridge supports community aid, school support, NGO intake, and mutual-aid teams. It helps non-expert frontline humans respond faster and safer in crisis-adjacent situations.

### AI for All

The demo requires no account, backend, model key, paid service, or database. Any judge, volunteer, student, or builder can open the browser and test it immediately.

### Working Product

The submission includes a public demo, GitHub repository, screenshots, tests, benchmark report, evaluation JSON, Project Wall copy, pitch deck, and deployment configuration.

### Technical Depth

AidBridge includes a triage engine, privacy layer, resource matching, CSV import, audit engine, impact estimator, Canvas Hub, Codex API, and static deployment pipeline.

### Safety and Responsibility

AidBridge does not replace doctors, lawyers, police, emergency responders, or trained professionals. It is a triage and handoff assistant for humans, with privacy redaction, evidence records, and explicit human review.

### Differentiation

AidBridge is not another generic chatbot or agent demo. It delivers an operating layer: action pack, resource route, evidence, audit, impact estimate, Ops Desk, visual Hub, and Codex API. The Ops Desk moves the project from a single-case generator into a team-level duty system, while the Hackathon Constellation Hub gives it a memorable visual identity and turns idea input into submission-ready structure.

## 15. Screenshots

Recommended main screenshot:

```text
assets/screenshot-hub.png
```

Judge Lens screenshot:

```text
assets/screenshot-judge.png
```

Ops Desk screenshot:

```text
assets/screenshot-ops.png
```

Desktop demo screenshot:

```text
assets/screenshot.png
```

Mobile screenshots:

```text
assets/screenshot-mobile.png
assets/screenshot-hub-mobile.png
```

## 16. Pitch Deck

```text
assets/AidBridge_UCWS_Pitch.pptx
```

## 17. 90-Second Demo Flow

1. Open the Demo URL.
2. Load the migrant worker sample.
3. Click Generate action pack.
4. Show urgency, confidence, and detected needs.
5. Show Crisis Map and Play Flow.
6. Show first response, redacted brief, resource matches, and evidence ledger.
7. Open Hub and show the constellation map plus Project Wall guidance.
8. Paste a new UCWS idea and click Build Stars.
9. Show the Codex bridge JSON.
10. Open Directory, import a CSV, and show changed resource matching.
11. Open Judge Lens and show the 100/100 audit plus Impact Lens.
12. Open Field Pack and copy the one-page operator brief.

## 18. Safety Statement

AidBridge does not provide medical, legal, or emergency-service decisions. It does not replace qualified professionals. It helps frontline operators organize information, protect privacy, identify risk, route to trusted resources, and prepare handoff notes. High-risk cases should always be reviewed by trained humans and escalated to local emergency services or qualified professional organizations when needed.

## 19. Team Members

Fill in the real team member names and profile links before submission:

```text
Team Member 1:
Team Member 2:
Team Member 3:
```

## 20. Copy-Ready Project Wall Text

AidBridge is a browser-based community-aid triage system for UCWS Singapore Hackathon 2026. It turns messy WhatsApp, hotline, walk-in, or email help requests into safe, auditable action packs for volunteers, school counsellors, NGOs, and mutual-aid teams.

The product detects urgent needs, scores risk and confidence, generates a safe first response, creates a next-60-minute plan, redacts sensitive details, matches trusted resources, builds an evidence ledger, adds a follow-up clock, and exports a human handoff script. Crisis Map and Play Flow make the path from intake to handoff visible. Judge Lens audits safety, privacy, evidence, resource fit, handoff clarity, and field readiness. Impact Lens estimates operator minutes saved and resource routes.

The final-stage Hackathon Constellation Hub lets judges or builders paste any hackathon idea and automatically generate a visual star map of problem signals, beneficiaries, AI layers, data sources, safety guardrails, evaluation proof, and submission artifacts. The Hub also generates guided Project Wall fields and exposes a static Codex bridge API through `window.AidBridgeCodex`, browser events, and `api/codex-bridge.mjs`.

The demo runs fully in the browser with no account, backend, API key, or database. The repo includes tests and a four-scenario benchmark: 4/4 cases passed, average audit score 100, average operator minutes saved 47, and 100% redaction pass rate.

Demo: https://wangsiyi7.github.io/aidbridge-ucws-2026/?demo=1

Hub: https://wangsiyi7.github.io/aidbridge-ucws-2026/?view=hub

GitHub: https://github.com/wangsiyi7/aidbridge-ucws-2026
