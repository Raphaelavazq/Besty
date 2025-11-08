/**
 * SchreibenHub - Redesigned with Clear User Flow
 * Glassmorphism + Minimal Cards + Direct Action Path
 */

import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Target,
  Zap,
  BookOpen,
  CheckCircle2,
  Mail,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function SchreibenHubNew() {
  const [activeTab, setActiveTab] = useState("start");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary">
      {/* Hero Section - Full Viewport Height */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 dark:from-purple-900 dark:via-indigo-900 dark:to-purple-950 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Besty Lottie Animation - Half of Hero on Desktop */}
            <div className="w-40 h-40 lg:w-80 lg:h-80 flex-shrink-0 flex items-center justify-center">
              <DotLottieReact
                src="https://lottie.host/e625cdca-0dac-4776-a55e-0b437f54c0a7/diw9hO8Z3c.lottie"
                loop
                autoplay
                className="w-full h-full filter brightness-125"
              />
            </div>

            {/* Text Content - Other Half */}
            <div className="text-center lg:text-left flex-1">
              <h1 className="text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
                Schreiben Training
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-light mb-4">
                Übe E-Mails & Briefe schreiben mit Besty
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-white/80 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>30 Minuten</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>15 Punkte</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>80+ Wörter</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link to="/tests/schreiben/trainer">
                <button className="inline-flex items-center gap-3 bg-white dark:bg-white/10 text-purple-700 dark:text-purple-400 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-200 hover:bg-purple-50 dark:hover:bg-white/20 border-2 border-transparent dark:border-purple-500/30">
                  <span>Jetzt üben</span>
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Tab Navigation */}
        <div className="bg-white/60 dark:bg-white/10 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-white/40 dark:border-purple-500/30 mb-8 sm:mb-12">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setActiveTab("start")}
              className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 ${
                activeTab === "start"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                  : "text-gray-600 dark:text-dark-text-secondary hover:text-purple-600 dark:hover:text-purple-300"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Zap size={18} />
                <span className="hidden sm:inline">Start</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab("format")}
              className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 ${
                activeTab === "format"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                  : "text-gray-600 dark:text-dark-text-secondary hover:text-purple-600 dark:hover:text-purple-300"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <BookOpen size={18} />
                <span className="hidden sm:inline">Format</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab("tipps")}
              className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 ${
                activeTab === "tipps"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                  : "text-gray-600 dark:text-dark-text-secondary hover:text-purple-600 dark:hover:text-purple-300"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Target size={18} />
                <span className="hidden sm:inline">Tipps</span>
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* START TAB */}
          {activeTab === "start" && (
            <div className="space-y-6 animate-fadeIn">
              {/* What is it */}
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/40 dark:border-purple-500/30">
                <h2 className="text-2xl sm:text-3xl font-black mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Was ist die Schreiben-Prüfung?
                </h2>
                <p className="text-base sm:text-lg text-gray-700 dark:text-dark-text-secondary leading-relaxed mb-6">
                  Du musst <strong>einen Brief oder eine E-Mail</strong>{" "}
                  schreiben – formell oder informell. Die Aufgabe gibt dir ein
                  Thema und <strong>3 Inhaltspunkte</strong>, die du bearbeiten
                  musst.
                </p>

                {/* 3 Simple Steps */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-purple-100/60 to-indigo-100/60 dark:from-purple-900/30 dark:to-indigo-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-200/40 dark:border-purple-500/40">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-black mb-4 shadow-lg">
                      1
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-dark-text-primary mb-2">
                      Aufgabe lesen
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
                      Verstehe die Situation und die 3 Punkte
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-100/60 to-indigo-100/60 dark:from-purple-900/30 dark:to-indigo-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-200/40 dark:border-purple-500/40">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-black mb-4 shadow-lg">
                      2
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-dark-text-primary mb-2">
                      Brief schreiben
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
                      Mindestens 80 Wörter, alle Punkte ansprechen
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-100/60 to-indigo-100/60 dark:from-purple-900/30 dark:to-indigo-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-200/40 dark:border-purple-500/40">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-black mb-4 shadow-lg">
                      3
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-dark-text-primary mb-2">
                      Kontrollieren
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
                      Prüfe Grammatik, Rechtschreibung, Punkte
                    </p>
                  </div>
                </div>
              </div>

              {/* Scoring */}
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/40 dark:border-purple-500/30">
                <h2 className="text-2xl sm:text-3xl font-black mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Bewertung: 15 Punkte
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="text-center p-6 bg-gradient-to-br from-indigo-100/60 to-purple-100/60 dark:from-indigo-900/30 dark:to-purple-900/30 backdrop-blur-sm rounded-2xl border border-indigo-200/40 dark:border-indigo-500/40">
                    <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400 mb-2">
                      5
                    </div>
                    <div className="font-bold text-gray-900 dark:text-dark-text-primary mb-1">
                      Inhalt
                    </div>
                    <div className="text-sm text-gray-600 dark:text-dark-text-secondary">
                      Alle Punkte bearbeitet
                    </div>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-br from-purple-100/60 to-indigo-100/60 dark:from-purple-900/30 dark:to-indigo-900/30 backdrop-blur-sm rounded-2xl border border-purple-200/40 dark:border-purple-500/40">
                    <div className="text-4xl font-black text-purple-600 dark:text-purple-400 mb-2">
                      5
                    </div>
                    <div className="font-bold text-gray-900 dark:text-dark-text-primary mb-1">
                      Kommunikation
                    </div>
                    <div className="text-sm text-gray-600 dark:text-dark-text-secondary">
                      Struktur & Form
                    </div>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-br from-indigo-100/60 to-purple-100/60 dark:from-indigo-900/30 dark:to-purple-900/30 backdrop-blur-sm rounded-2xl border border-indigo-200/40 dark:border-indigo-500/40">
                    <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400 mb-2">
                      5
                    </div>
                    <div className="font-bold text-gray-900 dark:text-dark-text-primary mb-1">
                      Korrektheit
                    </div>
                    <div className="text-sm text-gray-600 dark:text-dark-text-secondary">
                      Grammatik & Rechtschreibung
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FORMAT TAB */}
          {activeTab === "format" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/40 dark:border-purple-500/30">
                <h2 className="text-2xl sm:text-3xl font-black mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Brief-Struktur
                </h2>

                <div className="space-y-6">
                  {/* Formal */}
                  <div className="bg-gradient-to-br from-indigo-50/60 to-purple-50/60 dark:from-indigo-900/20 dark:to-purple-900/20 backdrop-blur-sm rounded-2xl p-6 border border-indigo-200/40 dark:border-indigo-500/40">
                    <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-4 flex items-center gap-2">
                      <Mail className="w-6 h-6" />
                      Formell (Sie)
                    </h3>
                    <div className="space-y-3 text-sm sm:text-base text-gray-700 dark:text-dark-text-secondary">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                        <div>
                          <strong>Anrede:</strong> Sehr geehrte Damen und Herren
                          / Sehr geehrte Frau/Herr [Name]
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                        <div>
                          <strong>Einleitung:</strong> Ich schreibe Ihnen,
                          weil...
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          3
                        </div>
                        <div>
                          <strong>Hauptteil:</strong> Alle 3 Inhaltspunkte (je 1
                          Absatz)
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          4
                        </div>
                        <div>
                          <strong>Schluss:</strong> Ich bedanke mich für Ihr
                          Verständnis
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          5
                        </div>
                        <div>
                          <strong>Grußformel:</strong> Mit freundlichen Grüßen
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Informal */}
                  <div className="bg-gradient-to-br from-purple-50/60 to-pink-50/60 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-200/40 dark:border-purple-500/20">
                    <h3 className="text-xl font-bold text-purple-900 dark:text-white mb-4 flex items-center gap-2">
                      <MessageCircle className="w-6 h-6" />
                      Informell (du)
                    </h3>
                    <div className="space-y-3 text-sm sm:text-base text-gray-900 dark:text-white">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                        <div className="dark:text-white">
                          <strong className="dark:text-white">Anrede:</strong>{" "}
                          Liebe/Lieber [Name], Hallo [Name]
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                        <div className="dark:text-white">
                          <strong className="dark:text-white">
                            Einleitung:
                          </strong>{" "}
                          Ich schreibe dir, weil...
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          3
                        </div>
                        <div className="dark:text-white">
                          <strong className="dark:text-white">
                            Hauptteil:
                          </strong>{" "}
                          Alle 3 Inhaltspunkte (je 1 Absatz)
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          4
                        </div>
                        <div className="dark:text-white">
                          <strong className="dark:text-white">Schluss:</strong>{" "}
                          Ich freue mich auf deine Antwort!
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          5
                        </div>
                        <div className="dark:text-white">
                          <strong className="dark:text-white">
                            Grußformel:
                          </strong>{" "}
                          Liebe Grüße, Bis bald, Viele Grüße
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TIPPS TAB */}
          {activeTab === "tipps" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/40 dark:border-white/10">
                <h2 className="text-2xl sm:text-3xl font-black mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Die wichtigsten Tipps
                </h2>

                <div className="space-y-4">
                  {/* Tip 1 */}
                  <div className="bg-gradient-to-br from-purple-100/60 to-indigo-100/60 dark:from-purple-900/30 dark:to-indigo-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-200/40 dark:border-purple-500/20">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <CheckCircle2 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-dark-text-primary mb-2 text-lg">
                          Mindestens 80 Wörter
                        </h3>
                        <p className="text-gray-700 dark:text-dark-text-secondary text-sm sm:text-base">
                          Lieber 100-120 Wörter schreiben. Zu jedem Inhaltspunkt
                          2-3 Sätze.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tip 2 */}
                  <div className="bg-gradient-to-br from-indigo-100/60 to-purple-100/60 dark:from-indigo-900/30 dark:to-purple-900/30 backdrop-blur-sm rounded-2xl p-6 border border-indigo-200/40 dark:border-indigo-500/20">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <CheckCircle2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-dark-text-primary mb-2 text-lg">
                          Alle 3 Punkte bearbeiten
                        </h3>
                        <p className="text-gray-700 dark:text-dark-text-secondary text-sm sm:text-base">
                          Jeder Punkt muss im Brief vorkommen. Mache für jeden
                          Punkt einen Absatz.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tip 3 */}
                  <div className="bg-gradient-to-br from-purple-100/60 to-indigo-100/60 dark:from-purple-900/30 dark:to-indigo-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-200/40 dark:border-purple-500/20">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <CheckCircle2 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-dark-text-primary mb-2 text-lg">
                          Richtige Anrede wählen
                        </h3>
                        <p className="text-gray-700 dark:text-dark-text-secondary text-sm sm:text-base">
                          <strong>Formell (Sie):</strong> Firma, Behörde,
                          Vermieter, Chef •
                          <strong className="ml-2">Informell (du):</strong>{" "}
                          Freunde, Familie, Bekannte
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tip 4 */}
                  <div className="bg-gradient-to-br from-indigo-100/60 to-purple-100/60 dark:from-indigo-900/30 dark:to-purple-900/30 backdrop-blur-sm rounded-2xl p-6 border border-indigo-200/40 dark:border-indigo-500/20">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <CheckCircle2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-dark-text-primary mb-2 text-lg">
                          Zeit-Management: 30 Minuten
                        </h3>
                        <p className="text-gray-700 dark:text-dark-text-secondary text-sm sm:text-base">
                          <strong>5 Min:</strong> Planen •{" "}
                          <strong>20 Min:</strong> Schreiben •{" "}
                          <strong>5 Min:</strong> Kontrollieren
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16">
          <Link to="/tests/schreiben/trainer">
            <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                <div className="flex-shrink-0">
                  <img
                    src="/Bestybot.png"
                    alt="Besty"
                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    Bereit? Lass uns anfangen!
                  </h3>
                  <p className="text-lg text-white/90">
                    Besty hilft dir, die Prüfung zu bestehen
                  </p>
                </div>
                <div className="sm:ml-auto">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:translate-x-2 transition-transform">
                    <ArrowRight size={28} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
