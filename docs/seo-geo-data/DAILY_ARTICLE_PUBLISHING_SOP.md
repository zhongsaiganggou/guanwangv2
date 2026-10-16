# ZhongSai 每日文章发布 SOP（DAILY_ARTICLE_PUBLISHING_SOP）

> 版本: 1.0（2026-10-15）
> 适用范围: 中赛钢构官网（`D:\zhongsai-website-v2`，Astro + Cloudflare Pages + GitHub main 双通道）每日双语博客文章的选题 → 撰写 → 审核 → 构建 → 发布全流程。
> 配套文件: `docs/SEO_GEO_CONTENT_PLAYBOOK.md`（内容规范，最高优先级）、`docs/CLOUD_AUTO_PUBLISH_TASK.md`（云端任务指令，本 SOP 为其门禁补充）。
> 状态说明: 本 SOP 是对**当前实际流程的审计结论 + 治理标准**。现状（截至 2026-10-15）：每日文章 commit（如 `0c1e2c0` ndt-testing、`84a173b` crane-selection、`dbf07fb` purlin）由云端任务**自动部署 Production + 自动 push main，无独立人工审核门禁**。本 SOP 第 8 节定义需补强的人工门禁；未执行门禁前，云端任务产出视为「自动发布，待人工复核」。

---

## 0. 铁律（与 Playbook 一致，任何一条违反即停止）

1. **真实不编造**：不虚构客户、项目、面积、吨位、跨度、交期、认证、出口国家、价格、节省比例、当地办公室/施工队。
2. 工程参数无依据不给固定全球值，写 `depends on drawings / loads / local code / use / crane / corrosion / fire / transport`。
3. 品牌事实只用：做钢结构 20 年、专注出口 15 年；用 "our manufacturing bases / 中赛制造基地"，**禁止** "own factory / 自有工厂"；不写 world-class / leading / No.1 / best / cheap。
4. **URL Freeze**：不修改任何现有 URL、路由、表单、API、canonical、hreflang、redirect、GA4、DNS。新建文章只允许新增 `/blog/[slug]` URL。
5. 冻结页面保护：Homepage、Engineering Design、Manufacturing & Quality、Export Delivery、Contact、Steel Truss、Solutions Hub、Foundation Guide、Container Loading Guide、Wind Load Guide、Cost Cluster（至少冻结至 2026-11-03）——未经单独批准，不得修改其正文、内链、Title、H1、URL、Canonical、Schema 或重定向。
6. 任何一步失败：**停止部署、不 push、输出错误报告**。

## 1. 搜索意图与关键词竞争检查（选题前必做）

- 列出 `src/content/blog/zh/` 与 `src/content/blog/en/` 已有文章，排除重复主题。
- 按 Playbook 选题优先级：GSC / AI Exposure 数据 > 现有内容缺口 > 第一方证据 > 商业价值。
- 关键词竞争检查（有数据时）：
  - 用 GSC 最近窗口（`docs/gsc-history/` 最新导出）查目标 query 的 clicks / impressions / position / CTR；position 4–10 属「冲 Top3 候选」，11–20 属「进首页候选」，20–50 高商业价值属「加强候选」。
  - 无 GSC 数据时，用站内已有页面 + 公开 SERP 人工抽查，**禁止编造排名/点击/CTR**。
- 输出：候选主题 + 搜索意图（Information / Commercial / Transactional）+ 竞争证据 + 推荐结论。

## 2. 新页面独立价值与关键词蚕食检查（新建前必做）

- 若现有页面已覆盖该意图 70–80%：**不新建**，改为建议更新现有页，本次不产出新 URL。
- 蚕食核查清单：
  1. 同 query 下现有站内 URL（含无斜杠/.html legacy 变体）是否已获得 impressions；
  2. 新 slug 与现有 slug 是否同义/近义（如 cost / price / budget；foundation / base design）；
  3. 新页面能否承载**现有页面无法承载**的独立搜索需求与独立用户价值；
  4. 是否低 cannibalization（新页意图与现有页意图可清晰区分）。
- 只有同时满足「独立搜索需求 + 独立用户价值 + 现有页面无法承载 + 低蚕食 + 值得长期维护」才允许新建。
- 若当天无足够强机会：结论 = **NO NEW ARTICLE TODAY**，输出建议更新的现有页面清单，结束。

## 3. 内容事实、项目、案例和数据核验（撰写中必做）

- 事实来源分级：仅允许 ① 用户确认的第一方事实（20 年 / 15 年出口 / 制造基地位置 / 真实项目照片）、② 已有仓库真实素材（`public/images/projects/`、`public/images/products/`）、③ 公开规范/常识且可追溯。其余一律不写。
- 项目/案例核验：客户名、项目名、面积、吨位、交期、认证（如 CIDB）、出口国——**必须有用户确认或仓库真实记录**；未经证实的内容禁止出现，历史未证实 Tanzania 项目内容保持 404/不恢复。
- 数字核验：汇总、换算、比例用工具计算；单一来源数字标注口径；无数据标「待补充」或写 depends。
- 责任边界（必写）：中赛负责 engineering coordination / detailing、fabrication / QC、marking / packing / container loading、export coordination、installation technical guidance；当地负责 permits / registered engineer、foundations / civil、local labour / physical erection、authority submissions。

## 4. Title、H1、Meta Description、Canonical、hreflang（撰写模板必检）

- frontmatter：`title` / `language` / `category`（枚举：Cost & Planning、Import & Shipping、Manufacturing & Quality、Installation & Technical、Supplier Selection、Materials & Components）/ `status` / `translationKey`（EN/ZH 配对同值）。
- Title：唯一、含主关键词、≤ 60 字符（EN）/ ≤ 30 字（ZH）合理长度；不堆砌。
- H1：与 title 语义一致但非重复；页面唯一 H1。
- Meta Description：≤ 155 字符，直接说明页面回答什么；不写「领先/最好/Top/保证」。
- Canonical：默认自引用（Astro 构建自动）；**禁止改已有 canonical**。
- hreflang：EN/ZH 配对，`sitemap-hreflang` 检查 dangling alternates = 0。
- 首屏约 100 字**直接回答问题**（GEO Direct Answer），删除空话/营销填充。

## 5. Schema、图片 ALT、内链和 CTA（撰写模板必检）

- Schema：Article + BreadcrumbList + Organization（页面级）；FAQ 可见时才用 FAQPage；不编造 Review/Product 数据。
- 图片：每张有语义化文件名 + 描述性 ALT（如实描述，不堆关键词）；合理尺寸/比例；建造类画面符合工程逻辑（无穿模/漂浮）。
- 内链 4–7 个：相关 Solution、Capability、真实相关 Project、相邻 Resource、Contact；锚文本自然，禁止机械重复同一锚文本。
- CTA：「Send Project Drawings / 提交项目图纸」→ `/en/contact/#quote-form` 与 `/zh/contact/#quote-form`。
- 正文结构：≥1 Direct Answer、≥1 决策/对比表格、≥1 Checklist 或 Steps、5–8 个真实采购问题 FAQ、3–5 个可独立引用的 GEO Answer Block。

## 6. GEO/AEO 内容质量检查

- Direct Answer 是否首屏、可独立引用（不依赖前文）。
- 表格是否含「输入 / 为什么重要 / 由谁提供」式决策结构。
- FAQ 是否为真实采购问题（不是关键词罗列）。
- 是否有 first-party evidence（BOM、shop drawing、erection drawing、QC 照片、packing list、container loading、完成项目照片）或明确无证据说明。
- 是否便于 AI 摘取：段落短句、小标题语义化、无「无内容过渡段」。

## 7. 图片真实性与第三方品牌检查

- AI 生成图仅用于概念、流程、比较、解释；**严禁**冒充真实项目/工厂/装柜/QC/证书。
- 涉及真实证据：优先引用仓库真实素材，ALT 如实描述。
- **第三方品牌检查**：禁止出现未经授权的品牌 LOGO、商标、名人肖像、受版权保护图形；不使用第三方受保护 IP 作为风格锚点。
- 品牌文字/国旗/LOGO 仅允许中赛自身（中赛钢构 / ZhongSai Steel Structure / 中文字样规范）。
- 生成图片默认 9:16（TikTok 类）或按用途比例；视频默认 9:16、不加配音（用户偏好）。

## 8. 构建与发布门禁（当前流程缺口，重点补强）

### 8.1 自动检查门禁（云端任务已具备，必须 PASS）
```bash
npm run build        # = astro build && node tools/generate-routes.mjs
npm run seo:check    # 必须 PASS：dangling alternates = 0、SHADOWED_WRONG_TARGET = 0、broken internal links = 0
```
- Build / seo:check 任一失败：**停止，输出错误，不部署、不 push**。
- `functions/_routes.js` 为构建生成物，不得手改；新文章 URL 必须出现在路由白名单。

### 8.2 人工审核门禁（**当前缺失，需补强** —— 云端任务现状为自动部署+自动 push main）
- 云端任务当前行为：`wrangler pages deploy dist --branch=main`（部署 Production）+ `git push main`（自动合并）。
- **治理要求（本 SOP 生效后）**：每日文章在自动 push/部署**前**或**后 24 小时内**，由人工/主 Agent 完成以下复核：
  1. 选题与蚕食结论复核（是否 NO NEW ARTICLE 更合理）；
  2. 事实/项目/数字核验抽查（对照第 3 节）；
  3. 页面级检查：Title/H1/Meta/Canonical/hreflang/Schema/ALT/内链/CTA（对照第 4–5 节）；
  4. 图片真实性 + 第三方品牌抽查；
  5. build + seo:check 结果复核；
  6. 部署后生产抽查：文章 URL HTTP 200、canonical self、hreflang 正确、无 404。
- 未通过人工复核的文章：标记「待复核」，在下一轮人工检查中修正或下架；**禁止静默删除已发布内容**，修正走独立 commit。
- **合规底线**：未经人工复核的自动发布不得被表述为「已审核上线」。

### 8.3 变更记录与回滚依据
- 每篇文章一个独立 commit：`content: add [slug] EN/ZH guide`（只含 `src/content/blog/`、`public/images/blog/[slug]/`、`docs/social/fb/[slug].md`；不夹带 dist / 临时文件 / 其他未跟踪改动）。
- 每次发布在 `docs/DAILY_ARTICLE_LOG.md` 追加一行：日期 / slug / EN+ZH URL / commit SHA / 部署 ID / 复核人 / 复核结论 / 备注。
- 回滚依据：commit SHA（可 `git revert` 单篇）；Cloudflare Pages 历史部署可回退到上一 deployment；GitHub 历史 commit 保留完整时间线。
- push 冲突：`git pull --rebase origin main` 后重推；禁止强推。

## 9. 发布后观察（48h / 2 周）

- 48h：GSC（如有新数据）查新 URL 是否被收录/获得 impressions；GA4 查 landing page 会话；无数据则记录 DATA NOT AVAILABLE。
- 2 周：position / CTR / AI exposure 初判；出现蚕食（同 query 多 URL）时记录并给合并/内链建议。
- 冻结页相关数据异常（如 Wind Load / Cost 表现变化）单独标记，不自动干预。

## 10. 现状审计结论（2026-10-15）

| 项 | 现状 | 状态 |
|---|---|---|
| 选题/蚕食检查 | 云端任务按 Playbook 执行，commit 反映单一主题 | ✅ 有流程 |
| 事实/项目核验 | Playbook 铁律约束，未见编造项目案例 | ✅ 有约束 |
| 页面级 SEO 项 | 云端任务模板内置（frontmatter/hreflang/schema） | ✅ 有模板 |
| 图片真实性 | Playbook 明令禁止冒充；历史无违规记录 | ✅ 有约束 |
| build + seo:check | 云端任务强制，失败即停 | ✅ 有门禁 |
| **人工审核门禁** | **无独立人工复核环节，自动部署+自动 push main** | ⚠️ **缺口，本 SOP §8.2 补强** |
| **push/部署一致性** | 10-15 观察：purlin commit 已进 main（dbf07fb），但生产 301→/resources/（未部署）；存在 push 与部署脱节 | ⚠️ **需监控** |
| 变更记录/回滚 | 每篇独立 commit 已有；发布日志（DAILY_ARTICLE_LOG）未建立 | ⚠️ 需补 |
| 冻结页保护 | 冻结清单在案；Phase 5 建议的 Container 正文内链未执行 | ✅ 保持 |

---

**SOP 生效标记**：本文件为治理基线。任何与现状冲突处，以「用户明确批准」为准；未经批准不得放宽冻结与真实性红线。
