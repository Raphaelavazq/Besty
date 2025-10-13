# DTZ Sprechen (Speaking) Implementation Plan

**Date:** October 13, 2025  
**Status:** 🎯 Ready for Implementation  
**Pattern:** Following Hören system architecture

---

## 📋 Executive Summary

Implement a complete Speaking (Sprechen) practice and test system following the successful Hören architecture. The system will include:

- **2 Modes:** Practice (Übung) and Test (Prüfung)
- **3 Teile:** Teil 1 (Introduction), Teil 2 (Experience), Teil 3 (Planning)
- **Video Integration:** Simulated examiner videos for realistic practice
- **Interactive Dialogues:** Branching dialogue trainer with common Redemittel
- **Audio Recording:** Record user responses for self-evaluation

---

## 🏗️ Architecture Overview

### System Comparison: Hören → Sprechen

| Feature | Hören Implementation | Sprechen Adaptation |
|---------|---------------------|---------------------|
| **Data Source** | Audio files (MP3) | Video files (MP4/WebM) |
| **User Input** | Multiple choice selection | Audio recording + dialogue choices |
| **Feedback** | Immediate (Übung) / Delayed (Prüfung) | Self-evaluation + model answers |
| **Practice Mode** | Answer questions | Follow dialogue prompts |
| **Test Mode** | 25min timed test | 16min simulated exam |
| **Components** | HoerenPlayer, HoerenUebung, HoerenPruefung | SprechenPlayer, SprechenUebung, SprechenPruefung |

---

## 📊 Official DTZ Sprechen Structure

### Test Format (16 minutes for pair / ~10min individual)

```
Teil 1: Sich vorstellen (4 Minuten)
├── 1A: Über sich sprechen (Stichwörter: Name, Geburtsort, Wohnort, Arbeit, Familie, Sprachen)
└── 1B: Auf Nachfragen reagieren (Prüfer stellt Zusatzfragen)

Teil 2: Über Erfahrungen sprechen (6 Minuten)
├── 2A: Über ein Bild sprechen (Beschreiben, interpretieren)
└── 2B: Auf Nachfragen reagieren (Vertiefende Fragen)

Teil 3: Gemeinsam etwas planen (6 Minuten)
├── Planungsaufgabe (z.B. Fest organisieren, Ausflug planen)
├── Vorschläge machen und reagieren
├── Meinungen äußern
└── Bitten formulieren
```

---

## 🎯 User Flows

### Practice Mode (Übung)

```
1. Select Teil (1, 2, or 3)
   ↓
2. Watch examiner video introduction
   ↓
3. INTERACTIVE EXERCISE:
   
   Teil 1: Practice answering personal questions
   - See prompts (Name? Woher kommen Sie?)
   - Record audio response
   - Play back recording
   - Compare with model answer
   
   Teil 2: Practice describing images
   - View image prompt
   - See question prompts
   - Record description
   - Get feedback checklist (Did you mention...?)
   
   Teil 3: BRANCHING DIALOGUE TRAINER ⭐
   - See planning scenario (z.B. "Fest organisieren")
   - Choose from Redemittel cards:
     * Vorschlag machen: "Wie wäre es, wenn..."
     * Vorschlag annehmen: "Ja, das ist eine gute Idee"
     * Vorschlag ablehnen: "Das finde ich nicht so gut"
     * Meinung äußern: "Ich finde, dass..."
   - Build complete dialogue interactively
   - Record final dialogue performance
   
4. Review & Repeat
```

### Test Mode (Prüfung)

```
1. Start full 16-minute simulation
   ↓
2. Teil 1: Examiner video asks questions → Record answers (4min)
   ↓
3. Teil 2: View image → Answer questions → Record (6min)
   ↓
4. Teil 3: Planning task → Record dialogue (6min)
   ↓
5. Self-Evaluation with rubric
   ↓
6. Results & Model Answers
```

---

## 🎨 Interactive Features

### 1. **Branching Dialogue Trainer** (Teil 3 Practice)

**Purpose:** Help users practice using correct Redemittel in context

**Flow:**
```
Scenario: "Sie wollen eine Geburtstagsparty organisieren"
     ↓
System: "Wann wollen Sie feiern?"
     ↓
USER CHOICE:
┌─────────────────────────────────────────────────┐
│ [Card 1] Vorschlag machen                       │
│ "Wie wäre es, wenn wir am Samstag feiern?"     │
│                                                  │
│ [Card 2] Nach Meinung fragen                    │
│ "Was denkst du? Wann hast du Zeit?"            │
└─────────────────────────────────────────────────┘
     ↓ (User selects Card 1)
System: "Ja, Samstag ist gut! Wo wollen Sie feiern?"
     ↓
USER CHOICE:
┌─────────────────────────────────────────────────┐
│ [Card 1] Vorschlag: Restaurant                  │
│ "Wir könnten im Restaurant feiern."            │
│                                                  │
│ [Card 2] Vorschlag: Zu Hause                    │
│ "Ich schlage vor, dass wir zu Hause feiern."   │
└─────────────────────────────────────────────────┘
     ↓
Continue for 6-8 exchanges...
     ↓
Complete dialogue saved → Record audio version
```

**UI Design:**
- **Scenario card** at top (glass-morphism, purple gradient)
- **Examiner prompt** in speech bubble (left side)
- **2-3 response cards** (large, tappable, rounded-2xl)
- **Dialogue history** (scrollable transcript)
- **Progress indicator** (6-8 exchanges required)

### 2. **Video-Based Examiner**

**Purpose:** Simulate realistic exam experience

**Implementation:**
- HTML5 `<video>` element
- Videos in `/public/video/sprechen/`
- Naming: `teil1_frage1.mp4`, `teil2_intro.mp4`, etc.
- Controls: Play/Pause, Volume (no seek in Test mode)

**Video Types:**
1. **Introduction videos** (Teil 1-3 instructions)
2. **Question videos** (Examiner asking questions)
3. **Transition videos** (Moving between parts)
4. **Encouragement videos** (Positive feedback)

### 3. **Audio Recording**

**Purpose:** Allow users to practice speaking and review

**Features:**
- Record button with visual feedback (pulsing red circle)
- Playback controls
- Re-record option
- Download recording (optional)
- Time limit indicators

**Technical:**
```javascript
// Use Web Audio API
const mediaRecorder = new MediaRecorder(stream);
// Save as WebM or MP3
// Store temporarily in state or IndexedDB
```

### 4. **Self-Evaluation Rubric**

**Purpose:** Help users assess their own speaking

**Rubric (Based on DTZ Criteria):**

```
□ Aufgabe erfüllt (alle Punkte angesprochen)
□ Verständlichkeit (klar und verständlich gesprochen)
□ Grammatik (meistens korrekt)
□ Wortschatz (passende Wörter verwendet)
□ Flüssigkeit (nicht zu viele Pausen)
□ Aussprache (klar genug)
```

**Scoring:**
- 6/6: "Sehr gut! Prüfungsreif!"
- 4-5/6: "Gut! Noch ein bisschen üben."
- <4/6: "Übe weiter. Du schaffst das!"

---

## 📁 Data Structure

### Video Manifest (`/public/data/sprechen/video-manifest.json`)

```json
{
  "videos": {
    "teil1_intro": {
      "file": "teil1_einleitung.mp4",
      "duration": 25,
      "type": "introduction",
      "transcript": "Willkommen zur Mündlichen Prüfung..."
    },
    "teil1_frage1": {
      "file": "teil1_name.mp4",
      "duration": 8,
      "type": "question",
      "prompt": "Wie heißen Sie?",
      "transcript": "Bitte stellen Sie sich vor. Wie heißen Sie?"
    }
  }
}
```

### Practice Content (`/public/data/sprechen/sprechen-uebung.json`)

```json
{
  "teil1": {
    "title": "Teil 1: Sich vorstellen",
    "description": "Übung mit Stichwörtern",
    "duration": 240,
    "exercises": [
      {
        "id": "t1_ex1",
        "type": "personal-question",
        "videoFile": "teil1_frage1.mp4",
        "prompt": "Wie heißen Sie?",
        "modelAnswer": "Ich heiße Maria Schmidt.",
        "tips": [
          "Sagen Sie Vor- und Nachname",
          "Sprechen Sie langsam und deutlich"
        ]
      },
      {
        "id": "t1_ex2",
        "type": "personal-question",
        "videoFile": "teil1_frage2.mp4",
        "prompt": "Woher kommen Sie?",
        "modelAnswer": "Ich komme aus Polen, aus Warschau.",
        "tips": [
          "Nennen Sie Land und Stadt",
          "Verwenden Sie: 'Ich komme aus...'"
        ]
      }
    ]
  },
  "teil3": {
    "title": "Teil 3: Gemeinsam etwas planen",
    "description": "Interaktiver Dialog-Trainer",
    "scenarios": [
      {
        "id": "fest_organisieren",
        "title": "Eine Geburtstagsparty organisieren",
        "description": "Planen Sie gemeinsam eine Party",
        "leitpunkte": ["Wann?", "Wo?", "Essen/Getränke?", "Wer kommt?", "Dekoration?"],
        "dialogueFlow": [
          {
            "step": 1,
            "examinerPrompt": "Wann wollen Sie die Party machen?",
            "redemittelOptions": [
              {
                "category": "vorschlag_machen",
                "text": "Wie wäre es, wenn wir am Samstag feiern?",
                "followUp": "examiner_agrees"
              },
              {
                "category": "nach_meinung_fragen",
                "text": "Was denkst du? Wann hast du Zeit?",
                "followUp": "examiner_suggests"
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### Test Content (`/public/data/sprechen/sprechen-tests.json`)

```json
{
  "modelltest-1": {
    "id": "modelltest-1",
    "title": "DTZ Modelltest 1 - Sprechen",
    "description": "Komplette Mündliche Prüfung (16 Minuten)",
    "duration": 960,
    "parts": [
      {
        "teil": 1,
        "title": "Sich vorstellen",
        "duration": 240,
        "items": [
          {
            "no": 1,
            "type": "introduction",
            "videoFile": "mt1_teil1_intro.mp4",
            "prompts": [
              "Wie heißen Sie?",
              "Woher kommen Sie?",
              "Wo wohnen Sie jetzt?",
              "Was machen Sie beruflich?",
              "Haben Sie Familie?"
            ],
            "followUpQuestions": [
              "Seit wann leben Sie in Deutschland?",
              "Welche Sprachen sprechen Sie?"
            ]
          }
        ]
      },
      {
        "teil": 2,
        "title": "Über Erfahrungen sprechen",
        "duration": 360,
        "items": [
          {
            "no": 2,
            "type": "image-description",
            "imageFile": "einkaufen_supermarkt.jpg",
            "videoFile": "mt1_teil2_intro.mp4",
            "mainPrompts": [
              "Was sehen Sie auf dem Bild?",
              "Was macht die Person?",
              "Wofür braucht man das?"
            ],
            "followUpQuestions": [
              "Wo kaufen Sie normalerweise ein?",
              "Wie oft gehen Sie einkaufen?",
              "Was kaufen Sie am liebsten?"
            ],
            "checklist": [
              "Bild beschrieben",
              "Eigene Erfahrungen erwähnt",
              "Auf Nachfragen geantwortet"
            ]
          }
        ]
      },
      {
        "teil": 3,
        "title": "Gemeinsam etwas planen",
        "duration": 360,
        "items": [
          {
            "no": 3,
            "type": "planning-task",
            "scenario": "Sie wollen mit Nachbarn einen Ausflug machen",
            "videoFile": "mt1_teil3_intro.mp4",
            "leitpunkte": [
              "Wann?",
              "Wohin?",
              "Verkehrsmittel?",
              "Essen/Getränke?",
              "Wer macht was?"
            ],
            "requiredElements": [
              "Vorschlag gemacht",
              "Auf Vorschlag reagiert",
              "Meinung geäußert",
              "Nachgefragt",
              "Aufgaben verteilt"
            ]
          }
        ]
      }
    ]
  }
}
```

### Redemittel Database (`/public/data/sprechen/redemittel.json`)

```json
{
  "teil1": {
    "personal_info": [
      "Ich heiße {name}.",
      "Ich komme aus {country}, aus {city}.",
      "Ich wohne in {city}.",
      "Ich bin {profession} von Beruf.",
      "Ich habe {number} Kinder."
    ]
  },
  "teil3": {
    "vorschlag_machen": [
      "Wie wäre es, wenn wir {activity}?",
      "Wir könnten {activity}. Was meinst du?",
      "Ich schlage vor, dass wir {activity}.",
      "Vielleicht sollten wir {activity}?"
    ],
    "vorschlag_annehmen": [
      "Ja, das ist eine gute Idee!",
      "Das finde ich super!",
      "In Ordnung, das machen wir so.",
      "Ich bin einverstanden."
    ],
    "vorschlag_ablehnen": [
      "Das finde ich nicht so gut. Vielleicht sollten wir lieber {alternative}.",
      "Ich weiß nicht, das ist keine gute Idee. Besser wäre es, wenn {alternative}.",
      "Nein, ich denke, wir sollten {alternative}."
    ],
    "meinung_äußern": [
      "Ich finde, dass {opinion}.",
      "Ich denke, {opinion}.",
      "Meiner Meinung nach {opinion}."
    ],
    "zustimmen": [
      "Das finde ich auch.",
      "Ja, das stimmt.",
      "Da hast du recht."
    ],
    "widersprechen": [
      "Nein, das finde ich nicht.",
      "Das kommt darauf an.",
      "Ich denke nicht, dass {reason}."
    ],
    "nachfragen": [
      "Was denkst du?",
      "Was meinst du?",
      "Wie findest du das?",
      "Was hältst du davon?"
    ]
  }
}
```

---

## 🎨 Component Architecture

### Core Components

```
src/features/sprechen/
├── SprechenHub.jsx                    # Landing page (mode selector)
├── SprechenUebung.jsx                 # Practice mode container
├── SprechenPruefung.jsx               # Test mode container
├── SprechenPlayer.jsx                 # Video player + recording UI
├── DialogueTrainer.jsx                # Interactive branching dialogues (Teil 3)
├── useSprechenEngine.js               # State management hook
├── scoring.js                         # Self-evaluation utilities
└── components/
    ├── VideoPlayer.jsx                # HTML5 video with controls
    ├── AudioRecorder.jsx              # Recording interface
    ├── RedemittelCard.jsx             # Dialogue choice cards
    ├── DialogueHistory.jsx            # Conversation transcript
    ├── SelfEvaluationRubric.jsx       # Assessment checklist
    └── ModelAnswerDisplay.jsx         # Example answers
```

### Component Details

#### **SprechenHub.jsx** (Landing Page)

```jsx
// Similar to HoerenHub
// Shows 3 cards:
// 1. Übung (Practice) → /sprechen/uebung/teil/:teil
// 2. Prüfung (Test) → /sprechen/pruefung/:testId
// 3. Training (Random) → /sprechen/training
```

#### **SprechenPlayer.jsx** (Core Player)

```jsx
<SprechenPlayer
  mode="uebung" | "pruefung"
  teil={1 | 2 | 3}
  videoFile="teil1_frage1.mp4"
  prompt="Wie heißen Sie?"
  modelAnswer="Ich heiße Maria Schmidt."
  onRecordingComplete={(audioBlob) => {}}
  allowReRecord={true}
  timeLimit={30}
/>
```

**Features:**
- Video playback with controls
- Recording button (start/stop)
- Waveform visualization during recording
- Playback of user recording
- Model answer playback
- Timer display

#### **DialogueTrainer.jsx** (Teil 3 Practice)

```jsx
<DialogueTrainer
  scenario={{
    title: "Geburtstagsparty organisieren",
    leitpunkte: ["Wann?", "Wo?", "Essen/Getränke?"],
    dialogueFlow: [...]
  }}
  onComplete={(dialogue) => {}}
/>
```

**Features:**
- Displays scenario at top
- Shows examiner prompts (speech bubbles)
- Presents 2-3 Redemittel choice cards
- Builds dialogue transcript
- Validates complete dialogue (all Leitpunkte covered)
- Final recording of complete dialogue

#### **useSprechenEngine.js** (State Hook)

```javascript
const useSprechenEngine = (mode, content, timeLimitSeconds) => {
  const [state, setState] = useState({
    currentTeil: 1,
    currentItemIndex: 0,
    recordings: {}, // { itemNo: audioBlob }
    selfEvaluations: {}, // { itemNo: rubricScores }
    startTime: null,
    timeRemaining: timeLimitSeconds,
    isComplete: false,
  });

  const actions = {
    saveRecording: (itemNo, audioBlob) => {},
    saveSelfEvaluation: (itemNo, rubric) => {},
    nextItem: () => {},
    previousItem: () => {},
    completeTest: () => {},
  };

  return [state, actions];
};
```

---

## 🎯 Implementation Phases

### Phase 1: Infrastructure (Week 1)

**Goal:** Build foundation components

**Tasks:**
1. ✅ Create `/src/features/sprechen/` folder structure
2. ✅ Build `VideoPlayer.jsx` component
3. ✅ Build `AudioRecorder.jsx` component
4. ✅ Create `useSprechenEngine.js` hook
5. ✅ Set up routes in `App.jsx`
6. ✅ Create placeholder data files (JSON)

**Deliverables:**
- Working video player with controls
- Functional audio recording/playback
- Basic routing structure

---

### Phase 2: Practice Mode (Week 2)

**Goal:** Implement Übung for all 3 Teile

**Tasks:**
1. ✅ Build `SprechenUebung.jsx` container
2. ✅ Implement Teil 1 practice (personal questions)
3. ✅ Implement Teil 2 practice (image description)
4. ✅ Build `DialogueTrainer.jsx` for Teil 3
5. ✅ Create Redemittel card system
6. ✅ Add model answer comparisons
7. ✅ Implement replay functionality

**Deliverables:**
- Complete practice mode for all 3 Teile
- Interactive dialogue trainer working
- Model answers available

---

### Phase 3: Test Mode (Week 3)

**Goal:** Implement full 16-minute Prüfung

**Tasks:**
1. ✅ Build `SprechenPruefung.jsx` container
2. ✅ Implement timed test (16 minutes)
3. ✅ Add Teil transitions with examiner videos
4. ✅ Build `SelfEvaluationRubric.jsx`
5. ✅ Create results screen with scoring
6. ✅ Add warning on exit during test

**Deliverables:**
- Working full test simulation
- Self-evaluation system
- Results with detailed feedback

---

### Phase 4: Content & Polish (Week 4)

**Goal:** Add content and refine UX

**Tasks:**
1. ✅ Upload examiner videos to `/public/video/sprechen/`
2. ✅ Create complete `video-manifest.json`
3. ✅ Write `sprechen-uebung.json` (all exercises)
4. ✅ Write `sprechen-tests.json` (2-3 model tests)
5. ✅ Add 50+ dialogue scenarios for Teil 3
6. ✅ Polish UI/UX (animations, feedback)
7. ✅ Mobile optimization
8. ✅ Accessibility testing

**Deliverables:**
- Complete content library
- Polished, production-ready UI
- Mobile-responsive design

---

## 🎨 Design Specifications

### Following Existing Design System

**Colors:**
- Primary gradient: `from-purple-600 to-indigo-600`
- Card backgrounds: `bg-white/80 backdrop-blur-md`
- Borders: `border-purple-100`
- Hover effects: `hover:shadow-xl hover:-translate-y-2`

**Components:**
- Rounded corners: `rounded-2xl`, `rounded-3xl`
- Shadows: `shadow-lg`, `shadow-xl`
- Transitions: `transition-all duration-200`
- Typography: Bold headings with gradient text

### Sprechen-Specific UI

**Video Player:**
```jsx
<div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
  <video className="w-full h-full object-cover" />
  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
    {/* Controls */}
  </div>
</div>
```

**Recording Button:**
```jsx
<button className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110">
  {recording ? (
    <div className="w-6 h-6 bg-white rounded animate-pulse" />
  ) : (
    <Mic className="w-8 h-8 text-white" />
  )}
</button>
```

**Redemittel Choice Cards:**
```jsx
<button className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border-2 border-purple-200 hover:border-purple-500 hover:shadow-2xl transition-all duration-200 hover:scale-105 text-left w-full">
  <div className="text-sm text-purple-600 font-bold mb-2">
    Vorschlag machen
  </div>
  <div className="text-gray-900 font-medium">
    "Wie wäre es, wenn wir am Samstag feiern?"
  </div>
</button>
```

**Dialogue History:**
```jsx
<div className="space-y-4">
  {/* Examiner bubble (left) */}
  <div className="flex justify-start">
    <div className="bg-purple-100 rounded-2xl rounded-tl-none p-4 max-w-xs">
      <p className="text-gray-900">Wann wollen Sie feiern?</p>
    </div>
  </div>
  
  {/* User bubble (right) */}
  <div className="flex justify-end">
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl rounded-tr-none p-4 max-w-xs">
      <p>Wie wäre es, wenn wir am Samstag feiern?</p>
    </div>
  </div>
</div>
```

---

## 📱 Mobile Optimization

### Touch Targets
- Minimum 44x44px for all interactive elements
- Large recording button (80x80px)
- Generous spacing between Redemittel cards

### Responsive Layout
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Video on top (mobile) / left (desktop) */}
  {/* Controls on bottom (mobile) / right (desktop) */}
</div>
```

### Video Player
- Full-width on mobile
- Aspect ratio maintained (16:9)
- Controls optimized for touch

---

## ♿ Accessibility

### Video
- Captions/subtitles for all examiner videos
- Audio descriptions available
- Keyboard controls (Space = play/pause)

### Recording
- Visual feedback for recording state
- Clear labels and ARIA attributes
- Error messages for mic permission issues

### Keyboard Navigation
- Tab through Redemittel cards
- Enter/Space to select
- Escape to cancel recording

---

## 🎯 Success Metrics

### User Engagement
- [ ] Users complete at least 5 practice sessions before test
- [ ] Average time in dialogue trainer: 10+ minutes
- [ ] Users re-record responses 2-3 times (indicates engagement)

### Learning Outcomes
- [ ] Users report feeling "more confident" (survey)
- [ ] Self-evaluation scores improve over time
- [ ] Users use correct Redemittel in recordings

### Technical Performance
- [ ] Video load time < 3 seconds
- [ ] Recording saves successfully 99%+ of time
- [ ] Zero crashes during test mode
- [ ] Mobile performance smooth (60fps)

---

## 🚀 Launch Checklist

### Pre-Launch
- [ ] All examiner videos uploaded and tested
- [ ] At least 2 complete Modelltests available
- [ ] 20+ dialogue scenarios for Teil 3 trainer
- [ ] Model answers recorded/written for all exercises
- [ ] Self-evaluation rubric validated
- [ ] Mobile testing on iOS and Android
- [ ] Accessibility audit passed
- [ ] Performance testing (Core Web Vitals)

### Launch
- [ ] Deploy to production
- [ ] Update dashboard with Sprechen card
- [ ] Add "New!" badge to Sprechen section
- [ ] Monitor error logs

### Post-Launch
- [ ] Collect user feedback
- [ ] Add more scenarios based on demand
- [ ] Create video tutorials for dialogue trainer
- [ ] Add AI speech evaluation (future enhancement)

---

## 📚 Resources Needed

### Video Content
1. **Teil 1 Videos** (8 videos)
   - Introduction (1)
   - Personal questions (7)

2. **Teil 2 Videos** (12 videos)
   - Introduction (1)
   - Image prompts (5)
   - Follow-up questions (6)

3. **Teil 3 Videos** (10 videos)
   - Introduction (1)
   - Planning scenarios (5)
   - Encouragement/transitions (4)

**Total:** ~30 videos, 5-20 seconds each

### Audio Content
- Model answers for Teil 1 (20 recordings)
- Model descriptions for Teil 2 (10 recordings)
- Complete dialogue examples for Teil 3 (50 recordings)

### Image Content
- Teil 2 prompt images (20+ images)
- Various topics: Einkaufen, Arzt, Bank, Post, etc.

---

## 🔮 Future Enhancements

### Phase 5 (Future)
- **AI Speech Evaluation:** Use Web Speech API or cloud service to evaluate pronunciation and grammar
- **Peer Practice:** Match users for live practice sessions
- **Video Responses:** Allow users to record video (not just audio)
- **Personalized Feedback:** Track weak areas and suggest targeted practice
- **Gamification:** Badges for completing scenarios, streaks
- **Export:** Download all recordings as ZIP for offline review
- **Teacher Dashboard:** If used in classroom settings

---

## 📝 Notes

### Video Format Recommendations
- **Format:** MP4 (H.264 video, AAC audio)
- **Resolution:** 1280x720 (720p) - balance quality/file size
- **Frame rate:** 30fps
- **Bitrate:** 2-4 Mbps
- **Audio:** 128 kbps stereo

### Recording Format
- **Format:** WebM (browser native) or MP3 (converted)
- **Sample rate:** 44.1 kHz
- **Channels:** Mono (sufficient for speech)
- **Bitrate:** 64-96 kbps

### Storage Considerations
- Videos stored in `/public/video/sprechen/` (static hosting)
- User recordings stored temporarily in browser (IndexedDB)
- Optional: Upload to cloud for persistent storage

---

**Document Version:** 1.0  
**Last Updated:** October 13, 2025  
**Next Review:** After Phase 1 completion
