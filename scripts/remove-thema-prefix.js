import fs from 'fs/promises';
import path from 'path';

const manifestPath = path.resolve('data/bild-beschreiben.json');

async function run() {
  const raw = await fs.readFile(manifestPath, 'utf8');
  const data = JSON.parse(raw);
  const preserve = new Set(['1','2']);
  let changed = 0;

  for (const theme of Object.keys(data.themes || {})) {
    for (const img of data.themes[theme]) {
      if (preserve.has(String(img.id))) continue;
      if (typeof img.description === 'string') {
        // remove leading 'Thema:' (case sensitive) and an optional following label like 'Thema: X. '
        const trimmed = img.description.replace(/^\s*Thema:\s*/i, '');
        if (trimmed !== img.description) {
          img.description = trimmed;
          changed++;
        }
      }
    }
  }

  if (changed > 0) {
    await fs.writeFile(manifestPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`Removed 'Thema:' prefix from ${changed} descriptions and wrote ${manifestPath}`);
  } else {
    console.log('No descriptions needed changing');
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
