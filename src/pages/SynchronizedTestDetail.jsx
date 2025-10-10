import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Clock, Volume2 } from "lucide-react";
import HoerenTeilComplete from "../components/HoerenTeilComplete";

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-6">
            <p className="text-center text-slate-500">Test wird geladen...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/tests"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zu Tests
          </Link>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 overflow-hidden">
            <div className="p-6 sm:p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Volume2 className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                {test.title}
              </h1>
              <p className="text-slate-600 mb-6 text-sm sm:text-base">
                {test.subtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-slate-600">Dauer</p>
                  <p className="font-semibold text-slate-800">
                    {test.duration}
                  </p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-slate-600">Fragen</p>
                  <p className="font-semibold text-slate-800">
                    {test.questions.length}
                  </p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Volume2 className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-slate-600">Level</p>
                  <p className="font-semibold text-slate-800">{test.level}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 sm:p-6 mb-6">
                <h3 className="font-semibold text-amber-800 mb-3 text-sm sm:text-base">
                  Wichtige Hinweise:
                </h3>
                <ul className="text-sm text-amber-700 space-y-2 text-left max-w-md mx-auto">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2 flex-shrink-0">•</span>
                    <span>Das Audio läuft kontinuierlich</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2 flex-shrink-0">•</span>
                    <span>
                      Fragen erscheinen automatisch zur richtigen Zeit
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2 flex-shrink-0">•</span>
                    <span>Sie haben begrenzte Zeit pro Frage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2 flex-shrink-0">•</span>
                    <span>Hören Sie aufmerksam zu</span>
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                  {test.instructions}
                </p>
              </div>

              <button
                onClick={() => setStarted(true)}
                className="bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 inline-flex items-center text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2" />
                Test starten
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <Link
          to="/tests"
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zu Tests
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
