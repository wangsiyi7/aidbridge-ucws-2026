# Judge Q&A

## Is this medical or legal advice?

No. AidBridge is a triage and handoff assistant for humans. It helps operators identify risk, preserve evidence, and route to appropriate support. The product copy should explicitly avoid claiming diagnosis, legal judgment, or replacement of emergency services.

## Why not just use a chatbot?

AidBridge produces an operational artifact, not just a reply. The output includes risk score, redacted brief, matched resources, evidence ledger, follow-up clock, and handoff script. That structure is what makes the case auditable.

## Why deterministic instead of LLM-first?

The demo uses deterministic logic so it can be verified without API keys, accounts, or hidden model behavior. For frontline aid, predictable behavior is a trust advantage. LLM extraction can be added later behind the same schema.

## How can judges verify output quality quickly?

The Judge Lens runs a live case-quality audit across safety escalation, privacy redaction, evidence support, resource fit, handoff clarity, and field readiness. It also exports machine-readable JSON so the same case can be inspected by automated review or copied into a judging note.

## How do you show real outcome, not just a generated answer?

Impact Lens estimates manual baseline time, AidBridge run time, operator minutes saved, privacy signals handled, resource routes, and follow-up checkpoints. The benchmark report currently passes 4/4 frontline scenarios with average audit score 100, average operator minutes saved 47, and redaction pass rate 100%.

## What makes it AI-native?

AidBridge is designed around an AI triage schema: need extraction, risk scoring, redaction, resource retrieval, and human handoff. The current implementation is deterministic for safety, but the architecture is ready for LLM extraction and RAG over verified service directories.

## How does it scale globally?

The workflow is universal: intake, risk, privacy, resource match, evidence, handoff. Local adaptation happens through resource directories, language templates, and escalation policies.

## What is the first paid or partner use case?

NGOs, schools, migrant worker support groups, mutual-aid networks, city helpdesks, and community hotlines that already receive messy intake messages and need safer case routing.

## What would you build next?

1. CSV/Google Sheets importer for verified resource directories.
2. LLM extraction with human review.
3. Case queue and owner assignment.
4. Multilingual template library.
5. Post-handoff outcome tracking.
