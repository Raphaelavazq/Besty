import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Trophy, Clock } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { getThemeById } from "./themesData";

/**
 * Theme Detail Page
 * Shows theme info and available exercises (Wortschatz Quiz card)
 */
function ThemeDetail() {
  const { themeId } = useParams();
  const navigate = useNavigate();
  const theme = getThemeById(themeId);

  if (!theme) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Thema nicht gefunden
          </h1>
          <Link
            to="/dashboard"
            className="text-purple-600 hover:text-purple-700 font-semibold"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück zum Dashboard
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Theme Header */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-purple-100 p-8 mb-8">
          <div className="flex items-start gap-6">
            {/* Icon */}
            <div
              className={`bg-gradient-to-br ${theme.color} p-6 rounded-2xl shadow-lg`}
            >
              <IconComponent className="w-12 h-12 text-white" />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-black mb-2">
                <span
                  className={`bg-gradient-to-r ${theme.color} bg-clip-text text-transparent`}
                >
                  {theme.name}
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-4">{theme.description}</p>

              {/* Stats */}
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">
                    <strong>{theme.questionCount}</strong> Übungen
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">
                    ca. <strong>{Math.ceil(theme.questionCount * 0.5)}</strong>{" "}
                    Min.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Exercises */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Verfügbare Übungen
          </h2>

          {/* Wortschatz Quiz Card */}
          <Link
            to={`/themes/${themeId}/quiz`}
            className="block bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-purple-100 p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="bg-gradient-to-br from-purple-800 to-indigo-900 p-5 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    Wortschatz-Quiz
                  </h3>
                  <p className="text-gray-600 mb-4 max-w-2xl">
                    Übe wichtige Wörter und Ausdrücke zum Thema.
                    Fill-in-the-blank Übungen mit sofortigem Feedback.
                  </p>

                  {/* Stats */}
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full">
                      <BookOpen className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-purple-700">
                        {theme.questionCount} Fragen
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-purple-700">
                        ca. {Math.ceil(theme.questionCount * 0.5)} Min.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="text-purple-600 group-hover:translate-x-2 transition-transform duration-200">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-br from-purple-800 to-indigo-900 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-start gap-4">
            <Trophy className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-2">Lerntipps</h3>
              <ul className="space-y-2 text-white/90">
                <li>• Nimm dir Zeit und lies jede Frage sorgfältig</li>
                <li>• Versuche, die Wörter im Kontext zu verstehen</li>
                <li>• Wiederhole falsch beantwortete Fragen</li>
                <li>• Nutze die gelernten Wörter im Alltag</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeDetail;
