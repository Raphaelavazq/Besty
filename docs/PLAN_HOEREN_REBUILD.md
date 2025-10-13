# Hören Module Re-Architecture Plan

**Date:** October 12, 2025  
**Status:** Clean Slate - Old implementation deleted  
**Source Materials:**

- Britta Weber et al - Mit Erfolg zum Deutsch-Test für Zuwanderer (2023)
- 78 official audio tracks (MEz_DTZ_Track_01-78.mp3)
- Official DTZ Modelltest 1 PDF with questions and solutions

---

## 1. Data Architecture (Source of Truth)

### A. Track Manifest (`content/dtz/hoeren/audio_manifest.json`)

Maps track numbers to semantic content and metadata.

```json
{
  "tracks": {
    "trk01": {
      "file": "MEz_DTZ_Track_01.mp3",
      "duration": 72,
      "type": "instruction",
      "belongs_to": "uebung_teil1",
      "description": "Übung Teil 1 - Einleitung und Beispiel"
    },
    "trk02": {
      "file": "MEz_DTZ_Track_02.mp3",
      "duration": 122,
      "type": "exercise",
      "belongs_to": "uebung_teil1",
      "description": "Übung Teil 1 - Aufgabe 1"
    }
  }
}
```

**Purpose:** Provides stable track IDs and metadata for all 78 tracks.

### B. Tests Structure (`content/dtz/hoeren/tests.json`)

Official Modelltest structure with all 20 items matching Antwortbogen layout.

```json
{
  "tests": [
    {
      "id": "modelltest-1",
      "title": "DTZ Modelltest 1",
      "description": "Offizieller DTZ Hörtest (25 Minuten)",
      "duration": 1500,
      "parts": [
        {
          "teil": 1,
          "title": "Ansagen am Telefon, öffentliche Durchsagen",
          "instruction_text": "Sie hören vier Ansagen. Zu jedem Text gibt es eine Aufgabe. Kreuzen Sie an: a, b oder c. Sie hören jeden Text einmal.",
          "instruction_tracks": ["trk10"],
          "beispiel_track": "trk11",
          "items": [
            {
              "no": 1,
              "track": "trk12",
              "type": "mc3",
              "question": "Sie wollen zum Rosengarten. Was müssen Sie tun?",
              "options": [
                "An der Haltestelle 'Friedrichring' umsteigen",
                "Mit der Straßenbahn 78 fahren",
                "Mit der U-Bahn-Linie 1 oder 2 fahren"
              ],
              "correct": "c",
              "transcript_ref": "mt1.t1.trk12"
            },
            {
              "no": 2,
              "track": "trk13",
              "type": "mc3",
              "question": "Wer ruft an?",
              "options": [
                "Eine Apotheke",
                "Eine Arztpraxis",
                "Eine Versicherung"
              ],
              "correct": "b",
              "transcript_ref": "mt1.t1.trk13"
            }
          ]
        },
        {
          "teil": 2,
          "title": "Radiodurchsagen",
          "instruction_text": "Sie hören fünf Informationen aus dem Radio. Zu jedem Text gibt es eine Aufgabe. Kreuzen Sie an: a, b oder c. Sie hören jeden Text zweimal.",
          "instruction_tracks": ["trk20"],
          "beispiel_track": "trk21",
          "items": [
            {
              "no": 5,
              "track": "trk22",
              "type": "mc3",
              "question": "Am Sonntag gibt es",
              "options": [
                "ein Musikprogramm",
                "ein Programm für Kinder",
                "internationale Kurzfilme"
              ],
              "correct": "c",
              "transcript_ref": "mt1.t2.trk22"
            }
          ]
        },
        {
          "teil": 3,
          "title": "Gespräche",
          "instruction_text": "Sie hören vier Gespräche. Zu jedem Gespräch gibt es zwei Aufgaben. Kreuzen Sie an: richtig oder falsch. Sie hören jeden Text zweimal.",
          "instruction_tracks": ["trk30"],
          "beispiel_track": "trk31",
          "items": [
            {
              "no": 10,
              "track": "trk32",
              "type": "tf",
              "question": "Die Frau ist Ärztin.",
              "correct": "falsch",
              "transcript_ref": "mt1.t3.trk32"
            },
            {
              "no": 11,
              "track": "trk32",
              "type": "mc3",
              "question": "Die Frau sagt dem Mann, dass",
              "options": [
                "die Tabletten lange wirken",
                "er mindestens drei Tabletten nehmen soll",
                "er sofort zum Arzt gehen soll"
              ],
              "correct": "c",
              "transcript_ref": "mt1.t3.trk32"
            }
          ]
        },
        {
          "teil": 4,
          "title": "Meinungen zu einem Thema",
          "instruction_text": "Sie hören drei Meinungen zu einem Thema. Welche Aussage passt? Ordnen Sie zu. Sie hören die Meinungen einmal.",
          "instruction_tracks": ["trk40"],
          "beispiel_track": "trk41",
          "items": [
            {
              "no": 18,
              "track": "trk42",
              "type": "match6",
              "question": "Person 1",
              "options": [
                "Es gibt schon viele Geschäfte, die sonntags offen haben",
                "Im Ausland sind die Geschäfte sonntags geschlossen",
                "In der Zukunft werden die Geschäfte länger offen sein",
                "Man kann sonntags seine Freizeit nicht mehr zusammen verbringen",
                "Schon jetzt haben die Leute zu viel Hektik",
                "Sonntags sollten auch Banken offen haben"
              ],
              "correct": "d",
              "transcript_ref": "mt1.t4.trk42.p1"
            }
          ]
        }
      ]
    }
  ]
}
```

### C. Practice Exercises (`content/dtz/hoeren/uebung.json`)

Übung exercises grouped by Teil for practice mode with immediate feedback.

```json
{
  "uebung": {
    "teil1": {
      "title": "Übung Teil 1: Ansagen",
      "description": "Üben Sie mit Ansagen am Telefon und öffentlichen Durchsagen",
      "instruction_tracks": ["trk01"],
      "beispiel_track": "trk02",
      "exercises": [
        {
          "id": "ueb_t1_01",
          "track": "trk03",
          "type": "mc3",
          "question": "Was sagt der Lehrer?",
          "options": [
            "Die Schüler sollen die Hausaufgaben zeigen",
            "Die Schüler sollen das Buch öffnen",
            "Die Schüler sollen nach Hause gehen"
          ],
          "correct": "a",
          "transcript_ref": "ueb.t1.trk03",
          "feedback": {
            "correct": "Richtig! Der Lehrer sagt 'Ich möchte zuerst die Hausaufgaben sehen.'",
            "incorrect": "Hören Sie noch einmal. Der Lehrer sagt am Anfang, was die Schüler tun sollen."
          }
        }
      ]
    },
    "teil2": {
      "title": "Übung Teil 2: Radio",
      "description": "Üben Sie mit Radiodurchsagen",
      "instruction_tracks": ["trk15"],
      "beispiel_track": "trk16",
      "exercises": []
    },
    "teil3": {
      "title": "Übung Teil 3: Gespräche",
      "description": "Üben Sie mit Alltagsgesprächen",
      "instruction_tracks": ["trk25"],
      "beispiel_track": "trk26",
      "exercises": []
    },
    "teil4": {
      "title": "Übung Teil 4: Meinungen",
      "description": "Üben Sie mit Meinungsäußerungen",
      "instruction_tracks": ["trk35"],
      "beispiel_track": "trk36",
      "exercises": []
    }
  }
}
```

### D. Transcripts (`content/dtz/hoeren/transcripts.json`)

All listening texts verbatim from official materials.

```json
{
  "transcripts": {
    "mt1.t1.trk12": {
      "text": "Liebe Fahrgäste, die U-Bahn-Linie 1 und 2 fährt zum Rosengarten. Steigen Sie am Hauptbahnhof in die U-Bahn um. Die Straßenbahn 78 fährt nicht zum Rosengarten.",
      "speaker": "Durchsage",
      "context": "Öffentliche Verkehrsansage"
    },
    "mt1.t1.trk13": {
      "text": "Guten Tag, hier ist die Arztpraxis Dr. Schmidt. Ihr Termin am Donnerstag um 15 Uhr muss leider abgesagt werden. Bitte rufen Sie uns zurück und vereinbaren Sie einen neuen Termin.",
      "speaker": "Praxismitarbeiter",
      "context": "Telefonnachricht"
    },
    "ueb.t1.trk03": {
      "text": "Ruhe bitte! So, setzt euch! Ich möchte zuerst die Hausaufgaben sehen. Peter, kannst du mal da hinten das Fenster zumachen? Es zieht.",
      "speaker": "Lehrer",
      "context": "Klassenzimmer"
    }
  }
}
```

---

## 2. Component Architecture

### A. Core Components

```
src/features/hoeren/
├── HoerenPlayer.tsx          # Smart audio player (mode-aware)
├── HoerenUebung.tsx          # Practice mode container
├── HoerenPruefung.tsx        # Test mode container
├── useHoerenEngine.ts        # State management hook
├── scoring.ts                # Pure scoring functions
└── types.ts                  # TypeScript interfaces
```

### B. Player Specification (`HoerenPlayer.tsx`)

**Props:**

```typescript
interface HoerenPlayerProps {
  mode: "uebung" | "pruefung";
  trackId: string;
  currentItem: HoerenItem;
  transcriptText?: string;
  allowSeek: boolean;
  allowReplay: boolean;
  showTranscript: boolean;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  onComplete: () => void;
}
```

**Features:**

- ✅ Keyboard controls (Space, ←/→, 1/2/3 for options)
- ✅ Transcript toggle (visible in Übung, hidden in Prüfung)
- ✅ Mode-aware behavior (replay allowed in Übung only)
- ✅ Progress indicator (Teil x • Item y/z • Track n)
- ✅ A11y labels and focus management

### C. Engine Hook (`useHoerenEngine.ts`)

```typescript
interface HoerenEngineState {
  mode: "uebung" | "pruefung";
  currentTeil: number;
  currentItemIndex: number;
  items: HoerenItem[];
  answers: Record<number, string>;
  showFeedback: boolean;
  isComplete: boolean;
}

interface HoerenEngineActions {
  submitAnswer: (itemNo: number, answer: string) => void;
  nextItem: () => void;
  replayTrack: () => void;
  calculateScore: () => Score;
}

export function useHoerenEngine(
  mode: "uebung" | "pruefung",
  content: TestOrUebungContent
): [HoerenEngineState, HoerenEngineActions];
```

### D. Scoring Logic (`scoring.ts`)

```typescript
export function scoreItem(item: HoerenItem, userAnswer: string): ItemResult {
  return {
    correct: userAnswer === item.correct,
    points: userAnswer === item.correct ? 1 : 0,
  };
}

export function scoreTest(
  items: HoerenItem[],
  answers: Record<number, string>
): TestScore {
  const results = items.map((item) => scoreItem(item, answers[item.no]));

  return {
    total: items.length,
    correct: results.filter((r) => r.correct).length,
    percentage: (correct / total) * 100,
    passed: percentage >= 60,
  };
}
```

---

## 3. Routing Structure

### A. New Routes

| Route                            | Component            | Purpose                      |
| -------------------------------- | -------------------- | ---------------------------- |
| `/tests/hoeren`                  | `HoerenHub.jsx`      | Landing page (keep existing) |
| `/tests/hoeren/uebung/:teil`     | `HoerenUebung.tsx`   | Practice Teil 1-4            |
| `/tests/hoeren/pruefung/:testId` | `HoerenPruefung.tsx` | Full model test              |

### B. Route Parameters

**Übung:** `/tests/hoeren/uebung/teil1`

- `teil` = 1, 2, 3, or 4
- Loads exercises from `uebung.json`
- Shows immediate feedback
- Allows replay

**Prüfung:** `/tests/hoeren/pruefung/modelltest-1`

- `testId` = modelltest-1, modelltest-2, etc.
- Loads test from `tests.json`
- No feedback during test
- Locks replay/seek

---

## 4. User Flows

### Flow A: Practice (Übung)

```
User → /tests/hoeren → Choose "Training"
  ↓
Select Teil (1, 2, 3, or 4)
  ↓
/tests/hoeren/uebung/teil1
  ↓
Load uebung.json → Teil 1 exercises
  ↓
Play instruction track → Show Beispiel
  ↓
For each exercise:
  ├─ Play track
  ├─ User answers
  ├─ Show immediate feedback
  ├─ Display transcript
  └─ Option to replay
  ↓
All exercises complete → Summary + "Try another Teil"
```

### Flow B: Full Test (Prüfung)

```
User → /tests/hoeren → Choose "Test"
  ↓
/tests/hoeren/pruefung/modelltest-1
  ↓
Load tests.json → Modelltest 1
  ↓
Teil 1 (Items 1-4):
  ├─ Play instruction + Beispiel
  ├─ Play Track 01-04 (once each)
  └─ Collect answers
  ↓
Teil 2 (Items 5-9):
  ├─ Play instruction + Beispiel
  ├─ Play Track 05-09 (twice each)
  └─ Collect answers
  ↓
Teil 3 (Items 10-17):
  ├─ Play instruction + Beispiel
  ├─ Play Track 10-13 (twice each, 2 questions per dialogue)
  └─ Collect answers
  ↓
Teil 4 (Items 18-20):
  ├─ Play instruction + Beispiel
  ├─ Play Track 14 (once, 3 matching tasks)
  └─ Collect answers
  ↓
Test complete → Show Antwortbogen + Score + Review
```

---

## 5. State Management Strategy

### A. Local State (React hooks)

Use `useHoerenEngine` hook for:

- Current item tracking
- Answer collection
- Feedback display
- Progress calculation

**Why local:** Hören is self-contained, no cross-feature sharing needed.

### B. Optional Persistence

Use `localStorage` for:

- Practice progress (which exercises completed)
- Last visited Teil
- User preferences (transcript default visibility)

**Not persisting:** Test answers (tests should be retaken fresh)

---

## 6. Content Loading Strategy

### A. Loaders (`src/content/hoeren/hoerenContent.ts`)

```typescript
export async function getTest(testId: string): Promise<HoerenTest> {
  const data = await fetch("/content/dtz/hoeren/tests.json");
  const json = await data.json();
  return json.tests.find((t) => t.id === testId);
}

export async function getUebungTeil(teil: number): Promise<UebungTeil> {
  const data = await fetch("/content/dtz/hoeren/uebung.json");
  const json = await data.json();
  return json.uebung[`teil${teil}`];
}

export async function getTranscript(ref: string): Promise<Transcript> {
  const data = await fetch("/content/dtz/hoeren/transcripts.json");
  const json = await data.json();
  return json.transcripts[ref];
}

export function getAudioUrl(trackId: string): string {
  return `/audio/hoeren/${trackId}.mp3`;
}
```

### B. Validation (Runtime)

Use Zod schemas to validate loaded content:

```typescript
import { z } from "zod";

const HoerenItemSchema = z.object({
  no: z.number().min(1).max(20),
  track: z.string(),
  type: z.enum(["mc3", "tf", "match6"]),
  question: z.string(),
  options: z.array(z.string()),
  correct: z.string(),
  transcript_ref: z.string(),
});
```

---

## 7. Accessibility Requirements

### A. Keyboard Navigation

| Key   | Action            | Context      |
| ----- | ----------------- | ------------ |
| Space | Play/Pause        | Always       |
| ←     | Seek -5s          | Übung only   |
| →     | Seek +5s          | Übung only   |
| 1/2/3 | Select option     | MC questions |
| R     | Replay track      | Übung only   |
| T     | Toggle transcript | Übung only   |
| Enter | Submit answer     | Always       |
| Esc   | Close modal       | Always       |

### B. Screen Reader Support

- Announce track changes: "Jetzt Track 12, Frage 1 von 20"
- Announce correct/incorrect: "Richtig!" / "Leider falsch"
- Label all controls: `aria-label="Wiedergeben"`, etc.
- Use `<fieldset>` and `<legend>` for question groups

### C. Focus Management

- Move focus to current question on track change
- Trap focus in modal dialogs
- Restore focus after feedback closes

---

## 8. Testing Strategy

### A. Unit Tests

- Scoring functions (scoring.ts)
- Content loaders (hoerenContent.ts)
- Engine hook logic (useHoerenEngine.ts)

### B. Integration Tests

- Full Übung flow (Teil 1-4)
- Full Prüfung flow (Modelltest 1)
- Keyboard navigation
- Answer persistence

### C. Content Validation

Script to verify:

```bash
npm run validate:hoeren
```

Checks:

- ✅ All 20 test items present (no gaps)
- ✅ All referenced tracks exist in `public/audio/hoeren/`
- ✅ All transcript refs resolve
- ✅ Item numbering matches Antwortbogen
- ✅ Correct answer options are valid

---

## 9. Migration Path (Safe Cutover)

### Phase 1: Parallel Implementation (Week 1)

- ✅ Old code deleted (done)
- Build new components under `src/features/hoeren/`
- New routes don't conflict with old ones
- Test in isolation

### Phase 2: Content Import (Week 2)

- Map all 78 tracks to semantic IDs
- Extract transcripts from PDF
- Create tests.json, uebung.json, transcripts.json
- Validate with integrity script

### Phase 3: Route Activation (Week 3)

- Update HoerenHub to link to new routes
- Deploy behind feature flag (optional)
- QA full flows
- Monitor for issues

### Phase 4: Cleanup

- Remove any temporary scaffolding
- Optimize bundle size
- Add analytics events

---

## 10. Success Metrics

### Functional Requirements (Must Have)

- ✅ Users can practice Übung Teil 1-4 independently
- ✅ Users can take full Modelltest 1 in Prüfung mode
- ✅ All 20 items match official Antwortbogen layout
- ✅ Transcripts display correctly in Übung mode
- ✅ Player is fully keyboard-accessible
- ✅ No broken track references

### Performance Requirements

- Audio loads in < 2s on 3G
- Question rendering in < 100ms
- Smooth seeking (no stutter)
- Bundle size < 50KB (gzipped)

### UX Requirements

- Clear Teil/item progress indicators
- Immediate feedback in Übung mode
- Proper error messages (track not found, etc.)
- Mobile-optimized touch controls

---

## Next Steps

1. ✅ Complete this plan document
2. Create IMPLEMENTATION_NOTES.md with detailed file tree
3. Build core infrastructure (player, engine, loaders)
4. Extract content from PDFs → JSON files
5. Wire up routes and test flows
6. Run integrity validation
7. QA and polish

---

**End of Re-Architecture Plan**
