# SEO Growth Sprint — Cost Cluster Baseline & Observation

**Baseline date:** 2026-10-06
**GSC data window:** trailing 3 months (as of 2026-10-06)
**Action type:** IMPROVE EXISTING PAGE (+ corrective 301s)
**Preview branch:** `preview-seo-cost`
**Status:** PREVIEW READY — NOT deployed to Production

---

## 1. Site-wide baseline (trailing 3 months)

| Metric | Value |
|---|---|
| Clicks | 52 |
| Impressions | 4,340 |
| CTR | 1.2% |
| Avg position | 19.8 |

## 2. Target cluster baseline (ZH cost / price / comparison)

Four legacy URLs together held **506 impressions**, ranking on Google page 1 (pos 6–7), with only **1 click**.

| Legacy URL | Impressions | Pos | Clicks | Problem before fix | Correct authority (now 301) |
|---|---|---|---|---|---|
| /zh/blog/steel-workshop-cost-factory-building-price | 208 | 6.0 | 0 | 301 → generic Resources (wrong intent) | /zh/blog/gangjiegou-changfang-zaojia-zhinan/ |
| /zh/blog/gangjiegou-cangku-zaojia-duoshaoqian | 117 | 6.1 | 0 | 301 → generic Resources (wrong intent) | /zh/blog/steel-warehouse-cost-guide/ |
| /zh/blog/steel-structure-cost-per-square-meter | 110 | 6.1 | 1 | already correct 301 | /zh/blog/gangjiegou-changfang-zaojia-zhinan/ |
| /zh/blog/gangjiegou-vs-hunningtu-chengben-duibi | 71 | 7.0 | 0 | 301 → generic Resources | /zh/blog/gangjiegou-changfang-zaojia-zhinan/ (new concrete-comparison section) |

## 3. Changes shipped to Preview

- `functions/_middleware.js`: 3 new exact 301 rules (cost cluster) ahead of the generic `/zh/blog/` pattern.
- ZH authority page `gangjiegou-changfang-zaojia-zhinan`: full rewrite — Direct Answer (GEO block), 7 first-party figures, concrete-vs-steel qualitative section + 6-row table, cost-factor decision table, 6-question FAQ, internal links, Article schema (dateModified 2026-10-06).
- EN page `steel-workshop-cost-factory-building-price`: 6 first-party figures + figure styles + dateModified 2026-10-06 (existing content/tables/FAQ retained).

## 4. Build / checks

- `npm run build`: PASS — 191 pages / 190 routes.
- `npm run seo:check`: PASS — sitemap 162 loc, dangling alternates 0, SHADOWED_WRONG_TARGET 0.
- 3 new 301 verified on Preview via curl (one hop, correct same-language target).
- Responsive QA: desktop 1440 and mobile 399 verified; no horizontal page overflow; tables reflow/wrap on mobile.

## 5. Observation window (14–28 days)

- **Freeze:** do not edit Title / H1 / body of these pages during the window except for technical or factual errors.
- **Re-measure at ~2026-10-20 and ~2026-11-03:** clicks, impressions, CTR, position for the four (now consolidated) URLs and the two authority pages.
- **Success signals:** clicks attributed to the cost-cluster authority pages move above the prior near-zero baseline; no loss of the page-1 impressions; indexed canonical remains the authority page.
- Production deployment requires explicit user confirmation.
