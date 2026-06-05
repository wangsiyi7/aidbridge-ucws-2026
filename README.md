# AidBridge

<p align="center">
  <a href="#english"><kbd>English</kbd></a>
  <a href="#中文"><kbd>中文</kbd></a>
  <a href="./UCWS_SUBMISSION_EN.md"><kbd>UCWS Submission EN</kbd></a>
  <a href="./UCWS_SUBMISSION_CN.md"><kbd>UCWS 提交 CN</kbd></a>
  <a href="https://wangsiyi7.github.io/aidbridge-ucws-2026/?demo=1"><kbd>Live Demo</kbd></a>
  <a href="https://wangsiyi7.github.io/aidbridge-ucws-2026/?view=ops"><kbd>Ops Desk</kbd></a>
  <a href="https://wangsiyi7.github.io/aidbridge-ucws-2026/?view=hub"><kbd>Visual Hub</kbd></a>
</p>

## English

AidBridge turns messy multilingual requests for help into verified, field-ready action packs for community volunteers, school counsellors, NGOs, and mutual-aid teams.

Built for **UCWS Singapore Hackathon 2026** as an Application + DeepResearch-ready public-good project with a Singapore-first, Southeast Asia-ready expansion path.

Live demo: https://wangsiyi7.github.io/aidbridge-ucws-2026/?demo=1

Ops Desk: https://wangsiyi7.github.io/aidbridge-ucws-2026/?view=ops

Visual Hub: https://wangsiyi7.github.io/aidbridge-ucws-2026/?view=hub

Repository: https://github.com/wangsiyi7/aidbridge-ucws-2026

## Problem

Frontline helpers often receive urgent requests through WhatsApp, hotlines, walk-in desks, or informal community chats. The message is usually incomplete, emotional, multilingual, and risky. A volunteer has to decide what to ask, what to solve first, what evidence to preserve, and who should own the follow-up.

That gap causes slow response, inconsistent records, and unsafe handoffs.

## Solution

AidBridge creates a structured aid plan in seconds:

- Detects urgent needs across medical, shelter, food, legal/work-rights, mental health, safeguarding, and document-access categories.
- Scores risk and confidence with a deterministic triage engine.
- Adds an Ops Desk that batch-triages multiple active cases, sorts the queue by urgency, watches resource pressure, rolls up minutes saved, and exports a duty-lead brief.
- Visualizes every case as an interactive Crisis Map from intake signal to human handoff, with a Play Flow tour for demos.
- Adds a Hackathon Constellation Hub inspired by code graph dashboards: paste any UCWS idea and it turns the concept into a visual star map of user signals, AI layers, data sources, safety guardrails, evaluation proof, and submission artifacts.
- Guides Project Wall filling from the Hub by generating title, tagline, description, demo/repo proof, screenshot guidance, missing human fields, and next actions.
- Produces a first response, next-60-minute plan, evidence ledger, and human handoff script.
- Redacts phone numbers, emails, document IDs, and sensitive location fragments before export.
- Matches the case against a demo directory of trusted community resources with fit reasons, language fit, urgency fit, and trust score.
- Imports local CSV resource directories so teams can test their own verified services without a backend.
- Adds a follow-up clock so the operator knows what must happen in the first minutes, first hour, and later check-in.
- Runs a live case-quality audit for safety, privacy, evidence, resource fit, handoff clarity, and field readiness.
- Estimates operational impact: manual baseline minutes, AidBridge run minutes, time saved, privacy signals, and resource routes.
- Adds a Singapore Launch Lens that scores go-to-market readiness across multilingual coverage, frontline channels, local resource-directory portability, privacy-safe export, human handoff, proof package, and urgent-route readiness.
- Exports machine-readable evaluation JSON so judges or automated reviewers can inspect the product output.
- Releases a static Codex bridge API through `window.AidBridgeCodex`, browser events, and `api/codex-bridge.mjs` so Codex or other scripts can inject ideas and read the generated constellation payload.
- Exports a one-page field pack that can be pasted into an NGO case note, volunteer chat, or helpdesk record.

The demo works fully offline in the browser. The engine is deterministic by design so judges can verify behavior through tests. The schema can later support LLM extraction, retrieval over real local service directories, privacy review, and human case ownership.

## Why It Is Different

Public UCWS-related repositories and visible project references cluster around finance agents, voice assistants, developer tools, and agent skills. AidBridge is a finished user-facing application for a public-good workflow that non-technical people can immediately understand and test. The Ops Desk moves it beyond a single-case generator into a team-level operating surface, which is closer to how NGOs, school care teams, and mutual-aid desks actually work.

## Singapore Launch Strategy

AidBridge is positioned as a Singapore-first community-aid operating layer:

- Start with NGOs, school care teams, mutual-aid desks, and migrant-worker support workflows.
- Support Singapore operating languages through the demo resource directory: English, Mandarin, Malay, and Tamil, with additional migrant/region language signals such as Hindi, Bengali, and Mixed input.
- Fit frontline intake channels such as WhatsApp, hotline, walk-in desk, and email.
- Operate a multi-case duty queue instead of only generating one-off case responses.
- Let local teams replace demo resources with their own CSV directory without changing code.
- Keep high-risk decisions human-owned, with privacy-safe exports, evidence notes, and escalation reminders.
- Reuse the same schema for Southeast Asia expansion by swapping language packs, verified local directories, escalation rules, and partner handoff owners.

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

The test suite verifies need detection, risk scoring, privacy redaction, resource matching, CSV import/export, evidence output, Ops Desk queue generation, Crisis Map generation, Singapore Launch Lens readiness scoring, case-quality audit scoring, evaluation JSON, and field-pack formatting.

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

## Codex Bridge API

AidBridge is still deployable as static files, but the Hub exposes a browser and module API:

```js
window.AidBridgeCodex.buildFromIdea("AidBridge: visual hub for UCWS ideas and Project Wall guidance");
window.dispatchEvent(new CustomEvent("aidbridge:codex-idea", {
  detail: { ideaText: "New hackathon idea", showHub: true }
}));
```

Headless/static import:

```js
import { buildCodexHub } from "./api/codex-bridge.mjs";

const hub = buildCodexHub({ ideaText: "New UCWS idea" });
```

The contract is documented in `api/hub-schema.json`.

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
  assets/screenshot-ops.png
  assets/screenshot-hub.png
  assets/screenshot-hub-mobile.png
  assets/evaluation-report.json
  assets/AidBridge_UCWS_Pitch.pptx
  api/codex-bridge.mjs       Static ES module API for Codex/agent handoff
  api/hub-schema.json        Constellation Hub payload contract
  tests/triage.test.mjs      Deterministic engine tests
  tools/serve.mjs            Tiny static server
  AI_NATIVE_ARCHITECTURE.md  LLM/RAG/DeepResearch upgrade path
  EVALUATION_REPORT.md       Benchmark output for judges and AI evaluation
  FINAL_SUBMISSION_PLAYBOOK_CN.md
  UCWS_SUBMISSION_CN.md      Chinese copy-ready UCWS submission package
  UCWS_SUBMISSION_EN.md      English copy-ready UCWS submission package
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

## 中文

AidBridge 是一个面向 UCWS Singapore Hackathon 2026 的社区救援分诊与提交可视化项目。它把 WhatsApp、热线、走访记录或邮件里的混乱求助信息，转化为安全、可审计、可复制的行动包，服务对象包括志愿者、学校辅导员、NGO、一线互助团队和社区运营者。

### 链接

- 主 Demo: https://wangsiyi7.github.io/aidbridge-ucws-2026/?demo=1
- 终局可视化 Hub: https://wangsiyi7.github.io/aidbridge-ucws-2026/?view=hub
- GitHub: https://github.com/wangsiyi7/aidbridge-ucws-2026
- 中文提交材料: ./UCWS_SUBMISSION_CN.md
- English submission package: ./UCWS_SUBMISSION_EN.md

### 新加坡出海定位

AidBridge 采用 Singapore-first, SEA-ready 的定位：先服务新加坡社区救援、学校关怀、NGO intake、互助组织和 migrant-worker support 场景，再通过可替换语言包、本地资源目录、升级规则和 partner handoff owner 扩展到东南亚其他市场。

核心出海能力：

- 支持 English、Mandarin、Malay、Tamil，并覆盖 Hindi、Bengali、Mixed 等区域/移工语言信号。
- 适配 WhatsApp、hotline、walk-in desk、email 等一线求助渠道。
- 支持本地团队用 CSV 替换资源目录，快速本地化。
- 内置隐私脱敏、证据台账、人工交接、follow-up clock 和高风险升级提醒。
- 新增 Singapore Launch Lens，直接给出 go-to-market readiness 分数和 checklist。
- Hackathon Constellation Hub 可以把任意黑客松想法生成星空节点图，并输出 Project Wall 填写引导与 Codex API JSON。

### 技术栈

- HTML5 / CSS3 responsive layout
- JavaScript ES modules
- Canvas 2D visualization
- Deterministic triage and risk-scoring engine
- Privacy redaction layer
- Resource matching directory
- Local CSV parser/importer
- Case-quality audit engine
- Impact/outcome estimation layer
- Singapore Launch Lens
- Hackathon Constellation Hub
- Ops Desk multi-case queue and resource-pressure view
- Browser CustomEvent integration
- Static Codex bridge API
- Node.js tests and benchmark harness
- GitHub Pages static deployment

### UCWS 提交建议

推荐赛道：Application

可选补充赛道：DeepResearch

推荐截图：

- `assets/screenshot-hub.png`
- `assets/screenshot-ops.png`
- `assets/screenshot-judge.png`
- `assets/screenshot.png`

当前 benchmark:

- 4/4 scenarios passed
- Average audit score: 100
- Average operator minutes saved: 47
- Redaction pass rate: 100%
