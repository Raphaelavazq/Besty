/**
 * LesenTeil3
 * Multiple Choice exercises for Teil 3 (Formelle Texte)
 * Authentic DTZ B1 reading comprehension with formal letters and emails
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import lesenData from "../../data/lesen-exercises.json";

export default function LesenTeil3() {
  const navigate = useNavigate();
  const exercises = lesenData.teil3.exercises;
  const [currentExercise, setCurrentExercise] = useState(0);
  const exercise = exercises[currentExercise];

  // State for answers (store selected option index for each question)
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    if (showResults) return;

    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleCheck = () => {
    let correctCount = 0;
    exercise.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      handleReset();
    }
  };

  const isAnswerCorrect = (questionIndex) => {
    const question = exercise.questions[questionIndex];
    return answers[questionIndex] === question.correctAnswer;
  };

  const allQuestionsAnswered = exercise.questions.every(
    (_, index) => answers[index] !== undefined
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/tests/lesen/training")}
            className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold mb-4 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Zurück zur Übersicht</span>
          </button>

          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-purple-100 dark:border-purple-500/20">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Teil 3: Formelle Texte
                </h1>
                <p className="text-gray-600 dark:text-dark-text-secondary text-sm mt-1">
                  Übung {currentExercise + 1} von {exercises.length}
                </p>
              </div>
            </div>

            {showResults && (
              <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl border border-purple-200 dark:border-purple-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900 dark:text-dark-text-primary">
                        Ergebnis: {score} / {exercise.questions.length}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-dark-text-secondary">
                        {score === exercise.questions.length
                          ? "Perfekt! 🎉"
                          : `${Math.round(
                              (score / exercise.questions.length) * 100
                            )}% richtig`}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/10 rounded-xl border border-purple-200 dark:border-purple-500/30 hover:bg-purple-50 dark:hover:bg-white/20 transition-colors duration-200 text-sm font-semibold text-gray-700 dark:text-dark-text-primary"
                    >
                      <RotateCcw size={16} />
                      <span>Neu starten</span>
                    </button>
                    {currentExercise < exercises.length - 1 && (
                      <button
                        onClick={handleNextExercise}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 text-sm font-semibold"
                      >
                        Nächste Übung
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Exercise Content */}
        <div className="grid gap-8">
          {/* Text Display */}
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100 dark:border-purple-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">
                {exercise.title}
              </h2>
            </div>

            <div className="prose max-w-none">
              {exercise.text.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 dark:text-dark-text-secondary leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {exercise.questions.map((question, qIndex) => {
              const selectedAnswer = answers[qIndex];
              const isCorrect = isAnswerCorrect(qIndex);

              return (
                <div
                  key={qIndex}
                  className={`bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl p-6 shadow-xl border transition-all duration-200 ${
                    showResults
                      ? isCorrect
                        ? "border-green-400 dark:border-green-500 bg-green-50/50 dark:bg-green-900/20"
                        : selectedAnswer !== undefined
                          ? "border-red-400 dark:border-red-500 bg-red-50/50 dark:bg-red-900/20"
                          : "border-purple-100 dark:border-purple-500/20"
                      : "border-purple-100 dark:border-purple-500/20"
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-white font-bold">{qIndex + 1}</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary pt-1">
                      {question.question}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-3 ml-14">
                    {question.options.map((option, optIndex) => {
                      const isSelected = selectedAnswer === optIndex;
                      const isCorrectOption =
                        optIndex === question.correctAnswer;

                      return (
                        <button
                          key={optIndex}
                          onClick={() => handleAnswerSelect(qIndex, optIndex)}
                          disabled={showResults}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                            showResults
                              ? isCorrectOption
                                ? "border-green-400 bg-green-100 dark:border-green-500 dark:bg-green-900/30"
                                : isSelected
                                  ? "border-red-400 bg-red-100 dark:border-red-500 dark:bg-red-900/30"
                                  : "border-gray-200 bg-white/50 dark:border-purple-500/20 dark:bg-white/5"
                              : isSelected
                                ? "border-purple-400 bg-purple-50 dark:border-purple-500 dark:bg-purple-900/30"
                                : "border-gray-200 bg-white/50 hover:border-purple-300 hover:bg-purple-50/50 dark:border-purple-500/20 dark:bg-white/5 dark:hover:border-purple-500/40 dark:hover:bg-white/10"
                          } ${showResults ? "cursor-default" : "cursor-pointer"}`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                showResults
                                  ? isCorrectOption
                                    ? "border-green-600 bg-green-600 dark:border-green-500 dark:bg-green-500"
                                    : isSelected
                                      ? "border-red-600 bg-red-600 dark:border-red-500 dark:bg-red-500"
                                      : "border-gray-300 dark:border-purple-500/30"
                                  : isSelected
                                    ? "border-purple-600 bg-purple-600 dark:border-purple-500 dark:bg-purple-500"
                                    : "border-gray-300 dark:border-purple-500/30"
                              }`}
                            >
                              {showResults && isCorrectOption && (
                                <CheckCircle
                                  className="w-4 h-4 text-white"
                                  strokeWidth={3}
                                />
                              )}
                              {showResults &&
                                isSelected &&
                                !isCorrectOption && (
                                  <XCircle
                                    className="w-4 h-4 text-white"
                                    strokeWidth={3}
                                  />
                                )}
                              {!showResults && isSelected && (
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                              )}
                            </div>
                            <span className="text-gray-700 font-medium dark:text-dark-text-primary">
                              {option}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {showResults && question.explanation && (
                    <div className="mt-4 ml-14 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl border border-purple-200 dark:border-purple-500/30">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-dark-text-primary mb-1">
                            Erklärung:
                          </div>
                          <div className="text-sm text-gray-700 dark:text-dark-text-secondary leading-relaxed">
                            {question.explanation}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Check Button */}
          {!showResults && (
            <div className="flex justify-center">
              <button
                onClick={handleCheck}
                disabled={!allQuestionsAnswered}
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-200 ${
                  allQuestionsAnswered
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-2xl hover:-translate-y-1 dark:from-purple-500 dark:to-indigo-500"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                }`}
              >
                <CheckCircle size={24} />
                <span>Antworten prüfen</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
