# Security, cache and runtime audit

Audit date: 2026-09-05

## Security headers

`public/_headers` now sets on static responses:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: SAMEORIGIN`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

The Pages Function sets its own headers because Pages `_headers` is not guaranteed to wrap Function responses. Live preview POST verification returned JSON, `no-store`, `nosniff`, `DENY` framing and the expected referrer policy. A strict CSP was intentionally not added because an untested policy could break Turnstile or GA4.

## Cache policy verified on deployed preview

| Resource class | Actual header | Result |
|---|---|---|
| `/_astro/*` hashed assets | `public, max-age=31536000, immutable` | PASS |
| `/images/*` stable filenames | `public, must-revalidate, max-age=86400` | PASS |
| HTML | Cloudflare `public, must-revalidate, max-age=0` | PASS |
| `/api/project-inquiry` | `no-store` | PASS |
| 404 response | `no-store` | PASS |

## 404 and indexing

- A real noindex `404.html` was added. The deployed nonexistent URL returned HTTP **404**, eliminating the prior SPA-fallback HTTP 200 behavior.
- Preview `/en/` and `/zh/` returned `X-Robots-Tag: noindex`.
- Production source has no global noindex and `robots.txt` remains `Allow: /` with the production sitemap URL.

## Secrets

Tracked workspace plus the latest five commits were scanned for Turnstile secrets, webhook secrets, API keys, Cloudflare tokens, passwords and private-key blocks. Result: **0 secret-bearing files found**. The D1 database identifier in `wrangler.toml` is a resource identifier, not an authentication secret.

## Third-party and font inventory

- GA4: conditional, async, absent when no measurement ID is supplied.
- Cloudflare Turnstile: conditional, dynamically loaded async, absent when no site key is supplied.
- YouTube, Maps and other embeds: none.
- Social-network and WhatsApp links are outbound links, not blocking scripts.
- Fonts: system/local stack; no Google Fonts, `fonts.gstatic.com`, domestic CDN or unknown third-party font dependency.
- No public/runtime secret is embedded in client JavaScript or generated HTML.

Live evidence URL: `https://a03aed77.zhongsai-website-v2.pages.dev`.
