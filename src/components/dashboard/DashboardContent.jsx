/**
 * DashboardContent
 * Main content area for dashboard route.
 * Extracted from Dashboard page component for better separation of concerns.
 * Preserves existing visual design exactly.
 */
import { Link } from "react-router-dom";
import { Play, Target, Headphones, Eye, PenTool, FileText } from "lucide-react";

export default function DashboardContent() {
  const mainActions = [
    {
      title: "Prüfung starten",
      subtitle: "Vollständige Simulation",
      description: "Komplette DTZ-Prüfung unter realen Bedingungen",
      icon: Play,
      color: "from-purple-600 to-indigo-600",
      href: "/tests",
    },
    {
      title: "Gezieltes Training",
      subtitle: "Einzelne Bereiche",
      description: "Fokussierte Übungen für spezifische Fertigkeiten",
      icon: Target,
      color: "from-indigo-600 to-purple-600",
      href: "/study",
    },
  ];

  const examParts = [
    {
      title: "Hörverstehen",
      subtitle: "4 Teile • 25 Minuten",
      description: "Ansagen, Gespräche & Diskussionen verstehen",
      icon: Headphones,
      color: "from-purple-500 to-indigo-600",
      progress: 75,
      href: "/tests/hoeren",
    },
    {
      title: "Leseverstehen",
      subtitle: "3 Teile • 45 Minuten",
      description: "Texte lesen und verstehen",
      icon: Eye,
      color: "from-indigo-500 to-purple-600",
      progress: 60,
      href: "/tests/lesen",
    },
    {
      title: "Sprachbausteine",
      subtitle: "2 Teile • 15 Minuten",
      description: "Grammatik & Wortschatz",
      icon: PenTool,
      color: "from-purple-600 to-pink-600",
      progress: 40,
      href: "/tests/sprachbausteine",
    },
    {
      title: "Schriftlicher Ausdruck",
      subtitle: "1 Brief • 30 Minuten",
      description: "Formeller oder informeller Brief schreiben",
      icon: FileText,
      color: "from-pink-500 to-purple-600",
      progress: 30,
      href: "/tests/schreiben",
    },
  ];

  const themes = [
    {
      name: "Familie & Freunde",
      count: 12,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Wohnen & Leben",
      count: 15,
      color: "from-indigo-500 to-purple-500",
    },
    { name: "Gesundheit", count: 10, color: "from-purple-600 to-indigo-600" },
    { name: "Arbeit & Beruf", count: 18, color: "from-pink-500 to-purple-500" },
    { name: "Einkaufen", count: 8, color: "from-purple-500 to-indigo-500" },
    {
      name: "Verkehr & Mobilität",
      count: 9,
      color: "from-indigo-600 to-purple-600",
    },
  ];

  return (
    <div className="pt-20 px-4 pb-8 sm:p-6 lg:p-8 lg:pt-8 h-screen overflow-hidden flex flex-col">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mainActions.map((action) => (
            <Link
              key={action.title}
              to={action.href}
              className="group bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                <action.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {action.title}
              </h3>
              <p className="text-sm text-purple-600 mb-1">{action.subtitle}</p>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </Link>
          ))}
        </div>

        {/* Exam Parts Progress */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Prüfungsteile
          </h2>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
            {examParts.map((part) => (
              <Link
                key={part.title}
                to={part.href}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-purple-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                <div
                  className={`w-10 h-10 bg-gradient-to-r ${part.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <part.icon size={20} className="text-white" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  {part.title}
                </h3>
                <p className="text-xs text-purple-600 mb-2">{part.subtitle}</p>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {part.description}
                </p>
                <div className="w-full bg-purple-100 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 bg-gradient-to-r ${part.color} rounded-full transition-all duration-500`}
                    style={{ width: `${part.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs font-medium text-gray-700">
                  {part.progress}% abgeschlossen
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Themes */}
        <div className="pb-6 lg:pb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Themen</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {themes.map((theme) => (
              <div
                key={theme.name}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-purple-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                <div
                  className={`w-8 h-8 bg-gradient-to-r ${theme.color} rounded-lg mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                ></div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  {theme.name}
                </h3>
                <p className="text-purple-600 text-xs">{theme.count} Übungen</p>
              </div>
            ))}
          </div>
          {/* Extra spacing for mobile to avoid hamburger button overlap */}
          <div className="h-20 lg:h-0"></div>
        </div>
      </div>
    </div>
  );
}
