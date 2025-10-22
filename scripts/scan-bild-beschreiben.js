#!/usr/bin/env node
// Scan public images and emit data/bild-beschreiben.json
// Basic scanner: maps numeric filenames (1-15) to known theme IDs; extras go to misc.
import fs from "fs";
import path from "path";

const imagesDir = path.resolve(
  process.cwd(),
  "public/images/sprechen/bild-beschreiben"
);
const outFile = path.resolve(process.cwd(), "data/bild-beschreiben.json");
const thumbsDir = path.join(imagesDir, "thumbs");

const mapping = {
  1: "lernen-bildung",
  2: "familie-kinder",
  3: "familie-kinder",
  4: "einkaufen",
  5: "gesundheit",
  6: "wohnen",
  7: "arbeit-beruf",
  8: "essen-trinken",
  9: "reisen-verkehr",
  10: "medien-kommunikation",
  11: "sport-fitness",
  12: "natur-umwelt",
  13: "feste-feiern",
  14: "freizeit",
  15: "freundschaft",
};

function scan() {
  if (!fs.existsSync(imagesDir)) {
    console.error("Images directory not found:", imagesDir);
    process.exit(1);
  }

  const allowedExt = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
  const files = fs.readdirSync(imagesDir).filter((f) => {
    if (f.startsWith(".") || f === "thumbs") return false;
    const ext = path.extname(f).toLowerCase();
    return allowedExt.has(ext);
  });
  // try to use sharp for thumbnails if available
  let sharp = null;
  try {
    sharp = require("sharp");
    if (!fs.existsSync(thumbsDir)) fs.mkdirSync(thumbsDir);
  } catch (e) {
    sharp = null;
  }
  const themes = {};
  files.forEach((file) => {
    const ext = path.extname(file).toLowerCase();
    const name = path.basename(file, ext);
    const id = name; // numeric for current setup
    const themeId = mapping[id] || "misc";
    if (!themes[themeId]) themes[themeId] = [];
    const filePath = path.join(imagesDir, file);
    const relative = `/images/sprechen/bild-beschreiben/${file}`;
    const imgObj = { id: id, file: relative, alt: "" };
    if (sharp) {
      const outThumb = path.join(thumbsDir, `${name}-thumb.jpg`);
      sharp(filePath)
        .resize(640, 480, { fit: "cover" })
        .jpeg({ quality: 80 })
        .toFile(outThumb)
        .catch(() => {});
      imgObj.thumb = `/images/sprechen/bild-beschreiben/thumbs/${name}-thumb.jpg`;
    }
    themes[themeId].push(imgObj);
  });

  const out = { themes };
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(out, null, 2), "utf8");
  console.log("Wrote manifest to", outFile);
}

scan();
