/**
 * EinbuergerungstestProfile
 * Compact progress card for Einbürgerungstest (460 questions)
 * Shows on top of main dashboard
 */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Bookmark,
  Target,
  TrendingUp,
  ArrowRight,
  Award,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { supabase } from "../../lib/supabase";

export default function EinbuergerungstestProfile() {
  const { user, isAuthenticated } = useAuthStore();
  const [stats, setStats] = useState({
    total: 310, // Changed from 460 to 310 (general questions only)
    mastered: 0, // Changed from "studied" to "mastered"
    markedForReview: 0, // Questions marked as "already studied in class"
    easy: 0,
    medium: 0,
    hard: 0,
    examsTaken: 0,
    bestScore: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchStats = async () => {
    try {
      // Fetch question progress
      const { data: questions } = await supabase
        .from("question_progress")
        .select("*")
        .eq("user_id", user.id);

      // Fetch exam simulations
      const { data: exams } = await supabase
        .from("exam_simulations")
        .select("score, passed")
        .eq("user_id", user.id)
        .order("score", { ascending: false })
        .limit(1);

      // Count mastered questions (marked with "Ich kann das")
      const mastered =
        questions?.filter((q) => q.is_mastered === true).length || 0;

      // Count bookmarked questions (already studied in class)
      const markedForReview =
        questions?.filter((q) => q.marked_for_review === true).length || 0;

      // Count by difficulty (EXCLUDE mastered questions from difficulty counts)
      const easy =
        questions?.filter(
          (q) => q.confidence_level === "easy" && q.is_mastered !== true
        ).length || 0;
      const medium =
        questions?.filter(
          (q) => q.confidence_level === "medium" && q.is_mastered !== true
        ).length || 0;
      const hard =
        questions?.filter(
          (q) => q.confidence_level === "hard" && q.is_mastered !== true
        ).length || 0;
      const bestScore = exams?.[0]?.score || 0;

      setStats({
        total: 310, // General questions only
        mastered,
        markedForReview,
        easy,
        medium,
        hard,
        examsTaken: exams?.length || 0,
        bestScore,
      });
    } catch (error) {
      console.error("Error fetching einbürgerungstest stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  const progress =
    stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0;
  const passPercentage = 51; // 17/33 questions to pass

  if (loading) {
    return (
      <div className="bg-white/90 dark:bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-purple-200 dark:border-purple-400/40 animate-pulse">
        <div className="h-8 bg-purple-200 dark:bg-purple-800 rounded w-1/3 mb-4"></div>
        <div className="h-20 bg-purple-100 dark:bg-purple-900/30 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-white relative overflow-hidden mb-6">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">
                Einbürgerungstest
              </h2>
              <p className="text-sm text-white/90">
                {user?.bundesland || "Berlin"} • 310 Fragen
              </p>
            </div>
          </div>

          {/* Best Score Badge (if exams taken) */}
          {stats.examsTaken > 0 && (
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 text-center border border-white/30">
              <Award className="w-5 h-5 mx-auto mb-1" />
              <div className="text-xl font-bold">{stats.bestScore}/33</div>
              <div className="text-[10px] opacity-90">Beste</div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-white">
              Gesamtfortschritt
            </span>
            <span className="text-lg font-black text-white">{progress}%</span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/30">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-1000 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-white/90 mt-1">
            {stats.mastered} / {stats.total} Fragen gelernt
          </p>
        </div>

        {/* Stats Grid - Clickable cards that filter questions */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          <Link
            to="/einbuergerungstest/fragenkatalog?filter=easy"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/20 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer group text-white"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-white/60"></div>
              <span className="text-xs opacity-80">Leicht</span>
            </div>
            <div className="text-xl font-bold group-hover:scale-110 transition-transform">
              {stats.easy}
            </div>
          </Link>

          <Link
            to="/einbuergerungstest/fragenkatalog?filter=medium"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/20 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer group text-white"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-white/60"></div>
              <span className="text-xs opacity-80">Mittel</span>
            </div>
            <div className="text-xl font-bold group-hover:scale-110 transition-transform">
              {stats.medium}
            </div>
          </Link>

          <Link
            to="/einbuergerungstest/fragenkatalog?filter=hard"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/20 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer group text-white"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-white/60"></div>
              <span className="text-xs opacity-80">Schwer</span>
            </div>
            <div className="text-xl font-bold group-hover:scale-110 transition-transform">
              {stats.hard}
            </div>
          </Link>

          <Link
            to="/einbuergerungstest/fragenkatalog?filter=gelernt"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/20 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer group text-white"
          >
            <Award className="w-4 h-4 mb-1 opacity-80 group-hover:scale-110 transition-transform" />
            <div className="text-xl font-bold group-hover:scale-110 transition-transform">
              {stats.mastered}
            </div>
            <div className="text-[10px] opacity-80">Gelernt</div>
          </Link>

          <Link
            to="/einbuergerungstest/fragenkatalog?filter=marked"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/20 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer group text-white"
          >
            <Bookmark className="w-4 h-4 mb-1 opacity-80 group-hover:scale-110 transition-transform" />
            <div className="text-xl font-bold group-hover:scale-110 transition-transform">
              {stats.markedForReview}
            </div>
            <div className="text-[10px] opacity-80">Markierte</div>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            to="/einbuergerungstest/fragenkatalog"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/30 transition-all hover:-translate-y-1 hover:shadow-lg group text-white"
          >
            <div className="flex items-center justify-between mb-2">
              <Brain className="w-5 h-5" />
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-bold">Fragenkatalog</div>
            <div className="text-xs opacity-80">Alle 310 Fragen üben</div>
          </Link>

          <Link
            to="/einbuergerungstest/training"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/30 transition-all hover:-translate-y-1 hover:shadow-lg group text-white"
          >
            <div className="flex items-center justify-between mb-2">
              <Target className="w-5 h-5" />
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-bold">Training</div>
            <div className="text-xs opacity-80">Zufällige Übung</div>
          </Link>

          <Link
            to="/einbuergerungstest/probetest"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/30 transition-all hover:-translate-y-1 hover:shadow-lg group text-white"
          >
            <div className="flex items-center justify-between mb-2">
              <Award className="w-5 h-5" />
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-bold">Probetest</div>
            <div className="text-xs opacity-80">33 Fragen Simulation</div>
          </Link>
        </div>

        {/* Review Links - Minimal style */}
        {(stats.easy > 0 || stats.hard > 0) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {stats.easy > 0 && (
              <Link
                to="/einbuergerungstest/fragenkatalog?filter=easy"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium py-2 px-4 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20"
              >
                <TrendingUp className="w-4 h-4" />
                <span>{stats.easy} Leichte</span>
              </Link>
            )}

            {stats.hard > 0 && (
              <Link
                to="/einbuergerungstest/fragenkatalog?filter=hard"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium py-2 px-4 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20"
              >
                <TrendingUp className="w-4 h-4" />
                <span>{stats.hard} Schwere</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
