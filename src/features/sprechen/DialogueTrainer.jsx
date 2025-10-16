/**
 * DialogueTrainer
 * Complete DTZ Sprechen Teil 3 dialogue practice interface.
 *
 * Features:
 * - Full Aufgabe display at top
 * - Leitpunkte (discussion points) checklist
 * - Conversation history between Teilnehmer A & B
 * - Four choice buttons (positive, negative, question, opinion) with colors and icons
 * - Progress indicator
 * - Natural B1-level dialogue flow
 */

import { useParams, useNavigate } from "react-router-dom";
import { useChatEngine } from "../dialogue/useChatEngine";
import {
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  Lightbulb,
  MessageCircle,
  ListChecks,
} from "lucide-react";

// Choice button with icon and color coding
function ChoiceButton({ choice, onClick, type }) {
  const config = {
    positive: {
      gradient: "from-green-500 to-emerald-600",
      icon: ThumbsUp,
      label: "Zustimmen",
    },
    negative: {
      gradient: "from-red-500 to-rose-600",
      icon: ThumbsDown,
      label: "Ablehnen",
    },
    question: {
      gradient: "from-blue-500 to-indigo-600",
      icon: HelpCircle,
      label: "Nachfragen",
    },
    suggestion: {
      gradient: "from-amber-500 to-orange-600",
      icon: Lightbulb,
      label: "Vorschlag",
    },
  };

  const { gradient, icon: Icon, label } = config[type] || config.positive;

  return (
    <button
      onClick={onClick}
      className={`group bg-gradient-to-r ${gradient} text-white p-5 rounded-2xl font-medium hover:scale-105 hover:shadow-2xl transition-all duration-200 text-left relative overflow-hidden`}
    >
      {/* Background icon effect */}
      <Icon className="absolute -right-2 -bottom-2 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-200" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-5 h-5" />
          <span className="text-xs font-semibold uppercase tracking-wide opacity-90">
            {label}
          </span>
        </div>
        <p className="text-sm leading-relaxed">{choice}</p>
      </div>
    </button>
  );
}

export default function DialogueTrainer() {
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const {
    currentScenario,
    messageHistory,
    currentChoices,
    isComplete,
    handleChoice,
    restart,
    loading,
    error,
  } = useChatEngine(scenarioId);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Lade Dialog...</p>
        </div>
      </div>
    );
  }

  if (error || !currentScenario) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
        <div className="text-center bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-red-200">
          <MessageCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-lg text-red-600 mb-4">
            Fehler beim Laden des Dialogs
          </p>
          <button
            onClick={() => navigate("/tests/sprechen/trainer")}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 font-medium transition-colors duration-200"
          >
            Zurück zur Übersicht
          </button>
        </div>
      </div>
    );
  }

  // Calculate progress
  const totalSteps = Object.keys(currentScenario.dialogue || {}).length;
  const currentStep = messageHistory.filter((m) => m.role === "user").length;
  const progressPercent = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
      {/* Fixed Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => navigate("/tests/sprechen/trainer")}
              className="flex items-center text-purple-700 hover:text-purple-900 font-medium transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Alle Dialoge
            </button>
            <button
              onClick={restart}
              className="flex items-center text-gray-600 hover:text-purple-700 font-medium transition-colors duration-200"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Neu starten
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-purple-100 rounded-full h-2 mb-2">
            <div
              className="h-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 text-right">
            Schritt {currentStep} von {totalSteps}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Aufgabe Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0">
              {currentScenario.number}
            </div>
            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium mb-2">
                {currentScenario.theme}
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {currentScenario.title}
              </h1>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
            <h2 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-purple-600" />
              Aufgabe
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {currentScenario.aufgabe}
            </p>
          </div>
        </div>

        {/* Leitpunkte Checklist */}
        {currentScenario.leitpunkte &&
          currentScenario.leitpunkte.length > 0 && (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ListChecks className="w-5 h-5 text-purple-600" />
                Diskussionspunkte
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {currentScenario.leitpunkte.map((punkt, index) => (
                  <div
                    key={index}
                    className="bg-purple-50 border border-purple-200 rounded-lg px-3 py-2 text-sm text-purple-700 font-medium text-center"
                  >
                    {punkt}
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Conversation History */}
        {messageHistory.length > 0 && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-purple-600" />
              Gesprächsverlauf
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {messageHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-l-4 ${
                    msg.role === "examiner"
                      ? "bg-indigo-50 border-indigo-500"
                      : "bg-purple-50 border-purple-500"
                  }`}
                >
                  <p
                    className={`font-bold text-sm mb-1 ${msg.role === "examiner" ? "text-indigo-700" : "text-purple-700"}`}
                  >
                    {msg.role === "examiner"
                      ? "Teilnehmer A"
                      : "Teilnehmer B (Du)"}
                  </p>
                  <p className="text-gray-800 leading-relaxed">{msg.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Choice Buttons or Completion */}
        {isComplete ? (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-green-200 text-center">
            <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Dialog abgeschlossen!
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Ausgezeichnet! Du hast den Dialog erfolgreich durchgeführt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={restart}
                className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Nochmal üben
              </button>
              <button
                onClick={() => navigate("/tests/sprechen/trainer")}
                className="px-8 py-4 bg-white text-purple-700 border-2 border-purple-600 rounded-xl hover:bg-purple-50 hover:scale-105 transition-all duration-200 font-medium"
              >
                Andere Dialoge
              </button>
            </div>
          </div>
        ) : currentChoices ? (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100">
            <h3 className="font-bold text-gray-900 mb-4 text-center">
              Wähle deine Antwort
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(currentChoices).map(([type, choice]) => (
                <ChoiceButton
                  key={type}
                  type={type}
                  choice={choice}
                  onClick={() => handleChoice(type)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
