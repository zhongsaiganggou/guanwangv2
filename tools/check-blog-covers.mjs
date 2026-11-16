// Integrity check: every manifest variant must decode, and width must match its rung.
import { createRequire } from 'node:module';
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const require = createRequire(import.meta.url);
const sharp = require('sharp');

const ROOT = process.cwd();
const manifest = JSON.parse(readFileSync(join(ROOT, 'src/data/blog-cover-manifest.json'), 'utf8'));
const bad = [];
let n = 0, bytes = 0;
for (const [src, e] of Object.entries(manifest)) {
  for (const v of e.variants) {
    for (const fmt of ['avif', 'webp']) {
      const p = join(ROOT, 'public', e.dir, v[fmt]);
      n++;
      try {
        const st = statSync(p);
        bytes += st.size;
        const meta = await sharp(p).metadata();
        if (!meta.width || meta.width !== v.width) bad.push(`${v[fmt]} width ${meta.width} != ${v.width}`);
        await sharp(p).raw().toBuffer();
      } catch (err) {
        bad.push(`${v[fmt]} ${err.message}`);
      }
    }
  }
}
console.log(`checked=${n} bad=${bad.length} totalMB=${(bytes / 1048576).toFixed(1)}`);
bad.slice(0, 15).forEach((b) => console.log('  -', b));
