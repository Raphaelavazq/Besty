# 🎓 B1 Bestie - DTZ B1 Exam Preparation App

A modern, AI-powered web application for preparing for the **DTZ (Deutsch-Test für Zuwanderer) B1 examination** and the **German Citizenship Test (Einbürgerungstest)**.

![B1 Bestie Preview](https://img.shields.io/badge/DTZ%20B1-Exam%20Prep-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-DB-3ECF8E?style=flat-square&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=flat-square&logo=vite)

---

## 📚 Documentation

- **[PROJECT_DOCS.md](./PROJECT_DOCS.md)** - Complete technical documentation (START HERE!)
- **[#DEVELOPMENT_STANDARDS.md](./#DEVELOPMENT_STANDARDS.md)** - Design system and coding standards
- **[supabase-schema.sql](./supabase-schema.sql)** - Complete database schema
- **[OFFICIAL-DTZ-STRUCTURE.md](./OFFICIAL-DTZ-STRUCTURE.md)** - Official DTZ exam structure
- **[Z_INDEX_HIERARCHY.md](./Z_INDEX_HIERARCHY.md)** - UI layer management

---

## 🚀 Quick Deploy

**Deployment is required for AI features** (Schreiben correction, Sprechen dialogue, TTS/STT)

### 1. Set Up Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Run SQL from `supabase-schema.sql` in SQL Editor
3. Copy your Project URL and Anon Key

### 2. Deploy to Vercel

```bash
# Push to GitHub
git push origin main

# Deploy at vercel.com
# Add these environment variables in Vercel dashboard:
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
OPENAI_API_KEY=sk-xxx...
```

### 3. Test Production

- ✅ Authentication works
- ✅ Progress saves to database
- ✅ Images display (10 Einbürgerungstest questions)
- ✅ Dark mode toggle works
- ✅ Mobile responsive

📖 **Full deployment guide in [PROJECT_DOCS.md](./PROJECT_DOCS.md)**

---

## ✨ Features

### �️ **Einbürgerungstest (Citizenship Test)**

- **460 questions** (300 general + 160 state-specific)
- **Complete question catalog** with search and filters
- **Training modes**: Quick test, by theme, difficult questions, custom amounts
- **Exam simulator**: Real 33-question exam with 60-minute timer
- **Progress tracking**: Confidence ratings (� Easy, 🤔 Medium, 😓 Hard)
- **"Ich kann das" mastered status** for questions you know
- **10 visual questions** with images (coats of arms, flags, buildings, maps)
- **Statistics dashboard** with performance analytics

### 🎧 **Hören (Listening)**

- Audio-based exercises with timestamp navigation
- Question bank with audio synchronization
- Progress tracking for listening comprehension

### 📖 **Lesen (Reading)**

- Reading comprehension exercises
- Text-based questions with answers

### ✍️ **Schreiben (Writing)**

- AI-powered correction feedback (OpenAI GPT-4)
- Formal and informal email practice
- Real-time suggestions and scoring

### � **Sprechen (Speaking)**

- AI dialogue practice with voice recognition
- Text-to-Speech (TTS) and Speech-to-Text (STT)
- Interactive conversation scenarios

### 🎨 **Modern Design**

- **Dark mode** with smooth transitions
- **Glass-morphism** UI with purple/indigo gradients
- **Mobile-first** responsive design
- **Touch-friendly** 44px minimum targets
- **WCAG AA** accessibility compliance

### 🔐 **User System**

- **Supabase authentication** (email/password + OAuth)
- **Guest mode** for browsing without account
- **Progress persistence** across devices
- **Row Level Security** (users only see their data)

## � Local Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Quick Start

```bash
# 1. Clone repository
git clone https://github.com/Raphaelavazq/Besty.git
cd Besty

# 2. Install dependencies
npm install

# 3. Start development servers (RECOMMENDED)
./start-dev.sh

# OR manually:
# Terminal 1: cd server && node index.js
# Terminal 2: CI=true npm run dev

# 4. Open browser
http://127.0.0.1:3003
```

### Environment Variables (Optional for Local Dev)

Create `.env` file in project root:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...your-anon-key
# Without these, app runs in guest mode (no progress saving)
```

### Troubleshooting

**Servers freeze?**

```bash
killall -9 node npm && ./start-dev.sh
```

**Port already in use?**

```bash
lsof -ti:3003 | xargs kill -9
```

📖 **Full troubleshooting guide in [PROJECT_DOCS.md](./PROJECT_DOCS.md)**

## 📁 Project Structure

```
Besty/
├── src/
│   ├── features/
│   │   └── einbuergerungstest/
│   │       ├── EinbuergerungstestHub.jsx    # Main hub
│   │       ├── Fragenkatalog.jsx            # 460 questions catalog
│   │       ├── TrainingMode.jsx             # Practice modes
│   │       └── ExamSimulator.jsx            # 33-question exam
│   ├── components/
│   │   ├── dashboard/                       # Dashboard widgets
│   │   ├── layouts/                         # Layout components
│   │   └── AudioPlayerNew.jsx               # Audio playback
│   ├── pages/                               # Route pages
│   ├── store/                               # Zustand state
│   │   └── useAuthStore.js                  # Auth state
│   ├── lib/
│   │   └── supabase.js                      # DB client
│   └── App.jsx                              # Root + routing
├── public/
│   ├── data/
│   │   └── einbuergerungstest/
│   │       └── questions.json               # 460 questions with images
│   ├── images/
│   │   └── einbuergerungstest/             # 10 exam images
│   └── audio/                               # Audio files (not in repo)
├── api/                                     # Vercel serverless functions
├── server/                                  # Local dev backend
├── supabase-schema.sql                      # Database schema
└── vercel.json                              # Deployment config
```

## 🔧 Tech Stack

| Category       | Technology                              |
| -------------- | --------------------------------------- |
| **Frontend**   | React 18, Vite, Tailwind CSS            |
| **State**      | Zustand (global), React hooks (local)   |
| **Routing**    | React Router v6                         |
| **Database**   | Supabase (PostgreSQL)                   |
| **Auth**       | Supabase Auth (email + OAuth)           |
| **AI**         | OpenAI GPT-4 (text), Whisper (STT), TTS |
| **Deployment** | Vercel (frontend + serverless)          |
| **Icons**      | Lucide React                            |
| **Animations** | GSAP, Lottie                            |

## 🛠️ Available Scripts

```bash
# Development
npm run dev                # Start dev server (port 3003)
./start-dev.sh            # Automated startup with health checks

# Content Management
npm run scan-audio        # Regenerate audio catalog
npm run build-questions   # Build question JSON
npm run prepare-content   # Run all content scripts

# Production
npm run build             # Build for production
npm run preview           # Preview production build
npm run lint              # Run ESLint

# Testing
# (Add test scripts here when tests are implemented)
```

## �️ Database Schema

**4 main tables** (see `supabase-schema.sql` for complete schema):

1. **`profiles`** - User accounts with bundesland (determines exam questions)
2. **`question_progress`** - Individual progress for all 460 questions
3. **`exam_simulations`** - Complete exam results with detailed data
4. **`study_sessions`** - Activity tracking across all features

**Security**: Row Level Security (RLS) enabled on all tables - users can only access their own data.

## 🎯 Key Achievements

- ✅ **460 Einbürgerungstest questions** with full progress tracking
- ✅ **Performance optimized**: Reduced API calls from 460 to 1 (99.8% reduction)
- ✅ **Dark mode** with complete theme support
- ✅ **Mobile-first** responsive design (tested iOS/Android)
- ✅ **Accessibility** WCAG AA compliant
- ✅ **Production ready** - Successfully deployed on Vercel
- ✅ **Image support** for 10 visual questions (coats of arms, flags, maps)
- ✅ **Real-time sync** with Supabase database

## 🐛 Known Issues & Roadmap

### Current Status

- ✅ All core features working
- ✅ No critical bugs
- ⚠️ Bundle size is large (2.7 MB) - consider code splitting

### Future Enhancements

- [ ] Route-based code splitting (reduce bundle size)
- [ ] Image optimization (compress 2.4 MB images)
- [ ] Spaced repetition algorithm for review scheduling
- [ ] Offline mode with service worker
- [ ] Social features (study groups, leaderboards)
- [ ] Native mobile apps (React Native)

See [PROJECT_DOCS.md](./PROJECT_DOCS.md) for complete roadmap.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **BAMF** - Official Einbürgerungstest questions
- **Telc** - DTZ B1 exam structure and content
- **Supabase** - Excellent PostgreSQL + Auth platform
- **Vercel** - Seamless deployment experience
- **React Community** - Amazing ecosystem and tools

## 📧 Contact

**Rafaela Vaz** - [@Raphaelavazq](https://github.com/Raphaelavazq)

**Project**: [github.com/Raphaelavazq/Besty](https://github.com/Raphaelavazq/Besty)

---

<div align="center">

**Made with ❤️ for German learners 🇩🇪**

[⭐ Star this repo](https://github.com/Raphaelavazq/Besty) | [📖 Read Docs](./PROJECT_DOCS.md) | [🐛 Report Bug](https://github.com/Raphaelavazq/Besty/issues)

</div>
