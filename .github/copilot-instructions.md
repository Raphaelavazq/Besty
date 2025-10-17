## B1 Bestie — AI assistant guidance

Goal: help an AI coding agent be productive quickly in this repo. Focus on concrete, discoverable patterns and commands.

- Project type: React 18 SPA built with Vite, Tailwind CSS, Zustand for state, deployed as a static site (Vercel recommended). See `README.md` and `package.json`.
- **Start/dev commands**: 
  - **ALWAYS use**: `./start-dev.sh` (automated startup with health checks)
  - **Manual alternative**: `npm install` then `npm run dev` (but prefer the script)
  - **CRITICAL**: Vite must run with `CI=true` environment variable to disable interactive mode (prevents process freezing)
  - Build: `npm run build`, preview: `npm run preview`
  - Stop servers: Use PIDs from `start-dev.sh` output or `killall -9 node npm`

- Key directories to read first:
  - `src/` — main app code. Entry: `src/main.jsx`, routes: `src/App.jsx`.
  - `src/components/` — reusable UI components (e.g. `AudioPlayerNew.jsx`).
  - `src/features/hoeren/` — hearing-test feature (modes, question bank, `HoerenApp.jsx`, `StickyAudioPlayer.jsx`) — important for audio sync logic.
  - `public/` and `public/audio` — static assets; audio files are expected in `public/audio/hoeren/`.
  - `data/` — generated JSON content used at runtime (`content.json`, `audio-catalog.json`, `dtz-local-*.json`).
  - `scripts/` — content build tooling (e.g. `scan-audio.js`, `build-hoeren-json.js`, `validate-questions.js`) — use these to prepare test content.

- Important conventions and patterns (do not invent alternatives):
  - Audio is file-based and referenced by JSON in `data/`. Scripts in `scripts/` scan `content/` and emit JSON used by the app. If you change content layout, update `scripts/scan-audio.js` and `scripts/build-hoeren-json.js`.
  - Components use Tailwind utility classes and prefer small presentational components + feature folders under `src/features` for domain logic (see `src/features/hoeren/`).
  - Routing: React Router is configured in `src/App.jsx`. Wrap feature pages with `BareShell` when needed.
  - State: Lightweight app state uses Zustand; search `src/store/` for stores. Avoid adding global Context unless necessary.

- Testing & validation flows to preserve:
  - `npm run scan-audio` — regenerate audio index (reads `content/` for mp3 files).
  - `npm run build-questions` — builds listening-question JSON used by the hearing test feature.
  - `npm run validate-questions` — run content validators before publishing data (Note: currently expects different field format than build script).
  - `npm run prepare-content` — convenience that runs scan + build.

- Integration points to watch for when editing:
  - `AudioPlayerNew.jsx` and `StickyAudioPlayer.jsx` coordinate playback via props: `audioFile`/`audioUrl`, `seekTime`, `onTimeUpdate`, `onQuestionJump`. Keep prop names and semantics consistent when refactoring.
  - Question data shape: generated JSON in `data/` includes timestamps (seconds) used as `timestamp` or `audioFile` fields. See `src/components/AudioPlayerNew.jsx` and `src/features/hoeren/data/questionBank.js` for examples.
  - Public assets: audio files expected under `public/audio/...`. Local dev server will serve these paths directly — use absolute/relative `/audio/...` paths accordingly.

- Style & code patterns to follow:
  - Keep components small and presentational; put domain logic in `src/features/*` or `scripts/` when it relates to content processing.
  - Prefer existing hooks and helper utilities found under `src/hooks/` and `src/utils/` rather than adding ad-hoc utilities.
  - Logging: components occasionally use `console.debug(...)` for audio lifecycle — keep or upgrade to minimal structured logs if needed.

- **CRITICAL: Design & UX Standards** (ALWAYS follow these - see DEVELOPMENT_STANDARDS.md and docs/DESIGN_SYSTEM.md):
  - **Visual Consistency**: All similar elements MUST use identical styling (typography, spacing, colors, animations)
  - **Glass-morphism**: `bg-white/80 backdrop-blur-md` with subtle borders (`border-purple-100`)
  - **Gradients**: Purple/indigo combinations (`from-purple-600 to-indigo-600`) for buttons and headings
  - **Rounded Corners**: Generous use of `rounded-2xl` and `rounded-3xl` for cards and containers
  - **Shadows**: Layered shadows (`shadow-lg`, `shadow-xl`) with hover enhancements
  - **Hover Effects**: Smooth transitions with `hover:-translate-y-1`, `hover:scale-105`, `transition-all duration-200`
  - **Typography**: Bold gradient headings (`text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent`)
  - **Mobile-First**: Minimum 44px touch targets, proper spacing, responsive breakpoints
  - **Accessibility**: WCAG AA contrast ratios (4.5:1 text, 3:1 interactive), focus states with `focus:ring-2 focus:ring-purple-500`
  - **Brand Voice**: Simple German (B1 level), direct communication, encouraging tone. No "bla bla bla" - short, clear, action-oriented.
  - **Animation Timing**: Fast (150ms) for micro-interactions, normal (200ms) for standard transitions, slow (300ms) for layout changes
  - **Consistency = Bug**: Treat styling inconsistencies as bugs that MUST be fixed. Never vary font properties for similar elements.

- When adding or modifying content/data:
  - Run `npm run prepare-content` to regenerate JSON and ensure `data/` stays in sync.
  - Validate with `npm run validate-questions` and visually smoke-test the relevant route (e.g. `/tests/hoeren` or `dtz-hoeren-training`).

- **Local Development Workflow** (CRITICAL - prevents "loading forever" issues):
  - **Start development**: Always use `./start-dev.sh` script
    - Automatically cleans up zombie processes
    - Starts backend on port 3001, frontend on port 3003
    - Enables CI mode to prevent Vite interactive TTY freezing
    - Provides health checks and PID tracking
    - Logs to `/tmp/backend.log` and `/tmp/vite.log`
  - **Troubleshooting**: If servers freeze or hang:
    - Check logs: `tail -f /tmp/backend.log` or `tail -f /tmp/vite.log`
    - Check process status: `ps aux | grep -E '[n]ode' | grep -v "Code Helper"`
    - Look for status "TN" (frozen) or "Z" (zombie)
    - Full reset: `killall -9 node npm && ./start-dev.sh`
  - **Never run Vite in background without CI=true** - causes process suspension on macOS

- Quick examples (search & edit patterns):
  - To find where timestamps are used: search for `.timestamp` or `onQuestionJump` in `src/`.
  - To change routing for the Hoeren feature, update `src/App.jsx` and `src/features/hoeren/HoerenApp.jsx` — keep route wrapper `BareShell` where present.

- Do not change without user approval:
  - Large data migrations of JSON in `data/` — coordinate because many components expect specific keys (e.g., `questions[].id`, `questions[].timestamp`, `audioFile`).
  - Content markdown files in `content/hoeren/` — use original field names (`src`, `items`, `prompt`) that match the build script expectations.

If anything here is unclear or you need deeper examples (e.g. exact JSON schema used by `build-hoeren-json.js`), tell me which area to expand and I'll update this file.
