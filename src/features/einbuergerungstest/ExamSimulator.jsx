import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Trophy,
  Eye,
  Smile,
  Meh,
  Frown,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { supabase } from "../../lib/supabase";
import ResultsSummary from "../../components/ResultsSummary";

export default function ExamSimulator({ mode = "probetest" }) {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedBundesland, setSelectedBundesland] = useState(null);
  const [examQuestions, setExamQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [confidenceRatings, setConfidenceRatings] = useState({}); // 'easy', 'medium', 'hard'
  const [masteredQuestions, setMasteredQuestions] = useState({}); // {idx: true/false}
  const [showResults, setShowResults] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    mode === "probetest" ? 60 * 60 : null
  ); // 60 minutes for exam
  const [timerActive, setTimerActive] = useState(false);

  // Auto-select user's bundesland if authenticated - IMMEDIATELY set it so user skips selection screen
  useEffect(() => {
    if (isAuthenticated && user?.bundesland && !selectedBundesland) {
      setSelectedBundesland(user.bundesland);
    }
  }, [isAuthenticated, user, selectedBundesland]);

  const bundeslaender = [
    "Nordrhein-Westfalen",
    "Baden-Württemberg",
    "Bayern",
    "Berlin",
    "Brandenburg",
    "Bremen",
    "Hamburg",
    "Hessen",
    "Mecklenburg-Vorpommern",
    "Niedersachsen",
    "Rheinland-Pfalz",
    "Saarland",
    "Sachsen",
    "Sachsen-Anhalt",
    "Schleswig-Holstein",
    "Thüringen",
  ];

  // Load all questions
  useEffect(() => {
    fetch("/data/einbuergerungstest/questions.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data.questions].sort(
          (a, b) => parseInt(a.originalNum) - parseInt(b.originalNum)
        );
        setAllQuestions(sorted);
      });
  }, []);

  // Generate exam questions when Bundesland is selected
  useEffect(() => {
    if (!selectedBundesland || allQuestions.length === 0) return;

    const generalQuestions = allQuestions.filter((q) => q.type === "general");
    const stateQuestions = allQuestions.filter(
      (q) => q.type === "state" && q.bundesland === selectedBundesland
    );

    if (mode === "probetest") {
      // Official exam: 30 random general + 3 random state = 33 questions
      const shuffledGeneral = [...generalQuestions].sort(
        () => Math.random() - 0.5
      );
      const shuffledState = [...stateQuestions].sort(() => Math.random() - 0.5);

      const selected = [
        ...shuffledGeneral.slice(0, 30),
        ...shuffledState.slice(0, 3),
      ];

      setExamQuestions(selected);
      setTimerActive(true);
    } else {
      // Training mode: All 310 questions (300 general + 10 state) in RANDOM order
      const training = [...generalQuestions, ...stateQuestions].sort(
        () => Math.random() - 0.5
      );
      setExamQuestions(training);
    }
  }, [selectedBundesland, allQuestions, mode]);

  // Timer countdown for probetest mode
  useEffect(() => {
    if (!timerActive || timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowResults(true);
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, timeLeft]);

  // Load user progress (mastered status and confidence ratings) when entering review mode OR when exam starts
  useEffect(() => {
    if (!isAuthenticated || !user?.id || examQuestions.length === 0) return;
    // Only load in review mode for probetest, but always load for training mode
    if (mode === "probetest" && !reviewMode) return;

    const loadUserProgress = async () => {
      try {
        const questionIds = examQuestions.map((q) => q.id);
        const { data } = await supabase
          .from("question_progress")
          .select("*")
          .eq("user_id", user.id)
          .in("question_id", questionIds);

        if (data) {
          const mastered = {};
          const ratings = {};

          data.forEach((progress) => {
            const questionIndex = examQuestions.findIndex(
              (q) => q.id === progress.question_id
            );
            if (questionIndex !== -1) {
              if (progress.is_mastered) {
                mastered[questionIndex] = true;
              }
              if (progress.confidence_level) {
                ratings[questionIndex] = progress.confidence_level;
              }
            }
          });

          setMasteredQuestions(mastered);
          // Merge with existing confidence ratings (don't overwrite new ones)
          setConfidenceRatings((prev) => ({ ...ratings, ...prev }));
        }
      } catch (error) {
        console.error("Error loading user progress:", error);
      }
    };

    loadUserProgress();
  }, [reviewMode, isAuthenticated, user, examQuestions, mode]);

  const handleAnswer = (optionIndex) => {
    setAnswers({ ...answers, [currentIndex]: optionIndex });
  };

  const handleConfidenceRating = (rating) => {
    setConfidenceRatings({ ...confidenceRatings, [currentIndex]: rating });
  };

  // Save confidence rating to database
  const saveConfidenceRating = async (questionId, rating) => {
    if (!isAuthenticated || !user?.id) return;

    try {
      // Check if progress exists
      const { data: existing } = await supabase
        .from("question_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("question_id", questionId)
        .single();

      if (existing) {
        // Update existing
        await supabase
          .from("question_progress")
          .update({
            confidence_level: rating,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", user.id)
          .eq("question_id", questionId);
      } else {
        // Create new
        await supabase.from("question_progress").insert({
          user_id: user.id,
          question_id: questionId,
          confidence_level: rating,
          marked_for_review: false,
          is_mastered: false,
        });
      }
    } catch (error) {
      console.error("Error saving confidence rating:", error);
    }
  };

  // Toggle mastered status (Ich kann das / Gelernt)
  const toggleMastered = async (questionId, questionIndex) => {
    if (!isAuthenticated || !user?.id) return;

    const newMasteredState = !masteredQuestions[questionIndex];
    setMasteredQuestions({
      ...masteredQuestions,
      [questionIndex]: newMasteredState,
    });

    try {
      // Check if progress exists
      const { data: existing } = await supabase
        .from("question_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("question_id", questionId)
        .single();

      if (existing) {
        // Update existing
        await supabase
          .from("question_progress")
          .update({
            is_mastered: newMasteredState,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", user.id)
          .eq("question_id", questionId);
      } else {
        // Create new
        await supabase.from("question_progress").insert({
          user_id: user.id,
          question_id: questionId,
          confidence_level: null,
          marked_for_review: false,
          is_mastered: newMasteredState,
        });
      }
    } catch (error) {
      console.error("Error toggling mastered:", error);
    }
  };

  const handleNext = () => {
    if (currentIndex < examQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true);
      setTimerActive(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    examQuestions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correct++;
    });
    return correct;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Bundesland selection screen - ONLY show if: 1) Not logged in, OR 2) Logged in but no bundesland selected
  // If logged in with saved bundesland, skip this screen entirely (already set in useEffect above)
  if (!selectedBundesland) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/einbuergerungstest")}
            className="mb-8 flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück zur Übersicht
          </button>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 pb-2">
              {mode === "probetest" ? "Probetest" : "Training"}
            </h1>
            <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
              {mode === "probetest"
                ? "Offizieller Test: 33 Fragen in 60 Minuten"
                : "Alle 310 Fragen zum Üben"}
            </p>
          </div>

          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100 dark:border-purple-500/30 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-dark-text-primary">
              Bundesland auswählen
            </h2>

            <div className="grid gap-3 md:grid-cols-2">
              {bundeslaender.map((land) => (
                <button
                  key={land}
                  onClick={() => setSelectedBundesland(land)}
                  className="text-left p-4 rounded-xl border-2 border-purple-100 dark:border-purple-500/30 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="font-semibold text-gray-900 dark:text-dark-text-primary">
                    {land}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (examQuestions.length === 0) return <div className="p-8">Lädt...</div>;

  if (showResults && !reviewMode) {
    const score = calculateScore();
    const passed = mode === "probetest" ? score >= 17 : null; // Need 17/33 to pass official exam

    return (
      <ResultsSummary
        score={score}
        totalQuestions={examQuestions.length}
        isPassed={passed}
        requiredScore={17}
        mode={mode}
        onReview={() => setReviewMode(true)}
        onRetry={() => {
          setSelectedBundesland(null);
          setExamQuestions([]);
          setCurrentIndex(0);
          setAnswers({});
          setConfidenceRatings({});
          setShowResults(false);
          setReviewMode(false);
          setTimeLeft(mode === "probetest" ? 60 * 60 : null);
          setTimerActive(false);
        }}
        onHome={() => navigate("/einbuergerungstest")}
      />
    );
  }

  // Review mode - show all questions with answers
  if (reviewMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setReviewMode(false)}
              className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Zurück zu Ergebnissen
            </button>

            <div className="text-sm text-gray-600 dark:text-dark-text-secondary">
              {examQuestions.length} Fragen
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-8 pb-2">
            Fragen überprüfen
          </h1>

          <div className="space-y-6">
            {examQuestions.map((q, idx) => {
              const userAnswer = answers[idx];
              const isCorrect = userAnswer === q.correctAnswer;
              const wasAnswered = userAnswer !== undefined;
              const confidence = confidenceRatings[idx];

              return (
                <div
                  key={idx}
                  className={`bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border-2 transition-all ${
                    wasAnswered
                      ? isCorrect
                        ? "border-emerald-400 dark:border-emerald-500"
                        : "border-rose-400 dark:border-rose-500"
                      : "border-gray-300 dark:border-purple-500/30"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Question Number Badge */}
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-black text-base">
                        {q.id}
                      </span>
                    </div>

                    <div className="flex-1">
                      {/* Header with badges and status */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 px-2 py-0.5 rounded">
                            {q.category}
                          </span>
                          {q.bundesland && (
                            <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 px-2 py-0.5 rounded">
                              📍 {q.bundesland}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {masteredQuestions[idx] && (
                            <span className="text-xs font-semibold px-2 py-1 rounded flex items-center gap-1 text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30">
                              <CheckCircle className="w-3 h-3" />
                              Gelernt
                            </span>
                          )}
                          {confidence && (
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded flex items-center gap-1 ${
                                confidence === "easy"
                                  ? "text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/30"
                                  : confidence === "medium"
                                    ? "text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30"
                                    : "text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/30"
                              }`}
                            >
                              {confidence === "easy" && (
                                <>
                                  <Smile className="w-3 h-3" />
                                  Leicht
                                </>
                              )}
                              {confidence === "medium" && (
                                <>
                                  <Meh className="w-3 h-3" />
                                  Mittel
                                </>
                              )}
                              {confidence === "hard" && (
                                <>
                                  <Frown className="w-3 h-3" />
                                  Schwer
                                </>
                              )}
                            </span>
                          )}
                          {wasAnswered && (
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded flex items-center gap-1 ${
                                isCorrect
                                  ? "text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/30"
                                  : "text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/30"
                              }`}
                            >
                              {isCorrect ? (
                                <>
                                  <CheckCircle className="w-3 h-3" />
                                  Richtig
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3 h-3" />
                                  Falsch
                                </>
                              )}
                            </span>
                          )}
                          {!wasAnswered && (
                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              Nicht beantwortet
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Question Text */}
                      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
                        {q.question}
                      </h3>

                      {/* Question image (if available) */}
                      {q.image && (
                        <div className="mb-4 rounded-xl overflow-hidden border-2 border-purple-100 dark:border-purple-500/30 bg-white dark:bg-gray-800">
                          <img
                            src={q.image}
                            alt={q.question}
                            className="w-full h-auto object-contain max-h-80"
                          />
                        </div>
                      )}

                      {/* Answer Options */}
                      <div className="space-y-2">
                        {q.options.map((option, optIdx) => {
                          const isThisCorrect = optIdx === q.correctAnswer;
                          const isUserAnswer = optIdx === userAnswer;

                          return (
                            <div
                              key={optIdx}
                              className={`p-3 rounded-xl border-2 ${
                                isThisCorrect
                                  ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                                  : isUserAnswer
                                    ? "border-rose-400 bg-rose-50 dark:bg-rose-900/20"
                                    : "border-gray-200 dark:border-purple-500/30 opacity-60"
                              }`}
                            >
                              <span className="font-bold text-gray-900 dark:text-white">
                                {String.fromCharCode(65 + optIdx)})
                              </span>{" "}
                              <span className="text-gray-900 dark:text-white">
                                {option}
                              </span>
                              {isThisCorrect && (
                                <span className="ml-2 text-emerald-600 dark:text-emerald-400 font-bold">
                                  ✓ Richtig
                                </span>
                              )}
                              {isUserAnswer && !isThisCorrect && (
                                <span className="ml-2 text-rose-600 dark:text-rose-400 font-bold">
                                  ✗ Deine Antwort
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Confidence Selector - Same as Fragenkatalog */}
                      {isAuthenticated && (
                        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-gray-200 dark:border-gray-700 pt-4">
                          {/* "I Know This" Button - Prominent */}
                          <button
                            onClick={() => {
                              setMasteredQuestions({
                                ...masteredQuestions,
                                [idx]: !masteredQuestions[idx],
                              });
                              toggleMastered(q.id, idx);
                            }}
                            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-2 ${
                              masteredQuestions[idx]
                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                                : "bg-white/80 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-purple-500/30 hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                            }`}
                          >
                            <CheckCircle className="w-4 h-4" />
                            {masteredQuestions[idx]
                              ? "Gelernt"
                              : "Ich kann das"}
                          </button>

                          {/* Confidence Level Buttons - Minimal chips */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setConfidenceRatings({
                                  ...confidenceRatings,
                                  [idx]: "easy",
                                });
                                saveConfidenceRating(q.id, "easy");
                              }}
                              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                                confidence === "easy"
                                  ? "bg-purple-600 text-white shadow-sm"
                                  : "bg-white/80 dark:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-purple-500/30 hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                              }`}
                            >
                              <Smile className="w-3.5 h-3.5" />
                              Leicht
                            </button>
                            <button
                              onClick={() => {
                                setConfidenceRatings({
                                  ...confidenceRatings,
                                  [idx]: "medium",
                                });
                                saveConfidenceRating(q.id, "medium");
                              }}
                              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                                confidence === "medium"
                                  ? "bg-indigo-600 text-white shadow-sm"
                                  : "bg-white/80 dark:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-purple-500/30 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                              }`}
                            >
                              <Meh className="w-3.5 h-3.5" />
                              Mittel
                            </button>
                            <button
                              onClick={() => {
                                setConfidenceRatings({
                                  ...confidenceRatings,
                                  [idx]: "hard",
                                });
                                saveConfidenceRating(q.id, "hard");
                              }}
                              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                                confidence === "hard"
                                  ? "bg-slate-700 dark:bg-slate-600 text-white shadow-sm"
                                  : "bg-white/80 dark:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-purple-500/30 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/20"
                              }`}
                            >
                              <Frown className="w-3.5 h-3.5" />
                              Schwer
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Back to results button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setReviewMode(false)}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              Zurück zu Ergebnissen
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = examQuestions[currentIndex];
  const selectedAnswer = answers[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/einbuergerungstest")}
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück
          </button>

          {mode === "probetest" && timeLeft !== null && (
            <div className="flex items-center gap-2 bg-white/80 dark:bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-purple-100 dark:border-purple-500/30">
              <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span
                className={`font-mono font-bold ${
                  timeLeft < 300
                    ? "text-rose-600 dark:text-rose-400"
                    : "text-purple-600 dark:text-purple-400"
                }`}
              >
                {formatTime(timeLeft)}
              </span>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-700 dark:text-dark-text-secondary">
              Frage {currentIndex + 1} / {examQuestions.length}
            </span>
            <span className="text-purple-600 dark:text-purple-400 font-semibold">
              {Object.keys(answers).length} beantwortet
            </span>
          </div>
          <div className="h-2 bg-white/50 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / examQuestions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-purple-100 dark:border-purple-500/30">
          {/* Question number and badges */}
          <div className="flex gap-3 sm:gap-4 mb-6">
            {/* Question Number - Desktop only */}
            <div className="hidden sm:flex flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl items-center justify-center shadow-lg self-start">
              <span className="text-white font-black text-lg">
                {currentQ.id}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              {/* Top Row: Number (mobile) + Badges */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {/* Question Number - Mobile only */}
                <div className="flex sm:hidden flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg items-center justify-center shadow-lg">
                  <span className="text-white font-black text-sm">
                    {currentQ.id}
                  </span>
                </div>

                {/* Category badge */}
                <span className="text-xs sm:text-sm font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 sm:px-2.5 rounded">
                  {currentQ.category}
                </span>

                {/* Bundesland badge */}
                {currentQ.bundesland && (
                  <span className="text-xs sm:text-sm font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 px-2 py-1 sm:px-2.5 rounded">
                    📍 {currentQ.bundesland}
                  </span>
                )}
              </div>

              {/* Question text */}
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-dark-text-primary leading-snug">
                {currentQ.question}
              </h2>
            </div>
          </div>

          {/* Question image (if available) */}
          {currentQ.image && (
            <div className="mb-6 rounded-xl overflow-hidden border-2 border-purple-100 dark:border-purple-500/30 bg-white dark:bg-gray-800">
              <img
                src={currentQ.image}
                alt={currentQ.question}
                className="w-full h-auto object-contain max-h-80"
              />
            </div>
          )}

          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, index) => {
              const isCorrect = index === currentQ.correctAnswer;
              const isSelected = selectedAnswer === index;
              const showFeedback = selectedAnswer !== undefined;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    showFeedback
                      ? isCorrect
                        ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                        : isSelected
                          ? "border-rose-400 bg-rose-50 dark:bg-rose-900/20"
                          : "border-gray-200 dark:border-purple-500/30 opacity-50"
                      : selectedAnswer === index
                        ? "border-purple-600 bg-purple-50 dark:bg-purple-900/20 shadow-md"
                        : "border-purple-100 dark:border-purple-500/30 hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 cursor-pointer"
                  }`}
                >
                  <span className="font-bold text-gray-900 dark:text-white mr-2">
                    {String.fromCharCode(65 + index)})
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {option}
                  </span>
                  {showFeedback && isCorrect && (
                    <span className="ml-2 text-emerald-600 dark:text-emerald-400 font-bold">
                      ✓ Richtig
                    </span>
                  )}
                  {showFeedback && isSelected && !isCorrect && (
                    <span className="ml-2 text-rose-600 dark:text-rose-400 font-bold">
                      ✗ Falsch
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Confidence Rating and Mastered - Show after answering (Training mode style) */}
          {selectedAnswer !== undefined && isAuthenticated && (
            <div className="mb-4 flex flex-wrap items-center gap-3 border-t border-gray-200 dark:border-gray-700 pt-4">
              {/* "I Know This" Button - Matches Fragenkatalog style */}
              <button
                onClick={() => {
                  setMasteredQuestions({
                    ...masteredQuestions,
                    [currentIndex]: !masteredQuestions[currentIndex],
                  });
                  toggleMastered(currentQ.id, currentIndex);
                }}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 flex items-center gap-1 active:scale-95 whitespace-nowrap flex-shrink-0 ${
                  masteredQuestions[currentIndex]
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm"
                    : "bg-white/80 text-slate-700 border border-slate-200/60 sm:hover:border-purple-300 sm:hover:bg-purple-50 active:border-purple-300 active:bg-purple-50"
                }`}
              >
                <CheckCircle className="w-3 h-3" />
                {masteredQuestions[currentIndex] ? "Gelernt" : "Ich kann das"}
              </button>

              {/* Confidence Level Buttons - Color coded like Fragenkatalog */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleConfidenceRating("easy");
                    saveConfidenceRating(currentQ.id, "easy");
                  }}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 flex items-center gap-1 whitespace-nowrap active:scale-95 flex-shrink-0 ${
                    confidenceRatings[currentIndex] === "easy"
                      ? "bg-green-500 text-white shadow-sm sm:hover:bg-green-600"
                      : "bg-white/80 text-slate-600 border border-slate-200/60 sm:hover:border-green-300 sm:hover:bg-green-50 active:border-green-300 active:bg-green-50"
                  }`}
                >
                  <Smile className="w-3 h-3" />
                  Leicht
                </button>
                <button
                  onClick={() => {
                    handleConfidenceRating("medium");
                    saveConfidenceRating(currentQ.id, "medium");
                  }}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 flex items-center gap-1 whitespace-nowrap active:scale-95 flex-shrink-0 ${
                    confidenceRatings[currentIndex] === "medium"
                      ? "bg-amber-500 text-white shadow-sm sm:hover:bg-amber-600"
                      : "bg-white/80 text-slate-600 border border-slate-200/60 sm:hover:border-amber-300 sm:hover:bg-amber-50 active:border-amber-300 active:bg-amber-50"
                  }`}
                >
                  <Meh className="w-3 h-3" />
                  Mittel
                </button>
                <button
                  onClick={() => {
                    handleConfidenceRating("hard");
                    saveConfidenceRating(currentQ.id, "hard");
                  }}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 flex items-center gap-1 whitespace-nowrap active:scale-95 flex-shrink-0 ${
                    confidenceRatings[currentIndex] === "hard"
                      ? "bg-red-500 text-white shadow-sm sm:hover:bg-red-600"
                      : "bg-white/80 text-slate-600 border border-slate-200/60 sm:hover:border-red-300 sm:hover:bg-red-50 active:border-red-300 active:bg-red-50"
                  }`}
                >
                  <Frown className="w-3 h-3" />
                  Schwer
                </button>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="px-6 py-3 bg-white dark:bg-white/10 text-purple-600 dark:text-purple-400 border-2 border-purple-600 rounded-xl font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
            >
              Zurück
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswer === undefined}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              {currentIndex < examQuestions.length - 1
                ? "Weiter →"
                : "Abschließen"}
            </button>
          </div>
        </div>

        {/* Quick navigation (Training mode only) */}
        {mode === "practice" && examQuestions.length > 0 && (
          <div className="mt-6 bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-purple-100 dark:border-purple-500/30">
            <div className="text-sm font-semibold text-gray-700 dark:text-dark-text-secondary mb-2">
              Schnellnavigation
            </div>
            <div className="flex flex-wrap gap-2">
              {examQuestions.slice(0, 20).map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                    idx === currentIndex
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white scale-110"
                      : answers[idx] !== undefined
                        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-2 border-emerald-400"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-purple-100 dark:hover:bg-purple-900/20"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              {examQuestions.length > 20 && (
                <span className="w-10 h-10 flex items-center justify-center text-gray-400">
                  ...
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
