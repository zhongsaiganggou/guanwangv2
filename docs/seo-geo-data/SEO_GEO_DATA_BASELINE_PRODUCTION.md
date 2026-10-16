# ZhongSai SEO + GEO Data Baseline — Production（2026-10-12）

**性质**: DATA ONLY — 未改代码 / 未改页面 / 未改 Title / 未改内容 / 未部署任何环境。
**文件用途**: 后续 SEO + GEO 精确优化的真实数据基准。本文件为**权威基线快照**，后续对比以本文件为起点。

---

## 1. Production 基线（实测）

| 项 | 值 | 证据 |
|---|---|---|
| origin/main HEAD | `92946be4e29012101aea704b3d6d92f6ee78d6fb`（本地=远端） | `git fetch origin` + `git rev-parse origin/main`（2026-10-12 实测） |
| 最近提交 | 92946be Solutions Hub sync；7be145e Solutions Hub；后续为每日文章任务 commit | `git log origin/main -8` |
| Build | **PASS — 216 pages / 215 routes** | `npm run build`（2026-10-12 实测，BUILD_EXIT=0） |
| Sitemap loc | **188** | `dist/sitemap.xml` 实测 `<loc>` 计数 = 188 |
| seo:check | **PASS** | `npm run seo:check`（SEO_EXIT=0） |
| — sitemap-hreflang | 188 loc / single-language 9 / paired en-zh 140 / **dangling alternates = 0** | check_sitemap_hreflang.mjs |
| — redirect shadows | 规则 71（static 50 + dynamic 21）/ **SHADOWED_WRONG_TARGET = 0** / benign SHADOWED_SAME_TARGET 2（/countries/index.html、/countries/en/index.html）/ ACKNOWLEDGED_SHADOW 1（/zh/steel-building-solutions/blog/index.html） | check_redirect_shadows.mjs |

**每日文章任务**：`docs/CLOUD_AUTO_PUBLISH_TASK.md` 描述的云电脑任务持续 push 双语博客（当前 `src/content/blog` = EN 42 篇 + ZH 41 篇，均已入 sitemap）。自 92946be 之后无新 commit（本轮 fetch 确认）。→ 后续任何新文章 commit 会使 pages/routes/sitemap 增加，属于已知来源。

---

## 2. 可用数据资产清单（截至 2026-10-12）

| 数据 | 窗口 | 状态 | 位置 |
|---|---|---|---|
| GSC 全站汇总（clicks 52 / imp 4,340 / CTR 1.2% / pos 19.8） | trailing 3 个月（截至 10-06 观察） | ✅ 真实 | `docs/SEO_SPRINT_BASELINE_2026-10.md` |
| GSC 落地页分布（55 clicks / 4,701 imp，10 类） | 6 周（截至 10-06） | ✅ 真实 | `docs/AUDIT_LEAD_DROP_2026-10-round2.md` §6 |
| GSC cost cluster（4 legacy URL，506 imp / pos 6–7 / 1 click） | 3 个月（截至 10-06） | ✅ 真实 | `docs/SEO_SPRINT_BASELINE_2026-10.md` §2 |
| GSC Generative AI Exposure 快照（9 条 legacy URL，1–4 次） | 2026-09-18 | ✅ 历史事实（**非当前状态**） | `seo-redirects/AI_EXPOSURE_RECOVERY.csv` |
| GA4 事件全量（13 事件 / 4,216 次 / 381 用户） | **28 天 2026-09-08 – 10-05**（非最新窗口） | ✅ 真实 | `docs/AUDIT_LEAD_DROP_2026-10-round2.md` §3 |
| GA4 渠道（Direct 468 / Organic 80 / AI 31 / Social 7 / Referral 2 / Unassigned 4，总 592 sessions） | 同 28 天窗口 | ✅ 真实 | round2 §8 + 汇总 |
| D1 生产库（23 条；真实海外 1 条 rowid 24；22 条测试） | 2026-09-05 建库起 | ✅ 真实 | round2 §9/§11 |
| GSC 404 基线（266；P0=0/P1=7 已恢复/P2=42/P3=217） | 2026-10-07 | ✅ 真实 | `docs/gsc-history/404-baseline-2026-10-07.md` |
| GEO 页面评分（12 页 avg 7.7） | 2026-09-09 | ✅ 真实（规划资产） | `tools/seo-audit/geo-page-score.csv` |
| 关键词 / 蚕食 / 内链资产 | 迁移期 | ✅ 规划资产 | `tools/seo-audit/*.csv` |

## 3. DATA NOT AVAILABLE（诚实声明，未编造）

| 所需数据 | 状态 | 原因 |
|---|---|---|
| GSC 90 天 Queries / Pages / Countries / Devices / Search Appearance 完整导出 | ❌ 不可得 | 无 Search Console 登录态可导出、无 API 凭证、本地无导出文件（input csv 为空模板）。**需人工导出（见 `GSC_MANUAL_EXPORT_STEPS.md`）** |
| GSC 28 天 vs Previous 28 天对比 | ❌ 不可得 | 同上；已有数据为 10-06 单点观察 |
| Google Generative AI Exposure 最新 Top 20 | ❌ 不可得 | 无最新导出；旧 9-18 快照不作为当前事实；用户截图线索登记于 `docs/gsc-history/2026-10-12-ai-exposure.csv`（UNVERIFIED） |
| GA4 最新 28 天（10-06 之后） | ❌ 不可得 | 无新导出；且 GA4 自由探索"落地页"维度在自动化下无法稳定导出（round2 §13 工具限制） |
| ChatGPT / AI referral 落地页明细 | ❌ 不可得 | 同上工具限制；GSC 不含 AI referral |
| WhatsApp 事件参数明细（link_url / page_path / session source 等） | ❌ 不可得 | 现有导出未含事件参数维度；GA4 界面导出受限 |
| 2026-09-24 ChatGPT → Website → WA 链路 | ❌ 无法定位 | 仓库无该日记录；无 AI referral 落地页数据可归因 |

---

## 4. 结论

1. 站点当前处于**数据基础期**：唯一可比的真实绩效数据是 10-06 单点观察（GSC 3 个月 52 clicks / 4,340 imp / pos 19.8）+ GA4 09-08–10-05 窗口 + D1 全量。
2. **任何"增长/下降/CTR 变化/排名变化"的结论在获得 GSC 90 天导出前一律 UNCONFIRMED**；不得用季节波动误判内容衰退。
3. 本轮之后若有人工导出落地（按 `GSC_MANUAL_EXPORT_STEPS.md`），应立即将文件放入 `docs/gsc-history/` 并按任务命名（2026-10-12-90d-queries.csv 等），然后才可执行 Query×Page join 与最终机会排序。

---

**SEO_GEO_DATA_BASELINE_PRODUCTION = RECORDED（2026-10-12）**
