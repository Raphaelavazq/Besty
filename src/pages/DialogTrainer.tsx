import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useChatEngine } from "../features/dialogue/useChatEngine";

export default function DialogTrainerPage() {
  const params = useParams();
  const navigate = useNavigate();
  const initialId = (params as any).scenarioId ?? undefined;
  const {
    catalog,
    scenario,
    messages,
    stepIndex,
    choose,
    reset,
    setScenarioById,
    themes,
  } = useChatEngine(initialId);

  // Very small placeholder UI so App import succeeds and route works.
  if (!catalog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Lade Szenarien…</div>
      </div>
    );
  }

  if (!scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100">
          <h2 className="text-lg font-bold mb-2">Szenario nicht gefunden</h2>
          <p className="text-sm text-gray-600 mb-4">
            Wählen Sie ein Szenario aus der Übersicht.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate("/tests/sprechen/menu")}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl"
            >
              Zur Übersicht
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-black">{scenario.title}</h1>
        </div>

        <div className="space-y-4">
          {messages.map((m, i) => (
            <div key={i} className="p-3 bg-white/90 rounded-lg shadow-sm">
              {m}
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => choose("positive")}
            className="px-3 py-2 bg-purple-600 text-white rounded-lg"
          >
            Positiv
          </button>
          <button
            onClick={() => choose("negative")}
            className="px-3 py-2 bg-gray-200 rounded-lg"
          >
            Negativ
          </button>
          <button
            onClick={() => choose("question")}
            className="px-3 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Nachfragen
          </button>
          <button
            onClick={() => choose("suggestion")}
            className="px-3 py-2 bg-green-500 text-white rounded-lg"
          >
            Vorschlag
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          Schritt: {stepIndex + 1} / {scenario.steps.length}
        </div>
      </div>
    </div>
  );
}
