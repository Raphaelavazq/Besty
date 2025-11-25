# 🚀 Vercel Deployment Checklist

**Complete guide to deploy B1 Bestie to production**

---

## ✅ Pre-Deployment Checklist

### 1. **Code Readiness**

- [x] Mobile Google OAuth button added
- [x] Bundesland persistence fixed (loads from database)
- [x] Loading text colors fixed (white on purple)
- [x] Privacy policy complete with contact email
- [x] Terms of service complete
- [x] Data export feature implemented
- [x] Account deletion feature implemented
- [x] All consent checkboxes on sign-up

### 2. **Environment Variables Ready**

You'll need 3 environment variables:

| Variable | Where to Get | Required |
|----------|--------------|----------|
| `VITE_SUPABASE_URL` | Supabase Dashboard | ✅ Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase Dashboard | ✅ Yes |
| `OPENAI_API_KEY` | OpenAI Platform | ✅ Yes (for AI features) |

### 3. **Current Branch**

- Current: `einburgue`
- Need to: Merge to `main` before deploying

---

## 📋 Step-by-Step Deployment

### **STEP 1: Set Up Supabase** (15 minutes)

#### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"New project"**
3. Choose settings:
   - **Name**: `b1-bestie` (or your choice)
   - **Database Password**: Generate strong password (save it!)
   - **Region**: **Europe Central (Frankfurt)** ⚠️ IMPORTANT for GDPR
   - **Pricing Plan**: Free tier is fine

#### 1.2 Run Database Schema

1. In Supabase Dashboard → Click **"SQL Editor"** (left sidebar)
2. Click **"New query"**
3. Open your local file: `/Users/rafaela/Desktop/Besty/supabase-schema.sql`
4. Copy ENTIRE contents
5. Paste into Supabase SQL Editor
6. Click **"Run"** (or press Ctrl/Cmd + Enter)
7. ✅ Should see: "Success. No rows returned"

**What this creates:**
- `profiles` table (user accounts)
- `question_progress` table (learning progress)
- `exam_simulations` table (test results)
- `study_sessions` table (activity tracking)
- All RLS (Row Level Security) policies
- All indexes for performance

#### 1.3 Get API Keys

1. In Supabase Dashboard → Click **"Settings"** (gear icon, bottom left)
2. Click **"API"** in settings menu
3. Copy these two values:

```
Project URL:  https://xxxxx.supabase.co
anon public:  eyJhbGc...  (long token)
```

**Save these!** You'll need them in Step 3.

#### 1.4 Configure Authentication

1. In Supabase Dashboard → Click **"Authentication"** (left sidebar)
2. Click **"Providers"** tab
3. Configure providers:

**Email/Password:**
- Already enabled by default ✅

**Google OAuth:**
1. Toggle **"Enable Google provider"** ON
2. You'll need Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create new project or select existing
   - Enable "Google+ API"
   - Go to "Credentials" → "Create Credentials" → "OAuth Client ID"
   - Application type: **Web application**
   - Authorized JavaScript origins:
     - `http://localhost:5173` (development)
     - `https://your-app.vercel.app` (production - add after deployment)
   - Authorized redirect URIs:
     - `https://xxxxx.supabase.co/auth/v1/callback` (your Supabase URL)
   - Copy **Client ID** and **Client Secret**
3. Back in Supabase:
   - Paste Google **Client ID**
   - Paste Google **Client Secret**
   - Click **"Save"**

**Site URL Configuration:**
1. In Authentication settings → **"URL Configuration"**
2. Set **Site URL**: `https://your-app.vercel.app` (update after deployment)
3. Add **Redirect URLs**:
   - `http://localhost:5173/auth/callback` (development)
   - `https://your-app.vercel.app/auth/callback` (production)

---

### **STEP 2: Get OpenAI API Key** (5 minutes)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign in / Create account
3. Click your profile → **"View API keys"**
4. Click **"Create new secret key"**
5. Name it: `b1-bestie-production`
6. Copy the key (starts with `sk-...`)
7. ⚠️ **SAVE IT NOW** - you can't see it again!

**Pricing:**
- GPT-4o: ~$2.50 per 1M input tokens
- For writing correction: ~$0.01-0.05 per correction
- Estimate: $5-10/month for moderate usage

---

### **STEP 3: Commit Your Changes** (2 minutes)

```bash
cd /Users/rafaela/Desktop/Besty

# Check what changed
git status

# Add all changes
git add .

# Commit with message
git commit -m "feat: Add privacy system, fix mobile OAuth, fix bundesland persistence"

# Check current branch
git branch
# Should show: * einburgue
```

---

### **STEP 4: Merge to Main Branch** (2 minutes)

```bash
# Switch to main branch
git checkout main

# Merge einburgue into main
git merge einburgue

# Push to GitHub
git push origin main
```

---

### **STEP 5: Deploy to Vercel** (10 minutes)

#### 5.1 Connect GitHub Repository

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Select repository: **Raphaelavazq/Besty**
5. Click **"Import"**

#### 5.2 Configure Project

**Framework Preset:**
- Auto-detected: **Vite** ✅

**Root Directory:**
- Leave as: `/` (root)

**Build Command:**
- Default: `npm run build` ✅

**Output Directory:**
- Default: `dist` ✅

**Install Command:**
- Default: `npm install` ✅

#### 5.3 Add Environment Variables

Click **"Environment Variables"** section and add:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
OPENAI_API_KEY=sk-proj-...
```

⚠️ **IMPORTANT:**
- Variable names MUST be exact (case-sensitive)
- No quotes needed
- No spaces around `=`
- Apply to: **Production, Preview, and Development** (check all)

#### 5.4 Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. ✅ You'll see: "Congratulations! Your project has been successfully deployed."
4. Click **"Visit"** to see your app

**Your URL will be:**
```
https://besty-xxxxx.vercel.app
```

---

### **STEP 6: Update Google OAuth Redirect** (5 minutes)

Now that you have your Vercel URL:

1. Go back to [Google Cloud Console](https://console.cloud.google.com)
2. Go to "Credentials"
3. Click your OAuth Client ID
4. Add to **"Authorized JavaScript origins"**:
   ```
   https://besty-xxxxx.vercel.app
   ```
5. The redirect URI should already be your Supabase callback URL ✅
6. Click **"Save"**

---

### **STEP 7: Update Supabase Site URL** (2 minutes)

1. Go to Supabase Dashboard
2. Authentication → URL Configuration
3. Update **Site URL** to: `https://besty-xxxxx.vercel.app`
4. Update **Redirect URLs** to include:
   ```
   https://besty-xxxxx.vercel.app/auth/callback
   ```
5. Click **"Save"**

---

### **STEP 8: Test Production Deployment** (10 minutes)

#### 8.1 Authentication Tests

Visit: `https://besty-xxxxx.vercel.app`

- [ ] Email sign-up works
  - [ ] Checkboxes for privacy/terms are required
  - [ ] Can click privacy/terms links
  - [ ] Account created successfully
  - [ ] Redirects to dashboard
- [ ] Email sign-in works
  - [ ] Existing account can log in
  - [ ] Wrong password shows error
- [ ] Google sign-in works
  - [ ] Click "Mit Google anmelden"
  - [ ] Redirects to Google consent screen
  - [ ] After consent, redirects back and logs in
  - [ ] ✅ Button visible on MOBILE too
- [ ] Guest mode works
  - [ ] "Ohne Konto fortfahren" button works
  - [ ] Shows warning about no progress saving

#### 8.2 Database Tests

After logging in:

- [ ] Go to Einbürgerungstest → Fragenkatalog
- [ ] Answer a few questions
- [ ] Rate difficulty (😊 🤔 😓)
- [ ] Mark one as "Ich kann das"
- [ ] **Sign out**
- [ ] **Sign in again**
- [ ] ✅ Progress should be saved!

#### 8.3 Settings Tests

Go to Settings:

- [ ] Change Bundesland to different state
- [ ] Click "Einstellungen speichern"
- [ ] ✅ Shows success message
- [ ] Sign out and sign in again
- [ ] Go to Settings
- [ ] ✅ Bundesland should be the one you saved (not Berlin!)

#### 8.4 Privacy Features Tests

In Settings → "Datenschutz & Privatsphäre":

- [ ] Click "Ansehen" → Opens privacy policy ✅
- [ ] Click "Export" → Downloads JSON file ✅
  - [ ] Open the JSON file
  - [ ] Should contain your profile, progress, sessions
- [ ] **DON'T TEST** account deletion yet (use test account for this!)

#### 8.5 Image Tests

- [ ] Go to Einbürgerungstest → Fragenkatalog
- [ ] Search for question: 21
- [ ] ✅ Image should display (Bundeswappen)
- [ ] Test these image questions:
  - [ ] Q21, Q55, Q130, Q176, Q187, Q209, Q216, Q226, Q391, Q398

#### 8.6 Mobile Tests

On your phone or Chrome DevTools (toggle device toolbar):

- [ ] Navigation sidebar works (hamburger menu)
- [ ] Sign-up form displays correctly
- [ ] **Google button is visible** ✅
- [ ] Questions display correctly
- [ ] Images display on mobile
- [ ] Touch targets are large enough (44px minimum)
- [ ] Dark mode toggle works

#### 8.7 AI Features Tests (Requires OPENAI_API_KEY)

- [ ] Schreiben → Trainer
  - [ ] Write a short email
  - [ ] Click "Text korrigieren"
  - [ ] ✅ Should get AI feedback (not error)
- [ ] Sprechen → Dialogue Trainer
  - [ ] Start a dialogue
  - [ ] ✅ AI should respond (not error)

---

## ⚙️ Post-Deployment Configuration

### Custom Domain (Optional)

1. In Vercel → Your project → Settings → Domains
2. Add your domain: `b1bestie.com`
3. Follow DNS setup instructions
4. Update Google OAuth origins to include custom domain
5. Update Supabase Site URL to custom domain

### Environment Variables Updates

If you need to change environment variables:

1. Vercel Dashboard → Your project → Settings → Environment Variables
2. Edit the variable
3. Redeploy: Deployments tab → Click "..." → Redeploy

### Analytics (Recommended)

Vercel Analytics is already configured in code:
```jsx
import { Analytics } from "@vercel/analytics/react";
// In App.jsx: <Analytics />
```

To enable:
1. Vercel Dashboard → Your project → Analytics tab
2. Click "Enable Analytics"
3. Free tier: 2,500 events/month

---

## 🐛 Common Issues & Solutions

### Issue: Build fails on Vercel

**Error**: "VITE_SUPABASE_URL is not defined"

**Solution:**
1. Check environment variables are set
2. Make sure names are EXACT: `VITE_SUPABASE_URL` (not `SUPABASE_URL`)
3. Redeploy after adding env vars

---

### Issue: 404 on page refresh

**Error**: Refreshing `/dashboard` shows 404

**Solution:** Already fixed! ✅
- `vercel.json` has rewrites configured
- All routes redirect to `/` for SPA routing

---

### Issue: Images not loading

**Error**: 404 for images

**Solution:**
1. Check images are in `public/images/einbuergerungstest/`
2. Paths should start with `/` (absolute)
3. Redeploy if images were added after initial deploy

---

### Issue: Google OAuth fails

**Error**: "redirect_uri_mismatch"

**Solution:**
1. Check Google Cloud Console → Authorized redirect URIs
2. Must include: `https://xxxxx.supabase.co/auth/v1/callback`
3. Must be EXACT match (no trailing slash)

---

### Issue: Database not saving

**Error**: Progress doesn't persist

**Check:**
1. Browser console for errors
2. Supabase Dashboard → Table Editor → Check if data is there
3. Check RLS policies are enabled: `SELECT * FROM pg_policies;`

**Solution:**
- If RLS policies missing, re-run schema SQL
- Check user is authenticated (not guest mode)

---

## 📊 Monitoring

### Vercel Logs

View logs:
1. Vercel Dashboard → Your project → **Logs** tab
2. Filter by: Functions, Edge, Build
3. Real-time or historical

### Supabase Logs

View database queries:
1. Supabase Dashboard → **Logs** (left sidebar)
2. See all SQL queries, slow queries, errors

### Performance

Check loading speed:
1. Vercel Dashboard → **Analytics** → Speed Insights
2. Lighthouse score in Chrome DevTools
3. Target: >90 performance score

---

## ✅ Final Checklist

Before announcing to users:

- [ ] All features tested on production
- [ ] Mobile experience tested on real device
- [ ] Privacy policy accessible
- [ ] Terms of service accessible
- [ ] Data export works
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled
- [ ] Backup database (Supabase auto-backups enabled)

---

## 🎉 You're Live!

**Your app is now deployed at:**
```
https://besty-xxxxx.vercel.app
```

**Share with users:**
- Send the link
- Test with a few beta users first
- Gather feedback
- Iterate and improve!

---

## 📞 Support

If you encounter issues:

1. **Check Vercel logs** (most common source of errors)
2. **Check browser console** (F12 → Console tab)
3. **Check Supabase logs** (Database → Logs)
4. **Review this checklist** (did you miss a step?)
5. **GitHub Issues**: Report bugs with logs attached

---

## 🔄 Future Deployments

After the initial deployment, updates are automatic:

```bash
# Make changes to code
git add .
git commit -m "feat: Add new feature"
git push origin main

# Vercel automatically detects the push and redeploys!
# Takes ~2 minutes
```

**Check deployment status:**
- Vercel Dashboard → Deployments tab
- Or GitHub webhook will show status

---

**Last Updated:** 25 November 2025
**Status:** ✅ Ready to Deploy
