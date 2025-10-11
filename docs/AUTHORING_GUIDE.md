# DTZ Question Authoring Guide

This guide explains how to create and manage DTZ listening test questions using our YAML front-matter system.

## 🎯 Overview

The DTZ system uses a structured approach to question authoring:

- **YAML Front Matter** for metadata and configuration
- **Markdown Content** for question text and explanations
- **Automated Compilation** to JSON test files
- **Audio Synchronization** with timestamp markers

## 📁 File Structure

```
content/hoeren/
├── telcDB1_Track01.md    # Teil 1 questions
├── telcDB1_Track02.md    # Teil 1 questions
├── telcDB1_Track03.md    # Teil 2 questions
├── telcDB1_Track04.md    # Teil 2 questions
├── telcDB1_Track05.md    # Teil 3 questions
└── ...                   # More audio files
```

## 📝 Question File Format

Each `.md` file in `content/hoeren/` follows this structure:

```yaml
---
audioFile: "telcDB1_Track01.mp3"
title: "Teil 1: Ansagen verstehen - Track 1"
description: "Kurze Ansagen und Durchsagen verstehen"
part: "teil1"
level: "B1"
duration: 180
tags: ["ansagen", "durchsagen", "öffentlich"]
questions:
  - id: "q1"
    timestamp: 15
    duration: 30
    type: "multiple-choice"
    prompt: "Was wird in der Ansage mitgeteilt?"
    options:
      - "Die Bibliothek ist heute geschlossen"
      - "Die Bibliothek hat verlängerte Öffnungszeiten"
      - "Die Bibliothek zieht um"
    correctAnswer: 1
    rationale: "Die Ansage informiert über verlängerte Öffnungszeiten während der Prüfungszeit."

  - id: "q2"
    timestamp: 50
    duration: 25
    type: "multiple-choice"
    prompt: "Bis wann ist die Bibliothek geöffnet?"
    options:
      - "18:00 Uhr"
      - "20:00 Uhr"
      - "22:00 Uhr"
    correctAnswer: 2
    rationale: "Die Ansage erwähnt, dass die Bibliothek bis 22:00 Uhr geöffnet bleibt."
---

# Audio-Transkript (Optional)

Hier können Sie das vollständige Transkript des Audios einfügen für Referenzzwecke.

## Zusätzliche Hinweise

- Achten Sie auf die Schlüsselwörter in der Ansage
- Die Zeiten werden meist zu Beginn genannt
- Hören Sie auf Signalwörter wie "ab sofort", "während", "bis"
```

## 🔧 YAML Front Matter Fields

### Required Fields

| Field       | Type   | Description          | Example                                    |
| ----------- | ------ | -------------------- | ------------------------------------------ |
| `audioFile` | string | Audio filename       | `"telcDB1_Track01.mp3"`                    |
| `title`     | string | Display title        | `"Teil 1: Ansagen verstehen"`              |
| `part`      | string | DTZ part identifier  | `"teil1"`, `"teil2"`, `"teil3"`, `"teil4"` |
| `level`     | string | Difficulty level     | `"B1"`, `"A2"`, `"B2"`                     |
| `questions` | array  | Question definitions | See question format below                  |

### Optional Fields

| Field          | Type   | Description               | Default       |
| -------------- | ------ | ------------------------- | ------------- |
| `description`  | string | Detailed description      | `""`          |
| `duration`     | number | Audio duration in seconds | Auto-detected |
| `tags`         | array  | Content tags              | `[]`          |
| `instructions` | string | Special instructions      | `""`          |

## 📋 Question Format

Each question in the `questions` array must include:

```yaml
- id: "q1" # Unique identifier
  timestamp: 15 # When question appears (seconds)
  duration: 30 # Time to answer (seconds)
  type: "multiple-choice" # Question type
  prompt: "Question text?" # The actual question
  options: # Answer choices (array)
    - "Option A"
    - "Option B"
    - "Option C"
  correctAnswer: 1 # Correct option index (0-based)
  rationale: "Explanation" # Why this answer is correct
```

### Question Types

Currently supported question types:

1. **multiple-choice** - Standard DTZ format with 3 options
2. **true-false** - Binary choice questions
3. **fill-in-blank** - Text input questions (future)

### Timing Guidelines

| Part   | Questions | Time per Question | Total Time  |
| ------ | --------- | ----------------- | ----------- |
| Teil 1 | 3         | 30-45 seconds     | 2-3 minutes |
| Teil 2 | 3         | 45-60 seconds     | 3-4 minutes |
| Teil 3 | 6         | 30-40 seconds     | 4-5 minutes |
| Teil 4 | 6         | 45-60 seconds     | 6-8 minutes |

## 🏗️ Build Process

### Compilation Script

Run the build script to compile YAML files to JSON:

```bash
node scripts/build-hoeren-json.js
```

This generates:

- `public/data/dtz-local-fulltest.json` - Complete test
- `public/data/dtz-local-teil1.json` - Teil 1 only
- `public/data/dtz-local-teil2.json` - Teil 2 only
- `public/data/dtz-local-teil3.json` - Teil 3 only
- `public/data/dtz-local-teil4.json` - Teil 4 only
- `public/data/dtz-local-drills.json` - Random selection

### Audio Scanning

Run the audio scanner to catalog available files:

```bash
node scripts/scan-audio.js
```

This generates `audio-catalog.json` with:

- File paths and sizes
- Duration metadata
- Audio format information
- Tag associations

## ✅ Validation Rules

### Content Validation

1. **Audio File Exists** - Referenced audio must exist in `/public/audio/hoeren/`
2. **Question Count** - Must match DTZ standards per part
3. **Timing Validation** - Questions shouldn't overlap
4. **Answer Validation** - Correct answer index must be valid
5. **Required Fields** - All required YAML fields must be present

### Quality Guidelines

1. **Clear Questions** - Questions should be unambiguous
2. **Realistic Options** - Distractors should be plausible
3. **Appropriate Level** - Content should match B1 level
4. **Audio Sync** - Timestamps should align with audio content
5. **Complete Rationales** - Every answer should have explanation

## 🎯 DTZ Standards Compliance

### Part-Specific Requirements

**Teil 1: Ansagen verstehen**

- Public announcements, messages
- 3 questions per audio
- Focus on key information (time, place, action)

**Teil 2: Radio-Ansagen**

- News broadcasts, radio announcements
- 3 questions per audio
- Details, numbers, facts

**Teil 3: Alltagsgespräche**

- Everyday conversations
- 6 questions per audio
- Speaker intentions, decisions, opinions

**Teil 4: Radiobeiträge**

- Longer reports, features
- 6 questions per audio
- Main ideas, supporting details

### Scoring Standards

- **B1 Level**: ≥65% correct (≥12/18 questions)
- **A2+ Level**: ≥50% correct (≥9/18 questions)
- **A2 Level**: ≥35% correct (≥6/18 questions)
- **unter A2**: <35% correct (<6/18 questions)

## 🚀 Getting Started

1. **Choose Audio File** - Select from available audio catalog
2. **Create Question File** - Copy template and rename appropriately
3. **Listen & Analyze** - Identify key information and timestamps
4. **Write Questions** - Follow DTZ format and difficulty level
5. **Add Metadata** - Complete YAML front matter
6. **Test & Validate** - Run compilation and test questions
7. **Review & Refine** - Check timing and difficulty

## 📚 Best Practices

### Question Writing

- Use clear, concise language
- Avoid trick questions or ambiguity
- Ensure one clearly correct answer
- Make distractors plausible but incorrect
- Test different skill areas (detail, main idea, inference)

### Audio Timing

- Listen multiple times to identify exact timestamps
- Add buffer time before question appears
- Account for processing time
- Test with real users when possible

### Content Organization

- Group related questions logically
- Maintain consistent difficulty within parts
- Include variety in question types and topics
- Provide helpful rationales for learning

### Version Control

- Use descriptive commit messages
- Track changes to question content
- Maintain backup of working versions
- Document major revisions

## 🔍 Troubleshooting

### Common Issues

**Build Errors**

- Check YAML syntax with online validator
- Ensure all required fields are present
- Verify audio file references are correct

**Timing Issues**

- Questions appearing too early/late
- Overlapping question periods
- Audio not syncing properly

**Content Problems**

- Multiple correct answers
- Unclear question text
- Inappropriate difficulty level

### Debug Commands

```bash
# Validate YAML syntax
npx js-yaml content/hoeren/telcDB1_Track01.md

# Check audio catalog
node scripts/scan-audio.js --verbose

# Test compilation
node scripts/build-hoeren-json.js --debug

# Validate question timing
npm run validate-timing
```

## 📞 Support

For questions about question authoring:

1. Check this documentation first
2. Review existing question files for examples
3. Test your questions with the build system
4. Validate against DTZ standards

Happy authoring! 🎓
