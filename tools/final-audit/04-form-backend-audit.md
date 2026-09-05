# Form and backend audit

Audit date: 2026-09-05

## Verdict

- Source-level and mocked integration tests: **12/12 PASS**.
- Real preview end-to-end submission: **BLOCKED** because Turnstile keys and the R2 bucket/binding do not exist yet.
- D1 resource: **READY**. Database `zhongsai-leads` was created, migration `0001_create_leads.sql` was applied remotely, and both tables plus all three indexes were verified.
- Test data handling: all automated submissions used in-memory D1/R2 mocks. No customer data and no remote D1 test lead were created.

## Verified data flow

Browser → Turnstile token → `/api/project-inquiry` Pages Function → D1 lead row → optional R2 upload + D1 file metadata → optional webhook → success response → one deduplicated GA4 `generate_lead` event.

The original browser/API field names did not match for country, calling code, project type, intended use, crane requirement and active path. This was a P0 functional defect: valid browser submissions could fail server validation. The Function now normalizes those names before validation and persistence.

## Test matrix

| Test | Result | Evidence |
|---|---|---|
| EN + Have Drawings + no file | PASS (mocked integration) | D1 insert, final status `complete` |
| EN + Have Drawings + PDF | PASS (mocked integration) | R2 put + D1 file row |
| ZH + No Drawings | PASS (mocked integration) | Correct no-drawings validation path |
| Missing WeChat | PASS | WeChat is optional |
| Missing Phone | PASS | Email/WeChat alternative accepted |
| Invalid Turnstile | PASS | Rejected before persistence |
| Invalid file type | PASS | HTTP 400 `INVALID_FILE` before lead creation |
| Oversized file | PASS | HTTP 400 at 25 MB/file or 75 MB total |
| Rapid double submit | PASS | Per-form submission lock plus disabled button |
| Network/API failure | PASS | Error shown; submit state reset |
| Simulated R2 failure after D1 success | PASS | Lead retained as `file_upload_failed`; partial-success response |
| Missing R2 binding after D1 success | PASS | Lead retained; attachment failure disclosed |

Runner: `tools/final-audit/form-backend-tests.mjs`.

## Failure semantics

- Invalid files are rejected before D1 insertion.
- If D1 succeeds but one or more R2 writes fail, the lead remains stored and is marked `file_upload_failed`; the customer sees an accurate partial-success message rather than a false total failure.
- If a file is written to R2 but its D1 metadata insert fails, the Function attempts best-effort orphan cleanup.
- API responses use `Cache-Control: no-store`.

## GA4 and attribution

- `generate_lead` fires only after `success=true` and a real non-filtered `lead_id` are returned.
- Duplicate lead IDs are suppressed in the browser session.
- PII sent to GA4: **0 fields**. Name, phone, WhatsApp, WeChat, email, filenames and drawing content are excluded.
- A literal `'{measurementId}'` GA4 configuration bug was fixed; the actual build-time value is now used.
- Attribution model: **SESSION LAST UTM**. A newly tagged URL overwrites the session-stored UTM set. `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, tagged landing page and its referrer persist across pages; `source_page` records the submission page.
- GA4 runtime result: **BLOCKED** until `PUBLIC_GA_MEASUREMENT_ID` is supplied at build time.

## Live preview evidence

Preview: `https://a03aed77.zhongsai-website-v2.pages.dev`

- POST with unsupported content type returned HTTP 400 JSON.
- Response headers included `Content-Type: application/json`, `Cache-Control: no-store`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and `Referrer-Policy: strict-origin-when-cross-origin`.
- The built contact page contains neither a Turnstile site key nor a GA4 script, accurately confirming the two missing configurations.
