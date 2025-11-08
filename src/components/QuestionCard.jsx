import { useState } from "react";
import { CheckCircle, XCircle, Clock, Volume2 } from "lucide-react";

const QuestionCard = ({
  question,
  onAnswerSelect,
  selectedAnswer,
  showFeedback = false,
  correctAnswer,
  compact = false,
  mode = "training",
  disabled = false,
  className = "",
}) => {
  const [localSelectedAnswer, setLocalSelectedAnswer] =
    useState(selectedAnswer);

  const handleAnswerClick = (answer) => {
    if (disabled) return;

    setLocalSelectedAnswer(answer);
    if (onAnswerSelect) {
      onAnswerSelect(answer);
    }
  };

  const isCorrect = showFeedback && localSelectedAnswer === correctAnswer;
  const isIncorrect =
    showFeedback &&
    localSelectedAnswer &&
    localSelectedAnswer !== correctAnswer;

  return (
    <div
      className={`backdrop-blur-sm rounded-xl shadow-sm border p-4 transition-all duration-200 hover:shadow-md ${
        isCorrect
          ? "border-green-200 dark:border-green-500/30 bg-green-50/50 dark:bg-green-900/20"
          : isIncorrect
            ? "border-red-200 dark:border-red-500/30 bg-red-50/50 dark:bg-red-900/20"
            : "border-purple-100 dark:border-purple-500/30 bg-white/80 dark:bg-white/10"
      } ${compact ? "space-y-3" : "space-y-4"} ${className}`}
    >
      {/* Question Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {question.type === "audio" && (
              <Volume2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            )}
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              {question.type === "audio" ? "Hören" : "Lesen"}
            </span>
            {question.timestamp && (
              <span className="text-xs text-gray-500 dark:text-dark-text-muted flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {Math.floor(question.timestamp / 60)}:
                {(question.timestamp % 60).toString().padStart(2, "0")}
              </span>
            )}
          </div>
          <h3
            className={`font-medium text-gray-900 dark:text-dark-text-primary ${compact ? "text-base" : "text-lg"}`}
          >
            {question.question}
          </h3>
          {question.context && (
            <p className="text-sm text-gray-600 mt-2">{question.context}</p>
          )}
        </div>

        {/* Feedback Icon */}
        {showFeedback && localSelectedAnswer && (
          <div className="flex-shrink-0">
            {isCorrect ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600" />
            )}
          </div>
        )}
      </div>

      {/* Answer Options */}
      <div className={`space-y-2 ${compact ? "space-y-2" : "space-y-3"}`}>
        {question.options.map((option, index) => {
          const isSelected = localSelectedAnswer === option;
          const isThisCorrect = showFeedback && option === correctAnswer;

          let optionStyles =
            "flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer ";

          if (disabled) {
            optionStyles += "cursor-not-allowed opacity-50";
          } else if (isSelected) {
            if (showFeedback) {
              optionStyles += isThisCorrect
                ? "border-green-400 bg-green-100 text-green-800"
                : "border-red-400 bg-red-100 text-red-800";
            } else {
              optionStyles += "border-purple-400 bg-purple-100 text-purple-800";
            }
          } else if (showFeedback && isThisCorrect && !isSelected) {
            optionStyles +=
              "border-green-300 dark:border-green-500/30 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400";
          } else {
            optionStyles +=
              "border-gray-200 dark:border-purple-500/30 hover:border-purple-200 dark:hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-white/10";
          }

          let radioStyles =
            "w-5 h-5 rounded-full border-2 flex items-center justify-center ";

          if (isSelected) {
            if (showFeedback) {
              radioStyles += isThisCorrect
                ? "border-green-600 dark:border-green-500 bg-green-600 dark:bg-green-500"
                : "border-red-600 dark:border-red-500 bg-red-600 dark:bg-red-500";
            } else {
              radioStyles +=
                "border-purple-600 dark:border-purple-500 bg-purple-600 dark:bg-purple-500";
            }
          } else {
            radioStyles += "border-gray-300 dark:border-gray-600";
          }

          return (
            <div
              key={index}
              className={optionStyles}
              onClick={() => handleAnswerClick(option)}
            >
              <div className="flex-shrink-0">
                <div className={radioStyles}>
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
              <span className="flex-1 text-sm">{option}</span>
            </div>
          );
        })}
      </div>

      {/* Feedback Section */}
      {showFeedback && mode === "training" && (
        <div
          className={`mt-4 p-3 rounded-lg ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
        >
          <div className="flex items-start gap-2">
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p
                className={`text-sm font-medium ${isCorrect ? "text-green-800" : "text-red-800"}`}
              >
                {isCorrect ? "Richtig!" : "Nicht richtig"}
              </p>
              {!isCorrect && (
                <p className="text-sm text-red-700 mt-1">
                  Die richtige Antwort ist: <strong>{correctAnswer}</strong>
                </p>
              )}
              {question.explanation && (
                <p className="text-sm text-gray-700 mt-2">
                  {question.explanation}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
