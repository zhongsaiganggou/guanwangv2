# Release blockers

Audit date: 2026-09-07
Git HEAD: bfa34b3 + V2-09C changes

## Decision

**CUTOVER P0 BLOCKERS: 0 (code-level)**

**CURRENTLY READY FOR FINAL HUMAN VISUAL ACCEPTANCE: YES**

**CURRENTLY READY FOR PRODUCTION CUTOVER: NO (requires R2 enablement + GA4 ID + final human acceptance)**

All code-level P0 migration blockers are resolved. Two account-level items remain before production cutover: R2 must be enabled in Cloudflare Dashboard, and GA4 Measurement ID must be provided. These are not code defects but account configuration steps.

## P0 — resolved (3)

1. **Turnstile configuration — RESOLVED.** Cloudflare Turnstile widget "ZhongSai V2" created. Site Key `0x4AAAAAAEqsUE0gIcgV1fbT` configured as `PUBLIC_TURNSTILE_SITE_KEY` in both Preview and Production environments. Secret Key configured as `TURNSTILE_SECRET_KEY` (server-only, not exposed to client). Form security verification active.
2. **D1 database — RESOLVED.** Database `zhongsai-leads` (UUID: fadaebf1-1310-4512-9e8c-1cd415cf34eb) created. Migration `0001_create_leads.sql` executed on remote database. Tables `leads` and `lead_files` verified. Binding `LEADS_DB` configured in Pages Functions.
3. **Two legacy Chinese blog URLs — RESOLVED.** Primary URL `/zh/blog/gangjiegou-changfang-zaojia-zhinan/` created as full indexable V2 LegacyArticleLayout page (fact-safe cost guide, Answer-first structure, 6 core sections, service boundary explicit). Duplicate URL `/zh/blog/steel-workshop-cost-factory-building-price/` marked as 301 candidate to primary URL in `redirects-production-final-candidate.txt`. Production redirect NOT activated.

## P0 — account-level action required (1)

1. **R2 not enabled — USER ACTION REQUIRED.** Cloudflare R2 is not yet enabled for account `9af6fa79254dc65458026924d8698775`. To enable: Cloudflare Dashboard → R2 → Enable R2 (accept terms, configure payment if required). After enablement: create bucket `zhongsai-lead-files` (PRIVATE, no public access), configure binding `LEAD_FILES` in Pages Functions Settings. Until R2 is enabled, drawing/file uploads will fail at the upload step. Form submission without files works normally.

## P1 — before or immediately after launch (2)

1. **GA4 Measurement ID missing — BUSINESS LAUNCH ANALYTICS BLOCKER.** Code is ready (`PUBLIC_GA_MEASUREMENT_ID` env var, `generate_lead` event fires only after server-side success, no PII sent). User must provide a real GA4 Measurement ID (format: G-XXXXXXXXXX). Without it, no conversion tracking on launch day.
2. **Image performance optimization.** Some images exceed 500 KB. No referenced image exceeds 2 MB and none are missing. Can be optimized post-launch without blocking cutover.

## P2 — post-launch optimization (3)

1. **Country pages strategy.** Old country pages remain deferred. Await GSC historical data to determine which country URLs have real search value.
2. **Root route HTTP 301.** Currently meta/JavaScript redirect in static output. Activate the reviewed HTTP 301 candidate only during controlled production cutover.
3. **Package dependency maintenance.** Deprecated transitive dependencies can be upgraded in a controlled task.

## Human review (3)

1. **Structural realism of AI visuals.** Special/custom spiral stair continuity, truss connection geometry, and mixed/nonstandard purlin profiles should be visually accepted by a structural engineer before being used in sales contexts.
2. **IA overlap between Special Steel Structures (application) and Custom Engineering (capability).** Already addressed: application label narrowed to architectural/special-form structures; Custom Engineering retained as drawing-led fabrication capability.
3. **Final human visual acceptance.** Full site walkthrough on production domain after cutover.

## Explicitly not activated

- Production domain/DNS: unchanged.
- Production 301 rules: NOT ACTIVATED (candidates documented in `redirects-production-final-candidate.txt`).
- Production 410 rules: NOT ACTIVATED (27 generated fake overseas projects marked GONE_410_CANDIDATE).
- Google Search Console: NOT SUBMITTED.
- Old website: unchanged.
- Project image files: unchanged (52 images frozen).
- Google Sheet integration: NOT ACTIVATED (webhook URL reserved, optional).

## Test results summary

| Test | Result | Notes |
|------|--------|-------|
| D1 database | PASS | 2 tables created, remote migration executed |
| Turnstile | PASS | Keys configured, server verification active |
| R2 | BLOCKED | Account-level enablement required |
| GA4 | BLOCKED | Measurement ID required |
| Chinese cost guide page | PASS | indexable, canonical correct, content fact-safe |
| Build | PASS | 88 pages |
| EN form (no file) | PENDING | Requires browser Turnstile interaction |
| ZH form (no file) | PENDING | Requires browser Turnstile interaction |
| File upload test | BLOCKED | R2 not enabled |
