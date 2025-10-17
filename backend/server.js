/**
 * Backend Proxy Server for B1 Bestie DTZ
 * Handles OpenAI API requests to avoid CORS issues
 *
 * PROTECTION FEATURES:
 * 1. Rate Limiting: 1 request per 2 seconds per IP
 * 2. Session Limits: Max 30 messages per conversation
 * 3. User Tracking: Monitor usage per IP
 * 4. Auto-Timeout: Sessions expire after 20 minutes
 */

const express = require("express");
const cors = require("cors");
const https = require("https");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

// Process error handlers for stability
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("SIGTERM", () => {
  console.log("⏹️  SIGTERM signal received: closing HTTP server");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("⏹️  SIGINT signal received: closing HTTP server");
  process.exit(0);
});

const app = express();
const PORT = process.env.PORT || 3001;

// ============================================
// PROTECTION 1: Rate Limiting Storage
// ============================================
const rateLimitStore = new Map(); // IP -> { lastRequest, requestCount }
const RATE_LIMIT_WINDOW = 2000; // 2 seconds between requests

// ============================================
// PROTECTION 2: Session Tracking
// ============================================
const sessionStore = new Map(); // sessionId -> { messageCount, startTime, ip }
const MAX_MESSAGES_PER_SESSION = 30;

// ============================================
// PROTECTION 3: User Usage Tracking
// ============================================
const usageStats = new Map(); // IP -> { totalRequests, totalSessions, firstSeen }

// ============================================
// PROTECTION 4: Auto-Timeout
// ============================================
const SESSION_TIMEOUT = 20 * 60 * 1000; // 20 minutes

// Cleanup expired sessions every 5 minutes
setInterval(
  () => {
    const now = Date.now();
    for (const [sessionId, session] of sessionStore.entries()) {
      if (now - session.startTime > SESSION_TIMEOUT) {
        console.log(`⏰ Session ${sessionId} timed out after 20 minutes`);
        sessionStore.delete(sessionId);
      }
    }
  },
  5 * 60 * 1000
);

// Middleware
// Allow CORS from localhost/127.0.0.1 on any port during development.
// In production, set a stricter allowlist or use Vercel serverless functions.
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like curl, server-to-server)
      if (!origin) return callback(null, true);

      try {
        const url = new URL(origin);
        const hostname = url.hostname;

        // Allow localhost and 127.0.0.1 (any port)
        if (hostname === "localhost" || hostname === "127.0.0.1") {
          return callback(null, true);
        }

        // Allow Vercel preview/prod (you can customize this list)
        if (origin.endsWith(".vercel.app") || origin.endsWith(".now.sh")) {
          return callback(null, true);
        }

        // Reject other origins by default
        return callback(new Error("Not allowed by CORS"), false);
      } catch (e) {
        // If URL parsing fails, reject
        return callback(new Error("Invalid origin"), false);
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "OPTIONS"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());

// ============================================
// Rate Limiting Middleware
// ============================================
function rateLimitMiddleware(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();

  const userLimit = rateLimitStore.get(ip);

  if (userLimit) {
    const timeSinceLastRequest = now - userLimit.lastRequest;

    if (timeSinceLastRequest < RATE_LIMIT_WINDOW) {
      const waitTime = Math.ceil(
        (RATE_LIMIT_WINDOW - timeSinceLastRequest) / 1000
      );
      console.log(`⏱️  Rate limit hit for IP ${ip} - wait ${waitTime}s`);
      return res.status(429).json({
        error: "Too many requests",
        message: `Please wait ${waitTime} seconds before making another request`,
        retryAfter: waitTime,
      });
    }
  }

  rateLimitStore.set(ip, {
    lastRequest: now,
    requestCount: (userLimit?.requestCount || 0) + 1,
  });

  next();
}

// ============================================
// Health check
// ============================================
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend proxy is running with protections enabled",
  });
});

// ============================================
// Usage Statistics Endpoint (for monitoring)
// ============================================
app.get("/api/stats", (req, res) => {
  const stats = {
    activeSessions: sessionStore.size,
    totalUniqueUsers: usageStats.size,
    totalRequests: Array.from(rateLimitStore.values()).reduce(
      (sum, user) => sum + user.requestCount,
      0
    ),
    userBreakdown: Array.from(usageStats.entries()).map(([ip, data]) => ({
      ip: ip.substring(0, 10) + "...", // Anonymize IP
      totalRequests: data.totalRequests,
      totalSessions: data.totalSessions,
      firstSeen: new Date(data.firstSeen).toISOString(),
    })),
  };

  res.json(stats);
});

// ============================================
// OpenAI Chat Completions Proxy (PROTECTED)
// ============================================
app.post("/api/chat", rateLimitMiddleware, async (req, res) => {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  console.log(
    `\n🔵 [${requestId}] New request received at ${new Date().toISOString()}`
  );

  const OPENAI_API_KEY = process.env.VITE_OPENAI_API_KEY;
  const ip = req.ip || req.connection.remoteAddress;

  // Extract session ID (remove it from body before sending to OpenAI)
  const actualSessionId =
    req.body.sessionId || `session_${Date.now()}_${Math.random()}`;

  if (!OPENAI_API_KEY) {
    console.error("❌ OpenAI API key not configured");
    return res.status(500).json({
      error: "OpenAI API key not configured",
    });
  }

  // ============================================
  // PROTECTION 2: Check session message limit
  // ============================================
  let session = sessionStore.get(actualSessionId);

  if (!session) {
    // Create new session
    session = {
      messageCount: 0,
      startTime: Date.now(),
      ip: ip,
    };
    sessionStore.set(actualSessionId, session);

    // Track user stats
    if (!usageStats.has(ip)) {
      usageStats.set(ip, {
        totalRequests: 0,
        totalSessions: 0,
        firstSeen: Date.now(),
      });
    }
    const userStats = usageStats.get(ip);
    userStats.totalSessions += 1;
  }

  // ============================================
  // PROTECTION 4: Check session timeout
  // ============================================
  const sessionAge = Date.now() - session.startTime;
  if (sessionAge > SESSION_TIMEOUT) {
    console.log(
      `⏰ Session ${actualSessionId} expired (${Math.round(sessionAge / 60000)} minutes old)`
    );
    sessionStore.delete(actualSessionId);
    return res.status(410).json({
      error: "Session expired",
      message:
        "Your conversation session has expired after 20 minutes. Please start a new conversation.",
      expired: true,
    });
  }

  // Increment message count
  session.messageCount += 1;

  // Check message limit
  if (session.messageCount > MAX_MESSAGES_PER_SESSION) {
    console.log(
      `📊 Session ${actualSessionId} hit message limit (${session.messageCount} messages)`
    );
    return res.status(429).json({
      error: "Message limit reached",
      message: `You've reached the limit of ${MAX_MESSAGES_PER_SESSION} messages per conversation. Please start a new conversation.`,
      limitReached: true,
    });
  }

  // ============================================
  // PROTECTION 3: Update usage stats
  // ============================================
  const userStats = usageStats.get(ip);
  userStats.totalRequests += 1;

  console.log(
    `📤 Forwarding request to OpenAI... [Session: ${actualSessionId}, Message: ${session.messageCount}/${MAX_MESSAGES_PER_SESSION}, User: ${ip.substring(0, 10)}...]`
  );

  // Build request body for OpenAI (remove sessionId if present)
  const openAIBody = { ...req.body };
  delete openAIBody.sessionId;

  // Debug: Log what we're sending
  console.log(`📝 OpenAI body keys: ${Object.keys(openAIBody).join(", ")}`);
  console.log(`📝 Messages count: ${openAIBody.messages?.length || 0}`);
  console.log(`📝 Model: ${openAIBody.model}`);

  const requestBody = JSON.stringify(openAIBody);
  console.log(`📝 Request body length: ${requestBody.length} bytes`);

  // Validate JSON
  try {
    JSON.parse(requestBody);
    console.log(`✅ Request body is valid JSON`);
  } catch (e) {
    console.error(`❌ INVALID JSON! Error:`, e.message);
    console.error(`❌ Body keys:`, Object.keys(req.body));
    return res.status(500).json({
      error: "Invalid JSON in request body",
      details: e.message,
    });
  }

  const options = {
    hostname: "api.openai.com",
    path: "/v1/chat/completions",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };

  const proxyRequest = https.request(options, (proxyResponse) => {
    let data = "";

    proxyResponse.on("data", (chunk) => {
      data += chunk;
    });

    proxyResponse.on("end", () => {
      try {
        const jsonData = JSON.parse(data);

        if (proxyResponse.statusCode >= 400) {
          console.error(
            `❌ [${requestId}] OpenAI returned error ${proxyResponse.statusCode}:`,
            JSON.stringify(jsonData, null, 2)
          );
        } else {
          console.log(`✅ [${requestId}] Response received from OpenAI`);
        }

        res.status(proxyResponse.statusCode).json(jsonData);
        console.log(
          `📤 [${requestId}] Response sent to frontend with status ${proxyResponse.statusCode}`
        );
      } catch (error) {
        console.error("❌ Error parsing OpenAI response:", error);
        console.error("❌ Raw response:", data.substring(0, 500));
        res.status(500).json({
          error: {
            message: "Failed to parse OpenAI response",
            details: error.message,
          },
        });
      }
    });
  });

  proxyRequest.on("error", (error) => {
    console.error("❌ OpenAI API Error:", error);
    res.status(500).json({
      error: {
        message: "Failed to communicate with OpenAI API",
        details: error.message,
      },
    });
  });

  // Write the prepared request body (without sessionId)
  proxyRequest.write(requestBody);
  proxyRequest.end();
});

// OpenAI Text-to-Speech Proxy
app.post("/api/tts", async (req, res) => {
  const OPENAI_API_KEY = process.env.VITE_OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    console.error("❌ OpenAI API key not configured");
    return res.status(500).json({
      error: "OpenAI API key not configured",
    });
  }

  console.log("🎤 Forwarding TTS request to OpenAI...");

  const { text, voice = "nova" } = req.body;
  const requestBody = JSON.stringify({
    model: "tts-1",
    voice: voice,
    input: text,
    speed: 0.95, // Slightly slower for clarity
  });

  const options = {
    hostname: "api.openai.com",
    path: "/v1/audio/speech",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };

  const proxyRequest = https.request(options, (proxyResponse) => {
    // Set headers for audio streaming
    res.setHeader("Content-Type", "audio/mpeg");

    // Pipe the audio data directly to response
    proxyResponse.pipe(res);

    proxyResponse.on("end", () => {
      console.log("✅ TTS audio sent successfully");
    });
  });

  proxyRequest.on("error", (error) => {
    console.error("❌ OpenAI TTS Error:", error);
    res.status(500).json({
      error: {
        message: "Failed to communicate with OpenAI TTS API",
        details: error.message,
      },
    });
  });

  proxyRequest.write(requestBody);
  proxyRequest.end();
});

// Start server
app.listen(PORT, () => {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`✅ Backend proxy server running on http://localhost:${PORT}`);
  console.log(`${"=".repeat(60)}`);
  console.log(`🔗 API endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`🎤 TTS endpoint: http://localhost:${PORT}/api/tts`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`📊 Usage stats: http://localhost:${PORT}/api/stats`);
  console.log(`${"=".repeat(60)}`);
  console.log(`🛡️  PROTECTIONS ENABLED:`);
  console.log(`   ⏱️  Rate Limit: 1 request per 2 seconds`);
  console.log(
    `   📝 Message Limit: ${MAX_MESSAGES_PER_SESSION} messages per session`
  );
  console.log(`   ⏰ Session Timeout: ${SESSION_TIMEOUT / 60000} minutes`);
  console.log(`   📊 Usage Tracking: Enabled`);
  console.log(`${"=".repeat(60)}\n`);
});
