import { Link } from "react-router-dom";
import {
  Headphones,
  BookOpen,
  FileEdit,
  Mic,
  ArrowLeft,
  Play,
  Target,
  Clock,
  CheckCircle,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function TestHub() {
  const skillAreas = [
    {
      id: "hoeren",
      title: "Hören",
      description: "Authentische Dialoge verstehen",
      icon: Headphones,
      duration: "25 Min",
      parts: "4 Teile",
      path: "/tests/hoeren",
      available: true,
    },
    {
      id: "lesen",
      title: "Lesen",
      description: "Verschiedene Texte verstehen",
      icon: BookOpen,
      duration: "60 Min",
      parts: "3 Teile",
      path: "/tests/lesen",
      available: false,
    },
    {
      id: "schreiben",
      title: "Schreiben",
      description: "E-Mail und Brief schreiben",
      icon: FileEdit,
      duration: "30 Min",
      parts: "1 Aufgabe",
      path: "/tests/schreiben",
      available: false,
    },
    {
      id: "sprechen",
      title: "Sprechen",
      description: "Gespräch und Präsentation",
      icon: Mic,
      duration: "15 Min",
      parts: "3 Teile",
      path: "/tests/sprechen",
      available: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Back Button - Icon only */}
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center w-10 h-10 mb-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-200 hover:scale-110 active:scale-95 group"
            aria-label="Zurück zum Dashboard"
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
                DTZ B1 Training
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-light mb-4">
                Prüfung gezielt vorbereiten
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>4 Kompetenzen</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Interaktives Training</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>DTZ Zertifikat B1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Prüfungsbereiche
          </h2>
          <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-light">
            Wählen Sie einen Bereich zum Üben
          </p>
        </div>

        {/* Skill Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {skillAreas.map((area) => {
            const Icon = area.icon;

            return area.available ? (
              <Link
                key={area.id}
                to={area.path}
                className="group bg-white/80 backdrop-blur-md rounded-3xl p-8 lg:p-10 shadow-xl border border-purple-100 hover:shadow-3xl transition-all duration-200 hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                <div className="relative">
                  {/* Icon */}
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {area.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">
                        {area.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Target className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">{area.parts}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-end">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl flex items-center justify-center group-hover:from-purple-600 group-hover:to-indigo-600 transition-all duration-200">
                      <Play className="w-5 h-5 text-purple-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div
                key={area.id}
                className="group bg-white/60 backdrop-blur-md rounded-3xl p-8 lg:p-10 shadow-lg border border-purple-100 opacity-75 cursor-not-allowed relative overflow-hidden"
              >
                {/* Bald Badge */}
                <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Bald
                </div>

                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Icon className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-3xl font-bold text-gray-700 mb-3">
                  {area.title}
                </h3>
                <p className="text-gray-500 text-lg mb-6 leading-relaxed">
                  {area.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium">{area.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Target className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium">{area.parts}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-50 rounded-3xl p-8 lg:p-10 shadow-xl border border-purple-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Wie funktioniert das Training?
            </h2>
            <p className="text-gray-600 text-lg">
              In 3 einfachen Schritten starten
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-purple-100">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-black text-white">1</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                Bereich wählen
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Klicken Sie auf Hören oder Sprechen
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-purple-100">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-black text-white">2</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                Modus wählen
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Übung, Training oder Prüfung
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-purple-100">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-black text-white">3</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Üben</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Mit Feedback besser werden
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
