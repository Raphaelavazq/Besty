# 📸 Bild Beschreiben - Quick Reference Guide

## 15 Themes Overview

| #      | Theme (DE)                   | Theme (EN)              | Image File | Description Topics                               |
| ------ | ---------------------------- | ----------------------- | ---------- | ------------------------------------------------ |
| **1**  | **Lernen und Bildung**       | Learning & Education    | `1.png`    | Homework, studying, online learning, school      |
| **2**  | **Familie und Kinder**       | Family & Children       | `2.jpg`    | Family time at home, baby, parents, living room  |
| **3**  | **Familie und Kinder**       | Family & Children       | `3.png`    | Family outdoors, children, parents, nature       |
| **4**  | **Einkaufen**                | Shopping                | `4.jpg`    | Supermarket, grocery shopping, product selection |
| **5**  | **Gesundheit**               | Health                  | `5.jpg`    | Doctor's office, medical care, computer work     |
| **6**  | **Wohnen**                   | Living/Housing          | `6.jpg`    | Modern living room, furniture, home decoration   |
| **7**  | **Arbeit und Beruf**         | Work & Career           | `7.jpg`    | Office work, computer, workplace, colleagues     |
| **8**  | **Essen und Trinken**        | Food & Drink            | `8.png`    | Dining together, meals, food, social eating      |
| **9**  | **Reisen und Verkehr**       | Travel & Transportation | `9.jpeg`   | Train station, traveling, public transport       |
| **10** | **Medien und Kommunikation** | Media & Communication   | `10.jpg`   | Smartphone use, café, digital media              |
| **11** | **Sport und Fitness**        | Sport & Fitness         | `11.jpg`   | Jogging, outdoor exercise, couple running        |
| **12** | **Natur und Umwelt**         | Nature & Environment    | `12.jpg`   | Mountains, hiking, nature, outdoors              |
| **13** | **Feste und Feiern**         | Celebrations            | `13.jpg`   | Party, celebration, dancing, social gathering    |
| **14** | **Freizeit**                 | Leisure Time            | `14.jpeg`  | Relaxation, free time, outdoor activities        |
| **15** | **Freundschaft**             | Friendship              | `15.jpeg`  | Friends together, social time, conversation      |

---

## Content Per Exercise

### Each exercise includes:

1. ✅ **Image** (jpg/png/jpeg format)
2. ✅ **German Description** (250-300 words)
   - Auf dem Foto sehe ich...
   - Das Foto zeigt...
   - Im Vordergrund/Hintergrund...
   - Assumptions (wahrscheinlich, vielleicht, möglicherweise)
   - Personal opinion (Meiner Meinung nach...)
   - Personal experience (Früher habe ich...)
3. ✅ **3 Main Questions**
   - Was sehen Sie auf dem Foto?
   - Was für eine Situation zeigt dieses Bild?
   - Welche Erfahrungen haben Sie damit?
4. ✅ **5 Additional Questions with Answers**
5. ✅ **TTS Audio** (OpenAI nova voice)
6. ✅ **Duration** (1:19 - 1:29 minutes)

---

## Key German Phrases Used

### Description Starters:

- Auf dem Foto sehe ich...
- Das Foto zeigt...
- Im Vordergrund kann man... sehen
- Im Hintergrund sehe ich...
- Die Person/Die Menschen trägt/tragen...

### Assumptions/Speculation:

- Ich vermute, dass...
- Wahrscheinlich...
- Vielleicht...
- Ich bin mir sicher, dass...
- Bestimmt...


### Opinions:

- Meiner Meinung nach...

- Ich bin der Meinung, dass...
- Ich finde es wichtig, dass...

### Personal Experience:


- Früher habe ich...
- Heute versuche ich...
- Normalerweise...
- Ich gehe oft/manchmal...

---

## Testing Quick Check

✅ **Test Exercise 1** (Lernen und Bildung):

```
http://localhost:3003/tests/sprechen/bild-beschreiben/1
```

✅ **Test Exercise 5** (Gesundheit):

```
http://localhost:3003/tests/sprechen/bild-beschreiben/5
```

✅ **Test Exercise 11** (Sport und Fitness):

```
http://localhost:3003/tests/sprechen/bild-beschreiben/11
```

---

## Question Types by Theme

| Theme                 | PDF Questions? | Custom Questions? |
| --------------------- | -------------- | ----------------- |
| 1. Lernen und Bildung | ❌             | ✅ Yes            |
| 2. Familie und Kinder | ✅ From PDF    | ❌                |
| 3. Familie und Kinder | ✅ From PDF    | ❌                |
| 4. Einkaufen          | ❌             | ✅ Yes            |
| 5. Gesundheit         | ✅ From PDF    | ❌                |
| 6. Wohnen             | ✅ From PDF    | ❌                |
| 7. Arbeit und Beruf   | ✅ From PDF    | ❌                |
| 8-15. Others          | ❌             | ✅ Yes            |

---

## How to Navigate

1. **Start:** `/tests/sprechen` → Click "Teil 2: Bild beschreiben"
2. **Catalog:** `/tests/sprechen/bild-beschreiben` → Shows all 15 exercises
3. **Exercise:** Click any card → Opens `/tests/sprechen/bild-beschreiben/:id`
4. **Study:** View image, listen to audio, read description
5. **Practice:** Answer the 3 additional questions
6. **Return:** Click back arrow to catalog

---

## B1 Level Verification

✅ **Grammar:** Present tense, simple past, modal verbs ,konjunktiv II, 

✅ **Vocabulary:** Everyday topics, common verbs, descriptive adjectives  
✅ **Structure:** Clear introduction, description, assumptions, opinions, experience  
✅ **Length:** 250-300 words (1:20-1:30 minutes speaking)  
✅ **Complexity:** Appropriate for B1 (not too simple, not too advanced)

---

## Future Enhancements

### 📌 Can Add Later:

- [ ] More images per theme (e.g., 2-1.jpg, 2-2.jpg, 2-3.jpg)
- [ ] Theme gallery page (show all images for a theme)
- [ ] Progress tracking (localStorage or backend)
- [ ] Recording functionality (optional)
- [ ] AI feedback on student recordings
- [ ] Vocabulary highlighting
- [ ] Grammar explanations

---

## Quick Stats

| Item                    | Count               |
| ----------------------- | ------------------- |
| **Themes**              | 15                  |
| **Images**              | 15                  |
| **German Words**        | ~4,000+             |
| **Questions**           | 75 (5 per exercise) |
| **Average Description** | 250-300 words       |
| **Average Duration**    | 1:25 minutes        |

---

**Status:** ✅ **Production Ready**  
**Last Updated:** 17 October 2025  
**Version:** 1.0
