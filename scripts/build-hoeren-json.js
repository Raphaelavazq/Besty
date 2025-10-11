#!/usr/bin/env node

/**
 * DTZ Hören JSON Builder
 * Converts YAML front-matter content files to test JSON files
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = "./content/hoeren";
const OUTPUT_DIR = "./public/data";

// Ensure gray-matter is available
let grayMatter;
try {
  grayMatter = matter;
} catch (error) {
  console.error("Please install gray-matter: npm install gray-matter");
  process.exit(1);
}

function loadContentFiles() {
  const files = [];

  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Content directory not found: ${CONTENT_DIR}`);
    return files;
  }

  const markdownFiles = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"));

  for (const filename of markdownFiles) {
    try {
      const content = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8");
      const parsed = grayMatter(content);

      if (parsed.data.id && parsed.data.src && parsed.data.items) {
        files.push({
          filename,
          ...parsed.data,
          content: parsed.content,
        });
      }
    } catch (error) {
      console.warn(`Warning: Could not parse ${filename}:`, error.message);
    }
  }

  return files;
}

function generateFullTest(files) {
  // Group files by part
  const parts = {
    teil1: files.filter((f) => f.part === "teil1"),
    teil2: files.filter((f) => f.part === "teil2"),
    teil3: files.filter((f) => f.part === "teil3"),
    teil4: files.filter((f) => f.part === "teil4"),
  };

  let currentTime = 0;
  const tracks = [];

  // Process each part
  for (const [partId, partFiles] of Object.entries(parts)) {
    if (partFiles.length === 0) continue;

    const questions = [];
    let partDuration = 0;

    for (const file of partFiles) {
      for (const item of file.items) {
        questions.push({
          id: `${partId}-q${item.q}`,
          timestamp: currentTime + (item.start || 0),
          duration: (item.end || file.duration) - (item.start || 0),
          questionText: item.prompt,
          context: file.topic,
          options: item.options,
          correctAnswer: item.answer,
          explanation: item.rationale,
          audioFile: file.src,
        });
      }
      partDuration += file.duration || 30;
    }

    tracks.push({
      id: partId,
      title: getPartTitle(partId),
      startTime: currentTime,
      endTime: currentTime + partDuration,
      questions,
    });

    currentTime += partDuration + 30; // Add buffer time
  }

  return {
    id: "dtz-local-fulltest",
    section: "hoeren",
    title: "DTZ B1 Hörprüfung - Volltest (Lokal)",
    subtitle: "Basierend auf lokalen Audio-Dateien",
    level: "A2-B1",
    duration: `${Math.ceil(currentTime / 60)} min`,
    type: "synchronized-audio",
    audioUrl: "/audio/sync-test.mp3", // Placeholder - will be multiple files
    instructions:
      "Vollständiger DTZ Hörtest mit lokalen Audio-Dateien. Die Fragen erscheinen automatisch zur richtigen Zeit.",
    meta: {
      label: "Lokaler Hören-Test (25')",
      source: "Lokale Audios im Repo",
      durationSec: currentTime,
      examMode: true,
      notes: "Nur zur persönlichen Prüfungsvorbereitung.",
    },
    parts: tracks.map((track) => ({
      id: track.id,
      title: track.title,
      startTime: track.startTime,
      endTime: track.endTime,
    })),
    questions: tracks.flatMap((track) => track.questions),
    mapping: {
      scoreToLevel: {
        B1: ">=33",
        A2: ">=20",
        unterA2: "<20",
      },
      totalHLItems: tracks.reduce(
        (sum, track) => sum + track.questions.length,
        0
      ),
    },
  };
}

function generateTeilTests(files) {
  const tests = [];
  const parts = ["teil1", "teil2", "teil3", "teil4"];

  for (const part of parts) {
    const partFiles = files.filter((f) => f.part === part);
    if (partFiles.length === 0) continue;

    const questions = [];
    let currentTime = 0;

    for (const file of partFiles) {
      for (const item of file.items) {
        questions.push({
          id: `${part}-q${item.q}`,
          timestamp: currentTime + (item.start || 0),
          duration: (item.end || file.duration) - (item.start || 0),
          questionText: item.prompt,
          context: file.topic,
          options: item.options,
          correctAnswer: item.answer,
          explanation: item.rationale,
        });
      }
      currentTime += (file.duration || 30) + 10; // Add buffer
    }

    tests.push({
      id: `dtz-local-${part}`,
      section: "hoeren",
      title: `DTZ ${getPartTitle(part)} (Lokal)`,
      subtitle: "Lokale Audio-Dateien",
      level: "A2-B1",
      duration: `${Math.ceil(currentTime / 60)} min`,
      type: "synchronized-audio",
      audioUrl: partFiles[0]?.src || "/audio/sync-test.mp3",
      instructions: `${getPartTitle(part)} mit lokalen Audio-Dateien.`,
      questions,
      meta: {
        durationSec: currentTime,
        examMode: false,
        notes: "Nur zur persönlichen Prüfungsvorbereitung.",
      },
    });
  }

  return tests;
}

function generateDrillTest(files) {
  // Create random drill questions from all available content
  const allItems = [];

  for (const file of files) {
    for (const item of file.items) {
      allItems.push({
        id: `drill-${file.id}-q${item.q}`,
        timestamp: 0, // Will be randomized
        duration: 30,
        questionText: item.prompt,
        context: file.topic,
        options: item.options,
        correctAnswer: item.answer,
        explanation: item.rationale,
        audioFile: file.src,
        part: file.part,
      });
    }
  }

  // Shuffle and take a subset for quick drill
  const shuffled = allItems.sort(() => Math.random() - 0.5);
  const drillQuestions = shuffled.slice(0, Math.min(10, allItems.length));

  return {
    id: "dtz-local-drills",
    section: "hoeren",
    title: "DTZ Hören - Schnell-Training (Lokal)",
    subtitle: "Zufällige Auswahl aus lokalen Audios",
    level: "A2-B1",
    duration: "8-12 min",
    type: "random-drill",
    instructions: "Kurze Hörübungen mit zufällig ausgewählten Fragen.",
    questions: drillQuestions,
    meta: {
      durationSec: drillQuestions.length * 45, // ~45 sec per question
      examMode: false,
      randomized: true,
      maxQuestions: 10,
      notes: "Nur zur persönlichen Prüfungsvorbereitung.",
    },
  };
}

function getPartTitle(partId) {
  const titles = {
    teil1: "Teil 1: Ansagen am Telefon und öffentliche Durchsagen",
    teil2: "Teil 2: Radio-Ansagen",
    teil3: "Teil 3: Alltagsgespräche",
    teil4: "Teil 4: Radiobeitrag",
  };
  return titles[partId] || partId;
}

function buildAllTests() {
  console.log("📝 Loading content files...");
  const files = loadContentFiles();

  if (files.length === 0) {
    console.warn(
      "⚠️  No content files found. Create .md files in ./content/hoeren/"
    );
    return;
  }

  console.log(`📋 Found ${files.length} content files`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Generate Full Test
  console.log("🏗️  Building Full Test...");
  const fullTest = generateFullTest(files);
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "dtz-local-fulltest.json"),
    JSON.stringify(fullTest, null, 2)
  );

  // Generate Teil Tests
  console.log("🔧 Building Teil Tests...");
  const teilTests = generateTeilTests(files);
  for (const test of teilTests) {
    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${test.id}.json`),
      JSON.stringify(test, null, 2)
    );
  }

  // Generate Drill Test
  console.log("🎯 Building Drill Test...");
  const drillTest = generateDrillTest(files);
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "dtz-local-drills.json"),
    JSON.stringify(drillTest, null, 2)
  );

  console.log("✅ All test files generated successfully!");
  console.log(`📊 Generated:`);
  console.log(
    `   - 1 Full Test (${fullTest.questions?.length || 0} questions)`
  );
  console.log(`   - ${teilTests.length} Teil Tests`);
  console.log(
    `   - 1 Drill Test (${drillTest.questions?.length || 0} questions)`
  );
}

// Simple fallback for gray-matter if not available
if (!grayMatter) {
  function parseMarkdownWithFrontmatter(content) {
    const lines = content.split("\n");
    if (lines[0] !== "---") return { data: {}, content };

    const frontmatterEnd = lines.indexOf("---", 1);
    if (frontmatterEnd === -1) return { data: {}, content };

    const frontmatter = lines.slice(1, frontmatterEnd).join("\n");
    const body = lines.slice(frontmatterEnd + 1).join("\n");

    // Very basic YAML parsing (for demo purposes)
    const data = {};
    frontmatter.split("\n").forEach((line) => {
      const match = line.match(/^(\w+):\s*(.+)$/);
      if (match) {
        data[match[1]] = match[2].replace(/['"]/g, "");
      }
    });

    return { data, content: body };
  }

  grayMatter = parseMarkdownWithFrontmatter;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildAllTests();
}

export { buildAllTests };
