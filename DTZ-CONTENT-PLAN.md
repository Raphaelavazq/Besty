# DTZ B1 Hören Content Implementation Plan

## 🎯 Official DTZ Structure (25 minutes total)

Based on telc official DTZ practice materials and existing content in `content/hoeren/`.

### Teil 1: Ansagen am Telefon, öffentliche Durchsagen (4 questions)

- **Duration**: ~5 minutes
- **Format**: 4 separate audio tracks, 1 multiple-choice question each
- **Topics**: Phone messages, public announcements, transport info
- **Files**: `telcdb1_track01.md` to `telcdb1_track04.md`

### Teil 2: Radio-Ansagen (5 questions)

- **Duration**: ~6 minutes
- **Format**: 5 separate audio tracks, 1 multiple-choice question each
- **Topics**: Radio announcements, medicine info, cinema programs, train schedules
- **Files**: `telcdb1_track05.md` to `telcdb1_track09.md`

### Teil 3: Gespräche (8 questions)

- **Duration**: ~8 minutes
- **Format**: 4 dialogues, 2 questions each (1 richtig/falsch + 1 multiple-choice)
- **Topics**: Conversations between people in everyday situations
- **Files**: `telcdb1_track10.md` to `telcdb1_track13.md`

### Teil 4: Meinungen zu einem Thema (3 questions)

- **Duration**: ~6 minutes
- **Format**: 1 longer audio with 3 speakers, 3 matching questions
- **Topics**: People expressing opinions on a social topic
- **Files**: `telcdb1_track14.md`

## 📁 Required Folder Structure

```
content/hoeren/
├── teil1/
│   ├── telcdb1_track01.md ✅ (exists)
│   ├── telcdb1_track02.md ✅ (exists)
│   ├── telcdb1_track03.md ✅ (exists)
│   └── telcdb1_track04.md ✅ (exists)
├── teil2/
│   ├── telcdb1_track05.md ✅ (exists)
│   ├── telcdb1_track06.md (need to create)
│   ├── telcdb1_track07.md (need to create)
│   ├── telcdb1_track08.md (need to create)
│   └── telcdb1_track09.md (need to create)
├── teil3/
│   ├── telcdb1_track10.md (need to create)
│   ├── telcdb1_track11.md (need to create)
│   ├── telcdb1_track12.md (need to create)
│   └── telcdb1_track13.md (need to create)
└── teil4/
    └── telcdb1_track14.md (need to create)

public/audio/hoeren/
├── teil1/
│   ├── telcDB1_Track01.mp3 (need audio)
│   ├── telcDB1_Track02.mp3 (need audio)
│   ├── telcDB1_Track03.mp3 (need audio)
│   └── telcDB1_Track04.mp3 (need audio)
├── teil2/
│   ├── telcDB1_Track05.mp3 (need audio)
│   ├── telcDB1_Track06.mp3 (need audio)
│   ├── telcDB1_Track07.mp3 (need audio)
│   ├── telcDB1_Track08.mp3 (need audio)
│   └── telcDB1_Track09.mp3 (need audio)
├── teil3/
│   ├── telcDB1_Track10.mp3 (need audio)
│   ├── telcDB1_Track11.mp3 (need audio)
│   ├── telcDB1_Track12.mp3 (need audio)
│   └── telcDB1_Track13.mp3 (need audio)
└── teil4/
    └── telcDB1_Track14.mp3 (need audio)
```

## 📝 Content File Format (Markdown + YAML frontmatter)

### Standard format for all tracks:

```yaml
---
id: telcdb1_track01
src: /audio/hoeren/teil1/telcDB1_Track01.mp3
part: teil1
duration: 18.5
transcript: "Full German transcript of the audio"
topic: "Brief description of the topic"
items:
  - q: 1
    type: mcq # mcq|trueFalse|matching
    prompt: "Question text in German"
    options:
      - "Option A"
      - "Option B"
      - "Option C"
    answer: 2 # 0-based index for correct answer
    rationale: "Explanation why this answer is correct"
    start: 0.0
    end: 18.5
---
```

### Teil 3 Special Format (2 questions per track):

```yaml
items:
  - q: 1
    type: trueFalse
    prompt: "Die Frau ist Ärztin."
    answer: true
    rationale: "Explanation"
    start: 0.0
    end: 45.0
  - q: 2
    type: mcq
    prompt: "Die Frau sagt dem Mann, dass"
    options:
      - "die Tabletten lange wirken"
      - "er mindestens drei Tabletten nehmen soll"
      - "er sofort zum Arzt gehen soll"
    answer: 0
    rationale: "Explanation"
    start: 0.0
    end: 45.0
```

### Teil 4 Special Format (Matching questions):

```yaml
items:
  - q: 1
    type: matching
    prompt: "Person 1 sagt:"
    options:
      - "Es gibt schon viele Geschäfte, die sonntags offen haben"
      - "Im Ausland sind die Geschäfte sonntags geschlossen"
      - "Man kann sonntags seine Freizeit nicht mehr zusammen verbringen"
      - "Schon jetzt haben die Leute zu viel Hektik"
      - "Sonntags sollten auch Banken offen haben"
    answer: 2
    rationale: "Person 1 spricht über Familien und Freizeit"
    start: 15.0
    end: 45.0
  # ... 2 more matching questions for persons 2 and 3
```

## 🔧 Technical Requirements

### Updated build scripts needed:

- `scripts/scan-audio.js` - scan Teil 1-4 subdirectories
- `scripts/build-hoeren-json.js` - generate proper DTZ structure
- `scripts/validate-questions.js` - validate all 4 question types

### Component updates needed:

- `src/features/hoeren/HoerenApp.jsx` - handle Teil navigation
- `src/features/hoeren/components/QuestionBank.jsx` - support all question types
- `src/features/hoeren/modes/KomplettTest.jsx` - implement 25-minute DTZ flow
- New: `src/features/hoeren/components/TeilNavigation.jsx`

### Data structure for `public/data/dtz-hoeren.json`:

```json
{
  "testInfo": {
    "name": "DTZ B1 Hören",
    "totalDuration": 1500,
    "parts": 4
  },
  "teil1": {
    "name": "Ansagen am Telefon, öffentliche Durchsagen",
    "duration": 300,
    "tracks": ["telcdb1_track01", "telcdb1_track02", "telcdb1_track03", "telcdb1_track04"]
  },
  "teil2": {
    "name": "Radio-Ansagen",
    "duration": 360,
    "tracks": ["telcdb1_track05", "telcdb1_track06", "telcdb1_track07", "telcdb1_track08", "telcdb1_track09"]
  },
  "teil3": {
    "name": "Gespräche",
    "duration": 480,
    "tracks": ["telcdb1_track10", "telcdb1_track11", "telcdb1_track12", "telcdb1_track13"]
  },
  "teil4": {
    "name": "Meinungen zu einem Thema",
    "duration": 360,
    "tracks": ["telcdb1_track14"]
  },
  "questions": {
    "telcdb1_track01": { ... },
    "telcdb1_track02": { ... }
    // ... all questions
  }
}
```

## 🎵 Audio Requirements

### Needed audio files (14 total):

1. **Teil 1**: 4 short announcements (15-25 seconds each)
2. **Teil 2**: 5 radio announcements (25-40 seconds each)
3. **Teil 3**: 4 conversations (30-60 seconds each)
4. **Teil 4**: 1 longer discussion (3-4 minutes with 3 speakers)

### Sources for official audio:

1. Download from telc "Auf jeden Fall! B1.2 Track 127 Übungstest Deutsch-Test für Zuwanderer"
2. Use content from "gast DTZ Übungssatz 1" PDF + audio if available
3. Create sample audio using existing transcripts as reference

## 🚀 Implementation Priority

1. **Phase 1**: Create missing content files (tracks 06-14)
2. **Phase 2**: Update build scripts for new structure
3. **Phase 3**: Download/create audio files
4. **Phase 4**: Update React components
5. **Phase 5**: Test complete DTZ workflow

This plan provides the authentic DTZ B1 structure needed for proper exam preparation! 🎯
