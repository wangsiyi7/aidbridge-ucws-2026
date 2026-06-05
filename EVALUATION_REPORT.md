# AidBridge Evaluation Report

Generated: 2026-06-05T07:57:47.225Z

## Summary

- Cases passed: 4/4
- Average urgency: 85
- Average audit score: 100
- Average operator minutes saved: 47
- Redaction pass rate: 100%

## Benchmark Cases

| Status | Case | Risk | Urgency | Audit | Minutes Saved | Top Resource |
| --- | --- | --- | ---: | ---: | ---: | --- |
| Pass | Migrant worker with medical and work-rights risk | Critical | 100 | 100 | 59 | Migrant Worker Care Desk |
| Pass | Student with food, shelter, and mental-health risk | Critical | 100 | 100 | 54 | ShelterLink Night Desk |
| Pass | Family essentials request with infant and injury signals | Critical | 100 | 100 | 49 | Community Pantry Relay |
| Pass | Document and access loss without immediate danger | Moderate | 39 | 100 | 27 | Document Access Navigator |

## What This Proves

- AidBridge handles more than one cherry-picked demo prompt.
- The project has deterministic, inspectable behavior for AI evaluation.
- The safety and privacy layers are tested as product features, not only described in pitch copy.
- The resource matching layer can be evaluated by scenario rather than by visual impression alone.

Run locally:

```bash
npm run benchmark
```
