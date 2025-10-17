import fetch from "node-fetch";

// Simple helper to read raw JSON body from IncomingMessage
async function readJson(req) {
  return await new Promise((resolve, reject) => {
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

// Upstash helper: send multiple Redis commands in one request
async function upstashCommands(commands) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Upstash not configured");

  const resp = await fetch(`${url}/commands`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commands }),
  });
  return resp.json();
}

// In-memory fallback stores (only used when UPSTASH is not configured)
const rateMap = new Map();
const msgMap = new Map();
const sessionTouched = new Map();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  let body;
  try {
    body = await readJson(req);
  } catch (err) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Invalid JSON" }));
    return;
  }

  const sessionId =
    body.sessionId || `anon_${Math.random().toString(36).slice(2, 9)}`;

  // Protection parameters
  const RATE_WINDOW_SECONDS = 2; // 1 request per 2 seconds
  const MESSAGE_LIMIT = 30;
  const SESSION_TTL_SECONDS = 20 * 60; // 20 minutes

  try {
    if (
      process.env.UPSTASH_REDIS_REST_URL &&
      process.env.UPSTASH_REDIS_REST_TOKEN
    ) {
      // Rate limit: INCR + set EXPIRE if first
      const rateKey = `rate:${sessionId}`;
      const rateResp = await upstashCommands([["INCR", rateKey]]);
      const rateCount = rateResp?.results?.[0]?.output ?? null;
      if (rateCount === 1 || rateCount === "1") {
        // set expiry
        await upstashCommands([
          ["EXPIRE", rateKey, RATE_WINDOW_SECONDS.toString()],
        ]);
      }
      if (Number(rateCount) > 1) {
        res.statusCode = 429;
        res.end(JSON.stringify({ retryAfter: RATE_WINDOW_SECONDS }));
        return;
      }

      // Message count tracker
      const msgKey = `msgs:${sessionId}`;
      const msgResp = await upstashCommands([["INCR", msgKey]]);
      const msgCount = msgResp?.results?.[0]?.output ?? null;
      if (msgCount === 1 || msgCount === "1") {
        await upstashCommands([
          ["EXPIRE", msgKey, SESSION_TTL_SECONDS.toString()],
        ]);
      }
      if (Number(msgCount) > MESSAGE_LIMIT) {
        // clear session by expiring keys
        await upstashCommands([["EXPIRE", msgKey, "1"]]);
        res.statusCode = 429;
        res.end(JSON.stringify({ limitReached: true }));
        return;
      }

      // Touch session timestamp for TTL enforcement
      await upstashCommands([
        ["SET", `touch:${sessionId}`, Date.now().toString()],
        ["EXPIRE", `touch:${sessionId}`, SESSION_TTL_SECONDS.toString()],
      ]);
    } else {
      // In-memory fallback
      // Rate
      const last = rateMap.get(sessionId) || 0;
      const now = Date.now();
      if (now - last < RATE_WINDOW_SECONDS * 1000) {
        res.statusCode = 429;
        res.end(JSON.stringify({ retryAfter: RATE_WINDOW_SECONDS }));
        return;
      }
      rateMap.set(sessionId, now);

      // Message count
      const m = msgMap.get(sessionId) || { count: 0, first: now };
      if (now - m.first > SESSION_TTL_SECONDS * 1000) {
        msgMap.set(sessionId, { count: 0, first: now });
      }
      m.count += 1;
      if (m.count > MESSAGE_LIMIT) {
        msgMap.set(sessionId, { count: 0, first: now });
        res.statusCode = 429;
        res.end(JSON.stringify({ limitReached: true }));
        return;
      }
      msgMap.set(sessionId, m);
      sessionTouched.set(sessionId, now);
    }

    // Prepare body for OpenAI (do not forward sessionId)
    const forwardBody = { ...body };
    delete forwardBody.sessionId;

    // Forward to OpenAI
    if (!process.env.OPENAI_API_KEY) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: "OPENAI_API_KEY not configured" }));
      return;
    }

    const openaiResp = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(forwardBody),
      }
    );

    const data = await openaiResp.json();

    // Relay response
    res.statusCode = openaiResp.status;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
    return;
  } catch (err) {
    console.error("api/chat error", err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: err.message }));
    return;
  }
}
