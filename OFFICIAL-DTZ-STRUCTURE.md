# Official DTZ Practice Test Structure

## 🎯 BASE STRUCTURE FOR ENTIRE APP - ALL FEATURES BUILT ON THIS

This is the official DTZ (Deutsch-Test für Zuwanderer) exam structure.
**Every feature in the app follows this exact structure.**

---

## Complete DTZ Exam Format

### **Written Exam** (Schriftliche Prüfung)

#### 1. **Hören** (Listening) - 25 minutes - 20 points

- **Teil 1**: Ansagen am Telefon & öffentliche Durchsagen (4 Multiple-Choice)
- **Teil 2**: Radio-Ansagen (5 Multiple-Choice)
- **Teil 3**: Gespräche (8 questions: 4 Richtig/Falsch + 4 Multiple-Choice)
- **Teil 4**: Meinungen zu einem Thema (3 Zuordnungsaufgaben)

#### 2. **Lesen** (Reading) - 45 minutes - 20 points

- **Teil 1**: Kataloge, Anzeigen (Reading catalogs & advertisements)
- **Teil 2**: Zeitungsartikel (Reading newspaper articles)
- **Teil 3**: Formelle Briefe/Mitteilungen (Reading formal letters/notices)

#### 3. **Schreiben** (Writing) - 30 minutes - 15 points

- **1 Aufgabe**: Formeller oder informeller Brief schreiben (Write formal or informal letter)

### **Oral Exam** (Mündliche Prüfung)

#### 4. **Sprechen** (Speaking) - ~15 minutes - 15 points

- **Teil 1**: Sich vorstellen (Introduce yourself)
- **Teil 2**: Über Erfahrungen sprechen (Talk about experiences)
- **Teil 3**: Etwas aushandeln (Negotiate/discuss something)

---

## App Implementation Structure

### For EACH of the 4 main areas (Hören, Lesen, Schreiben, Sprechen):

#### **Hub Page** (e.g., /tests/hoeren)

Shows overview of all Teile with 2 modes:

1. **Training Mode** - Practice with immediate feedback
2. **Test Mode** - Timed exam simulation

#### **Training Mode** (e.g., /tests/hoeren/training)

- Random questions from all Teile
- Immediate feedback after each answer
- Can replay audio/review
- No time limit
- Score tracking

#### **Test Mode** (e.g., /tests/hoeren/pruefung/:testId)

- Full timed exam (25/45/30/15 minutes)
- No feedback until end
- Can't go back
- Official scoring
- Results summary

---

## Dashboard Cards Structure

### 4 Main Cards (Prüfungsteile):

1. **Hören** → `/tests/hoeren`
   - Teil 1: Ansagen & Durchsagen
   - Teil 2: Radio-Ansagen
   - Teil 3: Gespräche
   - Teil 4: Meinungen

2. **Lesen** → `/tests/lesen`
   - Teil 1: Kataloge & Anzeigen
   - Teil 2: Zeitungsartikel
   - Teil 3: Formelle Briefe

3. **Schreiben** → `/tests/schreiben`
   - 1 Brief: Formell oder informell

4. **Sprechen** → `/tests/sprechen`
   - Teil 1: Sich vorstellen
   - Teil 2: Über Erfahrungen
   - Teil 3: Aushandeln

---

## Navigation Structure

### Dashboard

- **Sidebar**: Always visible (DashboardShell)
- **Cards**: 4 main exam areas

### Other Pages (Test execution, hubs, etc.)

- **Sidebar**: Hover-activated (HoverSidebarShell)
- **Quick access**: Without taking space

---

## Hören Detailed Structure (Reference for other areas)

---

## Official Questions Extracted:

### Teil 1: Ansagen am Telefon, öffentliche Durchsagen (Track 01-04)

1. **Sie wollen zum Rosengarten. Was müssen Sie tun?**
   - a) An der Haltestelle „Friedrichring" umsteigen.
   - b) Mit der Straßenbahn 78 fahren.
   - c) Mit der U-Bahn-Linie 1 oder 2 fahren.

2. **Wer ruft an?**
   - a) Eine Apotheke.
   - b) Eine Arztpraxis.
   - c) Eine Versicherung.

3. **Was sollen die Fahrgäste tun?**
   - a) Im Zug sitzen bleiben.
   - b) Mit einem anderen Zug weiterfahren.
   - c) Mit einem Bus weiterfahren.

4. **Wo wohnt Henrik?**
   - a) An einem Park.
   - b) Bei einer Schule.
   - c) Neben dem Busbahnhof.

### Teil 2: Radio-Ansagen (Track 05-09)

5. **Am Sonntag gibt es**
   - a) ein Musikprogramm.
   - b) ein Programm für Kinder.
   - c) internationale Kurzfilme.

6. **Wie sollen Erwachsene „Medinox" einnehmen?**
   - a) Dreimal am Tag.
   - b) Mit Wasser.
   - c) Nur wenn die Ärztin oder der Arzt zustimmt.

7. **Was läuft in der „Lichtburg"?**
   - a) Ein Kinderfilm.
   - b) Ein Krimi.
   - c) Eine Komödie.

8. **Wo können Sie Musik hören?**
   - a) Auf WDR 2.
   - b) Auf WDR 3.
   - c) Auf WDR 5.

9. **Wann kann man nach Würzburg weiterfahren?**
   - a) Um 09:36 Uhr.
   - b) Um 09:58 Uhr.
   - c) Um 10:00 Uhr.

### Teil 3: Gespräche (Track 10-13) - 2 questions per dialogue

**Gespräch 1:** 10. Die Frau ist Ärztin. (richtig/falsch) 11. Die Frau sagt dem Mann, dass - a) die Tabletten lange wirken. - b) er mindestens drei Tabletten nehmen soll. - c) er sofort zum Arzt gehen soll.

**Gespräch 2:** 12. Maria ist unglücklich in ihrem neuen Job. (richtig/falsch) 13. Maria sagt, dass ihre neue Chefin - a) jung ist. - b) oft arrogant ist. - c) selbst keine Krankenschwester war.

**Gespräch 3:** 14. Günter kommt zum Sommerfest. (richtig/falsch) 15. Günter möchte nicht grillen, sondern - a) den Gruppenraum streichen. - b) einen Kuchen backen. - c) nichts machen.

**Gespräch 4:** 16. Die Frau möchte das Kleid kaufen. (richtig/falsch) 17. Der Mann findet das Kleid - a) gut für die Gartenarbeit. - b) nicht schön. - c) ziemlich teuer.

### Teil 4: Meinungen zu einem Thema (Track 14)

**Topic: Geschäfte sonntags öffnen**

18-20. Zuordnung der Aussagen zu den Sätzen:

- a) Es gibt schon viele Geschäfte, die sonntags offen haben.
- b) Im Ausland sind die Geschäfte sonntags geschlossen.
- c) In der Zukunft werden die Geschäfte länger offen sein.
- d) Man kann sonntags seine Freizeit nicht mehr zusammen verbringen.
- e) Schon jetzt haben die Leute zu viel Hektik.
- f) Sonntags sollten auch Banken offen haben.

---

## Audio Mapping:

- **telcDB1_Track01.mp3** → Rosengarten direction
- **telcDB1_Track02.mp3** → Phone call (apotheke/arztpraxis/versicherung)
- **telcDB1_Track03.mp3** → Train announcement
- **telcDB1_Track04.mp3** → Henrik's address
- **telcDB1_Track05.mp3** → Sunday program
- **telcDB1_Track06.mp3** → Medinox medicine
- **telcDB1_Track07.mp3** → Lichtburg cinema
- **telcDB1_Track08.mp3** → WDR radio stations
- **telcDB1_Track09.mp3** → Würzburg departure time

This is the AUTHENTIC DTZ structure we should implement! 🎯
