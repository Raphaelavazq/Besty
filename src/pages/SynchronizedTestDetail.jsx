import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Clock, Volume2 } from "lucide-react";
import HoerenTeilComplete from "../components/HoerenTeilComplete";
import {
  LoadingAnimation,
  FloatingActionAnimation,
} from "../components/LottieAnimations";

export default function SynchronizedTestDetail() {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    fetch("/data/synchronized-tests.json")
      .then((res) => res.json())
      .then((data) => {
        const foundTest = data.find((t) => t.id === id);
        setTest(foundTest);
      })
      .catch((err) => console.error("Error loading test:", err));
  }, [id]);

  const handleTestComplete = (answers) => {
    console.log("Test completed with answers:", answers);
    // Here you could save results, show detailed feedback, etc.
  };

  if (!test) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 dark:border-purple-500/20 p-8">
            <LoadingAnimation
              size="lg"
              message="Test wird geladen..."
              className="py-12"
            />
          </div>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-100 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary">
        <div className="max-w-2xl mx-auto p-6">
          {/* Header with Back Button */}
          <div className="flex items-center gap-4 mb-8">
            <Link
              to="/tests/hoeren"
              className="w-12 h-12 bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border border-white/50 dark:border-purple-500/30 hover:bg-white/90 dark:hover:bg-white/20 transition-all duration-200 group"
            >
              <ArrowLeft
                size={20}
                className="text-slate-600 dark:text-dark-text-primary group-hover:text-slate-800 dark:group-hover:text-white"
              />
            </Link>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
                {test.title}
              </h1>
              <p className="text-slate-600 dark:text-dark-text-secondary">
                Schnelles Training für zwischendurch
              </p>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 dark:border-purple-500/20 overflow-hidden">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-emerald-500 to-blue-600 dark:from-emerald-600 dark:to-blue-700 p-8 text-white relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 dark:bg-white/5 rounded-full"></div>
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/5 dark:bg-white/3 rounded-full"></div>

              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Play size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-3">
                  Bereit für eine schnelle Übung?
                </h2>
                <p className="text-emerald-100 dark:text-emerald-200 text-lg">
                  {test.subtitle}
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Clock
                      size={24}
                      className="text-emerald-600 dark:text-emerald-400"
                    />
                  </div>
                  <p className="text-sm text-slate-500 dark:text-dark-text-muted mb-1">
                    Dauer
                  </p>
                  <p className="font-bold text-slate-800 dark:text-dark-text-primary">
                    {test.duration}
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Volume2
                      size={24}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                  <p className="text-sm text-slate-500 dark:text-dark-text-muted mb-1">
                    Fragen
                  </p>
                  <p className="font-bold text-slate-800 dark:text-dark-text-primary">
                    1 Frage
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Play
                      size={24}
                      className="text-purple-600 dark:text-purple-400"
                    />
                  </div>
                  <p className="text-sm text-slate-500 dark:text-dark-text-muted mb-1">
                    Level
                  </p>
                  <p className="font-bold text-slate-800 dark:text-dark-text-primary">
                    {test.level}
                  </p>
                </div>
              </div>

              {/* Perfect For Section */}
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-2xl p-6 mb-8 border border-emerald-200/50 dark:border-emerald-500/20">
                <h3 className="font-bold text-emerald-800 dark:text-emerald-300 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-emerald-200 dark:bg-emerald-800/50 rounded-lg flex items-center justify-center">
                    ✨
                  </span>
                  Perfekt für:
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-300">
                    <div className="w-2 h-2 bg-emerald-400 dark:bg-emerald-500 rounded-full"></div>
                    <span className="text-sm">
                      Schnelle Pausen zwischen anderen Aktivitäten
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-300">
                    <div className="w-2 h-2 bg-emerald-400 dark:bg-emerald-500 rounded-full"></div>
                    <span className="text-sm">
                      Aufwärmen vor längeren Tests
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-300">
                    <div className="w-2 h-2 bg-emerald-400 dark:bg-emerald-500 rounded-full"></div>
                    <span className="text-sm">Tägliches Mini-Training</span>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mb-8">
                <h3 className="font-semibold text-slate-800 dark:text-dark-text-primary mb-3">
                  So funktioniert's:
                </h3>
                <p className="text-slate-600 dark:text-dark-text-secondary leading-relaxed">
                  {test.instructions}
                </p>
              </div>

              {/* Start Button */}
              <FloatingActionAnimation delay={300}>
                <button
                  onClick={() => setStarted(true)}
                  className="w-full bg-gradient-to-br from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 dark:from-emerald-600 dark:to-blue-700 dark:hover:from-emerald-500 dark:hover:to-blue-600 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-3 group"
                >
                  <Play
                    size={24}
                    className="group-hover:scale-110 transition-transform duration-200"
                  />
                  Jetzt starten
                  <div className="w-8 h-8 bg-white/20 dark:bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/30 dark:group-hover:bg-white/20 transition-colors duration-200">
                    →
                  </div>
                </button>
              </FloatingActionAnimation>

              {/* Quick Tip */}
              <div className="mt-6 text-center">
                <p className="text-slate-500 dark:text-dark-text-muted text-sm">
                  💡 <span className="font-medium">Tipp:</span> Nutze Kopfhörer
                  für die beste Erfahrung
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-6 text-center">
            <Link
              to="/tests/hoeren"
              className="text-slate-500 dark:text-dark-text-muted hover:text-slate-700 dark:hover:text-dark-text-primary text-sm transition-colors duration-200"
            >
              Zurück zu anderen Übungen
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-100 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <Link
          to="/tests/hoeren"
          className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mb-6 transition-colors duration-200 bg-white/60 dark:bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/50 dark:border-purple-500/30"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Hören Training
        </Link>
      </div>

      <div className="px-4 sm:px-0">
        <HoerenTeilComplete
          audioUrl={test.audioUrl}
          questions={test.questions}
          test={test}
          onComplete={handleTestComplete}
        />
      </div>
    </div>
  );
}
