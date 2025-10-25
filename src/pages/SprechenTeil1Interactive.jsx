/**
 * SprechenTeil1Interactive - Interactive Learning for DTZ Sprechen Teil 1
 *
 * Purpose: Help B1 learners practice introducing themselves for the DTZ exam.
 * Features: Video examples, Redemittel bank, practice mode, personalized hints
 * Design: Mobile-first, purple gradient theme, smooth animations
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  RotateCcw,
  CheckCircle,
  Mic,
  Volume2,
  Lightbulb,
  User,
  MapPin,
  Briefcase,
  Users as UsersIcon,
  Heart,
  Calendar,
  Award,
  ChevronRight,
  Eye,
  MessageSquare,
} from "lucide-react";

// The 6 essential questions for Teil 1
const TEIL1_QUESTIONS = [
  {
    id: 1,
    question: "Wie heißen Sie?",
    category: "Name",
    icon: User,
    color: "from-purple-500 to-pink-500",
    redemittel: ["Ich heiße...", "Mein Name ist...", "Ich bin..."],
    examples: [
      "Ich heiße Maria Schmidt.",
      "Mein Name ist Ahmed Ali.",
      "Mein Vorname ist Anna und mein Nachname ist Müller.",
    ],
    hints: [
      "Sprechen Sie deutlich",
      "Sagen Sie Vor- und Nachnamen",
      "Lächeln Sie beim Sprechen",
    ],
  },
  {
    id: 2,
    question: "Woher kommen Sie?",
    category: "Herkunft",
    icon: MapPin,
    color: "from-blue-500 to-cyan-500",
    redemittel: [
      "Ich komme aus...",
      "Ich bin aus...",
      "Ich komme ursprünglich aus...",
      "Mein Heimatland ist...",
    ],
    examples: [
      "Ich komme aus der Türkei, aus Istanbul.",
      "Ich bin aus Syrien. Ich komme aus Damaskus.",
      "Ich komme ursprünglich aus Polen, aus Warschau.",
    ],
    hints: [
      "Nennen Sie das Land",
      "Sie können auch die Stadt nennen",
      "Sprechen Sie in ganzen Sätzen",
    ],
  },
  {
    id: 3,
    question: "Wo wohnen Sie jetzt?",
    category: "Wohnort",
    icon: MapPin,
    color: "from-green-500 to-emerald-500",
    redemittel: [
      "Ich wohne in...",
      "Ich lebe in...",
      "Ich wohne seit... in...",
      "Ich bin seit... hier in...",
    ],
    examples: [
      "Ich wohne in Berlin, in Kreuzberg.",
      "Ich lebe seit drei Jahren in München.",
      "Ich wohne jetzt in Hamburg. Das ist im Norden von Deutschland.",
    ],
    hints: [
      "Stadt nennen reicht",
      "Optional: Stadtteil oder wie lange",
      "Nicht zu viele Details",
    ],
  },
  {
    id: 4,
    question: "Was machen Sie beruflich?",
    category: "Beruf",
    icon: Briefcase,
    color: "from-orange-500 to-red-500",
    redemittel: [
      "Ich arbeite als...",
      "Ich bin... von Beruf",
      "Ich bin zurzeit...",
      "Ich bin arbeitslos",
      "Ich suche eine Arbeit als...",
    ],
    examples: [
      "Ich arbeite als Krankenpfleger in einem Krankenhaus.",
      "Ich bin Studentin. Ich studiere Informatik.",
      "Ich bin zurzeit arbeitslos, aber ich suche eine Arbeit als Koch.",
    ],
    hints: [
      "Ehrlich antworten",
      "Bei Arbeitslosigkeit nicht schämen",
      "Kurz und klar",
    ],
  },
  {
    id: 5,
    question: "Sind Sie verheiratet? / Haben Sie Kinder?",
    category: "Familie",
    icon: UsersIcon,
    color: "from-pink-500 to-rose-500",
    redemittel: [
      "Ja, ich bin verheiratet",
      "Nein, ich bin ledig/geschieden",
      "Ja, ich habe... Kinder",
      "Nein, ich habe keine Kinder",
      "Ich habe einen Sohn/eine Tochter",
    ],
    examples: [
      "Ja, ich bin verheiratet und habe zwei Kinder.",
      "Nein, ich bin noch ledig. Ich habe keine Kinder.",
      "Ich bin geschieden und habe eine Tochter. Sie ist 8 Jahre alt.",
    ],
    hints: [
      "Sie müssen nicht alles erzählen",
      "Kurze Antwort reicht",
      "Alter der Kinder ist optional",
    ],
  },
  {
    id: 6,
    question: "Was machen Sie in Ihrer Freizeit?",
    category: "Hobbys",
    icon: Heart,
    color: "from-violet-500 to-purple-500",
    redemittel: [
      "In meiner Freizeit...",
      "Ich... gerne",
      "Mein Hobby ist...",
      "Ich interessiere mich für...",
      "Am Wochenende...",
    ],
    examples: [
      "In meiner Freizeit lese ich gerne Bücher.",
      "Ich spiele gerne Fußball mit meinen Freunden.",
      "Mein Hobby ist Kochen. Ich koche gerne für meine Familie.",
    ],
    hints: [
      "1-2 Hobbys reichen",
      "Einfache Aktivitäten sind OK",
      "Zeigen Sie Interesse",
    ],
  },
];

export default function SprechenTeil1Interactive() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("intro"); // intro, learn, complete
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [viewMode, setViewMode] = useState("example"); // example, redemittel, practice
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [showHints, setShowHints] = useState(true);

  const currentQuestion = TEIL1_QUESTIONS[currentQuestionIndex];
  const Icon = currentQuestion?.icon || User;
  const progress = (completedQuestions.size / TEIL1_QUESTIONS.length) * 100;

  const handleNextQuestion = () => {
    if (currentQuestionIndex < TEIL1_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setViewMode("example");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setMode("complete");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setViewMode("example");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleMarkComplete = () => {
    const newCompleted = new Set(completedQuestions);
    newCompleted.add(currentQuestionIndex);
    setCompletedQuestions(newCompleted);

    // Auto-advance to next question
    setTimeout(() => {
      handleNextQuestion();
    }, 800);
  };

  const handleGoToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setViewMode("example");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Intro Screen
  if (mode === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-md border-b border-purple-100 sticky top-0 z-30 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <button
              onClick={() => navigate("/tests/sprechen")}
              className="w-10 h-10 rounded-full bg-white hover:bg-purple-50 border border-purple-100 hover:border-purple-300 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group shadow-sm"
              aria-label="Zurück"
            >
              <ArrowLeft className="w-5 h-5 text-purple-600 group-hover:-translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Intro Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <User className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Teil 1: Sich vorstellen
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Lernen Sie, sich perfekt auf Deutsch vorzustellen
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-3xl font-black text-purple-600 mb-2">
                3 Min
              </div>
              <p className="text-sm text-gray-600">Prüfungsdauer</p>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-3xl font-black text-indigo-600 mb-2">
                6 Fragen
              </div>
              <p className="text-sm text-gray-600">Persönliche Fragen</p>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-pink-200 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-pink-600" />
              </div>
              <div className="text-3xl font-black text-pink-600 mb-2">
                4 Punkte
              </div>
              <p className="text-sm text-gray-600">Maximal möglich</p>
            </div>
          </div>

          {/* What to expect */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 lg:p-12 shadow-xl border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Was erwartet Sie?
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    1. Video-Beispiel ansehen
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Sehen Sie, wie andere die Fragen beantworten
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    2. Redemittel lernen
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Nützliche Sätze und Strukturen für Ihre Antworten
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <Mic className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    3. Selbst üben
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Antworten Sie laut und üben Sie Ihre Vorstellung
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    4. Tipps & Hinweise
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Hilfreiche Tipps für eine erfolgreiche Prüfung
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={() => setMode("learn")}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
            >
              <span>Jetzt starten</span>
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Complete Screen
  if (mode === "complete") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8 shadow-lg">
          <div className="max-w-4xl mx-auto px-4">
            <button
              onClick={() => navigate("/tests/sprechen")}
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-200 mb-4 group"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-200">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="font-medium">Zurück</span>
            </button>

            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 animate-bounce">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-black mb-2">Ausgezeichnet! 🎉</h1>
              <p className="text-white/90 text-lg">
                Sie haben alle 6 Fragen geübt!
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Summary */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Das haben Sie gelernt:
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {TEIL1_QUESTIONS.map((q, index) => {
                const QuestionIcon = q.icon;
                return (
                  <div
                    key={q.id}
                    className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-100"
                  >
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${q.color} rounded-lg flex items-center justify-center shadow-md`}
                    >
                      <QuestionIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 text-sm">
                        {q.question}
                      </div>
                      <div className="text-xs text-purple-600">
                        {q.category}
                      </div>
                    </div>
                    {completedQuestions.has(index) && (
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Tips for exam */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                Wichtige Prüfungstipps
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>
                    <strong>Sprechen Sie klar und deutlich</strong> - Die Prüfer
                    müssen Sie gut verstehen
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>
                    <strong>Antworten Sie in ganzen Sätzen</strong> - Nicht nur
                    &quot;Berlin&quot;, sondern &quot;Ich wohne in Berlin&quot;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>
                    <strong>Bleiben Sie ruhig und freundlich</strong> - Die
                    Prüfer möchten, dass Sie Erfolg haben
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>
                    <strong>Üben Sie laut</strong> - Je öfter Sie üben, desto
                    sicherer werden Sie
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                setMode("learn");
                setCurrentQuestionIndex(0);
                setViewMode("example");
                setCompletedQuestions(new Set());
              }}
              className="flex-1 px-6 py-4 bg-white border-2 border-purple-300 text-purple-700 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Noch einmal üben</span>
            </button>

            <button
              onClick={() => navigate("/tests/sprechen/bild-beschreiben")}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Weiter zu Teil 2</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Learning Mode - Main Practice Interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 pb-24">
      {/* Sticky Header with Progress */}
      <div className="bg-white/90 backdrop-blur-md border-b border-purple-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Back Button + Title */}
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/tests/sprechen")}
              className="w-10 h-10 rounded-full bg-white hover:bg-purple-50 border border-purple-100 hover:border-purple-300 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group shadow-sm"
              aria-label="Zurück"
            >
              <ArrowLeft className="w-5 h-5 text-purple-600 group-hover:-translate-x-0.5 transition-transform duration-200" />
            </button>
            <h1 className="text-xl lg:text-2xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Teil 1: Sich vorstellen
            </h1>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium text-gray-600">
                Frage {currentQuestionIndex + 1} von {TEIL1_QUESTIONS.length}
              </span>
              <span className="font-semibold text-purple-600">
                {completedQuestions.size} geübt
              </span>
            </div>
            <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Pills Navigation */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-max pb-2">
              {TEIL1_QUESTIONS.map((q, idx) => {
                const QuestionIcon = q.icon;
                return (
                  <button
                    key={q.id}
                    onClick={() => handleGoToQuestion(idx)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      idx === currentQuestionIndex
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-105"
                        : completedQuestions.has(idx)
                          ? "bg-purple-100 text-purple-700 border border-purple-200"
                          : "bg-white text-gray-600 border border-purple-100 hover:bg-purple-50"
                    }`}
                  >
                    <QuestionIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">{q.category}</span>
                    {completedQuestions.has(idx) && (
                      <CheckCircle className="w-3 h-3" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Question Header */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 lg:p-8 shadow-xl border border-purple-100 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div
              className={`w-14 h-14 bg-gradient-to-r ${currentQuestion.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
            >
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-purple-600 mb-1">
                {currentQuestion.category}
              </div>
              <h2 className="text-2xl lg:text-3xl font-black text-gray-900">
                {currentQuestion.question}
              </h2>
            </div>
          </div>

          {/* View Mode Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setViewMode("example")}
              className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                viewMode === "example"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                  : "bg-purple-50 text-purple-700 hover:bg-purple-100"
              }`}
            >
              <Play className="w-4 h-4 inline mr-2" />
              Video & Beispiele
            </button>
            <button
              onClick={() => setViewMode("redemittel")}
              className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                viewMode === "redemittel"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                  : "bg-purple-50 text-purple-700 hover:bg-purple-100"
              }`}
            >
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Redemittel
            </button>
            <button
              onClick={() => setViewMode("practice")}
              className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                viewMode === "practice"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                  : "bg-purple-50 text-purple-700 hover:bg-purple-100"
              }`}
            >
              <Mic className="w-4 h-4 inline mr-2" />
              Jetzt Sie!
            </button>
          </div>

          {/* Content Area */}
          {viewMode === "example" && (
            <div className="space-y-6">
              {/* Video Player */}
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl overflow-hidden">
                <div className="aspect-video flex items-center justify-center">
                  <video
                    controls
                    className="w-full h-full object-contain"
                    poster="/images/video-placeholder.jpg"
                  >
                    <source
                      src="/video/sprechen/teil1-beispiel.mp4"
                      type="video/mp4"
                    />
                    Ihr Browser unterstützt das Video-Tag nicht.
                  </video>
                </div>
              </div>

              {/* Example Answers */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  Beispiel-Antworten
                </h3>
                <div className="space-y-3">
                  {currentQuestion.examples.map((example, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-100"
                    >
                      <Volume2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">{example}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {viewMode === "redemittel" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  Nützliche Satzanfänge
                </h3>
                <div className="grid gap-3">
                  {currentQuestion.redemittel.map((phrase, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
                          {idx + 1}
                        </div>
                        <p className="text-lg font-semibold text-gray-900">
                          {phrase}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  Tipps für diese Frage
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {currentQuestion.hints.map((hint, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold mt-0.5">•</span>
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {viewMode === "practice" && (
            <div className="space-y-6">
              {/* Practice Video */}
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl overflow-hidden">
                <div className="aspect-video flex items-center justify-center">
                  <video
                    controls
                    className="w-full h-full object-contain"
                    poster="/images/video-placeholder.jpg"
                  >
                    <source
                      src="/video/sprechen/teil1-jetzt-sie.mp4"
                      type="video/mp4"
                    />
                    Ihr Browser unterstützt das Video-Tag nicht.
                  </video>
                </div>
              </div>

              {/* Practice Instructions */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Mic className="w-5 h-5 text-indigo-600" />
                  So üben Sie richtig
                </h4>
                <ol className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <span>Lesen Sie die Frage laut</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <span>Denken Sie kurz nach (10-15 Sekunden)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <span>Antworten Sie laut in ganzen Sätzen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <span>Wiederholen Sie mehrmals, bis Sie sicher sind</span>
                  </li>
                </ol>
              </div>

              {/* Quick Redemittel Reference */}
              <div className="bg-white/50 rounded-xl p-4 border border-purple-100">
                <div className="text-xs font-bold text-purple-600 mb-2">
                  SCHNELL-REFERENZ:
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentQuestion.redemittel.map((phrase, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white rounded-lg text-xs text-purple-700 border border-purple-200 font-medium shadow-sm"
                    >
                      {phrase}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hints Toggle */}
        {showHints && (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200 mb-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-bold text-gray-900 mb-2">
                    💡 Wichtiger Hinweis
                  </div>
                  <p className="text-sm text-gray-700">
                    Nehmen Sie sich Zeit, jede Frage mehrmals laut zu üben. In
                    der Prüfung haben Sie nur eine Chance!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowHints(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-purple-100 p-4 shadow-lg z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              currentQuestionIndex === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-purple-600 border-2 border-purple-200 hover:bg-purple-50 hover:scale-105 shadow-md"
            }`}
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            <span className="hidden sm:inline">Zurück</span>
          </button>

          <button
            onClick={handleMarkComplete}
            className="flex-1 max-w-xs px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Geübt!</span>
          </button>

          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === TEIL1_QUESTIONS.length - 1}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              currentQuestionIndex === TEIL1_QUESTIONS.length - 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-purple-600 border-2 border-purple-200 hover:bg-purple-50 hover:scale-105 shadow-md"
            }`}
          >
            <span className="hidden sm:inline">Weiter</span>
            <ChevronRight className="w-4 h-4 inline ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
