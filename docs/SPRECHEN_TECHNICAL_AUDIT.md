# Sprechen Feature - Technical Audit & Implementation Roadmap

**Date:** October 13, 2025  
**Status:** 📋 Planning Phase  
**Target:** Complete Sprechen system following Hören architecture pattern

---

## 🎯 Vision & Goals

### Primary Goal
Create an interactive Speaking practice system that:
- **Simulates realistic exam conditions** using examiner videos
- **Provides structured practice** for all 3 Teile
- **Enables interactive dialogue training** with branching conversations
- **Records user responses** for self-evaluation
- **Follows official DTZ format** exactly

### Success Criteria
- ✅ Users feel confident speaking in real exam
- ✅ System provides clear, actionable feedback
- ✅ Interactive dialogues feel natural and helpful
- ✅ Mobile experience is smooth and intuitive
- ✅ Content matches official DTZ structure 100%

---

## 📊 Current State Analysis

### What We Have ✅

**1. Successful Hören Implementation**
- Clean architecture with Übung/Prüfung modes
- `useHoerenEngine` hook for state management
- `HoerenPlayer` component for media playback
- Proper routing structure
- Beautiful, consistent UI design
- Mobile-optimized experience

**2. Design System Established**
- Glass-morphism cards: `bg-white/80 backdrop-blur-md`
- Purple gradients: `from-purple-600 to-indigo-600`
- Rounded corners: `rounded-2xl`, `rounded-3xl`
- Hover effects: `hover:-translate-y-2 hover:scale-105`
- Consistent spacing and typography

**3. Available Resources**
- Videos folder: `/Users/rafaela/Desktop/Besty/dist/assets/Britta Weber et al - Mit Erfolg zum Deutsch-Test für Zuwanderer - 2023 Videos`
- Complete Redemittel database (50+ phrases)
- 20+ dialogue scenarios documented
- Official DTZ structure documented

**4. Theme System Pattern**
- Successfully implemented vocabulary quiz system
- Interactive card-based UI
- Progress tracking
- Results screens
- Can adapt patterns for speaking

### What We Need 🎯

**1. Video Content**
- [ ] Convert videos to web-friendly format (MP4/WebM)
- [ ] Move to `/public/video/sprechen/`
- [ ] Create video manifest JSON
- [ ] Generate thumbnails
- [ ] Add subtitles/captions

**2. Core Components**
- [ ] `VideoPlayer.jsx` - HTML5 video with controls
- [ ] `AudioRecorder.jsx` - Recording interface with MediaRecorder API
- [ ] `DialogueTrainer.jsx` - Branching dialogue system
- [ ] `SprechenPlayer.jsx` - Main player combining video + recording
- [ ] `useSprechenEngine.js` - State management hook

**3. Data Structures**
- [ ] `video-manifest.json` - Maps videos to content
- [ ] `sprechen-uebung.json` - Practice exercises
- [ ] `sprechen-tests.json` - Full model tests
- [ ] `redemittel.json` - Phrase database
- [ ] `dialogue-flows.json` - Branching conversation trees

**4. Routes**
- [ ] `/tests/sprechen` - Hub/landing page
- [ ] `/tests/sprechen/uebung/:teil` - Practice mode
- [ ] `/tests/sprechen/pruefung/:testId` - Test mode
- [ ] `/tests/sprechen/training` - Random practice

---

## 🏗️ Technical Architecture

### Component Hierarchy

```
SprechenHub (Landing)
├── Mode Selector Cards
│   ├── Übung → SprechenUebung
│   ├── Prüfung → SprechenPruefung
│   └── Training → SprechenTraining
│
SprechenUebung (Practice)
├── Teil Selector (1, 2, 3)
├── SprechenPlayer
│   ├── VideoPlayer (examiner)
│   ├── Question Display
│   ├── AudioRecorder (user)
│   └── Model Answer Playback
└── For Teil 3: DialogueTrainer
    ├── Scenario Display
    ├── Examiner Prompt
    ├── Redemittel Cards (choices)
    └── Dialogue History
│
SprechenPruefung (Test)
├── Timer (16 minutes)
├── Teil 1 → Personal Questions
├── Teil 2 → Image Description
├── Teil 3 → Planning Task
├── SelfEvaluationRubric
└── Results Screen
```

### State Management Pattern

Following `useHoerenEngine.js` pattern:

```javascript
const useSprechenEngine = (mode, content, timeLimit) => {
  const [state, setState] = useState({
    mode: 'uebung' | 'pruefung',
    currentTeil: 1,
    currentItemIndex: 0,
    items: [],
    recordings: {}, // { itemNo: Blob }
    selfEvaluations: {}, // { itemNo: rubric }
    dialogueHistory: [], // For Teil 3
    timeRemaining: timeLimit,
    isComplete: false,
  });

  const actions = {
    startRecording: (itemNo) => {},
    stopRecording: (itemNo, audioBlob) => {},
    playbackRecording: (itemNo) => {},
    nextItem: () => {},
    selectRedemittel: (phrase) => {}, // Teil 3
    submitSelfEvaluation: (itemNo, scores) => {},
    completeTest: () => {},
  };

  return [state, actions];
};
```

### Data Flow

```
1. User selects mode → Load JSON data
2. Display video/prompt → User responds
3. Record audio → Save to state
4. (Übung) Show model answer → Compare
5. Next item → Repeat
6. Complete → Self-evaluation → Results
```

---

## 🎬 Video Processing Requirements

### Current State
- Videos located in: `/Users/rafaela/Desktop/Besty/dist/assets/Britta Weber.../Videos`
- Need to identify which videos are relevant

### Processing Steps

1. **Identify Relevant Videos**
   ```bash
   # List all videos in folder
   ls -la "/Users/rafaela/Desktop/Besty/dist/assets/Britta Weber et al - Mit Erfolg zum Deutsch-Test für Zuwanderer - 2023 Videos"
   ```

2. **Convert to Web Format**
   ```bash
   # Use FFmpeg to convert to MP4/WebM
   ffmpeg -i input.mov -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mp4
   
   # Create WebM version for better browser support
   ffmpeg -i input.mov -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus output.webm
   ```

3. **Optimize for Web**
   - Target resolution: 1280x720 (720p)
   - Frame rate: 30fps
   - Video bitrate: 2-4 Mbps
   - Audio bitrate: 128 kbps
   - Duration: Trim to relevant sections only

4. **Generate Metadata**
   ```json
   {
     "video_id": "teil1_intro",
     "file_mp4": "teil1_intro.mp4",
     "file_webm": "teil1_intro.webm",
     "duration": 25,
     "type": "introduction",
     "teil": 1,
     "transcript": "Willkommen zur Mündlichen Prüfung...",
     "subtitles": "teil1_intro.vtt"
   }
   ```

5. **Create Thumbnails**
   ```bash
   # Extract frame at 2 seconds
   ffmpeg -i video.mp4 -ss 00:00:02 -vframes 1 thumbnail.jpg
   ```

### Naming Convention
```
teil1_intro.mp4           # Introduction to Teil 1
teil1_frage1_name.mp4     # Question: "Wie heißen Sie?"
teil1_frage2_herkunft.mp4 # Question: "Woher kommen Sie?"
teil2_intro.mp4           # Introduction to Teil 2
teil2_bild_einkaufen.mp4  # Image prompt: Shopping
teil3_intro.mp4           # Introduction to Teil 3
teil3_szenario_fest.mp4   # Scenario: Planning a party
```

---

## 🎤 Audio Recording Implementation

### Browser API: MediaRecorder

```javascript
// Request microphone access
const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

// Create recorder
const mediaRecorder = new MediaRecorder(stream, {
  mimeType: 'audio/webm;codecs=opus'
});

// Handle data
const chunks = [];
mediaRecorder.ondataavailable = (e) => {
  chunks.push(e.data);
};

// On stop, create Blob
mediaRecorder.onstop = () => {
  const blob = new Blob(chunks, { type: 'audio/webm' });
  // Save to state or upload
};

// Start/stop
mediaRecorder.start();
setTimeout(() => mediaRecorder.stop(), 30000); // 30s max
```

### Recording Component Architecture

```jsx
// AudioRecorder.jsx
export default function AudioRecorder({ 
  maxDuration = 30, 
  onRecordingComplete,
  onRecordingStart 
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioURL, setAudioURL] = useState(null);
  
  return (
    <div className="recording-interface">
      {/* Waveform visualization */}
      <canvas ref={canvasRef} />
      
      {/* Record button */}
      <button onClick={toggleRecording}>
        {isRecording ? <StopIcon /> : <MicIcon />}
      </button>
      
      {/* Timer */}
      <div className="timer">{formatTime(recordingTime)}</div>
      
      {/* Playback */}
      {audioURL && (
        <audio src={audioURL} controls />
      )}
    </div>
  );
}
```

### Features
- ✅ Real-time waveform visualization
- ✅ Time limit enforcement
- ✅ Visual recording indicator (pulsing red)
- ✅ Immediate playback
- ✅ Re-record option
- ✅ Download recording (optional)

---

## 🌳 Dialogue Trainer - Branching Logic

### Concept

User builds a complete dialogue by choosing appropriate Redemittel at each step.

### Data Structure

```json
{
  "scenario": {
    "id": "fest_organisieren",
    "title": "Geburtstagsparty planen",
    "leitpunkte": ["Wann?", "Wo?", "Essen?", "Gäste?"],
    "steps": [
      {
        "id": "step_1",
        "examinerPrompt": "Wann wollen Sie feiern?",
        "options": [
          {
            "id": "opt_1a",
            "category": "vorschlag_machen",
            "text": "Wie wäre es am Samstag?",
            "nextStep": "step_2a"
          },
          {
            "id": "opt_1b",
            "category": "nachfragen",
            "text": "Wann hättest du Zeit?",
            "nextStep": "step_2b"
          }
        ]
      },
      {
        "id": "step_2a",
        "examinerPrompt": "Ja, Samstag ist gut! Wo wollen Sie feiern?",
        "options": [...]
      }
    ]
  }
}
```

### UI Flow

1. **Scenario Card** (Top)
   ```
   ┌─────────────────────────────────────┐
   │ 🎉 Geburtstagsparty planen          │
   │                                     │
   │ Planen Sie:                         │
   │ • Wann? ✓                           │
   │ • Wo?                               │
   │ • Essen? (pending)                  │
   │ • Gäste? (pending)                  │
   └─────────────────────────────────────┘
   ```

2. **Examiner Prompt** (Speech Bubble)
   ```
   ┌─────────────────────────┐
   │ Wann wollen Sie feiern? │
   └─────────────────────────┘
   ```

3. **Choice Cards** (2-3 options)
   ```
   ┌────────────────────────────────┐
   │ Vorschlag machen               │
   │ "Wie wäre es am Samstag?"      │
   └────────────────────────────────┘
   
   ┌────────────────────────────────┐
   │ Nachfragen                     │
   │ "Wann hättest du Zeit?"        │
   └────────────────────────────────┘
   ```

4. **Dialogue History** (Scrollable)
   ```
   Prüfer: Wann wollen Sie feiern?
   Sie: Wie wäre es am Samstag?
   Prüfer: Ja, gut! Wo wollen Sie feiern?
   Sie: ...
   ```

### Completion Logic

- ✅ All Leitpunkte addressed
- ✅ Minimum 6-8 exchanges completed
- ✅ Used varied Redemittel (not same category 3x)
- ✅ Made at least 1 Vorschlag
- ✅ Reacted to at least 1 Vorschlag
- ✅ Asked at least 1 Nachfrage

---

## 📱 Mobile Optimization Strategy

### Critical Mobile Features

1. **Video Player**
   - Full-width on mobile
   - Native controls on iOS/Android
   - Picture-in-picture support
   - Orientation handling

2. **Recording Interface**
   - Large record button (80x80px minimum)
   - Clear visual feedback
   - Permission handling UI
   - Background recording support

3. **Dialogue Cards**
   - Swipeable on mobile
   - Large touch targets (44px minimum)
   - Haptic feedback on selection
   - Single-column layout

4. **Keyboard Handling**
   - Prevent zoom on input focus
   - Adjust layout when keyboard appears
   - Scroll to active element

### Responsive Breakpoints

```css
/* Mobile-first approach */
.container {
  /* Mobile: 1 column, full width */
  @apply grid-cols-1 px-4;
  
  /* Tablet: 2 columns */
  @apply md:grid-cols-2 md:px-6;
  
  /* Desktop: Side-by-side */
  @apply lg:grid-cols-2 lg:px-8;
}
```

---

## ♿ Accessibility Requirements

### WCAG AA Compliance

**Video**
- ✅ Captions/subtitles for all videos
- ✅ Audio descriptions available
- ✅ Keyboard controls (Space, Arrow keys)
- ✅ Screen reader announcements

**Recording**
- ✅ Clear ARIA labels
- ✅ Visual + auditory feedback
- ✅ Error messages for permission issues
- ✅ Alternative input methods

**Navigation**
- ✅ Tab order logical
- ✅ Focus indicators visible
- ✅ Skip links available
- ✅ Heading hierarchy proper

### Testing Checklist
- [ ] VoiceOver (iOS/macOS)
- [ ] TalkBack (Android)
- [ ] NVDA (Windows)
- [ ] Keyboard-only navigation
- [ ] Color contrast (WCAG AA: 4.5:1)
- [ ] Touch target size (44x44px minimum)

---

## 🗓️ Implementation Timeline

### Week 1: Foundation (Nov 4-10, 2025)

**Day 1-2: Video Processing**
- [ ] Identify and categorize videos from source folder
- [ ] Convert to web-friendly formats (MP4/WebM)
- [ ] Move to `/public/video/sprechen/`
- [ ] Create `video-manifest.json`
- [ ] Generate thumbnails

**Day 3-4: Core Components**
- [ ] Build `VideoPlayer.jsx`
- [ ] Build `AudioRecorder.jsx`
- [ ] Test on multiple browsers/devices
- [ ] Handle permissions and errors

**Day 5-7: State Management**
- [ ] Create `useSprechenEngine.js` hook
- [ ] Implement recording state management
- [ ] Add timer functionality
- [ ] Create utility functions

**Deliverables:**
- ✅ Working video playback
- ✅ Working audio recording
- ✅ State management hook
- ✅ Initial routing structure

---

### Week 2: Practice Mode (Nov 11-17, 2025)

**Day 1-2: Teil 1 Practice**
- [ ] Create `SprechenUebung.jsx`
- [ ] Implement personal questions flow
- [ ] Add model answer comparisons
- [ ] Build replay functionality

**Day 3-4: Teil 2 Practice**
- [ ] Image description exercises
- [ ] Prompt display system
- [ ] Checklist for completeness
- [ ] Tips and feedback

**Day 5-7: Teil 3 DialogueTrainer**
- [ ] Build `DialogueTrainer.jsx`
- [ ] Implement branching logic
- [ ] Create Redemittel card system
- [ ] Build dialogue history view
- [ ] Add completion validation

**Deliverables:**
- ✅ Complete Übung mode for all 3 Teile
- ✅ Interactive dialogue trainer
- ✅ Model answers integrated

---

### Week 3: Test Mode (Nov 18-24, 2025)

**Day 1-2: Test Container**
- [ ] Create `SprechenPruefung.jsx`
- [ ] Implement 16-minute timer
- [ ] Add Teil transitions
- [ ] Warning on exit

**Day 3-4: Self-Evaluation**
- [ ] Build `SelfEvaluationRubric.jsx`
- [ ] Create scoring system
- [ ] Implement results screen
- [ ] Add detailed feedback

**Day 5-7: Polish & Integration**
- [ ] Connect all parts
- [ ] Add loading states
- [ ] Error handling
- [ ] Performance optimization

**Deliverables:**
- ✅ Working full test simulation
- ✅ Self-evaluation system
- ✅ Complete results flow

---

### Week 4: Content & Launch (Nov 25-Dec 1, 2025)

**Day 1-2: Content Creation**
- [ ] Write all exercise descriptions
- [ ] Create 2-3 complete model tests
- [ ] Record/write model answers
- [ ] Add 50+ dialogue scenarios

**Day 3-4: UI/UX Polish**
- [ ] Refine animations
- [ ] Mobile optimization
- [ ] Accessibility testing
- [ ] Performance tuning

**Day 5-7: QA & Launch**
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] User acceptance testing
- [ ] Deploy to production
- [ ] Update dashboard

**Deliverables:**
- ✅ Production-ready feature
- ✅ Complete content library
- ✅ All tests passing
- ✅ Documentation complete

---

## 🎯 Phase 1 Priorities (This Week)

### Must Have
1. ✅ Video player working with local videos
2. ✅ Audio recording with playback
3. ✅ Basic routing structure (`/tests/sprechen`)
4. ✅ SprechenHub landing page

### Should Have
1. ✅ Teil 1 practice exercises (5-10 questions)
2. ✅ Simple model answer display
3. ✅ Basic state management

### Nice to Have
1. Dialogue trainer prototype
2. Self-evaluation rubric
3. Results screen with feedback

---

## 📋 Technical Decisions

### Video Format
**Decision:** Use MP4 (H.264) as primary, WebM as fallback
**Reasoning:**
- MP4: Best browser support (98%+)
- WebM: Better compression, open-source
- Serve both, let browser choose

### Audio Format
**Decision:** Record as WebM, optionally convert to MP3
**Reasoning:**
- WebM: Native browser support with MediaRecorder API
- MP3: Better compatibility for download/sharing
- Conversion can happen client-side or server-side

### State Persistence
**Decision:** Use IndexedDB for recordings, localStorage for progress
**Reasoning:**
- IndexedDB: Can store large Blobs (audio files)
- localStorage: Simple key-value for progress/scores
- SessionStorage: Temporary state during test

### Dialogue Branching
**Decision:** Pre-defined paths in JSON, not AI-generated
**Reasoning:**
- Predictable, reliable outcomes
- No API dependencies
- Faster, works offline
- Can add AI enhancement later

---

## 🚀 Launch Checklist

### Pre-Launch (Must Complete)
- [ ] All 3 Teile practice modes working
- [ ] At least 1 complete model test available
- [ ] 20+ dialogue scenarios for Teil 3
- [ ] Model answers for all exercises
- [ ] Mobile testing on iOS + Android
- [ ] Accessibility audit passed
- [ ] Cross-browser testing complete
- [ ] Performance benchmarks met

### Launch Day
- [ ] Deploy to production
- [ ] Update dashboard card for Sprechen
- [ ] Add "New!" badge
- [ ] Monitor error logs
- [ ] Prepare support documentation

### Post-Launch (Week 1)
- [ ] Collect user feedback
- [ ] Fix critical bugs
- [ ] Monitor performance metrics
- [ ] Plan content expansion

---

## 📊 Success Metrics

### Engagement
- Daily active users practicing speaking
- Average time per session (target: 15+ minutes)
- Completion rate for dialogues (target: 70%+)
- Re-recording rate (target: 2-3x per question)

### Learning Outcomes
- Self-evaluation scores improvement over time
- Confidence survey ratings (target: 4+/5)
- Reported exam success rate
- Redemittel usage diversity

### Technical Performance
- Video load time < 3 seconds
- Recording success rate > 99%
- Zero crashes during test mode
- Mobile frame rate 60fps
- Lighthouse score > 90

---

## 🔮 Future Enhancements (Phase 2+)

### Advanced Features
- AI speech evaluation (pronunciation, grammar)
- Peer practice matching
- Video responses (not just audio)
- Live practice sessions with tutors
- Personalized weak-area recommendations

### Gamification
- Badges for completing scenarios
- Streak tracking
- Leaderboards (optional)
- Achievement system
- Progress visualization

### Content Expansion
- 100+ dialogue scenarios
- Theme-based practice (e.g., "At the Doctor")
- Real exam recordings (with permission)
- Cultural tips and context
- Regional dialect variations

### Integration
- Export all recordings as ZIP
- Email progress reports
- Teacher dashboard for classrooms
- Integration with calendar apps
- Social sharing features

---

## 📝 Risk Assessment

### High Risk
- **Video file sizes too large** → Mitigation: Aggressive compression, CDN
- **Recording fails on iOS Safari** → Mitigation: Extensive testing, fallbacks
- **Dialogue branches too complex** → Mitigation: Start simple, iterate

### Medium Risk
- **User confusion with interface** → Mitigation: Clear instructions, onboarding
- **Poor self-evaluation accuracy** → Mitigation: Provide clear rubrics, examples
- **Slow video loading** → Mitigation: Lazy loading, preloading, thumbnails

### Low Risk
- **Browser compatibility issues** → Mitigation: Progressive enhancement
- **Audio quality poor** → Mitigation: Recommend external mic, noise reduction

---

## 🎓 Lessons from Hören Implementation

### What Worked Well ✅
- Clean component separation (Übung/Prüfung/Player)
- `useHoerenEngine` hook pattern
- JSON-based content structure
- Glass-morphism design system
- Mobile-first approach

### What to Improve 🔧
- Add more intermediate feedback during practice
- Better error messages
- More visual progress indicators
- Easier navigation between parts
- Clearer instructions for first-time users

### Apply to Sprechen
- Follow same architectural patterns
- Use consistent design language
- Improve on feedback mechanisms
- Add more interactive elements
- Better onboarding flow

---

**Document Version:** 1.0  
**Last Updated:** October 13, 2025  
**Next Review:** After Phase 1 completion (Week 1)  
**Owner:** Development Team
