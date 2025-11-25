/**
 * Translation Script for Einbürgerungstest Questions
 * Uses DeepL Free API to translate questions into multiple languages
 *
 * Setup:
 * 1. Sign up for DeepL Free API: https://www.deepl.com/pro-api
 * 2. Get your API key (no credit card required)
 * 3. Set environment variable: export DEEPL_API_KEY="your-key-here"
 * 4. Run: node scripts/translate-questions.js
 *
 * Free tier: 500,000 characters/month (more than enough for 460 questions)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DeepL API configuration
const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const DEEPL_API_URL = "https://api-free.deepl.com/v2/translate";

// Target languages (DeepL language codes)
const LANGUAGES = {
  en: "English",
  "pt-PT": "Portuguese (Portugal)",
  ar: "Arabic",
  tr: "Turkish",
  ru: "Russian",
  es: "Spanish",
  fr: "French",
  it: "Italian",
  pl: "Polish",
  uk: "Ukrainian",
};

// Paths
const QUESTIONS_PATH = path.join(
  __dirname,
  "../public/data/einbuergerungstest/questions.json"
);
const TRANSLATIONS_DIR = path.join(
  __dirname,
  "../public/data/einbuergerungstest/translations"
);

/**
 * Translate text using DeepL API
 */
async function translateText(text, targetLang) {
  if (!DEEPL_API_KEY) {
    throw new Error("DEEPL_API_KEY environment variable not set");
  }

  const params = new URLSearchParams({
    auth_key: DEEPL_API_KEY,
    text: text,
    source_lang: "DE",
    target_lang: targetLang,
    preserve_formatting: "1",
  });

  try {
    const response = await fetch(DEEPL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `DeepL API error: ${error.message || response.statusText}`
      );
    }

    const data = await response.json();
    return data.translations[0].text;
  } catch (error) {
    console.error(`Translation error for target ${targetLang}:`, error.message);
    throw error;
  }
}

/**
 * Add delay between API calls to respect rate limits
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Translate a single question object
 */
async function translateQuestion(question, targetLang, index, total) {
  console.log(
    `[${targetLang}] Translating question ${index + 1}/${total} (ID: ${question.id})...`
  );

  try {
    const translated = {
      id: question.id,
      category: question.category,
      bundesland: question.bundesland,
      question: await translateText(question.question, targetLang),
      options: [],
      correctAnswer: question.correctAnswer,
      imageUrl: question.imageUrl,
      tags: question.tags,
    };

    // Translate each option
    for (let i = 0; i < question.options.length; i++) {
      await delay(100); // Small delay between options
      translated.options.push(
        await translateText(question.options[i], targetLang)
      );
    }

    await delay(200); // Delay between questions to respect rate limits

    return translated;
  } catch (error) {
    console.error(
      `Failed to translate question ${question.id}:`,
      error.message
    );
    return null;
  }
}

/**
 * Main translation function
 */
async function translateQuestions() {
  console.log("🌍 Einbürgerungstest Translation Script\n");

  // Check API key
  if (!DEEPL_API_KEY) {
    console.error("❌ Error: DEEPL_API_KEY environment variable not set");
    console.log("\n📝 Setup instructions:");
    console.log("1. Sign up for DeepL Free API: https://www.deepl.com/pro-api");
    console.log("2. Get your API key (no credit card required)");
    console.log(
      '3. Set environment variable: export DEEPL_API_KEY="your-key-here"'
    );
    console.log("4. Run: node scripts/translate-questions.js\n");
    process.exit(1);
  }

  // Load questions
  console.log("📖 Loading questions from questions.json...");
  const questionsData = JSON.parse(fs.readFileSync(QUESTIONS_PATH, "utf-8"));
  const questions = questionsData.questions;
  console.log(`✓ Loaded ${questions.length} questions\n`);

  // Create translations directory
  if (!fs.existsSync(TRANSLATIONS_DIR)) {
    fs.mkdirSync(TRANSLATIONS_DIR, { recursive: true });
    console.log("✓ Created translations directory\n");
  }

  // Translate to each language
  for (const [langCode, langName] of Object.entries(LANGUAGES)) {
    console.log(`\n🔄 Translating to ${langName} (${langCode})...`);
    console.log("─".repeat(50));

    const translatedQuestions = [];
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < questions.length; i++) {
      const translated = await translateQuestion(
        questions[i],
        langCode,
        i,
        questions.length
      );

      if (translated) {
        translatedQuestions.push(translated);
        successCount++;
      } else {
        errorCount++;
        // Keep original German version as fallback
        translatedQuestions.push(questions[i]);
      }

      // Progress update every 50 questions
      if ((i + 1) % 50 === 0) {
        console.log(
          `Progress: ${i + 1}/${questions.length} (${successCount} success, ${errorCount} errors)`
        );
      }
    }

    // Save translated file
    const outputPath = path.join(
      TRANSLATIONS_DIR,
      `questions-${langCode}.json`
    );
    const outputData = {
      ...questionsData,
      language: langCode,
      languageName: langName,
      translatedAt: new Date().toISOString(),
      questions: translatedQuestions,
    };

    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), "utf-8");

    console.log(
      `\n✅ ${langName} complete: ${successCount}/${questions.length} translated`
    );
    console.log(`   Saved to: translations/questions-${langCode}.json`);

    if (errorCount > 0) {
      console.log(`   ⚠️  ${errorCount} questions used German fallback`);
    }

    // Longer delay between languages
    if (
      Object.keys(LANGUAGES).indexOf(langCode) <
      Object.keys(LANGUAGES).length - 1
    ) {
      console.log("   Waiting 2 seconds before next language...");
      await delay(2000);
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("🎉 Translation complete!");
  console.log("\n📁 Translated files saved in:");
  console.log(`   ${TRANSLATIONS_DIR}`);
  console.log("\n📊 Available languages:");
  Object.entries(LANGUAGES).forEach(([code, name]) => {
    console.log(`   - ${name} (${code})`);
  });
  console.log("\n✨ Total questions per language: " + questions.length);
}

// Run the script
translateQuestions().catch((error) => {
  console.error("\n❌ Fatal error:", error.message);
  process.exit(1);
});
