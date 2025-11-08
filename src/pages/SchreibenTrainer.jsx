/**
 * SchreibenTrainer - AI-Powered Email/Letter Writing Trainer
 * Inspired by lingo-letter, adapted for DTZ B1 exam preparation
 *
 * Features:
 * - Load formal/informal email prompts
 * - Writing interface with word counter
 * - AI-powered correction and feedback
 * - Side-by-side comparison (original vs corrected)
 * - DTZ scoring breakdown
 * - Detailed feedback sections
 */

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Send,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileText,
  TrendingUp,
  Lightbulb,
  Eye,
  EyeOff,
  Award,
  MessageSquare,
} from "lucide-react";
import {
  correctEmail,
  getRandomPrompt,
  resetSchreibenSession,
  SchreibenError,
} from "../services/schreibenService";

export default function SchreibenTrainer() {
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  // State
  const [prompt, setPrompt] = useState(null);
  const [userText, setUserText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);
  const [showOriginal, setShowOriginal] = useState(true);

  // Load random prompt on mount
  useEffect(() => {
    loadNewPrompt();
  }, []);

  // Update word count when text changes
  useEffect(() => {
    if (userText.trim()) {
      const words = userText.trim().split(/\s+/).length;
      setWordCount(words);
    } else {
      setWordCount(0);
    }
  }, [userText]);

  // Focus textarea when prompt loads
  useEffect(() => {
    if (prompt && textareaRef.current && !showResults) {
      textareaRef.current.focus();
    }
  }, [prompt, showResults]);

  async function loadNewPrompt() {
    try {
      setError(null);
      const newPrompt = await getRandomPrompt();
      setPrompt(newPrompt);
      setUserText("");
      setWordCount(0);
      setResults(null);
      setShowResults(false);
      console.log("✅ Loaded new prompt:", newPrompt.title);
    } catch (err) {
      console.error("Error loading prompt:", err);
      setError("Fehler beim Laden der Aufgabe. Bitte versuche es erneut.");
    }
  }

  async function handleSubmit() {
    if (!userText.trim() || wordCount < 50) {
      setError("Bitte schreibe mindestens 50 Wörter.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      console.log("📤 Submitting email for correction...");
      const result = await correctEmail({
        text: userText,
        prompt: prompt,
        type: prompt.type,
      });

      setResults(result);
      setShowResults(true);
      console.log("✅ Results received:", result);
    } catch (err) {
      console.error("Submission error:", err);
      if (err instanceof SchreibenError) {
        setError(err.message);
      } else {
        setError("Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleRestart() {
    setUserText("");
    setWordCount(0);
    setResults(null);
    setShowResults(false);
    setError(null);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }

  function handleNewPrompt() {
    resetSchreibenSession();
    loadNewPrompt();
  }

  // Get score color based on points
  function getScoreColor(score, max) {
    const percentage = (score / max) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  }

  // Get score background based on points
  function getScoreBg(score, max) {
    const percentage = (score / max) * 100;
    if (percentage >= 80) return "from-green-500 to-emerald-600";
    if (percentage >= 60) return "from-yellow-500 to-orange-600";
    return "from-red-500 to-pink-600";
  }

  if (!prompt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-spin" />
          <span className="text-lg text-gray-600 dark:text-dark-text-secondary">
            Lade Aufgabe...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-700 to-purple-800 dark:from-purple-900 dark:via-indigo-900 dark:to-purple-950 text-white px-6 py-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/tests/schreiben")}
            className="flex items-center gap-2 hover:bg-white/10 dark:hover:bg-white/20 px-4 py-2 rounded-xl transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Zurück</span>
          </button>

          <h1 className="text-xl font-bold hidden md:block">
            ✍️ Schreiben-Trainer
          </h1>

          <div className="flex items-center gap-3">
            {!showResults && (
              <button
                onClick={handleNewPrompt}
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw size={18} />
                <span className="hidden sm:inline">Neue Aufgabe</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Prompt Display */}
        {!showResults && (
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-purple-100 dark:border-purple-500/20">
            {/* Type Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-lg ${
                  prompt.type === "formal"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600"
                    : "bg-gradient-to-r from-purple-800 to-pink-800"
                }`}
              >
                {prompt.type === "formal" ? "📋 Formell" : "💌 Informell"}
              </span>
              <span className="text-sm text-gray-500 dark:text-dark-text-muted">
                {prompt.category}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              {prompt.title}
            </h2>

            {/* Situation */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 mb-4">
              <p className="text-gray-700 dark:text-dark-text-secondary leading-relaxed">
                {prompt.situation}
              </p>
            </div>

            {/* Recipient */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                <strong>Empfänger:</strong> {prompt.recipient}
              </p>
            </div>

            {/* Content Points */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-dark-text-primary mb-2">
                Inhaltspunkte (alle bearbeiten!):
              </h3>
              <ul className="space-y-2">
                {prompt.contentPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-6 h-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 dark:text-dark-text-secondary">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hints */}
            {prompt.hints && prompt.hints.length > 0 && (
              <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-500/20">
                <h4 className="text-sm font-bold text-purple-900 dark:text-purple-300 mb-2 flex items-center gap-2">
                  <Lightbulb size={16} />
                  Tipps:
                </h4>
                <ul className="space-y-1">
                  {prompt.hints.map((hint, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-600 dark:text-dark-text-secondary"
                    >
                      💡 {hint}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Writing Area */}
        {!showResults && (
          <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-purple-100 dark:border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text-primary">
                Dein Brief
              </h3>
              <div className="flex items-center gap-4">
                {/* Word Counter */}
                <div
                  className={`px-4 py-2 rounded-xl font-bold ${
                    wordCount < 50
                      ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                      : wordCount < 80
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                        : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  }`}
                >
                  {wordCount} Wörter
                  {wordCount < 80 && (
                    <span className="text-sm ml-2">(min. 80 empfohlen)</span>
                  )}
                </div>
              </div>
            </div>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="Schreibe deinen Brief hier..."
              className="w-full h-96 p-4 border-2 border-purple-200 dark:border-purple-500/30 bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-dark-text-primary rounded-xl focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none resize-none text-base leading-relaxed placeholder:text-gray-400 dark:placeholder:text-dark-text-muted"
              disabled={isSubmitting}
            />

            {/* Error Message */}
            {error && (
              <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle
                  size={20}
                  className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
                />
                <p className="text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || wordCount < 50}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Wird korrigiert...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    <span>Mit Besty korrigieren</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Results Display */}
        {showResults && results && (
          <div className="space-y-6">
            {/* Score Overview */}
            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-purple-100 dark:border-purple-500/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary flex items-center gap-2">
                  <Award className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                  Deine Bewertung
                </h2>
                <div
                  className={`text-4xl font-black ${getScoreColor(results.score.total, 15)}`}
                >
                  {results.score.total}/15
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { key: "content", label: "Inhalt", max: 5 },
                  { key: "communication", label: "Kommunikation", max: 5 },
                  { key: "accuracy", label: "Korrektheit", max: 5 },
                ].map((criteria) => (
                  <div
                    key={criteria.key}
                    className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4"
                  >
                    <h4 className="text-sm font-bold text-gray-700 dark:text-dark-text-secondary mb-2">
                      {criteria.label}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-2xl font-bold ${getScoreColor(
                          results.score[criteria.key],
                          criteria.max
                        )}`}
                      >
                        {results.score[criteria.key]}
                      </span>
                      <span className="text-gray-500 dark:text-dark-text-muted">
                        / {criteria.max}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Content Points Status */}
              <div className="mt-6 pt-6 border-t border-purple-200 dark:border-purple-500/20">
                <h4 className="font-bold text-gray-900 dark:text-dark-text-primary mb-3">
                  Bearbeitete Inhaltspunkte:
                </h4>
                <div className="space-y-2">
                  {prompt.contentPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-2">
                      {results.contentPoints[index] ? (
                        <CheckCircle2
                          size={20}
                          className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"
                        />
                      ) : (
                        <XCircle
                          size={20}
                          className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
                        />
                      )}
                      <span
                        className={
                          results.contentPoints[index]
                            ? "text-gray-700 dark:text-dark-text-secondary"
                            : "text-red-700 dark:text-red-400 font-semibold"
                        }
                      >
                        {point}
                        {!results.contentPoints[index] && " (Fehlt!)"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Text Comparison */}
            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-purple-100 dark:border-purple-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text-primary flex items-center gap-2">
                  <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  Textvergleich
                </h3>
                <button
                  onClick={() => setShowOriginal(!showOriginal)}
                  className="flex items-center gap-2 text-sm bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 text-gray-900 dark:text-dark-text-primary px-4 py-2 rounded-xl transition-colors duration-200"
                >
                  {showOriginal ? (
                    <>
                      <Eye size={16} />
                      <span>Original anzeigen</span>
                    </>
                  ) : (
                    <>
                      <EyeOff size={16} />
                      <span>Original ausblenden</span>
                    </>
                  )}
                </button>
              </div>

              <div
                className={`grid ${showOriginal ? "md:grid-cols-2" : "grid-cols-1"} gap-6`}
              >
                {/* Original Text */}
                {showOriginal && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 dark:text-dark-text-secondary mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-red-500 dark:bg-red-600 text-white rounded-full flex items-center justify-center text-xs">
                        ✗
                      </span>
                      Original (mit Fehlern)
                    </h4>
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border-2 border-red-200 dark:border-red-500/30">
                      <p className="text-gray-800 dark:text-dark-text-primary whitespace-pre-wrap leading-relaxed">
                        {results.original}
                      </p>
                    </div>
                  </div>
                )}

                {/* Corrected Text */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 dark:text-dark-text-secondary mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-green-500 dark:bg-green-600 text-white rounded-full flex items-center justify-center text-xs">
                      ✓
                    </span>
                    Korrigiert
                  </h4>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border-2 border-green-200 dark:border-green-500/30">
                    <p className="text-gray-800 dark:text-dark-text-primary whitespace-pre-wrap leading-relaxed">
                      {results.corrected}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Errors List */}
            {results.errors && results.errors.length > 0 && (
              <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-purple-100 dark:border-purple-500/20">
                <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text-primary mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  Fehleranalyse ({results.errors.length}{" "}
                  {results.errors.length === 1 ? "Fehler" : "Fehler"})
                </h3>
                <div className="space-y-4">
                  {results.errors.map((error, index) => (
                    <div
                      key={index}
                      className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-500/30 rounded-xl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-8 h-8 bg-orange-500 dark:bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-orange-200 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300 text-xs font-bold rounded">
                              {error.type === "grammar"
                                ? "Grammatik"
                                : error.type === "vocabulary"
                                  ? "Wortschatz"
                                  : error.type === "structure"
                                    ? "Struktur"
                                    : "Rechtschreibung"}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <span className="text-sm font-bold text-gray-700 dark:text-dark-text-secondary">
                                Falsch:
                              </span>{" "}
                              <span className="text-red-700 dark:text-red-400 line-through">
                                {error.original}
                              </span>
                            </div>
                            <div>
                              <span className="text-sm font-bold text-gray-700 dark:text-dark-text-secondary">
                                Richtig:
                              </span>{" "}
                              <span className="text-green-700 dark:text-green-400 font-semibold">
                                {error.corrected}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-dark-text-secondary bg-white dark:bg-dark-bg-secondary rounded-lg p-2 border border-orange-200 dark:border-orange-500/30">
                              💡 {error.explanation}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback Sections */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Strengths */}
              {results.feedback.strengths &&
                results.feedback.strengths.length > 0 && (
                  <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-purple-100 dark:border-purple-500/20">
                    <h4 className="font-bold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                      <CheckCircle2 size={20} />
                      Stärken
                    </h4>
                    <ul className="space-y-2">
                      {results.feedback.strengths.map((strength, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-700 dark:text-dark-text-secondary flex items-start gap-2"
                        >
                          <span className="text-green-600 dark:text-green-400">
                            ✓
                          </span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Improvements */}
              {results.feedback.improvements &&
                results.feedback.improvements.length > 0 && (
                  <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-purple-100 dark:border-purple-500/20">
                    <h4 className="font-bold text-orange-700 dark:text-orange-400 mb-3 flex items-center gap-2">
                      <TrendingUp size={20} />
                      Verbesserungen
                    </h4>
                    <ul className="space-y-2">
                      {results.feedback.improvements.map(
                        (improvement, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-700 dark:text-dark-text-secondary flex items-start gap-2"
                          >
                            <span className="text-orange-600 dark:text-orange-400">
                              →
                            </span>
                            <span>{improvement}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

              {/* Suggestions */}
              {results.feedback.suggestions &&
                results.feedback.suggestions.length > 0 && (
                  <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-purple-100 dark:border-purple-500/20">
                    <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
                      <Lightbulb size={20} />
                      Tipps
                    </h4>
                    <ul className="space-y-2">
                      {results.feedback.suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-700 dark:text-dark-text-secondary flex items-start gap-2"
                        >
                          <span className="text-purple-600 dark:text-purple-400">
                            💡
                          </span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleRestart}
                className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-dark-bg-secondary border-2 border-purple-300 dark:border-purple-500/40 text-purple-700 dark:text-purple-300 px-6 py-4 rounded-xl font-bold shadow-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:-translate-y-1 transition-all duration-200"
              >
                <RotateCcw size={20} />
                <span>Nochmal versuchen</span>
              </button>
              <button
                onClick={handleNewPrompt}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <Sparkles size={20} />
                <span>Neue Aufgabe</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
