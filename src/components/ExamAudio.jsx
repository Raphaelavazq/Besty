import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  AlertCircle,
} from "lucide-react";

export default function ExamAudio({
  src,
  examMode = true,
  onTimeUpdate,
  onEnded,
  onLoadedMetadata,
  allowedSeekTime = 0,
  className = "",
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSeekWarning, setShowSeekWarning] = useState(false);
  const [maxPlayedTime, setMaxPlayedTime] = useState(0);

  // Update max played time as audio progresses
  useEffect(() => {
    if (currentTime > maxPlayedTime) {
      setMaxPlayedTime(currentTime);
    }
  }, [currentTime, maxPlayedTime]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      setCurrentTime(time);

      if (onTimeUpdate) {
        onTimeUpdate(time);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoading(false);

      if (onLoadedMetadata) {
        onLoadedMetadata(audioRef.current.duration);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (onEnded) {
      onEnded();
    }
  };

  const handleSeek = (newTime) => {
    if (!audioRef.current) return;

    // In exam mode, prevent seeking ahead beyond what has been played
    if (examMode) {
      const maxAllowedTime = Math.max(maxPlayedTime, allowedSeekTime);

      if (newTime > maxAllowedTime + 1) {
        // Allow 1 second tolerance
        // Show warning and snap back
        setShowSeekWarning(true);
        audioRef.current.currentTime = Math.min(currentTime, maxAllowedTime);

        setTimeout(() => setShowSeekWarning(false), 2000);
        return;
      }
    }

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSeekBar = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;

    handleSeek(newTime);
  };

  const handleVolumeChange = (newVolume) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const skip = (seconds) => {
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    handleSeek(newTime);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgressPercentage = () => {
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  };

  const getMaxPlayedPercentage = () => {
    return duration > 0 ? (maxPlayedTime / duration) * 100 : 0;
  };

  return (
    <div
      className={`bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/50 ${className}`}
    >
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        preload="metadata"
      />

      {/* Seek Warning */}
      {showSeekWarning && (
        <div className="mb-3 p-2 bg-red-100 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle size={16} className="text-red-600" />
          <span className="text-sm font-medium text-red-800">
            Im Prüfungsmodus können Sie nicht vorspulen
          </span>
        </div>
      )}

      {/* Main Controls */}
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={isPlaying ? handlePause : handlePlay}
          disabled={isLoading}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause size={20} />
          ) : (
            <Play size={20} className="ml-0.5" />
          )}
        </button>

        {/* Skip Controls (only in practice mode) */}
        {!examMode && (
          <>
            <button
              onClick={() => skip(-10)}
              className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              title="10 Sekunden zurück"
            >
              <SkipBack size={16} />
            </button>
            <button
              onClick={() => skip(10)}
              className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              title="10 Sekunden vor"
            >
              <SkipForward size={16} />
            </button>
          </>
        )}

        {/* Progress Bar */}
        <div className="flex-1">
          <div
            className="relative h-6 bg-gray-200 rounded-full cursor-pointer group"
            onClick={handleSeekBar}
          >
            {/* Background Track */}
            <div className="absolute inset-0 bg-gray-200 rounded-full" />

            {/* Max Played Track (in exam mode) */}
            {examMode && (
              <div
                className="absolute top-0 left-0 h-full bg-gray-300 rounded-full"
                style={{ width: `${getMaxPlayedPercentage()}%` }}
              />
            )}

            {/* Current Progress */}
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
              style={{ width: `${getProgressPercentage()}%` }}
            />

            {/* Progress Handle */}
            <div
              className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-purple-500 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${getProgressPercentage()}% - 8px)` }}
            />
          </div>

          {/* Time Display */}
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>{formatTime(currentTime)}</span>
            {examMode && (
              <span className="text-purple-600 font-medium">Prüfungsmodus</span>
            )}
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={16} />
            ) : (
              <Volume2 size={16} />
            )}
          </button>

          <div className="w-20">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Exam Mode Info */}
      {examMode && (
        <div className="mt-3 text-xs text-gray-500 text-center">
          ⚠️ Prüfungsmodus: Vorspulen nicht möglich • Maximale Position:{" "}
          {formatTime(maxPlayedTime)}
        </div>
      )}
    </div>
  );
}
