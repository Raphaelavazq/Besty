import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Trophy, CheckCircle, XCircle, Target } from "lucide-react";

/**
 * TrainingResultsSummary - Compact animated results for top of TrainingMode
 *
 * Displays score with GSAP counter animations, then shows review below
 *
 * @param {Object} props
 * @param {number} props.score - Number of correct answers
 * @param {number} props.totalQuestions - Total number of questions
 */
export default function TrainingResultsSummary({ score, totalQuestions }) {
  const scoreRef = useRef(null);
  const percentageRef = useRef(null);
  const correctRef = useRef(null);
  const wrongRef = useRef(null);
  const cardRef = useRef(null);

  const wrongAnswers = totalQuestions - score;
  const percentage = Math.round((score / totalQuestions) * 100);

  useEffect(() => {
    // Card entrance animation
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.95, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.4)",
      }
    );

    // Number counter animations
    const animateCounter = (ref, endValue, duration = 1.2) => {
      if (!ref.current) return;

      gsap.fromTo(
        ref.current,
        { textContent: 0 },
        {
          textContent: endValue,
          duration,
          ease: "power2.out",
          snap: { textContent: 1 },
          delay: 0.2,
        }
      );
    };

    animateCounter(scoreRef, score);
    animateCounter(percentageRef, percentage);
    animateCounter(correctRef, score, 0.8);
    animateCounter(wrongRef, wrongAnswers, 0.8);
  }, [score, percentage, wrongAnswers]);

  return (
    <div
      ref={cardRef}
      className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-100 dark:border-purple-500/30 mb-8"
    >
      <div className="text-center mb-6 sm:mb-8">
        <Trophy className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 text-yellow-500 animate-bounce" />
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div
            ref={scoreRef}
            className="text-5xl sm:text-6xl md:text-7xl font-black text-purple-600 dark:text-purple-400"
          >
            0
          </div>
          <div className="text-2xl sm:text-3xl text-gray-400">/</div>
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-600 dark:text-gray-300">
            {totalQuestions}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {/* Correct */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-emerald-200 dark:border-emerald-500/30 transform hover:scale-105 transition-transform">
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-emerald-600 dark:text-emerald-400" />
            <div
              ref={correctRef}
              className="text-xl sm:text-2xl md:text-3xl font-black text-emerald-600 dark:text-emerald-400"
            >
              0
            </div>
            <div className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Richtig
            </div>
          </div>

          {/* Wrong */}
          <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-rose-200 dark:border-rose-500/30 transform hover:scale-105 transition-transform">
            <XCircle className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-rose-600 dark:text-rose-400" />
            <div
              ref={wrongRef}
              className="text-xl sm:text-2xl md:text-3xl font-black text-rose-600 dark:text-rose-400"
            >
              0
            </div>
            <div className="text-xs sm:text-sm font-medium text-rose-700 dark:text-rose-300">
              Falsch
            </div>
          </div>

          {/* Percentage */}
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-purple-200 dark:border-purple-500/30 transform hover:scale-105 transition-transform">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-purple-600 dark:text-purple-400" />
            <div className="flex items-baseline justify-center">
              <div
                ref={percentageRef}
                className="text-xl sm:text-2xl md:text-3xl font-black text-purple-600 dark:text-purple-400"
              >
                0
              </div>
              <span className="text-base sm:text-lg md:text-xl font-bold text-purple-600 dark:text-purple-400">
                %
              </span>
            </div>
            <div className="text-xs sm:text-sm font-medium text-purple-700 dark:text-purple-300">
              Quote
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
