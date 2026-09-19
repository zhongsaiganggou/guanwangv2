#!/usr/bin/env node
/**
 * Static guardrail — Sitemap hreflang existence check (no network).
 *
 * Invariant: every xhtml:link rel="alternate" hreflang href in the built
 * sitemap must itself be present as a <loc> in the same sitemap. A dangling
 * alternate points to a URL that is not a real, indexable route (404 /
 * redirect / non-equivalent page) — the exact defect class produced by the
 * old mechanical /en/ <-> /zh/ prefix swap on EN-only / ZH-only pages.
 *
 * Usage:
 *   node tools/seo-audit/check_sitemap_hreflang.mjs [path-to-sitemap.xml]
 * Defaults to dist/sitemap.xml. Exits non-zero on any dangling alternate.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..', '..');
const sitemapPath = process.argv[2]
  ? resolve(process.cwd(), process.argv[2])
  : resolve(root, 'dist', 'sitemap.xml');

let xml;
try {
  xml = readFileSync(sitemapPath, 'utf8');
} catch (err) {
  console.error(`[sitemap-hreflang] FAIL: cannot read ${sitemapPath} (${err.message})`);
  console.error('[sitemap-hreflang] Run `npm run build` first.');
  process.exit(2);
}

// Split into <url>…</url> blocks.
const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
const locs = new Set();
const records = [];

for (const block of blocks) {
  const loc = (block.match(/<loc>([^<]+)<\/loc>/) || [])[1] || '';
  if (loc) locs.add(loc.trim());
  const alternates = [...block.matchAll(
    /<xhtml:link[^>]*rel="alternate"[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"[^>]*\/?>/g
  )].map((m) => ({ hreflang: m[1], href: m[2].trim() }));
  records.push({ loc: loc.trim(), alternates });
}

let dangling = 0;
for (const rec of records) {
  for (const alt of rec.alternates) {
    if (!locs.has(alt.href)) {
      dangling += 1;
      console.error(
        `[sitemap-hreflang] DANGLING hreflang="${alt.hreflang}" ${alt.href}\n` +
        `    referenced from <loc> ${rec.loc}\n` +
        `    -> target is not a <loc> in the sitemap (404 / redirect / non-equivalent route).`
      );
    }
  }
}

// Summary of how many alternates each language group carries (informational).
const singleAlt = records.filter((r) => r.alternates.length === 1).length;
const paired = records.filter((r) => r.alternates.length >= 2).length;

console.log('[sitemap-hreflang] --------------------------------');
console.log(`[sitemap-hreflang] <loc> count:        ${locs.size}`);
console.log(`[sitemap-hreflang] <url> blocks:       ${records.length}`);
console.log(`[sitemap-hreflang] single-language:    ${singleAlt} (self alternate only)`);
console.log(`[sitemap-hreflang] paired en/zh:       ${paired}`);
console.log(`[sitemap-hreflang] dangling alternates: ${dangling}`);

if (dangling > 0) {
  console.error('[sitemap-hreflang] RESULT: FAIL');
  process.exit(1);
}
console.log('[sitemap-hreflang] RESULT: PASS');
