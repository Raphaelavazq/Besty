# 🏗️ Backend Architecture Audit & Recommendations

**Date:** October 25, 2025  
**Deployment:** Vercel Free Tier  
**OpenAI API Usage:** Dialogue Chat, Schreiben Correction, TTS

---

## 📊 Current Architecture Analysis

### ✅ What You Have Right Now

#### **Vercel Serverless Functions (✅ CORRECT)**

Located in `/api/` folder:

- ✅ `chat.js` - OpenAI dialogue proxy with rate limiting (Upstash Redis)
- ✅ `tts.js` - Text-to-Speech proxy
- ✅ `health.js` - Health check endpoint
- ✅ `debug.js` - Debug endpoint
- ❌ **MISSING:** `schreiben.js` - Email correction endpoint

#### **Express Backend (❌ NOT DEPLOYED)**

Located in `/backend/server.js`:

- 🔧 Express server on port 3001
- 🔧 Rate limiting with in-memory storage
- 🔧 Session tracking
- 🔧 `/api/chat` and `/api/schreiben/correct` endpoints
- ❌ **PROBLEM:** This runs ONLY locally, NOT on Vercel!

---

## 🚨 Critical Issues Found

### 1. **Backend/API Duplication** 🔴 HIGH PRIORITY

You have TWO backends:

- **Vercel Functions** (`/api/*.js`) - ✅ Deployed to production
- **Express Server** (`/backend/server.js`) - ❌ Only runs locally

**Impact:**

- ❌ Schreiben feature works locally but **FAILS in production**
- ❌ Different protection systems (Upstash vs in-memory)
- ❌ Confusing environment variable setup

### 2. **Missing Schreiben Endpoint** 🔴 HIGH PRIORITY

- Frontend calls: `/api/schreiben/correct`
- Express has it: ✅ `server.js` line 362
- Vercel functions: ❌ **MISSING `/api/schreiben.js`**

**Result:** 404 error in production for Schreiben feature

### 3. **Environment Variable Confusion** 🟡 MEDIUM

`.env` file:

```env
VITE_BACKEND_URL=http://localhost:3001/api/chat  # ❌ Wrong path!
```

**Problems:**

- Points to `/api/chat` but schreibenService needs `/api`
- Local-only URL, doesn't work in production
- Hardcoded port 3001

### 4. **Inconsistent Protection Systems** 🟡 MEDIUM

- `chat.js`: Uses **Upstash Redis** (✅ production-ready)
- `server.js`: Uses **in-memory Map** (❌ doesn't persist)

**Impact:** Rate limiting resets on every Vercel cold start

---

## ✨ Recommended Architecture (Clean & Simple)

### **Single Backend: Vercel Serverless Functions**

```
/api/
├── chat.js          ✅ Exists - OpenAI dialogue proxy
├── schreiben.js     ❌ CREATE THIS - Email correction
├── tts.js           ✅ Exists - Text-to-speech
├── health.js        ✅ Exists - Health check
└── debug.js         ✅ Exists - Debug info
```

### **Why This Architecture?**

#### ✅ **Advantages:**

1. **Vercel Free Tier Perfect Fit**
   - 100GB bandwidth/month
   - 100k serverless function invocations/month
   - Auto-scaling, zero server management
   - Global CDN for static files

2. **No Server Maintenance**
   - No Express server to manage
   - No port conflicts
   - No process crashes
   - Auto-restarts on errors

3. **Works Everywhere**
   - Desktop ✅
   - Mobile ✅
   - Tablets ✅
   - All browsers ✅

4. **Production = Development**
   - Same code paths in dev and prod
   - Easier debugging
   - Fewer surprises after deployment

#### ⚠️ **What You'll Lose (Don't Worry, Not Needed):**

- Express middleware ecosystem (you don't need it)
- Long-running background tasks (not needed for your app)
- WebSocket support (not needed for your app)

---

## 🛠️ Implementation Plan

### **Step 1: Create Missing Schreiben Endpoint** 🔴 CRITICAL

Create `/api/schreiben.js`:

```javascript
/**
 * Vercel Serverless Function: DTZ Schreiben Email Correction
 * Evaluates and corrects B1-level emails/letters
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

// Upstash Redis helper
async function upstashCommand(command, args) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Upstash not configured");

  const resp = await fetch(`${url}/${command}/${args.join("/")}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return resp.json();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body;
  try {
    body = await readJson(req);
  } catch (err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  const { text, prompt, type, sessionId } = body;

  // Validate input
  if (!text || !prompt || !type) {
    return res.status(400).json({
      error: "Missing required fields: text, prompt, type",
    });
  }

  const wordCount = text.trim().split(/\s+/).length;
  if (wordCount < 50) {
    return res.status(400).json({
      error: `Text zu kurz. ${wordCount} Wörter, mindestens 50 erforderlich.`,
      wordCount,
    });
  }

  const actualSessionId =
    sessionId || `anon_${Math.random().toString(36).slice(2, 9)}`;

  // Rate limiting with Upstash (1 request per 2 seconds)
  const RATE_WINDOW = 2;
  try {
    const rateKey = `schreiben:rate:${actualSessionId}`;
    const rateData = await upstashCommand("INCR", [rateKey]);
    const rateCount = rateData?.result ?? 0;

    if (rateCount === 1) {
      await upstashCommand("EXPIRE", [rateKey, RATE_WINDOW]);
    }

    if (rateCount > 1) {
      return res.status(429).json({
        error: "Too many requests",
        retryAfter: RATE_WINDOW,
      });
    }
  } catch (err) {
    console.warn("Upstash rate limit failed, continuing:", err.message);
  }

  // Create system prompt for GPT
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

  // Call OpenAI
  try {
    const OPENAI_API_KEY =
      process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: "OpenAI API key not configured" });
    }

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
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

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      console.error("OpenAI error:", errorData);
      return res.status(openaiResponse.status).json({
        error: "OpenAI API error",
        details: errorData,
      });
    }

    const openaiData = await openaiResponse.json();
    const aiMessage = openaiData.choices[0].message.content;
    const correctionData = JSON.parse(aiMessage);

    // Add metadata
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

    return res.status(200).json(result);
  } catch (error) {
    console.error("Schreiben API error:", error);
    return res.status(500).json({
      error: "Failed to process correction",
      details: error.message,
    });
  }
}
```

### **Step 2: Update Environment Variables** 🟡 MEDIUM

**Current `.env` (❌ WRONG):**

```env
VITE_BACKEND_URL=http://localhost:3001/api/chat
```

**New `.env` (✅ CORRECT):**

```env
# OpenAI API Key
VITE_OPENAI_API_KEY=sk-proj-...

# Backend URL (leave empty for Vercel, set for local dev only)
# VITE_BACKEND_URL=  # ← Empty in production!
```

**Why empty?**

- Production: Uses relative paths `/api/chat`, `/api/schreiben`, `/api/tts`
- Vercel automatically routes `/api/*` to serverless functions
- No hardcoded URLs = works everywhere

**For local development:**

```env
# Local development only (comment out for production)
# VITE_BACKEND_URL=http://localhost:3000/api
```

### **Step 3: Update Frontend Services** 🟡 MEDIUM

**Fix `schreibenService.js`:**

```javascript
// Before (❌):
const API_BASE = import.meta.env.VITE_BACKEND_URL || "/api";

// After (✅):
const API_BASE = "/api";  // Always use relative path

// Then use:
fetch(`${API_BASE}/schreiben/correct`, ...)  // → /api/schreiben/correct
```

**Fix `aiChatService.js`:**

```javascript
// Before (❌):
const API_ENDPOINT = import.meta.env.VITE_BACKEND_URL || "/api/chat";

// After (✅):
const API_ENDPOINT = "/api/chat"; // Always use relative path
```

**Fix TTS calls in components:**

```javascript
// Before (❌):
const ttsUrl = import.meta.env.VITE_BACKEND_URL
  ? import.meta.env.VITE_BACKEND_URL.replace("/api/chat", "/api/tts")
  : "/api/tts";

// After (✅):
const ttsUrl = "/api/tts"; // Simple!
```

### **Step 4: Remove Express Backend** 🟢 LOW PRIORITY (Optional)

You can keep `/backend/server.js` for local testing, OR remove it to simplify.

**Option A: Keep for Local Dev (Recommended)**

- Use `./dev-start.sh` to run Express locally
- Deploy uses Vercel functions
- Good for debugging

**Option B: Remove Completely**

- Delete `/backend/` folder
- Vercel functions work locally too
- Simpler project structure

---

## 📦 Vercel Configuration

**`vercel.json` (✅ Already Correct):**

```json
{
  "buildCommand": "npm run build",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

**This means:**

- `/api/chat` → `/api/chat.js` serverless function
- `/api/schreiben/correct` → `/api/schreiben.js` (once you create it)
- `/api/tts` → `/api/tts.js`
- Everything else → React SPA (Vite build)

---

## 🔐 Environment Variables in Vercel

**Required in Vercel Dashboard:**

1. **OPENAI_API_KEY** or **VITE_OPENAI_API_KEY**
   - Your OpenAI API key
   - Used by all API endpoints

2. **UPSTASH_REDIS_REST_URL** (Optional but recommended)
   - Redis URL for rate limiting
   - Free tier: https://upstash.com/

3. **UPSTASH_REDIS_REST_TOKEN** (Optional but recommended)
   - Redis auth token
   - Works with above URL

**Set these in:**
Vercel Dashboard → Your Project → Settings → Environment Variables

---

## 🎯 Benefits After Implementation

### ✅ **What You Get:**

1. **Works Everywhere**
   - Desktop browsers ✅
   - Mobile browsers ✅
   - Tablets ✅
   - Safari, Chrome, Firefox, Edge ✅

2. **No More 404 Errors**
   - Schreiben works in production ✅
   - Dialogue chat works ✅
   - TTS works ✅

3. **Simple Deployment**

   ```bash
   git push
   # Vercel auto-deploys ✅
   ```

4. **Cost Efficient**
   - Vercel Free Tier: 100k requests/month ✅
   - OpenAI API: Pay only for what you use ✅
   - No server costs ✅

5. **Auto-Scaling**
   - 1 user? ✅
   - 1000 users? ✅
   - Vercel handles it automatically

6. **Better Performance**
   - Global CDN ✅
   - Edge caching ✅
   - Fast cold starts (<100ms) ✅

---

## 📋 Implementation Checklist

### Phase 1: Critical Fixes (Do This Now!) 🔴

- [ ] Create `/api/schreiben.js` with correction logic
- [ ] Update `.env` to remove `VITE_BACKEND_URL` (or leave empty)
- [ ] Update `schreibenService.js` to use `/api` base
- [ ] Update `aiChatService.js` to use `/api/chat` directly
- [ ] Test Schreiben locally
- [ ] Deploy to Vercel
- [ ] Test in production

### Phase 2: Cleanup (Do After Testing) 🟡

- [ ] Remove TTS URL replacement logic in components
- [ ] Simplify all `fetch()` calls to use relative paths
- [ ] Update all service files to remove env variable checks
- [ ] Test all features again

### Phase 3: Optional Improvements 🟢

- [ ] Add Upstash Redis for persistent rate limiting
- [ ] Add error tracking (Sentry, LogRocket)
- [ ] Add analytics for API usage
- [ ] Decide: Keep or remove Express backend

---

## 🚀 Quick Start Commands

### Local Development

```bash
# Option 1: Run everything (Express + Vite)
./dev-start.sh

# Option 2: Run only Vite (uses /api/* from Vercel in dev)
npm run dev
```

### Deploy to Production

```bash
git add .
git commit -m "Fix backend architecture"
git push origin main
# Vercel auto-deploys
```

### Test After Deploy

```bash
# Test chat
curl -X POST https://your-app.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-4o-mini","messages":[{"role":"user","content":"Hallo"}]}'

# Test schreiben (after creating endpoint)
curl -X POST https://your-app.vercel.app/api/schreiben/correct \
  -H "Content-Type: application/json" \
  -d '{"text":"Hallo","prompt":{"title":"Test","situation":"Test","recipient":"Test","contentPoints":["A","B","C"]},"type":"informal"}'

# Test TTS
curl -X POST https://your-app.vercel.app/api/tts \
  -H "Content-Type: application/json" \
  -d '{"text":"Hallo","voice":"nova"}' \
  --output test.mp3
```

---

## ❓ FAQ

### Q: Why not use Express on Vercel?

**A:** Vercel doesn't support long-running Express servers. Serverless functions are the native way.

### Q: Will rate limiting work without Upstash?

**A:** Yes, but it resets on cold starts. Upstash makes it persistent.

### Q: Can I still develop locally?

**A:** Yes! Keep Express backend for local dev, Vercel functions deploy to production.

### Q: What about WebSockets?

**A:** Not needed for your app. All features work with HTTP requests.

### Q: Will this scale?

**A:** Yes! Vercel Free Tier handles up to 100k requests/month. Upgrade if you need more.

---

## 🎓 Summary

**Current Problem:**

- Two backends (Express + Vercel)
- Schreiben endpoint missing in production
- Environment variables pointing to localhost
- 404 errors in production

**Solution:**

- Single backend: Vercel Serverless Functions
- Create `/api/schreiben.js`
- Use relative paths everywhere
- No environment variable needed for API URLs

**Result:**

- ✅ Works on all devices
- ✅ Works in production
- ✅ No 404 errors
- ✅ Simple deployment
- ✅ Auto-scaling
- ✅ Free tier friendly

**Next Step:**

1. Create `/api/schreiben.js` (I'll do this for you)
2. Test locally
3. Deploy to Vercel
4. Celebrate! 🎉

---

**Ready to implement? Let me know and I'll create all the files for you!**
