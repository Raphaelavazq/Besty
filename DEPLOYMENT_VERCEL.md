# Vercel Deployment Guide (Frontend + Serverless OpenAI Proxy)

This repository contains a Vite React SPA and a simple OpenAI proxy. For an
integrated deploy on Vercel, we recommend using Vercel Serverless Functions
(`/api/*`) for the proxy and a managed KV/Redis store for protection state.

Recommended store: Upstash Redis (serverless-friendly) or Vercel KV.

Environment variables (set in Vercel Project Settings):

- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `UPSTASH_REDIS_REST_URL` - (optional) Upstash REST URL
- `UPSTASH_REDIS_REST_TOKEN` - (optional) Upstash REST token

**CRITICAL:** Do NOT set `VITE_BACKEND_URL` in Vercel environment variables!
The app uses relative URLs (`/api/chat`, `/api/tts`) in production to call the serverless functions.
Only set `VITE_BACKEND_URL` locally in your `.env` file for local development with the Express backend

If `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are present, the
serverless function will use Upstash for rate-limiting, message counters and
session touch keys. Otherwise the function will use an in-memory fallback
(NOT recommended for production).

Vercel Build settings (usually auto-detected):

- Build command: `npm run build`
- Output directory: `dist`

Local test with Vercel CLI:

```bash
vercel login
vercel dev
```

Security note: Never commit API keys to the repository. Use Vercel's project
environment variable UI to store secrets.
