/**
 * SprechenPruefung
 * Information page about the DTZ Speaking test.
 * Shows exam structure, evaluation rubric, and preparation tips.
 * Study guide format - no actual test simulation.
 */
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function SprechenPruefung() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/tests/sprechen")}
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-200 mb-4 group"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-200">
              <ArrowLeft size={16} />
            </div>
            <span className="font-medium">Zurück</span>
          </button>

          <h1 className="text-4xl font-black mb-3">
            DTZ Sprechen – Prüfungsinfo
          </h1>
          <p className="text-white/90 text-lg">
            Alles, was Sie über die mündliche Prüfung wissen müssen
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Exam Overview */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-purple-100">
          <h2 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Prüfungsformat
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
              <Clock size={24} className="text-purple-600 flex-shrink-0" />
              <div>
                <div className="font-bold text-gray-900">15 Min</div>
                <div className="text-xs text-gray-600">Gesamtdauer</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
              <Users size={24} className="text-purple-600 flex-shrink-0" />
              <div>
                <div className="font-bold text-gray-900">2 Prüfer</div>
                <div className="text-xs text-gray-600">Plus 1 Partner</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
              <FileText size={24} className="text-purple-600 flex-shrink-0" />
              <div>
                <div className="font-bold text-gray-900">3 Teile</div>
                <div className="text-xs text-gray-600">
                  Verschiedene Aufgaben
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Teil 1 */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-purple-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-xl font-bold text-gray-900">Sich vorstellen</h3>
            <span className="ml-auto text-sm text-gray-600">ca. 3 Min</span>
          </div>

          <p className="text-gray-700 mb-4">
            Sie stellen sich vor und sprechen über sich selbst. Der Prüfer
            stellt Ihnen Fragen zu verschiedenen Themen aus Ihrem Leben.
          </p>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 mb-4">
            <h4 className="font-bold text-gray-900 mb-2">Mögliche Themen:</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">•</span>
                <span>Name, Herkunft, Wohnort</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">•</span>
                <span>Familie und Freunde</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">•</span>
                <span>Beruf, Arbeit, Ausbildung</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">•</span>
                <span>Hobbys und Freizeit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">•</span>
                <span>Sprachen lernen</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-purple-100 pt-4">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              Tipps:
            </h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>→ Sprechen Sie deutlich und nicht zu schnell</li>
              <li>→ Geben Sie vollständige Antworten (nicht nur ja/nein)</li>
              <li>→ Wenn Sie etwas nicht verstehen, fragen Sie nach</li>
            </ul>
          </div>
        </div>

        {/* Teil 2 */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-purple-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Über ein Thema sprechen
            </h3>
            <span className="ml-auto text-sm text-gray-600">ca. 3 Min</span>
          </div>

          <p className="text-gray-700 mb-4">
            Sie ziehen eine Karte mit einem Alltagsthema und sprechen etwa 1,5
            Minuten darüber. Sie folgen den Leitpunkten auf der Karte.
          </p>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 mb-4">
            <h4 className="font-bold text-gray-900 mb-2">
              Struktur einer Präsentation:
            </h4>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="font-bold text-purple-600 min-w-[24px]">
                  1.
                </span>
                <span>
                  <strong>Einleitung:</strong> Thema nennen und Ihre Situation
                  erklären
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-purple-600 min-w-[24px]">
                  2.
                </span>
                <span>
                  <strong>Hauptteil:</strong> Alle Leitpunkte auf der Karte
                  beantworten
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-purple-600 min-w-[24px]">
                  3.
                </span>
                <span>
                  <strong>Schluss:</strong> Zusammenfassung oder persönliche
                  Meinung
                </span>
              </li>
            </ol>
          </div>

          <div className="border-t border-purple-100 pt-4">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              Tipps:
            </h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>→ Nutzen Sie die Vorbereitungszeit (1 Minute) gut</li>
              <li>→ Arbeiten Sie alle Leitpunkte ab</li>
              <li>→ Sprechen Sie mindestens 1,5 Minuten</li>
              <li>→ Verwenden Sie Konjunktionen (weil, aber, deshalb, ...)</li>
            </ul>
          </div>
        </div>

        {/* Teil 3 */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-purple-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Gemeinsam etwas planen
            </h3>
            <span className="ml-auto text-sm text-gray-600">ca. 3 Min</span>
          </div>

          <p className="text-gray-700 mb-4">
            Sie planen gemeinsam mit Ihrem Partner etwas (z.B. eine Party, einen
            Ausflug). Sie diskutieren verschiedene Vorschläge und einigen sich
            auf eine Lösung.
          </p>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 mb-4">
            <h4 className="font-bold text-gray-900 mb-2">
              Wichtige Redemittel:
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <div className="font-semibold text-purple-600 mb-1">
                  Vorschläge machen:
                </div>
                <div className="text-gray-700">
                  Ich schlage vor, dass... / Wie wäre es mit...?
                </div>
              </div>
              <div>
                <div className="font-semibold text-purple-600 mb-1">
                  Zustimmen:
                </div>
                <div className="text-gray-700">
                  Das ist eine gute Idee! / Einverstanden!
                </div>
              </div>
              <div>
                <div className="font-semibold text-purple-600 mb-1">
                  Ablehnen/Zweifel:
                </div>
                <div className="text-gray-700">
                  Ich bin nicht sicher, ob... / Das finde ich schwierig...
                </div>
              </div>
              <div>
                <div className="font-semibold text-purple-600 mb-1">
                  Kompromiss:
                </div>
                <div className="text-gray-700">
                  Dann machen wir es so... / Wir könnten...
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-100 pt-4">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              Tipps:
            </h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>→ Hören Sie Ihrem Partner aktiv zu</li>
              <li>→ Reagieren Sie auf die Vorschläge Ihres Partners</li>
              <li>→ Machen Sie eigene Vorschläge</li>
              <li>→ Finden Sie gemeinsam eine Lösung</li>
            </ul>
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
