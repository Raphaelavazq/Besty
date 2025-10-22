# 🎓 B1 Bestie - DTZ B1 Exam Preparation App

A modern, viewport-locked web application for preparing for the DTZ (Deutsch-Test für Zuwanderer) B1 examination.

![B1 Bestie Preview](https://img.shields.io/badge/DTZ%20B1-Exam%20Prep-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=flat-square&logo=vite)

## ✨ Features

### 🎨 Modern Design

- **Viewport-locked** single-page application
- **Purple/Indigo gradient** theme with glass-morphism effects
- **Responsive design** optimized for all devices
- **Smooth animations** and micro-interactions

### 📚 Comprehensive Content

- Complete **DTZ B1 exam preparation** materials
- **Four skill areas**: Hören (Listening), Lesen (Reading), Schreiben (Writing), Sprechen (Speaking)
- **Thematic organization** with subject-specific content
- **Test simulations** with full and quick test modes

### 🛠️ Technical Excellence

- **React 18** with modern hooks and patterns
- **React Router** with v7 future flags
- **Tailwind CSS** for consistent styling
- **Zustand** for state management
- **Vite** for lightning-fast development

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Raphaelavazq/Besty.git
   cd Besty
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development servers** ⚡

   **RECOMMENDED - Use the automated startup script:**

   ```bash
   ./start-dev.sh
   ```

   This script:
   - ✅ Cleans up zombie processes automatically
   - ✅ Starts backend (port 3001) and frontend (port 3003)
   - ✅ Runs health checks to verify servers are ready
   - ✅ Enables CI mode to prevent Vite freezing
   - ✅ Provides PIDs for easy shutdown
   - ✅ Logs to `/tmp/backend.log` and `/tmp/vite.log`

   **Manual alternative** (if script fails):

   ```bash
   # Terminal 1 - Backend
   cd backend
   node server.js

   # Terminal 2 - Frontend
   CI=true npm run dev
   ```

4. **Open in browser**

   ```
   http://127.0.0.1:3003
   ```

5. **Stop servers**
   ```bash
   # Use PIDs from start-dev.sh output, or:
   killall -9 node npm
   ```

### Troubleshooting

**If servers freeze or show "loading forever":**

```bash
# Check logs
tail -f /tmp/backend.log
tail -f /tmp/vite.log

# Check for frozen processes (status "TN")
ps aux | grep -E '[n]ode' | grep -v "Code Helper"

# Full reset
killall -9 node npm && ./start-dev.sh
```

See `FULL_STACK_AUDIT_REPORT.md` for comprehensive troubleshooting guide.

## 📁 Project Structure

```
Besty/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.jsx      # Main app layout with navigation
│   │   ├── AudioPlayer.jsx # Audio playback component
│   │   └── ...
│   ├── pages/              # Route components
│   │   ├── Dashboard.jsx   # Main dashboard
│   │   ├── Tests.jsx       # Test selection page
│   │   └── ...
│   ├── store/              # State management
│   └── App.jsx             # Root component
├── public/
│   └── data/               # JSON data files
│       ├── content.json    # Main content structure
│       ├── tests.json      # Test definitions
│       └── themes.json     # Subject themes
└── package.json
```

## 🎯 Usage

### Dashboard

- **Quick access** to full tests and practice sessions
- **Subject selection** (Hören, Lesen, Schreiben, Sprechen)
- **Theme browsing** for focused study

### Test Modes

- **Volltest**: Complete DTZ B1 simulation
- **Schnelltest**: Quick practice rounds
- **Subject-specific**: Focus on individual skills

### Navigation

- **Fixed header** with responsive navigation
- **Mobile-optimized** menu for smaller screens
- **Smooth transitions** between sections

## 🔧 Development

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Environment Setup

The app uses Vite for development with hot module replacement (HMR).

## 📦 Build & Deployment

### Production Build

```bash
npm run build
```

### Deployment Options

- **Vercel** (recommended) - includes vercel.json config
- **Netlify** - static site deployment
- **GitHub Pages** - for demo versions

## 🎵 Audio Content

> **Note**: Audio files are excluded from the repository due to size constraints.

To add audio content locally:

1. Create `public/audio/hoeren/` directory
2. Add MP3 files for listening exercises
3. Update audio references in JSON data files

See `AUDIO-GUIDE.md` for detailed instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **DTZ B1 Exam Content** - Based on official German language testing standards
- **React Community** - For excellent documentation and tools
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide Icons** - For beautiful, consistent icons

## 📧 Contact

**Rafaela Vaz** - [@Raphaelavazq](https://github.com/Raphaelavazq)

Project Link: [https://github.com/Raphaelavazq/Besty](https://github.com/Raphaelavazq/Besty)

---

Made with ❤️ for German learners 🇩🇪
