import fs from "fs";
import path from "path";

const manifestPath = path.resolve(process.cwd(), "data/bild-beschreiben.json");
if (!fs.existsSync(manifestPath)) {
  console.error("Manifest not found:", manifestPath);
  process.exit(2);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
let total = 0;
Object.keys(manifest.themes || {}).forEach((theme) => {
  const imgs = manifest.themes[theme];
  total += imgs.length;
  if (!Array.isArray(imgs)) {
    console.error("Invalid theme array for", theme);
    process.exit(3);
  }
});
console.log(
  "Themes:",
  Object.keys(manifest.themes || {}).length,
  "Total images:",
  total
);
process.exit(0);
