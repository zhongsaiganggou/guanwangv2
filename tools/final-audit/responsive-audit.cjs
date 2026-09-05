const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const base = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4321';
const outRoot = path.join(__dirname, 'screenshots');
const pages = [
  '/en/', '/zh/',
  '/en/products/', '/zh/products/',
  '/en/components/', '/zh/components/',
  '/en/steel-workshop/', '/zh/steel-workshop/',
  '/en/steel-warehouse/', '/zh/steel-warehouse/',
  '/en/components/steel-trusses/', '/zh/components/steel-trusses/',
  '/en/components/steel-purlins/', '/zh/components/steel-purlins/',
  '/en/components/roof-wall-cladding-systems/', '/zh/components/roof-wall-cladding-systems/',
  '/en/manufacturing-quality/', '/zh/manufacturing-quality/',
  '/en/export-delivery/', '/zh/export-delivery/',
  '/en/about/', '/zh/about/',
  '/en/projects/', '/zh/projects/',
  '/en/contact/', '/zh/contact/',
  '/en/steel-mining-factory/', '/zh/steel-mining-factory/',
];
const viewports = [
  { name: '1440x900', width: 1440, height: 900 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '375x812', width: 375, height: 812 },
];

function slug(url) {
  return url.replace(/^\//, '').replace(/\/$/, '').replaceAll('/', '__') || 'root';
}

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.PLAYWRIGHT_BROWSER || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  });
  const results = [];
  for (const viewport of viewports) {
    const dir = path.join(outRoot, viewport.name);
    fs.mkdirSync(dir, { recursive: true });
    const context = await browser.newContext({ viewport });
    for (const url of pages) {
      const page = await context.newPage();
      const consoleErrors = [];
      const pageErrors = [];
      const failedRequests = [];
      page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
      page.on('pageerror', err => pageErrors.push(err.message));
      page.on('requestfailed', req => {
        const parsed = new URL(req.url());
        if (parsed.origin === base) failedRequests.push(`${req.method()} ${parsed.pathname}: ${req.failure()?.errorText || 'failed'}`);
      });
      const response = await page.goto(base + url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.evaluate(() => {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      });
      const metrics = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        scrollHeight: document.documentElement.scrollHeight,
        overflow: document.documentElement.scrollWidth > window.innerWidth,
        h1Count: document.querySelectorAll('h1').length,
      }));
      await page.screenshot({
        path: path.join(dir, slug(url) + '.jpg'),
        type: 'jpeg',
        quality: 72,
        fullPage: true,
      });
      results.push({
        viewport: viewport.name,
        url,
        status: response ? response.status() : 0,
        ...metrics,
        consoleErrors: consoleErrors.join(' | '),
        pageErrors: pageErrors.join(' | '),
        failedRequests: failedRequests.join(' | '),
      });
      await page.close();
    }
    await context.close();
  }

  // Anchor position checks after native hash navigation.
  const anchorTargets = [
    '/en/components/fabricated-steel-beams-columns/#steel-beams',
    '/en/components/fabricated-steel-beams-columns/#steel-columns',
    '/en/components/fabricated-steel-beams-columns/#box-sections',
    '/en/components/fabricated-steel-beams-columns/#crane-beams',
    '/en/components/steel-purlins/#c-purlins',
    '/en/components/steel-purlins/#z-purlins',
    '/en/components/roof-wall-cladding-systems/#roof-panels',
    '/en/components/roof-wall-cladding-systems/#wall-panels',
    '/en/components/roof-wall-cladding-systems/#sandwich-panels',
    '/en/components/roof-wall-cladding-systems/#cladding-accessories',
  ];
  const anchorResults = [];
  const anchorContext = await browser.newContext({ viewport: { width: 375, height: 812 } });
  for (const target of anchorTargets) {
    const page = await anchorContext.newPage();
    await page.goto(base + target, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(150);
    const data = await page.evaluate(() => {
      const id = decodeURIComponent(location.hash.slice(1));
      const el = document.getElementById(id);
      const header = document.querySelector('.site-header');
      return {
        id,
        exists: !!el,
        top: el ? Math.round(el.getBoundingClientRect().top) : null,
        headerBottom: header ? Math.round(header.getBoundingClientRect().bottom) : null,
        visibleHeading: el ? (el.matches('h1,h2,h3') ? el.textContent.trim() : el.querySelector('h1,h2,h3')?.textContent.trim() || '') : '',
      };
    });
    anchorResults.push({ target, ...data, notCovered: data.exists && data.top >= (data.headerBottom || 0) });
    await page.close();
  }
  await anchorContext.close();

  // Mobile navigation interaction checks.
  const mobileContext = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobile = await mobileContext.newPage();
  await mobile.goto(base + '/en/', { waitUntil: 'networkidle' });
  const mobileNav = { open: false, close: false, bodyUnlocked: false, links: [] };
  const toggle = mobile.locator('#mobile-menu-toggle');
  await toggle.click();
  mobileNav.open = await mobile.locator('#mobile-nav').evaluate(el => el.classList.contains('is-open'));
  await toggle.click();
  mobileNav.close = !(await mobile.locator('#mobile-nav').evaluate(el => el.classList.contains('is-open')));
  mobileNav.bodyUnlocked = await mobile.evaluate(() => !document.body.classList.contains('menu-open'));
  await toggle.click();
  for (const label of ['Products', 'Components', 'Projects', 'Contact']) {
    const a = mobile.locator('#mobile-nav a', { hasText: label }).first();
    mobileNav.links.push({ label, href: await a.getAttribute('href'), exists: await a.count() === 1 });
  }
  const lang = mobile.locator('#mobile-nav .mobile-lang-switch').first();
  mobileNav.links.push({ label: 'Language Switch', href: await lang.getAttribute('href'), exists: await lang.count() === 1 });
  await mobile.close();
  await mobileContext.close();

  fs.writeFileSync(path.join(__dirname, 'responsive-results.json'), JSON.stringify({ results, anchorResults, mobileNav }, null, 2));
  const summary = {
    pagesTested: pages.length,
    screenshots: results.length,
    overflowCount: results.filter(r => r.overflow).length,
    non200: results.filter(r => r.status !== 200).length,
    pageErrorCount: results.filter(r => r.pageErrors).length,
    internalRequestFailureCount: results.filter(r => r.failedRequests).length,
    anchorsFailed: anchorResults.filter(r => !r.exists || !r.notCovered).length,
    mobileNav,
  };
  console.log(JSON.stringify(summary, null, 2));
  await browser.close();
  if (summary.overflowCount || summary.non200 || summary.pageErrorCount || summary.internalRequestFailureCount || summary.anchorsFailed || !mobileNav.open || !mobileNav.close || !mobileNav.bodyUnlocked) {
    process.exitCode = 1;
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
