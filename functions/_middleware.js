// Cloudflare Pages middleware
// ------------------------------------------------------------------
// Runs BEFORE static assets and the static `_redirects` file.
//
// Responsibilities:
//   1. Protect every real static route via the build-generated ROUTES allowlist
//      (functions/_routes.js). Genuine pages are always served and never shadowed
//      by a wildcard — this fixes the earlier directory-splat regression.
//   2. Normalize trailing slash and `.html` for real routes.
//   3. Redirect legacy/old URLs. The static `_redirects` file is capped at ~100
//      rules (extra rules are silently ignored), so the remaining legacy paths are
//      handled here in code (no rule cap, Git-versioned).
//   4. Return 410 for removed generated content.
//   5. Keep preview hosts (*.pages.dev) out of search indexes.
import { ROUTES } from './_routes.js';

// Paths that are permanently removed with no redirect target.
const GONE_URLS = new Set([
  '/en/blog/how-much-does-steel-structure-warehouse-cost/',
  '/zh/blog/gangjiegou-cangku-zaojia-2026/',
  '/zh/projects/china-cnooc-pipe-rack/',
  '/zh/projects/china-huarun-center/',
  '/zh/projects/china-qianhai-dreamfactory/',
]);

// Exact legacy redirects, keyed by NORMALIZED path (extensionless paths and
// `.html` paths both resolve to a directory form ending with '/').
// A value may be a string or an ordered candidate array (first real route wins).
const EXACT = new Map([
  // Root (no language prefix) -> English defaults
  ['/about/', '/en/about/'],
  ['/contact/', '/en/contact/'],
  ['/faq/', '/en/faq/'],
  ['/landing/', '/en/'],
  ['/privacy/', '/en/privacy/'],
  ['/terms/', '/en/terms/'],
  ['/projects/', '/en/projects/'],
  ['/steel-buildings/', '/en/solutions/'],
  ['/services/steel-structure-export/', '/en/export-delivery/'],
  ['/services/structural-steel-detailing/', '/en/services/structural-steel-detailing/'],
  // English
  ['/en/landing/', '/en/'],
  ['/en/shipments/', '/en/export-delivery/shipments/'],
  ['/en/steel-workshop-processing/', '/en/steel-workshop/'],
  ['/en/blog/how-to-verify-china-steel-structure-manufacturer-audit-checklist/',
    '/en/blog/steel-structure-rfq-quotation-checklist/'],
  ['/en/blog/steel-structure-cost-per-square-meter/',
    '/en/blog/how-to-steel-structure-cost/'],
  ['/en/projects/china-huarun-center/', '/en/projects/dongguan-huarun-center/'],
  ['/en/projects/china-qianhai-dreamfactory/', '/en/projects/qianhai-dreamfactory/'],
  // P1 Lead Stop-Loss — high-value exact redirects (audit §19, 2026-10)
  ['/en/blog/steel-structure-corrosion-protection-guide/',
    '/en/blog/steel-structure-corrosion-protection-coating-guide/'],
  ['/en/blog/steel-structure-design-standards-guide/',
    '/en/blog/steel-structure-design-codes-comparison/'],
  ['/en/blog/prefab-steel-factory-building-cost-guide/',
    '/en/blog/steel-warehouse-cost-guide/'],
  ['/en/countries/indonesia/', '/en/markets/indonesia/'],
  ['/en/projects/tanzania-grain-storage-warehouse/', '/en/markets/tanzania/'],
  ['/en/steel-hospital-building/', '/en/commercial-public-steel-buildings/'],
  ['/en/blog/prefab-steel-building-roof-systems-comparison/',
    '/en/components/roof-wall-cladding-systems/'],
  ['/en/blog/steel-structure-supplier-thailand-guide/', '/en/markets/thailand/'],
  ['/en/steel-warehouse-logistics/', '/en/steel-warehouse/'],
  // Chinese
  ['/zh/landing/', '/zh/'],
  ['/zh/shipments/', '/zh/export-delivery/shipments/'],
  ['/zh/blog/', '/zh/resources/'],
  ['/zh/blog/gangjiegou-anzhuang-zhinan-haiwai/',
    '/zh/blog/steel-structure-installation-process-guide/'],
  ['/zh/blog/gangjiegou-chukou-feizhou-quanliucheng/',
    ['/zh/blog/how-to-import-steel-structure-from-china-to-africa/', '/zh/resources/']],
  ['/zh/blog/how-to-choose-steel-structure-supplier/', '/zh/resources/'],
  ['/zh/blog/steel-structure-building-installation-guide-overseas/',
    '/zh/blog/steel-structure-installation-process-guide/'],
  ['/zh/blog/steel-structure-cost-per-square-meter/',
    '/zh/blog/gangjiegou-changfang-zaojia-zhinan/'],
  // SEO Growth Sprint — cost cluster: correct generic Resources fallback (2026-10)
  ['/zh/blog/steel-workshop-cost-factory-building-price/',
    '/zh/blog/gangjiegou-changfang-zaojia-zhinan/'],
  ['/zh/blog/gangjiegou-cangku-zaojia-duoshaoqian/',
    '/zh/blog/steel-warehouse-cost-guide/'],
  ['/zh/blog/gangjiegou-vs-hunningtu-chengben-duibi/',
    '/zh/blog/gangjiegou-changfang-zaojia-zhinan/'],
  ['/zh/blog/steel-structure-supplier-indonesia-guide/', '/zh/markets/indonesia/'],
  ['/zh/blog/steel-structure-supplier-mexico-guide/', '/zh/markets/'],
  ['/zh/products/materials/fasteners/', '/zh/components/'],
  // P1 Lead Stop-Loss — high-value exact redirects (audit §19, 2026-10)
  ['/zh/blog/steel-structure-corrosion-protection-guide/',
    '/zh/blog/steel-structure-corrosion-protection-coating-guide/'],
  ['/zh/blog/steel-structure-design-standards-guide/',
    '/zh/blog/steel-structure-design-codes-comparison/'],
  ['/zh/blog/prefab-steel-building-roof-systems-comparison/',
    '/zh/components/roof-wall-cladding-systems/'],
]);

// Pattern rules, evaluated after EXACT and ONLY for non-real routes (real routes
// are returned above, so these can never shadow a genuine page). [regex, target]
const PATTERNS = [
  // Projects: mining-related legacy -> mining factory; otherwise listing
  [/^\/en\/projects\/.*mining/i, '/en/steel-mining-factory/'],
  [/^\/zh\/projects\/.*mining/i, '/zh/steel-mining-factory/'],
  [/^\/en\/projects\//, '/en/projects/'],
  [/^\/zh\/projects\//, '/zh/projects/'],
  [/^\/projects\//, '/en/projects/'],
  // Products
  [/^\/en\/products\//, '/en/solutions/'],
  [/^\/zh\/products\/.*livestock/i, '/zh/agricultural-steel-buildings/'],
  [/^\/zh\/products\/.*mining/i, '/zh/steel-mining-factory/'],
  [/^\/zh\/products\//, '/zh/solutions/'],
  // Blog
  [/^\/en\/blog\//, '/en/resources/'],
  [/^\/zh\/blog\/gangjiegou-chukou/i,
    ['/zh/blog/how-to-import-steel-structure-from-china-to-africa/', '/zh/resources/']],
  [/^\/zh\/blog\//, '/zh/resources/'],
  // Legacy nested solutions
  [/^\/en\/solutions\/agriculture/i, '/en/agricultural-steel-buildings/'],
  [/^\/zh\/solutions\/agriculture/i, '/zh/agricultural-steel-buildings/'],
  // Services
  [/^\/en\/services\//, '/en/services/structural-steel-detailing/'],
  // Legacy steel-building-solutions
  [/steel-building-solutions\/agriculture/i, '/en/agricultural-steel-buildings/'],
  [/steel-building-solutions\/energy/i, '/en/steel-mining-factory/'],
  [/steel-building-solutions\//, '/en/solutions/'],
  // Top-level legacy steel-* (real steel-workshop/warehouse/mining/supermarket are
  // directory routes already returned via ROUTES)
  [/^\/en\/steel-/, '/en/solutions/'],
  [/^\/zh\/steel-/, '/zh/solutions/'],
  // Root (no lang) nested solutions
  [/^\/solutions\/agriculture/i, '/en/agricultural-steel-buildings/'],
  [/^\/solutions\/mining/i, '/en/steel-mining-factory/'],
];

const GONE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Page No Longer Available | ZhongSai Steel Structure</title>
<meta name="robots" content="noindex, follow">
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 40px 20px; background: #f8f9fa; color: #333; text-align: center; }
  .container { max-width: 600px; margin: 0 auto; }
  h1 { font-size: 28px; color: #1a365d; margin-bottom: 16px; }
  p { font-size: 16px; line-height: 1.6; color: #4a5568; margin-bottom: 24px; }
  .buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .btn { display: inline-block; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; }
  .btn-primary { background: #1a365d; color: #fff; }
  .btn-secondary { background: #e2e8f0; color: #1a365d; }
</style>
</head>
<body>
<div class="container">
  <h1>This Page is No Longer Available</h1>
  <p>The page you are looking for has been permanently removed. This content was generated legacy material and is not a verified ZhongSai project case.</p>
  <div class="buttons">
    <a href="/en/projects/" class="btn btn-primary">View Verified Projects</a>
    <a href="/en/" class="btn btn-secondary">Back to Home</a>
  </div>
</div>
</body>
</html>`;

function langOf(raw) {
  return raw.startsWith('/zh/') ? 'zh' : 'en';
}

// Resolve a target (string or candidate list) to a route that really exists,
// guaranteeing we never redirect to another 404. Falls back per language.
function resolveTarget(value, lang) {
  const candidates = Array.isArray(value) ? value : [value];
  for (const c of candidates) {
    if (ROUTES.has(c)) return c;
  }
  const fallback =
    lang === 'zh' ? ['/zh/resources/', '/zh/', '/en/'] : ['/en/resources/', '/en/'];
  for (const c of fallback) {
    if (ROUTES.has(c)) return c;
  }
  return '/';
}

function redirect(target) {
  return new Response(null, {
    status: 301,
    headers: {
      Location: target,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

function gone() {
  return new Response(GONE_HTML, {
    status: 410,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
      'X-Robots-Tag': 'noindex, follow',
    },
  });
}

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const raw = url.pathname;

  // Legacy API endpoint -> shipment evidence
  if (raw === '/api/youtube-playlist') {
    return redirect(resolveTarget('/en/export-delivery/shipments/', 'en'));
  }
  // Language-prefixed sitemap variants -> canonical sitemap
  if (raw === '/en/sitemap.xml' || raw === '/zh/sitemap.xml') {
    return redirect('/sitemap.xml');
  }

  const hasDot = raw.includes('.');

  // Normalize to a directory form for matching:
  //  /en/about.html      -> /en/about/
  //  /en/steel-workshop  -> /en/steel-workshop/
  let norm = raw;
  if (hasDot && raw.endsWith('.html')) {
    norm = raw.slice(0, -5) + '/';
  } else if (!hasDot && !raw.endsWith('/')) {
    norm = raw + '/';
  }

  // 1) Real route: serve it (normalizing the URL when needed).
  if (ROUTES.has(norm)) {
    if (norm === raw) {
      return addPreviewHeader(request, await next());
    }
    return redirect(norm);
  }

  // 2) Permanently removed.
  if (GONE_URLS.has(norm)) {
    return gone();
  }

  // 3) Exact legacy redirect.
  if (EXACT.has(norm)) {
    return redirect(resolveTarget(EXACT.get(norm), langOf(raw)));
  }

  // 4) Pattern legacy redirect (non-real routes only).
  for (const [re, target] of PATTERNS) {
    if (re.test(norm)) {
      return redirect(resolveTarget(target, langOf(raw)));
    }
  }

  // 5) Unmanaged file (images, css, other xml, ...) or unknown path -> static layer.
  return addPreviewHeader(request, await next());
}

// Preview hosts must not be indexed. Production custom domain is unaffected.
function addPreviewHeader(request, response) {
  const host = request.headers.get('host') || '';
  const isPreviewHost = host.endsWith('.pages.dev');
  const path = new URL(request.url).pathname;
  const isHtmlNavigation =
    request.method === 'GET' &&
    !path.startsWith('/api/') &&
    !path.includes('.');
  if (isPreviewHost && isHtmlNavigation) {
    const previewResponse = new Response(response.body, response);
    previewResponse.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return previewResponse;
  }
  return response;
}
