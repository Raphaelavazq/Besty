import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle, Clock, Trophy } from "lucide-react";

export default function ExamSimulator({ mode = "probetest" }) {
  const navigate = useNavigate();
  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedBundesland, setSelectedBundesland] = useState(null);
  const [examQuestions, setExamQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    mode === "probetest" ? 60 * 60 : null
  ); // 60 minutes for exam
  const [timerActive, setTimerActive] = useState(false);

  const bundeslaender = [
    "Nordrhein-Westfalen",
    "Baden-Württemberg",
    "Bayern",
    "Berlin",
    "Brandenburg",
    "Bremen",
    "Hamburg",
    "Hessen",
    "Mecklenburg-Vorpommern",
    "Niedersachsen",
    "Rheinland-Pfalz",
    "Saarland",
    "Sachsen",
    "Sachsen-Anhalt",
    "Schleswig-Holstein",
    "Thüringen",
  ];

  // Load all questions
  useEffect(() => {
    fetch("/data/einbuergerungstest/questions.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data.questions].sort(
          (a, b) => parseInt(a.originalNum) - parseInt(b.originalNum)
        );
        setAllQuestions(sorted);
      });
  }, []);

  // Generate exam questions when Bundesland is selected
  useEffect(() => {
    if (!selectedBundesland || allQuestions.length === 0) return;

    const generalQuestions = allQuestions.filter((q) => q.type === "general");
    const stateQuestions = allQuestions.filter(
      (q) => q.type === "state" && q.bundesland === selectedBundesland
    );

    if (mode === "probetest") {
      // Official exam: 30 random general + 3 random state = 33 questions
      const shuffledGeneral = [...generalQuestions].sort(
        () => Math.random() - 0.5
      );
      const shuffledState = [...stateQuestions].sort(() => Math.random() - 0.5);

      const selected = [
        ...shuffledGeneral.slice(0, 30),
        ...shuffledState.slice(0, 3),
      ];

      setExamQuestions(selected);
      setTimerActive(true);
    } else {
      // Training mode: All 310 questions (300 general + 10 state) in order
      const training = [...generalQuestions, ...stateQuestions];
      setExamQuestions(training);
    }
  }, [selectedBundesland, allQuestions, mode]);

  // Timer countdown for probetest mode
  useEffect(() => {
    if (!timerActive || timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowResults(true);
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, timeLeft]);

  const handleAnswer = (optionIndex) => {
    setAnswers({ ...answers, [currentIndex]: optionIndex });
  };

  const handleNext = () => {
    if (currentIndex < examQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true);
      setTimerActive(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    examQuestions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correct++;
    });
    return correct;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Bundesland selection screen
  if (!selectedBundesland) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/einbuergerungstest")}
            className="mb-8 flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück zur Übersicht
          </button>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 pb-2">
              {mode === "probetest" ? "Probetest" : "Training"}
            </h1>
            <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
              {mode === "probetest"
                ? "Offizieller Test: 33 Fragen in 60 Minuten"
                : "Alle 310 Fragen zum Üben"}
            </p>
          </div>

          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100 dark:border-purple-500/30 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-dark-text-primary">
              Bundesland auswählen
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {bundeslaender.map((land) => (
                <button
                  key={land}
                  onClick={() => setSelectedBundesland(land)}
                  className="text-left p-4 rounded-xl border-2 border-purple-100 dark:border-purple-500/30 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="font-semibold text-gray-900 dark:text-dark-text-primary">
                    {land}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (examQuestions.length === 0) return <div className="p-8">Lädt...</div>;

  if (showResults) {
    const score = calculateScore();
    const totalAnswered = Object.keys(answers).length;
    const passed = mode === "probetest" ? score >= 17 : null; // Need 17/33 to pass official exam

    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-purple-100 dark:border-purple-500/30 text-center">
            <div className="text-6xl mb-6">
              {mode === "probetest" ? (passed ? "🎉" : "�") : "✅"}
            </div>

            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 pb-2">
              {mode === "probetest"
                ? passed
                  ? "Bestanden!"
                  : "Nicht bestanden"
                : "Training beendet"}
            </h1>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="text-7xl font-black text-purple-600 dark:text-purple-400">
                {score}
              </div>
              <div className="text-3xl text-gray-400">/</div>
              <div className="text-4xl font-bold text-gray-600 dark:text-dark-text-secondary">
                {examQuestions.length}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border-2 border-emerald-200 dark:border-emerald-500/30">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {score}
                </div>
                <div className="text-sm text-emerald-700 dark:text-emerald-300">
                  Richtig
                </div>
              </div>

              <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-4 border-2 border-rose-200 dark:border-rose-500/30">
                <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                  {totalAnswered - score}
                </div>
                <div className="text-sm text-rose-700 dark:text-rose-300">
                  Falsch
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border-2 border-purple-200 dark:border-purple-500/30">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {Math.round((score / examQuestions.length) * 100)}%
                </div>
                <div className="text-sm text-purple-700 dark:text-purple-300">
                  Erfolgsquote
                </div>
              </div>
            </div>

            {mode === "probetest" && (
              <div className="mb-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-500/30">
                <p className="text-gray-700 dark:text-dark-text-secondary">
                  {passed
                    ? "Herzlichen Glückwunsch! Du hast die erforderlichen 17 von 33 Fragen richtig beantwortet."
                    : `Du brauchst mindestens 17 richtige Antworten. Weiter üben!`}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSelectedBundesland(null);
                  setExamQuestions([]);
                  setCurrentIndex(0);
                  setAnswers({});
                  setShowResults(false);
                  setTimeLeft(mode === "probetest" ? 60 * 60 : null);
                  setTimerActive(false);
                }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                Nochmal versuchen
              </button>

              <button
                onClick={() => navigate("/einbuergerungstest")}
                className="px-8 py-4 bg-white dark:bg-white/10 text-purple-600 dark:text-purple-400 border-2 border-purple-600 rounded-xl font-bold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
              >
                Zurück zur Übersicht
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = examQuestions[currentIndex];
  const selectedAnswer = answers[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/einbuergerungstest")}
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück
          </button>

          {mode === "probetest" && timeLeft !== null && (
            <div className="flex items-center gap-2 bg-white/80 dark:bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-purple-100 dark:border-purple-500/30">
              <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span
                className={`font-mono font-bold ${
                  timeLeft < 300
                    ? "text-rose-600 dark:text-rose-400"
                    : "text-purple-600 dark:text-purple-400"
                }`}
              >
                {formatTime(timeLeft)}
              </span>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-700 dark:text-dark-text-secondary">
              Frage {currentIndex + 1} / {examQuestions.length}
            </span>
            <span className="text-purple-600 dark:text-purple-400 font-semibold">
              {Object.keys(answers).length} beantwortet
            </span>
          </div>
          <div className="h-2 bg-white/50 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / examQuestions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-purple-100 dark:border-purple-500/30">
          {/* Question number badge */}
          <div className="flex gap-3 mb-6">
            <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black text-xl shrink-0">
              {currentQ.id}
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xs px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-semibold w-fit">
                {currentQ.category}
              </span>
              {currentQ.bundesland && (
                <span className="text-xs px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full font-semibold w-fit mt-1">
                  {currentQ.bundesland}
                </span>
              )}
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-900 dark:text-dark-text-primary">
            {currentQ.question}
          </h2>

          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedAnswer === index
                    ? "border-purple-600 bg-purple-50 dark:bg-purple-900/20 shadow-md"
                    : "border-purple-100 dark:border-purple-500/30 hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/10"
                }`}
              >
                <span className="font-bold text-purple-600 dark:text-purple-400 mr-2">
                  {String.fromCharCode(65 + index)})
                </span>
                <span className="text-gray-900 dark:text-dark-text-primary">
                  {option}
                </span>
              </button>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="px-6 py-3 bg-white dark:bg-white/10 text-purple-600 dark:text-purple-400 border-2 border-purple-600 rounded-xl font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
            >
              Zurück
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswer === undefined}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              {currentIndex < examQuestions.length - 1
                ? "Weiter →"
                : "Abschließen"}
            </button>
          </div>
        </div>

        {/* Quick navigation (Training mode only) */}
        {mode === "practice" && examQuestions.length > 0 && (
          <div className="mt-6 bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-purple-100 dark:border-purple-500/30">
            <div className="text-sm font-semibold text-gray-700 dark:text-dark-text-secondary mb-2">
              Schnellnavigation
            </div>
            <div className="flex flex-wrap gap-2">
              {examQuestions.slice(0, 20).map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                    idx === currentIndex
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white scale-110"
                      : answers[idx] !== undefined
                        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-2 border-emerald-400"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-purple-100 dark:hover:bg-purple-900/20"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              {examQuestions.length > 20 && (
                <span className="w-10 h-10 flex items-center justify-center text-gray-400">
                  ...
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
