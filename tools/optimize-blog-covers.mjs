// tools/optimize-blog-covers.mjs
// ------------------------------------------------------------------
// PHASE 18 / S1 — blog cover image pipeline (build-time, pre-Astro).
//
// Reads the *single source* cover JPEGs that blog frontmatter points at
// (src/content/blog/{en,zh}/*.md -> coverImage), and emits responsive
// AVIF + WebP variants sized to the real rendered width of
// `.article-cover img` (max-width: 800px, mobile calc(100vw - 48px)).
//
// Contract:
//   * original files are never moved, overwritten or deleted;
//   * variants land in /public/images/optimized/blog-covers (git-ignored),
//     so no existing image URL changes anywhere in the site;
//   * JPEG stays as the <img> fallback, so no-<picture> browsers are fine;
//   * a manifest (src/data/blog-cover-manifest.json, git-ignored) records
//     natural width/height per cover so the template can reserve space
//     (CLS) and build srcset without guessing.
//
// Re-run is cheap: outputs newer than their source are skipped.
// ------------------------------------------------------------------
import sharp from 'sharp';
import { mkdir, readdir, readFile, stat, writeFile, unlink } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PUB = join(ROOT, 'public');
const BLOG = join(ROOT, 'src', 'content', 'blog');
const OUT = join(PUB, 'images', 'optimized', 'blog-covers');
const MANIFEST = join(ROOT, 'src', 'data', 'blog-cover-manifest.json');
const COVER_DIR = '/images/optimized/blog-covers';

// Rendered widths measured on the live site (2026-11-16):
//   390 CSS px viewport -> 342 px image
//   768 -> 720 px, 1440 -> 800 px (wrapper max-width)
// Rungs cover DPR 1 / 2 / 3 without enlarging past the source.
const RUNGS = [480, 800, 1200, 1600];
const AVIF = { quality: 60, effort: 4, chromaSubsampling: '4:2:0' };
const WEBP = { quality: 78, effort: 5 };

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (entry.name.endsWith('.md')) out.push(p);
  }
  return out;
}

// Frontmatter values may be double-quoted, single-quoted or bare.
function coverFrom(txt) {
  const m = txt.match(/^\s*coverImage\s*:\s*(?:"([^"]+)"|'([^']+)'|(\S+))\s*$/m);
  if (!m) return null;
  return (m[1] || m[2] || m[3] || '').trim() || null;
}

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
  const files = await walk(BLOG);
  const sources = new Map(); // src -> usage count
  for (const f of files) {
    const cover = coverFrom(await readFile(f, 'utf8'));
    if (!cover) continue;
    sources.set(cover, (sources.get(cover) || 0) + 1);
  }
  if (sources.size === 0) throw new Error('No coverImage found in blog frontmatter');
  if (process.env.S1_LIMIT) sources.forEach((_, k) => { if (sources.size > Number(process.env.S1_LIMIT)) sources.delete(k); });

  await mkdir(OUT, { recursive: true });
  let generated = 0;
  let skipped = 0;
  let failed = 0;
  const manifest = {};
  const expected = new Set();

  for (const src of [...sources.keys()].sort()) {
    const abs = join(PUB, src.replace(/^\//, ''));
    try {
      await stat(abs);
    } catch {
      throw new Error(`Missing blog cover source image: ${src}`);
    }

    const meta = await sharp(abs).metadata();
    if (!meta.width || !meta.height) throw new Error(`Cannot read dimensions: ${src}`);

    const base = variantBase(src);
    const widths = RUNGS.filter((w) => w <= meta.width);
    if (widths.length === 0) widths.push(meta.width);
    const entries = [];

    for (const w of widths) {
      // withoutEnlargement => output width is capped at the natural width.
      const outWidth = Math.min(w, meta.width);
      entries.push({ width: outWidth, avif: `${base}-${w}.avif`, webp: `${base}-${w}.webp` });
      for (const fmt of ['avif', 'webp']) {
        const out = join(OUT, `${base}-${w}.${fmt}`);
        expected.add(`${base}-${w}.${fmt}`);
        if (await fresh(out, abs)) {
          skipped++;
          continue;
        }
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
    manifest[src] = { width: meta.width, height: meta.height, dir: COVER_DIR, variants: entries };
  }

  // Drop variants whose source cover is no longer referenced anywhere.
  if (!process.env.S1_LIMIT) {
    for (const name of await readdir(OUT)) {
      if (!expected.has(name)) {
        await unlink(join(OUT, name));
        console.log(`  pruned ${name}`);
      }
    }
  }

  if (process.env.S1_LIMIT) {
    console.log(`[optimize-blog-covers] TEST RUN (S1_LIMIT=${process.env.S1_LIMIT}) — manifest not written`);
    return;
  }

  await mkdir(dirname(MANIFEST), { recursive: true });
  const json = JSON.stringify(manifest, null, 1) + '\n';
  await writeFile(MANIFEST, json, 'utf8');

  console.log(
    `[optimize-blog-covers] covers=${sources.size} rungs=${RUNGS.join('/')} generated=${generated} skipped=${skipped} failed=${failed} manifest=${(Buffer.byteLength(json) / 1024).toFixed(1)}KB`
  );
  if (failed) throw new Error(`${failed} variant(s) failed to encode`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
