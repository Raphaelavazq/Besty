/**
 * SprechenHub
 * Landing page for DTZ Speaking practice.
 * Displays practice modes and learning videos.
 * Following Hören pattern with design system compliance.
 */

import { Link } from "react-router-dom";
import { MessageSquare, Play, Info, BookOpen, Video } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import DialogueTrainer from "../features/sprechen/DialogueTrainer";

export default function SprechenHub() {
  const practiceOptions = [
    {
      id: "uebung",
      title: "Übung",
      description: "Videos anschauen und lernen",
      icon: Video,
      color: "from-purple-500 to-indigo-600",
      path: "/tests/sprechen/uebung/teil1",
      details: "Teil 1-3 mit Beispielen",
    },
    {
      id: "pruefung-info",
      title: "Prüfungsinfo",
      description: "Was Sie wissen müssen",
      icon: Info,
      color: "from-pink-500 to-purple-600",
      path: "/tests/sprechen/pruefung",
      details: "Ablauf, Tipps, Bewertung",
    },
    {
      id: "dialogue-trainer",
      title: "Dialogue Trainer",
      description: "Interaktiver Dialog (Teil 3)",
      icon: MessageSquare,
      color: "from-green-500 to-teal-500",
      path: "/tests/sprechen/trainer",
      details: "Interaktives Üben — Auswahl von Dialogtypen",
    },
  ];

  const teileInfo = [
    {
      teil: "Teil 1",
      title: "Sich vorstellen",
      duration: "3 Min",
      points: "4 Punkte",
      description: "Persönliche Fragen beantworten",
      icon: MessageSquare,
      color: "from-blue-500 to-cyan-500",
    },
    {
      teil: "Teil 2",
      title: "Über ein Thema sprechen",
      duration: "4 Min",
      points: "4 Punkte",
      description: "Strukturiert zu einem Thema sprechen",
      icon: BookOpen,
      color: "from-purple-500 to-pink-500",
    },
    {
      teil: "Teil 3",
      title: "Gemeinsam etwas planen",
      duration: "5 Min",
      points: "4 Punkte",
      description: "Dialog führen und planen",
      icon: Play,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Back Button */}
          <Link
            to="/tests"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-200 mb-8 group"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-200">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <span className="font-medium">Zurück zu Tests</span>
          </Link>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Animation */}
            <div className="w-32 h-32 lg:w-40 lg:h-40 flex-shrink-0">
              <DotLottieReact
                src="https://lottie.host/e625cdca-0dac-4776-a55e-0b437f54c0a7/diw9hO8Z3c.lottie"
                loop
                autoplay
                className="w-full h-full filter brightness-125 contrast-110 saturate-125"
              />
            </div>

            {/* Text Content */}
            <div className="text-center lg:text-left flex-1">
              <h1 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight">
                DTZ Sprechen
              </h1>
              <p className="text-xl text-white/90 font-light mb-2">
                Mündliche Prüfung vorbereiten
              </p>
              <p className="text-white/80 text-sm">
                Videos anschauen • Beispiele lernen • Tipps bekommen
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Practice Options Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Wie möchten Sie üben?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {practiceOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Link
                  key={option.id}
                  to={option.path}
                  className="group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-purple-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  ></div>

                  <div className="relative">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon size={28} className="text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {option.title}
                    </h3>
                    <p className="text-purple-600 font-medium mb-2">
                      {option.description}
                    </p>
                    <p className="text-gray-600 text-sm">{option.details}</p>

                    {/* Arrow */}
                    <div className="absolute bottom-8 right-8 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                      <svg
                        className="w-5 h-5 text-purple-700"
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
              );
            })}
          </div>
        </div>

        {/* Teile Overview */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Prüfungsstruktur
          </h2>
          <p className="text-gray-600 mb-6">
            Die mündliche Prüfung hat 3 Teile (insgesamt ca. 12 Minuten)
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {teileInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.teil}
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-purple-100 hover:shadow-lg transition-all duration-300"
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center mb-4 shadow-md`}
                  >
                    <Icon size={24} className="text-white" />
                  </div>

                  {/* Content */}
                  <div className="mb-3">
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-wide">
                      {info.teil}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-1">
                      {info.title}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">
                    {info.description}
                  </p>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{info.duration}</span>
                    <span className="font-medium text-purple-600">
                      {info.points}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Info */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            💡 Wichtig zu wissen
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-0.5">•</span>
              <span>
                Die Prüfung findet meist <strong>zu zweit</strong> statt (mit
                einem anderen Teilnehmer)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-0.5">•</span>
              <span>
                Insgesamt können Sie <strong>12 Punkte</strong> erreichen
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-0.5">•</span>
              <span>
                Sprechen Sie <strong>deutlich</strong> und nicht zu schnell
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-0.5">•</span>
              <span>
                Schauen Sie sich die <strong>Beispielvideos</strong> an, um zu
                sehen, was erwartet wird
              </span>
            </li>
          </ul>
        </div>

        {/* DialogueTrainer Preview */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Teil 3: Dialog-Trainer Vorschau
          </h2>
          <div className="rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
            <div className="bg-white/80 backdrop-blur-md">
              <DialogueTrainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
