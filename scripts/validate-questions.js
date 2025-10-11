#!/usr/bin/env node

/**
 * DTZ Question Validation Script
 * Validates YAML question files for correctness and DTZ compliance
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DTZ Standards
const DTZ_STANDARDS = {
  teil1: { minQuestions: 3, maxQuestions: 3, maxDuration: 180 },
  teil2: { minQuestions: 3, maxQuestions: 3, maxDuration: 240 },
  teil3: { minQuestions: 6, maxQuestions: 6, maxDuration: 300 },
  teil4: { minQuestions: 6, maxQuestions: 6, maxDuration: 480 },
};

const REQUIRED_FIELDS = ["audioFile", "title", "part", "level", "questions"];
const VALID_PARTS = ["teil1", "teil2", "teil3", "teil4"];
const VALID_LEVELS = ["A2", "B1", "B2"];
const VALID_QUESTION_TYPES = ["multiple-choice", "true-false"];

class DTZValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.stats = {
      filesProcessed: 0,
      questionsValidated: 0,
      errorsFound: 0,
      warningsFound: 0,
    };
  }

  // Main validation function
  async validate() {
    console.log("🔍 Starting DTZ Question Validation...\n");

    const contentDir = path.join(process.cwd(), "content", "hoeren");

    if (!fs.existsSync(contentDir)) {
      this.addError("Content directory not found: content/hoeren/");
      return this.printResults();
    }

    const files = fs
      .readdirSync(contentDir)
      .filter((file) => file.endsWith(".md"))
      .sort();

    if (files.length === 0) {
      this.addWarning("No .md files found in content/hoeren/");
      return this.printResults();
    }

    console.log(`📁 Found ${files.length} question files to validate\n`);

    for (const file of files) {
      await this.validateFile(path.join(contentDir, file));
    }

    this.printResults();
    return this.errors.length === 0;
  }

  // Validate individual file
  async validateFile(filePath) {
    const filename = path.basename(filePath);
    console.log(`🔍 Validating: ${filename}`);

    this.stats.filesProcessed++;

    try {
      const content = fs.readFileSync(filePath, "utf8");
      const { data: frontMatter, content: markdown } = matter(content);

      // Validate front matter structure
      this.validateFrontMatter(frontMatter, filename);

      // Validate questions
      if (frontMatter.questions) {
        this.validateQuestions(
          frontMatter.questions,
          frontMatter.part,
          filename
        );
      }

      // Validate audio file reference
      this.validateAudioFile(frontMatter.audioFile, filename);

      // Validate DTZ compliance
      this.validateDTZCompliance(frontMatter, filename);

      console.log(
        `  ✅ Validated ${frontMatter.questions?.length || 0} questions\n`
      );
    } catch (error) {
      this.addError(`Error reading file ${filename}: ${error.message}`);
    }
  }

  // Validate YAML front matter
  validateFrontMatter(frontMatter, filename) {
    // Check required fields
    for (const field of REQUIRED_FIELDS) {
      if (!frontMatter[field]) {
        this.addError(`${filename}: Missing required field '${field}'`);
      }
    }

    // Validate part
    if (frontMatter.part && !VALID_PARTS.includes(frontMatter.part)) {
      this.addError(
        `${filename}: Invalid part '${frontMatter.part}'. Must be one of: ${VALID_PARTS.join(", ")}`
      );
    }

    // Validate level
    if (frontMatter.level && !VALID_LEVELS.includes(frontMatter.level)) {
      this.addError(
        `${filename}: Invalid level '${frontMatter.level}'. Must be one of: ${VALID_LEVELS.join(", ")}`
      );
    }

    // Validate duration
    if (frontMatter.duration && typeof frontMatter.duration !== "number") {
      this.addError(`${filename}: Duration must be a number (seconds)`);
    }

    // Validate tags
    if (frontMatter.tags && !Array.isArray(frontMatter.tags)) {
      this.addError(`${filename}: Tags must be an array`);
    }
  }

  // Validate questions array
  validateQuestions(questions, part, filename) {
    if (!Array.isArray(questions)) {
      this.addError(`${filename}: Questions must be an array`);
      return;
    }

    const questionIds = new Set();
    const timestamps = [];

    questions.forEach((question, index) => {
      this.stats.questionsValidated++;
      this.validateQuestion(question, index, filename, questionIds, timestamps);
    });

    // Check for timestamp overlaps
    this.validateTimestamps(timestamps, filename);

    // Validate question count for part
    if (part && DTZ_STANDARDS[part]) {
      const { minQuestions, maxQuestions } = DTZ_STANDARDS[part];
      if (questions.length < minQuestions || questions.length > maxQuestions) {
        this.addError(
          `${filename}: ${part} should have ${minQuestions}-${maxQuestions} questions, found ${questions.length}`
        );
      }
    }
  }

  // Validate individual question
  validateQuestion(question, index, filename, questionIds, timestamps) {
    const qRef = `${filename}:question[${index}]`;

    // Required question fields
    const requiredQuestionFields = [
      "id",
      "timestamp",
      "type",
      "prompt",
      "options",
      "correctAnswer",
    ];

    for (const field of requiredQuestionFields) {
      if (question[field] === undefined || question[field] === null) {
        this.addError(`${qRef}: Missing required field '${field}'`);
      }
    }

    // Validate unique ID
    if (question.id) {
      if (questionIds.has(question.id)) {
        this.addError(`${qRef}: Duplicate question ID '${question.id}'`);
      }
      questionIds.add(question.id);
    }

    // Validate timestamp
    if (typeof question.timestamp !== "number" || question.timestamp < 0) {
      this.addError(`${qRef}: Timestamp must be a positive number`);
    } else {
      timestamps.push({
        id: question.id,
        start: question.timestamp,
        end: question.timestamp + (question.duration || 30),
      });
    }

    // Validate question type
    if (question.type && !VALID_QUESTION_TYPES.includes(question.type)) {
      this.addError(`${qRef}: Invalid question type '${question.type}'`);
    }

    // Validate options
    if (question.type === "multiple-choice") {
      if (!Array.isArray(question.options) || question.options.length < 2) {
        this.addError(
          `${qRef}: Multiple choice questions must have at least 2 options`
        );
      }

      if (question.options && question.options.length > 5) {
        this.addWarning(
          `${qRef}: Too many options (${question.options.length}). DTZ typically uses 3 options.`
        );
      }
    }

    // Validate correct answer
    if (question.options && typeof question.correctAnswer === "number") {
      if (
        question.correctAnswer < 0 ||
        question.correctAnswer >= question.options.length
      ) {
        this.addError(
          `${qRef}: correctAnswer index ${question.correctAnswer} is out of range for ${question.options.length} options`
        );
      }
    }

    // Validate prompt length
    if (question.prompt && question.prompt.length > 200) {
      this.addWarning(
        `${qRef}: Question prompt is very long (${question.prompt.length} chars). Consider shortening.`
      );
    }

    // Check for rationale
    if (!question.rationale) {
      this.addWarning(`${qRef}: Missing rationale/explanation`);
    }
  }

  // Validate timestamp overlaps
  validateTimestamps(timestamps, filename) {
    timestamps.sort((a, b) => a.start - b.start);

    for (let i = 0; i < timestamps.length - 1; i++) {
      const current = timestamps[i];
      const next = timestamps[i + 1];

      if (current.end > next.start) {
        this.addWarning(
          `${filename}: Questions '${current.id}' and '${next.id}' have overlapping timestamps`
        );
      }
    }
  }

  // Validate audio file exists
  validateAudioFile(audioFile, filename) {
    if (!audioFile) return;

    const audioPath = path.join(
      process.cwd(),
      "public",
      "audio",
      "hoeren",
      audioFile
    );

    if (!fs.existsSync(audioPath)) {
      this.addError(`${filename}: Audio file not found: ${audioFile}`);
      return;
    }

    // Check file size
    const stats = fs.statSync(audioPath);
    if (stats.size === 0) {
      this.addError(`${filename}: Audio file is empty: ${audioFile}`);
    }

    // Validate file extension
    const ext = path.extname(audioFile).toLowerCase();
    if (![".mp3", ".wav", ".ogg"].includes(ext)) {
      this.addWarning(
        `${filename}: Unusual audio format: ${ext}. Consider using .mp3`
      );
    }
  }

  // Validate DTZ compliance
  validateDTZCompliance(frontMatter, filename) {
    const { part, level, duration, questions } = frontMatter;

    if (!part || !DTZ_STANDARDS[part]) return;

    const standards = DTZ_STANDARDS[part];

    // Check duration
    if (duration && duration > standards.maxDuration) {
      this.addWarning(
        `${filename}: Audio duration (${duration}s) exceeds recommended maximum for ${part} (${standards.maxDuration}s)`
      );
    }

    // Check level appropriateness
    if (level === "B1" && questions) {
      const avgQuestionTime = duration / questions.length;
      if (avgQuestionTime < 20) {
        this.addWarning(
          `${filename}: Questions might be too fast-paced for B1 level`
        );
      }
    }
  }

  // Helper methods
  addError(message) {
    this.errors.push(message);
    this.stats.errorsFound++;
  }

  addWarning(message) {
    this.warnings.push(message);
    this.stats.warningsFound++;
  }

  // Print validation results
  printResults() {
    console.log("\n" + "=".repeat(60));
    console.log("📊 VALIDATION RESULTS");
    console.log("=".repeat(60));

    console.log(`📁 Files processed: ${this.stats.filesProcessed}`);
    console.log(`❓ Questions validated: ${this.stats.questionsValidated}`);
    console.log(`❌ Errors found: ${this.stats.errorsFound}`);
    console.log(`⚠️  Warnings found: ${this.stats.warningsFound}`);

    if (this.errors.length > 0) {
      console.log("\n❌ ERRORS:");
      this.errors.forEach((error) => console.log(`  • ${error}`));
    }

    if (this.warnings.length > 0) {
      console.log("\n⚠️  WARNINGS:");
      this.warnings.forEach((warning) => console.log(`  • ${warning}`));
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log(
        "\n✅ All validations passed! Your questions are DTZ-compliant."
      );
    } else if (this.errors.length === 0) {
      console.log("\n✅ No errors found. Please review warnings above.");
    } else {
      console.log("\n❌ Validation failed. Please fix the errors above.");
    }

    console.log("\n📚 For more information, see docs/AUTHORING_GUIDE.md");
    console.log("=".repeat(60));
  }
}

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new DTZValidator();
  validator.validate().then((success) => {
    process.exit(success ? 0 : 1);
  });
}

export default DTZValidator;
