# ZhongSai SEO + GEO 高潜力内容生产规范

> **文件路径**: `docs/SEO_GEO_CONTENT_PLAYBOOK.md`
> **版本**: v1.1
> **生效日期**: 2026-09-24
> **适用范围**: 中赛钢构官网（zhongsai-steelstructure.com）所有新建 / 更新博客、资源页、技术指南、采购指南等 SEO/GEO 内容
> **v1.1 更新**: 新增 AUTO MODE 选题发现流程（第 1 章），默认无需用户提供关键词，系统自行从 GSC / AI Exposure / 内容缺口发现最高价值机会

---

## 0. 强制读取声明

**任何 SEO/GEO 内容任务开始前，必须先完整读取本文件。** 本文件是最高优先级内容规范，优先级高于通用写作建议、AI 生成默认行为、以及任何临时指令。

执行顺序：
1. 读取本文件
2. 按第 1 章执行选题与 Build Decision
3. 只有 `CREATE NEW PAGE` 才进入写作
4. 写作必须遵循第 2–7 章
5. 发布必须遵循第 8 章

---

## 1. AUTO MODE 选题发现与 Build Decision（写之前必须完成）

### 1.0 自动发现原则

**默认情况下，用户不需要提供关键词或文章主题。** 每次 SEO/GEO 内容任务开始时，先自行发现当前最值得做的内容机会。

**禁止随机脑暴关键词。** 不得仅依据：
- AI 自己想到的关键词
- 泛行业热门词
- 搜索量猜测
- 竞争对手标题复制

选题优先级按以下数据源依次执行：

| 优先级 | 数据源 | 用途 |
|--------|--------|------|
| 1 | Google Search Console（查询/页面/国家） | 真实搜索需求 |
| 2 | AI / Generative Search Exposure | AI 引用潜力 |
| 3 | 当前网站已有页面和内容缺口 | 蚕食与缺口判断 |
| 4 | 已有排名 4–20 的 Query | 内容提升机会 |
| 5 | 高曝光低 CTR Query | Title/Meta/Direct Answer 修正 |
| 6 | 排名 20–50 但商业价值高的 Query | 新页面候选 |
| 7 | 已抓取/已发现但内容质量不足的高价值页面 | 更新优先 |
| 8 | 中赛真实项目、设计、制造、QC、装柜、发货等第一方资料 | 证据驱动选题 |
| 9 | 客户真实 FAQ / 销售问题 | 采购决策内容 |
| 10 | Competitor content gaps | 差异化机会 |
| 11 | Google / Bing / AI Search 的相关问题和搜索意图 | 长尾需求 |
| 12 | 行业标准、采购、工程设计相关长尾需求 | 技术深度内容 |

**无真实 GSC 数据时**：不得编造 search volume / keyword difficulty / traffic estimate / rank potential，只能标记 `SEARCH DEMAND = UNCONFIRMED`。

---

### DISCOVERY STEP 1 — GSC Opportunities

从 GSC 查询数据中按以下分层筛选：

| 分层 | 排名区间 | 行动 |
|------|---------|------|
| A | Position 4–10 | 已有较强排名，争取 Top 3 → 优先更新现有页 |
| B | Position 11–20 | **最优先内容提升区间** → 更新或新建 |
| C | High Impressions + Low CTR | 判断是否需要 Title / Meta / Direct Answer / Intent 修正 |
| D | Position 20–50 | 商业价值高 + 内容缺口明显 + 中赛有专业证据 → 进入候选 |
| E | Query 已有曝光但没有真正对应页面 | 判断是否存在独立页面机会 |

输出每个候选的：Query / Impressions / Clicks / CTR / Position / Current Ranking URL。

---

### DISCOVERY STEP 2 — GEO / AI Search Potential

寻找适合 AI 引用的问题类型：
- What is... / How does... / How to...
- What information is needed... / What affects...
- Difference between... / Which is suitable...
- What should buyers check... / How much...
- What are the main cost factors...
- What drawings are required... / What should be included in...

优先具有以下特征的主题：**明确答案、表格、步骤、Checklist、比较、工程参数、责任边界、第一方经验**。

---

### DISCOVERY STEP 3 — Commercial Intent

优先与真实采购决策相关的主题：
quotation / cost / design / drawing / span / crane / wind load / seismic / steel grade / fabrication / quality / inspection / packing / container loading / shipping / installation / roof / wall / insulation / corrosion / fire protection / supplier audit / factory audit / procurement / import / delivery

**不是所有流量词都值得做。商业价值必须进入选题评分。**

---

### DISCOVERY STEP 4 — First-party Evidence

优先发现中赛已经拥有真实证据但网站没有充分表达的主题。搜索中赛素材库：
Drawings / Tekla / Design / Fabrication / Welding / QC / Inspection / Packing / Marking / Container Loading / Shipment / Roof / Wall / Completed Project

如果中赛有真实资料，**提高选题优先级**。例如：
- 每周持续装柜发货 → Export Packing / Container Loading / Shipment 类专业内容
- 有大量设计图 → Detailing / Shop Drawing / Drawing Review 类内容
- 有实际 QC 照片 → Factory Audit / Quality Inspection 类内容

---

### DISCOVERY STEP 5 — Existing Site Gap

对候选主题搜索整个网站，判断：
- 已有强页面？已有弱页面？只有部分内容？完全没有？
- 是 Solution 应该承担？还是 Blog 应该承担？

输出：

| Candidate Topic | Existing URL | Overlap % | Gap | Recommended Action |
|----------------|-------------|-----------|-----|-------------------|

如果现有页面能覆盖 70–80% 搜索意图 → **不要新建文章，选择 IMPROVE EXISTING PAGE**。

---

### DISCOVERY STEP 6 — Cannibalization

检查：Title / H1 / URL / Body topic / FAQ / Existing query target。

防止以下类型抢同一搜索意图：
- Blog vs Solution
- Blog vs Component
- Blog vs Capability
- Blog vs Market
- Blog vs Existing Blog

---

### DISCOVERY STEP 7 — Score Candidates

先寻找**至少 10 个候选主题**，分别评分（每项 /5，总分 40）：

| 维度 | 5 分标准 | 1 分标准 |
|------|---------|---------|
| Real Search Signal | GSC 有明确高曝光查询 | 无任何搜索信号 |
| SEO Growth Potential | pos 11–50 且有提升空间 | 已排名 Top 3 或完全无信号 |
| GEO Citation Potential | 有明确答案、表格、步骤，易被 AI 引用 | 主观观点，无结构化答案 |
| Commercial Value | 直接影响采购决策 / 询盘 | 纯百科知识 |
| First-party Evidence | 中赛有真实项目/图纸/工厂照片 | 完全无第一方证据 |
| Independent Search Intent | 有独立搜索意图和决策价值 | 可被现有页面完全覆盖 |
| Content Gap | 全站无相关内容 | 已有 2+ 页面覆盖 |
| Low Cannibalization Risk | 与现有页面无重叠 | 与现有页面高度重叠 |

**决策阈值**：
- 32–40：STRONG BUILD CANDIDATE → 可建
- 26–31：BUILD ONLY IF EVIDENCE IS STRONG → 证据充足才建
- 20–25：IMPROVE EXISTING PAGE → 优先更新现有页
- <20：NO NEW URL → 不建

同时标记 `Confidence: HIGH / MEDIUM / LOW`。**真实性不足时，即使总分高也不得建页。禁止伪造 Search Volume / Keyword Difficulty / Traffic Forecast，没有数据时写 UNCONFIRMED。**

---

### DISCOVERY STEP 8 — Final Shortlist (TOP 5)

输出 TOP 5 候选：

| Rank | Topic | Primary Query | Search Intent | Current URL / Gap | Why Now | SEO Potential | GEO Potential | Commercial Value | Evidence | Cannibalization Risk | Recommended Action |
|------|-------|--------------|---------------|-------------------|---------|--------------|--------------|-----------------|----------|---------------------|-------------------|

---

### DISCOVERY STEP 9 — Execution Decision

**不要一次制作 5 篇文章。** 从 TOP 5 中只选择综合价值最高的 **1 个**。

决策必须说明：
- **WHY THIS TOPIC**（为什么是这个主题）
- **WHY NOW**（为什么现在做）
- **WHY NEW PAGE / UPDATE**（新建还是更新）
- **WHAT EVIDENCE SUPPORTS IT**（什么证据支撑）
- **WHAT QUERY IT TARGETS**（目标查询是什么）

然后才进入：Research → Outline → SEO → GEO → Writing → Multi-image Plan → Internal Links → Schema → Preview。

---

### 1.7 SPECIAL RULE — 无强机会时不硬写

如果今天没有足够强的新文章机会，**不要为了完成任务硬写文章**。允许最终结论：

> **NO NEW ARTICLE TODAY**

然后改做以下高价值工作：
- UPDATE EXISTING PAGE（更新排名 4–20 的弱页面）
- ADD GEO ANSWER BLOCK（给已有页面加可被 AI 引用的答案块）
- ADD FAQ（补充真实客户问题）
- ADD INTERNAL LINKS（补内链）
- ADD FIRST-PARTY EVIDENCE（用真实素材增强现有页）
- REFRESH DECLINING CONTENT（刷新流量下降的内容）

**内容质量优先于发布数量。**

---

### 1.8 Build Decision 输出格式

写文章前必须输出：

```
TOPIC:
CURRENT PAGE:
SEARCH SIGNAL: (GSC 查询 + 曝光 + 排名)
AI SIGNAL: (Generative AI 数据)
COMMERCIAL VALUE:
INDEPENDENT INTENT:
CANNIBALIZATION:
FIRST-PARTY EVIDENCE:
SCORE: /40
Confidence: HIGH/MEDIUM/LOW
WHY THIS TOPIC:
WHY NOW:
RECOMMENDATION: CREATE NEW PAGE / IMPROVE EXISTING / ADD SECTION / MERGE / NO ACTION
```

只有 `CREATE NEW PAGE` 才进入完整写作。

---

## 2. 内容结构规范

### 2.1 推荐文章结构

```
H1
Direct Answer（80–150 字，首屏直接回答）
Introduction（为什么搜索这个问题）
H2 — Core Decision / Definition
H2 — Main Factors
H2 — Decision Table / Comparison Table
H2 — Engineering Inputs
H2 — ZhongSai Practical Perspective
H2 — What Buyers Should Prepare
H2 — Common Mistakes
H2 — Responsibility Boundary（海外项目必须有）
H2 — FAQ
H2 — Project Inquiry CTA
```

**不要机械照模板**，根据搜索意图调整。但以下元素为强制项（见 2.2–2.5）。

### 2.2 Direct Answer（强制）

首屏必须直接回答搜索问题。**禁止**：
- "In today's rapidly evolving construction industry..."
- "Steel structures have become increasingly popular..."
- "We are proud to..."
- 任何 AI 废话开头

要求：第一段直接给结论。示例：
> The cost of a steel workshop cannot be reliably reduced to a single global price per square metre. The final cost depends on span, height, crane loads, steel tonnage, roof and wall systems, local design loads, fire protection, corrosion protection, transport and erection conditions.

### 2.3 Decision Table / Comparison Table（强制至少 1 张）

高价值表格优先类型：
- `Decision Factor | Why It Matters | Information Required`
- `Option | Suitable For | Advantages | Limitations`
- `Stage | ZhongSai Input | Local Party Input`

表格必须真正帮助决策，**禁止堆 SEO 关键词**。

### 2.4 Checklist / Steps（强制至少 1 个）

形式：
- 采购准备清单（`- [ ]` 格式）
- 步骤流程（编号 Step 1→N）
- 常见错误清单

### 2.5 FAQ（强制 5–8 个）

FAQ 来源：
- 真实客户问题
- GSC 查询
- People Also Ask 类问题
- 采购决策问题

**禁止创建**："Why is ZhongSai the best?" 这类自问自答营销 FAQ。

### 2.6 GEO Answer Blocks（强制 3–5 个）

全文至少寻找 3–5 个可以独立被 AI 引用的答案块。每块应能脱离上下文理解。

**禁止写**："as mentioned above"、"as discussed earlier" 这种依赖上下文的回答。

示例：
- "What information is needed to design a steel building foundation?"
- "What changes when a workshop has an overhead crane?"
- "What does a steel fabricator need before quotation?"

---

## 3. 事实与证据规则

### 3.1 First-party Evidence 优先

先搜索中赛现有真实素材：
- 真实项目照片（`public/images/projects/`）
- 图纸 / Tekla / 加工图（`public/images/engineering/`）
- 制造 / QC 照片（`public/images/manufacturing/`）
- 装柜 / 包装 / 出货（`public/images/export/`）
- 屋面墙面 / 完工建筑（`public/images/projects/`）

**第一方素材比通用 AI 文案优先。** 允许写 "ZhongSai typically coordinates..." 前提是真实能力。

### 3.2 ZhongSai 事实边界（铁律）

只能使用当前项目已确认事实。以下为已确认事实：
- 做钢结构 20 年，专注出口 15 年
- 使用 "our manufacturing bases / 中赛制造基地"（**禁止** "own factory / 自有工厂 / own manufacturing base / 自有制造基地"）
- 不写 world-class / leading / No.1 / trusted supplier
- **禁止编造**：客户、项目、面积、吨位、跨度、交期、认证（ISO/CIDB）、出口国家、节省比例、价格、案例、当地办公室、当地施工队、UAE 本地团队
- CTA 统一：Send Project Drawings / 提交项目图纸 / Send Project Requirements
- WhatsApp：`wa.me/8613192007378` 带预填文案

如果源码和项目上下文存在冲突 → **STOP 并标记 FACT CHECK REQUIRED**，不要自己选一个数字。

### 3.3 工程参数真实性规则

任何以下参数，如果没有中赛或可靠规范依据，**禁止给固定全球值**：
- span / height / crane capacity
- wind speed / seismic level
- steel grade / coating thickness / fire rating
- price / delivery time

优先写法：`depends on: project drawings, design loads, local code, building use, crane requirement, corrosion environment, fire requirement, transport condition`

### 3.4 外部标准与法规核实规则

涉及以下内容时，必须优先使用**官方标准机构 / 政府 / 规范机构 / 权威技术资料**：
- building code（ASTM / EN / GB / AWS / AISC / ISO）
- UAE / Saudi / Australia / Singapore 等当地法规
- 认证标准

**禁止**把同行博客、SEO 文章、AI 回答当规范来源。外部资料只能用于行业知识，不能把竞争对手数据变成中赛数据。

### 3.5 海外项目责任划分（强制）

涉及海外项目时必须明确：

**中赛可以提供**：
- engineering coordination / detailing
- fabrication / quality control
- marking / packing / container loading
- export coordination
- installation technical guidance

**当地团队通常负责**：
- local permits / registered engineer approval
- foundations / civil works
- local labour / physical erection
- authority submissions

除非合同另有明确约定。

---

## 4. SEO 元数据规范

### 4.1 Title

- 优先用户查询语言
- 自然、明确、有搜索意图
- **不要堆砌**：China / manufacturer / supplier / factory / best / cheap / price / company 全部塞进一个 Title
- 建议：核心主题 + 用户决策问题 + ZhongSai

### 4.2 Meta Description

- 约 140–160 characters
- 回答：页面讲什么、解决什么问题
- 不要营销堆砌

### 4.3 H1

- 一个明确 H1
- 比 Title 更自然，直接对应搜索意图
- **不要**使用纯品牌口号作为技术文章 H1

### 4.4 URL

- 短、英文、语义清楚、长期稳定
- 示例：`/en/blog/steel-structure-foundation-design-guide/`
- **禁止**：年份、超长关键词、`best-cheap-manufacturer-supplier`（除非年份对主题确有持续意义）
- URL Freeze：不改现有 URL

### 4.5 Schema

技术文章默认：
- Article / BlogPosting
- BreadcrumbList
- Organization reference（由 BaseLayout 统一输出）

FAQPage：只有 FAQ 实际可见且当前架构需要时考虑。

**禁止使用**：Product / Offer / AggregateRating，除非页面真实符合。

### 4.6 Hreflang / Canonical

- 所有 hreflang 使用完整绝对 URL（含 https://）
- canonical 绝对唯一，不带参数
- EN 页：en（自指）+ zh-CN + x-default→EN
- ZH 页：zh-CN（自指）+ en + x-default→EN
- 双向互指

---

## 5. 内链与 CTA

### 5.1 内链策略

每篇文章自然链接：
- 1 个相关 Solution
- 1 个 Capability
- 1 个 Project（只有真实相关时）
- 1 个相邻 Resource
- 1 个 Contact

约 4–7 个即可。**禁止**：
- 每段都塞内链
- 同一 anchor 重复十次

同时规划：哪些现有页面应该反向链接到新文章。

### 5.2 CTA

- 文章 CTA 不要一上来卖
- 正文末尾使用：Have Drawings / No Complete Drawings / Send Project Requirements
- 引导：`/en/contact/#quote-form` 或 `/zh/contact/#quote-form`
- CTA 必须与文章意图相关

---

## 6. 图片规范

### 6.1 视觉信息结构原则

**每篇文章必须同时设计"文字信息结构"和"视觉信息结构"。** 不能先写完文章再随便补几张图。图片必须参与解释内容，而不是只做装饰。

### 6.2 图片数量

根据文章长度和内容确定图片数量，不设固定数字。一般：
- 1200–1800 字：3–4 张
- 1800–2500 字：4–6 张
- 超过 2500 字：6–8 张

**标题/板块包含多个解释时，用多宫格小图展示多个描述**，不必每板块一个大图。

### 6.3 IMAGE MAP（强制，先建图再生成）

生成任何图片前，必须先建立 IMAGE MAP：

| 序号 | 对应 H2 / 段落 | 图片目的 | 图片类型（真实/AI概念） | 文件名 | 比例 |
|------|---------------|---------|----------------------|--------|------|
| 1 | Hero / Cover | 文章主题视觉 | AI 概念图 | cover.jpg | 16:9 |
| 2 | Part 2: Foundation Types | 展示独立基础实景 | 真实项目图 | pad-footing.jpg | 4:3 |
| ... | ... | ... | ... | ... | ... |

**每张图片必须对应具体 H2 / 段落，禁止无目的配图。**

### 6.4 AI 图片生成规则

- 所有 AI 生图使用 **SEEDREAM 5.0 Pro**（`model_version=seedream_5.0_pro`）；Pro 不可用时可降级 5.0 Flash 并在报告中说明
- 风格：真实、工业风、写实摄影感
- 建造过程必须符合真实工程逻辑：有工人、吊车和机械操作
- **每张 AI 图片独立生成，禁止拼图 / 多图拼接**
- 比例：文章配图横版 16:9 或 4:3；多宫格小图可统一比例

### 6.5 AI 图片使用边界（铁律）

AI 图片**只能用于**：概念、流程、比较、解释、封面视觉。

**绝对禁止** AI 图片冒充：
- 中赛真实项目
- 中赛工厂
- 中赛装柜 / 包装
- 中赛 QC / 检验
- 中赛证书 / 认证
- 任何第一方证据

如果文章需要展示真实能力，**必须使用中赛第一方素材**（`public/images/projects/`、`public/images/engineering/`、`public/images/manufacturing/`、`public/images/export/`）。

### 6.6 真实素材优先

优先使用中赛自有真实素材：
- 项目照片 → 项目案例 / 完工效果
- 图纸 / Tekla → 设计能力 / 工程交付
- 工厂 / 焊接 / 喷涂 → 制造 / QC
- 装柜 / 编号 / 集装箱 → 出口交付

真实素材不足时，用 AI 概念图补充，但必须在 caption 中明确其为示意图/概念图，不得暗示为中赛真实记录。

### 6.7 ALT / Caption / Filename / 性能

- **ALT**：描述图片实际内容，不要关键词堆砌
- **Caption**：说明图片在文章中的作用；AI 概念图标注 "示意图"
- **Filename**：英文语义化，如 `steel-column-base-plate-anchor-bolts.jpg`
- **格式**：优先 WebP；JPG 用于照片，PNG 用于透明/文字
- **性能**：图片宽度不超过 2400px，单张控制在 800KB 以内；`/images/*` 已有 1 天缓存策略

---

## 7. EN / ZH Localization

- 不要默认所有文章必须机械中英双发，先根据 GSC language query / 商业市场 / 内容价值判断
- 如果做双语，必须 **localization**，不是逐句机翻
- **英文面向**：international buyers / contractors / procurement teams / project owners
- **中文面向**：中国出海企业 / 海外华人业主 / 中国采购负责人
- 技术术语保持一致（如 base plate = 柱底板，anchor bolt = 锚栓）

---

## 8. 构建、QA 与发布

### 8.1 Build（强制）

```bash
npm run build
npm run seo:check
```

要求：
- Build PASS
- 页面数与预期一致（新增 EN+ZH 文章则 +2）
- seo:check PASS：dangling hreflang = 0，SHADOWED_WRONG_TARGET = 0
- sitemap `<loc>` 数量与预期一致
- **禁止人工修改 dist**

### 8.2 Preview QA（强制）

首次创建只部署 **Preview**，禁止直接 Production。

验证项：
- HTTP 200（EN + ZH）
- Title / Meta / H1 / Canonical / Hreflang / Robots 正确
- Breadcrumb / Schema 正确
- 所有图片 HTTP 200
- Direct Answer / 表格 / FAQ / CTA 可见
- 内链有效
- **Desktop 1440**：无横向溢出、布局正常
- **Mobile 390**：无横向溢出、表格在自身容器滚动、CTA 正常、中文无乱码
- 博客列表页（/en/resources/、/zh/resources/）已包含新文章

### 8.3 Production Gate

只有全部 Preview QA PASS 后，等待用户明确批准，才部署 Production：

```bash
npx wrangler pages deploy dist --project-name=zhongsai-website-v2 --branch=main
```

**未经批准不得 Production。**

### 8.4 发布后验证

- 正式域 HTTP 200
- 生产 HTML grep 确认无禁用词（own factory / 自有工厂 / most commonly procured 等）
- 核心页面回归：Home / UAE / Saudi / Tanzania / Workshop Cost / Resources / Contact / sitemap.xml
- 未批准 WIP 分支（`wip/custom-page-image-replacement`）未夹带

---

## 9. 发布节奏

- **禁止** 5–10 个新 URL / 天
- 建议：0–2 个高价值新 URL / 天，或 3–7 个高质量页面 / 周
- 其他工作时间用于：update / merge / internal links / project evidence / GEO blocks / FAQ / content decay refresh

---

## 10. 禁止事项汇总

1. 禁止无 GSC 数据编造搜索量 / 难度 / 流量预估
2. 禁止随机脑暴关键词选题（必须走 AUTO MODE 9 步发现流程）
3. 禁止为了"更新网站"随机写博客
4. 禁止不做蚕食检查就新建 URL
5. 禁止一次制作 5 篇文章（TOP 5 只选 1 个执行）
6. 禁止无强机会时硬写文章（允许 NO NEW ARTICLE TODAY）
7. 禁止 AI 废话开头（In today's world...）
8. 禁止编造中赛项目 / 客户 / 数据 / 认证 / 产能
9. 禁止给工程参数固定全球值（无依据时）
10. 禁止 AI 图片冒充真实项目 / 工厂 / 装柜 / QC / 证书
11. 禁止拼图式 AI 生图
12. 禁止无 IMAGE MAP 就生成图片
13. 禁止图片无对应 H2 / 段落
14. 禁止首次发布直接 Production
15. 禁止人工修改 dist
16. 禁止 git add . 无差别提交
17. 禁止修改现有 URL（URL Freeze）
18. 禁止在报告 / 日志 / git 中泄露 Token / Secret

---

## 附录 A：选题评分速查表（AUTO MODE）

```
候选主题（至少找 10 个）：____________________
Real Search Signal:        /5
SEO Growth Potential:      /5
GEO Citation Potential:    /5
Commercial Value:          /5
First-party Evidence:      /5
Independent Search Intent: /5
Content Gap:               /5
Low Cannibalization Risk:  /5
TOTAL:                     /40
Confidence: HIGH / MEDIUM / LOW
Decision: CREATE / IMPROVE / ADD SECTION / MERGE / NO ACTION

TOP 5 Shortlist:
1.
2.
3.
4.
5.

Execution Decision (只选 1 个):
WHY THIS TOPIC:
WHY NOW:
WHY NEW PAGE / UPDATE:
WHAT EVIDENCE:
WHAT QUERY:
```

## 附录 B：发布前检查清单

```
□ AUTO MODE: GSC 查询已分析（pos 4-10 / 11-20 / 高曝光低CTR / 20-50商业价值）
□ AUTO MODE: AI / Generative Search Exposure 已检查
□ AUTO MODE: 至少 10 个候选主题已评分
□ AUTO MODE: TOP 5 Shortlist 已输出
□ AUTO MODE: Execution Decision 只选 1 个，WHY THIS TOPIC / WHY NOW 已说明
□ 独立搜索意图已明确
□ 蚕食检查通过（Blog vs Solution/Component/Market）
□ 现有页面覆盖 <70% 才新建，否则 IMPROVE EXISTING
□ Build Decision 已输出
□ Direct Answer 已写
□ ≥1 张决策表
□ ≥1 个 Checklist / Steps
□ 5–8 个 FAQ
□ 3–5 个 GEO Answer Block
□ 责任划分表（海外项目）
□ IMAGE MAP 已建立
□ 真实素材优先使用
□ AI 图未冒充第一方证据
□ ALT / Caption / filename 规范
□ EN / ZH localization（非机翻）
□ Title / Meta / H1 / URL 规范
□ 内链 4–7 个
□ CTA → contact/#quote-form
□ npm run build PASS
□ npm run seo:check PASS
□ Preview Desktop 1440 PASS
□ Preview Mobile 390 PASS
□ 博客列表已包含新文章
□ 用户已批准 Production
```

---

*本文件为中赛钢构官网 SEO/GEO 内容生产的最高优先级规范。任何与本文件冲突的临时指令，以本文件为准，除非用户明确指出并更新本文件。*
