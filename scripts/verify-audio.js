const fs = require("fs");
const path = require("path");

const qBankPath = path.join(
  __dirname,
  "..",
  "src",
  "features",
  "hoeren",
  "data",
  "questionBank.js"
);
const audioDir = path.join(__dirname, "..", "public", "audio", "hoeren");

const file = fs.readFileSync(qBankPath, "utf8");

// Simple regex to extract '/audio/hoeren/...mp3' occurrences
const regex = /['"](\/audio\/hoeren\/[\w\-_.]+\.mp3)['"]/g;
let match;
const refs = new Set();
while ((match = regex.exec(file)) !== null) {
  refs.add(match[1]);
}

console.log("Found", refs.size, "audio references in questionBank.js");

const missing = [];
for (const ref of refs) {
  const filename = ref.replace("/audio/hoeren/", "");
  const filePath = path.join(audioDir, filename);
  if (!fs.existsSync(filePath)) {
    missing.push({ ref, filePath });
  }
}

if (missing.length === 0) {
  console.log("All referenced audio files exist in public/audio/hoeren");
} else {
  console.log("Missing audio files:");
  missing.forEach((m) => console.log("-", m.ref, "->", m.filePath));
  process.exitCode = 2;
}
