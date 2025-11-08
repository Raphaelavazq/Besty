/**
 * LesenPruefung
 * Complete DTZ B1 Lesen exam simulation
 * All 3 Teile in sequence with timer (45 minutes total)
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Newspaper,
  Mail,
  Award,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import lesenData from "../../data/lesen-exercises.json";

export default function LesenPruefung() {
  const navigate = useNavigate();
  const [currentTeil, setCurrentTeil] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes in seconds
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isExamFinished, setIsExamFinished] = useState(false);

  // Answers for all Teile
  const [teil1Answers, setTeil1Answers] = useState({});
  const [teil2Answers, setTeil2Answers] = useState({});
  const [teil3Answers, setTeil3Answers] = useState({});

  // Timer
  useEffect(() => {
    if (!isExamStarted || isExamFinished) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamStarted, isExamFinished]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartExam = () => {
    setIsExamStarted(true);
  };

  const handleFinishExam = () => {
    setIsExamFinished(true);
  };

  const handleNextTeil = () => {
    if (currentTeil < 3) {
      setCurrentTeil(currentTeil + 1);
    } else {
      handleFinishExam();
    }
  };

  const handlePreviousTeil = () => {
    if (currentTeil > 1) {
      setCurrentTeil(currentTeil - 1);
    }
  };

  const handleReset = () => {
    setCurrentTeil(1);
    setTimeRemaining(45 * 60);
    setIsExamStarted(false);
    setIsExamFinished(false);
    setTeil1Answers({});
    setTeil2Answers({});
    setTeil3Answers({});
  };

  const calculateScore = () => {
    let total = 0;
    let correct = 0;

    // Teil 1 - 5 points
    const teil1Exercise = lesenData.teil1.exercises[0];
    teil1Exercise.situations.forEach((situation, index) => {
      total++;
      if (teil1Answers[index] !== undefined) {
        const selectedText = teil1Exercise.texts[teil1Answers[index]];
        if (selectedText && selectedText.id === situation.correctAnswer) {
          correct++;
        }
      }
    });

    // Teil 2 - 5 points
    const teil2Exercise = lesenData.teil2.exercises[0];
    teil2Exercise.questions.forEach((question, index) => {
      total++;
      if (teil2Answers[index] === question.correctAnswer) {
        correct++;
      }
    });

    // Teil 3 - 10 points
    const teil3Exercise = lesenData.teil3.exercises[0];
    teil3Exercise.questions.forEach((question, index) => {
      total++;
      if (teil3Answers[index] === question.correctAnswer) {
        correct++;
      }
    });

    return { correct, total };
  };

  // Start Screen
  if (!isExamStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/tests/lesen")}
            className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold mb-8 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Zurück</span>
          </button>

          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 lg:p-12 shadow-xl border border-purple-100 dark:border-purple-500/20">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4">
                Lesen Prüfung
              </h1>
              <p className="text-xl text-gray-600 dark:text-dark-text-secondary">
                Vollständige DTZ B1 Prüfungssimulation
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-500/30">
                <h3 className="font-bold text-gray-900 dark:text-dark-text-primary mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  Prüfungsablauf
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-dark-text-primary">
                        Teil 1: Kataloge & Anzeigen
                      </div>
                      <div className="text-sm text-gray-600 dark:text-dark-text-secondary">
                        15 Minuten • 5 Punkte
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Newspaper className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-dark-text-primary">
                        Teil 2: Zeitungsartikel
                      </div>
                      <div className="text-sm text-gray-600 dark:text-dark-text-secondary">
                        15 Minuten • 5 Punkte
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-dark-text-primary">
                        Teil 3: Formelle Texte
                      </div>
                      <div className="text-sm text-gray-600 dark:text-dark-text-secondary">
                        15 Minuten • 10 Punkte
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-500/30">
                <h3 className="font-bold text-gray-900 dark:text-dark-text-primary mb-3">
                  Wichtige Hinweise:
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-dark-text-secondary">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Sie haben 45 Minuten für alle 3 Teile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Sie können zwischen den Teilen hin- und herwechseln
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Maximal erreichbare Punktzahl: 20 Punkte</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Die Prüfung endet automatisch nach 45 Minuten</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={handleStartExam}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
            >
              Prüfung starten
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (isExamFinished) {
    const { correct, total } = calculateScore();
    const percentage = Math.round((correct / total) * 100);
    const passed = percentage >= 60;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 lg:p-12 shadow-xl border border-purple-100 dark:border-purple-500/20">
            <div className="text-center mb-8">
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg ${
                  passed
                    ? "bg-gradient-to-r from-green-500 to-emerald-600"
                    : "bg-gradient-to-r from-orange-500 to-red-600"
                }`}
              >
                <Award className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4">
                Prüfung beendet!
              </h1>
              <p className="text-xl text-gray-600 dark:text-dark-text-secondary mb-2">
                {passed ? "Herzlichen Glückwunsch! 🎉" : "Weiter üben! 💪"}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-500/30 text-center">
                <div className="text-4xl font-black text-purple-600 dark:text-purple-400 mb-2">
                  {correct}/{total}
                </div>
                <div className="text-sm text-gray-600 dark:text-dark-text-secondary">
                  Richtige Antworten
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-500/30 text-center">
                <div className="text-4xl font-black text-purple-600 dark:text-purple-400 mb-2">
                  {percentage}%
                </div>
                <div className="text-sm text-gray-600 dark:text-dark-text-secondary">
                  Prozent
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-500/30 text-center">
                <div
                  className={`text-4xl font-black mb-2 ${
                    passed
                      ? "text-green-600 dark:text-green-400"
                      : "text-orange-600 dark:text-orange-400"
                  }`}
                >
                  {passed ? "Bestanden" : "Nicht bestanden"}
                </div>
                <div className="text-sm text-gray-600 dark:text-dark-text-secondary">
                  {passed ? "≥ 60% erreicht" : "< 60%"}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleReset}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white dark:bg-white/10 border-2 border-purple-600 dark:border-purple-500 text-purple-600 dark:text-purple-400 py-3 px-6 rounded-2xl font-bold hover:bg-purple-50 dark:hover:bg-white/20 transition-all duration-200"
              >
                <RotateCcw size={20} />
                <span>Neu starten</span>
              </button>
              <button
                onClick={() => navigate("/tests/lesen")}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-2xl font-bold hover:shadow-xl transition-all duration-200"
              >
                Zurück zur Übersicht
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Exam Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Fixed Header with Timer */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-purple-100 dark:border-purple-500/20 mb-6 sticky top-4 z-10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock
                  className={`w-5 h-5 ${
                    timeRemaining < 300
                      ? "text-red-600 dark:text-red-400"
                      : "text-purple-600 dark:text-purple-400"
                  }`}
                />
                <span
                  className={`font-bold text-lg ${
                    timeRemaining < 300
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-900 dark:text-dark-text-primary"
                  }`}
                >
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <div className="hidden sm:block h-6 w-px bg-purple-200 dark:bg-purple-500/30"></div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-dark-text-secondary">
                  Teil {currentTeil}/3
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePreviousTeil}
                disabled={currentTeil === 1}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  currentTeil === 1
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    : "bg-white dark:bg-white/10 border border-purple-200 dark:border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-white/20"
                }`}
              >
                Zurück
              </button>
              {currentTeil < 3 ? (
                <button
                  onClick={handleNextTeil}
                  className="px-4 py-2 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg transition-all duration-200"
                >
                  Nächster Teil
                </button>
              ) : (
                <button
                  onClick={handleFinishExam}
                  className="px-4 py-2 rounded-xl font-semibold text-sm bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg transition-all duration-200"
                >
                  Prüfung beenden
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Teil Content */}
        {currentTeil === 1 && (
          <Teil1Component answers={teil1Answers} setAnswers={setTeil1Answers} />
        )}
        {currentTeil === 2 && (
          <Teil2Component answers={teil2Answers} setAnswers={setTeil2Answers} />
        )}
        {currentTeil === 3 && (
          <Teil3Component answers={teil3Answers} setAnswers={setTeil3Answers} />
        )}
      </div>
    </div>
  );
}

// Teil 1: Matching Component
function Teil1Component({ answers, setAnswers }) {
  const exercise = lesenData.teil1.exercises[0];

  const handleAnswerSelect = (situationIndex, textIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [situationIndex]: textIndex,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-purple-100 dark:border-purple-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">
              Teil 1: {exercise.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
              5 Punkte • 15 Minuten
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Texts */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text-primary">
            Anzeigen
          </h3>
          {exercise.texts.map((text, index) => (
            <div
              key={text.id}
              className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-purple-100 dark:border-purple-500/20"
            >
              <div className="font-bold text-purple-600 dark:text-purple-400 mb-2">
                {String.fromCharCode(65 + index)}
              </div>
              <div className="text-gray-700 dark:text-dark-text-secondary text-sm leading-relaxed whitespace-pre-line">
                {text.content}
              </div>
            </div>
          ))}
        </div>

        {/* Situations */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text-primary">
            Personen
          </h3>
          {exercise.situations.map((situation, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-purple-100 dark:border-purple-500/20"
            >
              <div className="font-bold text-gray-900 dark:text-dark-text-primary mb-3">
                {index + 1}. {situation.person}
              </div>
              <p className="text-gray-700 dark:text-dark-text-secondary text-sm mb-4">
                {situation.situation}
              </p>
              <div className="flex gap-2">
                {exercise.texts.map((_, textIndex) => (
                  <button
                    key={textIndex}
                    onClick={() => handleAnswerSelect(index, textIndex)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all duration-200 ${
                      answers[index] === textIndex
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                        : "bg-white dark:bg-white/10 border-2 border-gray-200 dark:border-purple-500/30 text-gray-700 dark:text-dark-text-primary hover:border-purple-400 dark:hover:border-purple-400"
                    }`}
                  >
                    {String.fromCharCode(65 + textIndex)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Teil 2: True/False Component
function Teil2Component({ answers, setAnswers }) {
  const exercise = lesenData.teil2.exercises[0];

  const handleAnswerSelect = (questionIndex, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-purple-100 dark:border-purple-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Newspaper className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">
              Teil 2: {exercise.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
              5 Punkte • 15 Minuten
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100 dark:border-purple-500/20">
        <div className="prose max-w-none mb-6">
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

      <div className="space-y-4">
        {exercise.questions.map((question, index) => (
          <div
            key={index}
            className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-500/20"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white font-bold">{index + 1}</span>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary pt-1">
                {question.question}
              </p>
            </div>

            <div className="flex gap-3 ml-14">
              <button
                onClick={() => handleAnswerSelect(index, true)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                  answers[index] === true
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                    : "bg-white dark:bg-white/10 border-2 border-gray-200 dark:border-purple-500/30 text-gray-700 dark:text-dark-text-primary hover:border-green-400"
                }`}
              >
                <ThumbsUp size={18} />
                <span>Richtig</span>
              </button>
              <button
                onClick={() => handleAnswerSelect(index, false)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                  answers[index] === false
                    ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg"
                    : "bg-white dark:bg-white/10 border-2 border-gray-200 dark:border-purple-500/30 text-gray-700 dark:text-dark-text-primary hover:border-red-400"
                }`}
              >
                <ThumbsDown size={18} />
                <span>Falsch</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Teil 3: Multiple Choice Component
function Teil3Component({ answers, setAnswers }) {
  const exercise = lesenData.teil3.exercises[0];

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-purple-100 dark:border-purple-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">
              Teil 3: {exercise.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
              10 Punkte • 15 Minuten
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100 dark:border-purple-500/20">
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

      <div className="space-y-6">
        {exercise.questions.map((question, qIndex) => (
          <div
            key={qIndex}
            className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-500/20"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white font-bold">{qIndex + 1}</span>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary pt-1">
                {question.question}
              </p>
            </div>

            <div className="space-y-3 ml-14">
              {question.options.map((option, optIndex) => {
                const isSelected = answers[qIndex] === optIndex;

                return (
                  <button
                    key={optIndex}
                    onClick={() => handleAnswerSelect(qIndex, optIndex)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? "border-purple-400 dark:border-purple-500 bg-purple-50 dark:bg-purple-900/30"
                        : "border-gray-200 dark:border-purple-500/20 bg-white dark:bg-white/5 hover:border-purple-300 dark:hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? "border-purple-600 dark:border-purple-500 bg-purple-600 dark:bg-purple-500"
                            : "border-gray-300 dark:border-purple-500/40"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-gray-700 dark:text-dark-text-secondary font-medium">
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
