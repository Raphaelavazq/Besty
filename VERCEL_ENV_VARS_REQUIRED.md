# ⚠️ CRITICAL: Environment Variables for Vercel

## The Chat is Broken Because of Missing Environment Variables

Your chat feature returns a 500 error because Vercel needs these environment variables set in the dashboard.

## How to Fix

### 1. Go to Vercel Dashboard
1. Open https://vercel.com/raphaelavazqs-projects/besty
2. Click **Settings** tab
3. Click **Environment Variables** in sidebar

### 2. Add OPENAI_API_KEY (REQUIRED for chat)

**Variable Name:** `OPENAI_API_KEY`

**Value:** Your OpenAI API key (starts with `sk-...`)

**Environments:** ✅ Production ✅ Preview ✅ Development

### 3. Optional: Add Upstash for Rate Limiting

If you want rate limiting (recommended for production):

**Variable 1:**
- Name: `UPSTASH_REDIS_REST_URL`
- Value: Your Upstash REST URL (from Upstash dashboard)

**Variable 2:**
- Name: `UPSTASH_REDIS_REST_TOKEN`
- Value: Your Upstash REST token (from Upstash dashboard)

**Environments:** ✅ Production ✅ Preview

### 4. Redeploy After Adding Variables

**IMPORTANT:** After adding environment variables, you MUST redeploy!

Option A: Automatic (recommended)
```bash
# Push new code (will trigger auto-deploy)
./deploy-teil2.sh
git push origin main
```

Option B: Manual redeploy in Vercel dashboard
1. Go to Deployments tab
2. Click "..." on latest deployment
3. Click "Redeploy"

## How to Get Your OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Click **"+ Create new secret key"**
3. Give it a name like "B1 Bestie Production"
4. Copy the key (starts with `sk-...`)
5. **Save it immediately** - you can't see it again!
6. Paste into Vercel environment variables

## How to Verify It's Working

After setting variables and redeploying:

### Test 1: Check API Health
Visit: https://b1besty.vercel.app/api/debug

**Expected response:**
```json
{
  "ok": true,
  "hasOpenAI": true,
  "hasUpstash": false
}
```

If `hasOpenAI` is `false`, the env var isn't set correctly.

### Test 2: Test Chat Feature
1. Go to https://b1besty.vercel.app/tests/sprechen/dialogue
2. Click any scenario (e.g., "Im Restaurant")
3. Should see AI greeting without errors

**What you should see:**
```
🔵 [Frontend] Starting dialogue for scenario 2...
✅ [Frontend] Got AI greeting: "Guten Tag! Willkommen..."
```

**What you should NOT see:**
```
❌ AI Chat Service Error: SyntaxError: Unexpected token 'A'
Failed to load resource: the server responded with a status of 500
```

## Troubleshooting

### Issue: Still getting 500 errors after adding env var
**Solution:** 
1. Verify the key is actually saved in Vercel dashboard
2. **Redeploy** (env vars only take effect after redeploy)
3. Clear browser cache and hard reload (Cmd+Shift+R)

### Issue: hasOpenAI still shows false
**Solution:**
1. Check spelling: Must be exactly `OPENAI_API_KEY`
2. Check the key format: Must start with `sk-`
3. Try removing and re-adding the variable
4. Redeploy again

### Issue: API key is invalid
**Solution:**
1. Generate a new key at https://platform.openai.com/api-keys
2. Make sure your OpenAI account has credits/billing enabled
3. Update the variable in Vercel
4. Redeploy

## Current Status

- ❌ Chat feature broken (no OPENAI_API_KEY)
- ✅ Vercel routing fixed (vercel.json updated)
- ✅ Code ready to deploy (all files committed)
- ⏳ Waiting for you to add environment variable

## Quick Action Steps

1. **Right now:** Set `OPENAI_API_KEY` in Vercel dashboard
2. **Then run:** `./deploy-teil2.sh && git push origin main`
3. **Wait 30 seconds** for deployment to complete
4. **Test:** Visit https://b1besty.vercel.app/api/debug
5. **Verify:** Start a dialogue and confirm chat works

---

**Don't have an OpenAI API key?** Create one at https://platform.openai.com/api-keys (you'll need to add billing info)
