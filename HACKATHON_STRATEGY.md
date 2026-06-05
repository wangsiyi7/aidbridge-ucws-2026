# Hackathon Strategy

## Competition Signals

From the local UCWS material and public event page:

- Core motto: "No rules, just create."
- Luma Demo Day copy emphasizes real use and real outcome rather than a one-off demo.
- Main tracks: Agent, Skill, Application.
- Platform notice also references DeepResearch as an additional selectable track.
- Required submission fields include project name, tagline, description, demo URL, repo URL, track, tech stack, screenshot, and team members.
- Public scoring emphasizes community vote, AI evaluation, and expert judges.
- The official project wall currently requires sign-in before anonymous visitors can inspect projects.

## Public Competitor Pattern

Public GitHub/search results show a crowded center:

- Multi-agent finance and portfolio analysis.
- Voice assistant demos.
- Agent framework and skill marketplace projects.
- Claude/Codex/OpenClaw skills and workflow plugins.
- Singapore guide or language learning apps.

Visible public GitHub stars are low across UCWS-specific repos, so repo polish and immediate usability can create disproportionate advantage.

## AidBridge Positioning

AidBridge should be submitted as:

> A public-good application that helps frontline humans turn chaotic requests for help into safe, auditable action.

This is differentiated because:

- It is not another developer-only skill or framework.
- It solves a high-emotion, high-trust workflow that judges can understand in 30 seconds.
- It is usable by non-technical volunteers.
- It creates a concrete artifact: a field pack.
- It balances AI ambition with deterministic auditability, privacy safeguards, and resource matching.

## Score Alignment

### Community Vote

The demo is easy to test. A voter can paste any emergency-adjacent message and immediately see value: risk, response, redacted brief, resource match, configurable directory, shareable field pack, and an outcome estimate.

### AI Evaluation

The repo is simple, structured, testable, and honest about the deterministic engine. The core logic is isolated in `app.js` and verified by `tests/triage.test.mjs`, including need detection, privacy redaction, resource matching, CSV directory import, case-quality audit, impact estimation, evaluation JSON, and field-pack export. `benchmarks/run.mjs` adds a four-scenario evaluation report so automated and human reviewers can inspect behavior beyond one cherry-picked prompt.

### Expert Judges

The project has real-world stakes, global applicability, measurable operational impact, and a credible expansion path into RAG, multilingual extraction, verified resource directories, privacy-safe case sharing, and human-in-the-loop case review.

## First-Place Pitch Angle

Most hackathon AI demos stop at "the model gave an answer." AidBridge focuses on what happens next: consent, privacy, risk, evidence, resource matching, routing, and handoff. That makes it feel like infrastructure for real-world care rather than a chatbot wrapper.

## Next Upgrade With More Time

Add a signed resource verification workflow:

- Verification date and verifier identity
- Eligibility rules
- Opening hours and service area
- Contact channel and escalation owner
- Distance or region matching
- Outcome tracking after handoff

Then rank resources based on need, distance, language, opening hours, and verification freshness.
