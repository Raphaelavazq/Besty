import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:gap-3 transition-all mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Zurück zur Startseite
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl mb-6 shadow-xl">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 pb-2">
            Nutzungsbedingungen
          </h1>
          <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
            Allgemeine Geschäftsbedingungen (AGB)
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Letzte Aktualisierung: November 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-purple-100 dark:border-purple-500/30 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              1. Geltungsbereich
            </h2>
            <p className="text-gray-700 dark:text-dark-text-secondary leading-relaxed">
              Diese Nutzungsbedingungen gelten für die Nutzung von{" "}
              <strong>B1 Bestie</strong>, einer Online-Lernplattform für die
              deutsche Sprache und den Einbürgerungstest. Durch die
              Registrierung und Nutzung unserer Dienste akzeptierst du diese
              Bedingungen.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              2. Leistungsbeschreibung
            </h2>
            <p className="text-gray-700 dark:text-dark-text-secondary leading-relaxed mb-4">
              B1 Bestie ist eine <strong>kostenlose Bildungsplattform</strong>{" "}
              und bietet:
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-dark-text-secondary">
                  Übungsmaterial für Deutsch auf B1-Niveau (Hören, Lesen,
                  Schreiben, Sprechen)
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-dark-text-secondary">
                  460 offizielle Fragen für den Einbürgerungstest
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-dark-text-secondary">
                  Fortschrittsverfolgung und Lernstatistiken
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-dark-text-secondary">
                  Prüfungssimulationen
                </span>
              </div>
            </div>
          </section>

          {/* Registration */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              3. Registrierung und Account
            </h2>
            <div className="space-y-4">
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-500/30">
                <h3 className="font-bold text-gray-900 dark:text-dark-text-primary mb-2">
                  Du verpflichtest dich:
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-dark-text-secondary">
                  <li>
                    • Wahrheitsgemäße Angaben bei der Registrierung zu machen
                  </li>
                  <li>• Dein Passwort geheim zu halten</li>
                  <li>
                    • Uns umgehend zu informieren, wenn dein Account
                    kompromittiert wurde
                  </li>
                  <li>• Nur einen Account pro Person anzulegen</li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-dark-text-secondary">
                Du bist für alle Aktivitäten unter deinem Account
                verantwortlich.
              </p>
            </div>
          </section>

          {/* User Conduct */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              4. Nutzerverhalten
            </h2>
            <div className="space-y-4">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-500/30">
                <h3 className="font-bold text-gray-900 dark:text-dark-text-primary mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  Erlaubt:
                </h3>
                <ul className="space-y-1 text-gray-700 dark:text-dark-text-secondary">
                  <li>• Persönliche Nutzung zum Lernen</li>
                  <li>• Teilen von Lernempfehlungen mit Freunden</li>
                  <li>• Feedback und Verbesserungsvorschläge</li>
                </ul>
              </div>

              <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-4 border border-rose-200 dark:border-rose-500/30">
                <h3 className="font-bold text-gray-900 dark:text-dark-text-primary mb-2 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                  Verboten:
                </h3>
                <ul className="space-y-1 text-gray-700 dark:text-dark-text-secondary">
                  <li>• Automatisiertes Scraping oder Kopieren von Inhalten</li>
                  <li>• Weitergabe deiner Zugangsdaten an Dritte</li>
                  <li>• Kommerzielle Nutzung ohne Genehmigung</li>
                  <li>
                    • Manipulation der Plattform oder Umgehung von
                    Sicherheitsmaßnahmen
                  </li>
                  <li>
                    • Belästigung anderer Nutzer (falls Community-Features
                    existieren)
                  </li>
                  <li>
                    • Verbreitung illegaler, beleidigender oder schädlicher
                    Inhalte
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              5. Urheberrecht und geistiges Eigentum
            </h2>
            <p className="text-gray-700 dark:text-dark-text-secondary leading-relaxed mb-4">
              Alle Inhalte auf B1 Bestie (Texte, Bilder, Audio, Videos,
              Software) sind urheberrechtlich geschützt.
            </p>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-500/30">
              <p className="text-gray-700 dark:text-dark-text-secondary">
                <strong>Einbürgerungstest-Fragen:</strong> Die 460 offiziellen
                Fragen stammen vom Bundesamt für Migration und Flüchtlinge
                (BAMF) und sind öffentlich zugänglich. Wir haben sie zu
                Bildungszwecken aufbereitet.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              6. Haftungsausschluss
            </h2>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-500/30 space-y-3">
              <p className="text-gray-700 dark:text-dark-text-secondary">
                <strong>Wichtig:</strong> B1 Bestie ist ein{" "}
                <strong>inoffizielles Lernwerkzeug</strong>. Wir garantieren
                nicht:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-dark-text-secondary space-y-1 ml-4">
                <li>Das Bestehen von offiziellen Prüfungen</li>
                <li>Die Vollständigkeit oder Aktualität aller Inhalte</li>
                <li>Ununterbrochene Verfügbarkeit der Plattform</li>
                <li>Fehlerfreiheit der Software</li>
              </ul>
              <p className="text-gray-700 dark:text-dark-text-secondary">
                Die Nutzung erfolgt auf eigene Verantwortung. Wir empfehlen,
                zusätzliche offizielle Ressourcen zu nutzen.
              </p>
            </div>
          </section>

          {/* Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              7. Haftungsbeschränkung
            </h2>
            <p className="text-gray-700 dark:text-dark-text-secondary leading-relaxed">
              Wir haften nicht für:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-dark-text-secondary space-y-2 ml-4 mt-3">
              <li>Indirekte Schäden oder Folgeschäden</li>
              <li>Datenverlust durch technische Probleme</li>
              <li>Schäden durch die Nutzung von Drittanbieter-Diensten</li>
              <li>Schäden durch höhere Gewalt</li>
            </ul>
            <p className="text-gray-700 dark:text-dark-text-secondary mt-4">
              Die Haftung für Vorsatz und grobe Fahrlässigkeit bleibt unberührt.
            </p>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              8. Datenschutz
            </h2>
            <p className="text-gray-700 dark:text-dark-text-secondary leading-relaxed">
              Die Verarbeitung deiner personenbezogenen Daten erfolgt gemäß
              unserer{" "}
              <Link
                to="/privacy"
                className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
              >
                Datenschutzerklärung
              </Link>
              . Diese ist Bestandteil dieser Nutzungsbedingungen.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              9. Kündigung und Sperrung
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-dark-text-secondary">
                <strong>Du kannst:</strong> Deinen Account jederzeit ohne Angabe
                von Gründen löschen (in den Profileinstellungen).
              </p>
              <p className="text-gray-700 dark:text-dark-text-secondary">
                <strong>Wir können:</strong> Deinen Account sperren oder
                löschen, wenn du gegen diese Nutzungsbedingungen verstößt,
                insbesondere bei:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-dark-text-secondary space-y-1 ml-4">
                <li>Missbrauch der Plattform</li>
                <li>Illegalen Aktivitäten</li>
                <li>Gefährdung anderer Nutzer</li>
                <li>Manipulation von Daten</li>
              </ul>
            </div>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              10. Änderungen der Nutzungsbedingungen
            </h2>
            <p className="text-gray-700 dark:text-dark-text-secondary leading-relaxed">
              Wir behalten uns vor, diese Nutzungsbedingungen bei Bedarf
              anzupassen. Über wesentliche Änderungen informieren wir dich
              rechtzeitig per E-Mail. Wenn du den Änderungen nicht zustimmst,
              kannst du deinen Account löschen.
            </p>
          </section>

          {/* Applicable Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              11. Anwendbares Recht
            </h2>
            <p className="text-gray-700 dark:text-dark-text-secondary leading-relaxed">
              Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand
              ist der Sitz des Betreibers.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              12. Salvatorische Klausel
            </h2>
            <p className="text-gray-700 dark:text-dark-text-secondary leading-relaxed">
              Sollten einzelne Bestimmungen dieser Nutzungsbedingungen unwirksam
              sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen
              hiervon unberührt.
            </p>
          </section>

          {/* Contact */}
          <section className="border-t border-gray-200 dark:border-purple-500/30 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              Kontakt
            </h2>
            <p className="text-gray-700 dark:text-dark-text-secondary leading-relaxed">
              Bei Fragen zu diesen Nutzungsbedingungen kontaktiere uns bitte
              unter:
              <br />
              <a
                href="mailto:connectwithrafaela@gmail.com"
                className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
              >
                connectwithrafaela@gmail.com
              </a>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              Stand: November 2025
            </p>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/privacy"
            className="px-6 py-3 bg-white dark:bg-white/10 text-purple-600 dark:text-purple-400 border-2 border-purple-600 rounded-xl font-bold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all text-center"
          >
            Datenschutzerklärung
          </Link>
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-center"
          >
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
