// tools/optimize-hero-images.mjs
// ------------------------------------------------------------------
// PHASE 18 / S2 — full-bleed hero background image pipeline (build-time).
//
// Scans src/pages/**/*.astro for the inline hero background divs:
//   <div class="detail-hero-bg" style="background-image: url('/images/..')">
//   <div class="hub-hero-bg"    style="background-image: url('/images/..')">
// and emits responsive AVIF + WebP variants for each unique source.
// The template side renders them as a real <picture><img> (see
// src/components/HeroBg.astro), so the LCP element becomes an <img> with
// fetchpriority=high instead of a CSS-discovered background.
//
// Contract mirrors S1: originals are never touched; variants and the
// manifest are git-ignored; missing manifest => plain <img> fallback.
// ------------------------------------------------------------------
import sharp from 'sharp';
import { mkdir, readdir, readFile, stat, writeFile, unlink } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PUB = join(ROOT, 'public');
const PAGES = join(ROOT, 'src', 'pages');
const OUT = join(PUB, 'images', 'optimized', 'hero');
const MANIFEST = join(ROOT, 'src', 'data', 'hero-manifest.json');
const HERO_DIR = '/images/optimized/hero';

// Hero is full-bleed: mobile 412px@DPR2.625 -> ~1080, desktop 1440@DPR1 -> 1440.
const RUNGS = [800, 1200, 1920];
const AVIF = { quality: 55, effort: 4, chromaSubsampling: '4:2:0' };
const WEBP = { quality: 75, effort: 5 };

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (entry.name.endsWith('.astro')) out.push(p);
  }
  return out;
}

// Pages render <HeroBg src="/images/.." variant="detail|hub" />
const BG_RE = /<HeroBg\s+src="([^"]+)"/g;

function variantBase(src) {
  const hash = createHash('sha1').update(src).digest('hex').slice(0, 8);
  const name = src.split('/').pop().replace(/\.[a-z0-9]+$/i, '').replace(/[^a-z0-9-]+/gi, '-');
  return `${name}-${hash}`;
}

async function fresh(outPath, srcPath) {
  try {
    const [o, s] = await Promise.all([stat(outPath), stat(srcPath)]);
    return o.size > 0 && o.mtimeMs >= s.mtimeMs;
  } catch {
    return false;
  }
}

async function main() {
  const files = await walk(PAGES);
  const sources = new Set();
  for (const f of files) {
    const txt = await readFile(f, 'utf8');
    for (const m of txt.matchAll(BG_RE)) sources.add(m[1]);
  }
  if (sources.size === 0) throw new Error('No <HeroBg> usages found under src/pages');

  await mkdir(OUT, { recursive: true });
  let generated = 0, skipped = 0, failed = 0;
  const manifest = {};
  const expected = new Set();

  for (const src of [...sources.keys()].sort()) {
    const abs = join(PUB, src.replace(/^\//, ''));
    try {
      await stat(abs);
    } catch {
      throw new Error(`Missing hero source image: ${src}`);
    }
    const meta = await sharp(abs).metadata();
    if (!meta.width || !meta.height) throw new Error(`Cannot read dimensions: ${src}`);

    const base = variantBase(src);
    const widths = RUNGS.filter((w) => w <= meta.width);
    if (widths.length === 0) widths.push(meta.width);
    const entries = [];
    for (const w of widths) {
      entries.push({ width: Math.min(w, meta.width), avif: `${base}-${w}.avif`, webp: `${base}-${w}.webp` });
      for (const fmt of ['avif', 'webp']) {
        const out = join(OUT, `${base}-${w}.${fmt}`);
        expected.add(`${base}-${w}.${fmt}`);
        if (await fresh(out, abs)) { skipped++; continue; }
        let pipe = sharp(abs).rotate().resize({ width: w, withoutEnlargement: true });
        pipe = fmt === 'avif' ? pipe.avif(AVIF) : pipe.webp(WEBP);
        try {
          await pipe.toFile(out);
          generated++;
        } catch (err) {
          failed++;
          console.error(`  FAIL ${src} @${w} ${fmt}: ${err.message}`);
        }
      }
    }
    entries.sort((a, b) => a.width - b.width);
    manifest[src] = { width: meta.width, height: meta.height, dir: HERO_DIR, variants: entries };
  }

  for (const name of await readdir(OUT)) {
    if (!expected.has(name)) {
      await unlink(join(OUT, name));
      console.log(`  pruned ${name}`);
    }
  }

  await mkdir(dirname(MANIFEST), { recursive: true });
  const json = JSON.stringify(manifest, null, 1) + '\n';
  await writeFile(MANIFEST, json, 'utf8');

  console.log(
    `[optimize-hero-images] heroes=${sources.size} rungs=${RUNGS.join('/')} generated=${generated} skipped=${skipped} failed=${failed} manifest=${(Buffer.byteLength(json) / 1024).toFixed(1)}KB`
  );
  if (failed) throw new Error(`${failed} hero variant(s) failed to encode`);
}

main().catch((err) => { console.error(err); process.exit(1); });
