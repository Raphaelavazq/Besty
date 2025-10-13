# Hören Module Super Audit

**Date:** October 12, 2025  
**Scope:** Complete DTZ Hören practice and testing module  
**Source of Truth:** Britta Weber et al - Mit Erfolg zum Deutsch-Test für Zuwanderer (2023) + Official DTZ materials

---

## Executive Summary

### Current State Assessment

The current Hören implementation is **partially functional** but suffers from:

1. **Fragmented data architecture** - Multiple JSON files with inconsistent structures
2. **Weak audio-question coupling** - Questions reference tracks by `audioFile` paths, creating brittle dependencies
3. **No transcript integration** - Transcripts exist in markdown but aren't connected to the player
4. **Missing exercise banks** - No dedicated "Übung" (practice) mode with Teil 1-4 exercises
5. **Limited player functionality** - Player lacks keyboard controls, transcript toggle, and proper A11y
6. **Test-only focus** - System is built for full tests, not granular practice

### Critical Gaps

- ❌ No structured "Übung Teil 1-4" practice mode
- ❌ Transcripts not integrated into player UI
- ❌ Audio tracks not validated against official numbering
- ❌ No way to verify content matches official Antwortbogen (items 1-20)
- ❌ Player doesn't support instruction tracks or multi-track exercises
- ❌ No content integrity checks or validation scripts

---

## 1. Current File Inventory

### A. Data Files

| File                                               | Purpose                      | Issues                                     |
| -------------------------------------------------- | ---------------------------- | ------------------------------------------ |
| `public/data/synchronized-tests-dtz-official.json` | Full DTZ test (20 items)     | ✅ Complete but uses weak audio references |
| `public/data/synchronized-tests.json`              | Copy/fallback                | ⚠️ Redundant, unclear purpose              |
| `content/hoeren/telcdb1_track*.md`                 | Track metadata + transcripts | ⚠️ Not consumed by app, orphaned           |

**Data Model Issues:**

- Questions store `audioFile` as path string instead of track reference
- No `transcriptRef` field to link questions to transcript content
- Missing `instructionTracks` for Teil-level intro audio
- No "Nummer" subdivision for tracks with multiple questions (Teil 1)
- Questions don't declare their official item number (1-20)

### B. Components

| Component                | Location            | Responsibility                   | Issues                                                       |
| ------------------------ | ------------------- | -------------------------------- | ------------------------------------------------------------ |
| `AudioPlayerNew.jsx`     | `src/components/`   | Play audio, emit time updates    | ❌ No transcript support, no keyboard nav, hardcoded seeking |
| `ExercisePlayer.jsx`     | `src/pages/hoeren/` | Question flow, answer collection | ⚠️ Tightly coupled to JSON structure, no Übung mode          |
| `HoerenTeilComplete.jsx` | `src/components/`   | Teil-specific renderer           | ⚠️ Purpose unclear, may be dead code                         |
| `Hoeren.jsx`             | `src/pages/`        | Landing/hub page                 | ✅ Navigation only, not part of data flow                    |
| `HoerenHub.jsx`          | `src/pages/`        | Video library hub                | ✅ Separate feature, no conflict                             |
| `HoerenCompleteTest.jsx` | `src/pages/`        | Full test flow                   | ⚠️ Duplicates ExercisePlayer logic                           |
| `ExamAudio.jsx`          | `src/components/`   | Unknown                          | ❓ Needs investigation                                       |

**Component Architecture Issues:**

- Overlapping responsibilities between `ExercisePlayer` and `HoerenCompleteTest`
- No reusable "Übung engine" separate from "Prüfung engine"
- Player doesn't accept `mode` prop to differentiate Übung vs Prüfung behavior
- No `HoerenEngine` hook to encapsulate state/logic

### C. Audio Files

**Location:** `public/audio/hoeren/`  
**Naming:** `telcDB1_TrackNN.mp3` (N=01-39)  
**Coverage:**

- ✅ Tracks 01-39 present (full official test + extras)
- ❌ No integrity check to verify tracks match official durations
- ❌ No manifest mapping track numbers to semantic IDs

**Track Mapping (Official DTZ Modelltest 1):**

| Teil   | Items | Tracks      | Notes                                  |
| ------ | ----- | ----------- | -------------------------------------- |
| Teil 1 | 1-4   | Track 01-04 | 4 announcements, 1 track each          |
| Teil 2 | 5-9   | Track 05-09 | 5 radio clips, 1 track each            |
| Teil 3 | 10-17 | Track 10-13 | 4 dialogues, 2 questions per dialogue  |
| Teil 4 | 18-20 | Track 14    | 1 track, 3 opinion statements to match |

**Missing:**

- Instruction tracks (Beispiel/example) for each Teil
- Practice exercise tracks from "Übung Teil 1-4" sections

### D. Routes

| Route                       | Component                | Mode              | Issues                                 |
| --------------------------- | ------------------------ | ----------------- | -------------------------------------- |
| `/tests/hoeren`             | `HoerenHub.jsx`          | Navigation        | ✅ Works                               |
| `/tests/hoeren/training`    | `Hoeren.jsx`             | Exercise selector | ⚠️ Only shows test options, no Übung   |
| `/tests/hoeren/test`        | `Hoeren.jsx`             | Test selector     | ⚠️ Same as training                    |
| `/tests/hoeren/:mode/:type` | `ExercisePlayer.jsx`     | Exercise player   | ⚠️ Type="full" only, no Teil selection |
| `/tests/hoeren/complete`    | `HoerenCompleteTest.jsx` | Full test         | ⚠️ Duplicate logic                     |

**Routing Issues:**

- No `/hoeren/uebung/:teil` route for practice exercises
- No `/hoeren/pruefung/:testId` route for model tests
- Mode/type parameters are ambiguous (`training/single` vs `test/full`)

---

## 2. Data Flow Analysis

### Current Flow (Test Mode)

```
User → HoerenHub → Hoeren → ExercisePlayer
                       ↓
            synchronized-tests-dtz-official.json
                       ↓
              AudioPlayerNew ← audioFile path
                       ↓
            QuestionCard displays question
                       ↓
            User answers → state stored
                       ↓
            Next question → seek audio by timestamp
```

**Problems:**

1. **Timestamp-based seeking** - Player jumps to `question.timestamp`, but timestamps are relative to a continuous test recording, not individual tracks
2. **No track validation** - If `audioFile` path is wrong, player silently fails
3. **No transcript display** - Transcripts in markdown never reach the UI
4. **No Nummer awareness** - Teil 1 tracks have 4 "Nummern" but JSON treats each as separate question

### Desired Flow (Übung Mode)

```
User → /hoeren/uebung/teil1
         ↓
    Load Teil 1 exercise bank (uebung.json)
         ↓
    Display items by track + Nummer
         ↓
    HoerenPlayer (mode=uebung, allowReplay=true, transcript=visible)
         ↓
    Play track → User answers → Immediate feedback
         ↓
    Option to replay → Next Nummer/track
```

### Desired Flow (Prüfung Mode)

```
User → /hoeren/pruefung/modelltest-1
         ↓
    Load test structure (tests.json)
         ↓
    Teil 1 → 4 items (tracks 01-04)
         ↓
    HoerenPlayer (mode=pruefung, allowSeek=false, transcript=hidden)
         ↓
    Play each track once → collect answers
         ↓
    Teil 2-4 sequentially → Final score
```

---

## 3. Defects & Code Smells

### Critical (P0) - Blocks core functionality

1. **No Übung Mode** - Users can't practice individual Teile with feedback
2. **Brittle audio references** - String paths instead of validated track IDs
3. **Missing transcripts in UI** - Transcripts exist but aren't displayed
4. **No item→Antwortbogen mapping** - Can't verify official test structure

### High (P1) - Degrades UX

5. **Overlapping components** - `ExercisePlayer` and `HoerenCompleteTest` duplicate logic
6. **Player lacks A11y** - No keyboard controls, focus management, or ARIA labels
7. **No instruction tracks** - Users miss Teil introductions and examples
8. **Weak state management** - Answer state scattered across components

### Medium (P2) - Technical debt

9. **Dead code** - `HoerenTeilComplete.jsx`, unused markdown files
10. **Inconsistent naming** - `hoeren` vs `Hoeren` vs `listening`
11. **No validation** - Data loaded without schema checks
12. **Missing types** - No TypeScript/PropTypes for data models

### Low (P3) - Polish

13. **No loading states** - Players don't show track buffering
14. **Weak error handling** - Audio failures not communicated to user
15. **No progress persistence** - Practice progress lost on refresh

---

## 4. Root Cause Analysis

### Why audio-question mismatches occur

**Problem:** Questions reference `audioFile: "/audio/hoeren/telcDB1_Track01.mp3"` but player expects tracks to be sequential in a test recording.

**Root Cause:**  
The data model conflates **tracks** (audio files) with **items** (questions). Official DTZ structure has:

- **Tracks** = Audio recordings (may contain multiple items)
- **Items** = Individual questions (1-20 on Antwortbogen)
- **Nummern** = Subdivisions within a track (e.g., "Nummer 1", "Nummer 2")

Current JSON treats each question as if it has its own track, when in reality:

- Teil 1 Track 01 contains "Nummer 1-4" (but our JSON splits this into 4 questions)
- Teil 3 Track 10 contains dialogue for questions 10 AND 11 (but JSON duplicates the audioFile)

**Fix:** Questions must reference `trackId` + optional `nummerIndex`, and player must load tracks independently.

### Why fragile indexing exists

**Problem:** Code uses array indices to navigate questions instead of stable IDs.

**Root Cause:**  
Questions have `id` fields but navigation uses `currentQuestionIndex` from array position. If questions are reordered or filtered, indices break.

**Fix:** Use question IDs throughout, maintain a separate ordering array if needed.

### Why no Übung mode exists

**Problem:** No dedicated practice exercise banks.

**Root Cause:**  
Data was modeled for full tests only. Practice exercises from "Üben Hören Teil 1-4" sections of the Britta Weber book were never extracted.

**Fix:** Create `uebung.json` with Teil-grouped exercise banks sourced from official practice materials.

---

## 5. Missing Features (Gap Analysis)

### Against Official DTZ Structure

| Feature                          | Status     | Notes                            |
| -------------------------------- | ---------- | -------------------------------- |
| Full test (20 items)             | ✅ Exists  | Works but needs refactor         |
| Practice exercises by Teil       | ❌ Missing | Critical for learning            |
| Instruction/Beispiel tracks      | ❌ Missing | Teil intros not played           |
| Transcript display               | ❌ Missing | Transcripts orphaned in markdown |
| Answer sheet (Antwortbogen) view | ❌ Missing | No way to see official layout    |
| Keyboard controls                | ❌ Missing | Player not accessible            |
| Replay controls                  | ⚠️ Partial | Exists but not mode-aware        |

### Against Britta Weber Book Content

The book provides:

1. **Übung Teil 1** - Practice announcements with Beispiel
2. **Übung Teil 2** - Practice radio clips with Beispiel
3. **Übung Teil 3** - Practice dialogues with Beispiel
4. **Übung Teil 4** - Practice opinion matching with Beispiel
5. **Modelltest 1** - Full test (already have this)
6. **Modelltest 2** - Second full test (not extracted)

**Current coverage:** Only Modelltest 1 (partial)  
**Missing:** All Übung sections + Modelltest 2

---

## 6. A11y Issues

| Issue                          | Impact    | Fix                                             |
| ------------------------------ | --------- | ----------------------------------------------- |
| No keyboard navigation         | ⚠️ High   | Add Space (play/pause), ←/→ (seek), Tab (focus) |
| Missing ARIA labels            | ⚠️ High   | Add `aria-label` to player controls             |
| No focus management            | ⚠️ Medium | Move focus to current question on track change  |
| Poor color contrast            | ⚠️ Medium | Audit text/background colors                    |
| No screen reader announcements | ⚠️ High   | Announce track changes, question updates        |
| Transcript not togglable       | ⚠️ Medium | Add show/hide toggle for Übung mode             |

---

## 7. Performance & Tech Debt

### Dead Code

- `HoerenTeilComplete.jsx` - Not imported anywhere, remove
- `content/hoeren/*.md` - Transcripts not consumed, consolidate into JSON
- Duplicate test files - `synchronized-tests.json` vs `synchronized-tests-dtz-official.json`

### Redundant Logic

- `ExercisePlayer.jsx` and `HoerenCompleteTest.jsx` both implement question flow
- Audio seeking logic duplicated in multiple components

### Missing Abstractions

- No `useHoerenEngine` hook to share state logic
- No `scoring.ts` module for answer validation
- No `hoerenContent.ts` loader to abstract data access

---

## 8. Recommendations

### Immediate Actions (Week 1)

1. **Create source of truth docs**
   - Map all 39 tracks to official content
   - Extract Übung exercises from Britta Weber book
   - Document Nummer subdivisions

2. **Refactor data model**
   - Create `tests.json` with official item numbering (1-20)
   - Create `uebung.json` with Teil-grouped exercises
   - Create `transcripts.json` with track-keyed content
   - Create `audio_manifest.json` with track metadata

3. **Build new player**
   - Extract `HoerenPlayer.tsx` with mode prop
   - Add keyboard controls and A11y
   - Support transcript toggle

### Short-term (Week 2-3)

4. **Build Übung engine**
   - `/hoeren/uebung/:teil` routes
   - Immediate feedback mode
   - Replay controls

5. **Refactor Prüfung flow**
   - Use new player in test mode
   - Lock replay/seek during test
   - Proper Teil sequencing

6. **Integrity checks**
   - Script to validate all tracks exist
   - Verify questions 1-20 match Antwortbogen
   - Check transcript coverage

---

## 9. Success Criteria

### Definition of Done

- ✅ Users can practice Übung Teil 1-4 with immediate feedback
- ✅ Users can take Modelltest 1 in authentic Prüfung mode
- ✅ All 20 items match official Antwortbogen layout
- ✅ Transcripts display in Übung mode, hidden in Prüfung
- ✅ Player has full keyboard controls
- ✅ Content validated by integrity script
- ✅ No dead code or duplicate logic

---

## Appendix A: Official Track Structure

### Modelltest 1 (from Britta Weber book)

```
Teil 1: Ansagen (Items 1-4)
├── Beispiel (instruction track) - NOT IN CURRENT DATA
├── Track 01 → Nummer 1 (Item 1)
├── Track 02 → Nummer 2 (Item 2)
├── Track 03 → Nummer 3 (Item 3)
└── Track 04 → Nummer 4 (Item 4)

Teil 2: Radio (Items 5-9)
├── Beispiel (instruction track) - NOT IN CURRENT DATA
├── Track 05 → Item 5
├── Track 06 → Item 6
├── Track 07 → Item 7
├── Track 08 → Item 8
└── Track 09 → Item 9

Teil 3: Gespräche (Items 10-17)
├── Beispiel (instruction track) - NOT IN CURRENT DATA
├── Track 10 → Gespräch 1 (Items 10+11)
├── Track 11 → Gespräch 2 (Items 12+13)
├── Track 12 → Gespräch 3 (Items 14+15)
└── Track 13 → Gespräch 4 (Items 16+17)

Teil 4: Meinungen (Items 18-20)
├── Beispiel (instruction track) - NOT IN CURRENT DATA
└── Track 14 → 3 Meinungen (Items 18-20)
```

### Übung Sections (from book, NOT IN CURRENT DATA)

Each Teil has its own Übung section with:

- Beispiel (worked example)
- Practice items (count varies by Teil)
- Separate tracks for each practice item

**These need to be extracted from the Britta Weber audio folder and integrated.**

---

## Appendix B: Component Dependency Graph

```
HoerenHub
  └─ Navigation cards

Hoeren (selector)
  ├─ Training path
  └─ Test path

ExercisePlayer
  ├─ AudioPlayerNew
  ├─ QuestionCard
  └─ Loads synchronized-tests-dtz-official.json

HoerenCompleteTest (duplicate)
  ├─ AudioPlayerNew
  ├─ QuestionCard
  └─ Loads synchronized-tests.json

AudioPlayerNew
  └─ Uses <audio> element, emits onTimeUpdate
```

**Issues:**

- Two components load different JSON files for same content
- No shared engine between ExercisePlayer and HoerenCompleteTest
- AudioPlayerNew is dumb component but should be smart about modes

---

## Appendix C: Data Schema Issues

### Current Schema (synchronized-tests-dtz-official.json)

```json
{
  "id": "dtz-b1-hoeren-komplett",
  "questions": [
    {
      "id": "teil1_q1",
      "audioFile": "/audio/hoeren/telcDB1_Track01.mp3", // ❌ Weak reference
      "timestamp": 0, // ❌ Relative to what?
      "text": "Question text",
      "options": ["a", "b", "c"],
      "correctAnswer": 2 // ❌ Index not ID
    }
  ]
}
```

### Proposed Schema (tests.json)

```json
{
  "id": "modelltest-1",
  "parts": [
    {
      "teil": 1,
      "title": "Ansagen am Telefon",
      "instructions": "Sie hören vier Ansagen...",
      "instructionTracks": ["mt1_t1_beispiel"], // ✅ Instruction audio
      "items": [
        {
          "no": 1, // ✅ Official item number
          "type": "mc3", // ✅ Semantic type
          "track": "mt1_t1_trk01", // ✅ Stable track ID
          "nummer": 1, // ✅ Nummer within track
          "text": "Question text",
          "options": ["a", "b", "c"],
          "correct": "c", // ✅ Value not index
          "transcriptRef": "mt1.t1.trk01.n1" // ✅ Link to transcript
        }
      ]
    }
  ]
}
```

---

**End of Audit**
