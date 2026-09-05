# ZhongSai V2 final technical audit

Audit date: 2026-09-05  
Source baseline: `7ee80f7`  
Audited preview: `https://a03aed77.zhongsai-website-v2.pages.dev`

## Automated site totals

- Generated HTML pages: 77; indexable URLs: 69; EN routes: 40; ZH routes: 35; noindex pages: 8.
- Broken internal links: 0; broken anchors: 0; dead cards: 0; EN→ZH wrong links: 0; ZH→EN wrong links: 0.
- Canonical errors: 0; hreflang errors: 0; HTML-lang errors: 0; JSON-LD parse errors: 0.
- Sitemap URLs: 69; missing indexable URLs: 0; invalid URLs: 0.
- Referenced image files: 81 unique; missing: 0; >500 KB: 19 unique (68 occurrences); >1 MB: 7 unique (20 occurrences); >2 MB: 0.

Machine evidence: `01-route-audit.csv`, `02-link-anchor-audit.csv`, `03-seo-audit.csv`, `09-image-reference-audit.csv`, `scan-summary.json`, and `sitemap-summary.json`.

## Products — seven application behaviors

| # | Application | EN target | Behavior | Target result |
|---|---|---|---|---|
| 1 | Industrial & Manufacturing | `/en/steel-workshop/` | DETAIL PAGE | PASS |
| 2 | Warehousing & Logistics | `/en/steel-warehouse/` | DETAIL PAGE | PASS |
| 3 | Agriculture & Livestock | `#quote` | QUOTE ACTION | PASS |
| 4 | Commercial & Public | `#quote` | QUOTE ACTION | PASS |
| 5 | Transportation & Infrastructure | `#quote` | QUOTE ACTION | PASS |
| 6 | Mining, Energy & Heavy Industry | `/en/steel-mining-factory/` | DETAIL PAGE | PASS |
| 7 | Special & Custom | `#quote` | QUOTE ACTION | PASS |

ZH mirrors the same behaviors with ZH detail routes. Behavior inconsistency is real (3 detail vs 4 quote) but no card is dead and no empty anchor was invented.

**IA duplication: YES, partial.** “Special & Custom Steel Structures” and “Custom Engineering & Fabrication” overlap around irregular structures and drawing-led fabrication. The page copy already distinguishes application from capability, which prevents a direct duplicate-page failure, but the naming remains close. Minimal future fix: narrow the application label/description; keep Custom Engineering as the fabrication-capability page. No IA refactor was made.

## Components — fourteen card behaviors

| Card | Behavior | Target |
|---|---|---|
| Steel Beams | ANCHOR | `fabricated-steel-beams-columns/#steel-beams` |
| Steel Columns | ANCHOR | `fabricated-steel-beams-columns/#steel-columns` |
| Box Sections | ANCHOR | `fabricated-steel-beams-columns/#box-sections` |
| Crane Beams | ANCHOR | `fabricated-steel-beams-columns/#crane-beams` |
| Steel Trusses | DETAIL PAGE | `steel-trusses/` |
| Platforms & Bracing | QUOTE ACTION | `#quote` |
| C Purlins | ANCHOR | `steel-purlins/#c-purlins` |
| Z Purlins | ANCHOR | `steel-purlins/#z-purlins` |
| Bracing System | QUOTE ACTION | `#quote` |
| Connection Components | QUOTE ACTION | `#quote` |
| Roof Panels | ANCHOR | `roof-wall-cladding-systems/#roof-panels` |
| Wall Panels | ANCHOR | `roof-wall-cladding-systems/#wall-panels` |
| Sandwich Panels | ANCHOR | `roof-wall-cladding-systems/#sandwich-panels` |
| Cladding Accessories | ANCHOR | `roof-wall-cladding-systems/#cladding-accessories` |

All 14 entire-card links resolve. The four cladding targets are unique, exist in EN and ZH, and passed the fixed-header anchor test. The cladding page IDs were corrected so Roof, Wall, Sandwich and Accessories no longer collapse onto an incorrect/shared target.

Trusses and Purlins EN/ZH pages build, are indexable, canonical, reciprocal-hreflang and included in the sitemap. Their hero files render and are not missing; visual realism of both AI-looking hero assets remains a human decision.

## SEO, schema and index control

- Paired pages have EN, zh-CN and x-default alternates with exact existing targets; five EN-only legacy blogs have only EN and x-default. Reciprocity/path validation found 0 errors.
- Organization JSON-LD appears on both language homepages; BreadcrumbList appears on 56 generated pages. All JSON-LD parsed without error.
- Preview live HTTP `X-Robots-Tag: noindex`: PASS.
- Production source global noindex: NO.
- Root static page remains a noindex meta/JavaScript redirect to `/en/`; an HTTP 301 exists only in the inactive production candidate.

## Company-fact scan

Allowed facts found in expected contexts: 15+ years export experience, 100,000 m² production base, 100,000 tonnes annual capacity, 300+ frontline workers, ISO 9001. Malaysia CIDB appears only on About with explicit Malaysia-market qualification wording; the homepage global badge was replaced by 15+ years export experience.

No hits were found for unsupported 20+ years, 60+ countries, CE/SGS/TÜV claims, free design, 24-hour promises, 30–50% claims, fixed shipping/unit prices, guaranteed delivery or guaranteed installation. Negative boundary statements about local construction/EPC are not capability claims.

## AI image and brand checks

- Nine requested AI/AI-looking assets exist and render: seven application images, Trusses hero and Purlins hero.
- Seven application cards use clear `Application Illustration` / `应用示意图` badges and concept-visualization alt text; none is encoded as a real project or factory proof.
- AI-generated fake ZhongSai logo inside those nine visuals: **0**.
- Active site chrome originally referenced an old yellow/red logo in Header and an explicitly named AI-replica logo in Footer. Both references now use the existing official blue `logo-official-transparent-cropped.png`; no logo file was edited.
- Human realism review: `app-special-custom.jpg`, `steel-truss-hero.jpg`, and `steel-purlins-hero.jpg` show potentially implausible geometry/profile details. No subjective redesign was performed.

## Migration audit

- Old URL rows: 260.
- Final states: 33 `301_ONE_TO_ONE`, 42 `SAFE_MERGE`, 39 `GONE_410_CANDIDATE`, 34 `KEEP`, 25 `P1_30_DAYS`, 31 `P2_GROWTH`, 25 `DROP_CANDIDATE`, 20 `LEGACY_PRESERVE`, 7 `LEGACY_PRESERVED_200`, 2 `UNRESOLVED`, 2 `IGNORE_NON_PAGE`.
- Executable 301 candidates: 75. 410 candidates: 39, comments only.
- Redirect loops: 0; chains: 0; invalid active targets: 0.
- Generated overseas projects: 27; all 27 remain 410 candidates; wrong migration state: 0.
- P0 legacy pages: 7/7 built, indexable, canonical, in sitemap and live preview HTTP 200.
- Two unresolved legacy blog URLs are listed in `08-release-blockers.md`.
- Inactive final candidate: `tools/seo-migration/redirects-production-final-candidate.txt`.
- Production redirects/410: not activated.

## Engineering changes

- Fixed form/API field mapping, double submit, oversized-file error, GA4 variable injection/PII, UTM referrer capture and D1-success/R2-failure semantics.
- Added D1 binding after creating/migrating the remote database.
- Fixed three dead internal links and four cladding target IDs/content targets.
- Added static and Function security/cache headers.
- Added a real noindex 404 page.
- Prevented an empty Turnstile widget from generating browser errors when unconfigured.
- Replaced active old/AI logo references with the existing official file.
- Normalized deterministic migration mappings and left two unsafe mappings unresolved.

Release classification and remaining manual work are in `08-release-blockers.md` and `cloudflare-manual-setup.md`.
