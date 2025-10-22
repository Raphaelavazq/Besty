import fs from "fs/promises";
import path from "path";

const manifestPath = path.resolve("data/bild-beschreiben.json");

async function run() {
  const raw = await fs.readFile(manifestPath, "utf8");
  const data = JSON.parse(raw);
  const preserve = new Set(["1", "2"]);
  let changed = 0;

  // Regex to remove leading "Thema: <anything up to the first sentence terminator>. "
  const temaRegex = /^\s*Thema:\s*[^.?!]*[.?!]\s*/i;

  for (const theme of Object.keys(data.themes || {})) {
    for (const img of data.themes[theme]) {
      if (preserve.has(String(img.id))) continue;
      if (typeof img.description === "string") {
        const newDesc = img.description.replace(temaRegex, "");
        if (newDesc !== img.description) {
          img.description = newDesc;
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
      `Removed full 'Thema: ...' prefix from ${changed} descriptions and wrote ${manifestPath}`
    );
  } else {
    console.log("No descriptions needed changing");
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
