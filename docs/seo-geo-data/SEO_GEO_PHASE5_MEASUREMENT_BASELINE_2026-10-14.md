# ZhongSai SEO + GEO Growth Phase 5 — Measurement Baseline（2026-10-14）

**性质**: MEASUREMENT BASELINE — 本轮未改代码 / 未改页面 / 未改 URL / 未改 Canonical / 未改重定向 / 未改正文 / 未部署 Preview 或 Production。

---

## 1. Current Production Baseline（实测 2026-10-14）

| 项 | 值 | 证据 |
|---|---|---|
| origin/main HEAD | `484d430da4be4c1285654e832aa41384bb3d5f17`（本地 = 远端） | git fetch + rev-parse |
| 最近提交 | 484d430 fix: design office images；84a173b / 0c1e2c0 每日文章（crane-selection、ndt-testing）；c6493d4 Phase 4 | git log --decorate -10 |
| Production 部署 | wrangler `618a27a8`（10-13，722 files，含 design-office 图片） | 部署记录 |
| Build 基线（dist 实测） | **224 pages / 196 sitemap loc** | dist 计数（`_routes.js` 223 routes，未重 build） |
| seo:check | **PASS** — SHADOWED_WRONG_TARGET = 0 / ACKNOWLEDGED_SHADOW 1（已知 steel-building-solutions/blog） | npm run seo:check |
| 工作区 | 仅 `M functions/_routes.js`（1 行差异，构建生成物；本地 build 再生成所致，未改动、未提交） | git status / git diff |

注：较 Phase 4 基线（220 pages / 192 loc）增量来源 = 每日文章任务新增 crane-selection + ndt-testing 两篇（EN/ZH），属已知来源。

## 2. GA4 转化事件验收（代码审计，非后台数据）

| 事件 | 触发逻辑 | 参数 | 验收 |
|---|---|---|---|
| generate_lead | `trackLeadConversion`：仅服务端返回 `success && lead_id && lead_id !== 'filtered'` 且 `test_record !== true` 时触发；`lead_id` Set 去重，**每 lead 恰好 1 次**，页面加载不触发 | currency USD / value 0 / language / form_variant / page_path / has_drawing | ✅ 合规（真实提交成功后才触发） |
| project_form_submit | 与 generate_lead 同分支同刻触发（成功路径） | 同上 | ✅ |
| qa_form_submit | 服务端 `name` 字段含 QA_MARKER `'v2 qa test'` → `test_record=1` → 仅发 qa_form_submit，**不发** generate_lead / project_form_submit / drawing_upload / Meta Lead | lead_id / language / form_variant / page_path | ✅ 完全隔离（服务端 `project-inquiry.js:200-204,502`） |
| contact_whatsapp_click | document click 捕获监听，仅真实 `<a>` 点击；命中 wa.me / whatsapp: / api.whatsapp.com | cta_location（footer/floating/hero/contact_card/related/trust/thank_you/contact_page/other）、page_language、page_location、cta_text、destination | ✅ 真实点击触发；无页面加载误触发（旧 whatsapp_click 已移除） |
| contact_wechat_click | 同监听，命中 weixin.qq.com / weixin:// / wechat | 同上 + destination=weixin | ✅ |
| email_click / phone_click | 同监听（mailto:/tel:） | 同上 | ✅ 附带 |
| drawing_upload | 成功提交且带文件时（成功路径） | 同 generate_lead base | ✅ |

重复触发检查：单次点击只发 1 个事件（一个 click 一个分支）；lead 去重防重复；无页面加载事件。

**GA4 后台状态（无法访问后台，以下需人工完成，不得视为已完成）**：
1. **generate_lead 标记为 Key Event**：Admin → 数据流 → 事件 → generate_lead → 标记为关键事件（KEY EVENT）。未确认完成 → **UNCONFIRMED**。
2. 事件名/参数命名核对（contact_whatsapp_click 等是否已在数据流事件列表中显示）→ UNCONFIRMED。

## 3. 内部流量过滤状态

- 代码/仓库层面无过滤器实现（GA4 过滤器为后台配置）。
- 历史审计（Phase 1/2）已记录：Direct 通道存在 QA / automation / datacenter 污染（09-08~10-05 窗口 Direct 468 / 592 sessions）。
- **当前过滤器状态：UNCONFIRMED（未验证启用）**。
- 原则：**禁止按城市排除流量**；无可靠内部 IP 或其他可验证识别条件时，不得启用排除型过滤器，不得删除历史数据。
- 人工步骤：Admin → 数据流 → 内部流量过滤 → 配置内部 IP（办公网络出口 IP，需用户提供）→ 将内部流量标记为排除；数据中心/机器人流量过滤 → 开启（Google 系统列表）。配置后历史数据不回溯。

## 4. GSC 数据文件完整性（docs/gsc-history/ + docs/seo-geo-data/）

| 文件 | 存在 | 行数 | 字段 | 日期窗口 | 状态 |
|---|---|---|---|---|---|
| 2026-10-13-90d-queries.csv | ✅ | 206 | query/clicks/impressions/ctr/position | **2026-08-22 ~ 10-10（50 天，非 90 天）**，文件内无日期列 | 真实，窗口口径标记 |
| 2026-10-13-90d-pages.csv | ✅ | 385 | page/clicks/impressions/ctr/position | 同上 | 真实 |
| 2026-10-13-90d-countries.csv | ✅ | 150 | country/clicks/impressions/ctr/position | 同上 | 真实 |
| 2026-10-13-90d-devices.csv | ✅ | 3 | device/clicks/impressions/ctr/position | 同上 | **SUSPECT**：桌面行 6 字段错位（`桌面,51,4,570,1.1%,20.3`；实为 clicks=51 / impressions=570 / ctr=1.1% / pos=20.3），需人工复核导出 |
| 2026-10-13-90d-searchappearance.csv | ✅ | 1 | appearance/clicks/impressions/ctr/position | 同上 | 真实（仅「产品摘要」1 行） |
| 2026-10-13-ai-exposure.csv | ✅ | 99 | page/ai_impressions | **未记录 date range**（GSC AI 默认 28 天，导出时未记录） | 真实数据，日期缺口 |
| 2026-10-12-ai-exposure.csv | ✅ | 16 | page/ai_impressions/date_range/page_type/status/source/notes | UNVERIFIED（用户截图线索） | 线索登记，非事实 |
| SEO_GEO_MASTER_OPPORTUNITY.csv | ✅ | 10 | 18 字段 | GSC90d 2026-08-22~10-10 | 真实 |
| URL_CONSOLIDATION_REPORT.csv | ✅ | 8 | 完整 | — | 真实 |
| SEO_GEO_DATA_BASELINE_PRODUCTION.md / SEO_GEO_PHASE3_PRIORITY_MAP / INDEX_COVERAGE_AUDIT.md | ✅ | — | — | 10-12 / 10-13 | 真实 |
| GSC_MANUAL_EXPORT_STEPS.md | ✅ | — | — | — | 人工导出步骤说明 |

**缺失项（DATA NOT AVAILABLE）**：GSC 28 天 vs Previous 28 天对比导出（未导出）；最新（10-10 之后）GSC 数据；GA4 最新窗口导出；WA 事件参数明细导出；2026-09-24 明细数据。

## 5. 核心页面观察基线（生产实测 2026-10-14，BASELINE ONLY）

| 页面 | 生产 URL（canonical） | HTTP | Canonical | Indexable | Sitemap | GSC（08-22~10-10） | AI Exposure | GA4 Organic/AI | WA / Lead |
|---|---|---|---|---|---|---|---|---|---|
| Foundation EN | /en/blog/steel-structure-foundation-design-guide/ | 200 | self | ✅ | ✅ | 114 imp / 2 clk / pos 30.7 | 17（Top3） | DATA NOT AVAILABLE（无明细导出） | 无明细 |
| Foundation ZH | /zh/blog/steel-structure-foundation-design-guide/ | 200 | self | ✅ | ✅ | —（合并后待观察） | — | — | — |
| Container EN | /en/blog/steel-structure-container-loading-guide/ | 200 | self | ✅ | ✅ | 74 imp / 1 clk / pos 7.2 | **22（Top1）** | — | — |
| Container ZH（legacy） | /zh/blog/steel-structure-container-loading-guide（+斜杠） | 200（→ /zh/export-delivery/） | /zh/export-delivery/ | ✅ | — | 125 imp 分散（4 URL 合并前） | — | — | — |
| Wind Load ZH | /zh/blog/steel-structure-wind-load-design-guide/ | 200 | self | ✅ | ✅ | 331 imp / 1 clk / CTR 0.3% / pos 15.1 | 1 | Phase 2 快照：AI Assistant 31 sessions 总量（非页面级） | — |
| Cost Cluster ZH 权威页 | /zh/blog/gangjiegou-changfang-zaojia-zhinan/（无斜杠 steel-workshop-cost-factory-building-price 301 → 此处） | 200 | self（拼音 URL） | ✅ | ✅ | 208 imp / 0 clk / pos 6.0 | 0 | — | — |

要点：
- 全部 canonical self、可索引、入 sitemap、HTTP 200；ZH Container legacy 301 至 export-delivery（one-hop，Phase 4 已验证）。
- **Cost 权威页 canonical = `/zh/blog/gangjiegou-changfang-zaojia-zhinan/`**，与 MASTER 表 / GSC pages 中记录的 `steel-workshop-cost-factory-building-price` 不一致（迁移遗留）→ 数据 join 时需按 canonical URL 归一。
- 所有页面仅有单次快照 → **BASELINE ONLY**，不得推断增长/下降趋势。

## 6. ChatGPT → WhatsApp 归因能力

- 当前可追溯数据：Phase 2 GA4 快照（09-08~10-05）：AI Assistant **31 sessions / 87.1% engaged**，但**无页面级 landing / 无事件参数明细 / 无 outbound 明细**。
- contact_whatsapp_click 事件自 **2026-10-13 上线**，**2026-09-24 当天不存在该事件数据**（当时仅旧 whatsapp_click 页面加载假事件）。
- 结论：**AI Referral → Landing → WA click → lead 的全链路归因当前不可建立**（历史不可追溯）；自 10-13 起事件开始积累，需至少 2-4 周后方可做首轮归因尝试。
- 不尝试识别个人身份；不因同日访问+点击即断言同一客户。

## 7. 数据质量问题汇总

1. devices CSV 桌面行字段错位（SUSPECT）→ 人工复核导出。
2. 90d 命名文件实为 50 天窗口（08-22~10-10）→ 后续对比一律用窗口口径，不称 90d。
3. ai-exposure-1013 缺 date range 列 → 下次导出需补记。
4. Cost 权威页 canonical URL 与主表 URL 不一致 → join 需归一。
5. GA4 快照单点（09-08~10-05），无最新窗口。
6. functions/_routes.js 本地与提交 1 行差异（构建生成物，未动）。
7. Direct 通道污染（QA/automation）在无过滤器下持续存在。

## 8. 下一项唯一推荐动作（本轮不执行）

**Container Loading Guide 正文内链增强（→ /en/export-delivery/ 与 /en/manufacturing-quality/，各 1 处自然锚文本）**

- 数据依据：AI 曝光 Top1（22 imp）+ GSC 74 imp / pos 7.2（真实数据）；页面为 AI 最认可资产。
- 现状缺口（代码审计证实）：正文全文**无任何内联商业链接**（仅 related 区块 1 处 Export Delivery + LegacyArticleLayout 自动表单 CTA）；AI 摘取以正文为主，正文缺商业锚点 → GEO 摘取与商业路径弱。
- 预期影响：GEO 摘取内容出现 Export Delivery / Manufacturing 实体关联；用户阅读路径更顺 → Contact；权重微幅向能力页传递。
- 修改范围：仅正文 1-2 处内联链接；不动 Title / H1 / 正文主体 / URL / Canonical / 重定向。
- 排名风险：低（纯增链接、无内容重写）。注意 Container Guide 在冻结保护名单内 → **需用户批准后方可执行**。
- 证据缺口：post-change GSC/AI 数据需 2-4 周；正文内联 vs related 的增量影响无法预测量化。
- 否决理由对照：Foundation 内链已达标（CTA + related：engineering-design / installation）；Wind Load 刚于 10-13 上线优化、无 post-change 数据 → 待观察；Cost 冻结观察至 11-03。

## 9. 需要人工操作的事项

1. GA4 Admin：generate_lead → 标记为 Key Event（未完成）。
2. GA4 Admin：配置内部流量过滤（需提供办公网络内部 IP）+ 数据中心/机器人过滤；禁止按城市排除。
3. GSC：复核 devices 导出（桌面行错位）；下次导出补记 AI date range；如需最新数据，人工导出最新 28 天 + 前一 28 天至 docs/gsc-history/（步骤见 GSC_MANUAL_EXPORT_STEPS.md）。
4. 若批准下一项推荐：授权 Container Loading Guide 正文内链增强（冻结页例外）。

## 10. 本轮产出 / 变更

- 新建：docs/seo-geo-data/SEO_GEO_PHASE5_MEASUREMENT_BASELINE_2026-10-14.md（本文件）
- QA 辅助脚本（本地，未提交）：tools/qa/_gsc-check.py、tools/qa/_core-pages.py
- 临时文件 docs/_core-pages-out.txt 已删除
- 代码修改：**无**；生产环境：**无部署、无变更**。

---

**ZHONGSAI SEO + GEO GROWTH PHASE 5 = MEASUREMENT BASELINE COMPLETE**
（测量基线完成 ≠ SEO / GEO 已增长；后续增长判定需新窗口数据。）
