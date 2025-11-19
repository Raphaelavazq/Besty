import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";

// QuestionCard Component
function QuestionCard({ question: q }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
    setShowCorrect(true);
  };

  return (
    <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-500/30">
      <div className="flex items-start gap-4">
        {/* Question Number - Large and prominent */}
        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-black text-lg">
            {q.originalNum || q.id}
          </span>
        </div>

        <div className="flex-1">
          {/* Small badges for metadata */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {/* Category badge - small */}
            <span className="text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 px-2 py-0.5 rounded">
              {q.category}
            </span>
            {/* Bundesland badge for state questions */}
            {q.type !== "general" && (
              <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 px-2 py-0.5 rounded">
                📍 {q.bundesland}
              </span>
            )}
          </div>

          {/* Question text */}
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-dark-text-primary">
            {q.question}
          </h3>

          {/* Answer options */}
          <div className="space-y-2">
            {q.options.map((option, index) => {
              const isCorrect = index === q.correctAnswer;
              const isSelected = selectedAnswer === index;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={showCorrect}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                    showCorrect
                      ? isCorrect
                        ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                        : isSelected
                          ? "border-rose-400 bg-rose-50 dark:bg-rose-900/20"
                          : "border-gray-200 dark:border-purple-500/30 opacity-50"
                      : "border-purple-200 dark:border-purple-500/30 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer"
                  }`}
                >
                  <span className="font-bold text-gray-900 dark:text-white">
                    {String.fromCharCode(65 + index)})
                  </span>{" "}
                  <span className="text-gray-900 dark:text-white">
                    {option}
                  </span>
                  {showCorrect && isCorrect && (
                    <span className="ml-2 text-emerald-600 dark:text-emerald-400 font-bold">
                      ✓ Richtig
                    </span>
                  )}
                  {showCorrect && isSelected && !isCorrect && (
                    <span className="ml-2 text-rose-600 dark:text-rose-400 font-bold">
                      ✗ Falsch
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Reset button */}
          {showCorrect && (
            <button
              onClick={() => {
                setSelectedAnswer(null);
                setShowCorrect(false);
              }}
              className="mt-4 px-4 py-2 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800/30 transition-colors"
            >
              🔄 Noch einmal versuchen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Fragenkatalog() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedBundesland, setSelectedBundesland] = useState(null); // null = not selected yet
  const [showSelection, setShowSelection] = useState(true); // Show selection screen first

  useEffect(() => {
    fetch("/data/einbuergerungstest/questions.json")
      .then((res) => res.json())
      .then((data) => {
        // Sort questions by original BAMF number (1, 2, 3... 300, then BW-1, BW-2, etc.)
        const sorted = [...data.questions].sort((a, b) => {
          const aNum = a.originalNum || a.id.toString();
          const bNum = b.originalNum || b.id.toString();

          // Check if they're numbers or state codes
          const aIsState = aNum.includes("-");
          const bIsState = bNum.includes("-");

          // General questions (1-300) come first
          if (!aIsState && bIsState) return -1;
          if (aIsState && !bIsState) return 1;

          // Both general: sort numerically
          if (!aIsState && !bIsState) {
            return parseInt(aNum) - parseInt(bNum);
          }

          // Both state: sort by state code alphabetically, then by number
          const [aState, aStateNum] = aNum.split("-");
          const [bState, bStateNum] = bNum.split("-");
          if (aState !== bState) return aState.localeCompare(bState);
          return parseInt(aStateNum) - parseInt(bStateNum);
        });

        setQuestions(sorted);
        setMetadata(data.metadata);
        setFilteredQuestions(sorted);
      });
  }, []);

  useEffect(() => {
    if (!selectedBundesland) {
      setFilteredQuestions([]);
      return;
    }

    let filtered = questions;

    // Filter by Bundesland selection - EXACTLY like BAMF
    // Show 300 general questions + 10 state-specific questions
    filtered = filtered.filter((q) => {
      if (q.type === "general") return true; // Always show general questions
      if (q.type === "state" && q.bundesland === selectedBundesland)
        return true; // Show selected state questions
      return false;
    });

    // Filter by search term (search by number or text)
    if (searchTerm) {
      filtered = filtered.filter(
        (q) =>
          q.id.toString() === searchTerm || // Exact number match
          q.originalNum.includes(searchTerm) ||
          q.question.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredQuestions(filtered);
  }, [searchTerm, questions, selectedBundesland]);

  // State Selection Screen (shown first, like BAMF official site)
  if (!selectedBundesland) {
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

    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate("/einbuergerungstest")}
            className="mb-6 flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück
          </button>

          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 pb-2">
            Fragenkatalog
          </h1>
          <p className="text-gray-600 dark:text-dark-text-secondary mb-2">
            Wählen Sie Ihr Bundesland, um die 310 Fragen (300 allgemein + 10
            länderspezifisch) zu sehen
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Offizielle BAMF-Fragen (Stand: 07.05.2025)
          </p>

          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-purple-100 dark:border-purple-500/30">
            <div className="grid gap-3">
              {bundeslaender.map((state) => (
                <button
                  key={state}
                  onClick={() => setSelectedBundesland(state)}
                  className="w-full p-4 text-left bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 hover:from-purple-100 hover:to-indigo-100 dark:hover:from-purple-800/30 dark:hover:to-indigo-800/30 rounded-xl border-2 border-purple-200 dark:border-purple-500/30 hover:border-purple-400 dark:hover:border-purple-400 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {state}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Questions Display (after state is selected)
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with state selection */}
        <button
          onClick={() => setSelectedBundesland(null)}
          className="mb-6 flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Bundesland ändern
        </button>

        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2 pb-2">
          Fragenkatalog
        </h1>
        <p className="text-gray-600 dark:text-dark-text-secondary mb-8">
          310 Fragen für {selectedBundesland}
        </p>

        {/* Search by question number */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Frage-Nummer eingeben (z.B. 25) oder Stichwort suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl border border-purple-100 dark:border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-dark-text-primary"
            />
          </div>
          {searchTerm && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {filteredQuestions.length} Ergebnisse für "{searchTerm}"
            </p>
          )}
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-dark-text-secondary">
            Keine Fragen gefunden
          </div>
        )}
      </div>
    </div>
  );
}
