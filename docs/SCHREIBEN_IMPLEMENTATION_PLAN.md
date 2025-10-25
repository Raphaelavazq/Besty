# DTZ Schreiben (Writing) Implementation Plan

## 🎯 Project Overview

Build a comprehensive DTZ B1 **Schreiben** (Writing) training system, inspired by [lingo-letter](https://github.com/makaroni4/lingo-letter) but adapted to match Besty's design system and DTZ exam requirements.

---

## 📊 Official DTZ Schreiben Structure

### Test Format (30 minutes)

```
DTZ Schreiben (15 points total)
└── 1 Brief schreiben (Write one letter)
    ├── Formell (Formal): e.g., to companies, authorities, landlords
    └── Informell (Informal): e.g., to friends, family, colleagues

Requirements:
- Mindestens 80 Wörter (Minimum 80 words)
- 3-4 Inhaltspunkte bearbeiten (Cover 3-4 content points)
- Anrede und Gruß (Greeting and closing)
- Korrekte Struktur (Correct structure)
```

### Scoring Criteria

1. **Inhalt** (Content) - 5 points
   - All content points covered
   - Appropriate detail level
2. **Kommunikative Gestaltung** (Communication) - 5 points
   - Appropriate register (formal/informal)
   - Clear structure and coherence
   - Greeting and closing appropriate
3. **Formale Richtigkeit** (Formal Accuracy) - 5 points
   - Grammar correctness
   - Vocabulary usage
   - Spelling and punctuation

---

## 🎨 Design System Alignment

### Visual Consistency with Existing Features

**Match HoerenHub and SprechenHub patterns:**

- Glass-morphism cards (`bg-white/80 backdrop-blur-md`)
- Purple/indigo gradients (`from-purple-600 to-indigo-600`)
- Generous rounded corners (`rounded-2xl`, `rounded-3xl`)
- Layered shadows (`shadow-lg`, `shadow-xl`)
- Smooth hover effects (`hover:-translate-y-1`, `transition-all duration-200`)

**Brand Voice:**

- Simple B1 German
- Direct, encouraging tone
- Action-oriented CTAs
- No "bla bla bla" - clear instructions

---

## 🏗️ Architecture

### Route Structure

```
/tests/schreiben (SchreibenHub)
├── Overview & explanation
├── Tips section
└── Trainer card → /tests/schreiben/trainer

/tests/schreiben/trainer (SchreibenTrainer)
├── Prompt selector (formal/informal)
├── Writing interface
├── AI correction & feedback
└── Results & improvement suggestions
```

### Component Hierarchy

```
SchreibenHub.jsx
├── Hero section (exam explanation)
├── Info cards (structure, time, points)
├── Tips section (expandable)
└── Trainer card (main CTA)

SchreibenTrainer.jsx
├── Prompt display
├── Writing area (textarea)
├── Submit button
├── Results display
│   ├── Original text
│   ├── Corrected text (with highlights)
│   ├── Score breakdown
│   └── Detailed feedback
└── Actions (restart, new prompt)
```

---

## 📦 Data Structure

### Email Prompts JSON (`/public/data/schreiben/email-prompts.json`)

```json
{
  "formal": [
    {
      "id": "formal-01",
      "title": "Beschwerde - Nachbarn",
      "situation": "Sie wohnen seit 3 Monaten in einer Wohnung. Ihre Nachbarn sind sehr laut.",
      "recipient": "Hausverwaltung",
      "contentPoints": [
        "Grund für Ihr Schreiben",
        "Problem beschreiben (wann, wie oft, was)",
        "Was Sie schon versucht haben",
        "Um Lösung bitten"
      ],
      "level": "B1",
      "category": "Beschwerde"
    },
    {
      "id": "formal-02",
      "title": "Kursanmeldung absagen",
      "situation": "Sie haben sich für einen Deutschkurs angemeldet, können aber nicht teilnehmen.",
      "recipient": "Sprachschule",
      "contentPoints": [
        "Grund für Ihr Schreiben",
        "Kursinformationen nennen",
        "Grund für Absage",
        "Nach Rückerstattung oder Termin-Änderung fragen"
      ],
      "level": "B1",
      "category": "Absage/Änderung"
    }
  ],
  "informal": [
    {
      "id": "informal-01",
      "title": "Einladung zum Geburtstag",
      "situation": "Ihr Freund hat Sie zu seiner Geburtstagsparty eingeladen.",
      "recipient": "Freund/Freundin",
      "contentPoints": [
        "Für Einladung bedanken",
        "Zusagen oder absagen",
        "Etwas mitbringen anbieten",
        "Nach Details fragen (Zeit, Ort, Kleidung)"
      ],
      "level": "B1",
      "category": "Einladung"
    },
    {
      "id": "informal-02",
      "title": "Umzugshilfe bitten",
      "situation": "Sie ziehen nächsten Monat um und brauchen Hilfe.",
      "recipient": "Freund/Freundin",
      "contentPoints": [
        "Von Umzug erzählen",
        "Um Hilfe bitten",
        "Wann und wo",
        "Dankeschön anbieten (Essen, Getränke)"
      ],
      "level": "B1",
      "category": "Bitte um Hilfe"
    }
  ]
}
```

---

## 🤖 AI Integration

### Backend Service: Email Correction

**Endpoint:** `POST /api/schreiben/correct`

**Request:**

```json
{
  "text": "User's written email",
  "promptId": "formal-01",
  "type": "formal" | "informal"
}
```

**Response:**

```json
{
  "original": "User's text",
  "corrected": "AI corrected version",
  "errors": [
    {
      "type": "grammar" | "vocabulary" | "structure",
      "original": "falsche Wort",
      "corrected": "falsche Wort → falsches Wort",
      "explanation": "Adjektivdeklination: Neutrum + unbestimmter Artikel"
    }
  ],
  "score": {
    "content": 4,
    "communication": 3,
    "accuracy": 4,
    "total": 11,
    "maxScore": 15
  },
  "feedback": {
    "strengths": ["Gute Struktur", "Höfliche Anrede"],
    "improvements": ["Mehr Details beim Problem beschreiben", "Konjunktiv II für höfliche Bitten verwenden"],
    "suggestions": [
      "Verwenden Sie: 'Ich würde mich freuen' statt 'Ich freue mich'",
      "Fügen Sie eine konkrete Zeitangabe hinzu"
    ]
  },
  "wordCount": 95,
  "completedPoints": [true, true, true, false],
  "missingPoints": ["Um Lösung bitten"]
}
```

### AI Prompt Template (GPT-4o-mini)

```
Du bist ein DTZ B1 Prüfer für den Schreiben-Teil.

Aufgabe: Korrigiere diesen {formal/informal} Brief und bewerte ihn nach DTZ-Kriterien.

Situation: {situation}
Inhaltspunkte: {contentPoints}

Brief des Schülers:
{userText}

Antworte im JSON-Format mit:
1. Korrigierter Text
2. Liste aller Fehler mit Erklärungen (B1-Niveau geeignet)
3. Bewertung nach DTZ-Kriterien (Inhalt, Kommunikation, Formale Richtigkeit)
4. Feedback (Stärken, Verbesserungen, Vorschläge)
5. Welche Inhaltspunkte wurden behandelt

Sei konstruktiv und ermutigend. Erkläre Fehler klar und einfach.
```

---

## 📝 Component Details

### SchreibenHub.jsx

```jsx
export default function SchreibenHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1>DTZ Schreiben</h1>
          <p>Briefe schreiben & korrigieren</p>
          <Stats: 30 Min • 15 Punkte • 1 Brief />
        </div>
      </div>

      {/* Exam Structure */}
      <section>
        <h2>Was musst du tun?</h2>
        <Cards:
          - Thema verstehen
          - Brief schreiben (80+ Wörter)
          - Alle Punkte bearbeiten
          - Anrede & Gruß
        />
      </section>

      {/* Tips Section */}
      <section>
        <Accordion tips:
          - Brief-Struktur (Anrede, Einleitung, Hauptteil, Schluss, Gruß)
          - Formal vs. Informal (Sie/Du, Grußformeln)
          - Zeit-Management (5 Min planen, 20 Min schreiben, 5 Min korrigieren)
          - Häufige Fehler vermeiden
        />
      </section>

      {/* Main CTA - Trainer */}
      <section>
        <BigCard:
          Icon: <Sparkles />
          Title: "Schreiben-Trainer mit Besty"
          Description: "Übe formelle und informelle Briefe. Besty korrigiert deine E-Mails und gibt dir Feedback."
          Button: "Jetzt üben" → /tests/schreiben/trainer
        />
      </section>
    </div>
  );
}
```

### SchreibenTrainer.jsx

**Key Features:**

- Load random prompt (formal or informal)
- Textarea with word counter
- Character limit: 500 words (realistic for 30 min)
- Submit button (disabled if < 50 words)
- Loading state during AI correction
- Results display with:
  - Side-by-side comparison (original vs corrected)
  - Error highlights with tooltips
  - Score breakdown with visual indicators
  - Detailed feedback sections
- Actions: Restart with same prompt, Try new prompt

**State Management:**

```jsx
const [prompt, setPrompt] = useState(null);
const [userText, setUserText] = useState("");
const [wordCount, setWordCount] = useState(0);
const [isSubmitting, setIsSubmitting] = useState(false);
const [results, setResults] = useState(null);
const [showResults, setShowResults] = useState(false);
```

---

## 🎯 User Flow

1. **Dashboard** → Click "Schreiben" card
2. **SchreibenHub** → Read explanation & tips → Click "Jetzt üben"
3. **SchreibenTrainer** → See prompt → Write email (monitor word count)
4. **Submit** → AI processes → See results
5. **Results** → Review corrections, score, feedback
6. **Actions** → Try again or new prompt

---

## 🔄 Comparison: Lingo-Letter vs Besty

| Feature        | Lingo-Letter              | Besty Schreiben                 |
| -------------- | ------------------------- | ------------------------------- |
| **Purpose**    | General language practice | DTZ B1 exam preparation         |
| **Prompts**    | AI-generated on-the-fly   | Pre-defined DTZ scenarios       |
| **Correction** | Grammar & style           | DTZ scoring + detailed feedback |
| **Design**     | Minimal, text-focused     | Glass-morphism, modern UI       |
| **Languages**  | Multi-language            | German only (B1 level)          |
| **Feedback**   | Side-by-side diff         | Score breakdown + explanations  |
| **Structure**  | Single page app           | Hub → Trainer flow              |

**What we adopt:**

- ✅ Side-by-side text comparison
- ✅ Error highlighting with diff algorithm
- ✅ AI-powered correction
- ✅ Clean writing interface

**What we adapt:**

- ✅ DTZ-specific scenarios
- ✅ Formal scoring system
- ✅ Glass-morphism design
- ✅ Hub-based navigation
- ✅ German-focused tips

---

## 🚀 Implementation Phases

### Phase 1: Foundation ✅

- [ ] Create SchreibenHub page
- [ ] Design & implement layout matching HoerenHub
- [ ] Add explanation section
- [ ] Build tips accordion

### Phase 2: Data & Routing ✅

- [ ] Create email-prompts.json (10 formal + 10 informal)
- [ ] Update App.jsx routing
- [ ] Update Dashboard card to link to SchreibenHub

### Phase 3: Trainer Component ✅

- [ ] Build SchreibenTrainer.jsx
- [ ] Implement prompt selector/loader
- [ ] Create writing interface with word counter
- [ ] Add submit functionality

### Phase 4: AI Integration ✅

- [ ] Create schreibenService.js
- [ ] Implement backend endpoint (POST /api/schreiben/correct)
- [ ] Connect frontend to backend
- [ ] Handle loading & error states

### Phase 5: Results Display ✅

- [ ] Build results component
- [ ] Side-by-side text comparison
- [ ] Error highlighting (diff algorithm)
- [ ] Score breakdown visualization
- [ ] Feedback sections

### Phase 6: Polish & Testing ✅

- [ ] Add restart/new prompt actions
- [ ] Responsive design testing
- [ ] Error handling & edge cases
- [ ] Performance optimization

---

## 📚 Key Resources

- **Lingo-Letter Repo:** https://github.com/makaroni4/lingo-letter
- **DTZ Exam Info:** OFFICIAL-DTZ-STRUCTURE.md
- **Design System:** docs/#DESIGN_SYSTEM.md
- **Backend Protection:** docs/BACKEND_PROTECTION_COMPLETE.md
- **Existing Patterns:** HoerenHub.jsx, SprechenHub.jsx, DialogueTrainerAI.jsx

---

## 🎨 Design Tokens

```jsx
// Colors
bg: "bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50";
card: "bg-white/80 backdrop-blur-md";
border: "border-purple-100";
text: "text-gray-900";
muted: "text-gray-600";
accent: "text-purple-600";

// Gradients
hero: "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700";
button: "bg-gradient-to-r from-purple-600 to-indigo-600";

// Effects
shadow: "shadow-xl";
hover: "hover:-translate-y-1 hover:shadow-2xl transition-all duration-200";
rounded: "rounded-2xl" | "rounded-3xl";
```

---

## ✨ Success Criteria

- [ ] User can access Schreiben from dashboard
- [ ] Hub page explains DTZ Schreiben clearly
- [ ] Tips are helpful and actionable
- [ ] Trainer loads prompts correctly
- [ ] Writing interface is intuitive
- [ ] AI correction works accurately
- [ ] Results are clear and helpful
- [ ] Design matches existing features
- [ ] Mobile responsive
- [ ] Accessible (WCAG AA)

---

## 🎯 MVP Features

1. **SchreibenHub** with explanation & tips
2. **10 email prompts** (5 formal + 5 informal)
3. **Writing interface** with word counter
4. **AI correction** via backend
5. **Results display** with errors & score
6. **Restart functionality**

---

## 🔮 Future Enhancements

- [ ] Save drafts locally
- [ ] Practice history tracking
- [ ] Common phrases bank (Redemittel)
- [ ] Example emails for each prompt
- [ ] Timed practice mode (30 minutes)
- [ ] Progress analytics
- [ ] Mobile app voice input
- [ ] Export results as PDF

---

**Ready to build!** 🚀
