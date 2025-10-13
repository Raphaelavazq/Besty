/**
 * HoerenTraining - Random practice mode
 * Randomly selects questions from Prüfung tests for focused practice
 * Allows replay and shows immediate feedback
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shuffle, RefreshCw } from "lucide-react";
import HoerenPlayer from "./HoerenPlayer";
import { useHoerenEngine } from "./useHoerenEngine";
import { triggerHaptic } from "../../utils/haptics";

export default function HoerenTraining() {
  const navigate = useNavigate();
  const [allQuestions, setAllQuestions] = useState([]);
  const [trainingQuestions, setTrainingQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionCount, setQuestionCount] = useState(10); // Default 10 questions

  // Load all Prüfung tests and extract questions
  useEffect(() => {
    fetch("/data/dtz/hoeren-tests.json")
      .then((res) => res.json())
      .then((data) => {
        const questions = [];

        // Extract all questions from all tests
        Object.values(data).forEach((test) => {
          test.parts.forEach((part) => {
            if (part.teil === 3) {
              // Teil 3: Group questions in pairs
              for (let i = 0; i < part.items.length; i += 2) {
                questions.push({
                  ...part.items[i],
                  teil: part.teil,
                  audioFile: part.items[i].track,
                  pairedItem: part.items[i + 1]
                    ? {
                        ...part.items[i + 1],
                        audioFile: part.items[i + 1].track,
                      }
                    : null,
                  testName: test.title,
                });
              }
            } else if (part.teil === 4) {
              // Teil 4: Include statements
              part.items.forEach((item) => {
                questions.push({
                  ...item,
                  teil: part.teil,
                  audioFile: item.track,
                  statements: part.statements,
                  testName: test.title,
                });
              });
            } else {
              // Other parts: regular questions
              part.items.forEach((item) => {
                questions.push({
                  ...item,
                  teil: part.teil,
                  audioFile: item.track,
                  testName: test.title,
                });
              });
            }
          });
        });

        setAllQuestions(questions);
        selectRandomQuestions(questions, questionCount);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading tests:", err);
        setLoading(false);
      });
  }, []);

  // Select random questions
  const selectRandomQuestions = (questions, count) => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);
    setTrainingQuestions(selected);
  };

  // Shuffle and get new random questions
  const handleShuffle = () => {
    triggerHaptic();
    selectRandomQuestions(allQuestions, questionCount);
    actions.resetEngine();
  };

  const [state, actions] = useHoerenEngine("uebung", trainingQuestions);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Training wird vorbereitet...</p>
        </div>
      </div>
    );
  }

  if (allQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-600 text-lg mb-4">Keine Fragen gefunden</p>
          <button
            onClick={() => {
              triggerHaptic();
              navigate("/tests/hoeren");
            }}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all"
          >
            Zurück
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = trainingQuestions[state.currentItemIndex];
  const score = state.isComplete ? actions.calculateScore() : null;

  // Results screen
  if (state.isComplete && score) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-12 text-center border border-purple-100">
            <div className="mb-8">
              <div className="w-24 h-24 rounded-full mx-auto mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                <span className="text-4xl">🎯</span>
              </div>

              <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Training abgeschlossen!
              </h1>

              <div className="text-6xl font-black text-gray-900 mb-4">
                {score.correct}/{score.total}
              </div>

              <p className="text-2xl text-gray-700 mb-2">
                {Math.round(score.percentage)}% richtig
              </p>

              <p className="text-lg text-gray-600">
                {score.percentage >= 75
                  ? "🎉 Sehr gut! Weiter so!"
                  : score.percentage >= 50
                    ? "👍 Gut gemacht! Übe weiter!"
                    : "📚 Übe noch ein bisschen mehr!"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                onClick={() => {
                  triggerHaptic();
                  handleShuffle();
                }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <Shuffle className="w-5 h-5" />
                Neue Fragen
              </button>

              <button
                onClick={() => {
                  triggerHaptic();
                  actions.resetEngine();
                }}
                className="px-8 py-4 rounded-xl bg-white text-purple-600 font-bold border-2 border-purple-600 hover:bg-purple-50 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Wiederholen
              </button>

              <button
                onClick={() => {
                  triggerHaptic();
                  navigate("/tests/hoeren");
                }}
                className="px-8 py-4 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
              >
                Zurück
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Training screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-8 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 border border-purple-100">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                triggerHaptic();
                navigate("/tests/hoeren");
              }}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Zurück</span>
            </button>

            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Training</h1>
              <p className="text-sm text-gray-600">
                Frage {state.currentItemIndex + 1} von{" "}
                {trainingQuestions.length} • Teil {currentQuestion.teil}
              </p>
            </div>

            <button
              onClick={handleShuffle}
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-all font-medium"
              title="Neue zufällige Fragen"
            >
              <Shuffle className="w-5 h-5" />
              <span className="hidden sm:inline">Neu mischen</span>
            </button>
          </div>
        </div>
      </div>

      {/* Player */}
      <HoerenPlayer
        mode="uebung"
        audioFile={currentQuestion.audioFile}
        item={currentQuestion}
        pairedItem={currentQuestion.pairedItem || null}
        onAnswer={(answer) => actions.submitAnswer(currentQuestion.no, answer)}
        onAnswerPaired={
          currentQuestion.pairedItem
            ? (answer) =>
                actions.submitAnswer(currentQuestion.pairedItem.no, answer)
            : null
        }
        onNext={actions.nextItem}
        selectedAnswer={state.answers[currentQuestion.no]}
        selectedAnswerPaired={
          currentQuestion.pairedItem
            ? state.answers[currentQuestion.pairedItem.no]
            : null
        }
        showFeedback={state.showFeedback[currentQuestion.no]}
        allowReplay={true}
        totalItems={trainingQuestions.length}
        currentItemNumber={state.currentItemIndex + 1}
        statements={currentQuestion.statements || null}
      />
    </div>
  );
}
