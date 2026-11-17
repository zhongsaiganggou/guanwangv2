// tools/migrate-hero-bg.mjs — one-shot S2 codemod: replace inline hero-bg
// <div style="background-image"> with <HeroBg src variant /> component.
// Idempotent: files already containing HeroBg are skipped.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PAGES = join(ROOT, 'src', 'pages');
const COMPONENTS = join(ROOT, 'src', 'components');
const RE = /<div class="(detail|hub)-hero-bg"[^>]*?url\('([^']+)'\)[^>]*><\/div>/g;

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith('.astro')) out.push(p);
  }
  return out;
}

let touched = 0, skipped = 0;
for (const f of await walk(PAGES)) {
  let txt = await readFile(f, 'utf8');
  if (!RE.test(txt)) continue;
  RE.lastIndex = 0;
  const rel = '/' + relative(dirname(f), COMPONENTS).replace(/\\/g, '/') + '/HeroBg.astro';
  txt = txt.replace(RE, (_m, kind, src) => `<HeroBg src="${src}" variant="${kind}" />`);
  if (!txt.includes("HeroBg.astro'")) {
    txt = txt.replace(/^---\r?\n/, `---\nimport HeroBg from '${rel}';\n`);
  }
  await writeFile(f, txt, 'utf8');
  touched++;
  console.log('  patched', f.replace(ROOT, ''));
}
console.log(`[migrate-hero-bg] touched=${touched} skipped=${skipped}`);
