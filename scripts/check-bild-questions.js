import fs from "fs";
import path from "path";

const manifestPath = path.resolve("data/bild-beschreiben.json");
const detailPath = path.resolve("src/pages/BildBeschreibenDetail.jsx");

const manifestRaw = fs.readFileSync(manifestPath, "utf8");
const manifest = JSON.parse(manifestRaw);

const detailRaw = fs.readFileSync(detailPath, "utf8");

// helper to find block for a numeric key like '13: { ... }'
function findBlockForId(src, id) {
  const idPattern = new RegExp("\\n\\s*" + id + "\\s*:\\s*{", "g");
  const m = idPattern.exec(src);
  if (!m) return null;
  let idx = m.index + m[0].length - 1; // position at the opening brace
  // find matching closing brace
  let depth = 0;
  let start = src.indexOf("{", idx);
  if (start === -1) return null;
  let i = start;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        return src.slice(start, i + 1);
      }
    }
  }
  return null;
}

// collect all ids from manifest
const ids = [];
for (const theme of Object.values(manifest.themes || {})) {
  for (const img of theme) ids.push(String(img.id));
}

ids.sort((a, b) => Number(a) - Number(b));

const results = [];
for (const id of ids) {
  const block = findBlockForId(detailRaw, id);
  if (!block) {
    // maybe exerciseData has numeric keys without newline formatting; try looser search
    const loose = new RegExp("\\b" + id + "\\s*:\\s*{");
    if (!loose.test(detailRaw)) {
      results.push({ id, status: "no entry in exerciseData" });
      continue;
    }
  }
  const hasQuestions = block && /\bquestions\s*:\s*\[/.test(block);
  const hasAdditional = block && /\badditionalQuestions\s*:\s*\[/.test(block);
  results.push({
    id,
    status: "found",
    hasQuestions: !!hasQuestions,
    hasAdditional: !!hasAdditional,
  });
}

// Also check for ids present in exerciseData but not in manifest (optional)
const exerciseIds = [];
const keyPattern = /\n\s*(\d+)\s*:\s*{/g;
let mm;
while ((mm = keyPattern.exec(detailRaw)) !== null) {
  exerciseIds.push(mm[1]);
}

const extra = exerciseIds.filter((x) => !ids.includes(x));

// print report
console.log("Bild beschreiben questions check");
console.log("---------------------------------");
console.log(`Manifest images: ${ids.length}`);
console.log("");
for (const r of results) {
  if (r.status === "no entry in exerciseData") {
    console.log(`${r.id}: MISSING exerciseData entry`);
  } else {
    console.log(
      `${r.id}: questions=${r.hasQuestions ? "yes" : "no"}, additionalQuestions=${r.hasAdditional ? "yes" : "no"}`
    );
  }
}

console.log("");
console.log(`exerciseData ids (in code): ${exerciseIds.join(", ")}`);
if (extra.length)
  console.log(`exerciseData ids not in manifest: ${extra.join(", ")}`);

// exit code 0
