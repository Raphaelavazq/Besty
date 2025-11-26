import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Smile,
  Meh,
  Frown,
  Zap,
  BookOpen,
  AlertCircle,
  RotateCcw,
  Trophy,
  Brain,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { supabase } from "../../lib/supabase";
import TrainingResultsSummary from "../../components/TrainingResultsSummary";

export default function TrainingMode() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  const [selectedBundesland, setSelectedBundesland] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);
  const [practiceType, setPracticeType] = useState(null); // null = show setup screen
  const [customAmount, setCustomAmount] = useState(20);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [practiceQuestions, setPracticeQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [confidenceRatings, setConfidenceRatings] = useState({});
  const [masteredQuestions, setMasteredQuestions] = useState({});
  const [showCategorySelection, setShowCategorySelection] = useState(false);
  const [showAmountSelection, setShowAmountSelection] = useState(false);

  // Auto-select user's bundesland if authenticated
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
        setAllQuestions(data.questions || []);
      });
  }, []);

  const categories = [
    {
      id: "Politik in der Demokratie",
      name: "Politik in der Demokratie",
      icon: BookOpen,
    },
    {
      id: "Geschichte und Verantwortung",
      name: "Geschichte und Verantwortung",
      icon: BookOpen,
    },
    {
      id: "Mensch und Gesellschaft",
      name: "Mensch und Gesellschaft",
      icon: BookOpen,
    },
  ];

  const practiceOptions = [
    {
      id: "schnelltest",
      name: "Schnelltest",
      description: "10 zufällige Fragen",
      icon: Zap,
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: "thema",
      name: "Nach Thema üben",
      description: "Wähle eine Kategorie",
      icon: BookOpen,
      color: "from-purple-600 to-indigo-600",
    },
    {
      id: "schwer",
      name: "Schwierige Fragen",
      description: "Deine als 'Schwer' markierten Fragen",
      icon: AlertCircle,
      color: "from-purple-500 to-indigo-600",
      requiresAuth: true,
    },
    {
      id: "custom",
      name: "Zufälliger Test",
      description: "Wähle Anzahl der Fragen",
      icon: RotateCcw,
      color: "from-purple-600 to-indigo-700",
    },
  ];

  const startPractice = async (type, category = null, amount = 10) => {
    if (!selectedBundesland || allQuestions.length === 0) return;

    const generalQuestions = allQuestions.filter((q) => q.type === "general");
    const stateQuestions = allQuestions.filter(
      (q) => q.type === "state" && q.bundesland === selectedBundesland
    );
    const allAvailable = [...generalQuestions, ...stateQuestions];

    let selected = [];

    if (type === "schnelltest") {
      // 10 random questions
      selected = [...allAvailable].sort(() => Math.random() - 0.5).slice(0, 10);
    } else if (type === "thema" && category) {
      // Filter by category
      const categoryQuestions = allAvailable.filter(
        (q) => q.category === category
      );
      selected = [...categoryQuestions]
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(20, categoryQuestions.length));
    } else if (type === "schwer") {
      // Load hard questions from database
      if (!isAuthenticated || !user?.id) return;

      try {
        const { data } = await supabase
          .from("question_progress")
          .select("question_id")
          .eq("user_id", user.id)
          .eq("confidence_level", "hard");

        if (data && data.length > 0) {
          const hardIds = data.map((p) => p.question_id);
          selected = allAvailable.filter((q) => hardIds.includes(q.id));
        } else {
          alert("Du hast noch keine Fragen als 'Schwer' markiert!");
          return;
        }
      } catch (error) {
        console.error("Error loading hard questions:", error);
        return;
      }
    } else if (type === "custom") {
      // Custom amount
      selected = [...allAvailable]
        .sort(() => Math.random() - 0.5)
        .slice(0, amount);
    }

    setPracticeQuestions(selected);
    setPracticeType(type);
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
    setConfidenceRatings({});
    setMasteredQuestions({});
  };

  const handleAnswer = async (optionIndex) => {
    setAnswers({ ...answers, [currentIndex]: optionIndex });

    // Save progress to database immediately (like Fragenkatalog)
    if (isAuthenticated && user?.id) {
      const q = practiceQuestions[currentIndex];
      const isCorrect = optionIndex === q.correctAnswer;

      try {
        // Check if progress exists
        const { data: existing, error: fetchError } = await supabase
          .from("question_progress")
          .select("*")
          .eq("user_id", user.id)
          .eq("question_id", q.id)
          .maybeSingle();

        if (fetchError) {
          console.error("Error checking progress:", fetchError);
        }

        if (existing) {
          // Update existing progress
          await supabase
            .from("question_progress")
            .update({
              times_seen: existing.times_seen + 1,
              times_correct: existing.times_correct + (isCorrect ? 1 : 0),
              times_wrong: existing.times_wrong + (isCorrect ? 0 : 1),
              last_seen_at: new Date().toISOString(),
            })
            .eq("id", existing.id);
        } else {
          // Create new progress record
          await supabase.from("question_progress").insert([
            {
              user_id: user.id,
              question_id: q.id,
              confidence_level: "new",
              times_seen: 1,
              times_correct: isCorrect ? 1 : 0,
              times_wrong: isCorrect ? 0 : 1,
              marked_for_review: false,
              is_mastered: false,
            },
          ]);
        }
      } catch (error) {
        console.error("Error saving answer progress:", error);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < practiceQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Save confidence level immediately to database (like Fragenkatalog)
  const saveConfidence = async (idx, level) => {
    if (!isAuthenticated || !user?.id) return;

    const q = practiceQuestions[idx];

    try {
      const { data: existing, error: fetchError } = await supabase
        .from("question_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("question_id", q.id)
        .maybeSingle();

      if (fetchError) {
        console.error("Error checking progress:", fetchError);
      }

      if (existing) {
        // Update existing
        await supabase
          .from("question_progress")
          .update({
            confidence_level: level,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);
      } else {
        // Create new
        await supabase.from("question_progress").insert({
          user_id: user.id,
          question_id: q.id,
          confidence_level: level,
          marked_for_review: false,
          is_mastered: false,
          times_seen: 0,
          times_correct: 0,
          times_wrong: 0,
        });
      }
    } catch (error) {
      console.error("Error saving confidence:", error);
    }
  };

  // Save mastered status immediately to database (like Fragenkatalog)
  const saveMastered = async (idx, isMastered) => {
    if (!isAuthenticated || !user?.id) return;

    const q = practiceQuestions[idx];

    try {
      const { data: existing, error: fetchError } = await supabase
        .from("question_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("question_id", q.id)
        .maybeSingle();

      if (fetchError) {
        console.error("Error checking progress:", fetchError);
      }

      if (existing) {
        // Update existing - when marking as mastered, clear confidence_level
        await supabase
          .from("question_progress")
          .update({
            is_mastered: isMastered,
            confidence_level: isMastered ? null : existing.confidence_level,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);
      } else {
        // Create new
        await supabase.from("question_progress").insert({
          user_id: user.id,
          question_id: q.id,
          is_mastered: isMastered,
          confidence_level: null,
          marked_for_review: false,
          times_seen: 0,
          times_correct: 0,
          times_wrong: 0,
        });
      }
    } catch (error) {
      console.error("Error saving mastered status:", error);
    }
  };

  const saveAllProgress = async () => {
    if (!isAuthenticated || !user?.id) return;

    try {
      for (let idx = 0; idx < practiceQuestions.length; idx++) {
        const q = practiceQuestions[idx];
        const confidence = confidenceRatings[idx];
        const isMastered = masteredQuestions[idx];

        if (!confidence && !isMastered) continue; // Skip if nothing to save

        // Check if progress exists
        const { data: existing } = await supabase
          .from("question_progress")
          .select("*")
          .eq("user_id", user.id)
          .eq("question_id", q.id)
          .single();

        if (existing) {
          // Update existing
          const updates = {};
          if (confidence) updates.confidence_level = confidence;
          if (isMastered !== undefined) updates.is_mastered = isMastered;
          updates.updated_at = new Date().toISOString();

          await supabase
            .from("question_progress")
            .update(updates)
            .eq("user_id", user.id)
            .eq("question_id", q.id);
        } else {
          // Create new
          await supabase.from("question_progress").insert({
            user_id: user.id,
            question_id: q.id,
            confidence_level: confidence || null,
            marked_for_review: false,
            is_mastered: isMastered || false,
          });
        }
      }
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    practiceQuestions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correct++;
    });
    return correct;
  };

  // Bundesland selection screen
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
              Training
            </h1>
            <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
              Übe gezielt mit verschiedenen Trainingsmodi
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

  // Category Selection Screen (for "Nach Thema üben")
  if (showCategorySelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setShowCategorySelection(false)}
            className="mb-8 flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück
          </button>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
              <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Nach Thema üben
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 pb-2">
              Kategorie wählen
            </h1>
            <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
              Wähle eine Kategorie zum Üben
            </p>
          </div>

          <div className="grid gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setShowCategorySelection(false);
                    startPractice("thema", cat.id);
                  }}
                  className="p-8 rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-md border-2 border-purple-100 dark:border-purple-500/30 hover:border-purple-400 dark:hover:border-purple-400 transition-all hover:-translate-y-2 hover:shadow-2xl text-left flex items-center gap-6 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                      {cat.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      Trainiere Fragen zu diesem Thema
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Amount Selection Screen (for "Zufälliger Test")
  if (showAmountSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setShowAmountSelection(false)}
            className="mb-8 flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück
          </button>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
              <RotateCcw className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Zufälliger Test
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 pb-2">
              Anzahl Fragen wählen
            </h1>
            <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
              Wie viele Fragen möchtest du üben?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[10, 20, 30, 50].map((amount) => (
              <button
                key={amount}
                onClick={() => setCustomAmount(amount)}
                className={`p-8 rounded-3xl backdrop-blur-md border-2 transition-all hover:-translate-y-2 hover:shadow-2xl ${
                  customAmount === amount
                    ? "border-purple-600 dark:border-purple-500 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/40 dark:to-indigo-900/40"
                    : "bg-white/80 dark:bg-white/10 border-purple-100 dark:border-purple-500/30 hover:border-purple-400 dark:hover:border-purple-400"
                }`}
              >
                <div className="text-6xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {amount}
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Fragen
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setShowAmountSelection(false);
              startPractice("custom", null, customAmount);
            }}
            className="w-full px-8 py-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            Starten mit {customAmount} Fragen →
          </button>
        </div>
      </div>
    );
  }

  // Practice setup screen - Choose practice type
  if (!practiceType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => navigate("/einbuergerungstest")}
              className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Zurück
            </button>

            {/* Change Bundesland button - only for guests */}
            {!isAuthenticated && (
              <button
                onClick={() => setSelectedBundesland(null)}
                className="px-4 py-2 text-sm bg-white/80 dark:bg-white/10 backdrop-blur-md border border-purple-200 dark:border-purple-500/30 text-purple-600 dark:text-purple-400 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
              >
                Bundesland ändern
              </button>
            )}
          </div>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                📍 {selectedBundesland}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 pb-2">
              Trainingsmodus wählen
            </h1>
            <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
              Wähle wie du üben möchtest
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {practiceOptions.map((option) => {
              const Icon = option.icon;
              const disabled = option.requiresAuth && !isAuthenticated;

              return (
                <button
                  key={option.id}
                  onClick={() => {
                    if (disabled) {
                      alert(
                        "Bitte melde dich an, um diese Funktion zu nutzen!"
                      );
                      return;
                    }
                    if (option.id === "thema") {
                      // Navigate to category selection screen
                      setShowCategorySelection(true);
                    } else if (option.id === "custom") {
                      // Navigate to amount selection screen
                      setShowAmountSelection(true);
                    } else {
                      startPractice(option.id);
                    }
                  }}
                  disabled={disabled}
                  className={`relative p-8 rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-md border-2 border-purple-100 dark:border-purple-500/30 hover:border-purple-400 dark:hover:border-purple-400 transition-all hover:-translate-y-2 hover:shadow-2xl text-left group ${
                    disabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <div className="relative">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                      {option.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {option.description}
                    </p>
                    {disabled && (
                      <div className="mt-3 text-xs text-purple-600 dark:text-purple-400 font-semibold">
                        🔒 Anmeldung erforderlich
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    const score = calculateScore();
    const totalAnswered = Object.keys(answers).length;
    const percentage = Math.round((score / practiceQuestions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-8 sm:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 sm:mb-8 text-center pb-2">
            Übung abgeschlossen! ✨
          </h1>

          {/* Animated Summary */}
          <TrainingResultsSummary
            score={score}
            totalQuestions={practiceQuestions.length}
          />

          {/* Review Questions Section */}
          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-100 dark:border-purple-500/30 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-dark-text-primary">
              Fragen überprüfen & bewerten
            </h2>

            <div className="space-y-6">
              {practiceQuestions.map((q, idx) => {
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
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-black text-base">
                          {q.id}
                        </span>
                      </div>

                      <div className="flex-1">
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
                          </div>
                        </div>

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

                        {/* Rating Buttons - Same as in question view */}
                        {isAuthenticated && (
                          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-gray-200 dark:border-gray-700 pt-4">
                            <button
                              onClick={() => {
                                setMasteredQuestions({
                                  ...masteredQuestions,
                                  [idx]: !masteredQuestions[idx],
                                });
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

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  setConfidenceRatings({
                                    ...confidenceRatings,
                                    [idx]: "easy",
                                  })
                                }
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
                                onClick={() =>
                                  setConfidenceRatings({
                                    ...confidenceRatings,
                                    [idx]: "medium",
                                  })
                                }
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
                                onClick={() =>
                                  setConfidenceRatings({
                                    ...confidenceRatings,
                                    [idx]: "hard",
                                  })
                                }
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

            <div className="mt-8 flex flex-col gap-4">
              {isAuthenticated && (
                <button
                  onClick={async () => {
                    await saveAllProgress();
                    alert("Fortschritt gespeichert!");
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                  Fortschritt speichern
                </button>
              )}

              <button
                onClick={() => {
                  setPracticeType(null);
                  setPracticeQuestions([]);
                  setCurrentIndex(0);
                  setAnswers({});
                  setShowResults(false);
                }}
                className="px-8 py-4 bg-white dark:bg-white/10 text-purple-600 dark:text-purple-400 border-2 border-purple-600 rounded-xl font-bold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
              >
                Neue Übung starten
              </button>

              <button
                onClick={() => navigate("/einbuergerungstest")}
                className="px-8 py-4 bg-white dark:bg-white/10 text-purple-600 dark:text-purple-400 border-2 border-purple-600 rounded-xl font-bold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
              >
                Zurück zur Übersicht
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Question display (practice in progress)
  const currentQ = practiceQuestions[currentIndex];
  const selectedAnswer = answers[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => {
              setPracticeType(null);
              setPracticeQuestions([]);
            }}
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück
          </button>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-700 dark:text-dark-text-secondary">
              Frage {currentIndex + 1} / {practiceQuestions.length}
            </span>
            <span className="text-purple-600 dark:text-purple-400 font-semibold">
              {Object.keys(answers).length} beantwortet
            </span>
          </div>
          <div className="h-2 bg-white/50 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / practiceQuestions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-purple-100 dark:border-purple-500/30">
          <div className="flex gap-3 sm:gap-4">
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

          {/* Rating Controls - Same as Fragenkatalog */}
          {isAuthenticated && selectedAnswer !== undefined && (
            <div className="mb-6 flex flex-wrap items-center gap-3 border-t border-gray-200 dark:border-gray-700 pt-4">
              {/* "I Know This" Button - Matches Fragenkatalog style */}
              <button
                onClick={async () => {
                  const newValue = !masteredQuestions[currentIndex];
                  setMasteredQuestions({
                    ...masteredQuestions,
                    [currentIndex]: newValue,
                  });
                  // Save immediately to database
                  await saveMastered(currentIndex, newValue);
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
                  onClick={async () => {
                    setConfidenceRatings({
                      ...confidenceRatings,
                      [currentIndex]: "easy",
                    });
                    // Save immediately to database
                    await saveConfidence(currentIndex, "easy");
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
                  onClick={async () => {
                    setConfidenceRatings({
                      ...confidenceRatings,
                      [currentIndex]: "medium",
                    });
                    // Save immediately to database
                    await saveConfidence(currentIndex, "medium");
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
                  onClick={async () => {
                    setConfidenceRatings({
                      ...confidenceRatings,
                      [currentIndex]: "hard",
                    });
                    // Save immediately to database
                    await saveConfidence(currentIndex, "hard");
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

          {/* Navigation */}
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
              {currentIndex < practiceQuestions.length - 1
                ? "Weiter →"
                : "Abschließen"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
