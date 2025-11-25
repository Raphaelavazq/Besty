import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  Database,
  Lock,
  FileText,
  Mail,
  Trash2,
  Download,
} from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 py-8 md:py-12 px-4">
      {/* Floating Orbs Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white hover:gap-3 transition-all mb-6 md:mb-8 bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl font-semibold shadow-lg border border-white/30"
        >
          <ArrowLeft className="w-5 h-5" />
          Zurück
        </Link>

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-3xl mb-6 shadow-2xl border border-white/30">
            <Shield className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4 tracking-tight">
            Datenschutzerklärung
          </h1>
          <p className="text-base md:text-lg text-white/90 font-medium">
            Letzte Aktualisierung: November 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl space-y-6 md:space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" />
              Einleitung
            </h2>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              Der Schutz deiner persönlichen Daten ist uns sehr wichtig. Diese
              Datenschutzerklärung informiert dich darüber, welche Daten wir
              erheben, wie wir sie verwenden und welche Rechte du hast. B1
              Bestie ist eine Lernplattform für die deutsche Sprache und den
              Einbürgerungstest.
            </p>
          </section>

          {/* Data Controller */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <FileText className="w-5 h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" />
              Verantwortlicher
            </h2>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              Verantwortlich für die Datenverarbeitung ist:
              <br />
              <span className="font-semibold">B1 Bestie</span>
              <br />
              Deutschland
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <Database className="w-5 h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" />
              Welche Daten erheben wir?
            </h2>

            <div className="space-y-3 md:space-y-4">
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-4 md:p-5 border border-purple-200 dark:border-purple-500/30">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm md:text-base">
                  Bei der Registrierung:
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm md:text-base">
                  <li>Vollständiger Name</li>
                  <li>E-Mail-Adresse</li>
                  <li>Passwort (verschlüsselt gespeichert)</li>
                  <li>Bundesland (für Einbürgerungstest-Fragen)</li>
                  <li>Registrierungsdatum</li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-4 md:p-5 border border-purple-200 dark:border-purple-500/30">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm md:text-base">
                  Bei der Nutzung:
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm md:text-base">
                  <li>Lernfortschritt (Fragen beantwortet, richtig/falsch)</li>
                  <li>Lernsitzungen (Datum, Dauer, Modus)</li>
                  <li>Markierte Fragen und Notizen</li>
                  <li>Prüfungssimulationen und Ergebnisse</li>
                  <li>Sprachpräferenzen</li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-500/30">
                <h3 className="font-bold text-gray-900 dark:text-dark-text-primary mb-2">
                  Automatisch erfasst:
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-dark-text-secondary space-y-1">
                  <li>IP-Adresse (anonymisiert)</li>
                  <li>Browser-Typ und Version</li>
                  <li>Betriebssystem</li>
                  <li>Zugriffszeitpunkt</li>
                  <li>Technische Cookies (nur für Anmeldung erforderlich)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Usage */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4 flex items-center gap-3">
              <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              Wie verwenden wir deine Daten?
            </h2>
            <ul className="space-y-3 text-gray-700 dark:text-dark-text-secondary">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-sm">
                  ✓
                </span>
                <span>
                  <strong>Account-Verwaltung:</strong> Anmeldung,
                  Authentifizierung, Passwort-Reset
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-sm">
                  ✓
                </span>
                <span>
                  <strong>Lernfortschritt:</strong> Speicherung deiner
                  Antworten, Statistiken und Empfehlungen
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-sm">
                  ✓
                </span>
                <span>
                  <strong>Personalisierung:</strong> Anpassung der Lerninhalte
                  an dein Bundesland
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-sm">
                  ✓
                </span>
                <span>
                  <strong>Verbesserung:</strong> Analyse zur Verbesserung der
                  Plattform (anonymisiert)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-sm">
                  ✓
                </span>
                <span>
                  <strong>Support:</strong> Bei Anfragen und technischen
                  Problemen
                </span>
              </li>
            </ul>
          </section>

          {/* Data Storage */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4 flex items-center gap-3">
              <Database className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              Wo speichern wir deine Daten?
            </h2>
            <p className="text-gray-700 dark:text-dark-text-secondary leading-relaxed mb-4">
              Deine Daten werden sicher auf Servern in der{" "}
              <strong>Europäischen Union</strong> gespeichert:
            </p>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-500/30">
              <p className="text-gray-700 dark:text-dark-text-secondary">
                <strong>Supabase (Frankfurt, Deutschland)</strong>
                <br />
                Supabase ist unser Datenbank- und Authentifizierungsanbieter.
                Alle Daten werden DSGVO-konform in EU-Rechenzentren gespeichert
                und verschlüsselt übertragen.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4 flex items-center gap-3">
              <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              Deine Rechte (DSGVO)
            </h2>
            <p className="text-gray-700 dark:text-dark-text-secondary mb-4">
              Du hast jederzeit folgende Rechte:
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h3 className="font-bold text-gray-900 dark:text-dark-text-primary">
                    Auskunft
                  </h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
                  Welche Daten wir über dich gespeichert haben
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Download className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h3 className="font-bold text-gray-900 dark:text-dark-text-primary">
                    Datenexport
                  </h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
                  Alle deine Daten als JSON-Datei herunterladen
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h3 className="font-bold text-gray-900 dark:text-dark-text-primary">
                    Berichtigung
                  </h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
                  Falsche Daten korrigieren lassen
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Trash2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h3 className="font-bold text-gray-900 dark:text-dark-text-primary">
                    Löschung
                  </h3>
                </div>
                <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
                  Dein Konto und alle Daten vollständig löschen
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-dark-text-secondary mt-4">
              Diese Funktionen findest du in deinen{" "}
              <Link
                to="/settings"
                className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
              >
                Einstellungen
              </Link>
              .
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              Cookies
            </h2>
            <p className="text-gray-700 dark:text-dark-text-secondary leading-relaxed mb-4">
              Wir verwenden nur <strong>technisch notwendige Cookies</strong>{" "}
              für:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-dark-text-secondary space-y-2 ml-4">
              <li>Anmeldung und Session-Verwaltung</li>
              <li>Sicherheit (CSRF-Schutz)</li>
              <li>Speicherung deiner Sprachpräferenzen</li>
            </ul>
            <p className="text-gray-700 dark:text-dark-text-secondary mt-4">
              <strong>Keine Tracking-Cookies!</strong> Wir verwenden keine
              Cookies für Marketing oder Tracking von Drittanbietern.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              Wie lange speichern wir deine Daten?
            </h2>
            <ul className="space-y-2 text-gray-700 dark:text-dark-text-secondary">
              <li>
                • <strong>Account-Daten:</strong> Bis zur Löschung deines
                Accounts
              </li>
              <li>
                • <strong>Lernfortschritt:</strong> Bis zur Löschung deines
                Accounts
              </li>
              <li>
                • <strong>Backup-Daten:</strong> Maximal 90 Tage nach
                Account-Löschung
              </li>
              <li>
                • <strong>Logs (anonymisiert):</strong> Maximal 30 Tage
              </li>
            </ul>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4 flex items-center gap-3">
              <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              Kontakt
            </h2>
            <p className="text-gray-700 dark:text-dark-text-secondary leading-relaxed">
              Bei Fragen zum Datenschutz oder zur Ausübung deiner Rechte
              kontaktiere uns bitte unter:
              <br />
              <a
                href="mailto:connectwithrafaela@gmail.com"
                className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
              >
                connectwithrafaela@gmail.com
              </a>
            </p>
          </section>

          {/* Changes */}
          <section className="border-t border-gray-200 dark:border-purple-500/30 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
              Änderungen dieser Datenschutzerklärung
            </h2>
            <p className="text-gray-700 dark:text-dark-text-secondary leading-relaxed">
              Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf
              anzupassen. Über wesentliche Änderungen informieren wir dich per
              E-Mail. Die aktuelle Version findest du immer auf dieser Seite.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              Stand: November 2025
            </p>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/terms"
            className="px-6 py-3 bg-white dark:bg-white/10 text-purple-600 dark:text-purple-400 border-2 border-purple-600 rounded-xl font-bold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all text-center"
          >
            Nutzungsbedingungen
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
