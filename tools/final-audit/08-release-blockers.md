# Release blockers

Audit date: 2026-09-05

## Decision

**CUTOVER READY: NO**

The codebase can enter human visual acceptance, but the production-domain cutover must wait for the three P0 groups below and a real end-to-end form submission.

## P0 — must fix before cutover (3)

1. **Turnstile configuration missing.** No widget/site key or Function secret exists, so a real protected form submission cannot complete.
2. **R2 unavailable.** R2 is not enabled for the Cloudflare account; the `zhongsai-lead-files` bucket and `LEAD_FILES` binding cannot yet be created. Drawing upload therefore cannot complete.
3. **Two legacy Chinese blog URLs remain unresolved.** There is no confirmed intent-equivalent indexable target for `/zh/blog/gangjiegou-changfang-zaojia-zhinan/` and `/zh/blog/steel-workshop-cost-factory-building-price/`. A human must choose preserve/rebuild/intent-valid mapping before production redirects are activated.

After P0 items 1–2, run one EN Have Drawings upload and one ZH No Drawings submission against preview, verify D1 rows/R2 objects, then remove or mark the test records.

## P1 — before or immediately after launch (2)

1. GA4 is code-ready but `PUBLIC_GA_MEASUREMENT_ID` is missing, so conversion measurement is blocked.
2. Image performance: 19 of 81 uniquely referenced images exceed 500 KB, 7 exceed 1 MB, and 88 image-reference occurrences omit explicit width/height attributes. No referenced image exceeds 2 MB and none are missing.

## P2 — post-launch optimization (3)

1. Product application cards use mixed behavior (3 detail pages, 4 quote actions); align CTA expectations when application content is expanded.
2. The root route is still meta/JavaScript redirect in static output. Activate the reviewed HTTP 301 candidate only during the controlled production cutover.
3. Package installation reported one deprecated transitive dependency, `tsconfck@3.1.6`; handle in a controlled dependency-upgrade task.

## Human review (3)

1. Structural realism of three AI visuals: special/custom spiral stair continuity, truss connection geometry, and mixed/nonstandard purlin profiles.
2. IA overlap between “Special & Custom Steel Structures” (application) and “Custom Engineering & Fabrication” (capability). Minimal recommendation: narrow the application label to architectural/special-form structures while retaining Custom Engineering as the drawing-led fabrication capability.
3. Visual acceptance of the official blue logo in the header/footer after replacing the actively used old/AI-replica assets. The official source file itself was not modified.

## Explicitly not activated

- Production domain/DNS: unchanged.
- Production 301 rules: not activated.
- Production 410 rules: not activated.
- Google Search Console: not submitted.
- Old website: unchanged.
- Project image files: unchanged.

