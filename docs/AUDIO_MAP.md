# 🎧 Audio File Mapping - DTZ B1 Bestie

**Generated:** October 10, 2025  
**Total Files:** 21 MP3 files (65.9 MB)  
**Purpose:** Map existing audio files to DTZ test questions

---

## 📊 **Audio File Inventory**

### DTZ Official Tracks (9 files) - `telcDB1_*`

**Source:** Telc Deutsch B1 Practice Materials  
**Usage:** Already integrated in current DTZ tests

| File                  | Current Use      | Suggested Questions                     | Part   |
| --------------------- | ---------------- | --------------------------------------- | ------ |
| `telcDB1_Track01.mp3` | test-dtz-h001 Q1 | Verkehrsansage (U-Bahn zum Rosengarten) | Teil 1 |
| `telcDB1_Track02.mp3` | test-dtz-h001 Q2 | Arztpraxis Anruf                        | Teil 1 |
| `telcDB1_Track03.mp3` | test-dtz-h001 Q3 | Bahnansage (Ersatzbus)                  | Teil 1 |
| `telcDB1_Track04.mp3` | test-dtz-h001 Q4 | Radio-Wetter Ansage                     | Teil 1 |
| `telcDB1_Track05.mp3` | test-dtz-h002 Q1 | Stadtinformation                        | Teil 2 |
| `telcDB1_Track06.mp3` | test-dtz-h002 Q2 | Konzert/Veranstaltung                   | Teil 2 |
| `telcDB1_Track07.mp3` | test-dtz-h002 Q3 | WDR Radio Information                   | Teil 2 |
| `telcDB1_Track08.mp3` | test-dtz-h002 Q4 | (Need to verify content)                | Teil 2 |
| `telcDB1_Track09.mp3` | test-dtz-h002 Q5 | Bahnverbindung Würzburg                 | Teil 2 |

### B1 Practice Tracks (11 files) - `Auf_jeden_Fall_B1_*`

**Source:** "Auf jeden Fall B1" Textbook Audio  
**Usage:** Not yet integrated, ready for questions

| File                                    | Suggested Content  | Part   | Priority |
| --------------------------------------- | ------------------ | ------ | -------- |
| `Auf_jeden_Fall_B1_1_Track_001_neu.mp3` | Dialog/Gespräch    | Teil 3 | High     |
| `Auf_jeden_Fall_B1_1_Track_002.mp3`     | Dialog/Gespräch    | Teil 3 | High     |
| `Auf_jeden_Fall_B1_1_Track_003.mp3`     | Dialog/Gespräch    | Teil 3 | Medium   |
| `Auf_jeden_Fall_B1_1_Track_004.mp3`     | Ankündigung/Ansage | Teil 1 | Medium   |
| `Auf_jeden_Fall_B1_1_Track_005.mp3`     | Radio/Nachricht    | Teil 4 | High     |
| `Auf_jeden_Fall_B1_1_Track_006.mp3`     | Dialog/Gespräch    | Teil 3 | Medium   |
| `Auf_jeden_Fall_B1_1_Track_007.mp3`     | Radio/Bericht      | Teil 4 | High     |
| `Auf_jeden_Fall_B1_1_Track_008.mp3`     | Ansage/Information | Teil 2 | Medium   |
| `Auf_jeden_Fall_B1_1_Track_009.mp3`     | Dialog/Gespräch    | Teil 3 | Low      |
| `Auf_jeden_Fall_B1_1_Track_010.mp3`     | Radio/Bericht      | Teil 4 | Medium   |
| `Auf_jeden_Fall_B1_1_Track_011.mp3`     | Information/Ansage | Teil 2 | Low      |

### Test Audio (1 file)

| File            | Purpose                 | Status  |
| --------------- | ----------------------- | ------- |
| `sync-test.mp3` | Synchronization testing | Working |

---

## 🎯 **DTZ Test Structure Mapping**

### Full Test Structure (25 minutes)

```
Teil 1: Ansagen (4 questions, ~6 min)
├── telcDB1_Track01-04.mp3 (existing)
└── Auf_jeden_Fall_*_Track_004.mp3 (new)

Teil 2: Radio-Ansagen (5 questions, ~7 min)
├── telcDB1_Track05-09.mp3 (existing)
└── Auf_jeden_Fall_*_Track_008,011.mp3 (new)

Teil 3: Alltagsgespräche (5 questions, ~6 min)
├── Auf_jeden_Fall_*_Track_001,002,003.mp3 (new)
└── Auf_jeden_Fall_*_Track_006,009.mp3 (new)

Teil 4: Radiobeitrag (6 questions, ~6 min)
├── Auf_jeden_Fall_*_Track_005,007.mp3 (new)
└── Auf_jeden_Fall_*_Track_010.mp3 (new)
```

---

## ✍️ **Question Authoring Priority**

### Phase 1: High Priority (Complete Full Test)

1. **telcDB1_Track01-09** - Already have questions, convert to synchronized format
2. **Auf_jeden_Fall_Track_001,002** - Teil 3 dialogs (need transcription/questions)
3. **Auf_jeden_Fall_Track_005,007** - Teil 4 radio content

### Phase 2: Medium Priority (Teil Practice)

4. **Auf_jeden_Fall_Track_003,004,006** - Fill out remaining Teil 1 & 3
5. **Auf_jeden_Fall_Track_008** - Additional Teil 2 content

### Phase 3: Low Priority (Quick Drills)

6. **Auf_jeden_Fall_Track_009,010,011** - Extra practice content

---

## 📝 **Content Authoring Guidelines**

### Teil 1: Ansagen am Telefon/öffentliche Durchsagen

**Format:** Short announcements (15-30 seconds)  
**Topics:** Transport, appointments, business hours, services  
**Questions:** What/Where/When/Why (factual information)

### Teil 2: Radio-Ansagen

**Format:** Radio announcements/ads (20-40 seconds)  
**Topics:** Events, weather, traffic, services  
**Questions:** Details, times, locations, conditions

### Teil 3: Alltagsgespräche

**Format:** Conversations between 2 people (30-60 seconds)  
**Topics:** Daily situations, planning, problems, solutions  
**Questions:** Who, what happened, decisions, feelings

### Teil 4: Radiobeitrag

**Format:** News/magazine segments (60-90 seconds)  
**Topics:** Social issues, culture, lifestyle, information  
**Questions:** Main ideas, details, opinions, conclusions

---

## 🔧 **Technical Implementation Notes**

### Audio File Requirements

- **Format:** MP3, good quality
- **Length:** Varies by Teil (see above)
- **Preprocessing:** None needed (files are ready)

### Question Format (YAML front-matter)

```yaml
---
id: telcdb1_track01
src: /audio/hoeren/telcDB1_Track01.mp3
part: teil1
transcript: "Liebe Fahrgäste, die U-Bahn-Linie 1 und 2..."
items:
  - q: 1
    type: mcq
    prompt: "Sie wollen zum Rosengarten. Was müssen Sie tun?"
    options:
      [
        "An der Haltestelle umsteigen",
        "Mit der Straßenbahn fahren",
        "Mit der U-Bahn fahren",
      ]
    answer: 2
    rationale: "Die Ansage sagt, dass U-Bahn-Linie 1 oder 2 zum Rosengarten fährt"
    start: 0.0
    end: 18.5
---
```

### Synchronized Test Format

All tests should use the `HoerenTeilComplete.jsx` format with:

- `timestamp` and `duration` for each question
- Unified `audioUrl` for the entire test section
- Automatic question progression based on audio time

---

## 📅 **Next Steps**

1. **Listen to each Auf_jeden_Fall track** and determine actual content
2. **Create YAML files** in `/content/hoeren/` for each audio
3. **Write realistic questions** matching DTZ style and difficulty
4. **Generate JSON files** using the build script
5. **Test audio synchronization** with new content

---

_This mapping will be updated as we author questions for each audio file._
