# Audio-Question Matching Document

## 🎯 Based on Transcript Analysis

### From "Auf_jeden_Fall_B1" Audio Files

Based on the transcript PDF, here's what each track likely contains:

---

## Track Assignments (Best Guess)

### 📚 Übung 1: In der Schule

**Track 002** - Teacher in classroom

- Content: "Ruhe bitte! So, setzt euch! Ich möchte zuerst die Hausaufgaben sehen. Peter, kannst du mal da hinten das Fenster zumachen? Es zieht."
- **Question**: Was sagt der Lehrer?
- **Options**:
  - a) Die Schüler sollen die Hausaufgaben zeigen ✓
  - b) Die Schüler sollen das Buch öffnen
  - c) Die Schüler sollen nach Hause gehen

### 📚 Übung 2: Im Café

**Track 003** - In a café

- Content: "(Stimmen und das Rascheln einer Zeitung, die gerade gelesen wird) Mann: Entschuldigung..."
- **Question**: Wo findet das Gespräch statt?
- **Options**:
  - a) Im Café ✓
  - b) Im Restaurant
  - c) Zu Hause

### 📚 Übung 3: Family Discussion (Kugler Family)

**Track 004** - Frau und Herr Kugler preparing for guests

- Content: "Das kannst du auch noch, wenn die Leute da sind. Deck jetzt endlich den Tisch! Nicht doch das alte Geschirr... Wenn Leute kommen, nimmt man doch das schöne Rosenthalgeschirr."
- **Question**: Was macht Familie Kugler?
- **Options**:
  - a) Sie bereiten sich auf Gäste vor ✓
  - b) Sie räumen die Küche auf
  - c) Sie gehen einkaufen

### 📚 Topic: Handy und Medien

**Track 005** - Discussion about children and smartphones

- Content: "...meine Kinder sind schon 14 und 16 Jahre alt, da spielen das Handy und Soziale Medien eine viel zentralere Rolle..."
- **Question**: Worüber spricht die Person?
- **Options**:
  - a) Über Kinder und Handynutzung ✓
  - b) Über neue Technologie
  - c) Über Fernsehprogramme

### 📚 Radio Program Announcement

**Track 006** - Radio station announcing programs

- Content: "...Für Freunde der Literatur wird es dann um 19 Uhr interessant, wenn Renata Hema aus ihrem neusten Roman vorliest. 'Gefangen wie ein Vogel' ist ein Krimi..."
- **Question**: Was läuft um 19 Uhr im Radio?
- **Options**:
  - a) Eine Autorin liest aus ihrem Roman ✓
  - b) Ein Krimihörspiel
  - c) Ein Musikprogramm

### 📚 Cooking Instructions (Tomatoes)

**Track 007** - Cooking instruction for tomatoes

- Content: "Jetzt machen Sie oben in die Tomate einen Kreuzschnitt... dann lösen Sie vorsichtig mit der Rückseite des Messers das Fleisch der Tomate von der Haut..."
- **Question**: Was wird erklärt?
- **Options**:
  - a) Wie man Tomaten schält ✓
  - b) Wie man Tomaten pflanzt
  - c) Wie man Tomaten kauft

### 📚 Exercise/Gym Instructions

**Track 008-010** - Fitness exercises

- Content: "Und jetzt kreisen Sie mit den Armen... und mit den Schultern. Fangen Sie mit kleinen Kreisen an... und machen Sie dann immer größere Kreise..."
- **Question**: Was soll man machen?
- **Options**:
  - a) Armübungen ✓
  - b) Laufübungen
  - c) Atemübungen

---

## ✅ UPDATED tests.json Structure

Here's what I recommend updating in your tests.json:

```json
{
  "id": "test-h001",
  "section": "hoeren",
  "title": "Hören Teil 1: Alltägliche Situationen",
  "subtitle": "Kurze Dialoge und Ansagen verstehen",
  "level": "B1",
  "duration": "8 min",
  "totalQuestions": 4,
  "questionType": "multiple-choice",
  "instructions": "Sie hören vier kurze Texte. Zu jedem Text gibt es eine Aufgabe. Wählen Sie die richtige Antwort.",
  "audioRequired": true,
  "questions": [
    {
      "id": "h001-q1",
      "questionText": "Was möchte der Lehrer?",
      "audioFile": "/audio/hoeren/Auf_jeden_Fall_B1_1_Track_002.mp3",
      "options": [
        "Die Schüler sollen die Hausaufgaben zeigen",
        "Die Schüler sollen ein Buch lesen",
        "Die Schüler sollen nach draußen gehen"
      ],
      "correctAnswer": 0,
      "explanation": "Der Lehrer sagt: 'Ich möchte zuerst die Hausaufgaben sehen.'"
    },
    {
      "id": "h001-q2",
      "questionText": "Wo sind die Personen?",
      "audioFile": "/audio/hoeren/Auf_jeden_Fall_B1_1_Track_003.mp3",
      "options": ["Im Café", "Im Supermarkt", "Im Büro"],
      "correctAnswer": 0,
      "explanation": "Man hört Stimmen und das Rascheln einer Zeitung in einem Café."
    },
    {
      "id": "h001-q3",
      "questionText": "Was macht Familie Kugler?",
      "audioFile": "/audio/hoeren/Auf_jeden_Fall_B1_1_Track_004.mp3",
      "options": [
        "Sie bereiten sich auf Gäste vor",
        "Sie kochen zusammen Abendessen",
        "Sie räumen die Wohnung auf"
      ],
      "correctAnswer": 0,
      "explanation": "Frau Kugler sagt: 'Wenn Leute kommen, nimmt man doch das schöne Geschirr.'"
    },
    {
      "id": "h001-q4",
      "questionText": "Worüber spricht die Person?",
      "audioFile": "/audio/hoeren/Auf_jeden_Fall_B1_1_Track_005.mp3",
      "options": [
        "Über Kinder und Handynutzung",
        "Über Schulprobleme",
        "Über Familienurlaub"
      ],
      "correctAnswer": 0,
      "explanation": "Die Person sagt: 'da spielen das Handy und Soziale Medien eine wichtige Rolle.'"
    }
  ]
}
```

---

## 🎯 Recommendation

I'll now update your `tests.json` with these properly matched questions!
