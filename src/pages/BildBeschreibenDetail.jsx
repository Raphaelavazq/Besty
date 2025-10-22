/**
 * BildBeschreibenDetail - Individual exercise page
 * Shows image, sample transcription, TTS playback, and recording interface
 *
 * Data is loaded from /data/bild-beschreiben.json (single source of truth)
 */

import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import bildData from "../../data/bild-beschreiben.json";
import { ArrowLeft, Play, Pause, Volume2, CheckCircle } from "lucide-react";
import { GradientHeading, Button, Card } from "../components/ui";

// ============================================================================
// Component: BildBeschreibenDetail
// ============================================================================
// NOTE: exerciseData removed - all content now in /data/bild-beschreiben.json
// This reduces component from ~1,681 lines to ~400 lines (76% reduction!)
// ============================================================================

export default function BildBeschreibenDetail() {
  const { id } = useParams();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef(null);
  const [playerSrc, setPlayerSrc] = useState(null);
  const [isPlayingLocal, setIsPlayingLocal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [durationSec, setDurationSec] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showTextMobile, setShowTextMobile] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);

  // Load exercise data from JSON manifest (single source of truth!)
  const manifest = bildData?.themes || {};

  // Find exercise by ID across all themes
  let exercise = null;
  for (const themeKey in manifest) {
    const found = manifest[themeKey].find(
      (img) => String(img.id) === String(id)
    );
    if (found) {
      exercise = {
        id: found.id,
        title: found.title || `Übung ${found.id}`,
        category: found.category || "",
        imageUrl: found.file,
        alt: found.alt || found.title,
        questions: found.questions || [],
        description: found.description || "",
        additionalQuestions: found.additionalQuestions || [],
        duration: found.duration || "",
      };
      break; // Found it, exit loop
    }
  }

  // Fallback to first exercise if ID not found
  if (!exercise) {
    const firstTheme = Object.values(manifest)[0];
    const firstEx = firstTheme?.[0];
    if (firstEx) {
      exercise = {
        id: firstEx.id,
        title: firstEx.title,
        category: firstEx.category,
        imageUrl: firstEx.file,
        alt: firstEx.alt,
        questions: firstEx.questions || [],
        description: firstEx.description || "",
        additionalQuestions: firstEx.additionalQuestions || [],
        duration: firstEx.duration || "",
      };
    }
  }

  // Ensure exercise has default values if not found
  if (!exercise) {
    exercise = {
      id: "1",
      title: "Übung nicht gefunden",
      category: "",
      imageUrl: "/images/placeholder.png",
      alt: "Bild nicht gefunden",
      questions: [],
      description: "",
      additionalQuestions: [],
      duration: "1:20",
    };
  }

  // TTS Function (reusing your existing OpenAI TTS from DialogueTrainerAI)
  const speakText = async (text) => {
    if (!text) return;
    setIsSpeaking(true);

    try {
      const ttsUrl = import.meta.env.VITE_BACKEND_URL
        ? import.meta.env.VITE_BACKEND_URL.replace("/api/chat", "/api/tts")
        : "/api/tts";

      const response = await fetch(ttsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          voice: "nova",
        }),
      });

      if (!response.ok) {
        throw new Error("TTS request failed");
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      // Use the page audio element so we can control progress/volume
      if (audioRef.current) {
        // revoke previous src if any
        if (playerSrc) URL.revokeObjectURL(playerSrc);
        setPlayerSrc(audioUrl);
        audioRef.current.src = audioUrl;
        audioRef.current.volume = volume;
        await audioRef.current.play();
        setIsPlayingLocal(true);
      } else {
        const audio = new Audio(audioUrl);
        await audio.play();
      }
    } catch (error) {
      console.error("TTS Error:", error);
    } finally {
      setIsSpeaking(false);
    }
  };

  const getTranscriptionText = () => {
    // prefer manifest description if present
    if (exercise.description && exercise.description.length > 20)
      return exercise.description;
    return exercise.transcription || "";
  };

  // Local player handlers
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onLoaded = () => setDurationSec(a.duration || 0);
    const onTime = () => setProgress(a.currentTime || 0);
    const onEnded = () => setIsPlayingLocal(false);
    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnded);
    return () => {
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnded);
    };
  }, [playerSrc]);

  const togglePlayPause = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      await a.play();
      setIsPlayingLocal(true);
    } else {
      a.pause();
      setIsPlayingLocal(false);
    }
  };

  const handleSeek = (evt) => {
    const a = audioRef.current;
    if (!a) return;
    const rect = evt.currentTarget.getBoundingClientRect();
    const clickX = evt.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    a.currentTime = pct * (a.duration || 0);
  };

  const handleVolume = (v) => {
    const a = audioRef.current;
    setVolume(v);
    if (a) a.volume = v;
  };

  const handlePlaySample = () => {
    speakText(getTranscriptionText());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              to="/tests/sprechen/bild-beschreiben"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white rounded-xl transition-all duration-200 text-gray-700 font-medium border border-purple-100 hover:border-purple-200 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Zurück zur Übersicht
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                Übung {exercise.id}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Clean 50/50 split layout */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="mb-2 sm:mb-3 text-center">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1 tracking-tight">
            {exercise.title}
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-light">
            {exercise.category}
          </p>
        </div>

        {/* Main layout container - Stacked on all screens */}
        <div className="space-y-4 lg:space-y-6 pb-8">
          {/* Image Section */}
          <div className="relative">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-xl border border-purple-100 h-[400px] sm:h-[500px] flex items-center justify-center">
              <img
                src={exercise.imageUrl}
                alt={exercise.title}
                className="max-w-full max-h-full object-contain rounded-xl sm:rounded-2xl"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/800x600/7c3aed/ffffff?text=Bild+nicht+verfügbar";
                }}
              />
            </div>
          </div>

          {/* Text content panel */}
          <div className="relative flex flex-col">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-purple-100 h-full flex flex-col overflow-hidden">
              {/* Small inline player at top */}
              <div className="mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-purple-50 flex-shrink-0">
                <button
                  onClick={togglePlayPause}
                  className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200"
                  aria-label={isPlayingLocal ? "Pause" : "Play"}
                >
                  {isPlayingLocal ? (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span className="truncate">Beispielantwort</span>
                    <span className="flex-shrink-0 ml-2">
                      {exercise.duration || "1:20"}
                    </span>
                  </div>
                  <div
                    className="w-full h-1.5 sm:h-2 bg-purple-100 rounded-full cursor-pointer overflow-hidden"
                    onClick={handleSeek}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-150"
                      style={{
                        width: `${durationSec ? (progress / durationSec) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>

                <button
                  className="flex-shrink-0 text-gray-400 hover:text-purple-600 transition-colors"
                  aria-label="Volume"
                >
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Hidden audio element */}
              <audio ref={audioRef} preload="auto" className="hidden" />

              {/* Fragen (Questions) - Below player */}
              <div className="mb-4 flex-shrink-0">
                <button
                  onClick={() => setShowQuestions(!showQuestions)}
                  className="w-full flex items-center justify-between py-2.5 px-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-sm font-semibold text-gray-900"
                  aria-expanded={showQuestions}
                >
                  <span>Fragen</span>
                  <span className="text-purple-600 text-lg">
                    {showQuestions ? "−" : "+"}
                  </span>
                </button>

                {showQuestions && (
                  <div className="mt-3 space-y-2 px-2">
                    {exercise.questions.map((q, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 text-sm">{q}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile dropdown toggle for description - positioned after Fragen */}
              <button
                onClick={() => setShowTextMobile(!showTextMobile)}
                className="lg:hidden mb-3 w-full flex items-center justify-between py-2 px-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-sm font-medium text-purple-700 flex-shrink-0"
                aria-expanded={showTextMobile}
              >
                <span>Beschreibung anzeigen</span>
                <span className="text-lg">{showTextMobile ? "−" : "+"}</span>
              </button>

              {/* Scrollable text content - collapsible on mobile, always visible on desktop */}
              <div
                className={`overflow-y-auto pr-1 sm:pr-2 -mr-1 sm:-mr-2 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent transition-all duration-300 mb-4 ${
                  showTextMobile ? "block" : "hidden lg:block"
                }`}
              >
                <div className="prose prose-gray max-w-none">
                  {getTranscriptionText()
                    .split("\n\n")
                    .filter((p) => p.trim())
                    .map((paragraph, idx) => (
                      <p
                        key={idx}
                        className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base first:mt-0"
                      >
                        {paragraph}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Zusatzfragen - Full width below (all screens) */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm sm:text-base font-semibold text-gray-900">
                Zusatzfragen
              </h4>
              <span className="text-xs sm:text-sm text-gray-500">
                {exercise.additionalQuestions.length} Fragen
              </span>
            </div>

            <div className="overflow-x-auto -mx-2 px-2 pb-2">
              <div className="flex gap-3 sm:gap-4 snap-x snap-mandatory">
                {exercise.additionalQuestions.map((item, idx) => (
                  <div
                    key={idx}
                    className="snap-center flex-shrink-0 w-72 sm:w-80 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-4 sm:p-5 shadow-sm border border-purple-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                        {idx + 1}
                      </span>
                      <div className="font-semibold text-gray-900 text-sm sm:text-base leading-snug">
                        {item.question}
                      </div>
                    </div>
                    <div className="text-gray-700 text-sm leading-relaxed pl-8 sm:pl-10">
                      {item.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
