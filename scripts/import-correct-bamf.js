#!/usr/bin/env node

/**
 * Import correctly-ordered BAMF questions from ebtest.org
 * Converts to Besty format with proper numbering
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read ebtest.org data
const ebtestData = JSON.parse(
  fs.readFileSync("/tmp/ebtest-correct.json", "utf8")
);

console.log(`📥 Processing ${ebtestData.length} questions from ebtest.org...`);

// Bundesländer in order
const bundeslaender = [
  "Baden-Württemberg",
  "Bayern",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hessen",
  "Mecklenburg-Vorpommern",
  "Niedersachsen",
  "Nordrhein-Westfalen",
  "Rheinland-Pfalz",
  "Saarland",
  "Sachsen",
  "Sachsen-Anhalt",
  "Schleswig-Holstein",
  "Thüringen",
];

// Map ebtest categories to Besty categories
const categoryMap = {
  Recht: "Politik in der Demokratie",
  Staat: "Politik in der Demokratie",
  Politik: "Politik in der Demokratie",
  Geschichte: "Geschichte und Verantwortung",
  "Gesellschaft und Familie": "Mensch und Gesellschaft",
};

// Convert questions
const questions = ebtestData.map((q, index) => {
  const questionNum = index + 1;
  const isStateQuestion = questionNum > 300;

  // Map category or keep if it's a Bundesland
  let category = categoryMap[q.category] || q.category;

  // Determine type and originalNum
  let type = "general";
  let originalNum = questionNum.toString();

  if (isStateQuestion) {
    // State questions: 301-310 = BW, 311-320 = BY, etc.
    const stateIndex = Math.floor((questionNum - 301) / 10);
    const stateQuestionNum = ((questionNum - 301) % 10) + 1;
    const stateName = bundeslaender[stateIndex];

    type = "state";
    originalNum = questionNum.toString();
    category = stateName; // State questions have state as category
  }

  return {
    id: questionNum,
    type: type,
    category: category,
    bundesland: isStateQuestion
      ? bundeslaender[Math.floor((questionNum - 301) / 10)]
      : undefined,
    question: q.question,
    options: q.answers,
    correctAnswer: q.correct,
    originalNum: originalNum,
  };
});

// Create output
const output = {
  metadata: {
    version: "2025",
    source: "BAMF Official via ebtest.org - Stand: 07.05.2025",
    totalQuestions: 460,
    generalQuestions: 300,
    stateQuestions: 160,
    lastUpdated: new Date().toISOString().split("T")[0],
    examStructure: {
      totalQuestions: 33,
      generalQuestions: 30,
      stateQuestions: 3,
      passingScore: 17,
      timeLimit: "60 minutes",
    },
    note: "Official BAMF question order - exactly as in official catalog",
  },
  categories: [
    "Politik in der Demokratie",
    "Geschichte und Verantwortung",
    "Mensch und Gesellschaft",
  ],
  bundeslaender: bundeslaender,
  questions: questions,
};

// Write to public/data
const outputPath = path.join(
  __dirname,
  "../public/data/einbuergerungstest/questions.json"
);
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log("✅ Conversion complete!");
console.log(`   Questions 1-300: General questions`);
console.log(`   Questions 301-460: State questions (10 per state × 16 states)`);
console.log(`   Q1: "${questions[0].question.substring(0, 60)}..."`);
console.log(`   Q300: "${questions[299].question.substring(0, 60)}..."`);
console.log(
  `   Q301: "${questions[300].question.substring(0, 60)}..." (${questions[300].category})`
);
console.log(`\n📄 Written to: ${outputPath}`);
