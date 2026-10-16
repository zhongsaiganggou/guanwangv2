# ZhongSai SEO + GEO Growth — Phase 1 Data-Driven Opportunity Audit / Priority Map

- **审计日期**: 2026-10-12
- **性质**: AUDIT ONLY — 未改代码 / 未改页面 / 未改 Title / 未新建页面 / 未部署 Preview 或 Production / 未发布文章
- **仓库**: `D:\zhongsai-website-v2`
- **线上**: https://zhongsai-steelstructure.com

---

## 1. Current Production Baseline

| 项 | 值 | 证据 |
|---|---|---|
| origin/main HEAD | `92946be4e29012101aea704b3d6d92f6ee78d6fb`（本地=远端） | `git log origin/main` |
| Production pages | **216** | 最近一次 build 输出 |
| routes | **215** | 最近一次 build 输出 |
| sitemap loc | **188** | `dist/sitemap.xml` 实测计数 |
| seo:check | PASS（dangling alternates=0, SHADOWED_WRONG_TARGET=0, 71 条 redirect 规则） | 最近一次 seo:check |
| 最近上线 | Solutions Hub（7be145e + 92946be）；此前各页 UX 重构均已冻结 | git log |

**每日文章任务来源记录**：216 页基线中包含每日文章任务持续 push 的双语博客（git log 可见 `content: add … EN/ZH guide` 连续 commit，如 how-to-read-steel-structure-drawings、ventilation-daylighting、steel-sections、anchor-bolt-installation 等；`src/content/blog/` 现共有 **EN 42 篇 + ZH 41 篇**）。本轮只记录来源，不做任何部署。

**异常 URL 遗留记录（仅记录，不处置）**：`tools/seo-audit/sitemap-urls-current.txt`（旧快照）含 `/en/blog/en/*.md/`、`/zh/blog/zh/*.md/` 形态 URL；**当前 `dist/sitemap.xml` 已不含此类 URL**（全为干净 `/en/blog/slug/` 与 `/zh/blog/slug/`）。属于旧快照残留，建议后续在 GSC 中核查旧 `.md/` URL 是否仍在被请求，再决定是否需要精确 301（本轮不执行）。

---

## 2. Data Sources Used（真实可获取源）

| 源 | 可用内容 | 时间窗 | 状态 |
|---|---|---|---|
| GSC 全站汇总 | clicks 52 / impressions 4,340 / CTR 1.2% / avg pos 19.8 | trailing 3 个月（截至 2026-10-06） | ✅ 实测（`docs/SEO_SPRINT_BASELINE_2026-10.md`） |
| GSC 落地页分布 | 55 clicks / 4,701 impressions，按页类型 10 类 | 6 周（round2 审计，2026-10-06） | ✅ 实测（`docs/AUDIT_LEAD_DROP_2026-10-round2.md` §6） |
| GSC cost cluster | 4 条 legacy cost URL：506 impressions / pos 6–7 / 1 click | 3 个月（截至 2026-10-06） | ✅ 实测（SEO_SPRINT_BASELINE §2） |
| GSC Generative AI Exposure | 9 条 legacy URL 的 AI 展示（1–4 次），已全部 301 恢复 | 快照 2026-09-18 | ✅ 实测（`seo-redirects/AI_EXPOSURE_RECOVERY.csv`） |
| GA4 事件全量 | 4,216 events / 381 users；13 事件明细；渠道 Direct 468(79%) / Organic 80 / AI Assistant 31(5.24%, engaged 87.1%) | 28 天 2026-09-08–10-05 | ✅ 实测（AUDIT_LEAD_DROP round2 §3/§7） |
| D1 生产库 | 23 条记录，真实海外 1 条（rowid 24），22 条内部测试 | 2026-09-05 建库起 | ✅ 实测（round2 §9/§11） |
| GEO 页面评分 | 12 个 EN 页，avg 7.7，最高 8.0（steel-workshop / steel-warehouse / manufacturing-quality） | 2026-09-09 | ✅ 实测（`tools/seo-audit/geo-page-score.csv`） |
| 关键词/蚕食/内链资产 | KEYWORD_MAP(37KB)、CONTENT_CANNIBALIZATION、INTERNAL_LINK_MAP、seo-growth-backlog-keywords | 迁移期规划 | ✅ 本地资产（规划类，非绩效） |
| 404/重定向历史 | 266 条 404；P0=0 / P1=7（已恢复）/ P2=42 / P3=217；71 条 redirect | 2026-10-07 快照 | ✅ 实测 |
| sitemap 当前 | 188 loc 全清单 | 当前 build | ✅ 实测 |

**DATA NOT AVAILABLE（诚实声明，未编造）**：
- **GSC 90 天 query 级完整导出**：本地无落盘（`gsc-page-performance-input.csv` / `gsc-query-performance-input.csv` 仅为空表头模板）；当前浏览器会话无 Search Console 登录态可导出；无 API 凭证。→ 除上述局部真实数据外，**所有 query 级 clicks/impressions/CTR/position 均不可得**，机会判断只能基于局部真实数据 + 显式标注 `UNCONFIRMED`。
- **GA4 最新 28 天（2026-10-06 之后）**：无导出；且 GA4 自由探索"落地页"维度在自动化下无法稳定导出（round2 §13 已记录工具限制）。
- **Google AI Overview 最新完整 exposure 列表**：仅有 2026-09-18 快照 + 用户确认的 `steel-structure-foundation-design-guide`（AI 引用展示最多）。无 90 天完整数据。
- **ChatGPT referral 明细**：GA4 AI Assistant 仅 31 sessions 聚合，落地页不可导出。
- **Backlinks / 外链数据**：无 Ahrefs/Search Console 外链导出。

---

## 3. GSC 90-day Overview（真实可得部分）

| 指标 | 值 | 说明 |
|---|---|---|
| 全站 clicks（3 个月） | **52** | 基数极小，日均约 0.6–1.2 |
| 全站 impressions（3 个月） | **4,340** | |
| CTR | **1.2%** | 低于常见 2–3% 健康线，与平均位次 19.8 一致 |
| Avg position | **19.8** | 整体在第二页 |
| Google 6 周落地页点击 | **55**（4,701 曝光） | Blog 16(29.1%) + Home 14(25.5%)；真正高商业意图页合计约 31% |
| 有效线索 | 3 个月 0–1 条真实海外 | D1 23 条中 22 条测试 |

**解读（基于真实数据）**：网站处于**冷启动第二页阶段**——曝光有基础（4,340），点击极少（52），且点击高度分散（55 次散落约 39 页，每页 1–2 次）。漏斗顶端缺水是主因（round2 已确证），不是页面 CRO 或表单问题。

---

## 4. Top Query Opportunities

**真实数据可确认的 query 级机会（唯一有硬数据的一组）— Cost Cluster（已优化、观察期）**：

| Query / URL | Impressions | Pos | Clicks | 机会类型 | 建议动作 | Priority |
|---|---|---|---|---|---|---|
| /zh/blog/steel-workshop-cost-factory-building-price（legacy） | 208 | 6.0 | 0 | A（4–10 → Top3） | 已 301 → /zh/blog/gangjiegou-changfang-zaojia-zhinan/；观察权威页承接 | P1 |
| /zh/blog/gangjiegou-cangku-zaojia-duoshaoqian（legacy） | 117 | 6.1 | 0 | A | 已 301 → /zh/blog/steel-warehouse-cost-guide/；观察 | P1 |
| /zh/blog/steel-structure-cost-per-square-meter（legacy） | 110 | 6.1 | 1 | A | 已正确 301 → 造价权威页；观察 | P1 |
| /zh/blog/gangjiegou-vs-hunningtu-chengben-duibi（legacy） | 71 | 7.0 | 0 | A（对比意图） | 已 301 → 权威页（新增 concrete 对比章节）；观察 | P1 |

- 这 4 条同属 **排名 4–10（A 类）**：首页第 1 页、有 506 曝光、但点击 ≈0 → **典型高曝光低 CTR**，此前已按 Cost Cluster 冻结处理（Title/H1/正文冻结至 2026-11-03，观察点 10-20 / 11-03）。本轮不动作。
- **其余全部 query 级数据 UNCONFIRMED**（无 90 天导出）。不得编造。

---

## 5. Top Page Opportunities（基于真实落地页数据）

按 GSC 6 周落地页分布（55 clicks / 4,701 impressions）+ 商业意图评估：

| 页类型 | 6 周 clicks | 曝光 | 页数 | 商业价值 | 机会判断 |
|---|---|---|---|---|---|
| Blog（信息/GEO） | 16 (29.1%) | 2,623 | 15 | 中（靠内链转化） | **点击分散、无主承载页** → 内链聚合机会 |
| Home | 14 (25.5%) | 127 | 3 | 品牌/导航 | 曝光低点击占比高 → 品牌词为主 |
| Products/Components | 7 (12.7%) | 577 | 4 | 高 | 有曝光但点击低 → 内容/CTR 增强候选 |
| Projects | 4 (7.3%) | 249 | 4 | 中高 | 正常 |
| About | 3 (5.5%) | 206 | 2 | 中 | 品牌核验 |
| Solutions/Application | 3 (5.5%) | 300 | 3 | 高 | 曝光有、点击低 → CRO/内链 |
| Contact | 2 (3.6%) | 115 | 2 | 最高 | 点击到但 0 form_start → 已做 CRO（frozen） |
| Other（旧 URL） | 5 (9.1%) | 423 | 5 | — | 已由 404/redirect 治理覆盖 |

**Top SEO Opportunity Pages（数据排序，非主观）**：
1. **/en/blog/* 信息页群（15 页分散点击）** → 内链聚合到能力页（最高确定性，基于 29.1% 点击占比）
2. **/en/products/ + /en/components/（577 曝光、7 clicks、CTR 1.2%）** → 组件/产品页 CTR 增强候选（但 components 非冻结）
3. **/en/solutions/（300 曝光、3 clicks）** → 已重构上线（frozen），仅内链观察
4. **/en/resources/**（GEO 最低分 7.1）→ 资源中心增强候选（非冻结页）

---

## 6. AI / GEO Exposure Overview（真实数据）

**唯一硬数据（GSC Generative AI Exposure 快照 2026-09-18，均已恢复）**：

| Legacy URL | AI impressions | 已恢复目标 |
|---|---|---|
| /en/blog/steel-structure-supplier-uae-dubai-guide（+/、.html、ZH 变体） | 4 | /en/markets/uae/ |
| /en/blog/steel-structure-supplier-thailand-guide | 3 | /en/markets/thailand/ |
| /en/blog/prefab-steel-building-roof-systems-comparison | 2 | /en/components/roof-wall-cladding-systems/ |
| /en/blog/steel-structure-supplier-saudi-arabia-guide | 1 | /en/markets/saudi-arabia/ |
| /blog/how-to-import-steel-structure-from-china-to-africa | 1 | /en/blog/…africa/ |
| /en/blog/steel-structure-export-packaging-container-loading-guide | 1 | /en/blog/how-steel-structures-packed-loaded-export/ |
| /en/blog/steel-structure-project-timeline-guide | 1 | /en/blog/steel-structure-project-timeline-drawing-to-delivery/ |
| /en/steel-building-solutions/agriculture.html | 1 | /en/agricultural-steel-buildings/ |
| /products | 1 | /en/products/ |

**其他确认事实**：
- 用户已确认 **`steel-structure-foundation-design-guide` 是 AI 引用展示最多的页面**（round2 §7）。
- GA4 **AI Assistant 渠道：31 sessions（5.24%）/ 27 engaged / 互动率 87.1% / 182 events** → 互动质量高但 0 转化；AI 流量主要落到被引用的技术指南页。

**AI exposure 总量解读**：AI 展示次数绝对值很低（单 URL 1–4 次），说明站点仍处于 AI 引用早期。但**主题信号明确**：被 AI 展示的内容类型 = Country/Market Supplier Guide、Comparison、Packing/Container、Timeline、Import Guide、Foundation Guide。

---

## 7. AI Content-Type Analysis（基于真实 AI 数据，非理论）

| 类型 | 有真实 AI 展示的页面/主题 | 数量 | 判断 |
|---|---|---|---|
| Market/Country Guide | UAE(4)、Thailand(3)、Saudi(1)、Africa import(1) | 4 URL | **AI 明确偏好市场/国家供应指南** |
| Comparison | Roof systems(2)；concrete 对比（cost cluster 有 71 imp 曝光） | 1–2 URL | 偏好中等 |
| How-to / Guide | Foundation（用户确认最多）、Timeline(1)、Packaging/Loading(1) | 3 URL | **Guide 是 AI 引用主力** |
| Solution/Product 入口 | /products(1)、agriculture(1) | 2 URL | 弱 |

**结论（仅依据真实数据）**：AI 最偏好的格式 = **Guide（How-to/What-is）与 Market/Country 指南**，其次为 Comparison。普通 Blog 与 Guide 在 AI 展示上的差异无法用现有数据量化（无完整 exposure 列表）——此项保持 `UNCONFIRMED` 但方向由真实命中样本支持。

---

## 8. ChatGPT / AI Referral Analysis

| 指标 | 值 | 备注 |
|---|---|---|
| GA4 AI Assistant sessions | 31（5.24% 全渠道） | 28 天窗口 |
| Engaged sessions | 27（87.1%） | 互动率高 |
| Events | 182 | |
| Landing pages | **DATA NOT AVAILABLE** | GA4 维度导出失败（round2 §13） |
| Contact visits / WhatsApp clicks / generate_lead from AI | **DATA NOT AVAILABLE**（聚合无法归因） | 全渠道 generate_lead 28 天仅 4 次且全为测试 |

**结论**：AI 流量存在、互动质量高（87.1% engaged），但**当前无法归因任何 AI→询盘路径**；且 0 转化与其绝对值小一致。不能把"AI 流量"等同于"AI 商业价值"——需先让 AI 命中页具备商业内链（§9 路径）。

---

## 9. AI → Commercial Conversion Paths（CONTENT → CAPABILITY → CONTACT）

基于真实 AI 命中主题 + 现有页面，给出**建议路径**（本轮不执行）：

| AI 命中主题 | 内容页 | → 能力页 | → 转化 |
|---|---|---|---|
| Foundation Design | /en/blog/steel-structure-foundation-design-guide/ | /en/engineering-design/ | /en/contact/#quote-form |
| Container Loading / Packing | /en/blog/how-steel-structures-packed-loaded-export/ | /en/export-delivery/ | /en/contact/#quote-form |
| Market Supplier（UAE/Thailand/Saudi） | /en/markets/uae/ 等 | /en/manufacturing-quality/ | /en/contact/#quote-form |
| Import from China | /en/blog/how-to-import-steel-structure-from-china-complete-guide/ | /en/export-delivery/ | /en/contact/#quote-form |
| Cost / Comparison | /zh/blog/gangjiegou-changfang-zaojia-zhinan/ | /zh/solutions/ | /zh/contact/#quote-form |
| Supplier Selection | /en/blog/how-to-choose-steel-structure-supplier/ | /en/manufacturing-quality/ + /en/about/ | /en/contact/#quote-form |

**审计结论**：当前 AI 命中页**已有部分正确内链**（INTERNAL_LINK_MAP 显示 import guide→export-delivery、supplier guide→about/manufacturing 均已存在）；但 **foundation guide / container loading guide 的内链完整性未在最新代码中复核**（列为 30 天内核验项）。

---

## 10. SEO + GEO Overlap Opportunities（HIGH-CONFIDENCE GROWTH PAGES）

同时满足「GSC impressions 高 + pos 4–20 + AI exposure + 商业相关」——基于真实数据交叉：

| 页面/主题 | GSC 信号 | AI 信号 | 商业价值 | 结论 |
|---|---|---|---|---|
| **ZH Cost Cluster 权威页**（gangjiegou-changfang-zaojia-zhinan 等） | 506 impressions（4 legacy，pos 6–7） | 未直接命中 AI 快照，但成本主题 + 结构化表格 = 高 GEO 潜力 | 最高 | **HIGH-CONFIDENCE**（已优化、观察期） |
| **Foundation Design Guide** | 6 周落地页点击列表含技术指南 | 用户确认 AI 引用最多 | 中高（→Engineering） | **HIGH-CONFIDENCE** |
| **Container Loading / Packed-Export Guide** | — | AI 快照 1 次（legacy packaging URL） | 高（→Export） | **HIGH-CONFIDENCE（候选）** |
| **Market pages（UAE）** | 旧 guide 4 次 AI 展示 | AI 快照命中 | 高 | **HIGH-CONFIDENCE**（已上线 UAE 页） |

其余页面因无 GSC query 级数据无法交叉验证 → `UNCONFIRMED`。

---

## 11. Cannibalization Findings（真实审计资产）

来源：`tools/seo-audit/CONTENT_CANNIBALIZATION.csv`（迁移期审计）+ 当前 sitemap 复核：

| 主 Query | 竞争 URL 数 | 冲突级 | 当前主页面 | 建议 |
|---|---|---|---|---|
| fabricated steel beams columns | 4（beams-columns / cladding / trusses / purlins） | HIGH | /en/components/fabricated-steel-beams-columns/ | REVIEW：4 个组件页 sharing 同一 primary_keyword；优先各页差异化锚词 |
| steel structure warehouse manufacturer china | 4（warehouse / mining-factory / detailing / warehouse-cost-guide） | HIGH | /en/steel-warehouse/ | REVIEW：warehouse vs warehouse-cost-guide 意图不同（产品 vs 成本），可接受；mining-factory/detailing 锚词需差异化 |
| steel structure project case study | 21 个项目页 | HIGH | /en/projects/ | 结构性共存（hub+detail 模式正常），非问题；hub 应承担"case study"聚合意图 |
| how to import steel structure from china | 2（complete-guide / africa） | MEDIUM | complete-guide | 已有 africa→complete 反向内链（INTERNAL_LINK_MAP），处理得当，KEEP |

**新增观察（本轮）**：EN `steel-structure-vs-concrete-comparison`（当前 sitemap 存在）与 ZH cost 权威页的 concrete 对比章节**跨语言重叠**——但分语言定位，属低风险；列入 P2 观察，不做 301。

---

## 12. Content Decay Findings

**DATA NOT AVAILABLE**：仓库内无两期可比对的 GSC query/page 绩效数据（唯一 pair 是 2026-09 与 2026-10-07 的 **404** 基线，非绩效）。因此**无法区分任何页面是季节波动 / SERP 变化 / 蚕食 / 内容老化 / 技术问题**。

**可执行的动作**：Cost Cluster 是唯一有明确观察窗口的簇（观察点 2026-10-20 / 2026-11-03，`docs/SEO_SPRINT_BASELINE_2026-10.md` §5）。建议把该观察窗口扩展到全站（首次导出完整 GSC 90 天 CSV，建立第 1 个可对比绩效基线）。**在获得第一期数据前，不基于"感觉"重写任何页面。**

---

## 13. Internal Link Opportunities

基于 INTERNAL_LINK_MAP（现有）+ GEO 评分（`geo-page-score.csv` 中 internal_links 维度）+ AI 命中页：

| 源页 | 目标页 | 建议 | 依据 | 优先级 |
|---|---|---|---|---|
| /en/blog/steel-structure-foundation-design-guide/（AI 最多） | /en/engineering-design/ + /en/contact/#quote-form | 复核/补齐 | AI 命中 + GEO 转化路径 | P1 |
| /en/blog/how-steel-structures-packed-loaded-export/ | /en/export-delivery/ + /en/components/steel-purlins/（如相关） | 复核/补齐 | AI 快照命中 packaging/loading | P1 |
| /en/blog/how-to-choose-steel-structure-supplier/（GEO 7.4、内链 5 分） | /en/manufacturing-quality/ + /en/steel-workshop/ + /en/steel-warehouse/ | 增强内链 | GEO 审计明确内链最弱页 | P2 |
| /en/components/（GEO 7.4、buyer_questions 5 分） | 4 个组件详情页 + contact | 增强 | GEO 最低组之一 | P2 |
| /en/resources/（GEO 7.1 最低） | 各技术指南 + capabilities | 增强 | GEO 最低分 | P2 |

**规则**：不做全站机械链接；仅按上述真实信号逐条验证。

---

## 14. Entity / GEO Audit

基于 `V2-SEO-GEO-02-FINAL-REPORT.md`（2026-09-09 全站实体审计）+ 后续重构：

| 检查项 | 结果 |
|---|---|
| Organization Schema URL / @id | 正确（trailing slash 一致） |
| 全站实体描述冲突 | 0 |
| Hreflang 互指 | 0 错误 |
| 品牌表述 | Footer 法律全称「深圳市中赛钢结构进出口有限公司」已上线（f415fb1） |
| 制造基地表述 | 「东莞和惠州制造基地」口径统一；禁 own/wholly-owned factory 红线已落实 |
| 待定实体问题（历史遗留，非本轮） | 公司主体定位（manufacturer vs export supplier）、证书持有主体表述——**保持现状，不修改** |
| CIDB / 认证表述 | CIDB 模块已按 Malaysia-specific 上线，不夸大范围 |

**结论**：实体表达稳定一致，本轮不需要任何修改。唯一可做（但不做）：等待公司主体定位决策后统一 Organization 描述。

---

## 15. First-party Evidence Gaps（针对高机会页面）

| 高机会页面 | 已有证据 | 缺失（SEO/GEO/CRO 价值） | 优先级 |
|---|---|---|---|
| Foundation Design Guide | 通用概念图 | 真实基础节点图 / shop drawing 样例（→Engineering 证据复用） | P1 |
| Container Loading Guide | 通用图 | **真实装柜照片 / packing list 截图**（Export 页已有一批） | P1 |
| Cost 权威页 | 7 项第一方数字 + 表格 | 已充足（frozen） | — |
| Engineering Design | 设计部真实照片（design-office 已上线） | BIM/Tekla 在线预览（预留插槽，无批准数据前不显示） | P2 |
| Supplier Selection Guide | 文字 | 工厂/QC 真实照片引用 | P2 |
| Market 页（UAE 等） | 市场概述 | 真实项目/出口证据（当前无 UAE 项目证据） | P2 |

**原则**：真实证据优先级高于继续写营销文案；禁止 AI 图冒充第一方证据（既有红线，维持）。

---

## 16. Top 10 Growth Opportunities（/30 评分）

评分维度：Search Opportunity /5 · GEO Opportunity /5 · Commercial Intent /5 · First-party Evidence /5 · Existing Authority /5 · Cannibalization Safety /5 = /30。Difficulty: Low/Med/High。

| # | 机会 | 页/主题 | Search | GEO | Comm | Evid | Auth | Cann | **/30** | Diff | 决策 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Cost Cluster 观察+保护 | ZH 造价权威页（frozen） | 5 | 4 | 5 | 5 | 4 | 4 | **27** | Low | OBSERVE（10-20/11-03 复测），仅事实错误才改 |
| 2 | Foundation Guide 内链+证据补齐 | /en/blog/steel-structure-foundation-design-guide/ | 4 | 5 | 4 | 3 | 4 | 5 | **25** | Low | UPDATE（内链+证据） |
| 3 | Packing/Container Guide 商业路径 | /en/blog/how-steel-structures-packed-loaded-export/ | 4 | 4 | 5 | 4 | 3 | 5 | **25** | Low | UPDATE（内链+真实装柜图） |
| 4 | UAE/市场页 AI 承接验证 | /en/markets/uae/ | 3 | 5 | 4 | 2 | 4 | 4 | **22** | Med | INTERNAL LINK + 证据观察 |
| 5 | Supplier Selection 内链增强 | /en/blog/how-to-choose-steel-structure-supplier/ | 4 | 4 | 4 | 3 | 3 | 5 | **23** | Low | UPDATE（内链） |
| 6 | Resources Hub GEO 增强 | /en/resources/ | 3 | 3 | 2 | 4 | 3 | 5 | **20** | Low | UPDATE（Direct Answer+导航） |
| 7 | Components Hub 强化 | /en/components/ | 4 | 3 | 3 | 3 | 3 | 4 | **20** | Med | UPDATE（buyer questions） |
| 8 | Steel vs Concrete 对比承接 | /en/blog/steel-structure-vs-concrete-comparison/ + ZH 权威页对比节 | 4 | 4 | 4 | 3 | 3 | 4 | **22** | Med | UPDATE/MERGE（跨语言互链） |
| 9 | 每日文章 QA 门禁（URL 卫生） | 每日文章任务 | 4 | 3 | 3 | 4 | 3 | 5 | **22** | Med | PROCESS（.md/ 旧快照核查） |
| 10 | GSC 全站 90 天基线导出 | 数据基建 | 5 | 4 | 5 | 3 | 3 | 5 | **25** | Med | DATA（首次导出，解锁一切后续） |

> 排序严格按 Impact × Commercial × Evidence ÷ Difficulty。**注意 #10（数据基建）评分很高**——因为没有 90 天 query 数据，几乎所有机会都停在 `UNCONFIRMED`；导出 GSC 90 天 CSV 是解锁后续一切的前提，建议 30 天第 1 优先级。

---

## 17. Pages to HOLD / Freeze

**冻结页（近期完成，无技术/事实/排名问题不得大规模重构）**：
- Engineering Design ZH/EN
- Manufacturing & Quality ZH/EN
- Export Delivery ZH/EN
- Contact / Inquiry CRO ZH/EN
- Steel Truss UX ZH/EN
- Solutions Hub ZH/EN
- Drawing Chain、Malaysia CIDB、Footer 法律全称、About 重排、LCP 图片优化、GSC 404 P1 恢复

**Cost Cluster 冻结**：ZH 造价权威页 + EN cost 页——Title/H1/正文冻结至 2026-11-03 观察期结束；仅技术/事实错误可改。

**禁止新建页面清单（历史 P1/P2 候选，本轮明确 HOLD）**：agricultural/commercial/transportation 新 URL、country 页（malaysia/indonesia/nigeria/saudi/vietnam）、steel-agricultural-buildings 等——除非未来 GSC 显示独立搜索需求 + 现页无法承载，否则维持 HOLD（现已被 Solutions Hub + special-custom-steel-structures 承载大部分意图）。

---

## 18. 30-Day Plan（P0+P1，最多 5 项）

1. **【P0/数据】首次导出 GSC 90 天完整 CSV（query + page + country + AI exposure）**，落地 `tools/seo-migration/` 真实数据文件，建立可比对绩效基线。来源：Search Console 网页导出（需用户登录态）或用户提供导出。
2. **【P0/技术核查】核查旧 `.md/` URL（/en/blog/en/*.md/ 等）在 GSC 的请求状态**，如仍在被请求则评估精确 301（不批量）。
3. **【P1】Foundation Design Guide 内链 + 证据补齐**（→engineering-design、contact；复用真实图纸/节点证据）。
4. **【P1】Packed/Loaded-Export Guide 商业路径补齐**（→export-delivery、contact；真实装柜照片）。
5. **【P1】GA4 数据净化落地**：内部流量过滤 + 数据中心过滤（round2 已批准方向），让后续渠道数据可信；同时完成 `generate_lead` Key Event 标记（纯后台，零代码）。

## 19. 60-Day Plan（P2）

1. **第二轮页面增强**：Supplier Selection 内链、Resources Hub Direct Answer、Components Hub buyer questions。
2. **证据补齐**：为 AI 命中类内容（Guide/Comparison/Market）补齐第一方证据（图纸/装柜/QC）。
3. **内链体系完善**：按 §13 清单逐条验证落地，输出新版 INTERNAL_LINK_MAP。
4. **Cost Cluster 复测#1**（2026-10-20）：clicks/impressions/CTR/position 对比基线，记录成败并决定是否放开冻结。

## 20. 90-Day Plan（P3）

1. **Cost Cluster 复测#2**（2026-11-03）→ 决定解冻 / 进一步优化。
2. **AI exposure 复测**：对比 90 天前后 AI 展示页清单，验证 Guide/Comparison/Market 方向，识别被 AI 理解的新页面。
3. **排名复查**：基于 90 天基线识别 pos 4–20 页面 → 第二轮 Top 机会。
4. **内容衰退复查**：基于 90 天 vs 30 天数据识别衰退页，区分 seasonality / SERP / 蚕食后处置。
5. **真实线索归因**：GA4 净化后评估 organic / AI / referral 各自到 generate_lead 的路径；若 AI 流量有商业转化迹象，再决定是否扩产对应内容类型。

---

## PRIORITY RULE 落实

- **P0**：GSC 90 天数据导出（数据基建）、旧 `.md/` URL 技术核查、GA4 净化 + Key Event（真实性/可读性风险）。
- **P1**：Foundation Guide、Packed/Loaded Guide 商业路径（高确定性，基于真实 AI 命中）；Cost Cluster 观察（已有数据）。
- **P2**：第二波页面增强、证据补齐、内链体系（中期）。
- **P3**：90 天复测、内容衰退、AI 归因（长期建设）。

---

## FINAL STATUS

**ZHONGSAI SEO + GEO GROWTH AUDIT = COMPLETE**

- 本轮 AUDIT ONLY：未改代码、未改页面、未改 Title、未新建页面、未部署任何环境、未发布文章。
- 所有不可得数据源已如实标注 **DATA NOT AVAILABLE**，未编造任何 clicks/impressions/position。
- 唯一可确认的高确定性增长方向：Cost Cluster 观察（已有 506 曝光数据）、Foundation/Packing Guide 商业路径补齐、GSC 90 天数据导出。
- 待用户决策/操作项：① 提供或授权导出 GSC 90 天 CSV；② GA4 后台完成 generate_lead Key Event 标记 + 内部流量过滤（纯后台）；③ 是否开始 30 天计划中的 2 项页面增强（Foundation / Packed-Loaded Guide）。
