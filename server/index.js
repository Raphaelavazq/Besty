/**
 * Simple Express proxy for local development
 * Mimics Vercel serverless functions locally
 */

import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from parent directory
dotenv.config({ path: join(__dirname, "../.env") });

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Import and mount API handlers
const apiDir = join(__dirname, "../api");

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Local dev server running" });
});

// Dynamically import and mount each API function
async function mountHandler(path, file) {
  try {
    const module = await import(join(apiDir, file));
    const handler = module.default;

    app.all(path, async (req, res) => {
      console.log(`📥 Request to ${path}`);

      // Set timeout to prevent hanging
      const timeout = setTimeout(() => {
        if (!res.headersSent) {
          console.error(`⏰ Timeout on ${path}`);
          res.status(504).json({ error: "Request timeout" });
        }
      }, 60000); // 60 second timeout

      try {
        await handler(req, res);
        clearTimeout(timeout);
        console.log(`✅ Response sent for ${path}`);
      } catch (error) {
        clearTimeout(timeout);
        console.error(`❌ Error in ${path}:`, error.message);
        if (!res.headersSent) {
          res.status(500).json({ error: error.message });
        }
      }
    });

    console.log(`✅ Mounted ${path} → /api/${file}`);
  } catch (error) {
    console.error(`❌ Failed to mount ${path}:`, error.message);
  }
}

// Mount all API routes
async function mountRoutes() {
  await mountHandler("/api/chat", "chat.js");
  await mountHandler("/api/schreiben/correct", "schreiben.js");
  await mountHandler("/api/schreiben", "schreiben.js");
  await mountHandler("/api/tts", "tts.js");
  await mountHandler("/api/debug", "debug.js");
}

mountRoutes().then(() => {
  app.listen(PORT, () => {
    console.log("\n" + "=".repeat(60));
    console.log(`✅ Local dev server running on http://localhost:${PORT}`);
    console.log("=".repeat(60));
    console.log("📡 API endpoints:");
    console.log(`   POST http://localhost:${PORT}/api/chat`);
    console.log(`   POST http://localhost:${PORT}/api/schreiben/correct`);
    console.log(`   POST http://localhost:${PORT}/api/tts`);
    console.log(`   GET  http://localhost:${PORT}/api/health`);
    console.log("=".repeat(60) + "\n");
  });
});
