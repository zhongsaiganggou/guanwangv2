# Cloudflare manual setup — minimum remaining steps

1. Enable R2 for the account, create private bucket `zhongsai-lead-files`, uncomment the `[[r2_buckets]]` block in `wrangler.toml`, and deploy with binding `LEAD_FILES`.
2. Create a Turnstile widget for the production hostname and the Pages preview hostnames. Add public build variable `PUBLIC_TURNSTILE_SITE_KEY` and encrypted Function secret `TURNSTILE_SECRET_KEY` to both Preview and Production environments. Rebuild after adding the public variable.
3. Add the real GA4 web-stream ID as build variable `PUBLIC_GA_MEASUREMENT_ID` in Preview and Production, then rebuild. Do not use a placeholder ID.
4. Deploy preview and submit one EN Have Drawings form with a harmless PDF plus one ZH No Drawings form. Confirm D1 `leads`, R2 object, D1 `lead_files`, success UI and one GA4 `generate_lead`; then remove or mark the QA records.

D1 is already complete: `zhongsai-leads` exists, migration `0001_create_leads.sql` was applied, and the `LEADS_DB` binding is present in `wrangler.toml`.

