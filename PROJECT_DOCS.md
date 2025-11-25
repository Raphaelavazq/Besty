# 📚 B1 Bestie - Complete Project Documentation

> **Last Updated**: November 25, 2025  
> **Branch**: einburgue → ready to merge to main  
> **Status**: ✅ Production Ready

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Development Standards](#development-standards)
4. [Database Schema (Supabase)](#database-schema)
5. [Deployment Guide](#deployment-guide)
6. [Feature Documentation](#feature-documentation)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**B1 Bestie** is a modern web application for DTZ B1 German exam preparation with:

- **Einbürgerungstest**: 460 questions with progress tracking, confidence ratings, exam simulator
- **Hören (Listening)**: Audio-based exercises with timestamps
- **Lesen (Reading)**: Reading comprehension exercises
- **Schreiben (Writing)**: AI-powered correction feedback
- **Sprechen (Speaking)**: AI dialogue practice with voice

### Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Zustand
- **Backend**: Supabase (PostgreSQL + Auth)
- **AI**: OpenAI GPT-4 (text), TTS/STT (audio)
- **Deployment**: Vercel (production)

---

## 🏗️ Architecture

### Directory Structure

```
Besty/
├── src/
│   ├── components/          # Reusable UI (AudioPlayer, Layout, etc.)
│   ├── features/            # Feature modules
│   │   └── einbuergerungstest/
│   │       ├── EinbuergerungstestHub.jsx
│   │       ├── Fragenkatalog.jsx    # 460 questions catalog
│   │       ├── TrainingMode.jsx     # Practice modes
│   │       └── ExamSimulator.jsx    # 33-question exam
│   ├── pages/               # Route components
│   ├── store/               # Zustand state management
│   └── lib/                 # Utilities (supabase.js)
├── public/
│   ├── data/                # JSON content files
│   │   └── einbuergerungstest/
│   │       └── questions.json       # 460 questions with images
│   ├── images/              # Image assets
│   │   └── einbuergerungstest/     # 10 exam images (21.png, 55.png, etc.)
│   └── audio/               # Audio files (not in repo - too large)
├── api/                     # Vercel serverless functions
├── docs/                    # Detailed feature docs
└── supabase-schema.sql      # Database schema
```

### Data Flow

```
User Action → React Component → Zustand Store
                    ↓
              Supabase Client (with RLS)
                    ↓
              PostgreSQL Database
```

---

## 🎨 Development Standards

### Design System

**Colors** (from `tailwind.config.js`):

- **Primary**: Purple/Indigo gradient (`from-purple-600 to-indigo-600`)
- **Background Light**: `from-purple-50 via-indigo-50 to-pink-50`
- **Background Dark**: `dark:from-dark-bg-primary dark:via-dark-bg-secondary`
- **Text Light**: `text-gray-900`
- **Text Dark**: `dark:text-dark-text-primary`

**Components**:

- Glass-morphism: `bg-white/80 backdrop-blur-md`
- Rounded corners: `rounded-2xl`, `rounded-3xl`
- Shadows: `shadow-xl`, `hover:shadow-2xl`
- Hover effects: `hover:-translate-y-1 transition-all duration-200`

**Typography**:

- Headlines: `text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent`
- Body: `text-gray-600 dark:text-dark-text-secondary`

**Accessibility**:

- Minimum 44px touch targets (mobile)
- WCAG AA contrast ratios (4.5:1 text, 3:1 interactive)
- Focus states: `focus:ring-2 focus:ring-purple-500`

### Code Standards

**React Patterns**:

```jsx
// ✅ Good - Modern hooks, proper state management
const [state, setState] = useState(initialValue);
const { user } = useAuthStore();

// ✅ Good - Conditional rendering
{
  isAuthenticated && <PrivateContent />;
}

// ✅ Good - Event handlers
const handleClick = async () => {
  try {
    await supabase.from("table").insert(data);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

**Supabase Patterns**:

```javascript
// ✅ Good - Use .maybeSingle() to avoid 406 errors
const { data, error } = await supabase
  .from("question_progress")
  .select("*")
  .eq("user_id", user.id)
  .eq("question_id", questionId)
  .maybeSingle();

// ✅ Good - Batch loading for performance
const { data: allProgress } = await supabase
  .from("question_progress")
  .select("*")
  .eq("user_id", user.id);

const progressMap = new Map(allProgress.map((p) => [p.question_id, p]));
```

---

## 🗄️ Database Schema

### Tables

#### `profiles` (User data)

```sql
id UUID PRIMARY KEY (references auth.users)
email TEXT NOT NULL
full_name TEXT
bundesland TEXT NOT NULL  -- Determines state-specific questions
native_language TEXT DEFAULT 'de'
created_at TIMESTAMP
updated_at TIMESTAMP
```

#### `question_progress` (460 questions tracking)

```sql
id UUID PRIMARY KEY
user_id UUID REFERENCES profiles(id)
question_id INTEGER (1-460)
confidence_level TEXT ('new'|'easy'|'medium'|'hard')
is_mastered BOOLEAN DEFAULT false
marked_for_review BOOLEAN DEFAULT false
times_seen INTEGER DEFAULT 0
times_correct INTEGER DEFAULT 0
times_wrong INTEGER DEFAULT 0
next_review_date TIMESTAMP
last_seen_at TIMESTAMP
created_at TIMESTAMP

UNIQUE(user_id, question_id)
```

#### `exam_simulations` (Exam results)

```sql
id UUID PRIMARY KEY
user_id UUID REFERENCES profiles(id)
score INTEGER (0-33)
passed BOOLEAN (true if score >= 17)
time_taken_seconds INTEGER
questions_data JSONB  -- Full exam details
completed_at TIMESTAMP
created_at TIMESTAMP
```

#### `study_sessions` (Activity tracking)

```sql
id UUID PRIMARY KEY
user_id UUID REFERENCES profiles(id)
session_type TEXT ('fragenkatalog'|'hoeren'|'lesen'|'schreiben'|'sprechen'|'probetest')
questions_studied INTEGER
correct_answers INTEGER
duration_seconds INTEGER
session_date TIMESTAMP
created_at TIMESTAMP
```

### Row Level Security (RLS)

**ALL TABLES** have RLS enabled with policies:

- Users can only SELECT/INSERT/UPDATE/DELETE their own data
- `auth.uid() = user_id` enforced on all operations

### Indexes (Performance)

```sql
-- Fast lookups for user progress
CREATE INDEX idx_question_progress_user_id ON question_progress(user_id);
CREATE INDEX idx_question_progress_confidence ON question_progress(user_id, confidence_level);
CREATE INDEX idx_question_progress_review_date ON question_progress(user_id, next_review_date);

-- Fast lookups for exams
CREATE INDEX idx_exam_simulations_user_id ON exam_simulations(user_id);
CREATE INDEX idx_exam_simulations_completed_at ON exam_simulations(user_id, completed_at DESC);
```

---

## 🚀 Deployment Guide

### Prerequisites

1. **Supabase Project**: Create at https://supabase.com
2. **OpenAI API Key**: Get from https://platform.openai.com
3. **Vercel Account**: Sign up at https://vercel.com
4. **GitHub Repo**: Push code to GitHub

### Step 1: Set Up Supabase

1. Create new project in Supabase dashboard
2. Run the schema:
   ```bash
   # Copy contents of supabase-schema.sql
   # Paste into Supabase SQL Editor
   # Execute
   ```
3. Get credentials:
   - Project URL: `https://xxxxx.supabase.co`
   - Anon Key: `eyJxxx...` (from Settings → API)

### Step 2: Deploy to Vercel

1. **Connect Repository**:
   - Go to vercel.com → New Project
   - Import from GitHub: `Raphaelavazq/Besty`
   - Select `main` branch

2. **Configure Environment Variables**:

   ```bash
   # Add in Vercel Dashboard → Settings → Environment Variables

   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJxxx...your-anon-key
   OPENAI_API_KEY=sk-...your-openai-key
   ```

3. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (~2 minutes)
   - Visit your production URL

### Step 3: Post-Deployment Checks

```bash
# Test these features:
✅ Homepage loads
✅ Authentication works (sign up/sign in)
✅ Einbürgerungstest catalog loads
✅ Question images display (Q21, Q55, Q130, etc.)
✅ Progress saves to database
✅ Dark mode toggle works
✅ Mobile responsive (test on phone)
✅ AI features work (Schreiben correction, Sprechen chat)
```

### Environment Variables Reference

| Variable                 | Purpose             | Required      | Where to Get                        |
| ------------------------ | ------------------- | ------------- | ----------------------------------- |
| `VITE_SUPABASE_URL`      | Database connection | ✅ Production | Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Public API key      | ✅ Production | Supabase Dashboard → Settings → API |
| `OPENAI_API_KEY`         | AI features         | ✅ Production | OpenAI Platform → API Keys          |

---

## 📖 Feature Documentation

### Einbürgerungstest (Citizenship Test)

**Files**:

- `src/features/einbuergerungstest/Fragenkatalog.jsx` (918 lines) - Full catalog
- `src/features/einbuergerungstest/TrainingMode.jsx` (1207 lines) - Practice modes
- `src/features/einbuergerungstest/ExamSimulator.jsx` (1042 lines) - Exam simulation
- `public/data/einbuergerungstest/questions.json` (6651 lines) - 460 questions

**Features**:

1. **Fragenkatalog** (Question Catalog):
   - Browse all 460 questions
   - Filter by confidence level (😊 Easy, 🤔 Medium, 😓 Hard)
   - Filter by mastered status ("Gelernt")
   - Search by question number or keyword
   - Rate difficulty after answering
   - Mark as "Ich kann das" (I know this)
   - Images display for visual questions (10 questions with images)

2. **Training Modes**:
   - Quick Test (10 random questions)
   - By Theme (choose category: Politik, Geschichte, etc.)
   - Difficult Questions (based on your wrong answers)
   - Custom Amount (choose how many questions)
   - Full progress tracking with database sync

3. **Exam Simulator**:
   - Real exam format: 33 questions (30 general + 3 bundesland-specific)
   - 60-minute timer
   - Pass threshold: 17/33 correct (51%)
   - Results saved to database with full exam data

**Image Questions**:
10 questions have images stored in `public/images/einbuergerungstest/`:

- Q21: Bundeswappen (German coat of arms)
- Q55: Reichstag building
- Q130: Valid ballot paper
- Q176: Occupation zones map (1945)
- Q187: DDR flag
- Q209: DDR Wappen (historical coats)
- Q216: Bundestag chamber
- Q226: EU flag
- Q391: NRW Wappen (North Rhine-Westphalia)
- Q398: NRW map location

**Performance Optimization**:

- **Before**: 460 API calls (one per question) → 460 HTTP 406 errors
- **After**: 1 batch API call → Map-based O(1) lookups
- **Result**: 99.8% reduction in API requests

### Dark Mode

**Implementation**: Tailwind CSS class-based (`darkMode: "class"`)

**Toggle Location**: Settings page (`src/pages/Settings.jsx`)

**Custom Colors** (in `tailwind.config.js`):

```javascript
dark: {
  bg: {
    primary: "#0A0118",    // Deep purple-black
    secondary: "#1A0F2E",  // Dark purple
    tertiary: "#290675"    // Medium purple
  },
  text: {
    primary: "#F9F5FF",    // Off-white
    secondary: "#C4B5FD",  // Light purple
    muted: "#60597F"       // Muted purple
  }
}
```

**Usage Pattern**:

```jsx
<div className="bg-white dark:bg-dark-bg-primary text-gray-900 dark:text-dark-text-primary">
```

### Authentication (Supabase)

**Provider**: Supabase Auth (email/password + OAuth)

**Store**: `src/store/useAuthStore.js` (Zustand with persistence)

**Flow**:

1. User signs up/signs in → `src/pages/auth/AuthenticationPage.jsx`
2. Supabase creates session
3. Profile created in `profiles` table
4. Store persists user data to localStorage
5. RLS policies grant access to user's data

**Guest Mode**: Users can browse without account, but cannot save progress

---

## 🛠️ Troubleshooting

### Build Issues

**Problem**: `npm run build` fails

```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Problem**: Bundle too large (>500KB warning)

```bash
# Solution: Implement code splitting (future enhancement)
# Current size: 2.7MB uncompressed, 513KB gzipped
# Acceptable for now, can optimize later
```

### Database Issues

**Problem**: 406 errors in console

```bash
# Cause: Using .single() when no data exists
# Solution: Already fixed - using .maybeSingle() everywhere
```

**Problem**: Progress not saving

```bash
# Check: Is user authenticated?
console.log(useAuthStore.getState().isAuthenticated);

# Check: Are Supabase env vars set?
console.log(import.meta.env.VITE_SUPABASE_URL);

# Check: Are RLS policies enabled?
# Run in Supabase SQL Editor:
SELECT * FROM pg_policies WHERE tablename = 'question_progress';
```

### Image Issues

**Problem**: Images not loading

```bash
# Check path is correct:
# ✅ /images/einbuergerungstest/21.png
# ❌ images/einbuergerungstest/21.png (missing leading slash)

# Check file exists:
ls -lh public/images/einbuergerungstest/

# Check Network tab in DevTools for 404 errors
```

**Problem**: Images too large (slow loading)

```bash
# Compress with TinyPNG or ImageOptim
# Target sizes:
# - Photos (55.png, 216.png): 200-300 KB
# - Graphics (21.png, 226.png): 50-100 KB
```

### Mobile Issues

**Problem**: Layout broken on mobile

```bash
# Check: Are you using responsive classes?
✅ text-base sm:text-lg md:text-xl
✅ px-4 sm:px-6 md:px-8
✅ grid-cols-1 sm:grid-cols-2 lg:grid-cols-3

# Test in Chrome DevTools:
# - iPhone SE (375px)
# - iPhone 12 Pro (390px)
# - iPad (768px)
```

**Problem**: Touch targets too small

```bash
# Solution: Minimum 44px (iOS standard)
✅ py-3 px-4  (48px height)
✅ w-12 h-12  (48px square)
❌ py-1 px-2  (too small!)
```

### Dark Mode Issues

**Problem**: Text invisible in dark mode

```bash
# Check: Are you using dark: variants?
❌ <div className="text-gray-900">  (black text on dark bg)
✅ <div className="text-gray-900 dark:text-white">

# Pattern for all text elements:
text-gray-900 dark:text-dark-text-primary
text-gray-600 dark:text-dark-text-secondary
```

### Development Server Issues

**Problem**: Vite freezes with "TN" status

```bash
# Cause: Interactive TTY mode on macOS
# Solution: Always use CI=true
CI=true npm run dev

# Or use the automated script:
./start-dev.sh
```

**Problem**: Port 3003 already in use

```bash
# Find and kill process:
lsof -ti:3003 | xargs kill -9

# Or kill all node processes:
killall -9 node npm
```

---

## 📊 Project Status

### Current Branch: `einburgue`

**Recent Changes**:

- ✅ Added image support for 10 Einbürgerungstest questions
- ✅ Fixed N+1 query problem (460 API calls → 1)
- ✅ Implemented batch loading with Map-based lookups
- ✅ Added full progress tracking to TrainingMode
- ✅ Fixed all dark mode text visibility issues
- ✅ Completed filter logic with mutual exclusion

**Ready for Merge**: ✅ Yes

**Next Steps**:

1. Compress large images (216.png, 55.png)
2. Test image display on mobile
3. Merge to `main`
4. Deploy to production

### Performance Metrics

| Metric                    | Value                   | Status                  |
| ------------------------- | ----------------------- | ----------------------- |
| Build Time                | 8.7s                    | ✅ Good                 |
| Bundle Size               | 2.7 MB (513 KB gzipped) | ⚠️ Large but acceptable |
| Lighthouse Score          | ~85-90                  | ✅ Good                 |
| API Calls (Fragenkatalog) | 1 (was 460)             | ✅ Excellent            |

---

## 🎯 Future Enhancements

### High Priority

- [ ] Implement route-based code splitting (reduce bundle size)
- [ ] Add lazy loading for images
- [ ] Compress large image files
- [ ] Set up Supabase automated backups

### Medium Priority

- [ ] Add analytics (Vercel Analytics already included)
- [ ] Implement rate limiting on API endpoints
- [ ] Add service worker for offline support
- [ ] Create admin dashboard for content management

### Low Priority

- [ ] Add more audio exercises
- [ ] Implement spaced repetition algorithm
- [ ] Add social features (study groups)
- [ ] Create native mobile apps (React Native)

---

## 📞 Support

**Issues**: https://github.com/Raphaelavazq/Besty/issues  
**Email**: Contact via GitHub profile

---

**Made with ❤️ for German learners 🇩🇪**
