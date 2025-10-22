#!/usr/bin/env node
// Validate data/bild-beschreiben.json integrity (ES module)
import fs from "fs";
import path from "path";

const manifestPath = path.resolve(process.cwd(), "data/bild-beschreiben.json");
const imagesDir = path.resolve(
  process.cwd(),
  "public/images/sprechen/bild-beschreiben"
);

if (!fs.existsSync(manifestPath)) {
  console.error("Manifest not found:", manifestPath);
  process.exit(2);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
let hasError = false;
Object.keys(manifest.themes || {}).forEach((themeId) => {
  const imgs = manifest.themes[themeId];
  if (!Array.isArray(imgs) || imgs.length === 0) {
    console.warn(`Theme ${themeId} has no images`);
  }
  imgs.forEach((img) => {
    const filePath = path.resolve(process.cwd(), `public${img.file}`);
    if (!fs.existsSync(filePath)) {
      console.error(`Missing file for ${img.file} (theme: ${themeId})`);
      hasError = true;
    }
    if (!img.alt || img.alt.trim() === "") {
      console.warn(`Missing alt text for ${img.file} (theme: ${themeId})`);
    }
  });
});

if (hasError) process.exit(3);
console.log("Validation finished — no missing files.");
process.exit(0);
