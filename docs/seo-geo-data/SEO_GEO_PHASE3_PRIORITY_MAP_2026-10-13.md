# ZhongSai SEO + GEO Growth — Phase 3 Priority Map

- Date: 2026-10-13
- Status: ZHONGSAI SEO + GEO PHASE 3 PRIORITY MAP = COMPLETE
- Scope: AUDIT ONLY — 未修改任何代码 / 页面 / Title / Production
- Data sources: GSC Performance Window 真实导出 2026-08-22 ~ 2026-10-10（Queries 206 / Pages 385 / Countries 150 / Devices 3 / SearchAppearance 1 / AI Exposure 99 行）+ AI 效果报告总曝光 276 + GA4 快照（Phase 2，2026-09-08~10-05，标注非当日）
- Window note: 原始 CSV 导出窗口为 2026-08-22 ~ 2026-10-10（约 50 天，非 90 天）。为忠实原始数据，本报告统一使用 "GSC Performance Window: 2026-08-22 ~ 2026-10-10"，不再称 90d。CSV 文件名保留 90d 仅为历史命名，不代表窗口长度。

---

## 1. GSC Performance Window Overview（2026-08-22 ~ 2026-10-10）

| 指标 | 数值 | 解读 |
|---|---|---|
| 总点击 | 63 | 处于冷启动第二页阶段，漏斗顶端流量缺水 |
| 总展示 | 5,240 | 曝光基数尚可，但大多落在 position 20+ |
| CTR | 1.2% | 低于 2-3% 健康线，snippet/intent 匹配弱 |
| 平均排名 | 19.4 | 大量页面在第二页（11-20）甚至更深 |
| 索引 | 267 已索引 / 603 未索引 | 约 30.7% 索引率，未索引多数为低价值页 |
| 设备 | 桌面 51 clicks / 4,570 imp / 1.1% / 20.3；移动 10 / 654 / 1.5% / 12.8 | 桌面为主，移动端 position 更好（12.8） |
| 国家 | 中国 14 clicks / 607 imp / 7.5；美国 11 / 1,413 / 24.4；马来西亚 6 / 109 / 14.8；印尼 5 / 99 / 12.8 | 国内与美国贡献主要点击；美国曝光大但位置深 |
| SearchAppearance | 产品摘要 0 / 3 / 52.7（仅 1 行） | 网络搜索类型下无 AI Overview 显现；AI 数据见独立报告 |

系统建议（GSC 概述页）：`/zh/agricultural-steel-buildings/` 展示次数比平时多 +281%。

## 2. Top Query Opportunities（206 查询，仅 1 个有 click）

A. **Position 4–10 商业意图（0 点击，最值得抢）**

| Query | Clicks | Impressions | Position | 商业价值 | 落点 |
|---|---|---|---|---|---|
| 中国钢结构出口厂家排名 | 0 | 11 | 3.6 | 高 | /zh/blog/zhongguo-gangjiegou-changjia-paiming |
| grain storage warehouse | 0 | 3 | 2.0 | 高 | /en/projects/tanzania-grain-storage-warehouse |
| mcc | 0 | 2 | 1.0 | 中 | /en/projects/singapore-mcc-innocentre/ |
| temporary bracing | 0 | 4 | 4.5 | 中 | /en/blog/steel-structure-temporary-bracing-guide/ |
| steel structure exhibition hall | 0 | 2 | 1.0 | 高 | /zh/steel-exhibition-hall |
| astm a572 grade 50 supplier philippines | 0 | 6 | 7.7 | 高 | /zh/countries/philippines |

B. **Position 11–20（进入第一页候选）**

| Query | Clicks | Impressions | Position | 落点 |
|---|---|---|---|---|
| steel frame building foundations | 0 | 80 | 42.2→(变体 9.4) | Foundation 主题权威页（EN 无斜杠版 pos 9.4） |
| structural detailing services | 0 | 51 | 49.7 | /en/services/structural-steel-detailing/ |
| steel frame warehouse cost | 0 | 20 | 88.8 | Cost cluster ZH 权威页 |

C. **高曝光低 CTR**：steel frame building foundations（80 imp / 0 click）、structural detailing services（51 / 0）、general manager dongguan whatsapp +86（44 / 0，隐私敏感，不作营销动作）。

D. **商业意图 query（长期机会）**：中国钢结构出口厂家排名、钢结构出口厂家排名、steel structure workshop price、steel frame warehouse cost、steel structure shipping from china to mexico、container loading steel products。

E. **AI 重叠**：见第 4 节（Container / Foundation / Homepage / Roof / Fabrication / Bracing）。

> 数据质量备注：query「# minimal spec visual-evidence-grounded knowledge assistant…」疑似 LLM 注入/垃圾 query（0 click / 1 imp），原样入档不参与机会评估；WhatsApp 手机号类 query 系隐私敏感，仅记录不展开。

### Query Confidence 分类（Phase 4 §2 补充，基于真实 impressions 样本量）

| Query | Clicks | Impressions | Position | Confidence 分类 | 依据 |
|---|---|---|---|---|---|
| 中国钢结构出口厂家排名 | 0 | 11 | 3.6 | LOW SAMPLE | position 高但 impressions 极小（11），样本不足以进入重点优化 |
| grain storage warehouse | 0 | 3 | 2.0 | LOW SAMPLE | 3 imp，单次命中即 pos 2.0，不构成稳定信号 |
| mcc | 0 | 2 | 1.0 | IRRELEVANT / AMBIGUOUS | 2 imp，意图歧义（MCC 多义），仅记录 |
| temporary bracing | 0 | 4 | 4.5 | WATCH | pos 4.5 与真实页面 /en/blog/steel-structure-temporary-bracing-guide/ 匹配，样本小但意图明确 |
| steel structure exhibition hall | 0 | 2 | 1.0 | IRRELEVANT / AMBIGUOUS | 2 imp，无对应真实服务页，仅记录 |
| astm a572 grade 50 supplier philippines | 0 | 6 | 7.7 | WATCH | 商业意图明确（材质+国家供应商），6 imp 样本偏小 |
| steel frame building foundations | 0 | 80 | 42.2（EN 无斜杠变体 9.4） | CONFIRMED OPPORTUNITY | 80 imp 样本充分，主题命中 Foundation 权威页，但 CTR 0 且平均 pos 深——snippet/intent 不匹配 |
| structural detailing services | 0 | 51 | 49.7 | CONFIRMED OPPORTUNITY | 51 imp，商业意图明确（深化服务），pos 深 → 需先确认目标页能力表达 |
| steel frame warehouse cost | 0 | 20 | 88.8 | WATCH | 20 imp，Cost cluster 主题命中，pos 深，样本尚可 |
| general manager dongguan whatsapp +86 | 0 | 44 | — | IRRELEVANT / AMBIGUOUS | 隐私敏感，仅记录不动作 |

> 分类口径：CONFIRMED OPPORTUNITY = impressions ≥ 50 且主题/意图与现有页面真实匹配；WATCH = 意图明确但 impressions < 50 或位置深；LOW SAMPLE = impressions < 15 的高位 query（默认不自动进入重点优化）；IRRELEVANT / AMBIGUOUS = 意图不匹配或歧义。Position 1–3 但 impressions 极低一律 LOW SAMPLE，不因排名好看而提权。

## 3. Top Page Opportunities（385 页面）

| Page | Clicks | Impressions | CTR | Position | AI | 机会类型 |
|---|---|---|---|---|---|---|
| /zh/blog/steel-structure-wind-load-design-guide | 1 | 331 | 0.3% | 15.1 | 1 | 全站最高曝光页，距第一页一步，CTR 极低 |
| /zh/blog/steel-workshop-cost-factory-building-price | 0 | 208 | 0% | 6.0 | 0 | **position 6 零点击**，Cost cluster 观察项 |
| /zh/agricultural-steel-buildings/ | 0 | 163 | 0% | 16.0 | 0 | 曝光 +281%，意图匹配待修 |
| /zh/blog/gangjiegou-cangku-zaojia-duoshaoqian | 0 | 117 | 0% | 6.1 | 0 | Cost 中文长尾 pos 6 |
| /en/blog/steel-structure-foundation-design-guide/ | 2 | 114 | 1.8% | 30.7 | 17 | AI 强，Google 位置深，6 个 URL 蚕食 |
| /en/blog/steel-structure-foundation-design-guide.html | 0 | 104 | 0% | 42.2 | 0 | legacy .html 分走权重 |
| /en/ | 9 | 98 | 9.2% | 24.7 | 15 | 首页保护项 |
| /zh/components/steel-trusses/ | 0 | 85 | 0% | 22.2 | 0 | 组件页曝光在涨，位置待推 |
| /zh/components/steel-purlins/ | 0 | 82 | 0% | 13.9 | 0 | 组件页 pos 13.9 |
| /en/blog/steel-structure-foundation-design-guide | 0 | 77 | 0% | 9.4 | 3 | **无斜杠 EN 版 pos 9.4（第一页）** |
| /zh/blog/gangjiegou-vs-hunningtu-chengben-duibi | 0 | 71 | 0% | 7.0 | 0 | 钢混对比 pos 7 |
| /en/blog/steel-structure-vs-concrete-comparison | 0 | 69 | 0% | 27.8 | 0 | 英文对比版位置深 |
| /en/blog/steel-structure-container-loading-guide/ | 1 | 74 | 1.4% | 7.2 | 22 | **AI Top1，Google pos 7** |
| /zh/about | 0 | 40 | 0% | 6.5 | 0 | 中文 About pos 6.5 |
| /en/blog/steel-structure-fabrication-tolerances-guide/ | 0 | 19 | 0% | 4.4 | 11 | **pos 4.4 第一页 + AI 11** |
| /en/blog/steel-structure-temporary-bracing-guide/ | 1 | 36 | 2.8% | 4.7 | 11 | **pos 4.7 第一页 + AI 11** |
| /en/projects/tanzania-grain-storage-warehouse | 2 | 38 | 5.3% | 8.4 | 11 | 项目页证据强，CTR 5.3% |
| /zh/blog/zhongguo-gangjiegou-changjia-paiming | 0 | 49 | 0% | 3.7 | 0 | 中国厂家排名 pos 3.7 |
| /en/blog/shipping-cost-steel-structure-from-china | 0 | 49 | 0% | 6.3 | 0 | 运输成本 pos 6.3 |
| /en/blog/prefab-steel-building-roof-systems-comparison | 1 | 66 | 1.5% | 8.7 | 12 | Roof 对比 AI 12 |
| /zh/blog/gangjiegou-changfang-zaojia-zhinan | 0 | 40 | 0% | 6.3 | 0 | 厂房造价指南 pos 6.3 |

## 4. AI / GEO Exposure（AI 报告总曝光 276）

Top 20（真实 AI 效果报告）：

| Page | AI Impressions |
|---|---|
| /en/blog/steel-structure-container-loading-guide/ | 22 |
| /en/blog/steel-structure-foundation-design-guide/ | 17 |
| /en/ | 15 |
| /en/blog/prefab-steel-building-roof-systems-comparison | 12 |
| /en/blog/steel-structure-fabrication-tolerances-guide/ | 11 |
| /en/blog/steel-structure-temporary-bracing-guide/ | 11 |
| /en/projects/tanzania-grain-storage-warehouse | 11 |
| /en/about/ | 9 |
| /en/blog/steel-structure-wind-load-design-guide/ | 9 |
| /en/blog/steel-structure-supplier-thailand-guide | 8 |
| /en/blog/steel-structure-design-standards-guide | 6 |
| /en/blog/q355b-vs-q235b-steel-grade-comparison | 5 |
| /en/blog/steel-structure-erection-marks-guide/ | 5 |
| /en/blog/steel-building-roof-wall-cladding-systems-guide/ | 4 |
| /en/blog/steel-structure-supplier-uae-dubai-guide | 4 |
| /en/blog/steel-warehouse-cost-complete-guide/ | 4 |
| /en/products | 4 |
| /en/projects/singapore/ | 4 |
| /zh/blog/steel-structure-foundation-design-guide | 3 |
| /zh/blog/steel-warehouse-cost-complete-guide | 3 |

**AI 内容类型分析**：Guide（指南类）占 AI 曝光绝对主导（Container/Foundation/Fabrication/Bracing/Wind 等），Comparison 类次之（Roof Systems），Project 页（Tanzania 11）被 AI 引用为实例，Homepage/About 作为品牌实体出现。结论：**Guide + 真实项目证据是当前 AI 最偏好的格式**，与 Phase 1 判断一致并有数据支撑。

**AI → 商业路径**（现状）：
- Container Loading Guide (22) → 页面含 Export Delivery 内链 → Contact
- Foundation Guide (17) → 页面含 Engineering Design 内链 → Contact
- Tanzania Project (11) → Projects 中心 → Contact
- 缺口：AI Top 页面大多只到一次商业跳转，没有 WhatsApp 直链层；GA4 未确认独立 WA click 事件（Phase 2 已记录缺口）。

## 5. ChatGPT / AI Referral（GA4 快照，Phase 2 2026-09-08~10-05）

- AI Assistant 渠道：31 sessions / 87.1% engaged / 平均时长高 → 与 GSC AI 报告互相印证（AI 用户深度阅读）。
- 2026-09-24 ChatGPT → 网站 → WhatsApp outbound click 调查：GA4 无独立 WA click 事件（Phase 2 已确认事件缺失），无法在本次数据层确认该路径；未识别个人身份。需 GA4 后台补 outbound click 事件后才能闭环（本轮不改 tracking）。
- generate_lead 4 次全部为测试（QA 隔离后 clean baseline 自 Contact CRO 上线日重新起算）。

## 6. Cannibalization Findings（真实 query×URL 支持）

| 主题 | 竞争 URL（90d impressions） | 主 URL 建议 | 动作 |
|---|---|---|---|
| Foundation 基础 | EN 斜杠 114 / EN .html 104 / EN 无斜杠 77 / ZH 28 / ZH 斜杠 17 / ZH .html 7 ≈ 347 imp 分散 | /en/blog/steel-structure-foundation-design-guide/ | legacy .html 与无斜杠变体 301 合并；ZH 收敛到 ZH 权威版 |
| Container Loading 装柜 | EN 斜杠 74 / EN 无斜杠 25 / EN .html 9 / ZH 17 ≈ 125 imp | /en/blog/steel-structure-container-loading-guide/ | 同上（AI Top1 页，必须保护） |
| Cost Cluster 造价 | ZH 权威 208 / gangjiegou-cangku 117 / vs-hunningtu 71 / EN 39 / prefab-factory 67 / warehouse-cost EN 48+8 / ZH 10+22 | ZH 造价权威页（已 301 承接） | 冻结至 11-03，观察后再动 |
| Wind Load 风荷载 | ZH 331 / ZH 斜杠 18 / EN 斜杠 26 / EN 无斜杠 26 / ZH / 15.2 | ZH 权威版（331 imp） | ZH 收敛；EN 收敛到 EN 权威版 |
| Steel vs Concrete 钢混对比 | vs-hunningtu 71 / EN comparison 69 / EN building-cost 20 / EN vs-comparison 1 | ZH 对比页 | 中英各自收敛，避免交叉 |

> 判断：这些蚕食均以**同主题 legacy 变体（.html / 无斜杠 / 中英双版）**形式存在，不是全新重复页。301 合并是低风险高收益动作；禁止简单全部 301，必须先确认 legacy URL 是否有站内引用与 redirect 承接链。

## 7. Top 10 Confirmed Growth Pages（/30 评分，全为真实数据支持）

| # | Page | GSC | AI | Score /30 | Status |
|---|---|---|---|---|---|
| 1 | /en/（Homepage） | 9c / 98imp / 24.7 | 15 | 26 | CONFIRMED — HOLD（保护） |
| 2 | /en/projects/tanzania-grain-storage-warehouse | 2c / 38 / 8.4 / 5.3% | 11 | 24 | CONFIRMED — 复用为证据 |
| 3 | /en/blog/prefab-steel-building-roof-systems-comparison | 1c / 66 / 8.7 | 12 | 23 | CONFIRMED — 保护 + CTR |
| 4 | /zh/blog/steel-workshop-cost-factory-building-price | 0c / 208 / 6.0 | 0 | 22 | CONFIRMED-PARTIAL — 冻结观察至 11-03 |
| 5 | /en/blog/steel-structure-container-loading-guide/ | 1c / 74 / 7.2 | 22 | 22 | CONFIRMED — URL 合并 |
| 6 | /en/blog/steel-structure-foundation-design-guide/ | 2c / 114 / 30.7 | 17 | 21 | CONFIRMED — URL 合并 |
| 7 | /en/blog/steel-structure-fabrication-tolerances-guide/ | 0c / 19 / 4.4 | 11 | 21 | CONFIRMED — CTR 修复 |
| 8 | /en/blog/steel-structure-temporary-bracing-guide/ | 1c / 36 / 4.7 | 11 | 21 | CONFIRMED — CTR 修复 |
| 9 | /zh/blog/steel-structure-wind-load-design-guide | 1c / 331 / 15.1 | 1 | 20 | CONFIRMED — CTR + 第一页冲刺 |
| 10 | /zh/agricultural-steel-buildings/ | 0c / 163 / 16.0 | 0 | 20 | CONFIRMED — snippet/intent |

评分维度：Search 0-5 / GEO 0-5 / Commercial 0-5 / Authority 0-5 / Evidence 0-5 / Cannibalization-Safety 0-5。

## 8. First 3 Recommended Actions（P1，仅建议，本轮未执行）

**P1-1 · URL 权重合并（Foundation + Container Loading 双主题）**
- 为什么现在：两个主题各有 4-6 个 URL 瓜分权重（合计 ~347 imp / ~125 imp），且 .html legacy 仍在索引；AI 已高度认可这两页（17 / 22），Google 位置被分散拖累。
- 改什么：确认 legacy .html / 无斜杠变体的站内引用与现有 redirect 链 → 以权威斜杠版为 canonical，对 legacy 变体 301（逐条验证 redirect count 与 seo:check）。
- 不改什么：不改正文、不改 Title/H1、不新建页面。
- 预期影响：SEO（position 集中上移）；GEO 不变（AI 已认可，保护）；CRO 无直接。
- 是否需正文：否；只需内链/redirect/canonical。
- 排名保护风险：中低——必须保住 AI Top1 页不动 URL。

**P1-2 · ZH Wind Load Guide CTR 修复 + 第一页冲刺**
- 为什么现在：全站最高曝光页（331 imp / pos 15.1 / CTR 0.3%），距第一页一步之遥，是投入产出比最高的单页。
- 改什么：Meta Description 重写为「风荷载取值 + 计算要点 + 项目应用」高 CTR 表述；首屏加 Direct Answer + 荷载表格（页面已有工程表格则核对）；内链到 Engineering Design 与 Contact。
- 不改什么：URL / H1 核心主题 / canonical / hreflang。
- 预期影响：SEO（CTR 0.3%→1%+，pos 15→10-12）；GEO 轻度；CRO 经内链提升。
- 是否需正文：否，仅 snippet + 首屏结构微调（Title 修改需单独批准）。
- 排名保护风险：低。

**P1-3 · Cost Cluster 观察期准备（position 6 零点击）**
- 为什么现在：ZH 造价权威页 pos 6.0 / 208 imp / **0 clicks**——已进第一页但意图不匹配，是最反常的信号；但 Cost Cluster 冻结至 2026-11-03。
- 本轮动作：只记录观察（已入档）；11-03 观察点后优先做 snippet/intent 修复（含 steel frame warehouse cost / gangjiegou-cangku 长尾）。
- 不改什么：冻结期内不碰页面。
- 预期影响：SEO CTR 修复；GEO 轻；CRO 高（造价 = 高商业意图）。
- 排名保护风险：中——重写 snippet 可能短期波动，观察期后单变量操作。

## 9. Pages to HOLD / Freeze

| 页面 | 原因 |
|---|---|
| Engineering Design ZH/EN | 已上线冻结，无数据异常 |
| Manufacturing & Quality ZH/EN | 同上 |
| Export Delivery ZH/EN | 同上 |
| Contact ZH/EN | 同上 |
| Steel Truss ZH/EN | 同上 |
| Solutions Hub ZH/EN | 同上 |
| Cost Cluster（ZH 造价权威 + 承接 legacy） | 冻结至 2026-11-03 观察期 |
| /en/ 与 /zh/ 首页 | AI 曝光 15/3 + clicks 正常，保护 |
| AI 高曝光指南页（Container / Foundation / Roof / Fabrication / Bracing） | 已获 AI 认可，避免为「还能优化」而大改 |

## 10. Data Gaps（如实标注）

- GA4 当日实时数据未拉取（登录态未确认）；本报告 GA4 引用为 Phase 2 快照（2026-09-08~10-05），时间标注明确。
- 28d vs previous 28d 对比未在 GSC 界面导出（90d 窗口内无法直接分段）；季节波动未单独判定。
- WhatsApp outbound click 事件缺失（GA4 后台未配），AI→WA 转化闭环无法数据化确认。
- SearchAppearance 网络类型仅 1 行（产品摘要），AI Overview 以独立 AI 报告为准。

## 11. 本轮产出文件

- docs/gsc-history/2026-10-13-90d-queries.csv（206 行）
- docs/gsc-history/2026-10-13-90d-pages.csv（385 行）
- docs/gsc-history/2026-10-13-90d-countries.csv（150 行）
- docs/gsc-history/2026-10-13-90d-devices.csv（3 行）
- docs/gsc-history/2026-10-13-90d-searchappearance.csv（1 行）
- docs/gsc-history/2026-10-13-ai-exposure.csv（99 行，AI 报告总曝光 276）
- docs/seo-geo-data/SEO_GEO_MASTER_OPPORTUNITY.csv（10 行 CONFIRMED 机会表，已更新）

## 12. 最终结论

数据首次做到「以真实 GSC 90d + AI 曝光 + 页面行为」驱动优先级。三个最确定的信号：
1. **同主题 URL 变体蚕食权重**（Foundation / Container / Cost / Wind / Steel-vs-Concrete）——先合并权重，再谈优化。
2. **第一页零点击页**（Cost pos 6 / 0 clicks；Fabrication pos 4.4；Bracing pos 4.7）——CTR/snippet 修复比新写内容更划算。
3. **AI 已认可但 Google 位置深的页面**（Foundation 30.7 / Container 7.2）——AI 曝光是资产，须保护 URL 与结构。

本轮未修改任何代码、页面、Title、Meta 或 Production。
