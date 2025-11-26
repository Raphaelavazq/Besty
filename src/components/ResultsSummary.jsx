import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { gsap } from "gsap";
import {
  Trophy,
  Award,
  Brain,
  CheckCircle,
  XCircle,
  Target,
  Eye,
  RefreshCw,
  Home,
  Sparkles,
  TrendingUp,
} from "lucide-react";

/**
 * ResultsSummary - Animated results page for test completion
 *
 * Features:
 * - Confetti animation for passing tests
 * - GSAP number counter animations
 * - Mobile-optimized app-style layout
 * - Encouraging messages for all outcomes
 * - Clear call-to-action buttons
 *
 * @param {Object} props
 * @param {number} props.score - Number of correct answers
 * @param {number} props.totalQuestions - Total number of questions
 * @param {boolean} props.isPassed - Whether the test was passed (null for training mode)
 * @param {number} props.requiredScore - Minimum score to pass (e.g., 17 for Probetest)
 * @param {string} props.mode - Test mode: "probetest" or "training"
 * @param {Function} props.onReview - Callback for "Review questions" button
 * @param {Function} props.onRetry - Callback for "Try again" button
 * @param {Function} props.onHome - Callback for "Back to overview" button
 */
export default function ResultsSummary({
  score,
  totalQuestions,
  isPassed,
  requiredScore = 17,
  mode = "training",
  onReview,
  onRetry,
  onHome,
}) {
  const navigate = useNavigate();
  const scoreRef = useRef(null);
  const percentageRef = useRef(null);
  const correctRef = useRef(null);
  const wrongRef = useRef(null);
  const cardRef = useRef(null);

  const totalAnswered = totalQuestions; // Assuming all questions were answered
  const wrongAnswers = totalAnswered - score;
  const percentage = Math.round((score / totalQuestions) * 100);

  // Determine success state
  const isSuccess = mode === "probetest" ? isPassed : percentage >= 70;

  useEffect(() => {
    // Card entrance animation
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      }
    );

    // Number counter animations
    const animateCounter = (ref, endValue, duration = 1.5) => {
      if (!ref.current) return;

      gsap.fromTo(
        ref.current,
        { textContent: 0 },
        {
          textContent: endValue,
          duration,
          ease: "power2.out",
          snap: { textContent: 1 },
          delay: 0.3,
        }
      );
    };

    animateCounter(scoreRef, score);
    animateCounter(percentageRef, percentage);
    animateCounter(correctRef, score, 1);
    animateCounter(wrongRef, wrongAnswers, 1);
  }, [score, percentage, wrongAnswers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-8 px-4 sm:py-12">
      {/* Confetti for success */}
      {isSuccess && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
          colors={["#9333ea", "#6366f1", "#8b5cf6", "#a855f7", "#c084fc"]}
        />
      )}

      <div className="max-w-2xl mx-auto">
        {/* Main Results Card */}
        <div
          ref={cardRef}
          className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-purple-100 dark:border-purple-500/30"
        >
          {/* Icon & Status */}
          <div className="text-center mb-6 sm:mb-8">
            {isSuccess ? (
              <div className="relative inline-block">
                <Trophy className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-yellow-500 animate-bounce" />
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 absolute -top-2 -right-2 animate-pulse" />
              </div>
            ) : (
              <Brain className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-purple-600 dark:text-purple-400" />
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mt-4 sm:mt-6 pb-2">
              {isSuccess
                ? mode === "probetest"
                  ? "Bestanden! 🎉"
                  : "Super gemacht! ✨"
                : mode === "probetest"
                  ? "Weiter üben! 💪"
                  : "Gut geübt! 📚"}
            </h1>

            {/* Motivational subtitle */}
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-2 sm:mt-3">
              {isSuccess
                ? mode === "probetest"
                  ? "Du hast den Test erfolgreich bestanden!"
                  : "Du machst großartige Fortschritte!"
                : mode === "probetest"
                  ? "Noch ein bisschen Übung, dann schaffst du es!"
                  : "Jede Übung bringt dich weiter!"}
            </p>
          </div>

          {/* Score Display */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div
              ref={scoreRef}
              className={`text-5xl sm:text-6xl md:text-7xl font-black ${
                isSuccess
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-purple-600 dark:text-purple-400"
              }`}
            >
              0
            </div>
            <div className="text-2xl sm:text-3xl text-gray-400">/</div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-600 dark:text-gray-300">
              {totalQuestions}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {/* Correct */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-3 sm:p-4 border-2 border-emerald-200 dark:border-emerald-500/30 transform hover:scale-105 transition-transform">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
              <div
                ref={correctRef}
                className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400"
              >
                0
              </div>
              <div className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Richtig
              </div>
            </div>

            {/* Wrong */}
            <div className="bg-rose-50 dark:bg-rose-900/20 rounded-2xl p-3 sm:p-4 border-2 border-rose-200 dark:border-rose-500/30 transform hover:scale-105 transition-transform">
              <XCircle className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-rose-600 dark:text-rose-400" />
              <div
                ref={wrongRef}
                className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400"
              >
                0
              </div>
              <div className="text-xs sm:text-sm font-medium text-rose-700 dark:text-rose-300">
                Falsch
              </div>
            </div>

            {/* Percentage */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-3 sm:p-4 border-2 border-purple-200 dark:border-purple-500/30 transform hover:scale-105 transition-transform">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
              <div className="flex items-baseline justify-center">
                <div
                  ref={percentageRef}
                  className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400"
                >
                  0
                </div>
                <span className="text-lg sm:text-xl font-bold text-purple-600 dark:text-purple-400">
                  %
                </span>
              </div>
              <div className="text-xs sm:text-sm font-medium text-purple-700 dark:text-purple-300">
                Quote
              </div>
            </div>
          </div>

          {/* Pass/Fail Info for Probetest */}
          {mode === "probetest" && (
            <div
              className={`mb-6 sm:mb-8 p-4 sm:p-5 rounded-2xl border-2 ${
                isPassed
                  ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-500/30"
                  : "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-500/30"
              }`}
            >
              <div className="flex items-start gap-3">
                {isPassed ? (
                  <Award className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                )}
                <p
                  className={`text-sm sm:text-base font-medium ${
                    isPassed
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-purple-700 dark:text-purple-300"
                  }`}
                >
                  {isPassed
                    ? `Herzlichen Glückwunsch! Du hast die erforderlichen ${requiredScore} von ${totalQuestions} Fragen richtig beantwortet.`
                    : `Du brauchst mindestens ${requiredScore} richtige Antworten. Du bist auf dem richtigen Weg – weiter so!`}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 sm:space-y-4">
            {/* Primary CTA - Review */}
            <button
              onClick={onReview}
              className="w-full px-6 py-3.5 sm:py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 sm:gap-3 group"
            >
              <Eye className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
              {isSuccess
                ? "Fragen überprüfen"
                : wrongAnswers > 0
                  ? "Falsche Fragen ansehen"
                  : "Fragen überprüfen"}
            </button>

            {/* Secondary CTA - Retry */}
            <button
              onClick={onRetry}
              className="w-full px-6 py-3 sm:py-3.5 bg-white dark:bg-white/10 text-purple-600 dark:text-purple-400 border-2 border-purple-300 dark:border-purple-500/50 rounded-2xl font-bold text-base sm:text-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-400 transition-all flex items-center justify-center gap-2 group"
            >
              <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-180 transition-transform duration-500" />
              {mode === "probetest" ? "Nochmal versuchen" : "Erneut üben"}
            </button>

            {/* Tertiary CTA - Home */}
            <button
              onClick={onHome}
              className="w-full px-6 py-2.5 sm:py-3 bg-transparent text-purple-600 dark:text-purple-400 rounded-2xl font-semibold text-base hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Zurück zur Übersicht
            </button>
          </div>
        </div>

        {/* Encouragement Card (for non-passed tests) */}
        {!isSuccess && mode === "probetest" && (
          <div className="mt-6 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-purple-200 dark:border-purple-500/30 animate-pulse">
            <div className="flex items-start gap-3 sm:gap-4">
              <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 dark:text-purple-400 flex-shrink-0" />
              <div>
                <h3 className="text-lg sm:text-xl font-black text-purple-900 dark:text-purple-200 mb-2">
                  Tipps zum Weiterlernen
                </h3>
                <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-purple-800 dark:text-purple-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5">
                      •
                    </span>
                    <span>Schau dir die falschen Antworten genau an</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5">
                      •
                    </span>
                    <span>Übe gezielt schwierige Themen im Training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5">
                      •
                    </span>
                    <span>Wiederhole den Test regelmäßig</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
