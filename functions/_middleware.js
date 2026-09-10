// Cloudflare Pages Middleware for 410 Gone responses
// Handles generated legacy project URLs that are not verified ZhongSai cases
// NOTE: URLs with 301 redirects in _redirects should NOT be here (middleware runs first)

const GONE_URLS = new Set([
  // Only keep URLs that should return 410 (permanently removed, no redirect target)
  // Old project URLs now have 301 redirects in _redirects, so they are removed from here
  "/en/blog/how-much-does-steel-structure-warehouse-cost/",
  "/en/blog/steel-workshop-cost-factory-building-price/",
  "/zh/blog/gangjiegou-cangku-zaojia-2026/",
  "/zh/projects/china-cnooc-pipe-rack/",
  "/zh/projects/china-huarun-center/",
  "/zh/projects/china-qianhai-dreamfactory/",
]);

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

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  let pathname = url.pathname;

  // Normalize pathname: ensure trailing slash for comparison
  if (!pathname.endsWith('/') && !pathname.includes('.')) {
    pathname = pathname + '/';
  }

  // Skip API routes and static assets
  if (pathname.startsWith('/api/') || pathname.includes('.')) {
    return next();
  }

  // Check if path is in GONE_URLS
  if (GONE_URLS.has(pathname)) {
    return new Response(GONE_HTML, {
      status: 410,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
        'X-Robots-Tag': 'noindex, follow'
      }
    });
  }

  return next();
}
