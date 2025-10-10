import React, { useState, useRef, useEffect } from "react";

export default function AudioPlayer({
  audioFile,
  title,
  onTimeUpdate,
  seekTime,
  autoPlayOnSeek,
  questions = [],
  currentQuestion,
  answers = {},
  onQuestionJump,
  totalDuration = 1300, // 21.5 minutes in seconds
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      if (onTimeUpdate) {
        onTimeUpdate(audio.currentTime);
      }
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, [onTimeUpdate]);

  // Handle seeking from external components
  useEffect(() => {
    if (seekTime !== null && audioRef.current) {
      audioRef.current.currentTime = seekTime;
      if (autoPlayOnSeek && !isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  }, [seekTime, autoPlayOnSeek, isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    const audio = audioRef.current;
    if (!audio) return;

    setVolume(newVolume);
    audio.volume = newVolume;

    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const handleTimelineClick = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = clickX / rect.width;
    const newTime = clickPercent * (duration || totalDuration);

    audio.currentTime = newTime;
    if (onQuestionJump) {
      onQuestionJump(newTime);
    }
  };

  const handleQuestionMarkerClick = (timestamp) => {
    const audio = audioRef.current;
    if (!audio) return;

    // Pause audio first to prevent conflicts
    const wasPlaying = isPlaying;
    if (wasPlaying) {
      audio.pause();
      setIsPlaying(false);
    }

    // Set the audio time
    audio.currentTime = timestamp;
    setCurrentTime(timestamp);

    // Call the parent's jump handler
    if (onQuestionJump) {
      onQuestionJump(timestamp);
    }

    // Resume playing if it was playing before
    if (wasPlaying) {
      setTimeout(() => {
        audio.play();
        setIsPlaying(true);
      }, 100);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const usedDuration = duration || totalDuration;
  const progressPercentage = usedDuration
    ? (currentTime / usedDuration) * 100
    : 0;

  return (
    <div className="group bg-gradient-to-br from-white via-purple-50 to-indigo-50 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-4 sm:p-6">
      <audio ref={audioRef} src={audioFile} preload="metadata" />

      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M8.464 15.536a5 5 0 01-7.072 0M2.636 5.636a9 9 0 000 12.728"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              DTZ B1 Hörprüfung - Vollständiger Test
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Controls with Integrated Progress Bar */}
      <div className="flex items-center justify-center mb-4 sm:mb-6">
        <div className="flex items-center gap-3 sm:gap-4 w-full max-w-2xl">
          {/* Play Button */}
          <button
            onClick={togglePlay}
            className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {isPlaying ? (
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Progress Bar */}
          <div className="flex-1">
            <div
              className="relative w-full h-2 sm:h-3 bg-white/80 rounded-full cursor-pointer shadow-inner border border-white/50"
              onClick={handleTimelineClick}
            >
              {/* Progress Fill */}
              <div
                className="absolute top-0 left-0 h-2 sm:h-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-150 shadow-sm"
                style={{ width: `${progressPercentage}%` }}
              />

              {/* Progress Handle */}
              <div
                className="absolute top-0 w-4 h-4 sm:w-5 sm:h-5 bg-white shadow-lg transform -translate-x-2 -translate-y-1 sm:-translate-x-2.5 sm:-translate-y-1 rounded-full border-2 border-purple-500 transition-all duration-150"
                style={{ left: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Volume Control - Only visible on hover */}
          <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 rounded-xl border border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={toggleMute}
              className="w-6 h-6 sm:w-8 sm:h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition-colors"
            >
              {isMuted || volume === 0 ? (
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 sm:w-20 h-2 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(isMuted ? 0 : volume) * 100}%, #e2e8f0 ${(isMuted ? 0 : volume) * 100}%, #e2e8f0 100%)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Question Navigation */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-2 sm:gap-3 min-w-max px-1">
          {questions.map((question, index) => {
            const isAnswered = answers[question.id] !== undefined;
            const isCurrent =
              currentQuestion?.id === question.id ||
              currentQuestion?.pairedQuestion?.id === question.id;

            return (
              <button
                key={question.id}
                onClick={() => handleQuestionMarkerClick(question.timestamp)}
                className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl text-center transition-all duration-200 transform active:scale-95 hover:scale-105 ${
                  isCurrent
                    ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg ring-2 ring-yellow-300"
                    : isAnswered
                      ? "bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-lg"
                      : "bg-white/90 text-slate-600 hover:bg-purple-50 shadow-md border border-white/70"
                }`}
                title={`Frage ${index + 1} - Klicken Sie hier um zu dieser Frage zu springen`}
              >
                <div className="text-sm sm:text-base font-bold">
                  {index + 1}
                </div>
                {isAnswered && (
                  <div className="text-xs opacity-90 -mt-1">
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
