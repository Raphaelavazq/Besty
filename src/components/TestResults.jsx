import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Target,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import { SuccessAnimation, PulseAnimation } from "./LottieAnimations";

export default function TestResults({
  answers,
  questions,
  timeSpent,
  totalTime,
  testType = "hoeren",
  onRetry,
  onNextAction,
}) {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    calculateResults();
  }, [answers, questions]);

  const calculateResults = () => {
    if (!questions || questions.length === 0) return;

    let correctCount = 0;
    const detailedFeedback = [];

    questions.forEach((question, index) => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;

      if (isCorrect) {
        correctCount++;
      }

      detailedFeedback.push({
        questionId: question.id,
        questionText: question.questionText || question.prompt,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation || question.rationale,
        part: question.part || "unknown",
      });
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    setScore(percentage);
    setFeedback(detailedFeedback);

    // Calculate level based on DTZ standards
    const calculatedLevel = calculateLevel(percentage);
    setLevel(calculatedLevel);

    // Generate recommendations
    const recs = generateRecommendations(detailedFeedback, percentage);
    setRecommendations(recs);
  };

  const calculateLevel = (percentage) => {
    // DTZ B1 scoring standards
    if (percentage >= 65) return "B1";
    if (percentage >= 50) return "A2+";
    if (percentage >= 35) return "A2";
    return "unter A2";
  };

  const generateRecommendations = (feedback, percentage) => {
    const recs = [];

    // Analyze by parts
    const partPerformance = {};
    feedback.forEach((item) => {
      if (!partPerformance[item.part]) {
        partPerformance[item.part] = { correct: 0, total: 0 };
      }
      partPerformance[item.part].total++;
      if (item.isCorrect) {
        partPerformance[item.part].correct++;
      }
    });

    // Generate part-specific recommendations
    Object.entries(partPerformance).forEach(([part, stats]) => {
      const partPercentage = Math.round((stats.correct / stats.total) * 100);

      if (partPercentage < 60) {
        switch (part) {
          case "teil1":
            recs.push({
              type: "improvement",
              title: "Teil 1: Ansagen verstehen",
              description:
                "Übe mehr mit kurzen Ansagen und Durchsagen. Konzentriere dich auf Schlüsselwörter.",
              action: "Teil 1 Training",
              link: "/synchronized-test/dtz-local-teil1",
            });
            break;
          case "teil2":
            recs.push({
              type: "improvement",
              title: "Teil 2: Radio-Ansagen",
              description:
                "Höre mehr Radio-Nachrichten und achte auf Details wie Zeit, Ort und Zahlen.",
              action: "Teil 2 Training",
              link: "/synchronized-test/dtz-local-teil2",
            });
            break;
          case "teil3":
            recs.push({
              type: "improvement",
              title: "Teil 3: Alltagsgespräche",
              description:
                "Übe das Verstehen von Dialogen. Achte auf Sprecher, Meinungen und Entscheidungen.",
              action: "Teil 3 Training",
              link: "/synchronized-test/dtz-local-teil3",
            });
            break;
          case "teil4":
            recs.push({
              type: "improvement",
              title: "Teil 4: Radiobeiträge",
              description:
                "Längere Texte erfordern Konzentration. Übe mit Nachrichten und Berichten.",
              action: "Teil 4 Training",
              link: "/synchronized-test/dtz-local-teil4",
            });
            break;
        }
      }
    });

    // Overall recommendations based on score
    if (percentage >= 80) {
      recs.push({
        type: "success",
        title: "Sehr gut!",
        description: "Du bist bereit für die DTZ B1 Prüfung. Mache weiter so!",
        action: "Volltest wiederholen",
        link: "/synchronized-test/dtz-local-fulltest",
      });
    } else if (percentage >= 65) {
      recs.push({
        type: "success",
        title: "Gut gemacht!",
        description:
          "Du hast B1-Niveau erreicht. Übe weiter für mehr Sicherheit.",
        action: "Schwierige Teile üben",
        link: "/dtz-teil-training",
      });
    } else if (percentage >= 50) {
      recs.push({
        type: "warning",
        title: "Fast geschafft!",
        description:
          "Du bist auf A2+ Niveau. Konzentriere dich auf deine schwächeren Bereiche.",
        action: "Gezieltes Training",
        link: "/dtz-teil-training",
      });
    } else {
      recs.push({
        type: "improvement",
        title: "Weiter üben!",
        description:
          "Du brauchst noch mehr Übung. Fange mit den Grundlagen an.",
        action: "Basics trainieren",
        link: "/synchronized-test/dtz-local-drills",
      });
    }

    return recs;
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "B1":
        return "text-green-600 bg-green-100";
      case "A2+":
        return "text-blue-600 bg-blue-100";
      case "A2":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-red-600 bg-red-100";
    }
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 65) return "text-blue-600";
    if (percentage >= 50) return "text-orange-600";
    return "text-red-600";
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Keine Fragen zum Auswerten vorhanden.</p>
      </div>
    );
  }

  const correctCount = feedback.filter((f) => f.isCorrect).length;
  const incorrectCount = feedback.length - correctCount;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Test Ergebnisse
        </h1>
        <p className="text-gray-600">DTZ B1 Hörprüfung</p>
      </div>

      {/* Score Overview */}
      <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 dark:border-purple-500/30">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Main Score */}
          <div className="md:col-span-2 text-center">
            {score >= 65 ? (
              <PulseAnimation
                color="green"
                intensity="low"
                className="inline-block"
              >
                <SuccessAnimation size="lg" message="" className="mb-4" />
              </PulseAnimation>
            ) : null}

            <div
              className={`text-6xl font-bold ${getScoreColor(score)} mb-2 animate-fade-in-scale`}
            >
              {score}%
            </div>
            <div
              className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getLevelColor(level)} animate-fade-in-up`}
            >
              Niveau: {level}
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle
                size={20}
                className="text-green-600 dark:text-green-400"
              />
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {correctCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-dark-text-secondary">
                  Richtig
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <XCircle size={20} className="text-red-600 dark:text-red-400" />
              <div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {incorrectCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-dark-text-secondary">
                  Falsch
                </div>
              </div>
            </div>
          </div>

          {/* Time */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-blue-600 dark:text-blue-400" />
              <div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {Math.round(timeSpent / 60)}min
                </div>
                <div className="text-sm text-gray-600 dark:text-dark-text-secondary">
                  Benötigt
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Target
                size={20}
                className="text-purple-600 dark:text-purple-400"
              />
              <div>
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {Math.round(totalTime / 60)}min
                </div>
                <div className="text-sm text-gray-600 dark:text-dark-text-secondary">
                  Vorgegeben
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 dark:border-purple-500/30">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-text-primary mb-4 flex items-center gap-2">
            <TrendingUp size={20} />
            Empfehlungen
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-l-4 ${
                  rec.type === "success"
                    ? "border-green-500 bg-green-50"
                    : rec.type === "warning"
                      ? "border-orange-500 bg-orange-50"
                      : "border-blue-500 bg-blue-50"
                }`}
              >
                <h4 className="font-semibold text-gray-800 mb-2">
                  {rec.title}
                </h4>
                <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                {rec.link && (
                  <a
                    href={rec.link}
                    className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    <BookOpen size={14} />
                    {rec.action}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium"
        >
          Test wiederholen
        </button>
        <button
          onClick={onNextAction}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
        >
          Nächster Test
        </button>
      </div>

      {/* Detailed Question Review */}
      <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 dark:border-purple-500/30">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-text-primary mb-4">
          Detaillierte Auswertung
        </h3>
        <div className="space-y-4">
          {feedback.map((item, index) => (
            <div
              key={item.questionId}
              className={`p-4 rounded-xl border ${
                item.isCorrect
                  ? "border-green-200 dark:border-green-500/30 bg-green-50 dark:bg-green-900/20"
                  : "border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-900/20"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.isCorrect
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {item.isCorrect ? (
                    <CheckCircle size={16} />
                  ) : (
                    <XCircle size={16} />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Frage {index + 1}: {item.questionText}
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>
                      <span className="font-medium">Deine Antwort:</span>{" "}
                      {typeof item.userAnswer === "number"
                        ? questions[index]?.options?.[item.userAnswer] ||
                          "Nicht beantwortet"
                        : item.userAnswer || "Nicht beantwortet"}
                    </div>
                    {!item.isCorrect && (
                      <div>
                        <span className="font-medium">Richtige Antwort:</span>{" "}
                        {typeof item.correctAnswer === "number"
                          ? questions[index]?.options?.[item.correctAnswer]
                          : item.correctAnswer}
                      </div>
                    )}
                    {item.explanation && (
                      <div className="mt-2 p-2 bg-white/50 dark:bg-white/10 rounded-lg dark:text-dark-text-secondary">
                        <span className="font-medium">Erklärung:</span>{" "}
                        {item.explanation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
