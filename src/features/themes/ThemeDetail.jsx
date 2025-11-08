import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Trophy,
  Clock,
  ArrowRight,
  Play,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { getThemeById } from "./themesData";

/**
 * Theme Detail Page - Hero Style
 * Full viewport hero + theme info + quick start action
 */
function ThemeDetail() {
  const { themeId } = useParams();
  const navigate = useNavigate();
  const theme = getThemeById(themeId);

  if (!theme) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-dark-text-primary mb-4">
            Thema nicht gefunden
          </h1>
          <Link
            to="/dashboard"
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold"
          >
            ← Zurück zum Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Get dynamic icon
  const IconComponent = LucideIcons[theme.icon] || LucideIcons.BookOpen;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary">
      {/* Hero Section - Full Viewport */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-800 dark:from-purple-900 dark:via-indigo-950 dark:to-purple-950 min-h-screen flex items-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 w-full">
          {/* Back Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-white/90 hover:text-white font-semibold transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Dashboard
          </button>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Icon */}
            <div className="w-40 h-40 lg:w-48 lg:h-48 flex-shrink-0">
              <div className="w-full h-full bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 flex items-center justify-center">
                <IconComponent className="w-24 h-24 lg:w-32 lg:h-32 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 lg:mb-6">
                {theme.name}
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-6 lg:mb-8 max-w-3xl">
                {theme.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 lg:gap-6 justify-center lg:justify-start mb-8 lg:mb-10">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                  <BookOpen className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">
                    {theme.questionCount} Übungen
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                  <Clock className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">
                    ca. {Math.ceil(theme.questionCount * 0.5)} Min.
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                to={`/themes/${themeId}/quiz`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-700 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-200 group"
              >
                <Play className="w-6 h-6" />
                Wortschatz-Quiz starten
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeDetail;
