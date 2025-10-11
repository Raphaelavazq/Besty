import { Link } from "react-router-dom";
import { ArrowLeft, FileEdit } from "lucide-react";

export default function Schreiben() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/tests"
            className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border border-white/50 hover:bg-white/90 transition-all duration-200"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Schreiben Training
            </h1>
            <p className="text-slate-600 text-lg">
              Schriftlicher Ausdruck Übungen
            </p>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 shadow-xl border border-white/50 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <FileEdit size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Bald verfügbar!
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Die Schreiben-Übungen sind noch in der Entwicklung. Fokussiere dich
            momentan auf das Hörverständnis für optimale DTZ-Vorbereitung.
          </p>
          <Link
            to="/tests/hoeren"
            className="inline-flex items-center gap-2 mt-6 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
          >
            Zum Hören Training
          </Link>
        </div>
      </div>
    </div>
  );
}
