/**
 * SchreibenHub - DTZ Schreiben Test Overview
 * Main landing page for the Writing section
 *
 * Features:
 * - Exam structure explanation
 * - Tips & guidelines
 * - Access to Schreiben Trainer (AI email correction)
 */

import { Link } from "react-router-dom";
import {
  FileText,
  Clock,
  Target,
  CheckCircle2,
  Sparkles,
  Mail,
  ArrowRight,
  BookOpen,
  Users,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

export default function SchreibenHub() {
  const [expandedTip, setExpandedTip] = useState(null);

  const examInfo = [
    {
      icon: Clock,
      label: "Zeit",
      value: "30 Minuten",
      color: "from-purple-500 to-indigo-600",
    },
    {
      icon: Target,
      label: "Punkte",
      value: "15 Punkte",
      color: "from-indigo-500 to-purple-600",
    },
    {
      icon: FileText,
      label: "Aufgabe",
      value: "1 Brief schreiben",
      color: "from-purple-600 to-pink-600",
    },
    {
      icon: CheckCircle2,
      label: "Wörter",
      value: "Min. 80 Wörter",
      color: "from-pink-500 to-purple-600",
    },
  ];

  const examStructure = [
    {
      icon: Mail,
      title: "Thema verstehen",
      description:
        "Lies die Aufgabe genau. Welche Situation? Wer ist der Empfänger?",
      color: "from-purple-500 to-indigo-600",
    },
    {
      icon: BookOpen,
      title: "Brief schreiben",
      description: "Mindestens 80 Wörter. Bearbeite alle Inhaltspunkte.",
      color: "from-indigo-500 to-purple-600",
    },
    {
      icon: Users,
      title: "Anrede & Gruß",
      description:
        "Formell: Sie. Informell: du. Passende Grußformeln verwenden.",
      color: "from-purple-600 to-pink-600",
    },
    {
      icon: CheckCircle2,
      title: "Kontrollieren",
      description: "Prüfe Rechtschreibung, Grammatik und alle Inhaltspunkte.",
      color: "from-pink-500 to-purple-600",
    },
  ];

  const tips = [
    {
      id: "structure",
      title: "📝 Brief-Struktur",
      content: [
        {
          subtitle: "Anrede",
          text: "Formell: Sehr geehrte Damen und Herren / Sehr geehrte Frau/Herr [Name]",
          example: "Informell: Liebe/Lieber [Name], Hallo [Name]",
        },
        {
          subtitle: "Einleitung",
          text: "Erkläre kurz, warum du schreibst.",
          example:
            "Formell: 'Ich schreibe Ihnen, weil...' Informell: 'Ich möchte dir schreiben, weil...'",
        },
        {
          subtitle: "Hauptteil",
          text: "Bearbeite alle Inhaltspunkte. Ein Punkt = Ein Absatz.",
          example: "Verwende Konnektoren: deshalb, weil, trotzdem, außerdem",
        },
        {
          subtitle: "Schluss",
          text: "Dankeschön, Entschuldigung, oder Wunsch.",
          example:
            "Formell: 'Ich bedanke mich für Ihr Verständnis.' Informell: 'Ich freue mich auf deine Antwort!'",
        },
        {
          subtitle: "Grußformel",
          text: "Formell: Mit freundlichen Grüßen",
          example: "Informell: Liebe Grüße, Bis bald, Viele Grüße",
        },
      ],
    },
    {
      id: "formal-informal",
      title: "👔 Formell vs. Informell",
      content: [
        {
          subtitle: "Wann formell?",
          text: "Brief an Firma, Behörde, Vermieter, Chef, Arzt (Sie-Form)",
          example: "Beispiel: Beschwerde, Kündigung, Bewerbung, Anfrage",
        },
        {
          subtitle: "Wann informell?",
          text: "Brief an Freunde, Familie, Bekannte (du/ihr-Form)",
          example: "Beispiel: Einladung, Entschuldigung, Vorschlag, Dank",
        },
        {
          subtitle: "Unterschiede",
          text: "Formell: höflich, neutral, klar. Informell: persönlich, freundlich, locker.",
          example:
            "Formell: 'Ich möchte Sie bitten...' Informell: 'Kannst du bitte...'",
        },
      ],
    },
    {
      id: "time-management",
      title: "⏱️ Zeit-Management",
      content: [
        {
          subtitle: "5 Minuten: Planen",
          text: "Lies die Aufgabe genau. Mache Notizen zu jedem Inhaltspunkt.",
          example:
            "Überlege: Was sage ich zu jedem Punkt? In welcher Reihenfolge?",
        },
        {
          subtitle: "20 Minuten: Schreiben",
          text: "Schreibe den Brief. Konzentriere dich auf alle Punkte.",
          example: "Nicht zu lange überlegen! Schreibe flüssig.",
        },
        {
          subtitle: "5 Minuten: Kontrollieren",
          text: "Prüfe: Rechtschreibung, Grammatik, alle Punkte bearbeitet?",
          example: "Zähle Wörter! Mindestens 80 Wörter sind Pflicht.",
        },
      ],
    },
    {
      id: "common-mistakes",
      title: "⚠️ Häufige Fehler vermeiden",
      content: [
        {
          subtitle: "Zu kurz",
          text: "Mindestens 80 Wörter! Lieber 100-120 Wörter schreiben.",
          example: "Tipp: Schreibe zu jedem Punkt 2-3 Sätze.",
        },
        {
          subtitle: "Punkte vergessen",
          text: "Alle Inhaltspunkte müssen im Brief vorkommen!",
          example: "Häkchen: Schreibe jeden Punkt ab und hake ihn ab.",
        },
        {
          subtitle: "Falsche Anrede",
          text: "Formell = Sie, Informell = du. Nicht mischen!",
          example: "Prüfe: Passt die Anrede zum Empfänger?",
        },
        {
          subtitle: "Keine Struktur",
          text: "Brief braucht: Anrede + Einleitung + Hauptteil + Schluss + Gruß",
          example: "Mache Absätze! Ein Absatz = Ein Thema.",
        },
      ],
    },
  ];

  const scoringCriteria = [
    {
      title: "Inhalt",
      points: "5 Punkte",
      description: "Alle Inhaltspunkte behandelt, passende Details",
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Kommunikation",
      points: "5 Punkte",
      description:
        "Korrekte Form (formell/informell), klare Struktur, passende Anrede & Gruß",
      color: "from-indigo-500 to-purple-600",
    },
    {
      title: "Korrektheit",
      points: "5 Punkte",
      description: "Grammatik, Wortschatz, Rechtschreibung, Zeichensetzung",
      color: "from-purple-600 to-pink-600",
    },
  ];

  const toggleTip = (tipId) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Icon */}
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl">
              <FileText size={56} className="text-white" />
            </div>

            {/* Text Content */}
            <div className="text-center lg:text-left flex-1">
              <h1 className="text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
                DTZ Schreiben
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-light mb-4">
                Briefe schreiben & korrigieren lassen
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>30 Minuten</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>15 Punkte</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>1 Brief</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Exam Info Cards */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Info className="w-8 h-8 text-purple-600" />
            Prüfungsformat
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {examInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                >
                  <info.icon size={28} className="text-white" />
                </div>
                <p className="text-sm text-gray-600 mb-1">{info.label}</p>
                <p className="text-lg font-bold text-gray-900">{info.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What to Do */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Was musst du tun?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {examStructure.map((step, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                >
                  <step.icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Scoring Criteria */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Bewertungskriterien
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {scoringCriteria.map((criteria, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {criteria.title}
                  </h3>
                  <span
                    className={`px-3 py-1 bg-gradient-to-r ${criteria.color} text-white text-sm font-bold rounded-full shadow-lg`}
                  >
                    {criteria.points}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {criteria.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section - Accordion */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            📚 Tipps & Hilfe
          </h2>
          <div className="space-y-4">
            {tips.map((tip) => (
              <div
                key={tip.id}
                className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-purple-100 overflow-hidden"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleTip(tip.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-purple-50/50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-bold text-gray-900">
                    {tip.title}
                  </h3>
                  {expandedTip === tip.id ? (
                    <ChevronUp className="w-6 h-6 text-purple-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-purple-600" />
                  )}
                </button>

                {/* Accordion Content */}
                {expandedTip === tip.id && (
                  <div className="px-6 py-4 bg-purple-50/30 border-t border-purple-100 space-y-4">
                    {tip.content.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-bold text-purple-900">
                          {item.subtitle}
                        </h4>
                        <p className="text-sm text-gray-700">{item.text}</p>
                        <p className="text-sm text-gray-600 italic">
                          💡 {item.example}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Main CTA - Trainer */}
        <section className="py-8">
          <Link to="/tests/schreiben/trainer">
            <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-3xl p-8 lg:p-12 shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 border border-purple-400/30 group">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Icon */}
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Sparkles size={56} className="text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-3xl lg:text-4xl font-black text-white mb-3">
                    Schreiben-Trainer mit Besty 🤖
                  </h3>
                  <p className="text-xl text-white/90 mb-4 leading-relaxed">
                    Übe formelle und informelle Briefe. Besty korrigiert deine
                    E-Mails und gibt dir detailliertes Feedback mit Bewertung
                    nach DTZ-Kriterien.
                  </p>
                  <ul className="text-white/80 text-sm space-y-2 mb-6">
                    <li className="flex items-center gap-2 justify-center lg:justify-start">
                      <CheckCircle2 className="w-5 h-5" />
                      16 realistische DTZ-Szenarien
                    </li>
                    <li className="flex items-center gap-2 justify-center lg:justify-start">
                      <CheckCircle2 className="w-5 h-5" />
                      KI-gestützte Fehlerkorrektur
                    </li>
                    <li className="flex items-center gap-2 justify-center lg:justify-start">
                      <CheckCircle2 className="w-5 h-5" />
                      Bewertung nach offiziellen Kriterien
                    </li>
                    <li className="flex items-center gap-2 justify-center lg:justify-start">
                      <CheckCircle2 className="w-5 h-5" />
                      Konkrete Verbesserungsvorschläge
                    </li>
                  </ul>
                </div>

                {/* Arrow */}
                <div className="lg:ml-auto">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:translate-x-2 transition-transform duration-300">
                    <ArrowRight size={32} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
}
