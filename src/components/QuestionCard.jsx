import React from "react";

const QuestionCard = ({
  question,
  questionNumber,
  answers,
  onAnswer,
  variant = "default",
  compact = false,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          card: "bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200",
          badge: "bg-purple-100 text-purple-800",
          questionBg: "bg-white/80",
        };
      case "secondary":
        return {
          card: "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200",
          badge: "bg-blue-100 text-blue-800",
          questionBg: "bg-white/80",
        };
      default:
        return {
          card: "bg-white/90 border-slate-200",
          badge: "bg-slate-100 text-slate-800",
          questionBg: "bg-slate-50/80",
        };
    }
  };

  const styles = getVariantStyles();
  const isRichtigFalsch = question.type === "richtig-falsch";

  return (
    <div
      className={`${styles.card} backdrop-blur-sm rounded-xl shadow-sm border p-4 transition-all duration-200 hover:shadow-md ${compact ? "space-y-3" : "space-y-4"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3
          className={`font-semibold text-slate-700 ${compact ? "text-sm" : "text-base"}`}
        >
          Frage {questionNumber}
        </h3>
        <span
          className={`hidden sm:inline-block text-xs px-2 py-1 rounded font-medium ${styles.badge}`}
        >
          {isRichtigFalsch ? "R/F" : "MC"}
        </span>
      </div>

      {/* Question Text */}
      <div
        className={`${styles.questionBg} rounded-lg p-3 border border-white/50`}
      >
        <p
          className={`text-slate-800 font-medium leading-relaxed ${compact ? "text-sm" : "text-base"}`}
        >
          {question.questionText}
        </p>
      </div>

      {/* Answer Options */}
      <div
        className={`space-y-2 ${isRichtigFalsch && !compact ? "flex gap-3 justify-center space-y-0" : ""}`}
      >
        {isRichtigFalsch ? (
          <div className={compact ? "flex gap-2" : "flex gap-4 justify-center"}>
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswer(question.id, index)}
                className={`${compact ? "flex-1 py-2 px-3 text-sm" : "px-6 py-3 text-base"} font-semibold rounded-lg border-2 transition-all duration-200 ${
                  answers[question.id] === index
                    ? index === 0
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm"
                      : "border-red-500 bg-red-50 text-red-800 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(question.id, index)}
              className={`w-full ${compact ? "p-2 text-sm" : "p-3 text-base"} text-left rounded-lg border-2 transition-all duration-200 ${
                answers[question.id] === index
                  ? "border-purple-500 bg-purple-50 text-purple-800 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700"
              }`}
            >
              <span
                className={`inline-flex items-center justify-center ${compact ? "w-4 h-4 text-xs mr-2" : "w-5 h-5 text-sm mr-3"} bg-slate-100 rounded-full font-bold`}
              >
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          ))
        )}
      </div>

      {/* Answer Confirmation */}
      {answers[question.id] !== undefined && (
        <div
          className={`${compact ? "p-2" : "p-3"} bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg flex items-center gap-2`}
        >
          <svg
            className={`${compact ? "w-3 h-3" : "w-4 h-4"} text-emerald-600`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span
            className={`text-emerald-800 font-medium ${compact ? "text-xs" : "text-sm"}`}
          >
            Antwort gespeichert
          </span>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
