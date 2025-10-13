/**
 * HoerenUebung - Practice mode with immediate feedback
 * Allows replay and shows correct answers
 */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import HoerenPlayer from "./HoerenPlayer";
import { useHoerenEngine } from "./useHoerenEngine";

export default function HoerenUebung() {
  const { teil } = useParams();
  const navigate = useNavigate();
  const [uebungData, setUebungData] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load practice data
  useEffect(() => {
    fetch("/data/dtz/hoeren-uebung.json")
      .then((res) => res.json())
      .then((data) => {
        const teilKey = `teil${teil}`;
        const teilData = data[teilKey];
        setUebungData(teilData);

        // Map exercises to include audioFile
        const items = teilData.exercises.map((ex) => ({
          ...ex,
          no: parseInt(ex.id.split("_").pop()),
          audioFile: ex.track,
        }));
        setExercises(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading exercises:", err);
        setLoading(false);
      });
  }, [teil]);

  const [state, actions] = useHoerenEngine("uebung", exercises);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Übungen werden geladen...</p>
        </div>
      </div>
    );
  }

  if (!uebungData || exercises.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">
            Noch keine Übungen für Teil {teil} verfügbar
          </p>
          <button
            onClick={() => navigate("/tests/hoeren")}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
          >
            Zurück
          </button>
        </div>
      </div>
    );
  }

  const currentItem = exercises[state.currentItemIndex];

  // Completion screen
  if (state.isComplete) {
    const score = actions.calculateScore();

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-12 text-center border border-purple-100">
            <div className="text-6xl mb-6">🎉</div>

            <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Gut gemacht!
            </h1>

            <p className="text-2xl text-gray-600 mb-8">
              Du hast {score.correct} von {score.total} richtig beantwortet
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => actions.resetEngine()}
                className="px-8 py-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors"
              >
                Nochmal üben
              </button>

              <button
                onClick={() => navigate("/tests/hoeren")}
                className="px-8 py-4 rounded-xl bg-white text-purple-600 font-bold border-2 border-purple-600 hover:bg-purple-50 transition-colors"
              >
                Zurück zur Übersicht
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Practice screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-8 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <button
          onClick={() => navigate("/tests/hoeren")}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Zurück
        </button>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-purple-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {uebungData.title}
          </h1>
          <p className="text-gray-600">{uebungData.description}</p>
        </div>
      </div>

      {/* Player */}
      <HoerenPlayer
        mode="uebung"
        audioFile={currentItem.audioFile}
        item={currentItem}
        onAnswer={(answer) => actions.submitAnswer(currentItem.no, answer)}
        onNext={actions.nextItem}
        selectedAnswer={state.answers[currentItem.no]}
        showFeedback={state.showFeedback}
        allowReplay={true}
        totalItems={exercises.length}
        currentItemNumber={state.currentItemIndex + 1}
        statements={uebungData?.statements || null}
      />
    </div>
  );
}
