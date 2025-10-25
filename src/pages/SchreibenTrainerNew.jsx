/**
 * SchreibenTrainer - Redesigned High-End UI
 * Glassmorphism + Minimal Mobile + Collapsible Hints
 */

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Award,
  ChevronDown,
  ChevronUp,
  Info,
  Target,
  Lightbulb,
  FileText,
  TrendingUp,
  Eye,
  EyeOff,
  Zap,
  Mail,
  MessageCircle,
} from "lucide-react";
import {
  correctEmail,
  getRandomPrompt,
  resetSchreibenSession,
  SchreibenError,
} from "../services/schreibenService";

export default function SchreibenTrainerNew() {
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

  // Collapsible states for mobile
  const [showHints, setShowHints] = useState(false);
  const [showContentPoints, setShowContentPoints] = useState(true);
  const [expandedError, setExpandedError] = useState(null);

  // Load random prompt
  useEffect(() => {
    loadNewPrompt();
  }, []);

  // Update word count
  useEffect(() => {
    if (userText.trim()) {
      const words = userText.trim().split(/\s+/).length;
      setWordCount(words);
    } else {
      setWordCount(0);
    }
  }, [userText]);

  // Focus textarea
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
    } catch (err) {
      console.error("Error loading prompt:", err);
      setError("Fehler beim Laden der Aufgabe.");
    }
  }

  async function handleSubmit() {
    if (!userText.trim() || wordCount < 50) {
      setError("Mindestens 50 Wörter erforderlich.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await correctEmail({
        text: userText,
        prompt: prompt,
        type: prompt.type,
      });

      setResults(result);
      setShowResults(true);
    } catch (err) {
      console.error("Submission error:", err);
      if (err instanceof SchreibenError) {
        setError(err.message);
      } else {
        setError("Ein Fehler ist aufgetreten.");
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

  function getScoreColor(score, max) {
    const percentage = (score / max) * 100;
    if (percentage >= 80) return "text-indigo-600";
    if (percentage >= 60) return "text-purple-600";
    return "text-violet-600";
  }

  function getScoreBg(score, max) {
    const percentage = (score / max) * 100;
    if (percentage >= 80) return "from-indigo-500 to-blue-600";
    if (percentage >= 60) return "from-purple-500 to-indigo-600";
    return "from-violet-500 to-purple-600";
  }

  if (!prompt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 bg-white/60 backdrop-blur-xl px-8 py-8 rounded-3xl shadow-2xl border border-white/40">
          <div className="w-32 h-32">
            <DotLottieReact
              src="https://lottie.host/da877b6a-f3f3-4798-b191-3185734b7834/eiyBxqoz33.lottie"
              loop
              autoplay
            />
          </div>
          <span className="text-lg font-semibold text-gray-700">Besty lädt deine Aufgabe...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
      {/* Glassmorphic Header */}
      <div className="sticky top-0 z-50 bg-white/40 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => navigate("/tests/schreiben")}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-white/40 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            >
              <ArrowLeft size={18} className="text-purple-700" />
              <span className="hidden sm:inline font-semibold text-purple-700">Zurück</span>
            </button>

            <h1 className="text-base sm:text-xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Schreiben mit Besty
            </h1>

            {!showResults && (
              <button
                onClick={handleNewPrompt}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw size={18} />
                <span className="hidden sm:inline font-semibold">Neu</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-6">
        {/* Prompt Card - Glassmorphic */}
        {!showResults && (
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-4 sm:p-8 shadow-2xl border border-white/40 hover:shadow-3xl transition-shadow duration-300">
            {/* Type Badge */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg ${
                  prompt.type === "formal"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600"
                    : "bg-gradient-to-r from-purple-600 to-pink-600"
                }`}
              >
                {prompt.type === "formal" ? (
                  <>
                    <Mail size={16} />
                    <span>Formell</span>
                  </>
                ) : (
                  <>
                    <MessageCircle size={16} />
                    <span>Informell</span>
                  </>
                )}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {prompt.title}
            </h2>

            {/* Situation - Glassmorphic */}
            <div className="bg-gradient-to-br from-purple-100/60 to-indigo-100/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-purple-200/40">
              <p className="text-gray-800 leading-relaxed text-sm sm:text-base">
                {prompt.situation}
              </p>
            </div>

            {/* Recipient */}
            <div className="mb-4 sm:mb-6 flex items-center gap-2 text-sm sm:text-base">
              <Mail size={18} className="text-purple-600" />
              <span className="font-bold text-gray-700">An:</span>
              <span className="text-gray-600">{prompt.recipient}</span>
            </div>

            {/* Content Points - Collapsible on Mobile */}
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/60">
              <button
                onClick={() => setShowContentPoints(!showContentPoints)}
                className="w-full flex items-center justify-between mb-4 sm:mb-0 sm:pointer-events-none"
              >
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                  <Target size={20} className="text-purple-600" />
                  <span>Inhaltspunkte</span>
                </h3>
                <ChevronDown
                  size={20}
                  className={`sm:hidden transition-transform ${showContentPoints ? "rotate-180" : ""}`}
                />
              </button>

              <div className={`space-y-3 ${showContentPoints ? "block" : "hidden sm:block"} mt-4`}>
                {prompt.contentPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <span className="w-7 h-7 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 text-sm sm:text-base pt-1">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hints - Collapsible */}
            {prompt.hints && prompt.hints.length > 0 && (
              <div className="mt-4 sm:mt-6">
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="w-full bg-gradient-to-r from-purple-100/60 to-indigo-100/60 backdrop-blur-sm rounded-2xl p-4 border border-purple-200/40 flex items-center justify-between hover:from-purple-100 hover:to-indigo-100 transition-all"
                >
                  <span className="font-bold text-purple-900 flex items-center gap-2 text-sm sm:text-base">
                    <Lightbulb size={18} className="text-purple-600" />
                    <span>Tipps ({prompt.hints.length})</span>
                  </span>
                  {showHints ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {showHints && (
                  <div className="mt-3 space-y-2 pl-4 sm:pl-6">
                    {prompt.hints.map((hint, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm sm:text-base text-gray-700">
                        <Lightbulb size={16} className="text-purple-600 flex-shrink-0 mt-1" />
                        <span>{hint}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Writing Area - Glassmorphic */}
        {!showResults && (
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-4 sm:p-8 shadow-2xl border border-white/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Dein Brief</h3>

              {/* Word Counter - Glassmorphic */}
              <div
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-bold shadow-lg backdrop-blur-sm border-2 transition-all ${
                  wordCount < 50
                    ? "bg-violet-100/80 text-violet-700 border-violet-300"
                    : wordCount < 80
                      ? "bg-purple-100/80 text-purple-700 border-purple-300"
                      : "bg-indigo-100/80 text-indigo-700 border-indigo-300"
                }`}
              >
                <span className="text-lg sm:text-xl">{wordCount}</span>
                <span className="text-xs sm:text-sm ml-2">
                  {wordCount < 80 ? `/ 80 Wörter` : "Wörter"}
                </span>
              </div>
            </div>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="Schreibe deinen Brief hier..."
              className="w-full h-64 sm:h-96 p-4 sm:p-6 bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 focus:outline-none resize-none text-sm sm:text-base leading-relaxed shadow-inner transition-all"
              disabled={isSubmitting}
            />

            {/* Error Message */}
            {error && (
              <div className="mt-4 bg-violet-50/80 backdrop-blur-sm border-2 border-violet-200 rounded-2xl p-4 flex items-start gap-3 shadow-lg">
                <AlertCircle size={20} className="text-violet-600 flex-shrink-0 mt-0.5" />
                <p className="text-violet-700 text-sm sm:text-base">{error}</p>
              </div>
            )}

            {/* Submit Button - Glassmorphic */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || wordCount < 50}
                className="group flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Sparkles size={22} className="relative z-10 group-hover:rotate-12 transition-transform" />
                <span className="relative z-10 text-sm sm:text-base">Von Besty korrigieren lassen</span>
              </button>
            </div>
          </div>
        )}

        {/* Results Section */}
        {showResults && results && (
          <div className="space-y-4 sm:space-y-6">
            {/* Score Card - Glassmorphic Hero */}
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/40 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600"></div>
              </div>

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-3">
                    <Award className="w-8 h-8 text-purple-600" />
                    Bewertung
                  </h2>
                  <div className={`text-5xl sm:text-6xl font-black ${getScoreColor(results.score.total, 15)}`}>
                    {results.score.total}
                    <span className="text-3xl sm:text-4xl text-gray-400">/15</span>
                  </div>
                </div>

                {/* Score Breakdown - Horizontal Scroll on Mobile */}
                <div className="flex gap-4 overflow-x-auto pb-4 sm:pb-0 sm:grid sm:grid-cols-3 scrollbar-hide">
                  {[
                    { key: "content", label: "Inhalt", icon: FileText, max: 5 },
                    { key: "communication", label: "Kommunikation", icon: Zap, max: 5 },
                    { key: "accuracy", label: "Korrektheit", icon: CheckCircle2, max: 5 },
                  ].map((criteria) => (
                    <div
                      key={criteria.key}
                      className="flex-shrink-0 w-48 sm:w-auto bg-gradient-to-br from-purple-100/60 to-indigo-100/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-200/40 hover:scale-105 transition-transform"
                    >
                      <criteria.icon size={24} className="text-purple-600 mb-2" />
                      <h4 className="text-xs sm:text-sm font-bold text-gray-700 mb-3">
                        {criteria.label}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className={`text-3xl sm:text-4xl font-black ${getScoreColor(results.score[criteria.key], criteria.max)}`}>
                          {results.score[criteria.key]}
                        </span>
                        <span className="text-xl sm:text-2xl text-gray-400">/{criteria.max}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Content Points Check */}
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-purple-200/40">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm sm:text-base">
                    <Target size={20} className="text-purple-600" />
                    Inhaltspunkte
                  </h4>
                  <div className="grid gap-2 sm:gap-3">
                    {prompt.contentPoints.map((point, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-3 p-3 rounded-xl backdrop-blur-sm transition-all ${
                          results.contentPoints[index]
                            ? "bg-indigo-50/60 border border-indigo-200/40"
                            : "bg-violet-50/60 border border-violet-200/40"
                        }`}
                      >
                        {results.contentPoints[index] ? (
                          <CheckCircle2 size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle size={20} className="text-violet-600 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm sm:text-base ${results.contentPoints[index] ? "text-gray-700" : "text-violet-700 font-semibold"}`}>
                          {point}
                          {!results.contentPoints[index] && " (Fehlt!)"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Text Comparison */}
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-4 sm:p-8 shadow-2xl border border-white/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-purple-600" />
                  Vergleich
                </h3>
                <button
                  onClick={() => setShowOriginal(!showOriginal)}
                  className="flex items-center gap-2 text-sm bg-purple-100/60 hover:bg-purple-200/60 backdrop-blur-sm px-4 py-2 rounded-xl transition-all border border-purple-200/40"
                >
                  {showOriginal ? <Eye size={16} /> : <EyeOff size={16} />}
                  <span>{showOriginal ? "Original zeigen" : "Nur Korrektur"}</span>
                </button>
              </div>

              <div className={`grid ${showOriginal ? "md:grid-cols-2" : "grid-cols-1"} gap-4 sm:gap-6`}>
                {showOriginal && (
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <XCircle size={16} className="text-violet-600" />
                      Original
                    </h4>
                    <div className="bg-violet-50/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border-2 border-violet-200/40">
                      <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                        {results.original}
                      </p>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-indigo-600" />
                    Korrigiert
                  </h4>
                  <div className="bg-indigo-50/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border-2 border-indigo-200/40">
                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                      {results.corrected}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Errors - Collapsible Items */}
            {results.errors && results.errors.length > 0 && (
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-4 sm:p-8 shadow-2xl border border-white/40">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-violet-600" />
                  {results.errors.length} {results.errors.length === 1 ? "Fehler" : "Fehler"}
                </h3>
                <div className="space-y-3">
                  {results.errors.map((error, index) => (
                    <div key={index} className="bg-violet-50/60 backdrop-blur-sm border border-violet-200/40 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setExpandedError(expandedError === index ? null : index)}
                        className="w-full p-4 flex items-center justify-between hover:bg-violet-100/60 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <span className="font-semibold text-gray-900 text-sm sm:text-base">
                            {error.type === "grammar"
                              ? "Grammatik"
                              : error.type === "vocabulary"
                                ? "Wortschatz"
                                : error.type === "structure"
                                  ? "Struktur"
                                  : "Rechtschreibung"}
                          </span>
                        </div>
                        {expandedError === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>

                      {expandedError === index && (
                        <div className="px-4 pb-4 space-y-3">
                          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3">
                            <span className="text-xs font-bold text-gray-600">Falsch:</span>
                            <p className="text-violet-700 line-through text-sm sm:text-base">{error.original}</p>
                          </div>
                          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3">
                            <span className="text-xs font-bold text-gray-600">Richtig:</span>
                            <p className="text-indigo-700 font-semibold text-sm sm:text-base">{error.corrected}</p>
                          </div>
                          <div className="bg-gradient-to-br from-purple-100/60 to-indigo-100/60 backdrop-blur-sm rounded-xl p-3 border border-purple-200/40">
                            <div className="flex items-start gap-2">
                              <Lightbulb size={16} className="text-purple-600 flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-gray-700">{error.explanation}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback - Horizontal Scroll on Mobile */}
            <div className="flex gap-4 overflow-x-auto pb-4 sm:pb-0 sm:grid sm:grid-cols-3 scrollbar-hide">
              {/* Strengths */}
              {results.feedback.strengths && results.feedback.strengths.length > 0 && (
                <div className="flex-shrink-0 w-72 sm:w-auto bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/40">
                  <h4 className="font-bold text-indigo-700 mb-4 flex items-center gap-2">
                    <CheckCircle2 size={20} />
                    Stärken
                  </h4>
                  <ul className="space-y-2">
                    {results.feedback.strengths.map((strength, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improvements */}
              {results.feedback.improvements && results.feedback.improvements.length > 0 && (
                <div className="flex-shrink-0 w-72 sm:w-auto bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/40">
                  <h4 className="font-bold text-purple-700 mb-4 flex items-center gap-2">
                    <TrendingUp size={20} />
                    Verbesserungen
                  </h4>
                  <ul className="space-y-2">
                    {results.feedback.improvements.map((improvement, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <TrendingUp size={16} className="text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggestions */}
              {results.feedback.suggestions && results.feedback.suggestions.length > 0 && (
                <div className="flex-shrink-0 w-72 sm:w-auto bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/40">
                  <h4 className="font-bold text-purple-700 mb-4 flex items-center gap-2">
                    <Lightbulb size={20} />
                    Tipps
                  </h4>
                  <ul className="space-y-2">
                    {results.feedback.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <Lightbulb size={16} className="text-purple-600 flex-shrink-0 mt-0.5" />
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
                className="flex-1 flex items-center justify-center gap-3 bg-white/80 backdrop-blur-xl border-2 border-purple-300 text-purple-700 px-6 py-4 rounded-2xl font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
              >
                <RotateCcw size={20} />
                <span>Nochmal</span>
              </button>
              <button
                onClick={handleNewPrompt}
                className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 rounded-2xl font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
              >
                <Sparkles size={20} />
                <span>Neue Aufgabe</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Full Screen Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/40 flex flex-col items-center gap-6 max-w-md mx-4 animate-scaleIn">
            <div className="w-48 h-48">
              <DotLottieReact
                src="https://lottie.host/da877b6a-f3f3-4798-b191-3185734b7834/eiyBxqoz33.lottie"
                loop
                autoplay
              />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Besty korrigiert deinen Brief
              </h3>
              <p className="text-gray-600">
                Einen Moment bitte...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
