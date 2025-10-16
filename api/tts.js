/**
 * Vercel Serverless Function: OpenAI Text-to-Speech Proxy
 * Handles TTS requests to avoid CORS and protect API key
 */

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    console.error("❌ OpenAI API key not configured");
    return res.status(500).json({
      error: "OpenAI API key not configured",
    });
  }

  try {
    const { text, voice = "nova" } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    console.log(`🎤 TTS request for ${text.length} chars with voice: ${voice}`);

    // Call OpenAI TTS API
    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "tts-1",
        voice: voice,
        input: text,
        speed: 0.95, // Slightly slower for clarity
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ OpenAI TTS API error:", response.status, errorText);
      return res.status(response.status).json({
        error: "TTS request failed",
        details: errorText,
      });
    }

    // Get audio buffer
    const audioBuffer = await response.arrayBuffer();

    // Set headers for audio streaming
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Length", audioBuffer.byteLength);

    // Send audio data
    res.status(200).send(Buffer.from(audioBuffer));

    console.log("✅ TTS audio sent successfully");
  } catch (error) {
    console.error("❌ TTS Error:", error);
    res.status(500).json({
      error: "Failed to generate speech",
      details: error.message,
    });
  }
}
