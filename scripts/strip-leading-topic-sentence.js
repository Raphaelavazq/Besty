import fs from "fs/promises";
import path from "path";

const manifestPath = path.resolve("data/bild-beschreiben.json");

async function run() {
  const raw = await fs.readFile(manifestPath, "utf8");
  const data = JSON.parse(raw);
  const preserve = new Set(["1", "2"]);
  let changed = 0;

  // Matches a leading sentence ending with . ? or ! including trailing space(s)
  const leadingSentence = /^\s*([^.?!\n]{1,120}[.?!])\s+/;

  for (const theme of Object.keys(data.themes || {})) {
    for (const img of data.themes[theme]) {
      if (preserve.has(String(img.id))) continue;
      if (typeof img.description !== "string") continue;

      const m = img.description.match(leadingSentence);
      if (m) {
        const remainder = img.description.slice(m[0].length);
        // Only strip when remainder starts with 'Auf dem' or 'Auf dem Foto' or 'Auf dem Bild'
        if (
          /^Auf dem( |\b)/i.test(remainder) ||
          /^Auf dem Foto/i.test(remainder) ||
          /^Auf dem Bild/i.test(remainder)
        ) {
          img.description = remainder;
          changed++;
        }
      }
    }
  }

  if (changed > 0) {
    await fs.writeFile(
      manifestPath,
      JSON.stringify(data, null, 2) + "\n",
      "utf8"
    );
    console.log(
      `Stripped leading topic sentence from ${changed} descriptions and wrote ${manifestPath}`
    );
  } else {
    console.log("No descriptions matched the strip criteria");
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
