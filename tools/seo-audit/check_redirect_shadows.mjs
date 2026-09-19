#!/usr/bin/env node
/**
 * Static guardrail — Cloudflare Pages `_redirects` first-match shadow audit.
 *
 * Cloudflare Pages `_redirects` applies the FIRST matching rule. A static exact
 * rule placed AFTER a wildcard that already matches its source can never fire.
 * This parser detects that and distinguishes:
 *   SHADOWED_SAME_TARGET  - earlier wildcard sends it to the same destination
 *                           (benign, reported only)
 *   SHADOWED_WRONG_TARGET - earlier wildcard sends it somewhere else (real bug)
 *
 * Consciously deferred wrong-target shadows can be listed in
 * redirect-shadow-allowlist.txt (one source path per line, # comments allowed);
 * they are reported as ACKNOWLEDGED_SHADOW and do not fail the check.
 *
 * Usage:
 *   node tools/seo-audit/check_redirect_shadows.mjs [path-to-_redirects] [allowlist]
 * Exits non-zero only on an UNACKNOWLEDGED SHADOWED_WRONG_TARGET.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..', '..');
const redirectsPath = process.argv[2]
  ? resolve(process.cwd(), process.argv[2])
  : resolve(root, 'public', '_redirects');
const allowlistPath = process.argv[3]
  ? resolve(process.cwd(), process.argv[3])
  : resolve(here, 'redirect-shadow-allowlist.txt');

const raw = readFileSync(redirectsPath, 'utf8');

// Optional allowlist of acknowledged/deferred wrong-target shadows.
let acknowledged = new Set();
try {
  acknowledged = new Set(
    readFileSync(allowlistPath, 'utf8')
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#'))
  );
} catch {
  // no allowlist present -> nothing acknowledged
}

const rules = [];
raw.split(/\r?\n/).forEach((line, idx) => {
  const t = line.trim();
  if (!t || t.startsWith('#')) return;
  const parts = t.split(/\s+/);
  if (parts.length < 2) return;
  const [source, target, status = '302'] = parts;
  const isDynamic = source.includes('*') || source.includes(':splat') || source.includes(':');
  // Build a matcher for wildcard sources: '*' matches across '/'.
  let matcher = null;
  if (isDynamic) {
    const pattern =
      '^' +
      source
        .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
        .replace(/\*/g, '.*') +
      '$';
    matcher = new RegExp(pattern);
  }
  rules.push({ line: idx + 1, source, target, status, isDynamic, matcher });
});

const norm = (u) => u.replace(/\/+$/, '') || '/';
const dynamic = rules.filter((r) => r.isDynamic);
const statics = rules.filter((r) => !r.isDynamic);

let failures = 0;
const sameTarget = [];
const wrongTarget = [];
const acknowledgedShadows = [];

for (const s of statics) {
  for (const d of dynamic) {
    if (d.line >= s.line) break; // only EARLIER rules can shadow
    if (d.matcher && d.matcher.test(s.source)) {
      if (norm(d.target) === norm(s.target)) {
        sameTarget.push({ rule: s, by: d });
      } else if (acknowledged.has(s.source)) {
        acknowledgedShadows.push({ rule: s, by: d });
      } else {
        wrongTarget.push({ rule: s, by: d });
        failures += 1;
      }
    }
  }
}

const fmt = ({ rule, by }) =>
  `  L${rule.line} ${rule.source}\n` +
  `      intended -> ${rule.target} (${rule.status})\n` +
  `      shadowed by L${by.line} ${by.source} -> ${by.target}`;

console.log('[redirect-shadows] ------------------------------');
console.log(`[redirect-shadows] rules parsed: ${rules.length} (static ${statics.length}, dynamic ${dynamic.length})`);
console.log(`[redirect-shadows] SHADOWED_SAME_TARGET (benign): ${sameTarget.length}`);
sameTarget.forEach((x) => console.log(fmt(x)));
console.log(`[redirect-shadows] ACKNOWLEDGED_SHADOW (deferred): ${acknowledgedShadows.length}`);
acknowledgedShadows.forEach((x) => console.log(fmt(x)));
console.log(`[redirect-shadows] SHADOWED_WRONG_TARGET (fail): ${wrongTarget.length}`);
wrongTarget.forEach((x) => console.log(fmt(x)));

if (failures > 0) {
  console.error('[redirect-shadows] RESULT: FAIL — move the exact rule to Cloudflare Bulk Redirects or above the wildcard.');
  process.exit(1);
}
console.log('[redirect-shadows] RESULT: PASS');
