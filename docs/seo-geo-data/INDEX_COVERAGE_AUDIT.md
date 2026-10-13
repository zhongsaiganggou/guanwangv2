# INDEX_COVERAGE_AUDIT.md — ZhongSai (只读审计，不修改)

- Date: 2026-10-13
- Scope: READ ONLY — 未修改任何 URL / 路由 / 页面 / Production
- Purpose: Phase 4 §17 — 只读取、不修改，判断剩余 URL 是正常历史遗留还是正式页面未索引

---

## 1. 可计算数据（来自本地构建 + 源码，非 GSC 分类导出）

| 指标 | 数量 | 来源 |
|---|---|---|
| Sitemap `<loc>` | 192 | `npm run build` + `seo:check:sitemap`（2026-10-13 本机） |
| 真实静态路由（ROUTES 白名单） | 219 | `functions/_routes.js`（build 自动生成） |
| 构建页面数 | 220 | build 输出（含 sitemap.xml / robots / 404 等非索引页） |
| 静态重定向规则 | 71（static 50 + dynamic 21） | `public/_redirects`（seo:check:redirects） |
| Middleware EXACT 精确重定向 | ≈65 条 | `functions/_middleware.js` EXACT Map |
| Middleware GONE（410） | 5 条 | GONE_URLS |
| Middleware KEEP_404 | 1 条 | KEEP_404_URLS（/zh/blog/how-to-import-steel-structure-from-china-to-africa/） |

## 2. GSC 侧总量（Phase 3 记录，非本轮新导出）

| 指标 | 数值 | 说明 |
|---|---|---|
| Indexed | 267 | GSC 页面索引报告，2026-10-13 记录 |
| Not indexed | 603 | 同上 |
| 合计 | 870 | 同上 |
| 索引率 | 30.7% | 未分类，不定义为故障 |

> DATA GAP：GSC 界面无「索引状态分类明细」导出（仅总量）。下表分类为**可计算口径**，与 GSC 分类不完全等价，禁止把本表数字当作 GSC 索引状态。

## 3. 可计算分类（本地口径）

| 分类 | 估算数量 | 依据 | 判定 |
|---|---|---|---|
| Indexable candidate（sitemap 内） | 192 | sitemap 生成逻辑（固定页 + published 文章） | 正常：正式内容页全集 |
| Real static routes（含 non-indexable） | 219 | _routes.js | 差异 27 条 = /zh/404/、/admin/、/zh/faq/、privacy、terms、thank-you、markets/*、部分项目页等非 sitemap 页 |
| Redirect（301） | 71 + ≈65 | _redirects + middleware EXACT | 历史遗留 legacy URL 集中收敛到 Primary，正常治理动作 |
| Gone（410） | 5 | GONE_URLS | 永久移除且无目标页，正常 |
| Deliberate 404 | 1 | KEEP_404_URLS | 避免弱兜底，正常 |
| Legacy variants（.html / 无斜杠） | ≈20–30 条（Foundation 6、Container 4、Wind 5、Cost cluster 5+、钢混对比 4 等） | Phase 3 query×URL 数据 | 均为 301 → Primary，非独立可索引页 |
| Non-HTML / assets | — | 图片 / docs/social 文章等 | 不参与页面索引 |

## 4. 判断

- **267 / 870 不是 SEO 故障信号**：870 是 GSC 侧全站 URL 计数，包含 legacy .html 变体、无斜杠变体、410、404、非 HTML 资源与历史文章。其中：sitemap 可索引候选 192、301 收敛集合 70+、410 5 条——大多数"未索引" URL 属于**正常历史遗留（301/410/legacy）**，而非正式页面被错误排除。
- 正式页面未索引风险窗口：需要 GSC 索引报告按 URL 分类导出才能确认（本轮无该导出，DATA GAP）。
- 建议（只建议，不执行）：下一轮可对 192 sitemap URL 抽查索引覆盖（site: 查询或 GSC 页面维度导出），优先核验 AI 高曝光页（Container Loading / Foundation / Wind Load / Fabrication / Bracing）是否均为 Indexed。

## 5. 已知未索引高价值页（需下轮确认）

| Page | 风险 | 依据 |
|---|---|---|
| /en/blog/steel-structure-container-loading-guide/ | AI Top1，若未索引 = 高优先级问题 | AI 曝光 22，但 GSC 点击仅 1 |
| /zh/blog/steel-structure-wind-load-design-guide | 331 imp 全站最高曝光 | 有曝光即有索引，风险低 |
| /zh/blog/steel-workshop-cost-factory-building-price | pos 6.0 / 0 click | 有曝光即有索引，风险低 |
| Cost cluster legacy（EN warehouse-cost / prefab-factory） | 301 承接中 | 需确认 301 链 one-hop |

---
*只读审计完成。未修改任何 URL、路由、sitemap 或页面。*
