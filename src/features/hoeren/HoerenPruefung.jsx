/**
 * HoerenPruefung - Full DTZ Hören Test (25 minutes, 20 questions)
 * Authentic exam conditions: no replay, timed
 */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, CheckCircle } from "lucide-react";
import HoerenPlayer from "./HoerenPlayer";
import { useHoerenEngine } from "./useHoerenEngine";
import { calculateLevel, getFeedbackMessage } from "./scoring";
import { triggerHaptic } from "../../utils/haptics";

export default function HoerenPruefung() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [testData, setTestData] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testStarted, setTestStarted] = useState(false);

  // Warn on page refresh during active test
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (testStarted && !state.isComplete) {
        e.preventDefault();
        e.returnValue =
          "Test wird abgebrochen. Möchten Sie wirklich die Seite verlassen?";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [testStarted]);

  // Load test data
  useEffect(() => {
    setTestStarted(true);
    fetch("/data/dtz/hoeren-tests.json")
      .then((res) => res.json())
      .then((data) => {
        const test = data[testId || "modelltest-1"];
        setTestData(test);

        // Flatten all items from all parts, but group Teil 3 pairs
        const items = [];
        test.parts.forEach((part) => {
          if (part.teil === 3) {
            // Teil 3: Group questions in pairs (10+11, 12+13, 14+15, 16+17)
            for (let i = 0; i < part.items.length; i += 2) {
              items.push({
                ...part.items[i],
                teil: part.teil,
                audioFile: part.items[i].track,
                pairedItem: part.items[i + 1]
                  ? {
                      ...part.items[i + 1],
                      audioFile: part.items[i + 1].track,
                    }
                  : null,
              });
            }
          } else {
            // Other parts: normal single questions
            part.items.forEach((item) => {
              items.push({
                ...item,
                teil: part.teil,
                audioFile: item.track,
              });
            });
          }
        });

        setAllItems(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading test:", err);
        setLoading(false);
      });
  }, [testId]);

  const [state, actions] = useHoerenEngine("pruefung", allItems, 1500);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Test wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!testData || allItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Test nicht gefunden</p>
          <button
            onClick={handleBackClick}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
          >
            Zurück
          </button>
        </div>
      </div>
    );
  }

  const currentItem = allItems[state.currentItemIndex];
  const score = state.isComplete ? actions.calculateScore() : null;

  // Get statements for Teil 4 (matching questions)
  const currentPart = testData?.parts.find(
    (part) => part.teil === currentItem?.teil
  );
  const statements = currentPart?.statements || null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle back navigation with confirmation during active test
  const handleBackClick = () => {
    if (testStarted && !state.isComplete) {
      const confirmed = window.confirm(
        "Möchten Sie wirklich abbrechen? Ihr Fortschritt geht verloren."
      );
      if (confirmed) {
        triggerHaptic();
        navigate("/tests/hoeren");
      }
    } else {
      triggerHaptic();
      navigate("/tests/hoeren");
    }
  };

  // Results screen
  if (state.isComplete && score) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-12 text-center border border-purple-100">
            <div className="mb-8">
              <div
                className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
                  score.passed ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {score.passed ? (
                  <CheckCircle className="w-12 h-12 text-green-600" />
                ) : (
                  <span className="text-4xl">📖</span>
                )}
              </div>

              <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                {score.passed ? "Bestanden!" : "Nicht bestanden"}
              </h1>

              <p className="text-2xl text-gray-600 mb-2">
                {score.correct} von {score.total} richtig
              </p>

              <p className="text-4xl font-bold text-purple-600 mb-4">
                {score.percentage}%
              </p>

              <p className="text-xl text-gray-700 mb-2">
                {calculateLevel(score.percentage)}
              </p>

              <p className="text-lg text-gray-600">
                {getFeedbackMessage(score)}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={() => {
                  triggerHaptic();
                  actions.resetEngine();
                }}
                className="px-8 py-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors"
              >
                Nochmal versuchen
              </button>

              <button
                onClick={handleBackClick}
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

  // Test screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-8 px-4">
      {/* Header with timer */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {testData.title}
              </h1>
              <p className="text-sm text-gray-600">
                Hören • {currentItem.teil}. Teil
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <Clock
                    className={`w-5 h-5 ${state.timeRemaining < 300 ? "text-red-600" : "text-purple-600"}`}
                  />
                  <div className="flex flex-col">
                    <span
                      className={`text-xl font-bold ${state.timeRemaining < 300 ? "text-red-600" : "text-gray-900"}`}
                    >
                      {formatTime(state.timeRemaining || 0)}
                    </span>
                    <span className="text-xs text-gray-500">
                      Frage {state.currentItemIndex + 1} von {allItems.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Player */}
      <HoerenPlayer
        mode="pruefung"
        audioFile={currentItem.audioFile}
        item={currentItem}
        pairedItem={currentItem.pairedItem || null}
        onAnswer={(answer) => actions.submitAnswer(currentItem.no, answer)}
        onAnswerPaired={
          currentItem.pairedItem
            ? (answer) =>
                actions.submitAnswer(currentItem.pairedItem.no, answer)
            : null
        }
        onNext={actions.nextItem}
        selectedAnswer={state.answers[currentItem.no]}
        selectedAnswerPaired={
          currentItem.pairedItem
            ? state.answers[currentItem.pairedItem.no]
            : null
        }
        showFeedback={false}
        allowReplay={false}
        totalItems={allItems.length}
        currentItemNumber={state.currentItemIndex + 1}
        statements={statements}
      />
    </div>
  );
}
