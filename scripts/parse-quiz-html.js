/**
 * Parse Klett Quiz HTML files and extract vocabulary questions
 * Converts HTML quiz data to JSON format for the theme system
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUIZ_DIR = path.join(
  __dirname,
  "../public/data/dtz/Britta Weber et al - Mit Erfolg zum Deutsch-Test für Zuwanderer - 2023 Quiz"
);
const OUTPUT_DIR = path.join(__dirname, "../public/data/themes");

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Extract questions array from HTML file
 */
function extractQuestions(htmlContent) {
  // Find the questions array in JavaScript
  const match = htmlContent.match(/var questions = (\[.*?\]);/s);
  if (!match) {
    console.warn("No questions array found");
    return [];
  }

  try {
    // Parse the JSON array
    const questionsJson = match[1];
    const questions = JSON.parse(questionsJson);
    return questions;
  } catch (error) {
    console.error("Error parsing questions:", error);
    return [];
  }
}

/**
 * Convert filename to theme ID and name
 */
function getThemeInfo(filename) {
  // Remove prefix and extension
  const themeName = filename
    .replace("676863_MEzDTZ_Quiz_", "")
    .replace(".html", "")
    .replace(/ae/g, "ä")
    .replace(/oe/g, "ö")
    .replace(/ue/g, "ü");

  // Create slug for ID
  const themeId = themeName
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/ /g, "-")
    .replace(/ und /g, "-");

  return { id: themeId, name: themeName };
}

/**
 * Process a single quiz HTML file
 */
function processQuizFile(filename) {
  const filePath = path.join(QUIZ_DIR, filename);
  console.log(`Processing: ${filename}`);

  try {
    const htmlContent = fs.readFileSync(filePath, "utf-8");
    const rawQuestions = extractQuestions(htmlContent);

    if (rawQuestions.length === 0) {
      console.warn(`No questions found in ${filename}`);
      return null;
    }

    const { id, name } = getThemeInfo(filename);

    // Transform questions to our format
    const questions = rawQuestions.map((q, index) => ({
      id: index + 1,
      type: "fill-in-blank",
      question: q.Q.replace(/<b>\.\.\.< \/b>/g, "___"), // Replace bold ... with blank
      options: q.C, // Choices array
      correctAnswer: q.A - 1, // Convert from 1-based to 0-based index
    }));

    const themeData = {
      id,
      name,
      description: `Wortschatz und Grammatik zum Thema: ${name}`,
      questionCount: questions.length,
      questions,
    };

    // Write to JSON file
    const outputPath = path.join(OUTPUT_DIR, `${id}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(themeData, null, 2), "utf-8");
    console.log(`✅ Created: ${outputPath} (${questions.length} questions)`);

    return { id, name, questionCount: questions.length };
  } catch (error) {
    console.error(`Error processing ${filename}:`, error.message);
    return null;
  }
}

/**
 * Main function
 */
function main() {
  console.log("🔍 Scanning quiz HTML files...\n");

  if (!fs.existsSync(QUIZ_DIR)) {
    console.error(`Quiz directory not found: ${QUIZ_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(QUIZ_DIR)
    .filter((f) => f.endsWith(".html") && f.startsWith("676863_MEzDTZ_Quiz_"));

  console.log(`Found ${files.length} quiz files\n`);

  const themes = [];
  files.forEach((file) => {
    const result = processQuizFile(file);
    if (result) {
      themes.push(result);
    }
  });

  // Create themes index file
  const indexPath = path.join(OUTPUT_DIR, "index.json");
  fs.writeFileSync(indexPath, JSON.stringify({ themes }, null, 2), "utf-8");
  console.log(`\n✅ Created themes index: ${indexPath}`);

  console.log(
    `\n🎉 Done! Processed ${themes.length} themes with ${themes.reduce((sum, t) => sum + t.questionCount, 0)} total questions`
  );
}

main();
