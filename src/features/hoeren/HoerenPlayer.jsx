/**
 * HoerenPlayer - Audio player for DTZ Hören tests
 * Displays question and audio controls
 * Mode-aware: Übung allows replay, Prüfung doesn't
 */

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  triggerHaptic,
  triggerSuccessHaptic,
  triggerErrorHaptic,
} from "../../utils/haptics";

export default function HoerenPlayer({
  mode = "pruefung",
  audioFile,
  item,
  pairedItem = null, // For Teil 3: second question in the pair
  onAnswer,
  onAnswerPaired = null, // For Teil 3: answer handler for second question
  onNext,
  showFeedback = false,
  selectedAnswer = null,
  selectedAnswerPaired = null, // For Teil 3: selected answer for second question
  allowReplay = false,
  totalItems = 20,
  currentItemNumber = 1,
  statements = null, // For Teil 4 matching questions
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoadingAudio, setIsLoadingAudio] = useState(true);
  const [hideAudioPlayer, setHideAudioPlayer] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef(null);
  const lastScrollY = useRef(0);

  // Auto-play when audio loads (exam behavior) and seek to startTime
  useEffect(() => {
    if (audioRef.current) {
      setIsLoadingAudio(true);
      setAudioError(false);

      const handleCanPlay = () => {
        setIsLoadingAudio(false);
        setAudioError(false);
      };

      const handleError = () => {
        setIsLoadingAudio(false);
        setAudioError(true);
        triggerErrorHaptic();
      };

      audioRef.current.addEventListener("canplay", handleCanPlay);
      audioRef.current.addEventListener("error", handleError);

      // Seek to startTime if specified
      if (item.startTime !== undefined && item.startTime > 0) {
        audioRef.current.currentTime = item.startTime;
      }

      if (mode === "pruefung") {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setHasPlayed(true);
            })
            .catch((err) => {
              console.log("Autoplay prevented:", err);
            });
        }
      }

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("canplay", handleCanPlay);
          audioRef.current.removeEventListener("error", handleError);
        }
      };
    }
  }, [audioFile, mode, item.startTime]);

  // Hide audio player on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down & past threshold
        setHideAudioPlayer(true);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setHideAudioPlayer(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      triggerHaptic();
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      setHasPlayed(true);
      triggerHaptic();
    }
  };

  const handleReplay = () => {
    if (!audioRef.current || !allowReplay) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
    triggerHaptic();
  };

  const handleAnswerSelect = (answer) => {
    triggerHaptic();
    if (onAnswer) {
      onAnswer(answer);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getOptionLabel = (index) => {
    if (item.type === "tf") {
      return index === 0 ? "Richtig" : "Falsch";
    }
    return String.fromCharCode(97 + index); // a, b, c, d, e, f
  };

  const isCorrect = showFeedback && selectedAnswer === item.correct;
  const isWrong =
    showFeedback && selectedAnswer && selectedAnswer !== item.correct;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Audio Error Banner */}
      {audioError && (
        <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-500/50 rounded-xl p-4 mb-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 dark:text-red-200 font-medium text-sm lg:text-base">
              Audio konnte nicht geladen werden
            </p>
            <p className="text-red-700 dark:text-red-300 text-xs lg:text-sm mt-1">
              Überprüfe deine Internetverbindung und versuche es erneut.
            </p>
          </div>
        </div>
      )}

      {/* Audio Player - Hides on scroll down, shows on scroll up */}
      <div
        className={`sticky top-0 z-20 bg-white/95 dark:bg-white/10 backdrop-blur-md rounded-2xl lg:rounded-3xl shadow-lg p-4 lg:p-8 mb-4 lg:mb-6 border transition-all duration-300 ${
          isPlaying
            ? "border-purple-400 dark:border-purple-500/60 shadow-purple-200 dark:shadow-purple-900/50 shadow-xl"
            : "border-purple-200 dark:border-purple-400/40"
        } ${hideAudioPlayer ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}
      >
        {/* Compact Header - Mobile */}
        <div className="flex items-center justify-between mb-3 lg:mb-6">
          <div className="flex items-center gap-2 lg:gap-3 min-w-0 flex-1">
            <Volume2 className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600 dark:text-purple-400 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h3 className="text-sm lg:text-lg font-bold text-gray-900 dark:text-dark-text-primary truncate">
                Aufgabe {item.no || currentItemNumber}
              </h3>
              <p className="text-xs lg:text-sm text-gray-500 dark:text-dark-text-muted">
                {currentItemNumber} von {totalItems}
              </p>
            </div>
          </div>

          {mode === "uebung" && (
            <span className="px-2 lg:px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs lg:text-sm font-medium flex-shrink-0">
              Übung
            </span>
          )}
        </div>

        {/* Audio Controls - Compact on Mobile */}
        <div className="space-y-2 lg:space-y-4">
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Play Button - Smaller on Mobile */}
            <button
              onClick={togglePlay}
              disabled={isLoadingAudio}
              className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center hover:shadow-lg transition-all hover:scale-105 flex-shrink-0 ${
                isLoadingAudio ? "opacity-50 cursor-wait" : ""
              }`}
            >
              {isLoadingAudio ? (
                <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-5 h-5 lg:w-6 lg:h-6" />
              ) : (
                <Play className="w-5 h-5 lg:w-6 lg:h-6 ml-0.5" />
              )}
            </button>

            {/* Time Display - Compact */}
            <div className="flex-1 min-w-0">
              <div className="text-xs lg:text-sm text-gray-600 dark:text-dark-text-secondary mb-1">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>

              {/* Progress Bar - Inline */}
              <div className="w-full h-1.5 lg:h-2 bg-purple-100 dark:bg-purple-900/30 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 transition-all ${
                    isPlaying ? "animate-pulse" : ""
                  }`}
                  style={{
                    width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Replay Button - Icon only on mobile */}
            {allowReplay && hasPlayed && (
              <button
                onClick={handleReplay}
                className="w-10 h-10 lg:w-auto lg:h-auto lg:px-4 lg:py-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors flex items-center justify-center lg:gap-2 flex-shrink-0"
                title="Nochmal hören"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden lg:inline">Nochmal hören</span>
              </button>
            )}
          </div>
        </div>

        <audio
          ref={audioRef}
          src={`/audio/hoeren/${audioFile}`}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
      </div>

      {/* Statements Box (Teil 4 only) - Interactive & Compact */}
      {statements && item.type === "match" && (
        <div className="bg-purple-50/80 dark:bg-white/10 backdrop-blur-md rounded-2xl lg:rounded-3xl shadow-lg p-4 lg:p-6 mb-4 lg:mb-6 border border-purple-200 dark:border-purple-400/40">
          <h3 className="text-base lg:text-lg font-bold text-gray-900 dark:text-dark-text-primary mb-2 lg:mb-4">
            Aussagen zum Thema "Kinder und Internet"
          </h3>
          <p className="text-xs lg:text-sm text-gray-600 dark:text-dark-text-secondary mb-3 lg:mb-4">
            Welche Aussage passt?
          </p>
          <div className="space-y-2 lg:space-y-3 max-w-full">
            {statements.map((statement, index) => {
              const optionValue = String.fromCharCode(97 + index); // a, b, c, d, e, f
              const isSelected = selectedAnswer === optionValue;
              const isCorrectOption =
                showFeedback && item.correct === optionValue;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(optionValue)}
                  disabled={showFeedback}
                  className={`w-full flex gap-2 lg:gap-3 p-3 lg:p-4 rounded-xl border-2 text-left text-sm lg:text-base transition-all break-words ${
                    isSelected && isCorrectOption
                      ? "border-green-500 bg-green-50 dark:bg-green-900/30"
                      : isSelected && !isCorrectOption && showFeedback
                        ? "border-red-500 bg-red-50 dark:bg-red-900/30"
                        : isSelected
                          ? "border-purple-600 dark:border-purple-500 bg-purple-100 dark:bg-purple-900/30"
                          : isCorrectOption && showFeedback
                            ? "border-green-500 bg-green-50 dark:bg-green-900/30"
                            : "border-purple-200 dark:border-purple-400/40 bg-white/60 dark:bg-white/5 hover:border-purple-400 dark:hover:border-purple-400/60 hover:bg-purple-50 dark:hover:bg-white/10"
                  } ${showFeedback ? "cursor-default" : "cursor-pointer"}`}
                >
                  <span
                    className={`w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center font-bold text-xs lg:text-sm flex-shrink-0 ${
                      isSelected
                        ? "bg-purple-600 dark:bg-purple-500 text-white"
                        : "bg-purple-200 dark:bg-purple-900/50 text-purple-900 dark:text-purple-300"
                    }`}
                  >
                    {optionValue}
                  </span>
                  <p className="text-gray-800 dark:text-dark-text-primary leading-snug flex-1 break-words line-clamp-3">
                    {statement}
                  </p>
                  {showFeedback && isCorrectOption && (
                    <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-600 flex-shrink-0" />
                  )}
                  {showFeedback && isSelected && !isCorrectOption && (
                    <XCircle className="w-5 h-5 lg:w-6 lg:h-6 text-red-600 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Message for Teil 4 */}
          {showFeedback && (
            <div
              className={`p-4 rounded-xl mt-4 ${
                isCorrect
                  ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                  : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
              }`}
            >
              <p className="font-medium">
                {isCorrect
                  ? "✓ Richtig!"
                  : `✗ Falsch. Die richtige Antwort ist "${statements[item.correct.charCodeAt(0) - 97]}"`}
              </p>
            </div>
          )}

          {/* Next Button for Teil 4 */}
          {selectedAnswer && (
            <div className="sticky bottom-0 bg-gradient-to-t from-white dark:from-dark-bg-primary via-white dark:via-dark-bg-primary to-transparent pt-4 pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6">
              <button
                onClick={onNext}
                className="w-full py-3 lg:py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 text-white font-bold hover:shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                {currentItemNumber >= totalItems ? "Abschließen" : "Weiter →"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Floating Mini Play Button - Shows when audio player is hidden */}
      {hideAudioPlayer && (
        <button
          onClick={() => {
            setHideAudioPlayer(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="fixed top-4 right-4 z-30 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 text-white shadow-xl flex items-center justify-center hover:scale-110 transition-all active:scale-95"
          aria-label="Audio Player anzeigen"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
      )}

      {/* Question Card(s) - Hide for Teil 4 matching (statements shown above) */}
      {item.type !== "match" && (
        <div
          className={`bg-white/90 dark:bg-white/10 backdrop-blur-md rounded-2xl lg:rounded-3xl shadow-lg p-4 sm:p-6 lg:p-8 border ${
            hideAudioPlayer
              ? "max-h-[calc(100vh-120px)]"
              : "max-h-[calc(100vh-200px)]"
          } overflow-y-auto ${
            isCorrect
              ? "border-green-300 dark:border-green-500/50 bg-green-50/50 dark:bg-green-900/20"
              : isWrong
                ? "border-red-300 dark:border-red-500/50 bg-red-50/50 dark:bg-red-900/20"
                : "border-purple-200 dark:border-purple-400/40"
          }`}
        >
          {/* Teil 3 Pairing Indicator */}
          {pairedItem && (
            <div className="mb-4 px-3 py-2 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-500/40 rounded-xl">
              <p className="text-xs lg:text-sm text-purple-700 dark:text-purple-300 font-medium text-center">
                📎 Beide Fragen zu einem Audio • {item.no} & {pairedItem.no}
              </p>
            </div>
          )}

          {/* First Question (or single question) */}
          <div
            className={
              pairedItem
                ? "mb-6 pb-6 border-b-2 border-purple-100 dark:border-purple-500/30"
                : ""
            }
          >
            <h2 className="text-base lg:text-xl font-bold text-gray-900 dark:text-dark-text-primary mb-4 leading-snug">
              {pairedItem && (
                <span className="text-purple-600 dark:text-purple-400 mr-2">
                  {item.no}.
                </span>
              )}
              {item.question}
            </h2>

            {/* Answer Options - Compact on Mobile */}
            <div className="flex gap-2 lg:gap-3">
              {item.options.map((option, index) => {
                const optionValue = getOptionLabel(index);
                const isSelected = selectedAnswer === optionValue;
                const isCorrectOption =
                  showFeedback && item.correct === optionValue;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(optionValue)}
                    disabled={showFeedback}
                    className={`flex-1 px-4 py-4 lg:px-6 lg:py-5 rounded-xl border-2 text-sm lg:text-base font-medium transition-all ${
                      isSelected && isCorrectOption
                        ? "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-900 dark:text-green-200"
                        : isSelected && showFeedback && !isCorrectOption
                          ? "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-900 dark:text-red-200"
                          : isSelected
                            ? "border-purple-600 dark:border-purple-500 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 text-white"
                            : isCorrectOption && showFeedback
                              ? "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-900 dark:text-green-200"
                              : "border-gray-300 dark:border-purple-400/40 bg-white dark:bg-white/5 text-gray-700 dark:text-dark-text-primary hover:border-purple-400 dark:hover:border-purple-400/60 hover:bg-purple-50 dark:hover:bg-white/10"
                    } ${showFeedback ? "cursor-default" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span>{option}</span>
                      {showFeedback && isCorrectOption && (
                        <CheckCircle className="w-5 h-5" />
                      )}
                      {showFeedback && isSelected && !isCorrectOption && (
                        <XCircle className="w-5 h-5" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback Message for first question */}
            {showFeedback && (
              <div
                className={`p-3 lg:p-4 rounded-xl mt-3 lg:mt-4 ${
                  isCorrect
                    ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                    : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                }`}
              >
                <p className="text-sm lg:text-base font-medium">
                  {isCorrect
                    ? "✓ Richtig!"
                    : "✗ Falsch. Die richtige Antwort ist " + item.correct}
                </p>
              </div>
            )}
          </div>

          {/* Second Question (Teil 3 paired questions only) */}
          {pairedItem && (
            <div>
              <h2 className="text-base lg:text-xl font-bold text-gray-900 dark:text-dark-text-primary mb-4 leading-snug">
                <span className="text-purple-600 dark:text-purple-400 mr-2">
                  {pairedItem.no}.
                </span>
                {pairedItem.question}
              </h2>

              {/* Answer Options for second question - Compact */}
              <div className="space-y-2 lg:space-y-3">
                {pairedItem.options.map((option, index) => {
                  const optionValue =
                    index === 0 ? "a" : index === 1 ? "b" : "c";
                  const isSelected = selectedAnswerPaired === optionValue;
                  const isCorrectOption =
                    showFeedback && pairedItem.correct === optionValue;

                  return (
                    <button
                      key={index}
                      onClick={() =>
                        onAnswerPaired && onAnswerPaired(optionValue)
                      }
                      disabled={showFeedback}
                      className={`w-full p-3 lg:p-4 rounded-xl border-2 text-left text-sm lg:text-base font-medium transition-all ${
                        isSelected && showFeedback && isCorrectOption
                          ? "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-900 dark:text-green-200"
                          : isSelected && showFeedback && !isCorrectOption
                            ? "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-900 dark:text-red-200"
                            : isSelected
                              ? "border-purple-600 dark:border-purple-500 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 text-white"
                              : isCorrectOption && showFeedback
                                ? "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-900 dark:text-green-200"
                                : "border-gray-300 dark:border-purple-400/40 bg-white dark:bg-white/5 text-gray-700 dark:text-dark-text-primary hover:border-purple-400 dark:hover:border-purple-400/60 hover:bg-purple-50 dark:hover:bg-white/10"
                      } ${showFeedback ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 lg:gap-3 min-w-0 flex-1">
                          <span
                            className={`text-xs lg:text-sm font-bold min-w-[18px] lg:min-w-[20px] flex-shrink-0 ${isSelected ? "text-white/80" : "text-gray-500 dark:text-dark-text-muted"}`}
                          >
                            {optionValue})
                          </span>
                          <span className="break-words">{option}</span>
                        </div>

                        {showFeedback && isCorrectOption && (
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                        )}
                        {showFeedback && isSelected && !isCorrectOption && (
                          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Message for second question */}
              {showFeedback && (
                <div
                  className={`p-3 lg:p-4 rounded-xl mt-3 lg:mt-4 ${
                    selectedAnswerPaired === pairedItem.correct
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                      : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                  }`}
                >
                  <p className="text-sm lg:text-base font-medium">
                    {selectedAnswerPaired === pairedItem.correct
                      ? "✓ Richtig!"
                      : "✗ Falsch. Die richtige Antwort ist " +
                        pairedItem.correct}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Next Button - only show when both questions are answered (if paired) */}
          {((pairedItem && selectedAnswer && selectedAnswerPaired) ||
            (!pairedItem && selectedAnswer) ||
            showFeedback) && (
            <div className="sticky bottom-0 bg-gradient-to-t from-white dark:from-dark-bg-primary via-white dark:via-dark-bg-primary to-transparent pt-4 pb-1 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <button
                onClick={onNext}
                className="w-full py-3 lg:py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 text-white text-sm lg:text-base font-bold hover:shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                {currentItemNumber >= totalItems ? "Abschließen" : "Weiter →"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
