# UCWS Project Wall Fields

## Project Name

AidBridge

## Tagline

Multilingual community-aid triage that turns messy help requests into verified action packs.

## Track

Application

Recommended additional selection if the platform allows it: DeepResearch.

## Description

AidBridge helps frontline volunteers, school counsellors, NGOs, and mutual-aid teams respond to urgent requests for help. A user can paste a messy WhatsApp, hotline, or walk-in message, choose the operating context, and generate a structured field pack in seconds. Teams can also open Ops Desk to see a multi-case duty queue, urgency ordering, resource pressure, aggregate minutes saved, and a copy-ready command brief.

The pack includes a first response, risk and confidence score, detected needs, a next-60-minute action plan, a privacy-safe redacted brief, trusted resource matches, resource-routing guidance, an evidence ledger, a follow-up clock, and a human handoff script. The live Crisis Map visualizes every case from intake signal to need radar, resource route, evidence lock, and human handoff, making the workflow understandable at a glance. Its Play Flow tour can auto-walk judges through the path during a short demo. Teams can also paste a local CSV resource directory and immediately rerun matching against their own verified services. The Judge Lens view runs a live case-quality audit across safety, privacy, evidence, resource fit, handoff clarity, and field readiness, then exports machine-readable JSON for review. The Impact Lens estimates the operational outcome: manual baseline minutes, AidBridge run minutes, time saved, privacy signals, and resource routes. The Singapore Launch Lens scores go-to-market readiness across multilingual coverage, frontline channels, resource-directory portability, privacy-safe export, human handoff, proof package, and urgent-route readiness. The repo also includes a four-scenario benchmark report with 4/4 passing cases, average audit score 100, average operator minutes saved 47, and 100% redaction pass rate. The current demo runs entirely in the browser with a deterministic triage engine so the product is testable without accounts, API keys, or a backend. The architecture is designed to upgrade cleanly into LLM extraction, retrieval over verified local service directories, privacy review, and human-in-the-loop ownership.

New final-stage addition: AidBridge now includes a Hackathon Constellation Hub. A judge or builder can paste a full hackathon idea dump, and the Hub automatically turns it into a visual star map of problem signals, beneficiaries, AI layers, data sources, safety guardrails, visual demo hooks, evaluation proof, and submission artifacts. Clicking nodes reveals the strongest path from raw idea to Project Wall-ready output. The Hub also generates guided filling fields for the Project Wall and exposes a static Codex bridge API through `window.AidBridgeCodex`, browser events, and `api/codex-bridge.mjs`, allowing Codex or another agent to inject idea text and read the generated constellation payload.

AidBridge is built for AI for Good and AI for All: it makes crisis-adjacent support safer for non-experts, lowers the training burden for community teams, and creates consistent evidence records before a case is handed off.

## Demo URL

https://wangsiyi7.github.io/aidbridge-ucws-2026/?demo=1

## Repo URL

https://github.com/wangsiyi7/aidbridge-ucws-2026

## Tech Stack

- HTML
- CSS
- JavaScript ES modules
- Deterministic triage/risk-scoring engine
- Ops Desk multi-case queue and resource-pressure model
- Dynamic Crisis Map visualization
- Hackathon Constellation Hub canvas visualization
- Guided Project Wall field builder
- Privacy redaction layer
- Resource matching directory
- Local CSV directory importer
- Case-quality audit engine
- Impact/outcome estimation layer
- Singapore Launch Lens readiness engine
- Static Codex bridge API
- Browser CustomEvent integration
- ES module API in `api/codex-bridge.mjs`
- Machine-readable evaluation JSON
- Four-scenario benchmark harness
- GitHub Pages branch deployment
- Browser Clipboard API
- Node-based test file for the core engine

## Screenshot

Use `assets/screenshot.png` after browser verification.

Optional stronger judge-focused screenshot:

```text
assets/screenshot-judge.png
```

Team operations screenshot:

```text
assets/screenshot-ops.png
```

Final-stage visual Hub screenshot:

```text
assets/screenshot-hub.png
```

## Team Members

To be filled with the real team member names and profiles.

## Optional Demo Video Script

1. Paste a messy urgent help request from WhatsApp.
2. Select channel, language, and operator mode.
3. Generate the action pack.
4. Show urgency, confidence, detected needs, first response, redacted brief, trusted resource matches, resource route, and evidence ledger.
5. Open Directory, paste a two-row CSV, and show the matched resources change.
6. Open Judge Lens and show the live case-quality score, Impact Lens, and machine-readable JSON.
7. Open Field Pack and copy the one-page operator brief.
8. Explain why deterministic output is safer for frontline workflows and how LLM/RAG can extend the same schema with verified resource directories.

## One-Sentence Pitch

AidBridge is the bridge between a chaotic cry for help and a safe, auditable community response.

## Optional Demo File / Pitch Deck

Use:

```text
assets/AidBridge_UCWS_Pitch.pptx
```

This is a 6-slide editable deck covering problem, product workflow, differentiation, UCWS scoring alignment, and submission readiness.

## Evaluation Evidence

Use:

```text
EVALUATION_REPORT.md
assets/evaluation-report.json
AI_NATIVE_ARCHITECTURE.md
```

Current benchmark summary: 4/4 cases passed, average audit score 100, average operator minutes saved 47, redaction pass rate 100%.

## Public Sharing Assets

- Social card: `assets/social-card.svg`
- Judge Lens screenshot: `assets/screenshot-judge.png`
- Constellation Hub screenshot: `assets/screenshot-hub.png`
- Community vote copy: `COMMUNITY_VOTE_KIT.md`
- Safety stance: `ETHICS_AND_SAFETY.md`
