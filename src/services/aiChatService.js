/**
 * AI Chat Service for DTZ Sprechen Teil 3 Training
 * Uses OpenAI GPT-4o-mini for B1-level German conversation practice
 *
 * PROTECTION FEATURES:
 * - Rate limiting: 1 request per 2 seconds
 * - Session tracking with unique IDs
 * - Message limits: 30 messages per session
 * - Auto-timeout: 20 minutes per session
 */

import {
  getOrCreateSessionId,
  clearSessionId,
} from "../utils/sessionManager.js";

// Use Vercel serverless function - works in production and development
const API_ENDPOINT = "/api/chat";
const MODEL = "gpt-4o-mini";

/**
 * Custom error class for protection-related errors
 */
export class ProtectionError extends Error {
  constructor(message, type, retryAfter = null) {
    super(message);
    this.name = "ProtectionError";
    this.type = type; // 'rate_limit', 'message_limit', 'session_expired'
    this.retryAfter = retryAfter;
  }
}

/**
 * Creates a system prompt for the AI examiner
 * Ensures B1-level German and proper Redemittel usage
 */
function createSystemPrompt(aufgabe, leitpunkte, theme) {
  return `Du bist Besty, eine erfahrene Deutschlehrerin, die mit einem B1-Schüler die DTZ Sprechen Teil 3 Prüfung übt.

DEINE ROLLE ALS LEHRERIN:
- Du übst mit dem Schüler realistische Prüfungssituationen
- Du bist freundlich, geduldig und ermutigend
- Du sprichst IMMER auf B1-Niveau - nie schwieriger!
- Du hilfst dem Schüler durch das Gespräch, ohne zu direkt zu sein
- Du zeigst durch dein Beispiel, wie man gute Redemittel verwendet

KRITISCH - B1 SPRACHNIVEAU (das ist SEHR wichtig!):
B1-Deutsch bedeutet:
✓ EINFACHE, KURZE Sätze (maximal 10-12 Wörter)
✓ ALLTÄGLICHE Wörter, die jeder kennt
✓ GEGENWART oder einfache Vergangenheit (Perfekt, nicht Präteritum!)
✓ Keine Konjunktiv II Konstruktionen (außer "würde", "könnte", "sollte")
✓ Keine Passiv-Konstruktionen
✓ Keine Nebensätze mit "obwohl", "indem", "sodass"

❌ NIEMALS verwenden:
- Komplizierte Wörter: "demzufolge", "infolgedessen", "diesbezüglich"
- Schachtelsätze mit mehreren Nebensätzen
- Fachsprache oder formelle Sprache
- Seltene Verben oder Nomen
- Lange Sätze (über 15 Wörter)

✓ IMMER verwenden:
- Einfache Verben: haben, sein, machen, gehen, kommen, nehmen
- Alltägliche Nomen: Freund, Essen, Zeit, Idee, Problem
- Einfache Adjektive: gut, schön, wichtig, schwer, leicht
- Redemittel vom B1-Niveau

AUFGABE:
${aufgabe}

THEMA: ${theme}

DISKUSSIONSPUNKTE (alle systematisch abdecken):
${leitpunkte.map((punkt, i) => `${i + 1}. ${punkt}`).join("\n")}

REDEMITTEL - VERWENDE DIESE STRUKTUREN AKTIV:

1. Vorschläge machen (nutze diese regelmäßig!):
   - "Wie wäre es, wenn wir ...?"
   - "Wir könnten ...! Was meinst du?"
   - "Ich schlage vor, dass wir ..."
   - "Vielleicht wäre es gut, wenn ..."
   - "Wir könnten doch ..., was hältst du davon?"

2. Vorschläge annehmen:
   - "Ja, das ist eine gute/tolle/super Idee."
   - "In Ordnung!"
   - "Ich bin einverstanden."
   - "Ja, das finde ich auch gut."

3. Vorschläge ablehnen (manchmal ablehnen für natürliches Gespräch!):
   - "Das finde ich nicht so gut. Vielleicht sollten wir lieber ..."
   - "Ich weiß nicht, das ist keine so gute Idee."
   - "Das kommt darauf an. Besser wäre es, wenn ..."

4. Meinungsäußerung:
   - "Ich finde/glaube/denke/meine, dass ..."
   - "Meiner Meinung nach sollten wir ..."
   - "Ich würde gerne ..."

5. Nachfragen (SEHR WICHTIG - verwende diese HÄUFIG!):
   - "Was denkst du?"
   - "Was meinst du?"
   - "Wie findest du das?"
   - "Was hältst du davon?"
   - "Bist du damit einverstanden?"

6. Typische Fragen zu den Leitpunkten:
   - "Wann hättest du Zeit?" / "Wann sollen wir ...?"
   - "Wo sollen wir ...?" / "Wo können wir ...?"
   - "Wer soll ...?" / "Wer von uns ...?"
   - "Was können wir ...?" / "Was könnten wir ...?"
   - "Wie können wir ...?" / "Wie sollen wir ...?"

7. Bitten formulieren:
   - "Könntest du vielleicht ...?"
   - "Es wäre sehr nett von dir, wenn ..."
   - "Würdest du ...?"

GESPRÄCHSFÜHRUNG - WIE EINE LEHRERIN IN DER PRÜFUNGSVORBEREITUNG:
1. Kurze, freundliche Begrüßung (siehe unten)
2. Erkläre die Situation EINFACH mit konkreten Namen
3. Gehe durch ALLE Leitpunkte, einen nach dem anderen:
   - Stelle einfache W-Fragen: "Wann?", "Wo?", "Was?"
   - Mache eigene Vorschläge: "Ich denke, wir könnten..."
   - Frage den Schüler IMMER: "Was meinst du?" / "Was denkst du?"
4. Reagiere natürlich auf Antworten:
   - Gut? → "Ja! Gute Idee!" oder "Super!"
   - Anders? → "Hmm, ich weiß nicht. Vielleicht lieber...?"
5. Verwende die Redemittel als BEISPIEL für den Schüler
6. Sprich wie in einem echten Alltagsgespräch - nicht wie ein Lehrbuch!
7. Nach 5-7 Austauschen: "Sehr gut! Wir haben alles besprochen."

WICHTIG FÜR LEHRER-ROLLE:
- Sprich wie ein Freund, nicht wie ein Professor
- Sei enthusiastisch! Zeige, dass Planen Spaß macht
- Wenn der Schüler kurz antwortet, stelle Folgefragen
- Halte JEDEN Satz kurz und einfach
- Verwende "du" (freundschaftlich, nicht "Sie")

KRITISCH - PERSONEN IMMER MIT NAMEN BENENNEN:
NIEMALS allgemeine Begriffe verwenden! IMMER konkrete Namen geben!

❌ FALSCH: "einen Freund", "ein Bekannter", "die Nachbarin", "deine Freundin"
✓ RICHTIG: Namen verwenden!

Ersetze SOFORT beim ersten Satz:
- "einen Freund" → "deinen Freund Max" oder "Tom"
- "eine Freundin" → "deine Freundin Lisa" oder "Sarah"
- "ein Bekannter" → "dein Bekannter Tom" oder "Max"
- "eine Bekannte" → "deine Bekannte Sarah" oder "Anna"
- "der Nachbar" → "dein Nachbar Herr Müller" oder "Peter"
- "die Nachbarin" → "deine Nachbarin Frau Schmidt" oder "Maria"
- "ein Kollege" → "dein Kollege Max" oder "Tom aus dem Büro"
- "eine Kollegin" → "deine Kollegin Anna" oder "Sarah"
- "Freunde" (Plural) → "deine Freunde Max und Lisa"
- "Bekannte" (Plural) → "deine Bekannten Tom und Sarah"
- "Nachbarn" (Plural) → "deine Nachbarn Familie Müller"

BEISPIEL RICHTIG:
❌ "Du hast einen Freund, der ein Haus kaufen möchte."
✓ "Dein Freund Max möchte ein Haus kaufen." ODER "Max möchte ein Haus kaufen."

❌ "Deine Kollegin hat bald Geburtstag."
✓ "Deine Kollegin Anna hat bald Geburtstag." ODER "Anna hat bald Geburtstag."

ERSTE NACHRICHT - WICHTIG (kurze Begrüßung + direkt zur Sache!):
Format:
"[Kurze Begrüßung]. [Situation mit konkreten Namen]. [Optional: Wie du weißt/Wir sind ja...], [brauchen/wollen wir]. Was denkst du, - [erste W-Frage zum Leitpunkt 1]?"

BEGRÜSSUNGEN (variiere zwischen diesen - sei natürlich und freundlich!):
- "Hallo! Wie geht's bei dir?"
- "Hallo! Wie geht's?"
- "Hi! Alles gut bei dir?"
- "Hi! Gut, dass du da bist!"
- "Hör mal!"
- "Hi! Alles klar bei dir?"

Dann SOFORT zur Situation (keine zusätzlichen Sätze wie "Das ist toll!" oder "Lass uns planen!")

Beispiele (IMMER mit Namen!):
"Hallo! Wie geht's bei dir? Unser Nachbar Peter heiratet. Wir sind ja eingeladen und brauchen ein passendes Geschenk. Was denkst du, - was können wir schenken?"

"Hi! Alles gut? Deine Freunde Max und Lisa kommen am Wochenende. Wir müssen das Essen planen. Was denkst du, - was können wir kochen?"

"Hör mal! Deine Kollegin Anna hat bald Geburtstag. Wie du weißt, wollen wir eine kleine Party organisieren. Was denkst du, - wo können wir feiern?"

"Hi! Gut, dass du da bist! Dein Freund Tom möchte ein Haus kaufen. Er weiß nicht, ob Stadt oder Land besser ist. Was denkst du, - wann hättest du Zeit, um mit ihm zu sprechen?"

"Hi! Alles klar bei dir? Deine Bekannte Sarah zieht um. Wir wollen ihr helfen. Was denkst du, - wer von uns kann am Samstag helfen?"

WICHTIG FÜR JEDE NACHRICHT (NACH der ersten):
✓ KEINE EMOJIS - aber sei freundlich und ermutigend!
✓ KURZE Sätze (max 10-12 Wörter pro Satz!)
✓ Reagiere enthusiastisch und positiv auf Schüler-Antworten:
   - "Super!" / "Toll!" / "Sehr gut!" / "Perfekt!" / "Genau!"
   - "Das klingt gut!" / "Das ist eine gute Idee!" / "Prima!"
   - "Oh interessant!" / "Schön!" / "Wunderbar!"
✓ Stelle einfache, konkrete Fragen
✓ Mache eigene Vorschläge: "Ich würde...", "Wir könnten..."
✓ Frage IMMER nach: "Was denkst du?", "Was meinst du?", "Wie findest du das?"
✓ Pro Nachricht: nur EINEN Leitpunkt besprechen
✓ Sei wie ein freundlicher Gesprächspartner, der sich freut zu planen!

PRÜFE JEDEN SATZ:
Bevor du antwortest, frage dich:
- Ist dieser Satz einfach genug für B1?
- Würde ein Kind (12 Jahre) das verstehen?
- Sind alle Wörter alltäglich?
Wenn NEIN → mache es einfacher!

Beginne jetzt die Konversation!`;
}

/**
 * Starts a new dialogue with initial context
 * @param {string} aufgabe - Task description
 * @param {string[]} leitpunkte - Discussion points to cover
 * @param {string} theme - Theme category
 * @param {string} scenarioId - Unique scenario identifier for session tracking
 * @returns {Promise<{message: string, discussedPoints: number[]}>}
 */
export async function startDialogue(aufgabe, leitpunkte, theme, scenarioId) {
  const systemPrompt = createSystemPrompt(aufgabe, leitpunkte, theme);
  const sessionId = getOrCreateSessionId(scenarioId);

  console.log(
    `🔵 [Frontend] Starting dialogue for scenario ${scenarioId} with session ${sessionId}`
  );

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        sessionId: sessionId, // Add session ID for tracking
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content:
              "Hallo! Ich bin bereit. Lass uns mit der Planung anfangen.",
          },
        ],
        temperature: 0.7, // Natural but consistent
        max_tokens: 250, // Keep responses concise (B1 level)
        presence_penalty: 0.3, // Encourage variety
        frequency_penalty: 0.3, // Avoid repetition
      }),
    });

    if (!response.ok) {
      const error = await response.json();

      // Handle protection errors
      if (response.status === 429) {
        if (error.retryAfter) {
          throw new ProtectionError(
            `Bitte warten Sie ${error.retryAfter} Sekunden.`,
            "rate_limit",
            error.retryAfter
          );
        } else if (error.limitReached) {
          clearSessionId(scenarioId);
          throw new ProtectionError(
            "Sie haben das Nachrichten-Limit erreicht. Bitte starten Sie ein neues Gespräch.",
            "message_limit"
          );
        }
      } else if (response.status === 410 && error.expired) {
        clearSessionId(scenarioId);
        throw new ProtectionError(
          "Ihre Sitzung ist abgelaufen (20 Minuten). Bitte starten Sie ein neues Gespräch.",
          "session_expired"
        );
      }

      throw new Error(error.error?.message || "API request failed");
    }

    const data = await response.json();
    console.log(
      `✅ [Frontend] Data parsed successfully, message length: ${data.choices?.[0]?.message?.content?.length || 0}`
    );
    const aiMessage = data.choices[0].message.content;

    return {
      message: aiMessage,
      discussedPoints: [], // Will be tracked separately
    };
  } catch (error) {
    console.error("❌ [Frontend] AI Chat Service Error:", error);
    throw new Error(`Failed to start dialogue: ${error.message}`);
  }
}

/**
 * Continues an ongoing dialogue
 * @param {Array} messageHistory - Full conversation history
 * @param {string} userMessage - User's latest message
 * @param {string} aufgabe - Task description (for context)
 * @param {string[]} leitpunkte - Discussion points
 * @param {string} theme - Theme category
 * @param {string} scenarioId - Unique scenario identifier for session tracking
 * @returns {Promise<{message: string}>}
 */
export async function continueDialogue(
  messageHistory,
  userMessage,
  aufgabe,
  leitpunkte,
  theme,
  discussedPoints = [],
  scenarioId
) {
  const systemPrompt = createSystemPrompt(aufgabe, leitpunkte, theme);
  const sessionId = getOrCreateSessionId(scenarioId);

  // Add reminder about remaining points
  const remainingPoints = leitpunkte
    .map((punkt, i) => ({ punkt, index: i }))
    .filter((p) => !discussedPoints.includes(p.index));

  let contextReminder = "";
  
  // Special case: if user message is "Zusammenfassung", generate natural closing
  if (userMessage === "Zusammenfassung") {
    contextReminder = `\n\nWICHTIG: Alle Diskussionspunkte wurden besprochen! Beende das Gespräch JETZT freundlich und natürlich:
1. Fasse kurz zusammen, was ihr geplant habt
2. Zeige Vorfreude auf das Event/die Aktivität
3. Sage auf Wiedersehen auf eine warme Art
4. MAXIMAL 2-3 kurze Sätze!

Beispiel: "Super! Dann ist alles geplant. Ich freue mich schon auf den Abend! Bis dann!"`;
  } else if (remainingPoints.length > 0) {
    contextReminder = `\n\nREMINDER: Du musst noch diese Leitpunkte besprechen:\n${remainingPoints.map((p) => `- ${p.punkt}`).join("\n")}\nFrage jetzt nach dem NÄCHSTEN Punkt!`;
  } else {
    contextReminder =
      "\n\nAlle Punkte wurden besprochen. Beim nächsten Austausch kannst du das Gespräch natürlich beenden.";
  }

  // Helper function to make the request
  const makeRequest = async () => {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        sessionId: sessionId, // Add session ID for tracking
        messages: [
          { role: "system", content: systemPrompt + contextReminder },
          ...messageHistory,
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 250,
        presence_penalty: 0.3,
        frequency_penalty: 0.3,
      }),
    });

    console.log(
      `🔵 [Frontend] Response received: ${response.status} ${response.statusText}`
    );

    if (!response.ok) {
      const error = await response.json();
      console.error(`❌ [Frontend] Error response:`, error);

      // Handle protection errors
      if (response.status === 429) {
        if (error.retryAfter) {
          // Auto-retry after the specified delay
          console.log(`⏳ [Frontend] Waiting ${error.retryAfter} seconds before retry...`);
          await new Promise(resolve => setTimeout(resolve, error.retryAfter * 1000));
          console.log(`🔄 [Frontend] Retrying request...`);
          return makeRequest(); // Recursive retry
        } else if (error.limitReached) {
          clearSessionId(scenarioId);
          throw new ProtectionError(
            "Sie haben das Nachrichten-Limit erreicht (30 Nachrichten). Bitte starten Sie ein neues Gespräch.",
            "message_limit"
          );
        }
      } else if (response.status === 410 && error.expired) {
        clearSessionId(scenarioId);
        throw new ProtectionError(
          "Ihre Sitzung ist abgelaufen (20 Minuten). Bitte starten Sie ein neues Gespräch.",
          "session_expired"
        );
      }

      throw new Error(error.error?.message || "API request failed");
    }

    return response;
  };

  try {
    const response = await makeRequest();

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    return {
      message: aiMessage,
    };
  } catch (error) {
    console.error("AI Chat Service Error:", error);
    throw new Error(`Failed to continue dialogue: ${error.message}`);
  }
}

/**
 * Analyzes which Leitpunkte have been discussed in the conversation
 * @param {Array} messageHistory - Full conversation history
 * @param {string[]} leitpunkte - Discussion points to check
 * @param {string} scenarioId - Unique scenario identifier for session tracking
 * @returns {Promise<number[]>} Array of indices of discussed points
 */
export async function analyzeDiscussedPoints(
  messageHistory,
  leitpunkte,
  scenarioId
) {
  if (messageHistory.length < 2) {
    return [];
  }

  const analysisPrompt = `Analysiere diese Konversation und identifiziere welche Diskussionspunkte besprochen wurden:

DISKUSSIONSPUNKTE:
${leitpunkte.map((punkt, i) => `${i}. ${punkt}`).join("\n")}

KONVERSATION:
${messageHistory.map((msg) => `${msg.role === "assistant" ? "Prüfer" : "Teilnehmer"}: ${msg.content}`).join("\n")}

Antworte mit einer JSON-Liste von Indizes (0-basiert) der besprochenen Punkte.
Beispiel: [0, 1, 3] wenn Punkte 0, 1 und 3 besprochen wurden.
Nur die Zahlen, sonst nichts.`;

  const sessionId = getOrCreateSessionId(scenarioId);

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        sessionId: sessionId, // Add session ID for tracking
        messages: [{ role: "user", content: analysisPrompt }],
        temperature: 0.1, // Low temperature for consistent analysis
        max_tokens: 50,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));

      // Handle protection errors silently for analysis (non-critical function)
      if (response.status === 429 || response.status === 410) {
        return [];
      }

      return [];
    }

    const data = await response.json();
    const result = data.choices[0].message.content;

    // Parse the JSON array
    const matches = result.match(/\[[\d,\s]+\]/);
    if (matches) {
      return JSON.parse(matches[0]);
    }

    return [];
  } catch (error) {
    console.error("Error analyzing discussed points:", error);
    return [];
  }
}

/**
 * Gets feedback on the conversation
 * @param {Array} messageHistory - Full conversation history
 * @param {string[]} leitpunkte - Discussion points
 * @param {string} scenarioId - Unique scenario identifier for session tracking
 * @returns {Promise<{feedback: string, coverage: string, strengths: string[], improvements: string[]}>}
 */
export async function getFeedback(messageHistory, leitpunkte, scenarioId) {
  if (messageHistory.length < 4) {
    return {
      feedback: "Gespräch zu kurz für Feedback.",
      coverage: "Nicht genug Austausch",
      strengths: [],
      improvements: [],
    };
  }

  const feedbackPrompt = `Analysiere diese B1 Sprechen Teil 3 Konversation und gib konstruktives Feedback auf Deutsch (B1-Niveau):

DISKUSSIONSPUNKTE:
${leitpunkte.map((punkt, i) => `${i + 1}. ${punkt}`).join("\n")}

KONVERSATION:
${messageHistory
  .filter((msg) => msg.role !== "system")
  .map(
    (msg) =>
      `${msg.role === "assistant" ? "Prüfer" : "Teilnehmer"}: ${msg.content}`
  )
  .join("\n")}

Gib Feedback in diesem Format (auf Deutsch, B1-Niveau):

ABDECKUNG: [Kurze Bewertung welche Punkte besprochen wurden]

STÄRKEN:
- [Punkt 1]
- [Punkt 2]

VERBESSERUNGEN:
- [Punkt 1]
- [Punkt 2]`;

  const sessionId = getOrCreateSessionId(scenarioId);

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        sessionId: sessionId, // Add session ID for tracking
        messages: [{ role: "user", content: feedbackPrompt }],
        temperature: 0.5,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));

      // Handle protection errors
      if (response.status === 429) {
        if (error.retryAfter) {
          throw new ProtectionError(
            `Bitte warten Sie ${error.retryAfter} Sekunden.`,
            "rate_limit",
            error.retryAfter
          );
        } else if (error.limitReached) {
          clearSessionId(scenarioId);
          throw new ProtectionError(
            "Sie haben das Nachrichten-Limit erreicht. Feedback kann nicht generiert werden.",
            "message_limit"
          );
        }
      } else if (response.status === 410 && error.expired) {
        clearSessionId(scenarioId);
        throw new ProtectionError(
          "Ihre Sitzung ist abgelaufen. Feedback kann nicht generiert werden.",
          "session_expired"
        );
      }

      throw new Error("Feedback generation failed");
    }

    const data = await response.json();
    const feedbackText = data.choices[0].message.content;

    // Parse the feedback (simple parsing)
    const coverageMatch = feedbackText.match(
      /ABDECKUNG:\s*(.+?)(?=\n\n|STÄRKEN:)/s
    );
    const strengthsMatch = feedbackText.match(
      /STÄRKEN:\s*(.+?)(?=\n\nVERBESSERUNGEN:|$)/s
    );
    const improvementsMatch = feedbackText.match(/VERBESSERUNGEN:\s*(.+?)$/s);

    return {
      feedback: feedbackText,
      coverage: coverageMatch ? coverageMatch[1].trim() : "",
      strengths: strengthsMatch
        ? strengthsMatch[1]
            .split("\n")
            .filter((s) => s.trim().startsWith("-"))
            .map((s) => s.replace(/^-\s*/, "").trim())
        : [],
      improvements: improvementsMatch
        ? improvementsMatch[1]
            .split("\n")
            .filter((s) => s.trim().startsWith("-"))
            .map((s) => s.replace(/^-\s*/, "").trim())
        : [],
    };
  } catch (error) {
    console.error("Error getting feedback:", error);
    return {
      feedback: "Feedback konnte nicht generiert werden.",
      coverage: "",
      strengths: [],
      improvements: [],
    };
  }
}

/**
 * Corrects grammar and vocabulary mistakes in user's message
 * @param {string} userMessage - User's message to correct
 * @param {number} scenarioId - Scenario ID for session tracking
 * @returns {Promise<{hasErrors: boolean, original: string, corrected: string, mistakes: Array}>}
 */
export async function correctMessage(userMessage, scenarioId) {
  const systemPrompt = `Du bist ein Deutschlehrer für B1-Niveau.

Analysiere den folgenden Satz und korrigiere alle Fehler:
- Grammatik (Artikel, Konjugation, Kasus, Wortstellung)
- Wortschatz (bessere Wörter für B1-Niveau)
- Rechtschreibung

FORMAT (genau so ausgeben):
FEHLER: [ja/nein]
ORIGINAL: [der ursprüngliche Satz]
KORRIGIERT: [der korrigierte Satz]
FEHLER-LISTE:
- [Fehler 1: Erklärung]
- [Fehler 2: Erklärung]

Wenn KEINE Fehler: schreibe nur "FEHLER: nein" und den ursprünglichen Satz.`;

  const sessionId = getOrCreateSessionId(scenarioId);

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        sessionId: sessionId, // Add session ID for tracking
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.3,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));

      // Handle protection errors
      if (response.status === 429) {
        if (error.retryAfter) {
          throw new ProtectionError(
            `Bitte warten Sie ${error.retryAfter} Sekunden.`,
            "rate_limit",
            error.retryAfter
          );
        } else if (error.limitReached) {
          clearSessionId(scenarioId);
          throw new ProtectionError(
            "Sie haben das Nachrichten-Limit erreicht. Korrektur kann nicht durchgeführt werden.",
            "message_limit"
          );
        }
      } else if (response.status === 410 && error.expired) {
        clearSessionId(scenarioId);
        throw new ProtectionError(
          "Ihre Sitzung ist abgelaufen. Korrektur kann nicht durchgeführt werden.",
          "session_expired"
        );
      }

      throw new Error("Correction failed");
    }

    const data = await response.json();
    const correctionText = data.choices[0].message.content;

    // Parse correction
    const hasErrorsMatch = correctionText.match(/FEHLER:\s*(ja|nein)/i);
    const hasErrors = hasErrorsMatch
      ? hasErrorsMatch[1].toLowerCase() === "ja"
      : false;

    if (!hasErrors) {
      return {
        hasErrors: false,
        original: userMessage,
        corrected: userMessage,
        mistakes: [],
      };
    }

    const correctedMatch = correctionText.match(/KORRIGIERT:\s*(.+?)(?=\n|$)/);
    const mistakesMatch = correctionText.match(/FEHLER-LISTE:\s*(.+?)$/s);

    const mistakes = mistakesMatch
      ? mistakesMatch[1]
          .split("\n")
          .filter((s) => s.trim().startsWith("-"))
          .map((s) => s.replace(/^-\s*/, "").trim())
      : [];

    return {
      hasErrors: true,
      original: userMessage,
      corrected: correctedMatch ? correctedMatch[1].trim() : userMessage,
      mistakes: mistakes,
    };
  } catch (error) {
    console.error("Error correcting message:", error);
    return {
      hasErrors: false,
      original: userMessage,
      corrected: userMessage,
      mistakes: [],
    };
  }
}
