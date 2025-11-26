import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Bookmark,
  Smile,
  Meh,
  Frown,
  CheckCircle2,
  Repeat,
  GraduationCap,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { supabase } from "../../lib/supabase";

// QuestionCard Component
function QuestionCard({ question: q, onProgressUpdate, progressData }) {
  const { user, isAuthenticated } = useAuthStore();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [isMarkedForReview, setIsMarkedForReview] = useState(false);
  const [confidenceLevel, setConfidenceLevel] = useState(null);
  const [isMastered, setIsMastered] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load progress from passed prop instead of individual API calls
  useEffect(() => {
    if (progressData) {
      setIsMarkedForReview(progressData.marked_for_review || false);
      setConfidenceLevel(progressData.confidence_level || null);
      setIsMastered(progressData.is_mastered || false);
    }
  }, [progressData]);

  const handleAnswerClick = async (index) => {
    setSelectedAnswer(index);
    setShowCorrect(true);

    const isCorrect = index === q.correctAnswer;

    // Save progress to database
    if (isAuthenticated && user?.id) {
      try {
        setLoading(true);

        // Check if progress exists
        const { data: existing, error: fetchError } = await supabase
          .from("question_progress")
          .select("*")
          .eq("user_id", user.id)
          .eq("question_id", q.id)
          .maybeSingle(); // Use maybeSingle() to avoid 406 errors when no data exists

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
            },
          ]);
        }
      } catch (error) {
        console.error("Error saving progress:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleMarkForReview = async () => {
    if (!isAuthenticated || !user?.id) return;

    try {
      setLoading(true);
      const newMarkedState = !isMarkedForReview;

      // Check if progress exists
      const { data: existing, error: fetchError } = await supabase
        .from("question_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("question_id", q.id)
        .maybeSingle(); // Use maybeSingle() to avoid 406 errors

      if (fetchError) {
        console.error("Error checking progress:", fetchError);
      }

      if (existing) {
        // Update existing
        await supabase
          .from("question_progress")
          .update({ marked_for_review: newMarkedState })
          .eq("id", existing.id);
      } else {
        // Create new progress with bookmark
        await supabase.from("question_progress").insert([
          {
            user_id: user.id,
            question_id: q.id,
            marked_for_review: newMarkedState,
            confidence_level: "new",
            times_seen: 0,
          },
        ]);
      }

      setIsMarkedForReview(newMarkedState);
      if (onProgressUpdate) onProgressUpdate();
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setLoading(false);
    }
  };

  const setConfidence = async (level) => {
    if (!isAuthenticated || !user?.id) return;

    try {
      setLoading(true);

      // Toggle: if clicking the same level, deselect it (set to null)
      const newLevel = confidenceLevel === level ? null : level;

      const { data: existing, error: fetchError } = await supabase
        .from("question_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("question_id", q.id)
        .maybeSingle(); // Use maybeSingle() to avoid 406 errors

      if (fetchError) {
        console.error("Error checking progress:", fetchError);
      }

      if (existing) {
        await supabase
          .from("question_progress")
          .update({ confidence_level: newLevel })
          .eq("id", existing.id);
      } else {
        // Only create if we're setting a level (not deselecting)
        if (newLevel) {
          await supabase.from("question_progress").insert([
            {
              user_id: user.id,
              question_id: q.id,
              confidence_level: newLevel,
              times_seen: 0,
            },
          ]);
        }
      }

      setConfidenceLevel(newLevel);
      if (onProgressUpdate) onProgressUpdate();
    } catch (error) {
      console.error("Error setting confidence:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMastered = async () => {
    if (!isAuthenticated || !user?.id) return;

    try {
      setLoading(true);
      const newMasteredState = !isMastered;

      const { data: existing, error: fetchError } = await supabase
        .from("question_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("question_id", q.id)
        .maybeSingle(); // Use maybeSingle() to avoid 406 errors

      if (fetchError) {
        console.error("Error checking progress:", fetchError);
      }

      if (existing) {
        // When marking as mastered, remove confidence_level
        // When unmarking, keep the old confidence_level
        await supabase
          .from("question_progress")
          .update({
            is_mastered: newMasteredState,
            confidence_level: newMasteredState
              ? null
              : existing.confidence_level,
          })
          .eq("id", existing.id);
      } else {
        await supabase.from("question_progress").insert([
          {
            user_id: user.id,
            question_id: q.id,
            is_mastered: newMasteredState,
            times_seen: 0,
          },
        ]);
      }

      setIsMastered(newMasteredState);
      // Reset confidence level display when marking as mastered
      if (newMasteredState) {
        setConfidenceLevel(null);
      }
      if (onProgressUpdate) onProgressUpdate();
    } catch (error) {
      console.error("Error toggling mastered:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-lg border border-purple-100 dark:border-purple-500/30">
      <div className="flex gap-3 sm:gap-4">
        {/* Question Number - Only visible on desktop */}
        <div className="hidden sm:flex flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl items-center justify-center shadow-lg self-start">
          <span className="text-white font-black text-lg">
            {q.originalNum || q.id}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Top Row: Number (mobile) + Badges + Bookmark */}
          <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
            {/* Left side: Number + badges */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {/* Question Number - Mobile only */}
              <div className="flex sm:hidden flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg items-center justify-center shadow-lg">
                <span className="text-white font-black text-sm">
                  {q.originalNum || q.id}
                </span>
              </div>

              {/* Category badge - theme text with hierarchy */}
              <span className="text-xs sm:text-sm font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 sm:px-2.5 rounded">
                {q.category}
              </span>
              {/* Bundesland badge for state questions */}
              {q.type !== "general" && (
                <span className="text-xs sm:text-sm font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 px-2 py-1 sm:px-2.5 rounded">
                  📍 {q.bundesland}
                </span>
              )}
            </div>

            {/* Bookmark Button (for authenticated users) - Icon only on mobile */}
            {isAuthenticated && (
              <button
                onClick={toggleMarkForReview}
                disabled={loading}
                className={`flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:px-3 rounded-lg font-semibold text-xs transition-all active:scale-95 flex-shrink-0 ${
                  isMarkedForReview
                    ? "bg-amber-500 text-white sm:hover:bg-amber-600"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 sm:hover:bg-amber-100 dark:sm:hover:bg-amber-900/30"
                }`}
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${isMarkedForReview ? "fill-current" : ""}`}
                />
                <span className="hidden sm:inline">
                  {isMarkedForReview ? "Markiert" : "Markieren"}
                </span>
              </button>
            )}
          </div>

          {/* Question text - Clear hierarchy */}
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-dark-text-primary leading-snug">
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

          {/* Answer options - Better spacing and typography hierarchy */}
          <div className="space-y-2.5 sm:space-y-3">
            {q.options.map((option, index) => {
              const isCorrect = index === q.correctAnswer;
              const isSelected = selectedAnswer === index;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={showCorrect}
                  className={`w-full p-3.5 sm:p-4 rounded-xl border-2 transition-all text-left text-base sm:text-lg active:scale-[0.98] ${
                    showCorrect
                      ? isCorrect
                        ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                        : isSelected
                          ? "border-rose-400 bg-rose-50 dark:bg-rose-900/20"
                          : "border-gray-200 dark:border-purple-500/30 opacity-50"
                      : "border-purple-200 dark:border-purple-500/30 sm:hover:border-purple-400 sm:hover:bg-purple-50 dark:sm:hover:bg-purple-900/20 cursor-pointer active:border-purple-400 active:bg-purple-50 dark:active:bg-purple-900/20"
                  }`}
                >
                  <span className="font-black text-gray-900 dark:text-white text-lg sm:text-xl">
                    {String.fromCharCode(65 + index)})
                  </span>{" "}
                  <span className="text-gray-900 dark:text-white font-medium">
                    {option}
                  </span>
                  {showCorrect && isCorrect && (
                    <span className="ml-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm sm:text-base">
                      ✓ Richtig
                    </span>
                  )}
                  {showCorrect && isSelected && !isCorrect && (
                    <span className="ml-2 text-rose-600 dark:text-rose-400 font-bold text-sm sm:text-base">
                      ✗ Falsch
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Confidence Selector - Minimal single line */}
          {isAuthenticated && (
            <div className="mt-3 sm:mt-4 flex items-center gap-1.5 sm:gap-2 border-t border-gray-200 dark:border-gray-700 pt-3 sm:pt-4 overflow-x-auto scrollbar-hide -mx-1 px-1">
              {/* Show reset button only after answering */}
              {showCorrect && (
                <button
                  onClick={() => {
                    setSelectedAnswer(null);
                    setShowCorrect(false);
                  }}
                  className="p-2 bg-purple-100 dark:bg-purple-800/50 text-purple-700 dark:text-purple-200 rounded-lg sm:hover:bg-purple-200 dark:sm:hover:bg-purple-700/60 transition-colors active:scale-95 flex-shrink-0 flex items-center justify-center"
                  title="Noch einmal"
                >
                  <Repeat className="w-4 h-4" />
                </button>
              )}

              {/* "I Know This" Button - Minimal */}
              <button
                onClick={toggleMastered}
                disabled={loading}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 flex items-center gap-1 active:scale-95 whitespace-nowrap flex-shrink-0 ${
                  isMastered
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm"
                    : "bg-white/80 text-slate-700 border border-slate-200/60 sm:hover:border-purple-300 sm:hover:bg-purple-50 active:border-purple-300 active:bg-purple-50"
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                {isMastered ? "Gelernt" : "Ich kann das"}
              </button>

              {/* Divider */}
              <div className="w-px h-5 bg-slate-200/60 self-center flex-shrink-0"></div>

              {/* Confidence Level Buttons - Color coded - Disabled when mastered */}
              <button
                onClick={() => setConfidence("easy")}
                disabled={loading || isMastered}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 flex items-center gap-1 whitespace-nowrap active:scale-95 flex-shrink-0 ${
                  isMastered
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 border border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-50"
                    : confidenceLevel === "easy"
                      ? "bg-green-500 text-white shadow-sm sm:hover:bg-green-600"
                      : "bg-white/80 text-slate-600 border border-slate-200/60 sm:hover:border-green-300 sm:hover:bg-green-50 active:border-green-300 active:bg-green-50"
                }`}
              >
                <Smile className="w-3 h-3" />
                Leicht
              </button>
              <button
                onClick={() => setConfidence("medium")}
                disabled={loading || isMastered}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 flex items-center gap-1 whitespace-nowrap active:scale-95 flex-shrink-0 ${
                  isMastered
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 border border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-50"
                    : confidenceLevel === "medium"
                      ? "bg-amber-500 text-white shadow-sm sm:hover:bg-amber-600"
                      : "bg-white/80 text-slate-600 border border-slate-200/60 sm:hover:border-amber-300 sm:hover:bg-amber-50 active:border-amber-300 active:bg-amber-50"
                }`}
              >
                <Meh className="w-3 h-3" />
                Mittel
              </button>
              <button
                onClick={() => setConfidence("hard")}
                disabled={loading || isMastered}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 flex items-center gap-1 whitespace-nowrap active:scale-95 flex-shrink-0 ${
                  isMastered
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 border border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-50"
                    : confidenceLevel === "hard"
                      ? "bg-red-500 text-white shadow-sm sm:hover:bg-red-600"
                      : "bg-white/80 text-slate-600 border border-slate-200/60 sm:hover:border-red-300 sm:hover:bg-red-50 active:border-red-300 active:bg-red-50"
                }`}
              >
                <Frown className="w-3 h-3" />
                Schwer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Fragenkatalog() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [questions, setQuestions] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedBundesland, setSelectedBundesland] = useState(null); // null = not selected yet
  const [showSelection, setShowSelection] = useState(true); // Show selection screen first
  const [confidenceFilter, setConfidenceFilter] = useState(null); // null | 'easy' | 'medium' | 'hard'
  const [showMarkedOnly, setShowMarkedOnly] = useState(false); // Bookmarked (studied in class)
  const [showMasteredOnly, setShowMasteredOnly] = useState(false); // Mastered (I know this)
  const [userProgress, setUserProgress] = useState([]); // Store user's progress for filtering
  const [progressMap, setProgressMap] = useState(new Map()); // Fast lookup for individual questions

  // Auto-select user's bundesland and read URL filters
  useEffect(() => {
    // Auto-select user's bundesland if authenticated - IMMEDIATELY set it so user skips selection screen
    if (isAuthenticated && user?.bundesland && !selectedBundesland) {
      setSelectedBundesland(user.bundesland);
    }

    // Read URL parameters to set initial filters (with mutual exclusivity)
    const params = new URLSearchParams(window.location.search);
    const filterParam = params.get("filter");

    if (filterParam === "marked") {
      setShowMarkedOnly(true);
    } else if (filterParam === "gelernt" || filterParam === "mastered") {
      // Gelernt filter - mutually exclusive with difficulty
      setShowMasteredOnly(true);
      setConfidenceFilter(null); // Clear any difficulty filter
    } else if (["easy", "medium", "hard"].includes(filterParam)) {
      // Difficulty filter - mutually exclusive with gelernt
      setConfidenceFilter(filterParam);
      setShowMasteredOnly(false); // Clear gelernt filter
    }
  }, [isAuthenticated, user, selectedBundesland]);

  useEffect(() => {
    fetch("/data/einbuergerungstest/questions.json")
      .then((res) => res.json())
      .then((data) => {
        // Sort questions by original BAMF number (1, 2, 3... 300, then BW-1, BW-2, etc.)
        const sorted = [...data.questions].sort((a, b) => {
          const aNum = a.originalNum || a.id.toString();
          const bNum = b.originalNum || b.id.toString();

          // Check if they're numbers or state codes
          const aIsState = aNum.includes("-");
          const bIsState = bNum.includes("-");

          // General questions (1-300) come first
          if (!aIsState && bIsState) return -1;
          if (aIsState && !bIsState) return 1;

          // Both general: sort numerically
          if (!aIsState && !bIsState) {
            return parseInt(aNum) - parseInt(bNum);
          }

          // Both state: sort by state code alphabetically, then by number
          const [aState, aStateNum] = aNum.split("-");
          const [bState, bStateNum] = bNum.split("-");
          if (aState !== bState) return aState.localeCompare(bState);
          return parseInt(aStateNum) - parseInt(bStateNum);
        });

        setQuestions(sorted);
        setMetadata(data.metadata);
        setFilteredQuestions(sorted);
      });
  }, []);

  // Load ALL user progress in ONE batch query (prevents N+1 problem)
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      loadUserProgress();
    }
  }, [isAuthenticated, user?.id]);

  const loadUserProgress = async () => {
    try {
      // Fetch ALL progress records for this user in ONE query
      const { data, error } = await supabase
        .from("question_progress")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error loading progress:", error);
        return;
      }

      // Create fast lookup map: question_id -> progress data
      const map = new Map();
      (data || []).forEach((progress) => {
        map.set(progress.question_id, progress);
      });

      setUserProgress(data || []);
      setProgressMap(map);
    } catch (error) {
      console.error("Error loading user progress:", error);
    }
  };

  useEffect(() => {
    if (!selectedBundesland) {
      setFilteredQuestions([]);
      return;
    }

    let filtered = questions;

    // Filter by Bundesland selection - EXACTLY like BAMF
    // Show 300 general questions + 10 state-specific questions
    filtered = filtered.filter((q) => {
      if (q.type === "general") return true; // Always show general questions
      if (q.type === "state" && q.bundesland === selectedBundesland)
        return true; // Show selected state questions
      return false;
    });

    // Filter by confidence level and/or marked status and/or mastered
    if (
      isAuthenticated &&
      userProgress.length > 0 &&
      (confidenceFilter || showMarkedOnly || showMasteredOnly)
    ) {
      filtered = filtered.filter((q) => {
        const progress = userProgress.find((p) => p.question_id === q.id);
        if (!progress) return false; // Not studied yet

        // CRITICAL LOGIC:
        // - Difficulty filters (easy/medium/hard) exclude mastered questions
        // - Mastered filter only shows mastered questions
        // - Marked filter can combine with any other filter

        // If filtering by difficulty (easy/medium/hard)
        if (confidenceFilter) {
          // Exclude mastered questions from difficulty filters
          if (progress.is_mastered === true) {
            return false;
          }
          // Must match the specific difficulty level
          if (progress.confidence_level !== confidenceFilter) {
            return false;
          }
        }

        // If filtering by mastered
        if (showMasteredOnly) {
          if (progress.is_mastered !== true) {
            return false;
          }
        }

        // If filtering by marked (can combine with others)
        if (showMarkedOnly) {
          if (progress.marked_for_review !== true) {
            return false;
          }
        }

        // All filters passed
        return true;
      });
    }

    // Filter by search term (search by number or text)
    if (searchTerm) {
      filtered = filtered.filter(
        (q) =>
          q.id.toString() === searchTerm || // Exact number match
          q.originalNum.includes(searchTerm) ||
          q.question.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredQuestions(filtered);
  }, [
    searchTerm,
    questions,
    selectedBundesland,
    confidenceFilter,
    showMarkedOnly,
    showMasteredOnly,
    userProgress,
    isAuthenticated,
  ]);

  // State Selection Screen - ONLY show if: 1) Not logged in, OR 2) Logged in but no bundesland selected
  // If logged in with saved bundesland, skip this screen entirely (already set in useEffect above)
  if (!selectedBundesland) {
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

    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate("/einbuergerungstest")}
            className="mb-6 flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück
          </button>

          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 pb-2">
            Fragenkatalog
          </h1>
          <p className="text-gray-600 dark:text-dark-text-secondary mb-2">
            Wählen Sie Ihr Bundesland, um die 310 Fragen (300 allgemein + 10
            länderspezifisch) zu sehen
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Original BAMF-Fragen (Stand: 07.05.2025)
          </p>

          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-purple-100 dark:border-purple-500/30">
            <div className="grid gap-3">
              {bundeslaender.map((state) => (
                <button
                  key={state}
                  onClick={() => setSelectedBundesland(state)}
                  className="w-full p-4 text-left bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 hover:from-purple-100 hover:to-indigo-100 dark:hover:from-purple-800/30 dark:hover:to-indigo-800/30 rounded-xl border-2 border-purple-200 dark:border-purple-500/30 hover:border-purple-400 dark:hover:border-purple-400 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {state}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Questions Display (after state is selected)
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-4 sm:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with navigation - Compact on mobile */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <button
            onClick={() => navigate("/einbuergerungstest")}
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 sm:hover:gap-3 transition-all active:gap-3"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Zurück</span>
          </button>

          {/* Change Bundesland button - only for guests */}
          {!isAuthenticated && (
            <button
              onClick={() => setSelectedBundesland(null)}
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-white/80 dark:bg-white/10 backdrop-blur-md border border-purple-200 dark:border-purple-500/30 text-purple-600 dark:text-purple-400 rounded-xl sm:hover:bg-purple-50 dark:sm:hover:bg-purple-900/20 transition-all active:bg-purple-50"
            >
              Bundesland ändern
            </button>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1 sm:mb-2 pb-1 sm:pb-2">
          Fragenkatalog
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-dark-text-secondary mb-4 sm:mb-8">
          310 Fragen für {selectedBundesland}
        </p>

        {/* Filter Status Bar - Shows when Markiert or Gelernt filter is active */}
        {isAuthenticated && (showMarkedOnly || showMasteredOnly) && (
          <div className="mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3 sm:gap-4">
                {showMarkedOnly && (
                  <>
                    <div className="p-2.5 sm:p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <Bookmark className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-white">Markierte Fragen</p>
                      <p className="text-2xl sm:text-3xl font-bold text-white">
                        {userProgress.filter((p) => p.marked_for_review).length}
                      </p>
                    </div>
                  </>
                )}
                {showMasteredOnly && (
                  <>
                    <div className="p-2.5 sm:p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-white">Gelernte Fragen</p>
                      <p className="text-2xl sm:text-3xl font-bold text-white">
                        {userProgress.filter((p) => p.is_mastered).length}
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="text-right">
                <p className="text-xs sm:text-sm text-white">von 310 Fragen</p>
                <p className="text-lg sm:text-xl font-semibold text-white">
                  {Math.round(
                    ((showMarkedOnly
                      ? userProgress.filter((p) => p.marked_for_review).length
                      : userProgress.filter((p) => p.is_mastered).length) /
                      310) *
                      100
                  )}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Search by question number - Compact on mobile */}
        <div className="mb-4 sm:mb-6">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Frage-Nummer oder Stichwort..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-purple-100 dark:border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-dark-text-primary text-sm sm:text-base"
            />
          </div>
          {searchTerm && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {filteredQuestions.length} Ergebnisse für "{searchTerm}"
            </p>
          )}
        </div>

        {/* Filter Bar - Compact mobile, spacious desktop */}
        {isAuthenticated && userProgress.length > 0 && (
          <div className="mb-4 sm:mb-6">
            {/* Scrollable filter container */}
            <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="overflow-x-auto scrollbar-hide sm:overflow-visible">
                <div className="flex gap-1.5 sm:gap-2 min-w-max sm:min-w-0 sm:flex-wrap pb-1">
                  {/* All Questions Chip */}
                  <button
                    onClick={() => {
                      setConfidenceFilter(null);
                      setShowMasteredOnly(false);
                      setShowMarkedOnly(false);
                    }}
                    className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-full text-xs sm:text-sm font-medium transition-all duration-150 active:scale-95 whitespace-nowrap ${
                      !confidenceFilter && !showMasteredOnly && !showMarkedOnly
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm sm:shadow-md"
                        : "bg-white/80 text-slate-600 sm:hover:bg-purple-50 border border-slate-200/60 sm:border-slate-200 active:bg-purple-50"
                    }`}
                  >
                    <span>Alle</span>
                    <span className="text-[11px] sm:text-xs font-semibold sm:opacity-75">
                      310
                    </span>
                  </button>

                  {/* Divider */}
                  <div className="w-px h-6 sm:h-8 bg-slate-200/60 sm:bg-slate-200 self-center mx-0.5 sm:mx-1"></div>

                  {/* Difficulty Chips */}
                  <button
                    onClick={() => {
                      const newValue =
                        confidenceFilter === "easy" ? null : "easy";
                      setConfidenceFilter(newValue);
                      if (newValue !== null) {
                        setShowMasteredOnly(false);
                        setShowMarkedOnly(false);
                      }
                    }}
                    className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-full text-xs sm:text-sm font-medium transition-all duration-150 active:scale-95 whitespace-nowrap ${
                      confidenceFilter === "easy"
                        ? "bg-purple-600 text-white shadow-sm sm:shadow-md"
                        : "bg-white/80 text-slate-600 sm:hover:bg-purple-50 border border-slate-200/60 sm:border-slate-200 active:bg-purple-50"
                    }`}
                  >
                    <Smile className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">Leicht</span>
                    <span className="text-[11px] sm:text-xs font-semibold sm:opacity-75">
                      {
                        userProgress.filter(
                          (p) =>
                            p.confidence_level === "easy" &&
                            p.is_mastered !== true
                        ).length
                      }
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      const newValue =
                        confidenceFilter === "medium" ? null : "medium";
                      setConfidenceFilter(newValue);
                      if (newValue !== null) {
                        setShowMasteredOnly(false);
                        setShowMarkedOnly(false);
                      }
                    }}
                    className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-full text-xs sm:text-sm font-medium transition-all duration-150 active:scale-95 whitespace-nowrap ${
                      confidenceFilter === "medium"
                        ? "bg-purple-600 text-white shadow-sm sm:shadow-md"
                        : "bg-white/80 text-slate-600 sm:hover:bg-purple-50 border border-slate-200/60 sm:border-slate-200 active:bg-purple-50"
                    }`}
                  >
                    <Meh className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">Mittel</span>
                    <span className="text-[11px] sm:text-xs font-semibold sm:opacity-75">
                      {
                        userProgress.filter(
                          (p) =>
                            p.confidence_level === "medium" &&
                            p.is_mastered !== true
                        ).length
                      }
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      const newValue =
                        confidenceFilter === "hard" ? null : "hard";
                      setConfidenceFilter(newValue);
                      if (newValue !== null) {
                        setShowMasteredOnly(false);
                        setShowMarkedOnly(false);
                      }
                    }}
                    className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-full text-xs sm:text-sm font-medium transition-all duration-150 active:scale-95 whitespace-nowrap ${
                      confidenceFilter === "hard"
                        ? "bg-purple-600 text-white shadow-sm sm:shadow-md"
                        : "bg-white/80 text-slate-600 sm:hover:bg-purple-50 border border-slate-200/60 sm:border-slate-200 active:bg-purple-50"
                    }`}
                  >
                    <Frown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">Schwer</span>
                    <span className="text-[11px] sm:text-xs font-semibold sm:opacity-75">
                      {
                        userProgress.filter(
                          (p) =>
                            p.confidence_level === "hard" &&
                            p.is_mastered !== true
                        ).length
                      }
                    </span>
                  </button>

                  {/* Divider */}
                  <div className="w-px h-6 sm:h-8 bg-slate-200/60 sm:bg-slate-200 self-center mx-0.5 sm:mx-1"></div>

                  {/* Marked Chip */}
                  <button
                    onClick={() => {
                      const newValue = !showMarkedOnly;
                      setShowMarkedOnly(newValue);
                      if (newValue) {
                        setShowMasteredOnly(false);
                        setConfidenceFilter(null);
                      }
                    }}
                    className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-full text-xs sm:text-sm font-medium transition-all duration-150 active:scale-95 whitespace-nowrap ${
                      showMarkedOnly
                        ? "bg-amber-500 text-white shadow-sm sm:shadow-md"
                        : "bg-white/80 text-slate-600 sm:hover:bg-amber-50 border border-slate-200/60 sm:border-slate-200 active:bg-amber-50"
                    }`}
                  >
                    <Bookmark className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">Markiert</span>
                    <span className="text-[11px] sm:text-xs font-semibold sm:opacity-75">
                      {userProgress.filter((p) => p.marked_for_review).length}
                    </span>
                  </button>

                  {/* Mastered Chip */}
                  <button
                    onClick={() => {
                      const newValue = !showMasteredOnly;
                      setShowMasteredOnly(newValue);
                      if (newValue) {
                        setConfidenceFilter(null);
                        setShowMarkedOnly(false);
                      }
                    }}
                    className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-full text-xs sm:text-sm font-medium transition-all duration-150 active:scale-95 whitespace-nowrap ${
                      showMasteredOnly
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm sm:shadow-md"
                        : "bg-white/80 text-slate-600 sm:hover:bg-purple-50 border border-slate-200/60 sm:border-slate-200 active:bg-purple-50"
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">Gelernt</span>
                    <span className="text-[11px] sm:text-xs font-semibold sm:opacity-75">
                      {userProgress.filter((p) => p.is_mastered).length}
                    </span>
                  </button>
                </div>
              </div>

              {/* Scroll gradient indicators - mobile only */}
              <div className="absolute top-0 left-0 bottom-1 w-6 bg-gradient-to-r from-violet-50 to-transparent pointer-events-none sm:hidden dark:from-dark-bg-primary"></div>
              <div className="absolute top-0 right-0 bottom-1 w-6 bg-gradient-to-l from-violet-50 to-transparent pointer-events-none sm:hidden dark:from-dark-bg-primary"></div>
            </div>

            {/* Active filter explanation */}
            {(confidenceFilter || showMarkedOnly || showMasteredOnly) && (
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  {showMasteredOnly && <span>Zeigt alle gelernten Fragen</span>}
                  {!showMasteredOnly && confidenceFilter && (
                    <span>
                      Zeigt {confidenceFilter === "easy" && "leichte"}
                      {confidenceFilter === "medium" && "mittlere"}
                      {confidenceFilter === "hard" && "schwere"} Fragen
                    </span>
                  )}
                  {showMarkedOnly && !showMasteredOnly && !confidenceFilter && (
                    <span>Zeigt nur markierte Fragen</span>
                  )}
                  {showMarkedOnly && (confidenceFilter || showMasteredOnly) && (
                    <span> · Nur markierte</span>
                  )}
                </p>
                <button
                  onClick={() => {
                    setConfidenceFilter(null);
                    setShowMarkedOnly(false);
                    setShowMasteredOnly(false);
                  }}
                  className="text-xs text-slate-500 hover:text-purple-600 transition-colors duration-200 underline"
                >
                  Zurücksetzen
                </button>
              </div>
            )}

            {/* Empty state */}
            {(confidenceFilter || showMarkedOnly || showMasteredOnly) &&
              filteredQuestions.length === 0 && (
                <div className="mt-4 px-2 sm:px-0">
                  <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-purple-100 dark:border-purple-500/30 shadow-lg text-center">
                    <div className="mb-4 sm:mb-6">
                      <div className="inline-flex p-3 sm:p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl">
                        <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                      Noch keine Fragen hier!
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-sm mx-auto leading-relaxed">
                      Beginne Fragen zu beantworten und markiere sie nach Schwierigkeit oder als gelernt.
                    </p>
                    <button
                      onClick={() => navigate("/einbuergerungstest/training")}
                      className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 text-sm sm:text-base"
                    >
                      Jetzt starten
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              )}
          </div>
        )}

        {/* Questions List - Better spacing for mobile */}
        <div className="space-y-3 sm:space-y-4">
          {filteredQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              progressData={progressMap.get(q.id)}
              onProgressUpdate={loadUserProgress}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
