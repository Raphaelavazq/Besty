import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  BookOpen,
  Play,
  Shuffle,
  ArrowRight,
  Target,
  Clock,
  Brain,
  Trophy,
  FileText,
} from "lucide-react";
import "../../styles/glassmorphism.css";

export default function EinbuergerungstestHub() {
  const practiceOptions = [
    {
      id: "probetest",
      title: "Probetest",
      description:
        "Offizieller Test mit 33 zufälligen Fragen (30 allgemeine + 3 Bundesland) und 60-Minuten-Timer",
      icon: Trophy,
      color: "from-purple-500 to-indigo-600",
      path: "/einbuergerungstest/probetest",
    },
    {
      id: "training",
      title: "Training",
      description:
        "Alle 310 Fragen für dein Bundesland üben (300 allgemeine + 10 Bundesland-spezifisch)",
      icon: Brain,
      color: "from-pink-500 to-purple-600",
      path: "/einbuergerungstest/training",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary">
      {/* Hero Section - Full Viewport with Glass Layer */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 dark:from-purple-900 dark:via-indigo-950 dark:to-purple-950 min-h-screen flex items-center p-4 sm:p-8 lg:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>

        {/* Full Glass Container */}
        <div className="absolute inset-4 sm:inset-8 lg:inset-12 bg-purple-500/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl"></div>

        <div className="relative max-w-7xl mx-auto w-full z-10">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12">
            {/* Lottie Animation */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-80 lg:h-80 flex-shrink-0 flex items-center justify-center">
              <DotLottieReact
                src="https://lottie.host/e625cdca-0dac-4776-a55e-0b437f54c0a7/diw9hO8Z3c.lottie"
                loop
                autoplay
                className="w-full h-full filter brightness-125"
              />
            </div>

            {/* Text Content */}
            <div className="text-center lg:text-left flex-1 px-2 sm:px-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 lg:mb-8 tracking-tight leading-tight">
                <span className="hidden sm:inline">Einbürgerungstest</span>
                <span className="sm:hidden">Einbürgerungs-</span>
                <br className="sm:hidden" />
                <span className="hidden sm:inline"> </span>
                <span>Fragenkatalog</span>
              </h1>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-white/80 text-xs sm:text-sm mb-5 sm:mb-6 lg:mb-8">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="font-semibold">Offiziell 2025</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="font-semibold">300 + 10 Land</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Brain className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="font-semibold">Interaktiv</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link to="/einbuergerungstest/fragenkatalog">
                <button className="inline-flex items-center gap-2 bg-white dark:bg-white/10 text-purple-700 dark:text-purple-400 px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-200 hover:bg-purple-50 dark:hover:bg-white/20 border-2 border-transparent dark:border-purple-500/30 w-full sm:w-auto">
                  <span>Zum Katalog</span>
                  <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                </button>
              </Link>
            </div>
          </div>

          {/* Scroll Indicator - Centered Below Content - Hidden on Mobile */}
          <div className="hidden sm:flex justify-center mt-8 lg:mt-12 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1">
              <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Practice Options Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2 sm:mb-4 tracking-tight leading-tight pb-2">
            So kannst du üben
          </h2>
          <p className="text-slate-600 dark:text-dark-text-secondary text-base sm:text-lg lg:text-xl leading-relaxed font-light">
            Wähle zwischen Probetest oder Training
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {practiceOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Link
                key={option.id}
                to={option.path}
                className="glass-card-interactive p-6 sm:p-8 relative overflow-hidden block"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 opacity-0 hover:opacity-100 transition-opacity duration-200"></div>

                <div className="relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 dark:text-dark-text-primary mb-2 sm:mb-3 leading-tight">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 dark:text-dark-text-secondary text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed">
                    {option.description}
                  </p>

                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-100 dark:border-purple-500/40 mb-4 sm:mb-6">
                    <span className="text-purple-600 dark:text-purple-300 text-xs sm:text-sm font-bold">
                      {option.id === "probetest"
                        ? "33 Fragen • 60 Minuten • Timer"
                        : "310 Fragen • Kein Zeitlimit"}
                    </span>
                  </div>

                  <div className="flex items-center justify-end">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl flex items-center justify-center hover:from-purple-600 hover:to-indigo-600 transition-all duration-200">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
