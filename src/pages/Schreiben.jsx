import { Link } from "react-router-dom";
import { ArrowLeft, FileEdit } from "lucide-react";

export default function Schreiben() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-dark-bg-primary dark:to-dark-bg-tertiary">
      <div className="max-w-4xl mx-auto p-6">
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
              Schreiben Training
            </h1>
            <p className="text-slate-600 dark:text-dark-text-secondary text-lg">
              Schriftlicher Ausdruck Übungen
            </p>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl p-12 shadow-xl border border-white/50 dark:border-purple-500/20 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-500 dark:to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <FileEdit size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-dark-text-primary mb-4">
            Bald verfügbar!
          </h2>
          <p className="text-slate-600 dark:text-dark-text-secondary text-lg max-w-2xl mx-auto">
            Die Schreiben-Übungen sind noch in der Entwicklung. Fokussiere dich
            momentan auf das Hörverständnis für optimale DTZ-Vorbereitung.
          </p>
          <Link
            to="/tests/hoeren"
            className="inline-flex items-center gap-2 mt-6 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-500 dark:to-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
          >
            Zum Hören Training
          </Link>
        </div>
      </div>
    </div>
  );
}
