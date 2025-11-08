/**
 * LesenTeil2 - Training for Lesen Teil 2 (Zeitungsartikel)
 * True/False reading comprehension exercises
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Newspaper,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  Target,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import lesenData from "../../data/lesen-exercises.json";

export default function LesenTeil2() {
  const navigate = useNavigate();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const exercises = lesenData.teil2.exercises;
  const exercise = exercises[currentExercise];

  const handleAnswer = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const checkAnswers = () => {
    let correct = 0;
    exercise.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
    setShowResults(true);
  };

  const resetExercise = () => {
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      resetExercise();
    }
  };

  const isComplete = Object.keys(answers).length === exercise.questions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/tests/lesen/training")}
            className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Zurück zur Übersicht</span>
          </button>

          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-semibold mb-3">
                <Newspaper className="w-4 h-4" />
                Teil 2: Zeitungsartikel
              </div>
              <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                {exercise.title}
              </h1>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-dark-text-secondary">
                Übung
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-dark-text-primary">
                {currentExercise + 1} / {exercises.length}
              </div>
            </div>
          </div>
        </div>

        {/* Article Text */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 lg:p-10 shadow-xl border border-purple-100 dark:border-purple-500/20 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-2">
                Artikel lesen
              </h2>
              <p className="text-gray-600 dark:text-dark-text-secondary">
                Lesen Sie den Text und entscheiden Sie: Richtig oder Falsch?
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            {exercise.text.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-700 dark:text-dark-text-secondary leading-relaxed mb-4 text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4 mb-8">
          {exercise.questions.map((question, index) => {
            const isCorrect =
              showResults && answers[question.id] === question.correctAnswer;
            const isWrong =
              showResults &&
              answers[question.id] !== undefined &&
              answers[question.id] !== question.correctAnswer;

            return (
              <div
                key={question.id}
                className={`bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg border-2 transition-all duration-200 ${
                  isCorrect
                    ? "border-green-400 dark:border-green-500 bg-green-50/50 dark:bg-green-900/20"
                    : isWrong
                      ? "border-red-400 dark:border-red-500 bg-red-50/50 dark:bg-red-900/20"
                      : "border-purple-100 dark:border-purple-500/20"
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg flex items-center justify-center flex-shrink-0 font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-900 dark:text-dark-text-primary font-semibold leading-relaxed flex-1">
                    {question.text}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleAnswer(question.id, true)}
                    disabled={showResults}
                    className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                      answers[question.id] === true
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                        : "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/40"
                    } ${showResults ? "cursor-not-allowed opacity-75" : ""}`}
                  >
                    <ThumbsUp className="w-5 h-5" />
                    <span>Richtig</span>
                  </button>

                  <button
                    onClick={() => handleAnswer(question.id, false)}
                    disabled={showResults}
                    className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                      answers[question.id] === false
                        ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg"
                        : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40"
                    } ${showResults ? "cursor-not-allowed opacity-75" : ""}`}
                  >
                    <ThumbsDown className="w-5 h-5" />
                    <span>Falsch</span>
                  </button>
                </div>

                {showResults && (
                  <div
                    className={`mt-4 p-4 rounded-xl flex items-start gap-3 ${
                      isCorrect ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      {isCorrect ? (
                        <p className="text-sm text-green-800 font-semibold">
                          Richtig!
                        </p>
                      ) : (
                        <div className="text-sm text-red-800">
                          <p className="font-semibold mb-1">
                            Falsch. Richtige Antwort:{" "}
                            {question.correctAnswer ? "Richtig" : "Falsch"}
                          </p>
                        </div>
                      )}
                      <p className="text-sm text-gray-700 dark:text-dark-text-secondary mt-2">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {!showResults ? (
            <button
              onClick={checkAnswers}
              disabled={!isComplete}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-200 ${
                isComplete
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-2xl hover:-translate-y-1"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              <CheckCircle size={20} />
              <span>Antworten prüfen</span>
            </button>
          ) : (
            <>
              <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl px-8 py-4 shadow-xl border border-purple-100 dark:border-purple-500/20">
                <div className="flex items-center gap-4">
                  <Trophy className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-dark-text-secondary">
                      Ergebnis
                    </div>
                    <div className="text-2xl font-black text-gray-900 dark:text-dark-text-primary">
                      {score} / {exercise.questions.length}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={resetExercise}
                className="inline-flex items-center gap-3 bg-white dark:bg-white/10 text-purple-700 dark:text-purple-400 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 border-2 border-purple-200 dark:border-purple-500/30"
              >
                <RotateCcw size={20} />
                <span>Nochmal üben</span>
              </button>

              {currentExercise < exercises.length - 1 && (
                <button
                  onClick={nextExercise}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
                >
                  <span>Nächste Übung</span>
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
