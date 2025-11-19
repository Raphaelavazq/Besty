/**
 * LesenHub - Reading test hub page
 * Full viewport hero + exam structure + practice options
 */

import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock,
  Target,
  ArrowRight,
  Brain,
  Trophy,
  FileText,
  Newspaper,
  Mail,
  Play,
  CheckCircle,
  Lightbulb,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LesenHub() {
  const practiceOptions = [
    {
      id: "training",
      title: "Training",
      description: "Zufällige Übungen",
      icon: Brain,
      path: "/tests/lesen/training",
    },
    {
      id: "test",
      title: "Prüfung",
      description: "Modelltest (45 Min)",
      icon: Trophy,
      path: "/tests/lesen/pruefung",
    },
  ];

  const teileInfo = [
    {
      teil: "1",
      title: "Kataloge & Anzeigen",
      duration: "15 Min",
      description: "5 Aufgaben zuordnen",
      icon: FileText,
    },
    {
      teil: "2",
      title: "Zeitungsartikel",
      duration: "15 Min",
      description: "5 Richtig/Falsch",
      icon: Newspaper,
    },
    {
      teil: "3",
      title: "Formelle Texte",
      duration: "15 Min",
      description: "10 Multiple-Choice",
      icon: Mail,
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
                Lesen Training
              </h1>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-white/80 text-xs sm:text-sm mb-5 sm:mb-6 lg:mb-8">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="font-semibold">45 Minuten</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="font-semibold">20 Punkte</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="font-semibold">3 Teile</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link to="/tests/lesen/pruefung">
                <button className="inline-flex items-center gap-2 bg-white dark:bg-white/10 text-purple-700 dark:text-purple-400 px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-200 hover:bg-purple-50 dark:hover:bg-white/20 border-2 border-transparent dark:border-purple-500/30 w-full sm:w-auto">
                  <span>Jetzt üben</span>
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
        {/* Prüfungsstruktur - Clean Timeline Design */}
        <div className="mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2 sm:mb-3 tracking-tight leading-tight pb-2">
              Prüfungsstruktur
            </h2>
            <p className="text-slate-600 dark:text-dark-text-secondary text-base sm:text-lg lg:text-xl leading-relaxed font-light">
              3 Teile • 45 Minuten • 20 Punkte
            </p>
          </div>

          {/* Timeline Layout */}
          <div className="max-w-5xl mx-auto space-y-8">
            {teileInfo.map((info, index) => {
              const Icon = info.icon;

              return (
                <div
                  key={info.teil}
                  className="relative flex gap-6 items-start group"
                >
                  {/* Part Number Circle */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl font-black text-white">
                        {info.teil}
                      </span>
                    </div>
                    {/* Connecting Line */}
                    {index < teileInfo.length - 1 && (
                      <div className="absolute left-10 top-20 w-0.5 h-16 bg-gradient-to-b from-purple-300 to-purple-200 dark:from-purple-500/50 dark:to-purple-600/30"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">
                          {info.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                        <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                          {info.duration}
                        </span>
                      </div>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-dark-text-secondary leading-relaxed">
                      {info.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Übungsoptionen */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Wie möchten Sie üben?
          </h2>
          <p className="text-slate-600 dark:text-dark-text-secondary text-lg lg:text-xl leading-relaxed font-light">
            Wählen Sie Ihren Lernweg
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {practiceOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Link
                key={option.id}
                to={option.path}
                className="group relative bg-white/90 dark:bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-200 dark:border-purple-400/40 hover:shadow-3xl hover:border-purple-300 dark:hover:border-purple-400/60 transition-all duration-200 hover:-translate-y-2 hover:scale-105 overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 dark:from-purple-500/10 dark:to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-dark-text-primary mb-3">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 dark:text-dark-text-secondary text-base lg:text-lg mb-6 leading-relaxed">
                    {option.description}
                  </p>

                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-100 dark:border-purple-500/40 mb-6">
                    <span className="text-purple-600 dark:text-purple-300 text-sm font-bold">
                      Alle Teile • Flexibel
                    </span>
                  </div>

                  <div className="flex items-center justify-end">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center group-hover:from-purple-600 group-hover:to-indigo-600 transition-all duration-200">
                      <Play className="w-5 h-5 text-purple-600 dark:text-white group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Tipps für die Prüfung */}
        <div className="bg-white/90 dark:bg-white/10 backdrop-blur-md rounded-3xl p-8 lg:p-10 shadow-xl border border-purple-200 dark:border-purple-400/40">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">
              Tipps für die Leseprüfung
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            <div className="flex items-start gap-2 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl p-4 border border-transparent dark:border-purple-500/20">
              <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700 dark:text-dark-text-secondary">
                Lesen Sie die Fragen zuerst
              </div>
            </div>

            <div className="flex items-start gap-2 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl p-4 border border-transparent dark:border-purple-500/20">
              <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700 dark:text-dark-text-secondary">
                Suchen Sie Schlüsselwörter
              </div>
            </div>

            <div className="flex items-start gap-2 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl p-4 border border-transparent dark:border-purple-500/20">
              <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700 dark:text-dark-text-secondary">
                Zeit gut einteilen (15 Min pro Teil)
              </div>
            </div>

            <div className="flex items-start gap-2 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl p-4 border border-transparent dark:border-purple-500/20">
              <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700 dark:text-dark-text-secondary">
                Nicht jedes Wort verstehen müssen
              </div>
            </div>

            <div className="flex items-start gap-2 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl p-4 border border-transparent dark:border-purple-500/20">
              <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700 dark:text-dark-text-secondary">
                Bei Teil 1 logisch denken
              </div>
            </div>

            <div className="flex items-start gap-2 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl p-4 border border-transparent dark:border-purple-500/20">
              <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700 dark:text-dark-text-secondary">
                Bei Teil 3 genau lesen
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Animation */}
        <div className="text-center mt-16 mb-8">
          <div className="w-full h-96 flex items-center justify-center">
            <div className="w-full h-full">
              <DotLottieReact
                src="https://lottie.host/df4c6eaa-b74d-4587-a196-fb9379541445/4SAvaM4Szg.lottie"
                loop
                autoplay
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
