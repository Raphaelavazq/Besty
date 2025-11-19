# Einbürgerungstest - Cleanup Summary

## ✅ **What We're Using** (KEEP)

### Active Components

- `src/features/einbuergerungstest/EinbuergerungstestHub.jsx` - Main landing page with Probetest and Training options
- `src/features/einbuergerungstest/Fragenkatalog.jsx` - Official BAMF catalog (460 questions)
- `src/features/einbuergerungstest/ExamSimulator.jsx` - Handles both Probetest (33 questions) and Training (310 questions) modes

### Active Script

- `scripts/import-correct-bamf.js` - **THE ONLY SCRIPT WE USE**
  - Downloads correct data from ebtest.org (Stand: 07.05.2025)
  - Converts to Besty format with proper BAMF numbering
  - Generates `public/data/einbuergerungstest/questions.json`

### Data Files

- `public/data/einbuergerungstest/questions.json` (189KB)
  - 460 questions in exact BAMF order
  - Questions 1-300: General (allgemeine Fragen)
  - Questions 301-460: State-specific (10 per Bundesland × 16 states)
  - **Source**: https://www.ebtest.org/assets/data.json

### Routes in App.jsx

- `/einbuergerungstest` → EinbuergerungstestHub
- `/einbuergerungstest/fragenkatalog` → Fragenkatalog
- `/einbuergerungstest/probetest` → ExamSimulator (mode="probetest")
- `/einbuergerungstest/training` → ExamSimulator (mode="practice")

---

## 🗑️ **What We Deleted** (OLD/UNUSED)

### Removed Scripts

- ❌ `scripts/convert-einbuergerung-questions.js` (5.3KB) - Old conversion from wrong source
- ❌ `scripts/build-correct-bamf-order.js` (1.4KB) - Incomplete manual reordering attempt
- ❌ `scripts/extract-from-pdf.js` (5.4KB) - Manual PDF extraction (only had first 10 questions)

**Why removed**: These scripts were attempts to fix the wrong question order before we found ebtest.org. They're now obsolete.

---

## ⚠️ **External Files to Clean Up** (Optional)

### On Desktop

- `/Users/rafaela/Desktop/question.json` (4.2MB)
  - This was the original source with **wrong question order**
  - We don't use this anymore (we use ebtest.org)
  - **Recommendation**: Move to trash or backup folder

### Temp Files

- `/tmp/ebtest-correct.json`
  - Downloaded by: `curl -s "https://www.ebtest.org/assets/data.json" > /tmp/ebtest-correct.json`
  - Used by: `scripts/import-correct-bamf.js`
  - **Recommendation**: Keep it, it's in /tmp and will auto-delete eventually

---

## 🔄 **How to Regenerate Data**

If you ever need to update the questions (e.g., new BAMF version):

```bash
# Step 1: Download latest from ebtest.org
curl -s "https://www.ebtest.org/assets/data.json" > /tmp/ebtest-correct.json

# Step 2: Convert to Besty format
node scripts/import-correct-bamf.js

# Step 3: Verify
cat public/data/einbuergerungstest/questions.json | jq '.questions[0]'
```

---

## 📊 **Current File Structure**

```
Besty/
├── src/features/einbuergerungstest/
│   ├── EinbuergerungstestHub.jsx      # Landing page
│   ├── Fragenkatalog.jsx              # 460-question catalog
│   └── ExamSimulator.jsx              # Probetest & Training modes
│
├── scripts/
│   └── import-correct-bamf.js         # ✅ ONLY SCRIPT WE USE
│
├── public/data/einbuergerungstest/
│   └── questions.json                 # 460 questions (189KB)
│
└── docs/
    ├── EINBUERGERUNGSTEST_IMPLEMENTATION_PLAN.md
    └── EINBUERGERUNGSTEST_QUICK_START.md
```

---

## 🎯 **Key Features Implemented**

### Fragenkatalog (Question Catalog)

- ✅ All 460 BAMF questions in exact official order
- ✅ Two-screen flow: Select Bundesland → See 310 questions
- ✅ Interactive quiz mode (click answer → reveal correct/wrong)
- ✅ Quick search by question number
- ✅ Clean UI with glass-morphism design

### Probetest (Official Exam Simulation)

- ✅ 33 random questions (30 general + 3 state)
- ✅ 60-minute countdown timer
- ✅ Pass/fail scoring (17/33 required)
- ✅ Results screen with detailed breakdown

### Training Mode

- ✅ All 310 questions for selected Bundesland
- ✅ No time limit
- ✅ Quick navigation bar
- ✅ Previous/Next buttons

---

## 📝 **Data Source Information**

**Official BAMF Catalog**: Stand: 07.05.2025
**Our Source**: https://www.ebtest.org/assets/data.json
**Verification**: Question 1 = "In Deutschland dürfen Menschen offen etwas gegen die Regierung sagen, weil …"

**Question Structure**:

- Total: 460 questions
- General (1-300): For all of Germany
- State-specific (301-460): 10 questions per state × 16 Bundesländer

**Exam Format**:

- 33 questions total (30 general + 3 state)
- 60 minutes
- Pass: 17/33 correct answers (51.5%)

---

## ✨ **Summary**

**Clean**: ✅ Removed 3 obsolete scripts
**Active**: 1 working script (`import-correct-bamf.js`)
**Data**: 1 correct JSON file (189KB, 460 questions)
**Components**: 3 fully functional React components
**Routes**: 4 working routes in App.jsx

**Result**: Streamlined, maintainable codebase with correct BAMF data! 🎉
