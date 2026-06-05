# AidBridge UCWS 提交材料（中文版）

## 1. Project Name / 项目名称

AidBridge

## 2. Tagline / 一句话标语

把混乱的求助信息转化为安全、可审计、可执行的社区救援行动包。

## 3. Track / 推荐赛道

Primary Track: Application

Secondary Track: DeepResearch（如果平台允许多选）

选择理由：AidBridge 是一个可直接运行的公共利益应用，同时包含可审计评测、资源匹配、证据结构化、提交 Hub 和可扩展 AI/RAG 架构，符合 Application 的可用产品标准，也具备 DeepResearch 的证据与结构化推理属性。

## 4. Demo URL / 在线演示链接

主 Demo：

https://wangsiyi7.github.io/aidbridge-ucws-2026/?demo=1

终局可视化 Hub：

https://wangsiyi7.github.io/aidbridge-ucws-2026/?view=hub

## 5. GitHub Repository / GitHub 项目链接

https://github.com/wangsiyi7/aidbridge-ucws-2026

## 6. Short Description / 项目短描述

AidBridge 是一个面向志愿者、学校辅导员、NGO 和互助组织的社区救援分诊系统。它可以把 WhatsApp、热线、走访记录等混乱求助信息，在浏览器中快速转化为风险评分、需求识别、隐私脱敏摘要、可信资源匹配、证据台账、后续跟进时钟和人工交接脚本。新增的 Ops Desk 可以把多个并发 case 组成值班队列，自动排序优先级、观察资源压力、汇总节省时间，并生成 duty lead 可复制的运营 brief。Singapore Surge Lab 可以压测 migrant-worker、school-care、family-aid 和 document-access 等新加坡高压场景，让评委看到“今晚更糟时”系统如何排序、暴露瓶颈并输出第一步行动。Ops Desk 还加入可选 Supabase Backend Sync，允许团队用 Supabase project URL 和 anon key 将 action pack 与运营快照同步到云端。

新增的 Hackathon Constellation Hub 可以把任何黑客松想法输入自动构建为星空节点图，并生成 Project Wall 提交引导与 Codex API 输出，让项目从“单一 Demo”升级为“想法到提交的可视化操作系统”。

## 7. Full Project Description / 完整项目描述

AidBridge 解决的是社区救援中的真实高压问题：一线帮助者经常收到不完整、情绪化、多语言、风险不明确的求助信息。信息可能来自 WhatsApp、热线、学校前台、NGO 接待处或社区群聊。志愿者必须在很短时间内判断当前风险、优先解决什么、需要问哪些信息、如何保护隐私、该联系哪些资源、如何保留证据，以及由谁继续跟进。

传统聊天机器人通常只生成一段回答，但 AidBridge 的目标不是“替人做决定”，而是帮助训练过的人类更快、更安全地组织行动。用户粘贴一段求助信息后，AidBridge 会生成一个完整的 field-ready action pack，包括：

- 第一条安全回应
- 紧急程度和置信度评分
- Ops Desk 多 case 队列和资源压力视图
- Singapore Surge Lab 突发压力模拟
- Supabase Backend Sync 后端同步
- 自动识别的需求类别
- 未来 60 分钟行动计划
- 隐私脱敏摘要
- 可信社区资源匹配
- 资源路由说明
- 证据台账
- 后续跟进时钟
- 人工交接脚本
- Judge Lens 质量审计
- Impact Lens 时间节省估算
- Singapore Launch Lens 新加坡出海 readiness 评分
- 可复制的一页 Field Pack
- 机器可读 Evaluation JSON

AidBridge 的 Workspace 页面提供 Crisis Map 可视化，把一个 case 从 intake signal、need radar、resource route、evidence lock 到 human handoff 的过程展示成可点击的流程节点。Play Flow 模式可以自动演示整个救援路径，适合评委快速理解产品逻辑。

终局新增的 Hackathon Constellation Hub 进一步扩展了项目边界。它参考代码图谱类 HUD 的视觉方式，但服务于 UCWS 提交场景：用户可以输入完整黑客松想法，Hub 会自动生成 problem signals、beneficiaries、AI layers、data sources、safety guardrails、visual demo hooks、evaluation proof 和 submission artifacts 的星空节点。右侧控制台会同步生成 Project Wall 填写引导，包括项目名、tagline、描述、Demo/GitHub 证据、截图建议、缺失的人类填写字段和 API JSON。

AidBridge 还释放了 Codex bridge API，支持 `window.AidBridgeCodex`、浏览器 CustomEvent 和 `api/codex-bridge.mjs` 模块。Codex 或其他 agent 可以注入新的 hackathon idea，读取生成的 constellation payload，并把项目材料进一步自动化。这让 AidBridge 不只是一个社区救援 Demo，也是一套可连接 Codex 内容生成、提交材料生成和评审证据生成的终局输出系统。

整个 Demo 当前完全在浏览器运行，不需要账号、后端、数据库或 API key。核心分诊引擎是 deterministic 的，方便评委复现、测试和审计。未来可以在同一 schema 上升级 LLM extraction、RAG over verified local service directories、隐私审查和人工 case ownership。

## 8. Problem / 要解决的问题

社区救援场景中的问题不是“缺少一个聊天回复”，而是缺少一个稳定、可审计、可交接的操作流程。

痛点包括：

- 求助信息混乱，不完整，风险等级难以快速判断
- 志愿者经验不一，容易遗漏关键安全问题
- 多语言、跨文化和弱势群体场景增加误判风险
- 隐私信息容易被直接复制到聊天群或 case note
- 本地资源分散，匹配过程依赖个人记忆
- 交接记录不一致，后续跟进容易断档
- 黑客松项目提交材料也常常分散，缺少可视化和可审计证据链

## 9. Solution / 解决方案

AidBridge 将混乱输入转化为结构化救援行动包，并用可视化和评测层确保输出可理解、可复查、可复制。

核心流程：

1. 粘贴 WhatsApp、热线、走访或邮件中的求助信息
2. 选择地点、渠道、语言和操作者模式
3. 生成 action pack
4. 查看风险评分、需求识别和 Crisis Map
5. 查看第一回应、行动计划、证据台账、脱敏摘要和资源匹配
6. 使用 Directory 导入本地 CSV 资源表并重新匹配
7. 使用 Judge Lens 查看质量审计和 Impact Lens
8. 使用 Field Pack 复制一页操作简报
9. 使用 Hub 将项目或新想法转换为星空节点、提交引导和 Codex API JSON
10. 使用 Ops Desk 查看多 case 队列、资源负载和下一步运营 brief
11. 运行 Singapore Surge Lab，展示突发 case 激增时的资源压力、SLA 风险和第一步行动 brief

## 10. Key Features / 核心功能

- Multilingual aid triage：面向多语言求助信息的社区救援分诊
- Deterministic risk scoring：可复现的紧急程度与置信度评分
- Ops Desk：批量分诊多个 case，排序优先级，显示资源压力和 duty-lead brief
- Singapore Surge Lab：压测 migrant-worker、school-care、family-aid 和 document-access 等新加坡突发场景
- Supabase Backend Sync：将 action pack 和 Ops Desk snapshot 持久化到 Supabase
- Need detection：识别医疗、庇护、食物、法律/劳工权益、心理健康、儿童/老人保护、证件与访问权限等需求
- Crisis Map：将 case 路径可视化为可点击流程节点
- Play Flow：自动播放救援路径，适合短时间评审演示
- Privacy redaction：脱敏手机号、邮箱、证件号和敏感位置片段
- Resource matching：基于需求、语言、紧急程度和信任分匹配资源
- CSV directory import：支持团队导入自己的本地资源目录
- Evidence ledger：生成可审计证据记录
- Follow-up clock：生成首分钟、20 分钟、1 小时、次日等跟进节点
- Human handoff script：生成给真人负责人的交接脚本
- Judge Lens：审计安全、隐私、证据、资源匹配、交接清晰度和现场可用性
- Impact Lens：估算人工基线时间、AidBridge 运行时间、节省分钟数和隐私信号处理
- Singapore Launch Lens：评估多语言覆盖、一线渠道、本地资源目录、隐私导出、人工交接、证据包和紧急路由 readiness
- Evaluation JSON：输出机器可读评估包
- Hackathon Constellation Hub：把黑客松想法自动构建为星空节点图
- Guided Project Wall builder：从 Hub 自动生成提交字段引导
- Codex bridge API：通过浏览器全局、事件和 ES module 连接 Codex/agent 内容

## 11. Technical Stack / 技术栈

- HTML5
- CSS3 responsive layout
- JavaScript ES modules
- Canvas 2D visualization
- Deterministic triage and risk-scoring engine
- Ops Desk multi-case queue and resource-pressure model
- Singapore Surge Lab stress simulator
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

浏览器全局：

```js
window.AidBridgeCodex.buildFromIdea("AidBridge: visual hub for UCWS ideas and Project Wall guidance");
```

浏览器事件：

```js
window.dispatchEvent(new CustomEvent("aidbridge:codex-idea", {
  detail: {
    ideaText: "New UCWS idea",
    showHub: true
  }
}));
```

静态 ES module：

```js
import { buildCodexHub } from "./api/codex-bridge.mjs";

const hub = buildCodexHub({
  ideaText: "New UCWS idea"
});
```

API schema：

https://wangsiyi7.github.io/aidbridge-ucws-2026/api/hub-schema.json

## 13. Evaluation Evidence / 评测证据

当前基准测试结果：

- Scenario benchmark: 4/4 passed
- Average audit score: 100
- Average operator minutes saved: 47
- Redaction pass rate: 100%

相关文件：

- `tests/triage.test.mjs`
- `benchmarks/run.mjs`
- `EVALUATION_REPORT.md`
- `assets/evaluation-report.json`
- `AI_NATIVE_ARCHITECTURE.md`

测试覆盖：

- 需求检测
- 风险评分
- 隐私脱敏
- 资源匹配
- CSV 导入/导出
- 证据输出
- Crisis Map 生成
- Hub constellation 生成
- Codex bridge metadata
- Judge Lens 审计
- Impact Lens 估算
- Evaluation JSON
- Field Pack 格式化

## 14. UCWS Alignment / 与 UCWS 标准的对应

### AI for Good

AidBridge 面向社区救援、学校支持、NGO intake 和互助组织，目标是让非专家一线人员更快、更安全地响应危机边缘请求。

### AI for All

Demo 无需账号、后端、模型 key 或付费服务。任何评委、志愿者或学生都能直接打开浏览器测试。

### Working Product

项目包含公开 Demo、GitHub repo、截图、测试、benchmark、评测 JSON、提交文案和 pitch deck，不只是概念图或单 prompt。

### Technical Depth

系统包含分诊引擎、脱敏层、资源匹配、CSV 导入、审计引擎、Impact 估算、Canvas Hub、Codex API 和静态部署。

### Safety and Responsibility

AidBridge 明确不替代医生、律师、警察或紧急服务。它是给受训练的人类操作者使用的 triage/handoff assistant，强调隐私保护、人工确认和证据记录。

### Differentiation

相比常见聊天机器人或 agent demo，AidBridge 交付的是完整操作层：行动包、资源路径、证据、审计、Impact、Ops Desk、Hub 和 API。Ops Desk 让项目从单 case 生成器升级为团队级值班系统，Hackathon Constellation Hub 则让项目具备极强的视觉记忆点和提交材料自动化能力。

## 15. Screenshots / 截图材料

推荐主图：

```text
assets/screenshot-hub.png
```

Judge Lens 图：

```text
assets/screenshot-judge.png
```

Ops Desk 图：

```text
assets/screenshot-ops.png
```

桌面 Demo 图：

```text
assets/screenshot.png
```

移动端图：

```text
assets/screenshot-mobile.png
assets/screenshot-hub-mobile.png
```

## 16. Pitch Deck / 演示文件

```text
assets/AidBridge_UCWS_Pitch.pptx
```

## 17. Demo Flow / 90 秒演示流程

1. 打开 Demo URL
2. 加载 migrant worker sample
3. 点击 Generate action pack
4. 展示 urgency、confidence、detected needs
5. 展示 Crisis Map 和 Play Flow
6. 展示 first response、redacted brief、resource matches、evidence ledger
7. 打开 Hub，展示星空节点和 Project Wall guidance
8. 粘贴一个新的 UCWS idea，点击 Build Stars
9. 展示 Codex bridge JSON
10. 打开 Directory，导入 CSV，展示资源匹配变化
11. 打开 Judge Lens，展示 100/100 audit 和 Impact Lens
12. 打开 Field Pack，复制一页操作简报

## 18. Safety Statement / 安全声明

AidBridge 不提供医疗、法律或紧急服务判断，不替代专业人员。它帮助一线操作者整理信息、保护隐私、发现风险、匹配资源并生成交接记录。所有高风险 case 都应由训练过的人类负责人复核，并在必要时联系当地紧急服务或合格专业机构。

## 19. Team Members / 团队成员

请在提交前填入真实团队成员姓名和个人资料链接：

```text
Team Member 1:
Team Member 2:
Team Member 3:
```

## 20. Copy-Ready Project Wall Text / 可直接粘贴到 Project Wall 的版本

AidBridge is a browser-based community-aid triage system for UCWS Singapore Hackathon 2026. It turns messy WhatsApp, hotline, walk-in, or email help requests into safe, auditable action packs for volunteers, school counsellors, NGOs, and mutual-aid teams.

The product detects urgent needs, scores risk and confidence, generates a safe first response, creates a next-60-minute plan, redacts sensitive details, matches trusted resources, builds an evidence ledger, adds a follow-up clock, and exports a human handoff script. Crisis Map and Play Flow make the path from intake to handoff visible. Judge Lens audits safety, privacy, evidence, resource fit, handoff clarity, and field readiness. Impact Lens estimates operator minutes saved and resource routes.

The final-stage Hackathon Constellation Hub lets judges or builders paste any hackathon idea and automatically generate a visual star map of problem signals, beneficiaries, AI layers, data sources, safety guardrails, evaluation proof, and submission artifacts. The Hub also generates guided Project Wall fields and exposes a static Codex bridge API through `window.AidBridgeCodex`, browser events, and `api/codex-bridge.mjs`.

The demo runs fully in the browser with no account, backend, API key, or database. The repo includes tests and a four-scenario benchmark: 4/4 cases passed, average audit score 100, average operator minutes saved 47, and 100% redaction pass rate.

Demo: https://wangsiyi7.github.io/aidbridge-ucws-2026/?demo=1

Hub: https://wangsiyi7.github.io/aidbridge-ucws-2026/?view=hub

GitHub: https://github.com/wangsiyi7/aidbridge-ucws-2026
