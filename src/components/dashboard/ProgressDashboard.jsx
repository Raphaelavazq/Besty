/**
 * ProgressDashboard
 * Comprehensive user progress tracking dashboard
 * Shows stats, streaks, skill progress, and recent activity
 */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  Headphones,
  Target,
  TrendingUp,
  Eye,
  FileText,
  PenTool,
  Brain,
  ArrowRight,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { supabase } from "../../lib/supabase";

export default function ProgressDashboard() {
  const { user, isAuthenticated } = useAuthStore();
  const [stats, setStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    studySessions: 0,
    totalStudyTime: 0,
    currentStreak: 3, // TODO: Calculate from study_sessions
    longestStreak: 7,
    examSimulations: 0,
    averageScore: 0,
  });
  const [skillProgress, setSkillProgress] = useState({
    hoeren: 0,
    lesen: 0,
    schreiben: 0,
    sprechen: 0,
  });
  const [questionProgress, setQuestionProgress] = useState({
    total: 460,
    studied: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    new: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchProgressData();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchProgressData = async () => {
    try {
      setLoading(true);

      // Fetch study sessions
      const { data: sessions } = await supabase
        .from("study_sessions")
        .select("*")
        .eq("user_id", user.id)
        .order("session_date", { ascending: false });

      // Fetch exam simulations
      const { data: exams } = await supabase
        .from("exam_simulations")
        .select("*")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false });

      // Fetch question progress
      const { data: questions } = await supabase
        .from("question_progress")
        .select("*")
        .eq("user_id", user.id);

      // Calculate stats
      const totalQuestions =
        sessions?.reduce((sum, s) => sum + (s.questions_studied || 0), 0) || 0;
      const correctAnswers =
        sessions?.reduce((sum, s) => sum + (s.correct_answers || 0), 0) || 0;
      const totalStudyTime =
        sessions?.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) || 0;
      const examCount = exams?.length || 0;
      const averageScore =
        examCount > 0
          ? Math.round(exams.reduce((sum, e) => sum + e.score, 0) / examCount)
          : 0;

      setStats({
        totalQuestions,
        correctAnswers,
        studySessions: sessions?.length || 0,
        totalStudyTime,
        currentStreak: 3, // TODO: Calculate from dates
        longestStreak: 7,
        examSimulations: examCount,
        averageScore,
      });

      // Calculate question progress
      const questionStats = {
        total: 460,
        studied: questions?.length || 0,
        easy:
          questions?.filter((q) => q.confidence_level === "easy").length || 0,
        medium:
          questions?.filter((q) => q.confidence_level === "medium").length || 0,
        hard:
          questions?.filter((q) => q.confidence_level === "hard").length || 0,
        new: questions?.filter((q) => q.confidence_level === "new").length || 0,
      };
      setQuestionProgress(questionStats);

      // Calculate skill progress (based on session types)
      const skillStats = {
        hoeren:
          sessions?.filter((s) => s.session_type === "hoeren").length || 0,
        lesen: sessions?.filter((s) => s.session_type === "lesen").length || 0,
        schreiben:
          sessions?.filter((s) => s.session_type === "schreiben").length || 0,
        sprechen:
          sessions?.filter((s) => s.session_type === "sprechen").length || 0,
      };
      setSkillProgress(skillStats);

      // Build recent activity
      const activities = [
        ...(sessions?.slice(0, 3).map((s) => ({
          type: s.session_type,
          date: new Date(s.session_date),
          details: `${s.questions_studied} Fragen bearbeitet`,
        })) || []),
        ...(exams?.slice(0, 2).map((e) => ({
          type: "probetest",
          date: new Date(e.completed_at),
          details: `Prüfung abgeschlossen: ${e.score}/33`,
        })) || []),
      ]
        .sort((a, b) => b.date - a.date)
        .slice(0, 5);

      setRecentActivity(activities);
    } catch (error) {
      console.error("Error fetching progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "hoeren":
        return Headphones;
      case "lesen":
        return Eye;
      case "schreiben":
        return FileText;
      case "sprechen":
        return PenTool;
      case "probetest":
        return Award;
      case "fragenkatalog":
        return Brain;
      default:
        return BookOpen;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "hoeren":
        return "from-purple-500 to-indigo-600";
      case "lesen":
        return "from-indigo-500 to-purple-600";
      case "schreiben":
        return "from-purple-600 to-pink-600";
      case "sprechen":
        return "from-pink-500 to-purple-600";
      case "probetest":
        return "from-amber-500 to-orange-600";
      case "fragenkatalog":
        return "from-blue-500 to-indigo-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const overallProgress =
    questionProgress.total > 0
      ? Math.round((questionProgress.studied / questionProgress.total) * 100)
      : 0;

  const accuracy =
    stats.totalQuestions > 0
      ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100)
      : 0;

  if (loading) {
    return (
      <div className="pt-20 px-4 pb-8 sm:p-6 lg:p-8 lg:pt-8 h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 pb-8 sm:p-6 lg:p-8 lg:pt-8 h-screen overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-6 sm:p-8 shadow-2xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black mb-2">
                  Hallo, {user?.fullName || "Bestie"}! 👋
                </h1>
                <p className="text-purple-100 text-sm sm:text-base">
                  Bundesland:{" "}
                  <span className="font-bold">
                    {user?.bundesland || "Berlin"}
                  </span>
                </p>
              </div>

              {/* Streak Badge */}
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center border border-white/30">
                <Flame className="w-8 h-8 mx-auto mb-2 text-orange-300" />
                <div className="text-2xl font-black">{stats.currentStreak}</div>
                <div className="text-xs opacity-90">Tage Streak</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <BookOpen className="w-5 h-5 mb-2 opacity-80" />
                <div className="text-xl sm:text-2xl font-bold">
                  {stats.totalQuestions}
                </div>
                <div className="text-xs opacity-80">Fragen</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <CheckCircle2 className="w-5 h-5 mb-2 opacity-80" />
                <div className="text-xl sm:text-2xl font-bold">{accuracy}%</div>
                <div className="text-xs opacity-80">Genauigkeit</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <Clock className="w-5 h-5 mb-2 opacity-80" />
                <div className="text-xl sm:text-2xl font-bold">
                  {formatTime(stats.totalStudyTime)}
                </div>
                <div className="text-xs opacity-80">Lernzeit</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <Award className="w-5 h-5 mb-2 opacity-80" />
                <div className="text-xl sm:text-2xl font-bold">
                  {stats.examSimulations}
                </div>
                <div className="text-xs opacity-80">Prüfungen</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overall Progress Circle */}
          <div className="bg-white/90 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-200 dark:border-purple-400/40">
            <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text-primary mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Gesamtfortschritt
            </h3>

            <div className="flex items-center justify-center mb-6">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - overallProgress / 100)}`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#9333ea" />
                      <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    {overallProgress}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {questionProgress.studied}/{questionProgress.total} Fragen
                  </div>
                </div>
              </div>
            </div>

            {/* Confidence Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Leicht
                  </span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white">
                  {questionProgress.easy}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Mittel
                  </span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white">
                  {questionProgress.medium}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Schwer
                  </span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white">
                  {questionProgress.hard}
                </span>
              </div>
            </div>
          </div>

          {/* Skills Progress */}
          <div className="bg-white/90 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-200 dark:border-purple-400/40">
            <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text-primary mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Fertigkeiten
            </h3>

            <div className="space-y-4">
              {[
                {
                  name: "Hören",
                  key: "hoeren",
                  icon: Headphones,
                  color: "purple",
                },
                { name: "Lesen", key: "lesen", icon: Eye, color: "indigo" },
                {
                  name: "Schreiben",
                  key: "schreiben",
                  icon: FileText,
                  color: "pink",
                },
                {
                  name: "Sprechen",
                  key: "sprechen",
                  icon: PenTool,
                  color: "fuchsia",
                },
              ].map((skill) => {
                const Icon = skill.icon;
                const progress = Math.min(
                  100,
                  (skillProgress[skill.key] / 10) * 100
                ); // Normalize to 100%
                return (
                  <div key={skill.key}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 text-${skill.color}-600`} />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {skillProgress[skill.key]} Sessions
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r from-${skill.color}-500 to-${skill.color}-600 transition-all duration-1000`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/90 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-200 dark:border-purple-400/40">
          <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text-primary mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Letzte Aktivität
          </h3>

          {recentActivity.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.map((activity, index) => {
                const Icon = getActivityIcon(activity.type);
                const colorClass = getActivityColor(activity.type);
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700"
                  >
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${colorClass} rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {activity.details}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {activity.date.toLocaleDateString("de-DE", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Noch keine Aktivität</p>
              <p className="text-xs mt-1">Starte dein erstes Training!</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/einburgerungstest"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <Brain className="w-8 h-8 text-white mb-3" />
            <h4 className="text-white font-bold mb-2">Fragenkatalog</h4>
            <p className="text-purple-100 text-sm mb-3">460 Fragen üben</p>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform" />
          </Link>

          <Link
            to="/einburgerungstest/probetest"
            className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <Award className="w-8 h-8 text-white mb-3" />
            <h4 className="text-white font-bold mb-2">Probetest</h4>
            <p className="text-orange-100 text-sm mb-3">33-Fragen Simulation</p>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform" />
          </Link>

          <Link
            to="/dashboard"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <BookOpen className="w-8 h-8 text-white mb-3" />
            <h4 className="text-white font-bold mb-2">Alle Bereiche</h4>
            <p className="text-indigo-100 text-sm mb-3">Alle Prüfungsteile</p>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Extra spacing for mobile */}
        <div className="h-20 lg:h-0"></div>
      </div>
    </div>
  );
}
