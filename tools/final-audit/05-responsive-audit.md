# Responsive technical audit

Audit date: 2026-09-05

## Automated result

Playwright tested 28 core EN/ZH routes at 1440×900, 768×1024 and 375×812. It saved 84 full-page JPEG screenshots under `tools/final-audit/screenshots/`.

| Check | Result |
|---|---:|
| Route/view combinations | 84 |
| Non-200 page loads | 0 |
| Horizontal overflow | 0 |
| Browser page errors | 0 |
| Internal request failures | 0 |
| Tested anchors hidden by fixed header | 0 |

Viewport verdicts: **1440 PASS · 768 PASS · 375 PASS**.

## Anchor and navigation interactions

- Real anchor navigation was exercised for steel beams, steel columns, box sections, crane beams, C purlins, Z purlins, roof panels, wall panels, sandwich panels and cladding accessories.
- All ten targets existed and landed below the fixed header.
- At 375 px, the mobile menu opened, closed, unlocked body scrolling, and exposed working Products, Components, Projects, Contact and language-switch links.

Evidence: `responsive-results.json`, `responsive-audit.cjs`, and the three screenshot folders `desktop-1440`, `tablet-768`, `mobile-375`.

This is a technical layout audit, not a claim that the final visual design is aesthetically approved. Human visual review remains required for the official-logo fit and identified AI-image realism concerns.

