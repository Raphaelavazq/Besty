/**
 * Schreiben Service for DTZ Writing Training
 * Uses OpenAI GPT-4o-mini for email/letter correction
 *
 * Features:
 * - Email/letter correction with detailed feedback
 * - DTZ B1-level evaluation
 * - Grammar, vocabulary, and structure analysis
 * - Scoring according to official DTZ criteria
 */

import {
  getOrCreateSessionId,
  clearSessionId,
} from "../utils/sessionManager.js";

// Use Vercel serverless function - works in production and development
const API_BASE = "/api";

/**
 * Custom error class for Schreiben service errors
 */
export class SchreibenError extends Error {
  constructor(message, type, details = null) {
    super(message);
    this.name = "SchreibenError";
    this.type = type; // 'rate_limit', 'validation', 'api_error'
    this.details = details;
  }
}

/**
 * Validate user input before submission
 */
function validateInput(text, minWords = 50) {
  const wordCount = text.trim().split(/\s+/).length;

  if (!text || text.trim().length === 0) {
    throw new SchreibenError("Der Text darf nicht leer sein.", "validation");
  }

  if (wordCount < minWords) {
    throw new SchreibenError(
      `Der Text ist zu kurz. Du hast ${wordCount} Wörter, aber mindestens ${minWords} Wörter sind erforderlich.`,
      "validation",
      { wordCount, minWords }
    );
  }

  return { wordCount };
}

/**
 * Submit email/letter for correction and evaluation
 *
 * @param {string} text - User's written text
 * @param {object} prompt - The email prompt object with situation and content points
 * @param {string} type - 'formal' or 'informal'
 * @returns {Promise<object>} Correction results with feedback and score
 */
export async function correctEmail({ text, prompt, type }) {
  try {
    // Validate input
    const { wordCount } = validateInput(text);

    // Get or create session ID
    const sessionId = getOrCreateSessionId();

    console.log(`📝 Submitting ${type} email for correction...`);
    console.log(`Word count: ${wordCount}`);

    const response = await fetch(`${API_BASE}/schreiben/correct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        prompt,
        type,
        sessionId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      // Handle rate limiting
      if (response.status === 429) {
        throw new SchreibenError(
          errorData.message || "Zu viele Anfragen. Bitte warte einen Moment.",
          "rate_limit",
          { retryAfter: errorData.retryAfter }
        );
      }

      throw new SchreibenError(
        errorData.error || "Fehler beim Korrigieren des Textes.",
        "api_error",
        errorData
      );
    }

    const result = await response.json();
    console.log("✅ Email correction received");

    return result;
  } catch (error) {
    if (error instanceof SchreibenError) {
      throw error;
    }

    console.error("Error correcting email:", error);
    throw new SchreibenError(
      "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.",
      "api_error",
      { originalError: error.message }
    );
  }
}

/**
 * Get a random email prompt
 *
 * @param {string} type - 'formal', 'informal', or 'random'
 * @returns {Promise<object>} Random prompt object
 */
export async function getRandomPrompt(type = "random") {
  try {
    const response = await fetch("/data/schreiben/email-prompts.json");

    if (!response.ok) {
      throw new Error("Failed to load email prompts");
    }

    const data = await response.json();

    let prompts;
    if (type === "random") {
      // Combine both formal and informal
      prompts = [...data.formal, ...data.informal];
    } else if (type === "formal") {
      prompts = data.formal;
    } else if (type === "informal") {
      prompts = data.informal;
    } else {
      throw new Error(`Invalid type: ${type}`);
    }

    // Get random prompt
    const randomIndex = Math.floor(Math.random() * prompts.length);
    const selectedPrompt = prompts[randomIndex];

    // Determine if it's formal or informal
    const promptType = data.formal.find((p) => p.id === selectedPrompt.id)
      ? "formal"
      : "informal";

    console.log(`📧 Selected ${promptType} prompt: ${selectedPrompt.title}`);

    return {
      ...selectedPrompt,
      type: promptType,
    };
  } catch (error) {
    console.error("Error loading prompts:", error);
    throw new SchreibenError("Fehler beim Laden der Aufgaben.", "api_error", {
      originalError: error.message,
    });
  }
}

/**
 * Get all available prompts
 *
 * @returns {Promise<object>} All prompts categorized by type
 */
export async function getAllPrompts() {
  try {
    const response = await fetch("/data/schreiben/email-prompts.json");

    if (!response.ok) {
      throw new Error("Failed to load email prompts");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading prompts:", error);
    throw new SchreibenError("Fehler beim Laden der Aufgaben.", "api_error", {
      originalError: error.message,
    });
  }
}

/**
 * Clear session (for reset/restart)
 */
export function resetSchreibenSession() {
  clearSessionId();
  console.log("🔄 Schreiben session reset");
}
