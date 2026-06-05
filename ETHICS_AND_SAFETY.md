# Ethics And Safety

AidBridge is a triage and handoff assistant, not a substitute for emergency services, medical advice, legal advice, therapy, or trained case work.

## Safety Principles

- Human ownership: every generated action pack should be reviewed and owned by a human operator.
- Minimal data: collect only what is necessary for safety, consent, routing, and follow-up.
- Privacy first: redact sensitive details before sharing case summaries across channels.
- Escalate urgent risk: if immediate danger is present, contact appropriate emergency or crisis services.
- No autonomous closure: AidBridge should not close a case without human confirmation.
- Local policy wins: resource routing should follow verified local protocols and trusted directories.

## High-Risk Boundaries

AidBridge should not:

- Diagnose medical conditions.
- Interpret law or make legal claims.
- Tell a person to ignore emergency services.
- Encourage confrontation with an abuser, employer, or authority figure.
- Store sensitive data without consent and access controls.
- Share raw personal details where a redacted brief would work.

## Why The Demo Is Deterministic

The hackathon demo uses deterministic extraction, scoring, redaction, and resource matching. That keeps the behavior auditable and testable without a hidden model call. A future LLM layer should be used for extraction assistance, not final authority.

## Future Production Safeguards

- Verified resource-directory owners and review dates.
- Role-based access for case queues.
- Audit logs for generated and edited packs.
- Language-specific escalation disclaimers.
- Human confirmation before external sharing.
- Evaluation set for false-negative urgent cases.
