# 🚀 B1 Bestie - Deploy Guide

## Local Development

```bash
# Start development (both API server + Vite)
npm run dev

# Or use the helper script
./start.sh
```

Opens at http://localhost:3003

**What works locally:**

- ✅ Everything! (UI + All API features)

---

## Deploy to Vercel

### Step 1: Push to GitHub

```bash
git push origin main
```

### Step 2: Vercel Dashboard

1. Go to https://vercel.com
2. Import your GitHub repo
3. Add environment variable:
   ```
   OPENAI_API_KEY = sk-proj-your-key-here
   ```
4. Deploy

### Step 3: Done!

App is live at `https://your-app.vercel.app`

---

## How It Works

### Local Development

- **Express server (port 3001)** runs your `/api/*.js` files
- **Vite (port 3003)** serves React app and proxies API calls
- Same code as production!

### Production (Vercel)

- **Vercel serverless** runs your `/api/*.js` files automatically
- **Vercel CDN** serves your React app
- Zero config needed!

---

## Environment Variables

**Required in Vercel:**

- `OPENAI_API_KEY` - Your OpenAI API key

**Optional:**

- `UPSTASH_REDIS_REST_URL` - For rate limiting
- `UPSTASH_REDIS_REST_TOKEN` - For rate limiting

---

## Troubleshooting

### Local dev not working?

```bash
# Kill everything and restart
pkill -9 node
npm run dev
```

### Port already in use?

```bash
# Kill processes on ports 3001 and 3003
lsof -ti:3001,3003 | xargs kill -9
npm run dev
```

---

See `ARCHITECTURE_CLEAN.md` for full technical details.
