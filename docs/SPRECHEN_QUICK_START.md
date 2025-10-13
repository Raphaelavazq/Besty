# Sprechen Implementation - Quick Start Guide

**Date:** October 13, 2025  
**Status:** 🚀 Ready to Begin  
**Phase:** Foundation Setup

---

## 📦 Available Resources

### ✅ Videos Identified

Located in: `/Users/rafaela/Desktop/Besty/dist/assets/Britta Weber et al - Mit Erfolg zum Deutsch-Test für Zuwanderer - 2023 Videos/`

**Video Files:**
1. `DTZ Sprechen Teil 1 - Beispiel.mp4` - Example demonstration for Teil 1
2. `DTZ Sprechen Teil 1 - Jetzt Sie.mp4` - Practice prompt for Teil 1
3. `DTZ Sprechen Teil 2 - Beispiel.mp4` - Example demonstration for Teil 2
4. `DTZ Sprechen Teil 2 - Jetzt Sie.mp4` - Practice prompt for Teil 2
5. `DTZ Sprechen Teil 3 - Beispiel.mp4` - Example demonstration for Teil 3
6. `DTZ Sprechen Teil 3 - Jetzt Sie.mp4` - Practice prompt for Teil 3

**PDF Files:**
- `676863_MEz DTZ_Aufgabenblätter Teil Sprechen_Videos.pdf` - Task sheets
- `DTZ-Sprechen-Teil-1-sich-vorstellen.pdf` - Teil 1 introduction materials

**Total:** 6 video files covering all 3 Teile (examples + practice prompts)

---

## 🎯 Implementation Strategy

### Best Approach: Mirror Hören System

The Sprechen feature should follow the **exact same architecture** as the successful Hören implementation:

```
Hören Architecture          →    Sprechen Architecture
─────────────────────────────────────────────────────────
HoerenHub.jsx               →    SprechenHub.jsx
HoerenUebung.jsx            →    SprechenUebung.jsx
HoerenPruefung.jsx          →    SprechenPruefung.jsx
HoerenPlayer.jsx            →    SprechenPlayer.jsx
useHoerenEngine.js          →    useSprechenEngine.js
hoeren-uebung.json          →    sprechen-uebung.json
hoeren-tests.json           →    sprechen-tests.json
```

### Key Differences

| Aspect | Hören | Sprechen |
|--------|-------|----------|
| **Media Type** | Audio (MP3) | Video (MP4) + Audio Recording |
| **User Input** | Multiple choice clicks | Audio recording + dialogue choices |
| **Feedback** | Immediate (Übung) | Self-evaluation + model comparison |
| **Duration** | 25 minutes | 16 minutes |
| **Parts** | 4 Teile | 3 Teile |
| **Special Feature** | Timed playback | Interactive dialogue trainer (Teil 3) |

---

## 🚀 Phase 1: Immediate Next Steps

### Step 1: Move Videos to Public Folder

```bash
# Create directory
mkdir -p /Users/rafaela/Desktop/Besty/public/video/sprechen

# Copy videos
cp "/Users/rafaela/Desktop/Besty/dist/assets/Britta Weber et al - Mit Erfolg zum Deutsch-Test für Zuwanderer - 2023 Videos"/*.mp4 \
   /Users/rafaela/Desktop/Besty/public/video/sprechen/

# Rename for consistency
cd /Users/rafaela/Desktop/Besty/public/video/sprechen/
mv "DTZ Sprechen Teil 1 - Beispiel.mp4" "teil1_beispiel.mp4"
mv "DTZ Sprechen Teil 1 - Jetzt Sie.mp4" "teil1_jetzt_sie.mp4"
mv "DTZ Sprechen Teil 2 - Beispiel.mp4" "teil2_beispiel.mp4"
mv "DTZ Sprechen Teil 2 - Jetzt Sie.mp4" "teil2_jetzt_sie.mp4"
mv "DTZ Sprechen Teil 3 - Beispiel.mp4" "teil3_beispiel.mp4"
mv "DTZ Sprechen Teil 3 - Jetzt Sie.mp4" "teil3_jetzt_sie.mp4"
```

### Step 2: Create Video Manifest

Create `/public/data/sprechen/video-manifest.json`:

```json
{
  "videos": {
    "teil1_beispiel": {
      "file": "teil1_beispiel.mp4",
      "type": "example",
      "teil": 1,
      "title": "Teil 1 - Beispiel",
      "description": "Beispiel-Dialog: Sich vorstellen"
    },
    "teil1_jetzt_sie": {
      "file": "teil1_jetzt_sie.mp4",
      "type": "prompt",
      "teil": 1,
      "title": "Teil 1 - Jetzt Sie",
      "description": "Stellen Sie sich vor"
    },
    "teil2_beispiel": {
      "file": "teil2_beispiel.mp4",
      "type": "example",
      "teil": 2,
      "title": "Teil 2 - Beispiel",
      "description": "Beispiel: Über Erfahrungen sprechen"
    },
    "teil2_jetzt_sie": {
      "file": "teil2_jetzt_sie.mp4",
      "type": "prompt",
      "teil": 2,
      "title": "Teil 2 - Jetzt Sie",
      "description": "Beschreiben Sie das Bild"
    },
    "teil3_beispiel": {
      "file": "teil3_beispiel.mp4",
      "type": "example",
      "teil": 3,
      "title": "Teil 3 - Beispiel",
      "description": "Beispiel-Dialog: Gemeinsam planen"
    },
    "teil3_jetzt_sie": {
      "file": "teil3_jetzt_sie.mp4",
      "type": "prompt",
      "teil": 3,
      "title": "Teil 3 - Jetzt Sie",
      "description": "Planen Sie gemeinsam"
    }
  }
}
```

### Step 3: Create Core Components

#### A. VideoPlayer Component

Create `/src/features/sprechen/components/VideoPlayer.jsx`:

```jsx
import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function VideoPlayer({ 
  src, 
  poster,
  onEnded,
  controls = true 
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        onEnded={onEnded}
        playsInline
      >
        Ihr Browser unterstützt keine Videos.
      </video>
      
      {controls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-purple-600" />
              ) : (
                <Play className="w-6 h-6 text-purple-600 ml-1" />
              )}
            </button>
            
            <button
              onClick={() => {
                videoRef.current.muted = !isMuted;
                setIsMuted(!isMuted);
              }}
              className="w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-purple-600" />
              ) : (
                <Volume2 className="w-5 h-5 text-purple-600" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

#### B. AudioRecorder Component

Create `/src/features/sprechen/components/AudioRecorder.jsx`:

```jsx
import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, RotateCcw } from 'lucide-react';

export default function AudioRecorder({ 
  maxDuration = 30,
  onRecordingComplete 
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioURL, setAudioURL] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        onRecordingComplete?.(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= maxDuration) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.error('Mikrofon-Zugriff verweigert:', err);
      alert('Bitte erlauben Sie den Zugriff auf Ihr Mikrofon.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100">
      <div className="flex flex-col items-center gap-4">
        {/* Recording Button */}
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 ${
            isRecording
              ? 'bg-red-600 hover:bg-red-700 animate-pulse'
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-110'
          }`}
        >
          {isRecording ? (
            <Square className="w-8 h-8 text-white" />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
        </button>

        {/* Timer */}
        <div className="text-2xl font-bold text-gray-900">
          {formatTime(recordingTime)} / {formatTime(maxDuration)}
        </div>

        {/* Playback */}
        {audioURL && !isRecording && (
          <div className="w-full space-y-3">
            <audio src={audioURL} controls className="w-full" />
            <button
              onClick={() => {
                setAudioURL(null);
                setRecordingTime(0);
              }}
              className="w-full px-4 py-2 rounded-xl bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Neu aufnehmen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
```

### Step 4: Create SprechenHub Landing Page

Create `/src/pages/SprechenHub.jsx`:

```jsx
import { Link } from 'react-router-dom';
import { BookOpen, Award, Shuffle } from 'lucide-react';

export default function SprechenHub() {
  const modes = [
    {
      title: 'Übung',
      subtitle: 'Mit Feedback üben',
      description: 'Übe alle 3 Teile mit Beispielen',
      icon: BookOpen,
      color: 'from-purple-500 to-indigo-600',
      href: '/tests/sprechen/uebung/teil1',
    },
    {
      title: 'Prüfung',
      subtitle: 'Test simulieren',
      description: '16 Minuten wie in echter Prüfung',
      icon: Award,
      color: 'from-indigo-500 to-purple-600',
      href: '/tests/sprechen/pruefung/modelltest-1',
    },
    {
      title: 'Training',
      subtitle: 'Zufällige Übungen',
      description: 'Zufällige Fragen aus allen Teilen',
      icon: Shuffle,
      color: 'from-purple-600 to-pink-600',
      href: '/tests/sprechen/training',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Sprechen
          </h1>
          <p className="text-xl text-gray-600">
            Mündliche Prüfung vorbereiten
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {modes.map((mode) => (
            <Link
              key={mode.title}
              to={mode.href}
              className="group bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-purple-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${mode.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <mode.icon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {mode.title}
              </h3>
              <p className="text-sm text-purple-600 font-medium mb-2">
                {mode.subtitle}
              </p>
              <p className="text-gray-600">{mode.description}</p>
            </Link>
          ))}
        </div>

        {/* Teil Overview */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-purple-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Prüfungsteile
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="font-bold text-gray-900">Teil 1: Sich vorstellen</h3>
              <p className="text-gray-600">Name, Herkunft, Wohnort, Arbeit, Familie</p>
            </div>
            <div className="border-l-4 border-indigo-600 pl-4">
              <h3 className="font-bold text-gray-900">Teil 2: Über Erfahrungen sprechen</h3>
              <p className="text-gray-600">Bild beschreiben und eigene Erfahrungen erzählen</p>
            </div>
            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="font-bold text-gray-900">Teil 3: Gemeinsam etwas planen</h3>
              <p className="text-gray-600">Vorschläge machen, reagieren, Meinungen äußern</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Step 5: Add Routes to App.jsx

```jsx
// In src/App.jsx, add:
import SprechenHub from './pages/SprechenHub';

// In Routes:
<Route
  path="/tests/sprechen"
  element={
    <HoverSidebarShell>
      <SprechenHub />
    </HoverSidebarShell>
  }
/>
```

---

## 📋 Complete Implementation Checklist

### Week 1: Foundation ✅
- [x] Identified available videos (6 MP4 files)
- [ ] Move videos to `/public/video/sprechen/`
- [ ] Create `video-manifest.json`
- [ ] Build `VideoPlayer.jsx` component
- [ ] Build `AudioRecorder.jsx` component
- [ ] Create `SprechenHub.jsx` landing page
- [ ] Add route to `App.jsx`
- [ ] Test video playback in browser
- [ ] Test audio recording on mobile

### Week 2: Practice Mode
- [ ] Create `SprechenUebung.jsx`
- [ ] Implement Teil 1 practice (personal questions)
- [ ] Implement Teil 2 practice (image description)
- [ ] Build basic Teil 3 trainer
- [ ] Add model answer display
- [ ] Create `sprechen-uebung.json` data file

### Week 3: Interactive Dialogues
- [ ] Build `DialogueTrainer.jsx` component
- [ ] Implement Redemittel card system
- [ ] Create branching logic
- [ ] Add dialogue history view
- [ ] Create 20+ dialogue scenarios
- [ ] Convert scenarios to JSON

### Week 4: Test Mode & Polish
- [ ] Create `SprechenPruefung.jsx`
- [ ] Implement 16-minute timer
- [ ] Build self-evaluation rubric
- [ ] Create results screen
- [ ] Mobile optimization
- [ ] Accessibility testing
- [ ] Launch! 🚀

---

## 📚 Documentation Reference

All detailed documentation is available in `/docs/`:

1. **SPRECHEN_IMPLEMENTATION_PLAN.md** - Complete feature specification (30 pages)
2. **SPRECHEN_DIALOGUE_SCENARIOS.md** - All dialogue scenarios organized by category (50+ scenarios)
3. **SPRECHEN_TECHNICAL_AUDIT.md** - Technical architecture and decisions (25 pages)
4. **#DEVELOPMENT_STANDARDS.md** - Design system and coding standards
5. **OFFICIAL-DTZ-STRUCTURE.md** - Official exam structure reference

---

## 🎯 Success Metrics

### MVP Success (Phase 1)
- ✅ Video playback works smoothly
- ✅ Audio recording works on mobile + desktop
- ✅ At least Teil 1 practice fully functional
- ✅ Basic UI matches Hören design system
- ✅ Users can complete one full practice session

### Full Launch Success (Phase 4)
- ✅ All 3 Teile working in both modes
- ✅ 20+ interactive dialogue scenarios
- ✅ Self-evaluation system implemented
- ✅ 90+ Lighthouse score
- ✅ Positive user feedback (4+/5 stars)

---

## 🚀 Get Started Now!

### Recommended Order:
1. **Move videos** → public folder
2. **Test one video** → Ensure playback works
3. **Build VideoPlayer** → Get video component working
4. **Build AudioRecorder** → Get recording working
5. **Create Hub page** → Navigation structure
6. **Add to dashboard** → Update Sprechen card

### Time Estimate:
- **Day 1-2:** Video setup + VideoPlayer component
- **Day 3-4:** AudioRecorder component + testing
- **Day 5:** Hub page + routing
- **Week 2+:** Practice mode implementation

---

**Next Action:** Run the video setup commands above to move files to public folder!

Good luck! 🎉 The architecture is solid, the videos are ready, and you have complete documentation. You're set up for success!
