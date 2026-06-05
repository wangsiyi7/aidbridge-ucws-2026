# AI-Native Architecture

AidBridge is intentionally deterministic in the submitted browser demo, but the product is designed around an AI-native case schema.

## Why Deterministic First

Frontline aid intake is high-trust work. A hackathon demo that depends on hidden model behavior, private API keys, or a flaky backend is harder for judges to verify and harder for volunteers to trust.

The submitted version keeps the core path deterministic so every judge can inspect:

- Need detection
- Risk scoring
- Privacy redaction
- Resource matching
- Evidence ledger generation
- Case-quality audit
- Impact estimation
- Machine-readable evaluation JSON

This makes the demo reproducible while still showing the exact places where model intelligence can be added.

## AI Upgrade Points

### 1. LLM Extraction

Replace or augment keyword matching with a structured extractor that returns:

```json
{
  "needs": ["medical", "housing", "legal"],
  "urgencySignals": ["fever", "threat", "passport withheld"],
  "missingFields": ["safe callback channel", "exact location"],
  "language": "English",
  "confidence": 0.88
}
```

The deterministic engine can keep acting as a safety fallback and validator.

### 2. RAG Over Verified Directories

The CSV directory importer is the offline version of a future retrieval layer. A production version can retrieve from:

- NGO service directories
- School support contacts
- Family service centres
- Food pantry schedules
- Worker-rights resources
- Verified emergency escalation policies

The result should still be constrained to the existing resource schema:

```json
{
  "name": "Resource name",
  "type": "Service type",
  "needs": ["food", "housing"],
  "languages": ["English", "Mandarin"],
  "availability": "Same-day callback",
  "trust": 90,
  "fit": "Why this is appropriate"
}
```

### 3. Deep Research Case Context

For DeepResearch-style usage, AidBridge can assemble a short context dossier:

- Local policy or eligibility notes
- Verified service opening hours
- Required documents
- Safeguarding escalation rules
- Similar resolved case patterns
- Latest verified source date

The case dossier should feed the same Field Pack and Judge Lens audit, rather than producing a free-form answer.

### 4. Human-in-the-Loop Review

AidBridge should not auto-close high-risk cases. Model output should be gated by:

- Safety escalation check
- Privacy redaction check
- Resource verification freshness
- Human owner assignment
- Follow-up clock
- Outcome status

## Evaluation Contract

The app exports `evaluationJson` so automated judges can inspect the same structure a human sees:

- Input context
- Risk score
- Detected needs
- First response
- Next actions
- Evidence ledger
- Redacted summary
- Matched resources
- Follow-up plan
- Handoff script
- Impact estimate
- Case-quality audit

This contract lets the project upgrade from deterministic demo to LLM/RAG production without changing the visible workflow.

## Why This Fits UCWS

- **Application:** finished browser app with a complete user loop.
- **Agent:** can become an intake-routing agent, but the current version avoids unsafe autonomy.
- **Skill:** the triage/audit/export flow can be packaged as a reusable aid-intake skill.
- **DeepResearch:** can retrieve and summarize verified local support resources into a case dossier.

AidBridge is therefore positioned as a real product first, with clear AI-native expansion paths rather than a fragile model wrapper.
