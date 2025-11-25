import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Bookmark,
  Smile,
  Meh,
  Frown,
  CheckCircle2,
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
    <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-500/30">
      <div className="flex items-start gap-4">
        {/* Question Number - Large and prominent */}
        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-black text-lg">
            {q.originalNum || q.id}
          </span>
        </div>

        <div className="flex-1">
          {/* Top Row: Badges + Bookmark */}
          <div className="flex items-center justify-between mb-3">
            {/* Small badges for metadata */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Category badge - small */}
              <span className="text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 px-2 py-0.5 rounded">
                {q.category}
              </span>
              {/* Bundesland badge for state questions */}
              {q.type !== "general" && (
                <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 px-2 py-0.5 rounded">
                  📍 {q.bundesland}
                </span>
              )}
              {/* Mastered badge - show if marked as "Ich kann das" */}
              {isAuthenticated && isMastered && (
                <span className="text-xs font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Gelernt
                </span>
              )}
            </div>

            {/* Bookmark Button (for authenticated users) */}
            {isAuthenticated && (
              <button
                onClick={toggleMarkForReview}
                disabled={loading}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all ${
                  isMarkedForReview
                    ? "bg-amber-500 text-white hover:bg-amber-600"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-900/30"
                }`}
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${isMarkedForReview ? "fill-current" : ""}`}
                />
                {isMarkedForReview ? "Markiert" : "Markieren"}
              </button>
            )}
          </div>

          {/* Question text */}
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

          {/* Answer options */}
          <div className="space-y-2">
            {q.options.map((option, index) => {
              const isCorrect = index === q.correctAnswer;
              const isSelected = selectedAnswer === index;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={showCorrect}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                    showCorrect
                      ? isCorrect
                        ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                        : isSelected
                          ? "border-rose-400 bg-rose-50 dark:bg-rose-900/20"
                          : "border-gray-200 dark:border-purple-500/30 opacity-50"
                      : "border-purple-200 dark:border-purple-500/30 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer"
                  }`}
                >
                  <span className="font-bold text-gray-900 dark:text-white">
                    {String.fromCharCode(65 + index)})
                  </span>{" "}
                  <span className="text-gray-900 dark:text-white">
                    {option}
                  </span>
                  {showCorrect && isCorrect && (
                    <span className="ml-2 text-emerald-600 dark:text-emerald-400 font-bold">
                      ✓ Richtig
                    </span>
                  )}
                  {showCorrect && isSelected && !isCorrect && (
                    <span className="ml-2 text-rose-600 dark:text-rose-400 font-bold">
                      ✗ Falsch
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Confidence Selector - Always visible for authenticated users */}
          {isAuthenticated && (
            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-gray-200 dark:border-gray-700 pt-4">
              {/* Show reset button only after answering */}
              {showCorrect && (
                <button
                  onClick={() => {
                    setSelectedAnswer(null);
                    setShowCorrect(false);
                  }}
                  className="px-4 py-2 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800/30 transition-colors"
                >
                  🔄 Noch einmal
                </button>
              )}

              {/* "I Know This" Button - Prominent */}
              <button
                onClick={toggleMastered}
                disabled={loading}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-2 ${
                  isMastered
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                    : "bg-white/80 text-slate-700 border border-slate-200 hover:border-purple-300 hover:bg-purple-50"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {isMastered ? "Gelernt" : "Ich kann das"}
              </button>

              {/* Confidence Level Buttons - Minimal chips */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setConfidence("easy")}
                  disabled={loading}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    confidenceLevel === "easy"
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-white/80 text-slate-600 border border-slate-200 hover:border-purple-300 hover:bg-purple-50"
                  }`}
                >
                  <Smile className="w-3.5 h-3.5" />
                  Leicht
                </button>
                <button
                  onClick={() => setConfidence("medium")}
                  disabled={loading}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    confidenceLevel === "medium"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-white/80 text-slate-600 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50"
                  }`}
                >
                  <Meh className="w-3.5 h-3.5" />
                  Mittel
                </button>
                <button
                  onClick={() => setConfidence("hard")}
                  disabled={loading}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    confidenceLevel === "hard"
                      ? "bg-slate-700 text-white shadow-sm"
                      : "bg-white/80 text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
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
            Offizielle BAMF-Fragen (Stand: 07.05.2025)
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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with navigation */}
        <div className="flex justify-between items-center mb-6">
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

        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2 pb-2">
          Fragenkatalog
        </h1>
        <p className="text-gray-600 dark:text-dark-text-secondary mb-8">
          310 Fragen für {selectedBundesland}
        </p>

        {/* Search by question number */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Frage-Nummer eingeben (z.B. 25) oder Stichwort suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl border border-purple-100 dark:border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-dark-text-primary"
            />
          </div>
          {searchTerm && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {filteredQuestions.length} Ergebnisse für "{searchTerm}"
            </p>
          )}
        </div>

        {/* Minimal App-Like Filter Chips */}
        {isAuthenticated && userProgress.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {/* Difficulty Chips */}
              <button
                onClick={() => {
                  const newValue = confidenceFilter === "easy" ? null : "easy";
                  setConfidenceFilter(newValue);
                  // Clear "Gelernt" when selecting difficulty
                  if (newValue !== null) {
                    setShowMasteredOnly(false);
                  }
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  confidenceFilter === "easy"
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white/80 text-slate-600 hover:bg-purple-50 border border-slate-200"
                }`}
              >
                <Smile className="w-3.5 h-3.5" />
                <span>Leicht</span>
                <span className="text-xs opacity-75">
                  {
                    userProgress.filter(
                      (p) =>
                        p.confidence_level === "easy" && p.is_mastered !== true
                    ).length
                  }
                </span>
              </button>

              <button
                onClick={() => {
                  const newValue =
                    confidenceFilter === "medium" ? null : "medium";
                  setConfidenceFilter(newValue);
                  // Clear "Gelernt" when selecting difficulty
                  if (newValue !== null) {
                    setShowMasteredOnly(false);
                  }
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  confidenceFilter === "medium"
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white/80 text-slate-600 hover:bg-purple-50 border border-slate-200"
                }`}
              >
                <Meh className="w-3.5 h-3.5" />
                <span>Mittel</span>
                <span className="text-xs opacity-75">
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
                  const newValue = confidenceFilter === "hard" ? null : "hard";
                  setConfidenceFilter(newValue);
                  // Clear "Gelernt" when selecting difficulty
                  if (newValue !== null) {
                    setShowMasteredOnly(false);
                  }
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  confidenceFilter === "hard"
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white/80 text-slate-600 hover:bg-purple-50 border border-slate-200"
                }`}
              >
                <Frown className="w-3.5 h-3.5" />
                <span>Schwer</span>
                <span className="text-xs opacity-75">
                  {
                    userProgress.filter(
                      (p) =>
                        p.confidence_level === "hard" && p.is_mastered !== true
                    ).length
                  }
                </span>
              </button>

              {/* Divider */}
              <div className="w-px h-8 bg-slate-200 self-center mx-1"></div>

              {/* Marked Chip */}
              <button
                onClick={() => setShowMarkedOnly(!showMarkedOnly)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  showMarkedOnly
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white/80 text-slate-600 hover:bg-indigo-50 border border-slate-200"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Markiert</span>
                <span className="text-xs opacity-75">
                  {userProgress.filter((p) => p.marked_for_review).length}
                </span>
              </button>

              {/* Mastered Chip - Mutually exclusive with difficulty filters */}
              <button
                onClick={() => {
                  const newValue = !showMasteredOnly;
                  setShowMasteredOnly(newValue);
                  // Clear difficulty filter when selecting "Gelernt"
                  if (newValue) {
                    setConfidenceFilter(null);
                  }
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  showMasteredOnly
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                    : "bg-white/80 text-slate-600 hover:bg-purple-50 border border-slate-200"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Gelernt</span>
                <span className="text-xs opacity-75">
                  {userProgress.filter((p) => p.is_mastered).length}
                </span>
              </button>
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
                <div className="mt-4 text-center py-8">
                  <p className="text-sm text-slate-500">
                    Keine Fragen gefunden
                  </p>
                </div>
              )}
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              progressData={progressMap.get(q.id)}
              onProgressUpdate={loadUserProgress}
            />
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-dark-text-secondary">
            Keine Fragen gefunden
          </div>
        )}
      </div>
    </div>
  );
}
