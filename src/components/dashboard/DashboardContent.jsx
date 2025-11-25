/**
 * DashboardContent
 * Main content area for dashboard route.
 * Extracted from Dashboard page component for better separation of concerns.
 * Preserves existing visual design exactly.
 */
import { Link } from "react-router-dom";
import { Headphones, Eye, PenTool, FileText, ArrowRight } from "lucide-react";
import { allThemes } from "../../features/themes/themesData";
import * as LucideIcons from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import EinbuergerungstestProfile from "./EinbuergerungstestProfile";

export default function DashboardContent() {
  const { isAuthenticated } = useAuthStore();
  const examParts = [
    {
      title: "Hören",
      subtitle: "4 Teile • 25 Minuten",
      description: "Ansagen, Radio, Gespräche & Meinungen",
      icon: Headphones,
      color: "from-purple-500 to-indigo-600",
      href: "/tests/hoeren",
      available: true,
    },
    {
      title: "Lesen",
      subtitle: "3 Teile • 45 Minuten",
      description: "Kataloge, Artikel & formelle Texte",
      icon: Eye,
      color: "from-indigo-500 to-purple-600",
      href: "/tests/lesen",
      available: true,
    },
    {
      title: "Schreiben",
      subtitle: "1 Brief • 30 Minuten",
      description: "Formeller oder informeller Brief",
      icon: FileText,
      color: "from-purple-600 to-pink-600",
      href: "/tests/schreiben",
      available: true,
    },
    {
      title: "Sprechen",
      subtitle: "3 Teile • 15 Minuten",
      description: "Vorstellen, Erfahrungen & Aushandeln",
      icon: PenTool,
      color: "from-pink-500 to-purple-600",
      href: "/tests/sprechen",
      available: true,
    },
  ];

  // Real themes data from extracted quizzes (20 themes, 316 questions total)

  return (
    <div className="pt-20 px-4 pb-8 sm:p-6 lg:p-8 lg:pt-8 h-screen overflow-hidden flex flex-col">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {/* Einbürgerungstest Profile Card (on top for authenticated users) */}
        {isAuthenticated && <EinbuergerungstestProfile />}
        {/* Exam Parts */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-dark-text-primary mb-4">
            Prüfungsteile
          </h2>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
            {examParts.map((part) => (
              <Link
                key={part.title}
                to={part.available ? part.href : "#"}
                className={`backdrop-blur-md rounded-2xl p-4 shadow-lg border transition-all duration-300 group relative ${
                  part.available
                    ? "bg-white/90 dark:bg-white/10 border-purple-200 dark:border-purple-400/40 hover:shadow-xl hover:-translate-y-1 hover:border-purple-300 dark:hover:border-purple-400/60 cursor-pointer"
                    : "bg-white/60 dark:bg-white/5 border-gray-200 dark:border-gray-600/30 opacity-70 cursor-not-allowed"
                }`}
                onClick={(e) => !part.available && e.preventDefault()}
              >
                {/* Bald Badge */}
                {!part.available && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-md">
                    Bald
                  </div>
                )}{" "}
                <div
                  className={`w-10 h-10 bg-gradient-to-r ${part.color} rounded-lg flex items-center justify-center mb-3 transition-transform duration-300 shadow-lg ${
                    part.available ? "group-hover:scale-110" : "opacity-50"
                  }`}
                >
                  <part.icon size={20} className="text-white" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-dark-text-primary mb-1">
                  {part.title}
                </h3>
                <p className="text-xs text-purple-600 dark:text-purple-300 mb-2 font-semibold">
                  {part.subtitle}
                </p>
                <p className="text-xs text-gray-600 dark:text-dark-text-secondary line-clamp-2 mb-2">
                  {part.description}
                </p>
                {/* Arrow indicator for available items */}
                {part.available && (
                  <div className="flex items-center justify-end mt-2">
                    <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Themes Grid - All 20 Real Themes */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
            Themen
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {allThemes.map((theme) => {
              const IconComponent =
                LucideIcons[theme.icon] || LucideIcons.BookOpen;
              return (
                <Link
                  key={theme.id}
                  to={`/themes/${theme.id}`}
                  className="bg-white/90 dark:bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-purple-200 dark:border-purple-400/40 hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-400/60 transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                >
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${theme.color} rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg flex items-center justify-center`}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-dark-text-primary mb-1 line-clamp-2">
                    {theme.name}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-300 text-xs font-bold">
                    {theme.questionCount} Übungen
                  </p>
                </Link>
              );
            })}
          </div>
          {/* Extra spacing for mobile to avoid hamburger button overlap */}
          <div className="h-20 lg:h-0"></div>
        </div>
      </div>
    </div>
  );
}
