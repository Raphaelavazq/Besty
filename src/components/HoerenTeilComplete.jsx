import { useState, useEffect } from "react";
import AudioPlayerNew from "./AudioPlayerNew";
import QuestionCard from "./QuestionCard";

export default function HoerenTeilComplete() {
  const [testData, setTestData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentTime, setCurrentTime] = useState(0);
  const [seekTime, setSeekTime] = useState(null);
  const [autoPlayOnSeek, setAutoPlayOnSeek] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/data/synchronized-tests.json")
      .then((res) => res.json())
      .then((data) => {
        const test = data.find((t) => t.id === "dtz-b1-hoeren-komplett");
        if (test) {
          setTestData(test);
          setQuestions(test.questions);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading questions:", err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    // Find all questions that could be active at current time
    const possibleQuestions = questions.filter(
      (q) =>
        currentTime >= q.timestamp && currentTime < q.timestamp + q.duration
    );

    // If multiple questions overlap, choose the one with the latest timestamp
    const activeQuestion =
      possibleQuestions.length > 0
        ? possibleQuestions.reduce((latest, current) =>
            current.timestamp > latest.timestamp ? current : latest
          )
        : null;

    if (activeQuestion && currentQuestion?.id !== activeQuestion.id) {
      // For Teil 3, find both questions that share the same timestamp
      if (activeQuestion.id.startsWith("teil3")) {
        const pairedQuestion = questions.find(
          (q) =>
            q.timestamp === activeQuestion.timestamp &&
            q.id !== activeQuestion.id
        );

        if (pairedQuestion) {
          setCurrentQuestion({
            ...activeQuestion,
            pairedQuestion: pairedQuestion,
          });
        } else {
          setCurrentQuestion(activeQuestion);
        }
      } else {
        setCurrentQuestion(activeQuestion);
      }
    } else if (
      !activeQuestion &&
      currentQuestion &&
      currentTime >= currentQuestion.timestamp + currentQuestion.duration
    ) {
      setCurrentQuestion(null);
    }
  }, [currentTime, questions, currentQuestion]);

  const goToNextQuestion = () => {
    const currentIndex = questions.findIndex(
      (q) => q.id === currentQuestion?.id
    );
    console.log(
      "goToNextQuestion: currentIndex =",
      currentIndex,
      "currentQuestion =",
      currentQuestion?.id
    );

    if (currentIndex >= 0 && currentIndex < questions.length - 1) {
      let nextIndex = currentIndex + 1;

      // For Teil 3 paired questions, if we're on a richtig-falsch question,
      // skip to the next pair instead of the paired multiple-choice question
      if (
        currentQuestion?.id.startsWith("teil3") &&
        currentQuestion?.type === "richtig-falsch"
      ) {
        // Find the next pair (skip the multiple-choice partner)
        nextIndex = currentIndex + 2;
        if (nextIndex >= questions.length) {
          nextIndex = questions.length - 1;
        }
      }

      const nextQuestion = questions[nextIndex];
      console.log(
        "goToNextQuestion: jumping to index",
        nextIndex,
        "question",
        nextQuestion?.id,
        "timestamp",
        nextQuestion?.timestamp
      );
      if (nextQuestion) jumpToTime(nextQuestion.timestamp);
    } else {
      console.log("goToNextQuestion: no next question available");
    }
  };

  const jumpToTime = (time) => {
    console.log("Jumping to time:", time);

    // Prevent multiple rapid calls
    if (seekTime !== null) {
      console.log("Ignoring jump request, already seeking");
      return;
    }

    setAutoPlayOnSeek(true); // Enable auto-play when jumping via timestamp
    setSeekTime(time);
    setCurrentTime(time);

    // Immediately check for and display the question at this timestamp
    const questionAtTime = questions.find(
      (q) => time >= q.timestamp && time < q.timestamp + q.duration
    );

    console.log("Question found at time", time, ":", questionAtTime);

    if (questionAtTime) {
      const questionIndex = questions.findIndex(
        (q) => q.id === questionAtTime.id
      );
      console.log(
        "Question index:",
        questionIndex + 1,
        "Question ID:",
        questionAtTime.id
      );
      console.log("Question text:", questionAtTime.questionText);

      // For Teil 3, find both questions that share the same timestamp
      if (questionAtTime.id.startsWith("teil3")) {
        const pairedQuestion = questions.find(
          (q) =>
            q.timestamp === questionAtTime.timestamp &&
            q.id !== questionAtTime.id
        );

        if (pairedQuestion) {
          console.log("Paired question found:", pairedQuestion.id);
          setCurrentQuestion({
            ...questionAtTime,
            pairedQuestion: pairedQuestion,
          });
        } else {
          console.log("No paired question found, setting single question");
          setCurrentQuestion(questionAtTime);
        }
      } else {
        console.log("Setting single question (not Teil 3)");
        setCurrentQuestion(questionAtTime);
      }
    } else {
      console.log("No question found at timestamp:", time);
    }

    // Clear seekTime and reset auto-play flag after allowing the audio player to process it
    setTimeout(() => {
      setSeekTime(null);
      setAutoPlayOnSeek(false);
    }, 300);
  };

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl mb-6 animate-pulse">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M8.464 15.536a5 5 0 01-7.072 0M2.636 5.636a9 9 0 000 12.728"
              />
            </svg>
          </div>
          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-purple-500/30 p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-3 border-slate-200 dark:border-slate-700 border-t-blue-600 dark:border-t-blue-400 mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-dark-text-secondary font-medium">
              Lade Hörprüfung...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary p-3">
      <div className="max-w-7xl mx-auto">
        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 h-screen">
          {/* Left Side - Audio Player (1/3 width) */}
          <div className="lg:col-span-1">
            <AudioPlayerNew
              audioFile={
                testData?.audioFile || "/audio/hoeren/telcDB1_Track01.mp3"
              }
              title={testData?.name || "DTZ B1 Hörprüfung"}
              onTimeUpdate={handleTimeUpdate}
              seekTime={seekTime}
              autoPlayOnSeek={autoPlayOnSeek}
              questions={questions}
              currentQuestion={currentQuestion}
              answers={answers}
              onQuestionJump={jumpToTime}
              totalDuration={testData?.duration || 1500}
            />
          </div>

          {/* Right Side - Question Cards (2/3 width) */}
          <div className="lg:col-span-2">
            {currentQuestion ? (
              <div className="bg-white/95 dark:bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 dark:border-purple-500/30 p-6 h-full overflow-y-auto">
                {/* Streamlined Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-full px-6 py-3 border border-purple-200/50">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <h2 className="text-lg font-bold text-slate-800">
                      {currentQuestion.pairedQuestion
                        ? `Fragen ${questions.findIndex((q) => q.id === currentQuestion.id) + 1} & ${questions.findIndex((q) => q.id === currentQuestion.pairedQuestion.id) + 1}`
                        : `Frage ${questions.findIndex((q) => q.id === currentQuestion.id) + 1}`}
                    </h2>
                    <span className="text-xs text-purple-700 bg-purple-100 px-2 py-1 rounded-full font-medium">
                      📝 Hören Sie zu und wählen Sie
                    </span>
                  </div>
                </div>

                {/* Question Content */}
                {currentQuestion.pairedQuestion ? (
                  <div className="space-y-6">
                    {/* Paired Questions Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                      <QuestionCard
                        question={currentQuestion}
                        questionNumber={
                          questions.findIndex(
                            (q) => q.id === currentQuestion.id
                          ) + 1
                        }
                        answers={answers}
                        onAnswer={handleAnswer}
                        variant="primary"
                        compact={true}
                      />
                      <QuestionCard
                        question={currentQuestion.pairedQuestion}
                        questionNumber={
                          questions.findIndex(
                            (q) => q.id === currentQuestion.pairedQuestion.id
                          ) + 1
                        }
                        answers={answers}
                        onAnswer={handleAnswer}
                        variant="secondary"
                        compact={true}
                      />
                    </div>

                    {/* Navigation */}
                    <div className="text-center pt-4">
                      <button
                        onClick={goToNextQuestion}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <span>Nächste Frage</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Single Question */
                  <div className="space-y-6">
                    <div className="max-w-3xl mx-auto">
                      <QuestionCard
                        question={currentQuestion}
                        questionNumber={
                          questions.findIndex(
                            (q) => q.id === currentQuestion.id
                          ) + 1
                        }
                        answers={answers}
                        onAnswer={handleAnswer}
                        variant="primary"
                        compact={false}
                      />
                    </div>

                    {/* Navigation */}
                    <div className="text-center pt-4">
                      <button
                        onClick={goToNextQuestion}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <span>Nächste Frage</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* No Current Question */
              <div className="bg-white/95 dark:bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 dark:border-purple-500/30 p-8 text-center h-full flex items-center justify-center">
                <div className="text-slate-500 dark:text-dark-text-muted max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 dark:from-purple-900/30 to-indigo-100 dark:to-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <svg
                      className="w-10 h-10 text-purple-600 dark:text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-dark-text-primary">
                    Warten auf nächste Frage...
                  </h3>
                  <p className="text-slate-600 dark:text-dark-text-secondary mb-4 leading-relaxed">
                    Die Fragen erscheinen automatisch zur richtigen Zeit während
                    der Audiowiedergabe.
                  </p>
                  <div className="flex justify-center">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
