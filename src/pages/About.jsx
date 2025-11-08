import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Target,
  BookOpen,
  Headphones,
  FileText,
  MessageSquare,
  Github,
  Linkedin,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

export default function About() {
  const navigate = useNavigate();
  const [legalNoticeOpen, setLegalNoticeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary">
      <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
        {/* Hero Section with Animation */}
        <div className="text-center mb-16">
          {/* Besty Animation */}
          <div className="w-48 h-48 lg:w-64 lg:h-64 mx-auto mb-8">
            <DotLottieReact
              src="https://lottie.host/e625cdca-0dac-4776-a55e-0b437f54c0a7/diw9hO8Z3c.lottie"
              loop
              autoplay
              className="w-full h-full"
            />
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 dark:from-purple-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent leading-tight">
              Dein DTZ B1
              <br />
              Content Hub
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto leading-relaxed">
              Moderne, strukturierte Prüfungsvorbereitung für alle vier
              Bereiche: Hören, Lesen, Schreiben und Sprechen
            </p>
          </div>
        </div>

        {/* Editorial Features */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="p-6 bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl border border-gray-100 dark:border-purple-500/30 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            <Target className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text-primary mb-2">
              Echte Prüfungsinhalte
            </h3>
            <p className="text-sm text-gray-600 dark:text-dark-text-secondary leading-relaxed">
              Alle Übungen basieren auf authentischen DTZ B1 Formaten.
            </p>
          </div>

          <div className="p-6 bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl border border-gray-100 dark:border-purple-500/30 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text-primary mb-2">
              Klar strukturiert
            </h3>
            <p className="text-sm text-gray-600 dark:text-dark-text-secondary leading-relaxed">
              Finde schnell, was du brauchst. Konzentriere dich aufs Lernen.
            </p>
          </div>
        </div>

        {/* Exam Parts - Minimal */}
        <div className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-dark-text-primary mb-8 text-center">
            Vier Prüfungsteile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="flex items-center gap-4 p-5 bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl border border-gray-100 dark:border-purple-500/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-800 rounded-xl">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text-primary">
                  Hören
                </h3>
                <p className="text-sm text-gray-600 dark:text-dark-text-muted">
                  25 Minuten • 20 Punkte
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl border border-gray-100 dark:border-purple-500/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-800 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text-primary">
                  Lesen
                </h3>
                <p className="text-sm text-gray-600 dark:text-dark-text-muted">
                  45 Minuten • 20 Punkte
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl border border-gray-100 dark:border-purple-500/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-800 rounded-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text-primary">
                  Schreiben
                </h3>
                <p className="text-sm text-gray-600 dark:text-dark-text-muted">
                  30 Minuten • 15 Punkte
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl border border-gray-100 dark:border-purple-500/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-pink-600 to-purple-600 dark:from-pink-700 dark:to-purple-800 rounded-xl">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text-primary">
                  Sprechen
                </h3>
                <p className="text-sm text-gray-600 dark:text-dark-text-muted">
                  15 Minuten • 25 Punkte
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-16">
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-800 text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-200"
          >
            <span>Jetzt starten</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Legal Disclaimer */}
        <div className="max-w-2xl mx-auto mb-8">
          <button
            onClick={() => setLegalNoticeOpen(!legalNoticeOpen)}
            className="w-full p-4 bg-white/60 dark:bg-white/10 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-purple-500/30 hover:border-purple-300 dark:hover:border-purple-400 transition-all duration-200 flex items-center justify-between group"
          >
            <h3 className="text-sm font-bold text-gray-900 dark:text-dark-text-primary">
              Rechtlicher Hinweis / Legal Notice
            </h3>
            <ChevronDown
              className={`w-5 h-5 text-gray-600 dark:text-dark-text-secondary group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-transform duration-200 ${
                legalNoticeOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {legalNoticeOpen && (
            <div className="mt-2 p-6 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-purple-500/30 shadow-lg">
              <div className="space-y-3 text-xs text-gray-700 leading-relaxed dark:text-white">
                <p className="dark:text-white">
                  <strong className="text-gray-900 dark:text-white font-bold">
                    Portfolio & Bildungszweck:
                  </strong>{" "}
                  Dieses Projekt wurde ausschließlich für Portfolio- und
                  Lernzwecke entwickelt. Es handelt sich um ein
                  nicht-kommerzielles Bildungsprojekt.
                </p>
                <p className="dark:text-white">
                  <strong className="text-gray-900 dark:text-white font-bold">
                    Inhalt & Quellen:
                  </strong>{" "}
                  Alle Inhalte wurden aus öffentlich zugänglichen Quellen
                  zusammengestellt und dienen ausschließlich der Demonstration
                  technischer Fähigkeiten.
                </p>
                <p className="pt-2 border-t border-gray-200 dark:border-gray-700 dark:text-white">
                  <strong className="text-gray-900 dark:text-white font-bold">
                    Portfolio & Educational Purpose:
                  </strong>{" "}
                  This project was created solely for portfolio and educational
                  purposes. It is a non-commercial educational project.
                </p>
                <p className="dark:text-white">
                  <strong className="text-gray-900 dark:text-white font-bold">
                    Content & Sources:
                  </strong>{" "}
                  All content has been gathered from publicly available sources
                  and serves exclusively to demonstrate technical skills.
                </p>
                <p className="pt-2 border-t border-gray-200 dark:border-gray-700 dark:text-white">
                  <strong className="text-gray-900 dark:text-white font-bold">
                    Disclaimer:
                  </strong>{" "}
                  No copyright infringement intended. If you are the copyright
                  holder of any content and would like it removed, please
                  contact me and it will be promptly addressed.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="max-w-2xl mx-auto pb-6">
          <div className="flex flex-col items-center gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Raphaelavazq"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-purple-500/30 hover:border-purple-300 dark:hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-white/20 transition-all duration-200 group"
              >
                <Github className="w-4 h-4 text-gray-700 dark:text-dark-text-primary group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-dark-text-primary group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  GitHub
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/rafaelavazquaresma/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-purple-500/30 hover:border-purple-300 dark:hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-white/20 transition-all duration-200 group"
              >
                <Linkedin className="w-4 h-4 text-gray-700 dark:text-dark-text-primary group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-dark-text-primary group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  LinkedIn
                </span>
              </a>
            </div>

            {/* Attribution */}
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-dark-text-muted">
                Made with{" "}
                <span className="text-purple-600 dark:text-purple-400">♥</span>{" "}
                for German learners
              </p>
              <p className="text-xs text-gray-400 dark:text-dark-text-muted mt-1">
                © Raphaella 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
