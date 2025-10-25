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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
      {/* Hero Section - Full Viewport */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-800 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Lottie Animation */}
            <div className="w-40 h-40 lg:w-48 lg:h-48 flex-shrink-0">
              <DotLottieReact
                src="https://lottie.host/e625cdca-0dac-4776-a55e-0b437f54c0a7/diw9hO8Z3c.lottie"
                loop
                autoplay
                className="w-full h-full filter brightness-125"
              />
            </div>

            {/* Text Content */}
            <div className="text-center lg:text-left flex-1">
              <h1 className="text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
                Lesen Training
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-light mb-4">
                Leseverstehen üben mit Besty
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-white/80 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>45 Minuten</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>20 Punkte</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>3 Teile</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link to="/tests/lesen/pruefung">
                <button className="inline-flex items-center gap-3 bg-white text-purple-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-200 hover:bg-purple-50">
                  <span>Jetzt üben</span>
                  <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Prüfungsstruktur */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3 tracking-tight">
              Prüfungsstruktur
            </h2>
            <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-light">
              3 Teile • 45 Minuten • 20 Punkte
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {teileInfo.map((info) => {
              const Icon = info.icon;

              return (
                <div
                  key={info.teil}
                  className="group bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100 hover:shadow-3xl transition-all duration-200 hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                        <span className="text-2xl font-black text-white">
                          {info.teil}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">
                          Teil {info.teil}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Clock className="w-3 h-3" />
                          <span>{info.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-12 h-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:from-purple-100 group-hover:to-indigo-100 transition-all duration-200">
                      <Icon className="w-6 h-6 text-purple-600" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {info.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
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
          <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-light">
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
                className="group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100 hover:shadow-3xl transition-all duration-200 hover:-translate-y-2 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-3">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 text-base lg:text-lg mb-6 leading-relaxed">
                    {option.description}
                  </p>

                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-xl border border-purple-100 mb-6">
                    <span className="text-purple-600 text-sm font-semibold">
                      Alle Teile • Flexibel
                    </span>
                  </div>

                  <div className="flex items-center justify-end">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl flex items-center justify-center group-hover:from-purple-600 group-hover:to-indigo-600 transition-all duration-200">
                      <Play className="w-5 h-5 text-purple-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Tipps für die Prüfung */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 lg:p-10 shadow-xl border border-purple-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Tipps für die Leseprüfung
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            <div className="flex items-start gap-2 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
              <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                Lesen Sie die Fragen zuerst
              </div>
            </div>

            <div className="flex items-start gap-2 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
              <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                Suchen Sie Schlüsselwörter
              </div>
            </div>

            <div className="flex items-start gap-2 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
              <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                Zeit gut einteilen (15 Min pro Teil)
              </div>
            </div>

            <div className="flex items-start gap-2 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
              <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                Nicht jedes Wort verstehen müssen
              </div>
            </div>

            <div className="flex items-start gap-2 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
              <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                Bei Teil 1 logisch denken
              </div>
            </div>

            <div className="flex items-start gap-2 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
              <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
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
