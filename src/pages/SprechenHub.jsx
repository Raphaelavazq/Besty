/**
 * SprechenHub
 * Landing page for DTZ Speaking practice.
 * Beautiful glass-morphism design with exceptional mobile UX.
 * Maintains brand colors and design consistency.
 */

import { Link } from "react-router-dom";
import {
  MessageSquare,
  Play,
  Info,
  Video,
  ArrowLeft,
  Clock,
  Users,
  Target,
  CheckCircle,
  Lightbulb,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function SprechenHub() {
  const practiceOptions = [
    {
      id: "uebung",
      title: "Übung",
      description: "Videos und Beispiele",
      icon: Video,
      path: "/tests/sprechen/uebung/teil1",
      details: "Teil 1-3 lernen",
    },
    {
      id: "dialogue-trainer",
      title: "Dialog-Trainer",
      description: "Mit Besty üben",
      icon: MessageSquare,
      path: "/tests/sprechen/trainer",
      details: "59 Szenarien • KI-Dialog",
    },
  ];

  const teileInfo = [
    {
      teil: "1",
      title: "Sich vorstellen",
      duration: "3 Min",
      description: "Persönliche Fragen",
      icon: Users,
      path: "/tests/sprechen/teil1",
    },
    {
      teil: "2",
      title: "Bild beschreiben",
      duration: "4 Min",
      description: "Foto präsentieren",
      icon: Target,
      path: "/tests/sprechen/bild-beschreiben",
    },
    {
      teil: "3",
      title: "Planen",
      duration: "5 Min",
      description: "Dialog führen",
      icon: MessageSquare,
      path: "/tests/sprechen/trainer",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Back Button - Icon only */}
          <Link
            to="/tests"
            className="inline-flex items-center justify-center w-10 h-10 mb-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-200 hover:scale-110 active:scale-95 group"
            aria-label="Zurück zu Tests"
          >
            <ArrowLeft className="w-5 h-5 text-white group-hover:-translate-x-0.5 transition-transform duration-200" />
          </Link>

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
                DTZ Sprechen
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-light mb-4">
                Mündliche Prüfung vorbereiten
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>15 Minuten</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>12 Punkte</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>2 Prüfer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Prüfungsstruktur - Navigation Cards at Top */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3 tracking-tight">
              Prüfungsstruktur
            </h2>
            <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-light">
              3 Teile • 15 Minuten • 12 Punkte
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {teileInfo.map((info) => {
              const Icon = info.icon;

              return (
                <Link
                  key={info.teil}
                  to={info.path}
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
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {info.description}
                    </p>

                    <div className="flex items-center justify-end">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl flex items-center justify-center group-hover:from-purple-600 group-hover:to-indigo-600 transition-all duration-200">
                        <Play className="w-5 h-5 text-purple-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Section Title - Üben */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Wie möchten Sie üben?
          </h2>
          <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-light">
            Wählen Sie Ihren Lernweg
          </p>
        </div>

        {/* Practice Options Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {practiceOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Link
                key={option.id}
                to={option.path}
                className="group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100 hover:shadow-3xl transition-all duration-200 hover:-translate-y-2 hover:scale-105 overflow-hidden"
              >
                {/* Hover Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                <div className="relative">
                  {/* Icon */}
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {option.title}
                  </h3>
                  <p className="text-purple-600 font-semibold mb-3">
                    {option.description}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {option.details}
                  </p>

                  {/* Arrow Icon */}
                  <div className="mt-6 flex items-center justify-end">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl flex items-center justify-center group-hover:from-purple-100 group-hover:to-indigo-100 transition-all duration-200">
                      <Play className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Prüfungsformat & Bewertung */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
              Prüfungsformat & Bewertung
            </h2>
            <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-light">
              Was Sie wissen müssen
            </p>
          </div>

          {/* Single Card with All Info */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 lg:p-10 shadow-xl border border-purple-100 mb-8">
            {/* Quick Stats Banner */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-10 pb-8 border-b border-purple-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-black text-gray-900">
                    15 Min
                  </div>
                  <div className="text-sm text-gray-600">Gesamtdauer</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-black text-gray-900">
                    2 Prüfer
                  </div>
                  <div className="text-sm text-gray-600">Plus Partner</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-black text-gray-900">
                    12 Punkte
                  </div>
                  <div className="text-sm text-gray-600">Maximal</div>
                </div>
              </div>
            </div>

            {/* Bewertungskriterien */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Bewertungskriterien
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-start gap-3 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      Aufgabe erfüllt
                    </div>
                    <div className="text-sm text-gray-600">
                      Alle Punkte behandeln
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      Flüssig sprechen
                    </div>
                    <div className="text-sm text-gray-600">
                      Ohne lange Pausen
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      Wortschatz & Grammatik
                    </div>
                    <div className="text-sm text-gray-600">B1-Level zeigen</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      Aussprache
                    </div>
                    <div className="text-sm text-gray-600">
                      Verständlich und deutlich
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Allgemeine Tipps */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Tipps für die Prüfung
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                <div className="flex items-start gap-2 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
                  <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">Pünktlich sein</div>
                </div>

                <div className="flex items-start gap-2 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
                  <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">Ruhig bleiben</div>
                </div>

                <div className="flex items-start gap-2 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
                  <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">Weitersprechen</div>
                </div>

                <div className="flex items-start gap-2 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
                  <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    Nachfragen erlaubt
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
                  <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">Mit Freunden üben</div>
                </div>

                <div className="flex items-start gap-2 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4">
                  <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">Videos ansehen</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wichtig zu wissen */}
        <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-50 rounded-3xl p-8 lg:p-10 shadow-xl border border-purple-100">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Info className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Wichtig zu wissen
              </h3>
              <p className="text-gray-600">Tipps für die mündliche Prüfung</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-purple-100">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900 mb-1">
                    Zu zweit
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    Mit anderem Teilnehmer üben
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-purple-100">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900 mb-1">
                    12 Punkte
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    Maximal erreichbare Punktzahl
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-purple-100">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900 mb-1">
                    Deutlich sprechen
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    Nicht zu schnell reden
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-purple-100">
              <div className="flex items-start gap-3">
                <Video className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900 mb-1">
                    Beispiele ansehen
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    Videos zeigen, was erwartet wird
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
