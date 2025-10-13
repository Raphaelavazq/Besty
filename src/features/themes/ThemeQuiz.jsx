import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Check, X, Trophy, RotateCcw } from "lucide-react";
import { getThemeById } from "./themesData";

/**
 * Theme Vocabulary Quiz
 * Interactive fill-in-the-blank questions with immediate feedback
 */
function ThemeQuiz() {
  const { themeId } = useParams();
  const navigate = useNavigate();
  const theme = getThemeById(themeId);

  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [quizFinished, setQuizFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  // Load quiz data
  useEffect(() => {
    async function loadQuiz() {
      try {
        const response = await fetch(`/data/themes/${themeId}.json`);
        if (!response.ok) throw new Error("Quiz nicht gefunden");
        const data = await response.json();
        setQuizData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading quiz:", error);
        setLoading(false);
      }
    }
    loadQuiz();
  }, [themeId]);

  const currentQuestion = quizData?.questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex) => {
    if (showFeedback) return; // Already answered

    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    // Update score
    setScore((prev) => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1,
    }));

    // Save answer
    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        question: currentQuestion.question,
        selectedAnswer: answerIndex,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
        options: currentQuestion.options,
      },
    ]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore({ correct: 0, total: 0 });
    setQuizFinished(false);
    setAnswers([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Quiz wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!quizData || !theme) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Quiz nicht gefunden
          </h1>
          <Link
            to="/dashboard"
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            ← Zurück zum Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Results Screen
  if (quizFinished) {
    const percentage = Math.round((score.correct / score.total) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              to={`/themes/${themeId}`}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Zurück zum Thema
            </Link>
          </div>
        </div>

        {/* Results Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Score Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-purple-100 p-8 mb-8 text-center">
            <Trophy className="w-20 h-20 text-purple-600 mx-auto mb-4" />
            <h1 className="text-4xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Quiz abgeschlossen!
              </span>
            </h1>

            <div className="text-6xl font-black mb-2">
              <span
                className={
                  percentage >= 80
                    ? "text-green-600"
                    : percentage >= 60
                      ? "text-yellow-600"
                      : "text-red-600"
                }
              >
                {percentage}%
              </span>
            </div>
            <p className="text-xl text-gray-600 mb-6">
              {score.correct} von {score.total} Fragen richtig
            </p>

            {/* Feedback Message */}
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white mb-6">
              <p className="text-lg font-semibold">
                {percentage >= 80 &&
                  "🎉 Ausgezeichnet! Du beherrschst das Thema sehr gut!"}
                {percentage >= 60 &&
                  percentage < 80 &&
                  "👍 Gut gemacht! Mit etwas Übung wirst du noch besser!"}
                {percentage < 60 && "💪 Weiter üben! Du machst Fortschritte!"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <RotateCcw className="w-5 h-5" />
                Nochmal üben
              </button>
              <Link
                to={`/themes/${themeId}`}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-200"
              >
                Zurück zum Thema
              </Link>
            </div>
          </div>

          {/* Answer Review */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-purple-100 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Deine Antworten
            </h2>
            <div className="space-y-4">
              {answers.map((answer, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 ${
                    answer.isCorrect
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    {answer.isCorrect ? (
                      <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    ) : (
                      <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <p
                        className="text-gray-800 mb-2"
                        dangerouslySetInnerHTML={{ __html: answer.question }}
                      />
                      <div className="space-y-1">
                        {!answer.isCorrect && (
                          <>
                            <p className="text-red-700 font-semibold">
                              Deine Antwort:{" "}
                              {answer.options[answer.selectedAnswer]}
                            </p>
                            <p className="text-green-700 font-semibold">
                              Richtig: {answer.options[answer.correctAnswer]}
                            </p>
                          </>
                        )}
                        {answer.isCorrect && (
                          <p className="text-green-700 font-semibold">
                            ✓ {answer.options[answer.correctAnswer]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  const progress =
    ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to={`/themes/${themeId}`}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Beenden
            </Link>
            <div className="text-sm font-semibold text-gray-600">
              Frage {currentQuestionIndex + 1} / {quizData.questions.length}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 h-2">
        <div
          className="bg-gradient-to-r from-purple-600 to-indigo-600 h-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-purple-100 p-8 md:p-12">
          {/* Question */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              <span
                dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
              />
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showCorrect = showFeedback && isCorrect;
              const showWrong = showFeedback && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={`w-full p-6 rounded-2xl border-2 text-left text-lg font-semibold transition-all duration-200 ${
                    showCorrect
                      ? "bg-green-50 border-green-500 text-green-800"
                      : showWrong
                        ? "bg-red-50 border-red-500 text-red-800"
                        : isSelected
                          ? "bg-purple-50 border-purple-500 text-purple-800"
                          : "bg-white border-gray-200 text-gray-800 hover:border-purple-300 hover:bg-purple-50 hover:-translate-y-1 hover:shadow-lg"
                  } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showCorrect && (
                      <Check className="w-6 h-6 text-green-600" />
                    )}
                    {showWrong && <X className="w-6 h-6 text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          {showFeedback && (
            <button
              onClick={handleNext}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              {currentQuestionIndex < quizData.questions.length - 1
                ? "Nächste Frage"
                : "Ergebnisse anzeigen"}
            </button>
          )}

          {/* Score Display */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Aktuell: {score.correct} richtig von {score.total} beantwortet
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeQuiz;
