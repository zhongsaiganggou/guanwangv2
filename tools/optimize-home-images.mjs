// tools/optimize-home-images.mjs
// ------------------------------------------------------------------
// Build-time image optimizer for the EN/ZH homepage.
// Reads the single source-of-truth images under /public and emits
// responsive, compressed AVIF + WebP + JPEG variants into
// /public/images/optimized/home (that folder is git-ignored; the
// generated files are recreated on every build).
//
// Why a script instead of moving files into src/assets:
//   The homepage source images are also referenced by many other
//   pages (about, solution pages, markets, projects-data), so they
//   must stay in /public. This script keeps one source copy and
//   generates optimized derivatives without duplicating sources.
// ------------------------------------------------------------------
import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PUB = join(ROOT, 'public');
const OUT = join(PUB, 'images', 'optimized', 'home');

// Hero: keep source aspect ratio; CSS object-fit:cover fills the box.
// Multiple widths feed an <img srcset> (mobile ~768, tablet ~1280, desktop ~1920).
const HERO = {
  src: 'images/company/factory-aerial-panorama.jpg',
  name: 'hero',
  widths: [768, 1280, 1920],
};

// Application / solution cards: rendered ~420px wide on desktop, so
// 720px covers high-DPI. Fixed-size cards -> one width, <picture> formats.
const SOLUTIONS = [
  { src: 'images/products/app-industrial-workshop-hero.jpg', name: 'sol-industrial', width: 720 },
  { src: 'images/products/app-warehouse-logistics-hero.jpg', name: 'sol-warehouse', width: 720 },
  { src: 'images/products/app-mining-energy-hero.jpg', name: 'sol-mining', width: 720 },
  { src: 'images/products/app-agriculture-livestock.jpg', name: 'sol-agriculture', width: 720 },
  { src: 'images/products/app-commercial-public-building.jpg', name: 'sol-commercial', width: 720 },
  { src: 'images/products/app-transport-infrastructure.jpg', name: 'sol-transport', width: 720 },
];

// Project cards: rendered ~318px wide on desktop, so 640px covers high-DPI.
const PROJECTS = [
  { src: 'images/projects/overseas/singapore-airport-t2-connect.jpg', name: 'proj-singapore', width: 640 },
  { src: 'images/projects/overseas/macau-londoner.jpg', name: 'proj-macau', width: 640 },
  { src: 'images/projects/shantou-luxshare-precision-electronics-aerial-rendering.jpg', name: 'proj-shantou', width: 640 },
  { src: 'images/projects/cnpc-sixth-construction-cracking-furnace-aerial-view.jpg', name: 'proj-cnpc', width: 640 },
];

const FORMATS = ['avif', 'webp', 'jpg'];

async function emit(srcRel, outName, width) {
  const input = join(PUB, srcRel);
  // Fail loudly if a source image is missing rather than silently skipping.
  try {
    await stat(input);
  } catch {
    throw new Error(`Missing homepage source image: ${srcRel}`);
  }
  for (const fmt of FORMATS) {
    const out = join(OUT, `${outName}-${width}.${fmt}`);
    await mkdir(dirname(out), { recursive: true });
    let pipe = sharp(input).rotate().resize({ width, withoutEnlargement: true });
    if (fmt === 'avif') {
      pipe = pipe.avif({ quality: 50, effort: 5, chromaSubsampling: '4:2:0' });
    } else if (fmt === 'webp') {
      pipe = pipe.webp({ quality: 72, effort: 5 });
    } else {
      pipe = pipe.jpeg({ quality: 76, mozjpeg: true });
    }
    const info = await pipe.toFile(out);
    const rel = out.slice(ROOT.length).replace(/\\/g, '/');
    console.log(`  ${rel}  ${(info.size / 1024).toFixed(0)}KB  ${info.width}x${info.height}`);
  }
}

async function main() {
  console.log('[optimize-home-images] generating responsive hero + card images ...');
  for (const w of HERO.widths) {
    await emit(HERO.src, HERO.name, w);
  }
  for (const card of [...SOLUTIONS, ...PROJECTS]) {
    await emit(card.src, card.name, card.width);
  }
  console.log('[optimize-home-images] done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
