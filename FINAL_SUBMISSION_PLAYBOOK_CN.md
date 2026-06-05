# AidBridge 最终提交作战手册

当前日期：2026-06-05  
UCWS 项目提交截止：2026-06-05 23:59 SGT，也就是今晚 23:59。

## 最高优先级

先完成公开链接，再优化拉票。

必须拿到：

1. GitHub repo URL
2. Demo URL
3. Project Wall 提交成功页面
4. Project Wall 分享链接

## 15 分钟极速提交路线

### 1. 创建 GitHub 仓库

仓库名建议：

```text
aidbridge-ucws-2026
```

描述建议：

```text
Multilingual community-aid triage that turns messy help requests into safe, auditable action packs.
```

上传整个 `aidbridge/` 文件夹内容，不要只上传 `index.html`。

必须确认 GitHub 里能看到：

```text
README.md
index.html
app.js
styles.css
tests/triage.test.mjs
benchmarks/run.mjs
EVALUATION_REPORT.md
assets/screenshot-judge.png
.github/workflows/pages.yml
```

### 2. 部署 Demo

最快路线：Vercel 或 Netlify 拖拽部署。

如果用 GitHub Pages：

1. 打开仓库 Settings
2. 打开 Pages
3. Source 选择 GitHub Actions
4. 等 Actions 完成
5. 复制 Pages URL

### 3. 填 Project Wall

打开：

```text
https://evol.epicconnector.ai/events/ucws-singapore-hackathon---2026-cxgy/project-wall
```

登录后创建/编辑项目，复制 `PROJECT_WALL_FIELDS.md` 的内容。

推荐截图：

```text
assets/screenshot-judge.png
```

推荐 deck：

```text
assets/AidBridge_UCWS_Pitch.pptx
```

推荐 evaluation evidence：

```text
EVALUATION_REPORT.md
assets/evaluation-report.json
```

## 项目墙精简描述

如果平台描述字数有限，用这版：

```text
AidBridge helps frontline volunteers, counsellors, NGOs, and mutual-aid teams turn messy urgent help requests into safe, auditable action packs. It detects needs, scores urgency, generates a first response, creates a next-60-minute plan, redacts sensitive details, matches trusted resources, builds an evidence ledger, and exports a human handoff script.

The Judge Lens audits each case across safety, privacy, evidence, resource fit, handoff clarity, and field readiness. The Impact Lens estimates manual baseline time, AidBridge run time, operator minutes saved, privacy signals, and resource routes. The repo includes deterministic tests plus a four-scenario benchmark: 4/4 cases passed, average audit score 100, average operator minutes saved 47, redaction pass rate 100%.
```

## 60 秒演示讲法

```text
AidBridge is not another chatbot answer. It is an operating layer for community aid intake.

I paste a messy WhatsApp-style request. AidBridge detects urgent needs, scores risk, writes a safe first response, creates a next-60-minute plan, redacts sensitive details, matches trusted resources, and builds a human handoff pack.

The key difference is verifiability. Judge Lens gives a 100/100 case-quality audit across safety, privacy, evidence, resource fit, handoff clarity, and field readiness. Impact Lens estimates operator minutes saved and resource routes. The repo includes tests and a four-scenario benchmark, so this is not a one-prompt demo.

Today it runs deterministically in the browser for trust and reproducibility. The same schema can upgrade into LLM extraction and RAG over verified local service directories.
```

## 拉票文案

```text
We built AidBridge for UCWS Singapore Hackathon 2026.

AidBridge turns messy urgent help requests into safe, auditable action packs for volunteers, counsellors, NGOs, and mutual-aid teams.

It is built around real outcome: risk score, first response, privacy-safe brief, resource matching, evidence ledger, follow-up clock, human handoff, Judge Lens audit, and Impact Lens estimate.

If you believe AI should help frontline humans respond faster and safer, please vote for AidBridge.

[PROJECT_WALL_URL]
```

## 最终检查

提交前确认：

- Demo URL 能打开
- GitHub repo 是 public
- README 第一屏能说明项目
- Project Wall 截图清晰
- Demo URL 和 Repo URL 都填了
- Track 选 Application，能多选时加 DeepResearch
- Team members 填真实名字
- 提交后复制 Project Wall URL 开始拉票
