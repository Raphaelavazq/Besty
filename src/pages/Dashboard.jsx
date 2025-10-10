import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {
  Headphones,
  Eye,
  PenTool,
  MessageSquare,
  PlayCircle,
  Briefcase,
  Heart,
  Plane,
  Home,
  Leaf,
  Banknote,
  Users,
  Building,
  ShoppingCart,
  Smartphone,
  Zap,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

export default function Dashboard() {
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("all");

  useEffect(() => {
    fetch("/data/themes.json")
      .then((r) => r.json())
      .then(setThemes)
      .catch(() => setThemes([]));
  }, []);

  const user = {
    name: "Maria Schmidt",
  };

  const subjects = [
    {
      id: "hoeren",
      name: "Hören",
      icon: Headphones,
      description: "Verstehen von Gesprächen",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      id: "lesen",
      name: "Lesen",
      icon: Eye,
      description: "Verstehen von Texten",
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      id: "schreiben",
      name: "Schreiben",
      icon: PenTool,
      description: "E-Mails und Texte",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      id: "sprechen",
      name: "Sprechen",
      icon: MessageSquare,
      description: "Mündliche Kommunikation",
      gradient: "from-indigo-600 to-blue-600",
    },
  ];

  const getThemeIcon = (iconName) => {
    const icons = {
      briefcase: Briefcase,
      heart: Heart,
      plane: Plane,
      home: Home,
      leaf: Leaf,
      banknote: Banknote,
      users: Users,
      building: Building,
      "shopping-cart": ShoppingCart,
      smartphone: Smartphone,
    };
    return icons[iconName] || Briefcase;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-cyan-50 overflow-auto relative pt-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-indigo-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-pink-200/30 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8 relative z-10">
        {/* Mobile-Optimized Header */}
        <header className="mb-6 sm:mb-12">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 relative">
              {/* Circle background for logo */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-full backdrop-blur-sm border border-white/30"></div>
              <div className="relative z-10 p-2 sm:p-3">
                <DotLottieReact
                  src="https://lottie.host/e625cdca-0dac-4776-a55e-0b437f54c0a7/diw9hO8Z3c.lottie"
                  loop
                  autoplay
                  className="w-full h-full"
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                B1 Bestie
              </h1>
              <p className="text-slate-600 text-sm sm:text-lg">
                DTZ Prüfungsvorbereitung
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/90 via-purple-50/80 to-indigo-50/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-white/60 hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:-translate-y-2 group">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent mb-3 group-hover:from-purple-500 group-hover:via-indigo-500 group-hover:to-purple-600 transition-all duration-300">
                Willkommen zurück
              </h2>
              <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed group-hover:text-slate-800 transition-colors duration-300">
                Bereit für deine nächste <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent font-semibold group-hover:from-purple-500 group-hover:to-indigo-500 transition-all duration-300">Lerneinheit</span>?
              </p>
            </div>
          </div>
        </header>

        {/* Mobile-Scrollable Content Container */}
        <div className="space-y-6 sm:space-y-12 pb-8">
          {/* Test Start Section */}
          <section>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-4 sm:mb-6 px-1">
              Prüfung starten
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
              <Link
                to="/tests"
                className="group bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <PlayCircle
                  size={28}
                  className="mb-3 group-hover:scale-110 transition-transform sm:hidden text-white"
                />
                <PlayCircle
                  size={32}
                  className="mb-4 group-hover:scale-110 transition-transform hidden sm:block text-white"
                />
                <h4 className="text-xl sm:text-2xl font-bold mb-2 text-purple-50">
                  Volltest
                </h4>
                <p className="text-purple-50 mb-3 sm:mb-4 text-sm sm:text-base">
                  Komplette DTZ B1 Simulation mit allen Prüfungsteilen
                </p>
                <div className="flex items-center text-purple-50 text-sm sm:text-base">
                  <span className="mr-2">Jetzt starten</span>
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform sm:w-4 sm:h-4"
                  />
                </div>
              </Link>

              <Link
                to="/tests?mode=quick"
                className="group bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Zap
                  size={28}
                  className="mb-3 group-hover:scale-110 transition-transform sm:hidden text-white"
                />
                <Zap
                  size={32}
                  className="mb-4 group-hover:scale-110 transition-transform hidden sm:block text-white"
                />
                <h4 className="text-xl sm:text-2xl font-bold mb-2 text-purple-50">
                  Schnelltest
                </h4>
                <p className="text-purple-50 mb-3 sm:mb-4 text-sm sm:text-base">
                  Kurze Übungsrunden für zwischendurch
                </p>
                <div className="flex items-center text-purple-50 text-sm sm:text-base">
                  <span className="mr-2">Schnell üben</span>
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform sm:w-4 sm:h-4"
                  />
                </div>
              </Link>
            </div>
          </section>

          {/* Subject Cards Section */}
          <section>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-4 sm:mb-6 px-1">
              Prüfungsteile
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {subjects.map((subject) => {
                const Icon = subject.icon;
                return (
                  <Link
                    key={subject.id}
                    to={`/tests?filter=${subject.id}`}
                    className="group bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:scale-105"
                  >
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${subject.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <Icon size={18} className="text-white sm:hidden" />
                      <Icon size={20} className="text-white hidden sm:block" />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-1 sm:mb-2 text-sm sm:text-base">
                      {subject.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {subject.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Themes Section */}
          <section className="pb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-4 sm:mb-6 px-1">
              Themen
            </h3>
            <div className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/50">
              <div className="grid grid-cols-2 gap-3 sm:gap-3 md:grid-cols-4">
                {themes.slice(0, 8).map((theme, index) => {
                  const Icon = getThemeIcon(theme.icon);
                  const gradients = [
                    "from-purple-400 to-indigo-500",
                    "from-indigo-400 to-purple-500",
                    "from-purple-500 to-pink-500",
                    "from-indigo-500 to-blue-500",
                  ];
                  const gradient = gradients[index % gradients.length];

                  return (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`p-3 rounded-lg sm:rounded-xl transition-all duration-300 border text-left ${
                        selectedTheme === theme.id
                          ? "bg-purple-50 border-purple-300 ring-2 ring-purple-200"
                          : "bg-white/60 border-white/50 hover:bg-purple-50"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br ${gradient} rounded-md sm:rounded-lg flex items-center justify-center mb-2 shadow-md`}
                      >
                        <Icon size={12} className="text-white sm:hidden" />
                        <Icon
                          size={14}
                          className="text-white hidden sm:block"
                        />
                      </div>
                      <h4 className="text-xs sm:text-sm font-medium text-slate-800 truncate">
                        {theme.name}
                      </h4>
                    </button>
                  );
                })}
              </div>

              {themes.length > 8 && (
                <Link
                  to="/themes"
                  className="block text-center text-purple-600 hover:text-purple-700 font-medium mt-4 p-2 text-sm sm:text-base"
                >
                  Alle Themen anzeigen
                </Link>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
