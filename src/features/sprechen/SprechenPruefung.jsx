/**
 * SprechenPruefung
 * DTZ Speaking test information page.
 * Beautiful glass-morphism design with exceptional mobile UX.
 * Maintains brand colors and design consistency.
 */
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  Target,
  MessageSquare,
  Play,
  Lightbulb,
} from "lucide-react";

export default function SprechenPruefung() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Back Button */}
          <Link
            to="/tests/sprechen"
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-200 text-white font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Zurück zu Sprechen
          </Link>

          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
              Prüfungsinfo
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 font-light">
              Alles Wichtige zur mündlichen Prüfung
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Quick Facts Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Prüfungsformat
          </h2>
          <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-light">
            So läuft die mündliche Prüfung ab
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100 text-center hover:shadow-3xl transition-all duration-200 hover:-translate-y-1">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Clock className="w-10 h-10 text-white" />
            </div>
            <div className="text-3xl font-black text-gray-900 mb-2">15 Min</div>
            <div className="text-gray-600">Gesamtdauer</div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100 text-center hover:shadow-3xl transition-all duration-200 hover:-translate-y-1">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Users className="w-10 h-10 text-white" />
            </div>
            <div className="text-3xl font-black text-gray-900 mb-2">
              2 Prüfer
            </div>
            <div className="text-gray-600">Plus 1 Partner</div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100 text-center hover:shadow-3xl transition-all duration-200 hover:-translate-y-1">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Target className="w-10 h-10 text-white" />
            </div>
            <div className="text-3xl font-black text-gray-900 mb-2">
              12 Punkte
            </div>
            <div className="text-gray-600">Maximal möglich</div>
          </div>
        </div>

        {/* Drei Teile Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Die 3 Teile
          </h2>
          <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-light">
            Was Sie in jedem Teil machen
          </p>
        </div>

        {/* Teil 1 */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 lg:p-10 shadow-xl border border-purple-100 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl font-black text-white">1</span>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                Sich vorstellen
              </h3>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">ca. 3 Minuten</span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            Persönliche Fragen beantworten und über sich sprechen
          </p>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-purple-100">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Mögliche Themen
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Name, Herkunft, Wohnort</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Familie und Freunde</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Beruf und Arbeit</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Hobbys und Freizeit</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Sprachen lernen</span>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-purple-600" />
              Tipps
            </h4>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Deutlich sprechen, nicht zu schnell</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Vollständige Antworten geben</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Bei Unklarheit nachfragen</span>
              </div>
            </div>
          </div>
        </div>

        {/* Teil 2 */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 lg:p-10 shadow-xl border border-purple-100 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl font-black text-white">2</span>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                Thema präsentieren
              </h3>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">ca. 3 Minuten</span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            Alltagsthema strukturiert vorstellen
          </p>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-purple-100">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Präsentations-Struktur
            </h4>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                  1
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Einleitung</div>
                  <div className="text-gray-600 text-sm">Thema nennen</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                  2
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Hauptteil</div>
                  <div className="text-gray-600 text-sm">
                    Alle Leitpunkte abarbeiten
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                  3
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Schluss</div>
                  <div className="text-gray-600 text-sm">Zusammenfassung</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-purple-600" />
              Tipps
            </h4>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Vorbereitungszeit nutzen (1 Minute)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Mindestens 1,5 Minuten sprechen</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Konjunktionen verwenden (weil, aber, deshalb)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Teil 3 */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 lg:p-10 shadow-xl border border-purple-100 mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl font-black text-white">3</span>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                Gemeinsam planen
              </h3>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">ca. 3 Minuten</span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            Dialog mit Partner: Etwas zusammen organisieren
          </p>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-purple-100">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              Wichtige Redemittel
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-100">
                <div className="font-semibold text-purple-600 mb-2">
                  Vorschläge machen
                </div>
                <div className="text-gray-700 text-sm">
                  Wie wäre es mit...?
                  <br />
                  Ich schlage vor, dass...
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-100">
                <div className="font-semibold text-purple-600 mb-2">
                  Zustimmen
                </div>
                <div className="text-gray-700 text-sm">
                  Gute Idee!
                  <br />
                  Einverstanden!
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-100">
                <div className="font-semibold text-purple-600 mb-2">
                  Ablehnen
                </div>
                <div className="text-gray-700 text-sm">
                  Ich bin nicht sicher...
                  <br />
                  Das finde ich schwierig...
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-100">
                <div className="font-semibold text-purple-600 mb-2">
                  Kompromiss
                </div>
                <div className="text-gray-700 text-sm">
                  Dann machen wir es so...
                  <br />
                  Wir könnten...
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-purple-600" />
              Tipps
            </h4>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Aktiv zuhören</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Auf Partner reagieren</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Eigene Ideen einbringen</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-600">•</span>
                <span>Gemeinsame Lösung finden</span>
              </div>
            </div>
          </div>
        </div>

        {/* Evaluation Criteria */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-purple-200">
          <h2 className="text-2xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Bewertungskriterien
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle
                size={20}
                className="text-green-500 mt-0.5 flex-shrink-0"
              />
              <div>
                <div className="font-bold text-gray-900">
                  Aufgabenbewältigung
                </div>
                <div className="text-sm text-gray-700">
                  Haben Sie alle Aufgaben vollständig erfüllt?
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle
                size={20}
                className="text-green-500 mt-0.5 flex-shrink-0"
              />
              <div>
                <div className="font-bold text-gray-900">Flüssigkeit</div>
                <div className="text-sm text-gray-700">
                  Können Sie ohne lange Pausen sprechen?
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle
                size={20}
                className="text-green-500 mt-0.5 flex-shrink-0"
              />
              <div>
                <div className="font-bold text-gray-900">
                  Grammatik und Wortschatz
                </div>
                <div className="text-sm text-gray-700">
                  Verwenden Sie passende Strukturen und Wörter?
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle
                size={20}
                className="text-green-500 mt-0.5 flex-shrink-0"
              />
              <div>
                <div className="font-bold text-gray-900">Aussprache</div>
                <div className="text-sm text-gray-700">
                  Können andere Sie gut verstehen?
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* General Tips */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle size={24} className="text-yellow-600" />
            Allgemeine Tipps für die Prüfung
          </h2>

          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-0.5">✓</span>
              <span>Seien Sie pünktlich und bringen Sie Ihren Ausweis mit</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-0.5">✓</span>
              <span>
                Bleiben Sie ruhig und entspannt – die Prüfer wollen Sie nicht
                "fangen"
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-0.5">✓</span>
              <span>
                Fehler sind normal – wichtig ist, dass Sie weitersprechen
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-0.5">✓</span>
              <span>
                Wenn Sie etwas nicht verstehen, fragen Sie: "Können Sie das
                bitte wiederholen?"
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-0.5">✓</span>
              <span>
                Üben Sie mit Freunden oder im Deutschkurs – Übung macht den
                Meister!
              </span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-4">
          <Link
            to="/tests/sprechen"
            className="px-6 py-3 bg-white/80 backdrop-blur-md text-gray-700 rounded-xl font-medium hover:shadow-md transition-all duration-200 border border-purple-100"
          >
            Zurück zur Übersicht
          </Link>

          <Link
            to="/tests/sprechen/uebung/teil1"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <span>Jetzt üben!</span>
            <ArrowLeft size={16} className="rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
