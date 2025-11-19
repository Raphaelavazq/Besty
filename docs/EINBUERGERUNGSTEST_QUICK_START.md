# 🇩🇪 Einbürgerungstest - Quick Start Guide

## What We're Building

A modern trainer for the German citizenship test (Einbürgerungstest) that beats all existing solutions.

## Key Facts

- **310 questions total**: 300 general + 10 per Bundesland
- **Official exam**: 33 questions (30 general + 3 state), 60 minutes
- **Pass score**: 17/33 correct (51.5%)
- **Content**: Politics, History, Society, German law

## Why We'll Be Better

| Feature           | BAMF Official    | Our Version            |
| ----------------- | ---------------- | ---------------------- |
| Design            | ❌ 2000s UI      | ✅ Modern Besty design |
| Mobile            | ❌ Not optimized | ✅ Mobile-first        |
| Dark Mode         | ❌ No            | ✅ Yes                 |
| Progress Tracking | ❌ No            | ✅ Full stats          |
| Smart Learning    | ❌ No            | ✅ Spaced repetition   |
| Bookmarks         | ❌ No            | ✅ Yes                 |
| Practice Modes    | ❌ Linear only   | ✅ Multiple modes      |

## Technical Stack

```
Data:       JSON file (~600 KB)
Components: React functional components
Styling:    Tailwind CSS (Besty design system)
State:      Zustand with persist
Storage:    LocalStorage (progress, bookmarks)
```

## File Structure

```
src/features/einbuergerungstest/
├── EinbuergerungstestHub.jsx      # Landing page
├── ExamSimulator.jsx              # 33-question exam mode
├── QuestionBrowser.jsx            # Browse all 310
├── PracticeMode.jsx               # Custom practice
└── ProgressDashboard.jsx          # Stats & tracking

public/data/einbuergerungstest/
└── questions.json                 # All questions
```

## Data Structure

```json
{
  "questions": [
    {
      "id": 1,
      "type": "general",
      "category": "Politik in der Demokratie",
      "question": "In Deutschland dürfen Menschen...",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 3,
      "explanation": "Das Grundgesetz garantiert...",
      "difficulty": "easy",
      "tags": ["Grundrechte", "Meinungsfreiheit"]
    }
  ]
}
```

## Implementation Phases

### Phase 1: MVP (Week 1) ✅ START HERE

- [ ] Create questions.json with 50 test questions
- [ ] Build EinbuergerungstestHub landing page
- [ ] Build ExamSimulator (basic 33-question test)
- [ ] Add routes and navigation

**Goal**: Take a practice exam

### Phase 2: Full Dataset (Week 2)

- [ ] Add all 310 questions
- [ ] Add Bundesland selection
- [ ] Add explanations and categories

**Goal**: Complete question database

### Phase 3: Enhanced UX (Week 3)

- [ ] Question browser with filters
- [ ] Results screen with charts
- [ ] Mobile optimization
- [ ] Animations

**Goal**: Beautiful & usable

### Phase 4: Smart Features (Week 4)

- [ ] Progress tracking
- [ ] Weak area identification
- [ ] Spaced repetition
- [ ] Practice mode

**Goal**: Intelligent learning

### Phase 5: Polish (Week 5)

- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] User testing
- [ ] Launch

## Quick Wins for MVP

1. **Hub Page** (2 hours)
   - Hero with animation
   - "Test starten" button
   - "Fragen üben" button
   - Stats cards (310 questions, 17/33 to pass)

2. **Exam Simulator** (4 hours)
   - Load 33 random questions
   - Multiple choice UI
   - Timer (60 min)
   - Results screen

3. **Data** (4-8 hours)
   - Manual entry of 50 questions
   - JSON structure
   - Categories and tags

**Total MVP: ~12 hours**

## Data Acquisition Options

### Option A: Manual Entry (RECOMMENDED)

- Use official BAMF catalog
- Copy questions to spreadsheet
- Convert to JSON
- Add metadata

**Pro**: Legal, accurate, controlled
**Con**: Time-consuming

### Option B: Scraping

- Write Playwright script
- Navigate BAMF site
- Extract questions
- Generate JSON

**Pro**: Fast (2-3 hours)
**Con**: Legal gray area

## Design Patterns to Follow

### From Besty

- ✅ Glassmorphism cards
- ✅ Purple/indigo gradients
- ✅ Large touch targets (44px min)
- ✅ Smooth animations (200ms)
- ✅ Dark mode support

### From DTZ Hören/Lesen

- ✅ Progress indicators
- ✅ Question navigation
- ✅ Results with category breakdown
- ✅ Timer in exam mode

## Routes to Add

```javascript
// In App.jsx
{
  path: "/einbuergerungstest",
  element: <EinbuergerungstestHub />
},
{
  path: "/einbuergerungstest/exam",
  element: <ExamSimulator />
},
{
  path: "/einbuergerungstest/browse",
  element: <QuestionBrowser />
}
```

## Dashboard Navigation

Add to sidebar:

```javascript
{
  name: "Einbürgerungstest",
  icon: GraduationCap, // or Flag
  href: "/einbuergerungstest",
  available: true
}
```

## Success Metrics

**MVP Success**:

- Can take full 33-question exam
- Shows correct/incorrect immediately
- Displays results with score
- Mobile-friendly

**Launch Success**:

- All 310 questions loaded
- Bundesland selection works
- Progress tracking works
- < 3 sec page load

## Next Steps

1. ✅ Review implementation plan
2. [ ] Decide: manual entry or scraping?
3. [ ] Create questions.json structure
4. [ ] Build EinbuergerungstestHub
5. [ ] Build ExamSimulator
6. [ ] Add 50 test questions
7. [ ] Test on mobile
8. [ ] Iterate

---

**Ready to start? Begin with Phase 1, file 1: `EinbuergerungstestHub.jsx`**
