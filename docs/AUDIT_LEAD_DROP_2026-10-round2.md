# ZhongSai Website Lead Drop — Full-Funnel Audit（ROUND 2）

- 日期：2026-10-06
- 范围：https://zhongsai-steelstructure.com （Production 实测 + GA4 官方数据 + GSC 官方导出 + D1 生产库实测 + EN/ZH 表单 E2E）
- 性质：**AUDIT ONLY**。本轮未改动 Production，未在 GA4 创建 Key Event，未删除 D1 记录。
- 衔接：第一轮报告见 `docs/AUDIT_LEAD_DROP_2026-10.md`。本轮在其基础上，用 GA4 实测定位"Key Events = 0"的决定性根因，并补齐 EN 表单 E2E。
- Production 安全基线：部署 `b08feea0` / commit `ad6d08f`，**185 页 / sitemap 156 loc**。

---

## 1. Executive Conclusion（第二轮决定性结论）

**"Key Events = 0、Session Key Event Rate = 0%"不是网站 0 线索、也不是追踪故障，而是 GA4 从未把 `generate_lead` 标记为 Key Event 的配置缺口。**

- GA4 事件层完全正常：28 天内 `project_form_start`、`project_form_submit`、`generate_lead`、`wechat_click`、`whatsapp_click`、`email_click` **全部真实触发**（见 §3）。
- GA4「任务」页的"设置关键事件"任务**未完成、带锁**，"采取行动"按钮灰置——即自埋点以来从未定义任何 Key Event。GA4 只把被显式标记的事件计入 Key Events 面板，未标记则恒为 0。
- 真实自然询盘确实极少：D1 自 2026-09-05 建库以来共 **23 条记录，除 1 条英文 "Keshen Gidion" 外，其余 22 条全部是内部测试/低质**（见 §9、§11）。
- 因此本轮维持第一轮主因判断：**漏斗顶端缺水（新站冷启动、关键词第二页、商业意图流量占比低、落地分散）**，而非中后段 P0 故障。**P0 = 无。**

---

## 2. Is the Lead Drop Real?

- **有效线索近乎为 0 属实**：约 1 个月内真正可信海外潜客仅 1 条（`Keshen Gidion`，EN，webhook success）。
- 但这不是"从有变无"的暴跌：GSC 点击日均在缓慢上升（第一轮 §3：日均 +32%），问题是**基数一直太小 + 商业意图流量占比低 + 测试数据淹没了真实信号**。
- GA4 面板"Key Events = 0"**会让"线索数"看起来比实际更糟**（连那 1 条和测试提交都不计入 Key Events），需先补 Key Event 配置，后续数据才可读。

---

## 3. GA4 事件全量实测（28 天，2026-09-08 – 10-05）

事件报告（Engagement → Events），共 13 个事件 / 总 4,216 次 / 381 用户：

| 事件 | 次数 | 用户数 | 性质 |
|---|---|---|---|
| page_view | 1,752 | 380 | 浏览 |
| user_engagement | 1,055 | 138 | 互动 |
| session_start | 594 | 379 | 会话 |
| first_visit | 382 | 379 | 会话 |
| scroll | 302 | 61 | 互动 |
| **project_form_start** | **47** | **30** | 漏斗-开始 |
| form_start | 44 | 10 | 漏斗-开始 |
| click | 22 | 12 | 通用点击 |
| **whatsapp_click** | **6** | **3** | 转化-联系方式 |
| **generate_lead** | **4** | **1** | 关键转化 |
| **wechat_click** | **4** | **2** | 转化-联系方式 |
| **email_click** | **2** | **2** | 转化-联系方式 |
| **project_form_submit** | **2** | **1** | 漏斗-提交 |

**结论：所有转化/漏斗事件代码均正常触发，埋点无故障。** 同时修正第一轮"wechat 无独立监听"的判断——`wechat_click` 实际有触发（4 次 / 2 用户）。

---

## 4. 真实自然客户成功提交 ≈ 0（关键反常点）

- `generate_lead`（4 次）与 `project_form_submit`（2 次）**全部来自同一个用户（1 user）**，结合提交内容与时间，**均为内部测试**，不是自然客户。
- `project_form_submit`(2) < `generate_lead`(4) 反常：提示 `project_form_submit` 在部分成功路径上**漏触发**（成功落库但未计 submit），属埋点小瑕疵（P2，不影响线索本身落库）。
- 即：**28 天内没有任何一个可识别的自然海外客户走完表单提交。**

---

## 5. Key Events = 0 的根因（100% 坐实）

- GA4「任务 / Task Assistant」中"**设置关键事件**"任务：状态**未完成、带锁图标**；"采取行动"按钮 `disabled`，tooltip 为"开始收集数据以解锁此任务"。
- 正确配置入口（本轮 AUDIT ONLY，**未实际创建**）：
  **Admin（管理）→ Key Events（关键事件）→ New key event（新建关键事件）→ 条件 `event_name` 等于 `generate_lead` → 保存。**
- 配置后，新产生的 `generate_lead` 才会进入 Key Events 面板与"关键事件数/率"指标（历史数据不回溯，仅对配置后生效）。
- 这是**纯 GA4 后台配置、不碰网站代码、无发布风险**，建议作为本轮第一项动作。

---

## 6. Organic Search 漏斗（80 sessions）落地页分布

GA4 自由探索的维度选择器在自动化下**反复卡死/重置**（中文"落地页/着陆页"搜索异常，详见 §13 工具限制），故改用**已导出的 GSC「网页.csv」对 Google Organic 点击落地页按类型现算**（6 周，55 次明细点击 / 4,701 曝光；脚本 `classify_pages.py`）：

| 落地页类型 | 点击 | 占比 | 曝光 | 有点击页数 |
|---|---|---|---|---|
| **Blog（信息 / GEO）** | **16** | **29.1%** | 2,623 | 15 |
| Home（首页，品牌/导航型） | 14 | 25.5% | 127 | 3 |
| Products / Components | 7 | 12.7% | 577 | 4 |
| Other（多为旧 URL：/countries、/shipments、/steel-hospital） | 5 | 9.1% | 423 | 5 |
| Projects | 4 | 7.3% | 249 | 4 |
| About | 3 | 5.5% | 206 | 2 |
| Solutions / Application | 3 | 5.5% | 300 | 3 |
| Contact | 2 | 3.6% | 115 | 2 |
| Capabilities | 1 | 1.8% | 49 | 1 |
| Resources / Markets | 0 | 0% | 32 | 0 |

- 脚本二分：信息型 44% / 商业型 56%；但"商业型 56%"里含 Home（品牌/导航）与旧 URL，**真正高商业意图精准落地页（Products+Solutions+Capabilities+Markets+Contact+Projects）合计仅约 17 次点击（31%）**。
- **特征：点击高度分散（55 次散落约 39 页，每页 1–2 次），无集中商业落地页；信息型 Blog + 首页占比过半。**
- **结论：自然流量基数小 + 落地分散 + 商业意图占比低。真正到达商业页的流量每页仅个位数，样本不足以判定商业页 CRO 故障**（Contact 2c / Products 7c 而 organic 0 form_start，需关注但统计意义弱，列 P2 观察）。

---

## 7. AI Assistant 渠道（31 sessions）

- 总量：31 sessions（5.24%），27 engaged，**互动率 87.1%**，182 events，平均互动质量高。
- 落地页无法从 GA4 界面导出（维度选择器故障，GSC 不含 AI referral）。**旁证定性**：
  - 用户已确认 `steel-structure-foundation-design-guide` 是"AI 引用展示最多"的页面；
  - AI referral（ChatGPT / Perplexity / Gemini 等）的落地机制是"点击 AI 回答中的引用链接 → 落到被引用的具体页面"，主要为 **Blog 技术指南（GEO 目标页）**。
- **结论：AI 流量主要落到被引用的技术指南，与 GEO 策略一致；互动率高说明用户在阅读，但同样 0 转化。样本小（31），不过度外推。**

---

## 8. Direct 468（79.05%）= 内部 + 机器人污染

- Direct 占比 79% 对一个 B2B 新站异常高。城市维度（自由探索全量活跃用户）出现：
  - **Council Bluffs、Prineville、Glenview、Altoona** —— 均为 **Google 数据中心所在地（抓取/机器人/评测流量特征）**；
  - Singapore、Los Angeles、Guangzhou、Shenzhen、Abu Dhabi —— 真实访问地；另有 `(not set)`。
- 结合近 6 周频繁的开发 / Preview / Production QA / 人工验收，**Direct 明显被内部访问与数据中心机器人流量污染**。
- **结论：不能把 592 sessions 解释为 592 个真实潜客。** 需配置 GA4 内部流量过滤 + 机器人/数据中心过滤（P1），否则渠道与转化数据长期失真。

---

## 9. 表单 EN/ZH E2E（Production，TEST 标记）

- **ZH（第一轮）**：场景 A 填电话 → **HTTP 201 / complete**（lead `6c5ba4dc…`，test_record=1）；场景 B 只填微信、不填电话 → 前端放行、后端 **VALIDATION_ERROR**、前端笼统提示。
- **EN（本轮新增）**：`/en/contact/` 填 name=`EN QA Test Record`、calling code=`China +86`、phone=`13192007378`、wechat=`entest123`、project country=`Malaysia` → Turnstile 自动通过 → 前端显示 **"Project inquiry received"**，D1 落库 **submission_status=complete**（rowid 27）。
- **结论：EN/ZH 表单成功路径均能正常落库，表单不是 P0。** EN/ZH 共用同一 `QuoteForm` 组件与同一后端，技术路径一致。
- **P1 缺陷（与语言无关）维持**：前端仅必填 name/wechat/country（phone、calling code、email 可选），后端 `validateLead` 额外强制 `calling_code + phone`；"只填微信、不填电话"（常见于华人客户）会被后端拒，且前端错误提示不指明电话字段。

---

## 10. Lead Delivery（落库 / webhook / 通知）

- **D1 落库正常**：INSERT leads 成功，附件经 R2 存储。
- **LEAD_WEBHOOK：20 success / 3 failed**。3 条 failed（rowid 15、20、27）错误均为 **HTTP 404**，且都是零星/重复的测试记录（两条 `ganggou zhongsai` + 本轮 `EN QA Test Record`）；唯一真实海外记录（rowid 24）webhook **success**。
  - 端点整体可达（20 success），404 为零星、集中在快速重复提交的测试上（疑似接收端对重复/幂等请求返回 404），**不是持续投递故障**。
- **企业微信群机器人通知为独立链路**：第一轮 ZH E2E 时群内实际收到"（测试）"通知，该链路通。
- **结论：Lead Delivery 整体正常，不存在"提交成功但销售收不到"的 P0。** 建议后续确认销售实际依赖 LEAD_WEBHOOK 还是企微群，以决定是否排查零星 404。

---

## 11. 测试数据污染与清理清单（需授权）

- D1 共 23 条（rowid 3–27，有跳号）。**真实海外记录仅 rowid 24 `Keshen Gidion`（1 条）**；其余 22 条为内部测试/低质。
- **`test_record` 判定逻辑过窄**：后端仅当 name 含 `"v2 qa test"` 或 `"test_record"` 才置 test_record=1。大量内部测试（中文"企业微信测试/附件测试/ganggou zhongsai/111/，，"以及本轮 `EN QA Test Record`）**未命中、test_record=0**，导致测试记录伪装成真实线索、淹没信号。23 条中仅 rowid 26 test_record=1。
- **建议（写操作，待用户授权，本轮未执行）二选一**：
  1. 删除 22 条内部测试记录（保留 rowid 24）；或
  2. 全部 `UPDATE … SET test_record=1` 保留备查。
- 后续应改进测试判定（放宽 name 匹配或增加隐藏测试标记），避免再次污染（P2 代码改动）。

---

## 12. Root Cause Matrix

| 类别 | 问题 | 证据 | 影响 | 优先级 | 难度 |
|---|---|---|---|---|---|
| GA4 配置 | 未把 generate_lead 标记为 Key Event | 任务页未完成/锁；Key Events=0 | 关键事件面板恒 0、数据不可读 | **P1（高，应最先做）** | 极低（纯后台） |
| SEO/流量 | 商业词第二页、自然流量基数小 | GSC pos19.8；6周52点击 | 漏斗顶端缺水（**主因**） | P1 | 高（需内容+时间） |
| 流量质量 | Organic 偏信息型、落地分散 | Blog29%+Home25%；商业精准页31% | 商业意图流量少 | P1/P2 | 中 |
| 表单 | 前后端必填不一致、报错笼统 | EN/ZH E2E | 华人"只微信"用户被拒 | **P1** | 低 |
| 旧 URL | 约 31% 点击未精准到达 | 第一轮 bucket；本轮 Other 9% | 浪费本已稀少的点击 | P1（gsc-redirects 待部署） | 低 |
| GA4 配置 | Direct 内部/数据中心污染 | 城市含4个Google数据中心；Direct79% | 渠道/转化数据失真 | P1 | 低 |
| 数据卫生 | 22 条测试记录 test_record=0 | §11 | 真实信号被淹没 | P2 | 低（需授权） |
| 埋点 | project_form_submit 部分漏触发 | submit2 < generate_lead4 | submit 计数偏小 | P2 | 低 |
| CRO | Contact/Products 零星点击 0 form_start | §6 | 待观察（样本不足） | P2 | 中 |

**P0（直接阻断线索：表单坏/投递断/核心页 noindex·404/核心追踪坏）= 无。**

---

## 13. 工具与口径限制（诚实声明）

- GA4 自由探索"选择维度"弹窗在自动化下**极不稳定**：中文"落地页/着陆页/页"搜索时 0 结果或重置；英文 `page` 搜索结果时有时无（竞态），8 次重试未能稳定勾选。故 §6 采用 GSC「网页.csv」现算 Google Organic 落地页（Google 为 Organic 主体），口径为"GSC 点击"而非"GA4 sessions"，不含 Bing/DuckDuckGo；AI 渠道落地页（§7）只能旁证定性。
- D1 无 `created_at` 字段，时间先后以 rowid（插入顺序）近似。

---

## 14. FINAL VERDICT — 8 问 8 答

1. **网站是否真的 0 线索？** 不是绝对 0，但约 1 个月真实自然海外询盘仅 1 条（`Keshen Gidion`），近乎 0；D1 23 条中 22 条是内部测试。
2. **是 GA4 Key Event 配置 / Tracking 问题吗？** Key Events=0 **是配置缺口**（从未标记 generate_lead 为 Key Event）；**tracking 本身正常**（所有转化事件均触发）。
3. **Organic 流量是否过少？** 是。28 天 80 sessions、Google 6 周 52 点击、日均约 1.2，基数很小。
4. **Organic 是否偏信息型？** 是。Blog 29% + Home 25%，真正商业精准落地页约 31% 且高度分散。
5. **商业页是否存在 CRO 问题？** 现有样本（每页个位数点击）**不足以判定 CRO 故障**；商业页流量本身极少。Contact/Products 零星点击 0 form_start 列 P2 观察并确保 CTA 清晰。
6. **表单是否正常？** 成功路径 EN/ZH 均正常落库；但有 **P1 前后端必填不一致**（只微信不填电话被后端拒、前端报错笼统）。
7. **Lead Delivery 是否正常？** 整体正常（落库 + 20 webhook success + 企微群通知）；3 条 webhook failed 为零星测试 HTTP 404，非持续故障。
8. **旧 URL 是否主要原因？** **PARTLY CONTRIBUTING — NOT THE PRIMARY CAUSE**（见 §15）。

---

## 15. Old URL Verdict

**结论：PARTLY CONTRIBUTING，NOT THE PRIMARY CAUSE。**

- 旧 URL 确实浪费部分本已稀少的点击（第一轮：约 31% 未精准到达；本轮 GSC 落地页中 Other 旧 URL 占 9.1%，Blog 旧 slug 亦有漏损）。
- 但它不是"几乎没有线索"的主因：主因是**自然流量基数太小 + 商业意图占比低**——即使旧 URL 全部修复，55 次点击的总盘子仍不足以产生稳定询盘。
- 处置：旧 URL 只做"有信号价值"的精确映射（已由 `gsc-redirects` Preview 覆盖，待批准部署），**不做全量 404 治理**。本轮未发现需要另启"Historical URL Full Recovery Audit"的新高价值信号损失。

---

## 16. Exact Fix Plan（按建议顺序；均待确认，本轮未改）

1. **【P1，零风险，最先】GA4 标记 Key Event**：Admin → Key Events → New → `event_name = generate_lead` 保存。配置后对新数据生效。
2. **【P1】修复表单前后端必填不一致**（需用户决策方向）：
   - 方案一：前端把 Phone/WhatsApp 与 calling code 设为必填（与后端对齐），并把错误提示精确到具体字段；
   - 方案二：后端放宽，phone/calling code 改可选（有 wechat 即可联系）。
   - 建议方案二 + 精确报错，更贴合华人"只留微信"习惯、减少漏单。
3. **【P1】部署 gsc-redirects（Preview 已就绪）**：把旧 URL 点击精准 301/410，消除漏损。
4. **【P1】GA4 数据净化**：配置内部流量过滤（internal IP）+ 数据中心/机器人过滤，让 Direct 与渠道数据可信。
5. **【P2】清理 D1 测试记录 + 改进 test 判定逻辑**（需授权写库）。
6. **【P2】修复 project_form_submit 漏触发；复核商业页首屏 CTA / 移动端无遮挡。**
7. **【P2/长期】持续按 `SEO_GEO_CONTENT_PLAYBOOK.md` 产出 SEO+GEO 内容，把第二页商业词推向首页，积累 EEAT 与时间。**

---

## 17. What NOT To Fix

- 不要因 Key Events=0 误判网站/表单故障而重做表单或重建埋点（埋点正常）。
- 不要做 GSC 全量 404 批量治理/为每个旧 URL 建重定向（只做有信号价值的，gsc-redirects 已覆盖）。
- 不要把全站 container 一刀切加宽/改窄（与线索无关；XWIDE 已因"太空"被否）。
- 不要删除表单必要字段、不要改动 canonical/hreflang/redirect/GA4 基础配置/API/DNS。
- 不要为让 YouTube 国内可访问做复杂改造或自托管视频（用户已明确放弃，"变慢/太麻烦不如不做"）。

---

## 18. Recommended Next Action

**第一步只需 5 分钟、零风险：在 GA4 后台把 `generate_lead` 标记为 Key Event（§16-1）。** 随后请确认：
- 表单必填不一致采用方案一还是方案二（§16-2）；
- 是否授权部署已 Preview 验证的 gsc-redirects（§16-3）；
- 是否授权清理 D1 中 22 条测试记录（§16-5）。

---

**最终状态：ZHONGSAI LEAD DROP AUDIT（ROUND 2）= COMPLETE。**
本轮 AUDIT ONLY，未部署、未改 Production、未改 GA4 配置、未删 D1。等待确认修复顺序。
