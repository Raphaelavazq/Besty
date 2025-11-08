/**
 * DialogueTrainer - AI-Powered Version
 * Complete DTZ Sprechen Teil 3 dialogue practice with GPT-4o-mini
 *
 * Features:
 * - Full Aufgabe display at top
 * - Leitpunkte (discussion points) with tracking
 * - Live AI conversation (natural B1 German)
 * - Text input for responses
 * - Progress tracking and feedback
 * - Beautiful interface with glass-morphism design
 */

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  MessageCircle,
  ListChecks,
  Send,
  Loader2,
  Sparkles,
  AlertCircle,
  Mic,
  MicOff,
  Volume2,
  ChevronDown,
  ChevronUp,
  User,
  Bot,
  HelpCircle,
} from "lucide-react";
import {
  startDialogue,
  continueDialogue,
  analyzeDiscussedPoints,
  getFeedback,
  correctMessage,
  ProtectionError,
} from "../../services/aiChatService";
import { redemittel, tipps } from "./data/redemittel";

export default function DialogueTrainer() {
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // State
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [discussedPoints, setDiscussedPoints] = useState([]);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);

  // Auto-correct German text capitalization
  const autoCorrectGermanText = (text) => {
    if (!text) return text;

    // 1. Capitalize first letter of text
    let corrected = text.charAt(0).toUpperCase() + text.slice(1);

    // 2. Capitalize after sentence endings (. ! ?)
    corrected = corrected.replace(
      /([.!?]\s+)([a-zäöüß])/g,
      (match, punctuation, letter) => {
        return punctuation + letter.toUpperCase();
      }
    );

    // 3. Capitalize "Sie" and "Ihr/Ihre/Ihnen" (formal you) - but not "sie" (they/she)
    // Only capitalize when it's clearly formal context
    corrected = corrected.replace(
      /\b(sie|ihr|ihre|ihnen|ihrem|ihrer)\b/gi,
      (match) => {
        const lower = match.toLowerCase();
        // Capitalize at start of sentence or after comma (likely formal)
        return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
      }
    );

    // 4. Capitalize all German nouns (common ones)
    const commonNouns = [
      "arbeit",
      "auto",
      "bahnhof",
      "bild",
      "brief",
      "büro",
      "computer",
      "deutsch",
      "dialog",
      "essen",
      "familie",
      "fenster",
      "frage",
      "frau",
      "freund",
      "freundin",
      "garten",
      "geld",
      "haus",
      "herr",
      "hotel",
      "information",
      "kind",
      "kino",
      "kunde",
      "land",
      "leute",
      "mann",
      "monat",
      "mutter",
      "name",
      "nummer",
      "ort",
      "person",
      "platz",
      "problem",
      "punkt",
      "raum",
      "restaurant",
      "schule",
      "stadt",
      "stelle",
      "straße",
      "tag",
      "telefon",
      "termin",
      "text",
      "tisch",
      "tür",
      "uhr",
      "urlaub",
      "vater",
      "wagen",
      "weg",
      "welt",
      "woche",
      "wohnung",
      "wort",
      "zeit",
      "zimmer",
      "zug",
      // Days and months
      "montag",
      "dienstag",
      "mittwoch",
      "donnerstag",
      "freitag",
      "samstag",
      "sonntag",
      "januar",
      "februar",
      "märz",
      "april",
      "mai",
      "juni",
      "juli",
      "august",
      "september",
      "oktober",
      "november",
      "dezember",
    ];

    commonNouns.forEach((noun) => {
      const regex = new RegExp(`\\b${noun}\\b`, "gi");
      corrected = corrected.replace(regex, (match) => {
        return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
      });
    });

    // 5. Capitalize "ich" at start of sentence only
    corrected = corrected.replace(/^ich\b/i, "Ich");
    corrected = corrected.replace(/([.!?]\s+)ich\b/g, "$1Ich");

    return corrected;
  };

  const [expandedCorrections, setExpandedCorrections] = useState(new Set());
  const [showRedemittelHelp, setShowRedemittelHelp] = useState(false);

  // Load scenario from catalog
  useEffect(() => {
    async function loadScenario() {
      try {
        const response = await fetch("/data/sprechen/dialogues-catalog.json");
        if (!response.ok) throw new Error("Failed to load catalog");

        const data = await response.json();
        const found = data.scenarios.find((s) => s.id === scenarioId);

        if (!found) {
          throw new Error("Scenario not found");
        }

        setScenario(found);
        setLoading(false);
      } catch (err) {
        console.error("Error loading scenario:", err);
        setError(err.message);
        setLoading(false);
      }
    }

    loadScenario();
  }, [scenarioId]);

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      // Configure for learner-friendly recognition
      recognitionInstance.continuous = true; // Keep listening for pauses
      recognitionInstance.interimResults = true; // Show what's being said
      recognitionInstance.lang = "de-DE";
      recognitionInstance.maxAlternatives = 1;

      // Timer to detect when user has finished speaking
      let silenceTimer = null;
      const SILENCE_DELAY = 2500; // Wait 2.5 seconds of silence before stopping

      recognitionInstance.onresult = (event) => {
        // Clear existing timer
        if (silenceTimer) {
          clearTimeout(silenceTimer);
        }

        // Get the latest result
        const lastResultIndex = event.results.length - 1;
        const result = event.results[lastResultIndex];

        if (result.isFinal) {
          // Update with final transcript and auto-correct
          const transcript = result[0].transcript;
          const correctedText = autoCorrectGermanText(transcript);
          setUserInput(correctedText);

          // Start silence timer - will stop recognition after delay
          silenceTimer = setTimeout(() => {
            if (recognitionInstance) {
              recognitionInstance.stop();
            }
          }, SILENCE_DELAY);
        } else {
          // Show interim results (what's being spoken now)
          const interimTranscript = result[0].transcript;
          const correctedInterim = autoCorrectGermanText(interimTranscript);
          setUserInput(correctedInterim);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        if (event.error !== "aborted" && event.error !== "no-speech") {
          setIsListening(false);
        }
      };

      recognitionInstance.onend = () => {
        if (silenceTimer) {
          clearTimeout(silenceTimer);
        }
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }

    // Initialize speech synthesis
    if ("speechSynthesis" in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  // Function to speak text (Besty's voice) using OpenAI TTS
  const speakText = async (text) => {
    if (!text) return;

    setIsSpeaking(true);

    try {
      // Call backend TTS endpoint
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          voice: "nova", // Warm, friendly feminine voice
        }),
      });

      if (!response.ok) {
        throw new Error("TTS request failed");
      }

      // Get audio blob
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Create and play audio
      const audio = new Audio(audioUrl);

      audio.onplay = () => setIsSpeaking(true);
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      audio.onerror = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
        console.error("Audio playback error");
      };

      await audio.play();
    } catch (error) {
      console.error("TTS Error:", error);
      setIsSpeaking(false);
    }
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageHistory]);

  // Toggle voice input
  const toggleVoiceInput = () => {
    if (!recognition) {
      alert(
        "Spracherkennung wird von deinem Browser nicht unterstützt. Bitte verwende Chrome oder Edge."
      );
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  // Start conversation with AI
  const handleStartConversation = async () => {
    if (!scenario) return;

    setIsAIThinking(true);
    setConversationStarted(true);

    try {
      const result = await startDialogue(
        scenario.aufgabe,
        scenario.leitpunkte,
        scenario.theme,
        scenarioId // Pass scenarioId for session tracking
      );

      setMessageHistory([{ role: "assistant", content: result.message }]);

      // Speak Besty's greeting
      speakText(result.message);
    } catch (err) {
      console.error("Error starting dialogue:", err);

      // Handle protection errors with user-friendly messages
      if (err instanceof ProtectionError) {
        if (err.type === "rate_limit") {
          setError(`Zu schnell! ${err.message}`);
          // Auto-clear error after retry time
          setTimeout(() => setError(null), (err.retryAfter || 2) * 1000);
        } else if (err.type === "message_limit") {
          setError(err.message);
          setIsComplete(true);
        } else if (err.type === "session_expired") {
          setError(err.message);
        }
      } else {
        setError(
          "Fehler beim Starten des Dialogs. Bitte überprüfe deine API-Konfiguration."
        );
      }
    } finally {
      setIsAIThinking(false);
      inputRef.current?.focus();
    }
  };

  // Send user message
  const handleSendMessage = async () => {
    if (!userInput.trim() || isAIThinking) return;

    const userMessage = userInput.trim();
    setUserInput("");
    setIsAIThinking(true);

    try {
      // First, get correction for user's message
      const correction = await correctMessage(userMessage, scenarioId);

      // Add user message to history
      const newHistory = [
        ...messageHistory,
        { role: "user", content: userMessage, correction: correction },
      ];
      setMessageHistory(newHistory);

      // Get AI response
      const result = await continueDialogue(
        messageHistory,
        userMessage,
        scenario.aufgabe,
        scenario.leitpunkte,
        scenario.theme,
        discussedPoints, // Pass discussed points
        scenarioId // Pass scenarioId for session tracking
      );

      // Add AI response
      const updatedHistory = [
        ...newHistory,
        { role: "assistant", content: result.message },
      ];
      setMessageHistory(updatedHistory);

      // Speak Besty's response
      speakText(result.message);

      // Check if all discussion points are covered
      const exchanges = updatedHistory.filter((m) => m.role === "user").length;

      // Analyze which points have been discussed so far
      const currentPoints = await analyzeDiscussedPoints(
        updatedHistory,
        scenario.leitpunkte,
        scenarioId
      );
      setDiscussedPoints(currentPoints);

      const allPointsDiscussed =
        currentPoints.length >= scenario.leitpunkte.length;

      // If all points are discussed, generate natural closing from Besty
      if (allPointsDiscussed && exchanges >= 3) {
        // Generate a natural closing message
        const closingMessage = await continueDialogue(
          updatedHistory,
          "Zusammenfassung", // Signal to AI to close naturally
          scenario.aufgabe,
          scenario.leitpunkte,
          scenario.theme,
          currentPoints,
          scenarioId
        );

        // Add Besty's closing message
        const finalHistory = [
          ...updatedHistory,
          { role: "assistant", content: closingMessage.message },
        ];
        setMessageHistory(finalHistory);

        // Speak the closing
        speakText(closingMessage.message);

        // Small delay before showing feedback
        setTimeout(async () => {
          // Get feedback
          const feedbackResult = await getFeedback(
            finalHistory,
            scenario.leitpunkte,
            scenarioId
          );
          setFeedback(feedbackResult);
          setIsComplete(true);
        }, 2000);
      } else if (exchanges >= 15) {
        // Safety limit - end if too many exchanges
        const feedbackResult = await getFeedback(
          updatedHistory,
          scenario.leitpunkte,
          scenarioId
        );
        setFeedback(feedbackResult);
        setIsComplete(true);
      }
    } catch (err) {
      console.error("Error continuing dialogue:", err);

      // Handle protection errors with user-friendly messages
      if (err instanceof ProtectionError) {
        if (err.type === "rate_limit") {
          setMessageHistory((prev) => [
            ...prev,
            {
              role: "error",
              content: `Zu schnell! ${err.message}`,
            },
          ]);
          // Auto-clear error after retry time
          setTimeout(
            () => {
              setMessageHistory((prev) =>
                prev.filter((m) => m.role !== "error")
              );
            },
            (err.retryAfter || 2) * 1000
          );
        } else if (err.type === "message_limit") {
          setMessageHistory((prev) => [
            ...prev,
            {
              role: "error",
              content: err.message,
            },
          ]);
          setIsComplete(true);
        } else if (err.type === "session_expired") {
          setMessageHistory((prev) => [
            ...prev,
            {
              role: "error",
              content: err.message,
            },
          ]);
        }
      } else {
        setMessageHistory((prev) => [
          ...prev,
          {
            role: "error",
            content: "Fehler bei der Kommunikation. Bitte versuche es erneut.",
          },
        ]);
      }
    } finally {
      setIsAIThinking(false);
      inputRef.current?.focus();
    }
  };

  // Restart conversation
  const handleRestart = () => {
    setMessageHistory([]);
    setUserInput("");
    setConversationStarted(false);
    setIsComplete(false);
    setDiscussedPoints([]);
    setFeedback(null);
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-purple-600 dark:text-purple-400 mx-auto mb-4 animate-spin" />
          <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
            Lade Dialog...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !scenario) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary">
        <div className="text-center bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-red-200 dark:border-red-500/30 max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-lg text-red-600 dark:text-red-400 mb-4">
            {error || "Dialog nicht gefunden"}
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

  const progressPercent =
    scenario.leitpunkte.length > 0
      ? (discussedPoints.length / scenario.leitpunkte.length) * 100
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary">
      {/* Header */}
      <div className="bg-white/90 dark:bg-white/5 backdrop-blur-md border-b border-purple-100 dark:border-purple-500/20 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 pr-16 md:pr-4">
          {/* Session Status - Show message count */}
          {conversationStarted && (
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 mb-3 border border-purple-200 dark:border-purple-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-dark-text-primary">
                  Nachrichten:{" "}
                  {messageHistory.filter((m) => m.role !== "error").length}/30
                </span>
                <span className="text-xs text-gray-600 dark:text-dark-text-secondary">
                  Pro Sitzung maximal 30 Nachrichten
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    messageHistory.filter((m) => m.role !== "error").length >=
                    25
                      ? "bg-red-500"
                      : "bg-purple-600 dark:bg-purple-500"
                  }`}
                  style={{
                    width: `${(messageHistory.filter((m) => m.role !== "error").length / 30) * 100}%`,
                  }}
                />
              </div>
              {messageHistory.filter((m) => m.role !== "error").length >=
                25 && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                  ⚠️ Nur noch{" "}
                  {30 - messageHistory.filter((m) => m.role !== "error").length}{" "}
                  Nachrichten übrig
                </p>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => navigate("/tests/sprechen/trainer")}
              className="flex items-center text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 font-medium transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Alle Dialoge
            </button>
            {conversationStarted && (
              <button
                onClick={handleRestart}
                className="flex items-center text-gray-600 dark:text-dark-text-secondary hover:text-purple-700 dark:hover:text-purple-400 font-medium transition-colors duration-200"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Neu starten
              </button>
            )}
          </div>

          {/* Progress Bar */}
          {conversationStarted && (
            <>
              <div className="w-full bg-purple-100 dark:bg-purple-900/30 rounded-full h-2 mb-2">
                <div
                  className="h-2 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 dark:text-dark-text-secondary text-right">
                {discussedPoints.length} von {scenario.leitpunkte.length}{" "}
                Punkten besprochen
              </p>
            </>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Aufgabe Card */}
        <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-500/20">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0">
              {scenario.number}
            </div>
            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-xs font-medium mb-2">
                {scenario.theme}
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-dark-text-primary mb-2">
                {scenario.title}
              </h1>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-500/30">
            <h2 className="font-bold text-gray-900 dark:text-dark-text-primary mb-2 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              Aufgabe
            </h2>
            <p className="text-gray-700 dark:text-dark-text-secondary leading-relaxed whitespace-pre-wrap">
              {scenario.aufgabe}
            </p>
          </div>
        </div>

        {/* Leitpunkte Checklist */}
        {scenario.leitpunkte && scenario.leitpunkte.length > 0 && (
          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-500/20">
            <h3 className="font-bold text-gray-900 dark:text-dark-text-primary mb-4 flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              Diskussionspunkte
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {scenario.leitpunkte.map((punkt, index) => {
                const isDiscussed = discussedPoints.includes(index);
                return (
                  <div
                    key={index}
                    className={`rounded-lg px-3 py-2 text-sm font-medium text-center transition-all duration-300 ${
                      isDiscussed
                        ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-400 dark:border-green-500 text-green-700 dark:text-green-300"
                        : "bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300"
                    }`}
                  >
                    {isDiscussed && (
                      <CheckCircle2 className="w-4 h-4 inline mr-1" />
                    )}
                    {punkt}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Conversation Area */}
        {!conversationStarted ? (
          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-purple-100 dark:border-purple-500/20 text-center">
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text mb-2">
              Hallo! Ich bin Besty
            </h2>
            <p className="text-gray-700 dark:text-dark-text-primary mb-3 text-lg leading-relaxed">
              Lass uns zusammen für deine{" "}
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                DTZ B1 Prüfung
              </span>{" "}
              üben!
            </p>
            <p className="text-gray-600 dark:text-dark-text-secondary mb-6 leading-relaxed">
              Ich helfe dir durch alle wichtigen Punkte und gebe dir Tipps.
              <br />
              So bereitest du dich perfekt auf das echte Gespräch vor.
            </p>

            {/* Lottie Animation - No background, transparent */}
            <div className="w-48 h-48 mx-auto mb-6">
              <DotLottieReact
                src="https://lottie.host/03951b2d-8905-4508-ad99-6174c3b827e2/y4yWixwYzp.lottie"
                loop
                autoplay
                className="w-full h-full"
              />
            </div>

            <button
              onClick={handleStartConversation}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Gespräch starten
            </button>
          </div>
        ) : (
          <>
            {/* Messages - Modern Chat Interface */}
            <div className="bg-white/95 dark:bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-purple-200/50 dark:border-purple-500/30 overflow-hidden">
              {/* Chat Header with Besty and Animation */}
              <div className="relative px-6 py-6 border-b border-purple-100 dark:border-purple-500/20 overflow-hidden">
                {/* Content */}
                <div className="relative flex items-center gap-4">
                  {/* Lottie Animation Avatar - No background, transparent */}
                  <div className="w-24 h-24 flex-shrink-0">
                    <DotLottieReact
                      src="https://lottie.host/03951b2d-8905-4508-ad99-6174c3b827e2/y4yWixwYzp.lottie"
                      loop
                      autoplay
                      className="w-full h-full"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent flex items-center gap-2">
                      Besty
                      {isSpeaking && (
                        <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full animate-pulse">
                          🔊 Spricht
                        </span>
                      )}
                    </h3>
                    <p className="text-purple-600 dark:text-purple-400 font-medium text-sm mt-1">
                      Hallo! Ich bin Besty, und ich helfe dir beim Üben.
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="p-6 bg-white/60 dark:bg-white/5 backdrop-blur-sm">
                <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 mb-4">
                  {messageHistory.map((msg, index) => (
                    <div key={index} className="space-y-2">
                      {/* Chat Bubble - Modern messaging style */}
                      <div
                        className={`flex gap-3 ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
                      >
                        {/* Avatar - Left side for AI */}
                        {msg.role === "assistant" && (
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 shadow-md flex items-center justify-center">
                            <Bot
                              className="w-5 h-5 text-white"
                              strokeWidth={2}
                            />
                          </div>
                        )}

                        {/* Message Bubble */}
                        <div
                          className={`flex flex-col max-w-[75%] ${msg.role === "assistant" ? "items-start" : "items-end"}`}
                        >
                          {/* Sender Name */}
                          <span
                            className={`text-xs font-semibold mb-1 px-1 ${
                              msg.role === "assistant"
                                ? "text-purple-600"
                                : "text-indigo-600"
                            }`}
                          >
                            {msg.role === "assistant" ? "Besty" : "Du"}
                          </span>

                          {/* Bubble Content */}
                          <div className="relative group">
                            <div
                              className={`px-4 py-3 rounded-2xl shadow-md transition-all duration-200 ${
                                msg.role === "assistant"
                                  ? "bg-purple-600 dark:bg-purple-700 text-white rounded-tl-none shadow-lg"
                                  : msg.role === "error"
                                    ? "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-tr-none border border-red-200 dark:border-red-500/30"
                                    : "bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 text-gray-800 dark:text-dark-text-primary rounded-tr-none border border-purple-200 dark:border-purple-500/30"
                              }`}
                            >
                              <p
                                className={`text-sm leading-relaxed break-words ${msg.role === "assistant" ? "text-white" : ""}`}
                              >
                                {msg.content}
                              </p>

                              {/* Speaking indicator for AI */}
                              {msg.role === "assistant" && isSpeaking && (
                                <div className="mt-2 flex items-center gap-1 text-xs text-purple-600">
                                  <div className="flex gap-0.5">
                                    <span
                                      className="w-1 h-3 bg-purple-500 rounded-full animate-pulse"
                                      style={{ animationDelay: "0ms" }}
                                    ></span>
                                    <span
                                      className="w-1 h-3 bg-purple-600 rounded-full animate-pulse"
                                      style={{ animationDelay: "150ms" }}
                                    ></span>
                                    <span
                                      className="w-1 h-3 bg-indigo-600 rounded-full animate-pulse"
                                      style={{ animationDelay: "300ms" }}
                                    ></span>
                                  </div>
                                  <span>Spricht...</span>
                                </div>
                              )}
                            </div>

                            {/* Replay Button - Appears on hover for AI messages */}
                            {msg.role === "assistant" && (
                              <button
                                onClick={() => speakText(msg.content)}
                                disabled={isSpeaking}
                                className="absolute -right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Nachricht noch einmal hören"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          {/* Timestamp */}
                          <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 px-1">
                            {new Date().toLocaleTimeString("de-DE", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        {/* Avatar - Right side for User */}
                        {msg.role === "user" && (
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 dark:bg-purple-700 shadow-md flex items-center justify-center">
                            <User
                              className="w-5 h-5 text-white"
                              strokeWidth={2}
                            />
                          </div>
                        )}
                      </div>

                      {/* Show correction if there are errors */}
                      {msg.role === "user" &&
                        msg.correction &&
                        msg.correction.hasErrors && (
                          <div className="ml-6 p-2 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-400 dark:border-purple-500 rounded-lg">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
                                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                                    ✏️ Besser:
                                  </span>{" "}
                                  {msg.correction.corrected}
                                </p>
                              </div>
                              {msg.correction.mistakes.length > 0 && (
                                <button
                                  onClick={() => {
                                    setExpandedCorrections((prev) => {
                                      const newSet = new Set(prev);
                                      if (newSet.has(index)) {
                                        newSet.delete(index);
                                      } else {
                                        newSet.add(index);
                                      }
                                      return newSet;
                                    });
                                  }}
                                  className="flex-shrink-0 p-1 rounded hover:bg-purple-100 text-purple-600 transition-all duration-200"
                                  title={
                                    expandedCorrections.has(index)
                                      ? "Details ausblenden"
                                      : "Details anzeigen"
                                  }
                                >
                                  {expandedCorrections.has(index) ? (
                                    <ChevronUp className="w-4 h-4" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4" />
                                  )}
                                </button>
                              )}
                            </div>
                            {expandedCorrections.has(index) &&
                              msg.correction.mistakes.length > 0 && (
                                <div className="mt-2 pt-2 border-t border-purple-200 dark:border-purple-500/30 text-xs text-gray-600 dark:text-dark-text-secondary space-y-1">
                                  {msg.correction.mistakes.map((mistake, i) => (
                                    <p key={i}>• {mistake}</p>
                                  ))}
                                </div>
                              )}
                          </div>
                        )}
                    </div>
                  ))}
                  {isAIThinking && (
                    <div className="flex gap-3 justify-start animate-fadeIn">
                      {/* AI Avatar */}
                      <div className="w-10 h-10 rounded-full bg-purple-600 dark:bg-purple-700 shadow-md flex-shrink-0 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" strokeWidth={2} />
                      </div>

                      {/* Typing Indicator Bubble */}
                      <div className="flex flex-col max-w-[75%] items-start">
                        <span className="text-xs font-semibold mb-1 px-1 text-purple-600 dark:text-purple-400">
                          Besty
                        </span>
                        <div className="px-5 py-4 rounded-2xl rounded-tl-none bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-500/30 shadow-md">
                          <div className="flex gap-1">
                            <span
                              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></span>
                            <span
                              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></span>
                            <span
                              className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Redemittel Help Button */}
                {!isComplete && conversationStarted && (
                  <div className="mb-4">
                    <button
                      onClick={() => setShowRedemittelHelp(!showRedemittelHelp)}
                      className="group w-full px-6 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-2 border-purple-200 dark:border-purple-500/30 rounded-2xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white dark:bg-white/10 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                          <HelpCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-gray-900 dark:text-dark-text-primary text-lg">
                            {showRedemittelHelp
                              ? "Hilfe ausblenden"
                              : "Brauchst du Hilfe?"}
                          </div>
                          <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                            {showRedemittelHelp
                              ? "Klicke zum Schließen"
                              : "Redemittel & Tipps anzeigen"}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`transform transition-transform duration-200 ${showRedemittelHelp ? "rotate-180" : ""}`}
                      >
                        <svg
                          className="w-6 h-6 text-purple-600 dark:text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    {/* Redemittel Dropdown */}
                    {showRedemittelHelp && (
                      <div className="mt-3 bg-white/90 dark:bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-xl border-2 border-purple-200 dark:border-purple-500/30 max-h-[400px] overflow-y-auto">
                        {/* Header */}
                        <div className="mb-3 pb-2 border-b border-purple-100 dark:border-purple-500/20">
                          <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-1 flex items-center gap-2">
                            <div className="p-1.5 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-lg">
                              <HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            Redemittel & Tipps
                          </h3>
                          <p className="text-gray-600 dark:text-dark-text-secondary text-xs ml-8">
                            Benutze diese Phrasen für ein natürliches Gespräch
                          </p>
                        </div>

                        {/* Tips */}
                        <div className="mb-3 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-500/30">
                          <p className="font-bold text-purple-900 dark:text-purple-300 mb-2 flex items-center gap-1.5 text-sm">
                            <span className="text-2xl">💡</span>
                            Wichtige Tipps
                          </p>
                          <ul className="space-y-1.5">
                            {tipps.map((tip, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-xs"
                              >
                                <span className="flex-shrink-0 w-5 h-5 bg-purple-200 dark:bg-purple-700 text-purple-700 dark:text-purple-200 rounded-full flex items-center justify-center font-bold text-[10px]">
                                  {i + 1}
                                </span>
                                <span className="text-gray-800 dark:text-dark-text-secondary leading-snug">
                                  {tip}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Redemittel Sections */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {Object.entries(redemittel).map(([key, section]) => (
                            <div
                              key={key}
                              className="bg-white dark:bg-white/5 rounded-lg p-3 border border-purple-100 dark:border-purple-500/30 hover:border-purple-300 dark:hover:border-purple-400 hover:shadow-md transition-all duration-200"
                            >
                              <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-2 text-sm flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-purple-500 dark:bg-purple-400 rounded-full"></span>
                                {section.title}
                              </h4>
                              {section.phrases && (
                                <ul className="space-y-1">
                                  {section.phrases.map((phrase, i) => (
                                    <li
                                      key={i}
                                      className="text-xs text-gray-700 dark:text-dark-text-secondary flex items-start gap-1.5 leading-snug"
                                    >
                                      <span className="text-purple-500 dark:text-purple-400 font-bold">
                                        •
                                      </span>
                                      <span>{phrase}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {section.questions && (
                                <div className="space-y-2">
                                  {section.questions.map((q, i) => (
                                    <div key={i}>
                                      <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-1">
                                        {q.type}
                                      </p>
                                      <ul className="ml-2 space-y-1">
                                        {q.examples.slice(0, 2).map((ex, j) => (
                                          <li
                                            key={j}
                                            className="text-xs text-gray-600 dark:text-dark-text-secondary flex items-start gap-1.5"
                                          >
                                            <span className="text-purple-400 dark:text-purple-500">
                                              →
                                            </span>
                                            <span>{ex}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {section.sentences && (
                                <ul className="space-y-1">
                                  {section.sentences
                                    .slice(0, 4)
                                    .map((sentence, i) => (
                                      <li
                                        key={i}
                                        className="text-xs text-gray-700 dark:text-dark-text-secondary flex items-start gap-1.5 leading-snug"
                                      >
                                        <span className="text-purple-500 dark:text-purple-400 font-bold">
                                          •
                                        </span>
                                        <span>{sentence}</span>
                                      </li>
                                    ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Input Area */}
                {!isComplete && (
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={
                        isListening
                          ? "🎤 Höre zu..."
                          : "Schreibe oder spreche deine Antwort..."
                      }
                      disabled={isAIThinking || isListening}
                      className="flex-1 px-4 py-3 border-2 border-purple-200 dark:border-purple-500/30 rounded-xl focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors duration-200 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed bg-white dark:bg-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400"
                    />
                    <button
                      onClick={toggleVoiceInput}
                      disabled={isAIThinking}
                      className={`px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                        isListening
                          ? "bg-red-500 text-white hover:bg-red-600 animate-pulse"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                      title={
                        isListening
                          ? "Aufnahme stoppen"
                          : "Sprachaufnahme starten"
                      }
                    >
                      {isListening ? (
                        <MicOff className="w-5 h-5" />
                      ) : (
                        <Mic className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={!userInput.trim() || isAIThinking}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Senden
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Completion & Feedback */}
            {isComplete && feedback && (
              <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-green-200 dark:border-green-500/30">
                <div className="text-center mb-6">
                  <CheckCircle2 className="w-20 h-20 text-green-600 dark:text-green-400 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-dark-text-primary mb-2">
                    Dialog abgeschlossen!
                  </h2>
                  <p className="text-gray-600 dark:text-dark-text-secondary text-lg">
                    Ausgezeichnet! Du hast das Gespräch erfolgreich
                    durchgeführt.
                  </p>
                </div>

                {/* Feedback */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6">
                  <h3 className="font-bold text-gray-900 dark:text-dark-text-primary mb-3">
                    📊 Feedback
                  </h3>

                  {feedback.coverage && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 dark:text-dark-text-primary mb-1">
                        Abdeckung:
                      </p>
                      <p className="text-gray-700 dark:text-dark-text-secondary">
                        {feedback.coverage}
                      </p>
                    </div>
                  )}

                  {feedback.strengths && feedback.strengths.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">
                        ✅ Stärken:
                      </p>
                      <ul className="space-y-1">
                        {feedback.strengths.map((strength, i) => (
                          <li
                            key={i}
                            className="text-gray-700 dark:text-dark-text-secondary flex items-start gap-2"
                          >
                            <span className="text-green-600">•</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {feedback.improvements &&
                    feedback.improvements.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-orange-700 mb-2">
                          💡 Verbesserungsvorschläge:
                        </p>
                        <ul className="space-y-1">
                          {feedback.improvements.map((improvement, i) => (
                            <li
                              key={i}
                              className="text-gray-700 dark:text-dark-text-secondary flex items-start gap-2"
                            >
                              <span className="text-orange-600 dark:text-orange-400">
                                •
                              </span>
                              <span>{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleRestart}
                    className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Nochmal üben
                  </button>
                  <button
                    onClick={() => navigate("/tests/sprechen/trainer")}
                    className="px-8 py-4 bg-white dark:bg-white/10 text-purple-700 dark:text-purple-400 border-2 border-purple-600 dark:border-purple-500 rounded-xl hover:bg-purple-50 dark:hover:bg-white/20 hover:scale-105 transition-all duration-200 font-medium"
                  >
                    Andere Dialoge
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
