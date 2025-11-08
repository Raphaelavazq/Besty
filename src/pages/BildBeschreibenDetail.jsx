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
      const response = await fetch("/api/tts", {
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

    // If no audio loaded yet, generate TTS for the description
    if (!playerSrc || !a.src) {
      await handlePlaySample();
      return;
    }

    // Otherwise toggle play/pause
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary">
      {/* Minimal Header */}
      <div className="bg-white/95 backdrop-blur-md dark:bg-dark-bg-secondary/95 border-b border-purple-100 dark:border-purple-500/20 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Icon-only back button */}
            <Link
              to="/tests/sprechen/bild-beschreiben"
              className="w-10 h-10 rounded-full bg-white hover:bg-purple-50 dark:bg-white/10 dark:hover:bg-white/20 border border-purple-100 dark:border-purple-500/30 hover:border-purple-300 dark:hover:border-purple-500/50 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group shadow-sm"
              aria-label="Zurück"
            >
              <ArrowLeft className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:-translate-x-0.5 transition-transform duration-200" />
            </Link>

            {/* Compact exercise number badge */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-3 py-1.5 rounded-full border border-purple-100 dark:border-purple-500/30">
                #{exercise.id}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Clean modern layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Compact title */}
        <div className="mb-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent tracking-tight">
            {exercise.title}
          </h1>
        </div>

        {/* Two-column layout on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Left: Image + Audio Player */}
          <div className="space-y-4">
            {/* Image - Clean presentation */}
            <div className="relative bg-white/90 backdrop-blur-md dark:bg-white/5 rounded-2xl p-4 shadow-lg border border-purple-100 dark:border-purple-500/20">
              <div className="aspect-[4/3] flex items-center justify-center">
                <img
                  src={exercise.imageUrl}
                  alt={exercise.title}
                  className="max-w-full max-h-full object-contain rounded-xl"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/800x600/7c3aed/ffffff?text=Bild+nicht+verfügbar";
                  }}
                />
              </div>
            </div>

            {/* Compact Audio Player */}
            <div className="bg-white/90 backdrop-blur-md dark:bg-white/5 rounded-2xl p-4 shadow-lg border border-purple-100 dark:border-purple-500/20 group">
              <div className="flex items-center gap-3">
                {/* Play button */}
                <button
                  onClick={togglePlayPause}
                  disabled={isSpeaking}
                  className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={isPlayingLocal ? "Pause" : "Abspielen"}
                >
                  {isSpeaking ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : isPlayingLocal ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  )}
                </button>

                {/* Progress */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[10px] text-gray-500 dark:text-dark-text-muted mb-1">
                    <span className="truncate font-medium">
                      {isSpeaking ? "Lädt..." : "Beispielantwort"}
                    </span>
                    <span className="flex-shrink-0 ml-2 tabular-nums">
                      {durationSec > 0
                        ? `${Math.floor(progress / 60)}:${String(Math.floor(progress % 60)).padStart(2, "0")}`
                        : exercise.duration || "1:20"}
                    </span>
                  </div>
                  <div
                    className="w-full h-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-full cursor-pointer overflow-hidden hover:h-2 transition-all"
                    onClick={handleSeek}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-400 dark:to-indigo-500 rounded-full transition-all duration-150"
                      style={{
                        width: `${durationSec ? (progress / durationSec) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Volume - appears on hover */}
              <div className="flex items-center gap-2 px-2 mt-3 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-10 transition-all duration-200 overflow-hidden">
                <Volume2 className="w-3 h-3 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => handleVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1 bg-purple-100 dark:bg-purple-900/30 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none 
                    [&::-webkit-slider-thumb]:w-3
                    [&::-webkit-slider-thumb]:h-3
                    [&::-webkit-slider-thumb]:rounded-full 
                    [&::-webkit-slider-thumb]:bg-gradient-to-r
                    [&::-webkit-slider-thumb]:from-purple-600
                    [&::-webkit-slider-thumb]:to-indigo-600
                    dark:[&::-webkit-slider-thumb]:from-purple-500
                    dark:[&::-webkit-slider-thumb]:to-indigo-500
                    [&::-webkit-slider-thumb]:cursor-pointer 
                    hover:[&::-webkit-slider-thumb]:scale-110
                    [&::-webkit-slider-thumb]:transition-transform"
                />
                <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 w-8 text-right flex-shrink-0">
                  {Math.round(volume * 100)}%
                </span>
              </div>

              <audio ref={audioRef} preload="auto" className="hidden" />
            </div>
          </div>

          {/* Right: Content (Description + Questions) */}
          <div className="space-y-4">
            {/* Description */}
            <div className="bg-white/90 backdrop-blur-md dark:bg-white/5 rounded-2xl p-5 shadow-lg border border-purple-100 dark:border-purple-500/20 max-h-[500px] overflow-y-auto">
              <div className="prose prose-sm prose-gray max-w-none">
                {getTranscriptionText()
                  .split("\n\n")
                  .filter((p) => p.trim())
                  .map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-gray-700 dark:text-dark-text-secondary leading-relaxed mb-3 text-sm first:mt-0"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>

            {/* Questions - Compact collapsible */}
            <details className="bg-white/90 backdrop-blur-md dark:bg-white/5 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-500/20 group">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-purple-50/50 dark:hover:bg-white/10 rounded-2xl transition-colors">
                <span className="text-sm font-bold text-gray-900 dark:text-dark-text-primary">Fragen</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                    {exercise.questions.length}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-open:rotate-180 transition-transform duration-200">
                    <span className="text-purple-600 dark:text-purple-400 text-xs">▼</span>
                  </div>
                </div>
              </summary>
              <div className="px-4 pb-4 space-y-2">
                {exercise.questions.map((q, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-purple-50/50 dark:hover:bg-white/5 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">
                        {i + 1}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-dark-text-secondary text-sm leading-snug">{q}</p>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>

        {/* Zusatzfragen - Modern card grid */}
        {exercise.additionalQuestions &&
          exercise.additionalQuestions.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text-primary">
                  Zusatzfragen
                </h3>
                <span className="text-xs text-purple-600 dark:text-purple-400 font-medium bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-full">
                  {exercise.additionalQuestions.length}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {exercise.additionalQuestions.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/90 backdrop-blur-md dark:bg-white/5 rounded-xl p-4 shadow-sm border border-purple-100 dark:border-purple-500/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                        <span className="text-white text-xs font-bold">
                          {idx + 1}
                        </span>
                      </div>
                      <p className="font-semibold text-gray-900 dark:text-dark-text-primary text-sm leading-snug">
                        {item.question}
                      </p>
                    </div>
                    <p className="text-gray-600 dark:text-dark-text-muted text-xs leading-relaxed pl-8">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
