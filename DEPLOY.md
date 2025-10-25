# 🚀 B1 Bestie - Deployment Guide

## Quick Deploy to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Production ready"
git push origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables:
   - `OPENAI_API_KEY` or `VITE_OPENAI_API_KEY` = Your OpenAI API key
   - `UPSTASH_REDIS_REST_URL` = (Optional) Your Upstash Redis URL
   - `UPSTASH_REDIS_REST_TOKEN` = (Optional) Your Upstash Redis token

4. Click Deploy! 🎉

### 3. That's It!
Your app will be live at `https://your-app.vercel.app`

---

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3003](http://localhost:3003)

---

## API Endpoints

All endpoints are Vercel Serverless Functions in `/api/`:

- **`POST /api/chat`** - AI dialogue training
- **`POST /api/schreiben`** - Email correction & evaluation  
- **`POST /api/tts`** - Text-to-speech
- **`GET /api/health`** - Health check

---

## Environment Variables

### Required
- `OPENAI_API_KEY` - Your OpenAI API key

### Optional (for rate limiting)
- `UPSTASH_REDIS_REST_URL` - Redis URL from [upstash.com](https://upstash.com)
- `UPSTASH_REDIS_REST_TOKEN` - Redis auth token

---

## Features

✅ Works on all devices (desktop, mobile, tablet)  
✅ Auto-scaling with Vercel  
✅ Global CDN  
✅ Rate limiting (1 req/2s)  
✅ Session tracking  
✅ OpenAI integration

---

## Tech Stack

- **Frontend:** React 18 + Vite + Tailwind CSS
- **Backend:** Vercel Serverless Functions
- **AI:** OpenAI GPT-4o-mini
- **Deployment:** Vercel
- **Rate Limiting:** Upstash Redis (optional)

---

## Support

Questions? Check the docs in `/docs/` or open an issue on GitHub.

Happy learning! 🎓
