import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Headphones,
  Brain,
  Trophy,
  Play,
} from "lucide-react";

export default function Hoeren() {
  const practiceOptions = [
    {
      id: "training",
      title: "Training",
      description: "Zufällige Fragen üben",
      icon: Brain,
      path: "/tests/hoeren/training",
      details: "Alle Teile • Flexibel",
    },
    {
      id: "test",
      title: "Prüfung",
      description: "Kompletter Modelltest",
      icon: Trophy,
      path: "/tests/hoeren/pruefung/modelltest-1",
      details: "25 Min • 20 Punkte",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/tests"
            className="w-12 h-12 bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border border-white/50 dark:border-purple-500/30 hover:bg-white/90 dark:hover:bg-white/20 transition-all duration-200"
          >
            <ArrowLeft
              size={20}
              className="text-slate-600 dark:text-dark-text-primary"
            />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Hören Training
            </h1>
            <p className="text-slate-600 dark:text-dark-text-secondary text-lg">
              Hörverstehen Übungen
            </p>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl p-12 shadow-xl border border-white/50 dark:border-purple-500/20 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Headphones size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-3">
            Bald verfügbar
          </h2>
          <p className="text-slate-600 dark:text-dark-text-secondary mb-8">
            Diese Seite wird gerade vorbereitet. Nutze die Hauptseite für Hören
            Training.
          </p>
          <Link
            to="/tests/hoeren"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
          >
            <Headphones size={18} />
            <span>Zu Hören Training</span>
          </Link>
        </div>

        {/* Practice Options */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {practiceOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Link
                key={option.id}
                to={option.path}
                className="group relative bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100 dark:border-purple-500/20 hover:shadow-3xl transition-all duration-200 hover:-translate-y-2 hover:scale-105 overflow-hidden"
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

                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-100 dark:border-purple-500/30">
                    <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold">
                      {option.details}
                    </span>
                  </div>

                  <div className="absolute bottom-8 right-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center group-hover:from-purple-600 group-hover:to-indigo-600 dark:group-hover:from-purple-500 dark:group-hover:to-indigo-500 transition-all duration-200">
                      <Play className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
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
