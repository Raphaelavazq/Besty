import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  XCircle,
  Info,
  Volume2,
  Headphones,
} from "lucide-react";
import AudioPlayerNew from "../../components/AudioPlayerNew";
import QuestionCard from "../../components/QuestionCard";

export default function ExercisePlayer() {
  const { mode, type } = useParams(); // mode: training/test, type: single/parts/mixed/full
  const navigate = useNavigate();

  const [isTrainingMode] = useState(mode === "training");
  const [testData, setTestData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [seekTime, setSeekTime] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  // Exercise configuration based on type
  const getExerciseConfig = () => {
    const configs = {
      single: {
        title: "Einzelfrage Training",
        questionCount: 1,
        timeLimit: isTrainingMode ? null : 120, // 2 min for test mode
        showFeedback: isTrainingMode,
      },
      parts: {
        title: isTrainingMode ? "Teil-Training" : "Teil-Test",
        questionCount: isTrainingMode ? 4 : 8,
        timeLimit: isTrainingMode ? null : 480, // 8 min for test mode
        showFeedback: isTrainingMode,
      },
      mixed: {
        title: "Gemischtes Training",
        questionCount: 10,
        timeLimit: isTrainingMode ? null : 900, // 15 min for test mode
        showFeedback: isTrainingMode,
      },
      full: {
        title: "Vollständiger Test",
        questionCount: 20,
        timeLimit: 1500, // 25 min always
        showFeedback: false, // Never show feedback during full test
      },
    };
    return configs[type] || configs.single;
  };

  const config = getExerciseConfig();

  // Load questions based on exercise type
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch(
          "/data/synchronized-tests-dtz-official.json"
        );
        const data = await response.json();
        const test = data.find((t) => t.id === "dtz-b1-hoeren-komplett");

        if (test) {
          let selectedQuestions = [...test.questions];

          // Filter questions based on type
          if (type === "single") {
            // Random single question
            const randomIndex = Math.floor(
              Math.random() * selectedQuestions.length
            );
            selectedQuestions = [selectedQuestions[randomIndex]];
          } else if (type === "parts") {
            // Questions from specific part (can be enhanced to select part)
            selectedQuestions = selectedQuestions.slice(
              0,
              config.questionCount
            );
          } else if (type === "mixed") {
            // Random mix of questions
            selectedQuestions = selectedQuestions
              .sort(() => Math.random() - 0.5)
              .slice(0, config.questionCount);
          }
          // For 'full', use all questions

          setTestData(test);
          setQuestions(selectedQuestions);
          if (config.timeLimit) {
            setTimeLeft(config.timeLimit);
          }
        }
      } catch (error) {
        console.error("Error loading questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, [type, config.questionCount, config.timeLimit]);

  // Timer for test mode
  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinishExercise();
    }
  }, [timeLeft, showResult]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (questionId, selectedAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedAnswer,
    }));

    if (isTrainingMode && config.showFeedback) {
      // In training mode, show immediate feedback
      setTimeout(() => {
        if (type === "single") {
          setShowResult(true);
        } else {
          handleNextQuestion();
        }
      }, 1500);
    } else {
      // In test mode, move to next question immediately
      if (type === "single") {
        setShowResult(true);
      } else {
        handleNextQuestion();
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Seek to the next question's audio timestamp
      if (currentQuestion?.timestamp !== undefined) {
        setSeekTime(currentQuestion.timestamp);
      }
    } else {
      handleFinishExercise();
    }
  };

  const handleFinishExercise = () => {
    setShowResult(true);
  };

  const calculateResults = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const percentage = Math.round((correct / questions.length) * 100);
    return { correct, total: questions.length, percentage };
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-slate-600 font-medium">Lade Übung...</span>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const results = calculateResults();
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100">
            <div className="text-center mb-8">
              <div
                className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl ${
                  results.percentage >= 70
                    ? "bg-gradient-to-br from-emerald-500 to-teal-600"
                    : "bg-gradient-to-br from-orange-500 to-red-600"
                }`}
              >
                {results.percentage >= 70 ? (
                  <CheckCircle size={32} className="text-white" />
                ) : (
                  <XCircle size={32} className="text-white" />
                )}
              </div>

              <h1 className="text-3xl font-bold text-slate-800 mb-4">
                {results.percentage >= 70 ? "Gut gemacht!" : "Weiter üben!"}
              </h1>

              <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                {results.percentage}%
              </div>

              <p className="text-slate-600 text-lg">
                {results.correct} von {results.total} Fragen richtig
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tests/hoeren"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
              >
                Zurück zur Auswahl
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="bg-white text-purple-600 border-2 border-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300"
              >
                Nochmal üben
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/tests/hoeren"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-600 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Zurück</span>
          </Link>

          <div className="flex items-center gap-4">
            {timeLeft !== null && (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-purple-600" />
                  <span className="font-medium text-slate-800">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
            )}

            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
              <span className="text-slate-600 text-sm">
                {currentQuestionIndex + 1} / {questions.length}
              </span>
            </div>
          </div>
        </div>

        {/* Exercise Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg mb-4">
            <Headphones size={18} className="text-purple-600" />
            <span className="font-medium text-slate-800">
              {config.title} {!isTrainingMode && "- Test Modus"}
            </span>
          </div>
        </div>

        {/* Audio Player */}
        {currentQuestion && (
          <div className="mb-8">
            <AudioPlayerNew
              audioFile={currentQuestion.audioFile}
              onTimeUpdate={setCurrentTime}
              seekTime={seekTime}
              onSeekComplete={() => setSeekTime(null)}
              showControls={true}
              autoPlay={false}
            />
          </div>
        )}

        {/* Question */}
        {currentQuestion && (
          <div className="mb-8">
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={answers[currentQuestion.id]}
              onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
              showFeedback={
                isTrainingMode &&
                config.showFeedback &&
                answers[currentQuestion.id] !== undefined
              }
              disabled={
                answers[currentQuestion.id] !== undefined && !isTrainingMode
              }
            />
          </div>
        )}

        {/* Training Mode Info */}
        {isTrainingMode && (
          <div className="bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-xl p-4 shadow-lg">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 mb-1">
                  Training Modus
                </h4>
                <p className="text-blue-700 text-sm">
                  Du erhältst sofortiges Feedback zu deinen Antworten. Nimm dir
                  die Zeit, die du brauchst.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
