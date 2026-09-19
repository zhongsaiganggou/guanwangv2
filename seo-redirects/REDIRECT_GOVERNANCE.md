# ZhongSai Redirect Governance

## Redirect Architecture

| Layer | Tool | Purpose | Limit |
|-------|------|---------|-------|
| Layer 1 | Cloudflare Bulk Redirects | Static exact historical SEO 301s | 100k+ (per plan) |
| Layer 2 | Pages `_redirects` | Dynamic wildcard / placeholder rules | ~100 rules observed |
| Layer 3 | Pages Functions (`_middleware.js`) | 410 Gone for removed content | N/A |

## Rules

### New 301 Decision Flow
1. **Is it a dynamic pattern?** (contains `*`, `:slug`, `:splat`) → Add to `_redirects`
2. **Is it a static exact URL?** → Add to Bulk Redirects CSV, not `_redirects`
3. **Is it scanner noise?** (wp-admin, .env, random paths) → Keep 404, do NOT redirect
4. **Is it content restoration candidate?** → Keep 404 until content is rebuilt

### Required Fields for Each New 301
- Old URL (full path)
- Final URL (must return 200 + self-canonical)
- Reason (GSC evidence / historical backlink)
- Search Intent Match (Exact / Strong / Partial)
- Date Added
- Redirect Type (Static Exact → Bulk, Dynamic → _redirects)

### Content Restoration Candidates (DO NOT 301 to Hub)
- Saudi Arabia supplier guide (20 imp, pos 6.7)
- Steel Structure vs Concrete (42 imp)
- Roof Systems Comparison (11 imp, pos 8.8)
- ASTM vs GB Steel Grades
- Q355B vs Q235B (14 imp, pos 18)
- Foundation Design Guide (24 imp, pos 15.5)

### B-Group (Target Content Gap, do NOT 301 yet)
- Top 10 Manufacturers → Supplier Guide
- Installation Cost → Installation Guidance
- Drawings Required → Engineering

### Frozen Pages (do not modify until ~Oct 12)
- /zh/about/
- /en/contact/
- /zh/steel-workshop/
- /zh/blog/steel-structure-wind-load-design-guide
- /zh/components/steel-purlins/

## Rollback
- Bulk Redirects: Disable rule in Cloudflare Dashboard (account root ruleset `ac861d322f834dd2aa78e717bc24f54d`)
- Pages `_redirects`: Git revert, redeploy
- Middleware 410: Edit GONE_URLS set, redeploy

## Bulk Redirect Pilot Status (2026-09-14)

### List
- Name: `zhongsairedirects`
- List ID: `e736546b878f46ffbf7e751eb652b78a`
- Items: 8 pilot redirects

### Rule
- Account root ruleset ID: `ac861d322f834dd2aa78e717bc24f54d`
- Phase: `http_request_redirect` (account level, NOT zone-level `http_request_dynamic_redirect`)
- Rule ID: `12e0fc52f492479d8171c58c9a1139d7`
- Expression: `(http.request.full_uri in $zhongsairedirects)`
- Action: `redirect` with `from_list` keyed on `http.request.full_uri`
- Status: Enabled

### Pilot 8 Redirects
1. `/en/projects.html` → `/en/projects/`
2. `/en/steel-warehouse-logistics.html` → `/en/steel-warehouse/`
3. `/en/products/materials/cz-purlin.html` → `/en/components/steel-purlins/`
4. `/en/blog/steel-structure-supplier-thailand-guide/` → `/en/markets/thailand/`
5. `/en/blog/steel-structure-corrosion-protection-guide/` → `/en/blog/steel-structure-corrosion-protection-coating-guide/`
6. `/en/blog/steel-structure-supplier-malaysia-guide/` → `/en/markets/malaysia/`
7. `/en/products/materials/sandwich-panel.html` → `/en/components/roof-wall-cladding-systems/`
8. `/zh/products/materials/cz-purlin` → `/zh/components/steel-purlins/`

### Important Notes
- Bulk Redirect Rule created at **account level**, phase `http_request_redirect`, kind `root`
- Earlier failure was due to using wrong phase (`http_request_dynamic_redirect` at zone level)
- **Pages `_redirects` fallback for all 8 pilot URLs has been REMOVED (2026-09-14)**
- Failover verified: after removing `/en/projects.html` from Pages `_redirects`, it still returned 301 → `/en/projects/` → 200, proving Bulk Redirect Rule is taking over production traffic
- All 8 URLs verified 301 → correct final URL after complete fallback removal
- Free plan supports: 15 Bulk Redirect Rules, 5 lists, 10,000 URL redirects across lists
- Cloudflare Trace is not available on Free plan to confirm rule hit; HTTP 301 verified correct

### Architecture (confirmed 2026-09-14)
- **Static exact legacy SEO 301** → Cloudflare Bulk Redirects (`zhongsairedirects` list)
- **Dynamic pattern redirects** (wildcard/placeholder) → Pages `_redirects`
- **410 Gone** → Pages Functions middleware
- **Scanner/junk URLs** → 404 (do not redirect)
- **Content Restoration Candidates** → Keep 404, do NOT redirect to generic hub

## Batch 2 Status (2026-09-14)

### Bulk List
- Name: `zhongsairedirects`
- List ID: `e736546b878f46ffbf7e751eb652b78a`
- Total items: 8 pilot + 25 batch 2 = **33 redirects**

### Batch 2 Migrated (25 rules)
All verified 301 → Final 200 after Pages fallback removal.

| # | Old URL | Final URL | Match |
|---|---------|-----------|-------|
| 1 | /products/steel-warehouse.html | /en/steel-warehouse/ | A |
| 2 | /products/steel-workshop.html | /en/steel-workshop/ | A |
| 3 | /products/steel-equipment-platform.html | /en/products/custom-engineering/ | B |
| 4 | /products/steel-school-building.html | /en/commercial-public-steel-buildings/ | B |
| 5 | /products/commercial-public.html | /en/commercial-public-steel-buildings/ | B |
| 6 | /products/steel-office-building.html | /en/commercial-public-steel-buildings/ | B |
| 7 | /products/steel-sports-arena.html | /en/commercial-public-steel-buildings/ | B |
| 8 | /products/structural-steel-components.html | /en/components/ | B |
| 9 | /products/custom-engineering.html | /en/products/custom-engineering/ | A |
| 10 | /products/materials/cz-purlin.html | /en/components/steel-purlins/ | B |
| 11 | /en/products/about.html | /en/about/ | A |
| 12 | /en/about.html | /en/about/ | A |
| 13 | /en/zh/steel-equipment-platform.html | /en/products/custom-engineering/ | B |
| 14 | /en/zh/steel-workshop-processing.html | /en/steel-workshop/ | B |
| 15 | /en/zh/products.html | /en/products/ | B |
| 16 | /en/zh/projects.html | /en/projects/ | B |
| 17 | /steel-buildings.html | /en/solutions/ | B |
| 18 | /en/steel-buildings.html | /en/solutions/ | B |
| 19 | /zh/steel-buildings.html | /zh/solutions/ | B |
| 20 | /solutions/agriculture.html | /en/agricultural-steel-buildings/ | B |
| 21 | /zh/solutions/agriculture.html | /zh/agricultural-steel-buildings/ | B |
| 22 | /solutions/mining.html | /en/steel-mining-factory/ | B |
| 23 | /services/steel-structure-export.html | /en/export-delivery/ | B |
| 24 | /services/structural-steel-detailing.html | /en/services/structural-steel-detailing/ | B |
| 25 | /projects/china-huarun-center.html | /en/projects/dongguan-huarun-center/ | A |

### Pages _redirects After Batch 2 (verified 2026-09-14)
- Static Exact 301: **57** (privacy/terms pages, blog specific redirects, project redirects)
- Dynamic Wildcard: **14** (language prefixes, blog/*.html, countries/*, etc.)
- Other (404): **1** (countries/sitemap.xml)
- Total lines: 85
- Bulk List total: **33** (8 pilot + 25 batch 2)

### Architecture Summary
- Bulk Static Exact: **33**
- Pages Static Exact: **57**
- Pages Dynamic: **14**
- Middleware 410: **6** URLs
- Content Restoration Backlog: **6** topics
- No cross-layer collisions (all 33 bulk sources removed from Pages)

### Observation Period
- Batch 2 deployed 2026-09-14
- Monitor 24-48 hours before Batch 3
- Check: no unexpected 404, no redirect loops, core pages normal, API normal

## Phase 2A — Redirect Precedence + Sitemap Hreflang (2026-09-18)

### A. Two shadowed static exact `.html` rules migrated Pages -> Bulk
Pages `_redirects` is first-match-wins. Two static exact rules sat AFTER the broad
`/en/blog/*.html -> /en/resources/` wildcard and therefore never fired; both were
being sent to the generic `/en/resources/` hub (wrong target). They were moved to the
Cloudflare Bulk Redirect List `zhongsairedirects` (edge rules take precedence),
verified at the edge BEFORE removing the dead Pages rules, then the Pages lines were
deleted.

| Old URL (source) | Final target | Verified |
|---|---|---|
| /en/blog/gangjiegou-changfang-zaojia-zhinan.html | /en/blog/steel-warehouse-cost-complete-guide/ | 301 -> 200, hops=1 |
| /en/blog/zhongguo-gangjiegou-changjia-paiming.html | /en/blog/how-to-choose-steel-structure-supplier/ | 301 -> 200, hops=1 |

- Bulk Redirect List items: **41 -> 43**
- Pages `_redirects` valid rules: **73 -> 71** (static exact 59 -> 57; dynamic 14 unchanged; 1 x 404 unchanged)
- Edge failover confirmed with the Pages rules still present first; after removal both sources still return the exact intended target (single hop).
- Import source archived at `seo-redirects/phase2a-shadow-redirects.csv` (headerless `source,target,301`).
- The shadowing wildcards (`/blog/*.html`, `/en/blog/*.html`, `/zh/blog/*.html`, `/en/blog/products/*.html`, `/zh/blog/products/*.html`) were intentionally left unchanged.

### B. Sitemap hreflang generator made existence-aware
`src/pages/sitemap.xml.ts` previously prefix-swapped EVERY fixed path (`/en/` <-> `/zh/`),
emitting a cross-language alternate even for EN-only / ZH-only pages whose counterpart
404s, 301s, or is non-equivalent. It now builds a `Set` of real fixed routes and only
emits an alternate when the counterpart path actually exists in that route inventory.
`SITEMAP_EN_ONLY` / `SITEMAP_ZH_ONLY` pages are never mechanically paired.

- Fixed single-language pages cleaned: **9** (7 EN-only, 2 ZH-only) — now self alternate only.
- Sitemap `<loc>` count: **134 (unchanged)**; paired en/zh blocks: **92**; dangling alternates: **0**.
- Bilingual fixed pages (steel-warehouse, engineering-design, steel-purlins, projects, singapore) keep en + zh-CN; x-default policy untouched (the fixed section of the sitemap carries no x-default, as before).

### C. Static guardrails added (not wired into build)
- `tools/seo-audit/check_sitemap_hreflang.mjs` — fails if any sitemap alternate href is not itself a `<loc>` (dangling hreflang).
- `tools/seo-audit/check_redirect_shadows.mjs` — parses `_redirects`, flags a static exact rule shadowed by an earlier wildcard; distinguishes SHADOWED_SAME_TARGET (benign), ACKNOWLEDGED_SHADOW (allowlisted), SHADOWED_WRONG_TARGET (fail).
- `tools/seo-audit/redirect-shadow-allowlist.txt` — currently 1 acknowledged item (L32 hub->hub, low value, deliberately not changed).
- npm scripts: `seo:check:sitemap`, `seo:check:redirects`, `seo:check`.

### Production verification (2026-09-18)
- Live sitemap re-downloaded and passed the hreflang guardrail (134 loc / 92 paired / 9 single-language / 0 dangling).
- Both migrated sources: 301 -> exact target -> 200, single hop.
- Regression: 5 other Bulk, 5 Pages static (incl. L35/L38 projects and L46 workshop-cost `.html`), 5 dynamic wildcards, 2 x 410, and 5 core pages all behave as before.

### DEFERRED (not fixed in Phase 2A)
- **KNOWN P1 DEFERRED**: EN-only markdown `/en/blog/steel-structure-vs-concrete-comparison/` still gets a mechanical zh-CN alternate in its HTML `<head>` (the markdown route does not pass `singleLanguage`). The page is under SEO freeze (~until Oct 12); do not touch until the freeze ends, then apply existence-aware hreflang to the markdown route.
- P2: 16 bilingual markdown pairs (33 files) have correct HTML-head hreflang but no sitemap alternates (no translationKey backfill done in this phase).
- P2: two installation `.astro` blog posts are not included in the sitemap.
- Acknowledged: L32 `/zh/steel-building-solutions/blog/index.html -> /zh/resources/` is a same-area hub redirect shadowed by a wildcard; low value, left as-is and allowlisted.
- Systematic: no-slash `_redirects` rules do not match trailing-slash URLs (separate cleanup, out of scope).

### Rollback
- Bulk Redirects: disable/delete the two new items in the `zhongsairedirects` list via the Cloudflare dashboard (account root ruleset `ac861d322f834dd2aa78e717bc24f54d`).
- Pages `_redirects`: git revert the two deleted lines and redeploy.
- Sitemap generator: git revert `src/pages/sitemap.xml.ts` and redeploy (the standalone guardrail scripts are safe to leave in place).


