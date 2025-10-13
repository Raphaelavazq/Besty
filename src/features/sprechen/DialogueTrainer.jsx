/**
 * DialogueTrainer
 * Interactive branching dialogue trainer for Sprechen Teil 3.
 * User builds a conversation by selecting Redemittel cards in response to examiner prompts.
 * Study-only mode (no recording).
 * Design: glass-morphism, purple gradients, rounded-2xl, mobile-first.
 */

// Example scenario and flow (would be loaded from JSON in production)
const scenario = {
  id: "fest_organisieren",
  title: "Eine Geburtstagsparty organisieren",
  description: "Planen Sie gemeinsam eine Party",
  leitpunkte: ["Wann?", "Wo?", "Essen/Getränke?", "Wer kommt?", "Dekoration?"],
  dialogueFlow: [
    {
      step: 1,
      examinerPrompt: "Wann wollen Sie die Party machen?",
      redemittelOptions: [
        {
          category: "vorschlag_machen",
          text: "Wie wäre es, wenn wir am Samstag feiern?",
        },
        {
          category: "nachfragen",
          text: "Was denkst du? Wann hast du Zeit?",
        },
      ],
    },
    {
      step: 2,
      examinerPrompt: "Ja, Samstag ist gut! Wo wollen Sie feiern?",
      redemittelOptions: [
        {
          category: "vorschlag_machen",
          text: "Wir könnten im Restaurant feiern.",
        },
        {
          category: "vorschlag_machen",
          text: "Ich schlage vor, dass wir zu Hause feiern.",
        },
      ],
    },
    {
      step: 3,
      examinerPrompt: "Super! Was wollen wir essen und trinken?",
      redemittelOptions: [
        {
          category: "vorschlag_machen",
          text: "Vielleicht Pizza und Cola?",
        },
        {
          category: "meinung_äußern",
          text: "Ich finde, dass wir Kuchen und Saft nehmen sollten.",
        },
      ],
    },
    {
      step: 4,
      examinerPrompt: "Wer soll eingeladen werden?",
      redemittelOptions: [
        {
          category: "nachfragen",
          text: "Was meinst du? Wen sollen wir einladen?",
        },
        {
          category: "vorschlag_machen",
          text: "Ich schlage vor, wir laden unsere Freunde und Familie ein.",
        },
      ],
    },
    {
      step: 5,
      examinerPrompt: "Wie dekorieren wir?",
      redemittelOptions: [
        {
          category: "vorschlag_machen",
          text: "Wir könnten Luftballons und Girlanden nehmen.",
        },
        {
          category: "meinung_äußern",
          text: "Ich denke, bunte Blumen wären schön.",
        },
      ],
    },
  ],
};
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, MessageSquare } from "lucide-react";
// ...existing code...

// DialogueTrainer now accepts either a `scenario` prop or a route param `scenarioId`.
export default function DialogueTrainer({ scenario: propScenario }) {
  // All hooks at top, unconditional
  const [redemittel, setRedemittel] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const scenarioId = params.scenarioId;
  const [scenario, setScenario] = useState(propScenario || null);
  const [step, setStep] = useState(0);
  const [dialogue, setDialogue] = useState([]);
  const [loading, setLoading] = useState(!propScenario);

  useEffect(() => {
    fetch("/data/sprechen/redemittel.json")
      .then((r) => r.json())
      .then(setRedemittel);
  }, []);

  useEffect(() => {
    if (propScenario) return;
    fetch("/data/sprechen/dialogues.json")
      .then((res) => res.json())
      .then((data) => {
        if (scenarioId) {
          const found = data.find(
            (s) =>
              s.id === scenarioId || String(s.number) === String(scenarioId)
          );
          setScenario(found || data[0]);
        } else {
          setScenario(data[0]);
        }
      })
      .catch(() => setScenario(null))
      .finally(() => setLoading(false));
  }, [propScenario, scenarioId]);

  useEffect(() => {
    setStep(0);
    setDialogue([]);
  }, [scenario?.id]);

  // Always render main UI, show loading/error states inline
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading && (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600" />
          </div>
        )}
        {!loading && !scenario && (
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100 max-w-md text-center mx-auto">
            <h2 className="text-xl font-bold mb-2">Szenario nicht gefunden</h2>
            <p className="text-gray-600 mb-4">
              Wählen Sie ein anderes Szenario aus der Übersicht.
            </p>
            <button
              onClick={() => navigate("/tests/sprechen/menu")}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl"
            >
              Zur Szenario-Übersicht
            </button>
          </div>
        )}
        {!loading && scenario && (
          <>
            {/* Scenario Card */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl p-5 mb-5 shadow-xl">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <MessageSquare size={28} className="text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-black leading-tight">
                    {scenario.title}
                  </h1>
                  {scenario.greeting && (
                    <p className="text-white/90 mt-2">{scenario.greeting}</p>
                  )}
                  <p className="text-white/90 mt-2 text-sm">
                    {scenario.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {scenario.leitpunkte.map((lp, i) => (
                      <span
                        key={i}
                        className="bg-white/20 text-white px-3 py-1 rounded-xl text-xs font-medium"
                      >
                        {lp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/40 rounded-full h-2 mb-6">
              <div
                className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.round(((step + 1) / scenario.dialogueFlow.length) * 100)}%`,
                }}
              />
            </div>

            {/* Dialogue History */}
            <div className="space-y-4 mb-6">
              {dialogue.map((turn, idx) => (
                <div key={idx}>
                  <div className="flex justify-start mb-2">
                    <div className="bg-white/90 rounded-2xl rounded-tl-none p-4 max-w-xs">
                      <div className="text-xs text-purple-600 font-bold mb-1">
                        Prüfer
                      </div>
                      <p className="text-gray-900 text-sm">{turn.a}</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div
                      className={`rounded-2xl rounded-tr-none p-4 max-w-xs shadow-lg ${bubbleColor(turn.category)}`}
                    >
                      <div className="text-xs text-white/80 font-bold mb-1">
                        Teilnehmer
                      </div>
                      <p className="text-white text-sm">{turn.b}</p>
                      <span className="block text-xs text-white/70 mt-1">
                        {redemittelLabel(turn.category)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Current Step */}
            {step < scenario.dialogueFlow.length ? (
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-purple-100 mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0">
                    <div className="bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center">
                      <MessageSquare className="text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-purple-600 font-bold mb-1">
                      Prüfer
                    </div>
                    <p className="text-gray-900 text-base">
                      {scenario.dialogueFlow[step].examinerPrompt}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {scenario.dialogueFlow[step].redemittelOptions.map(
                    (option, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setDialogue((d) => [
                            ...d,
                            {
                              a: scenario.dialogueFlow[step].examinerPrompt,
                              b: option.text,
                              category: option.category,
                            },
                          ]);
                          setStep((prev) => prev + 1);
                        }}
                        className={`rounded-2xl p-4 shadow-lg border-2 border-purple-100 hover:border-purple-400 transition-all duration-150 active:scale-98 text-left w-full focus:outline-none focus:ring-2 focus:ring-purple-500 ${bubbleColor(option.category)}`}
                      >
                        <div className="text-sm font-semibold mb-1 text-white/90">
                          {redemittelLabel(option.category)}
                        </div>
                        <div className="font-medium text-white text-sm">
                          {option.text}
                        </div>
                      </button>
                    )
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-green-400 to-purple-500 text-white rounded-2xl p-6 shadow-xl flex flex-col items-center">
                <CheckCircle size={36} className="mb-2 text-white" />
                <h2 className="text-xl font-bold mb-2">
                  Dialog abgeschlossen!
                </h2>
                <p className="mb-2 text-white/90">
                  Sie haben alle Leitpunkte besprochen.
                </p>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => {
                      setStep(0);
                      setDialogue([]);
                    }}
                    className="px-4 py-2 bg-white/90 text-purple-700 rounded-xl font-medium"
                  >
                    Nochmal üben
                  </button>
                  <button
                    onClick={() => navigate("/tests/sprechen/menu")}
                    className="px-4 py-2 bg-white/20 border border-white/30 rounded-xl"
                  >
                    Zur Übersicht
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  const currentFlow = scenario.dialogueFlow[step];
  const progress = Math.round(
    ((step + 1) / scenario.dialogueFlow.length) * 100
  );

  function handleSelect(option) {
    setDialogue((d) => [
      ...d,
      {
        a: currentFlow.examinerPrompt,
        b: option.text,
        category: option.category,
      },
    ]);
    setStep((prev) => prev + 1);
  }

  function handleRestart() {
    setStep(0);
    setDialogue([]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="p-2 rounded-lg bg-white/80 backdrop-blur-md border border-purple-100 shadow-sm"
          >
            <ArrowLeft />
          </button>
          <div className="text-sm text-gray-600">
            Leitpunkte: {scenario.leitpunkte.length}
          </div>
        </div>

        {/* Scenario Card */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl p-5 mb-5 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <MessageSquare size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-black leading-tight">
                {scenario.title}
              </h1>
              {scenario.greeting && (
                <p className="text-white/90 mt-2">{scenario.greeting}</p>
              )}
              <p className="text-white/90 mt-2 text-sm">
                {scenario.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {scenario.leitpunkte.map((lp, i) => (
                  <span
                    key={i}
                    className="bg-white/20 text-white px-3 py-1 rounded-xl text-xs font-medium"
                  >
                    {lp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/40 rounded-full h-2 mb-6">
          <div
            className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dialogue History */}
        <div className="space-y-4 mb-6">
          {dialogue.map((turn, idx) => (
            <div key={idx}>
              <div className="flex justify-start mb-2">
                <div className="bg-white/90 rounded-2xl rounded-tl-none p-4 max-w-xs">
                  <div className="text-xs text-purple-600 font-bold mb-1">
                    Prüfer
                  </div>
                  <p className="text-gray-900 text-sm">{turn.a}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div
                  className={`rounded-2xl rounded-tr-none p-4 max-w-xs shadow-lg ${bubbleColor(turn.category)}`}
                >
                  <div className="text-xs text-white/80 font-bold mb-1">
                    Teilnehmer
                  </div>
                  <p className="text-white text-sm">{turn.b}</p>
                  <span className="block text-xs text-white/70 mt-1">
                    {redemittelLabel(turn.category)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Current Step */}
        {step < scenario.dialogueFlow.length ? (
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-purple-100 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0">
                <div className="bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center">
                  <MessageSquare className="text-purple-600" />
                </div>
              </div>
              <div>
                <div className="text-xs text-purple-600 font-bold mb-1">
                  Prüfer
                </div>
                <p className="text-gray-900 text-base">
                  {currentFlow.examinerPrompt}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentFlow.redemittelOptions.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(option)}
                  className={`rounded-2xl p-4 shadow-lg border-2 border-purple-100 hover:border-purple-400 transition-all duration-150 active:scale-98 text-left w-full focus:outline-none focus:ring-2 focus:ring-purple-500 ${bubbleColor(option.category)}`}
                >
                  <div className="text-sm font-semibold mb-1 text-white/90">
                    {redemittelLabel(option.category)}
                  </div>
                  <div className="font-medium text-white text-sm">
                    {option.text}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-green-400 to-purple-500 text-white rounded-2xl p-6 shadow-xl flex flex-col items-center">
            <CheckCircle size={36} className="mb-2 text-white" />
            <h2 className="text-xl font-bold mb-2">Dialog abgeschlossen!</h2>
            <p className="mb-2 text-white/90">
              Sie haben alle Leitpunkte besprochen.
            </p>
            <div className="flex gap-3 mt-3">
              <button
                onClick={handleRestart}
                className="px-4 py-2 bg-white/90 text-purple-700 rounded-xl font-medium"
              >
                Nochmal üben
              </button>
              <button
                onClick={() => navigate("/tests/sprechen/menu")}
                className="px-4 py-2 bg-white/20 border border-white/30 rounded-xl"
              >
                Zur Übersicht
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function redemittelLabel(category) {
  switch (category) {
    case "vorschlag_machen":
      return "Vorschlag machen";
    case "vorschlag_annehmen":
    case "zustimmen":
      return "Zustimmen";
    case "vorschlag_ablehnen":
    case "widersprechen":
      return "Ablehnen";
    case "meinung_äußern":
      return "Meinung äußern";
    case "nachfragen":
      return "Nachfragen";
    default:
      return "Redemittel";
  }
}

function bubbleColor(category) {
  switch (category) {
    case "vorschlag_annehmen":
    case "zustimmen":
      return "bg-gradient-to-r from-green-500 to-green-700 text-white border-2 border-green-400 shadow-xl";
    case "vorschlag_ablehnen":
    case "widersprechen":
      return "bg-gradient-to-r from-pink-500 to-red-600 text-white border-2 border-pink-400 shadow-xl";
    default:
      return "bg-gradient-to-r from-purple-600 to-indigo-700 text-white border-2 border-purple-300 shadow-xl";
  }
}
