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
      <div className="max-w-4xl mx-auto p-6">
        <div className="card">
          <p className="text-center text-gray-500">Test wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Link
          to="/tests"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zu Tests
        </Link>

        <div className="card">
          <div className="text-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Volume2 className="w-10 h-10 text-indigo-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {test.title}
            </h1>
            <p className="text-gray-600 mb-6">{test.subtitle}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600">Dauer</p>
                <p className="font-semibold">{test.duration}</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Play className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">Fragen</p>
                <p className="font-semibold">{test.questions.length}</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Volume2 className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600">Level</p>
                <p className="font-semibold">{test.level}</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">
                Wichtige Hinweise:
              </h3>
              <ul className="text-sm text-yellow-700 space-y-1 text-left max-w-md mx-auto">
                <li>• Das Audio läuft kontinuierlich</li>
                <li>• Fragen erscheinen automatisch zur richtigen Zeit</li>
                <li>• Sie haben begrenzte Zeit pro Frage</li>
                <li>• Hören Sie aufmerksam zu</li>
              </ul>
            </div>

            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              {test.instructions}
            </p>

            <button
              onClick={() => setStarted(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors inline-flex items-center text-lg shadow-lg hover:shadow-xl"
            >
              <Play className="w-5 h-5 mr-2" />
              Test starten
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6">
        <Link
          to="/tests"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zu Tests
        </Link>
      </div>

      <HoerenTeilComplete
        audioUrl={test.audioUrl}
        questions={test.questions}
        test={test}
        onComplete={handleTestComplete}
      />
    </div>
  );
}
