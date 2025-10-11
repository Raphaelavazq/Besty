#!/usr/bin/env node

/**
 * Audio Scanning Script for DTZ B1 Bestie
 * Scans /public/audio for MP3 files and generates audio-catalog.json
 */

import fs from "fs";
import path from "path";

const AUDIO_DIR = "./public/audio";
const OUTPUT_FILE = "./public/data/audio-catalog.json";

function scanAudioFiles(dir, basePath = "") {
  const files = [];

  try {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = path.join(basePath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Recursively scan subdirectories
        files.push(...scanAudioFiles(fullPath, relativePath));
      } else if (path.extname(item).toLowerCase() === ".mp3") {
        // Generate ID from file path
        const id = relativePath
          .replace(/\.mp3$/i, "")
          .replace(/[^a-zA-Z0-9]/g, "_")
          .toLowerCase();

        // Determine tags based on file path and name
        const tags = [];
        if (relativePath.includes("telcDB1")) tags.push("dtz", "telc");
        if (relativePath.includes("Auf_jeden_Fall"))
          tags.push("b1", "practice");
        if (relativePath.includes("hoeren")) tags.push("listening");
        if (relativePath.includes("sync")) tags.push("test", "sync");

        // Determine part based on file naming
        let part = "unknown";
        if (
          relativePath.includes("Track01") ||
          relativePath.includes("Track02") ||
          relativePath.includes("Track03") ||
          relativePath.includes("Track04")
        ) {
          part = "teil1";
        } else if (
          relativePath.includes("Track05") ||
          relativePath.includes("Track06") ||
          relativePath.includes("Track07") ||
          relativePath.includes("Track08") ||
          relativePath.includes("Track09")
        ) {
          part = "teil2";
        }

        files.push({
          id,
          src: `/${relativePath.replace(/\\/g, "/")}`,
          filename: item,
          size: stat.size,
          durationSec: null, // Will be filled later if needed
          tags: tags.length > 0 ? tags : ["unknown"],
          part,
          notes: "",
          lastModified: stat.mtime.toISOString(),
        });
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message);
  }

  return files;
}

function generateCatalog() {
  console.log("🎧 Scanning audio files...");

  if (!fs.existsSync(AUDIO_DIR)) {
    console.error(`❌ Audio directory not found: ${AUDIO_DIR}`);
    process.exit(1);
  }

  const files = scanAudioFiles(AUDIO_DIR);

  const catalog = {
    generated: new Date().toISOString(),
    totalFiles: files.length,
    summary: {
      byTags: {},
      byPart: {},
      totalSize: 0,
    },
    files,
  };

  // Generate summary statistics
  files.forEach((file) => {
    catalog.summary.totalSize += file.size;

    // Count by tags
    file.tags.forEach((tag) => {
      catalog.summary.byTags[tag] = (catalog.summary.byTags[tag] || 0) + 1;
    });

    // Count by part
    catalog.summary.byPart[file.part] =
      (catalog.summary.byPart[file.part] || 0) + 1;
  });

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write catalog file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(catalog, null, 2));

  console.log(`✅ Audio catalog generated: ${OUTPUT_FILE}`);
  console.log(`📊 Found ${files.length} audio files`);
  console.log(
    `📦 Total size: ${(catalog.summary.totalSize / 1024 / 1024).toFixed(1)} MB`
  );
  console.log("📋 Tags:", Object.keys(catalog.summary.byTags).join(", "));
  console.log("🎯 Parts:", Object.keys(catalog.summary.byPart).join(", "));

  return catalog;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateCatalog();
}

export { generateCatalog };
