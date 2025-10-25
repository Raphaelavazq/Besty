/**
 * Vercel Serverless Function: DTZ Schreiben Email Correction
 * Evaluates and corrects B1-level emails/letters using OpenAI GPT-4o-mini
 */

// Helper to read request body
async function readJson(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

// Upstash Redis helper for rate limiting
async function upstashIncr(key) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  try {
    const resp = await fetch(`${url}/INCR/${key}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json();
    return data?.result ?? null;
  } catch (err) {
    console.warn("Upstash error:", err.message);
    return null;
  }
}

async function upstashExpire(key, seconds) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return;

  try {
    await fetch(`${url}/EXPIRE/${key}/${seconds}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.warn("Upstash expire error:", err.message);
  }
}

export default async function handler(req, res) {
  console.log("✅ Handler called - method:", req.method);

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log("✅ Reading JSON body...");
  let body;

  // Check if Express already parsed the body
  if (req.body && typeof req.body === "object") {
    body = req.body;
    console.log("✅ Using Express-parsed body");
  } else {
    // Fallback to manual parsing (for Vercel serverless)
    try {
      body = await readJson(req);
      console.log("✅ JSON parsed manually");
    } catch (err) {
      console.error("❌ JSON parse error:", err.message);
      return res.status(400).json({ error: "Invalid JSON" });
    }
  }

  const { text, prompt, type, sessionId } = body;
  console.log(
    "✅ Extracted fields - text length:",
    text?.length,
    "type:",
    type
  );

  // Validate input
  if (!text || !prompt || !type) {
    console.error("❌ Missing required fields");
    return res.status(400).json({
      error: "Missing required fields: text, prompt, type",
    });
  }

  const wordCount = text.trim().split(/\s+/).length;
  console.log("✅ Word count:", wordCount);

  if (wordCount < 50) {
    return res.status(400).json({
      error: `Text zu kurz. ${wordCount} Wörter, mindestens 50 erforderlich.`,
      wordCount,
    });
  }

  const actualSessionId =
    sessionId || `anon_${Math.random().toString(36).slice(2, 9)}`;

  console.log("🔄 Checking rate limit for session:", actualSessionId);

  // Rate limiting: 1 request per 2 seconds
  const RATE_WINDOW = 2;
  const rateKey = `schreiben:rate:${actualSessionId}`;
  const rateCount = await upstashIncr(rateKey);

  console.log("✅ Rate limit check done - count:", rateCount);

  if (rateCount !== null) {
    if (rateCount === 1) {
      await upstashExpire(rateKey, RATE_WINDOW);
    }
    if (rateCount > 1) {
      return res.status(429).json({
        error: "Zu viele Anfragen. Bitte warte einen Moment.",
        retryAfter: RATE_WINDOW,
      });
    }
  }

  // Create system prompt for DTZ evaluation
  const systemPrompt = `Du bist ein DTZ B1 Prüfer für den Schreiben-Teil. Deine Aufgabe ist es, einen ${type === "formal" ? "formellen" : "informellen"} Brief zu korrigieren und nach den offiziellen DTZ-Kriterien zu bewerten.

SITUATION:
${prompt.situation}

EMPFÄNGER:
${prompt.recipient}

INHALTSPUNKTE (alle müssen behandelt werden):
${prompt.contentPoints.map((point, i) => `${i + 1}. ${point}`).join("\n")}

BEWERTUNGSKRITERIEN:
1. Inhalt (5 Punkte): Sind alle Inhaltspunkte behandelt? Gibt es genug Details?
2. Kommunikative Gestaltung (5 Punkte): Ist die Form korrekt (formell/informell)? Gibt es eine klare Struktur? Sind Anrede und Gruß passend?
3. Formale Richtigkeit (5 Punkte): Sind Grammatik, Wortschatz, Rechtschreibung und Zeichensetzung korrekt?

DEINE AUFGABE:
1. Korrigiere alle Fehler im Text
2. Analysiere jeden Fehler und erkläre ihn einfach (B1-Niveau)
3. Bewerte den Brief nach den 3 Kriterien (jeweils 0-5 Punkte)
4. Gib konstruktives Feedback mit Stärken und Verbesserungsvorschlägen
5. Prüfe, welche Inhaltspunkte behandelt wurden

ANTWORT-FORMAT (JSON):
{
  "corrected": "Der komplett korrigierte Brief",
  "errors": [
    {
      "type": "grammar|vocabulary|structure|spelling",
      "original": "Der fehlerhafte Teil",
      "corrected": "Die Korrektur",
      "explanation": "Einfache Erklärung des Fehlers (B1-Niveau)"
    }
  ],
  "score": {
    "content": 0-5,
    "communication": 0-5,
    "accuracy": 0-5,
    "total": 0-15
  },
  "contentPoints": [true, false, true, false],
  "feedback": {
    "strengths": ["Positive Punkte"],
    "improvements": ["Was verbessert werden sollte"],
    "suggestions": ["Konkrete Tipps"]
  }
}

Sei konstruktiv und ermutigend! Erkläre Fehler klar und einfach auf B1-Niveau.`;

  // Call OpenAI API
  try {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    console.log("🔑 API Key exists:", !!OPENAI_API_KEY);
    console.log("🔑 API Key length:", OPENAI_API_KEY?.length);

    if (!OPENAI_API_KEY) {
      console.error("❌ OpenAI API key not configured");
      return res.status(500).json({ error: "OpenAI API key not configured" });
    }

    console.log("📡 Calling OpenAI API...");

    // Add timeout to fetch
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `Bitte korrigiere und bewerte diesen Brief:\n\n${text}`,
            },
          ],
          response_format: { type: "json_object" },
          temperature: 0.3,
          max_tokens: 3000,
        }),
      }
    );

    clearTimeout(timeout);
    console.log("✅ OpenAI responded with status:", openaiResponse.status);

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      console.error("❌ OpenAI error:", errorData);
      return res.status(openaiResponse.status).json({
        error: "OpenAI API error",
        details: errorData,
      });
    }

    const openaiData = await openaiResponse.json();
    const aiMessage = openaiData.choices[0].message.content;
    const correctionData = JSON.parse(aiMessage);

    // Add metadata to response
    const result = {
      original: text,
      wordCount: wordCount,
      promptTitle: prompt.title,
      type: type,
      ...correctionData,
      missingPoints: prompt.contentPoints.filter(
        (_, i) => !correctionData.contentPoints[i]
      ),
    };

    console.log(
      `✅ Schreiben correction completed: ${result.score.total}/15 points`
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error("❌ Schreiben API error:", error.name, error.message);

    if (error.name === "AbortError") {
      return res.status(504).json({
        error: "OpenAI request timeout",
        details: "The request took too long. Please try again.",
      });
    }

    return res.status(500).json({
      error: "Failed to process correction",
      details: error.message,
    });
  }
}
