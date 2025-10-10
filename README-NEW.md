# B1 Bestie · DTZ B1 Content Hub

A modern, mobile-first content hub for DTZ (Deutsch-Test für Zuwanderer) B1 exam preparation. Browse rich learning content organized by exam sections and themes.

**🌐 Official DTZ Handbook:** [BAMF DTZ Handbook (PDF)](https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kurstraeger/Modellsaetze/dtz-handbuch_pdf.pdf?__blob=publicationFile&v=8)

---

## ✨ Features

- **📚 Content Hub** - No exercises, just quality learning content
- **🎯 Organized** - Browse by exam section (Hören, Lesen, Schreiben, Sprechen) or theme
- **🔖 Bookmarks** - Save your favorite topics
- **📱 Mobile-first** - Responsive design, works great on phones
- **💾 Local Storage** - Bookmarks and history saved in browser
- **🚀 Fast** - Built with Vite for instant page loads
- **📴 Offline-ready** - Works after initial load

---

## 🛠️ Tech Stack

- **React 18** + **Vite** (JSX)
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Zustand** with persist middleware for state
- **Lucide React** icons
- **Vercel** deployment ready

---

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Run dev server (opens at http://localhost:3000)
npm run dev
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

The `vercel.json` config is already included for SPA routing.

---

## 📁 Project Structure

```
b1-bestie-hub/
├── public/
│   └── data/
│       ├── sections.json    # Exam sections (Hören, Lesen, etc.)
│       ├── themes.json       # Themes (Arbeit, Gesundheit, etc.)
│       └── content.json      # All content items
├── src/
│   ├── components/
│   │   └── Layout.jsx        # Header, footer, nav
│   ├── pages/
│   │   ├── Dashboard.jsx     # Home page with sections/themes
│   │   ├── ContentDetail.jsx # Individual content viewer
│   │   ├── Section.jsx       # Content filtered by section
│   │   ├── Theme.jsx         # Content filtered by theme
│   │   ├── Bookmarks.jsx     # User's saved bookmarks
│   │   └── About.jsx         # About page
│   ├── store/
│   │   └── useStore.js       # Zustand store with persistence
│   ├── App.jsx               # React Router setup
│   ├── main.jsx              # App entry point
│   └── index.css             # Tailwind + custom styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── vercel.json               # SPA rewrites for Vercel
└── package.json
```

---

## 📝 Adding Content

Content is stored in `/public/data/content.json`. Each item follows this structure:

```json
{
  "id": "unique-id",
  "section": "lesen|hoeren|schreiben|sprechen",
  "theme": "arbeit|gesundheit|...",
  "title": "Main title",
  "subtitle": "Short description",
  "level": "B1",
  "duration": "10 min",
  "content": {
    "introduction": "Overview text",
    "keyPoints": [
      {
        "heading": "Section heading",
        "text": "Detailed explanation"
      }
    ],
    "tips": ["Tip 1", "Tip 2"],
    "vocabulary": [
      {
        "word": "das Wort",
        "meaning": "the meaning"
      }
    ]
  }
}
```

---

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to change theme colors:

```js
colors: {
  primary: '#6366f1',      // Main brand color
  secondary: '#8b5cf6',    // Secondary accent
  accent: '#ec4899',       // Highlight color
  dark: '#1e293b',         // Text dark
  light: '#f8fafc'         // Background light
}
```

### Sections/Themes

Edit `/public/data/sections.json` and `/public/data/themes.json` to add or modify categories.

---

## 📄 License & Disclaimer

This is a personal study project and is **not affiliated** with BAMF or telc. Content is for educational purposes. Always refer to official DTZ materials for exam preparation.

---

## 🤝 Contributing

This is a learning project, but suggestions are welcome! Open an issue or PR.

---

**Made with ❤️ for B1 learners**
