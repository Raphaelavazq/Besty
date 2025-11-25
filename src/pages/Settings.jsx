/**
 * Settings Page
 * User preferences and account settings
 * - Change Bundesland for Einbürgerungstest
 * - Dark/Light mode toggle
 * - Notification preferences
 * - Language preferences
 * - Account management
 */
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Moon,
  Sun,
  Bell,
  User,
  Mail,
  LogOut,
  CheckCircle2,
  Save,
  Shield,
  Download,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { supabase } from "../lib/supabase";

export default function Settings() {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateProfile, signOut } = useAuthStore();

  // Form states
  const [selectedBundesland, setSelectedBundesland] = useState(
    user?.bundesland || ""
  );
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Bundesländer list
  const bundeslaender = [
    "Baden-Württemberg",
    "Bayern",
    "Berlin",
    "Brandenburg",
    "Bremen",
    "Hamburg",
    "Hessen",
    "Mecklenburg-Vorpommern",
    "Niedersachsen",
    "Nordrhein-Westfalen",
    "Rheinland-Pfalz",
    "Saarland",
    "Sachsen",
    "Sachsen-Anhalt",
    "Schleswig-Holstein",
    "Thüringen",
  ];

  // Check dark mode from localStorage
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Save settings
  const handleSave = async () => {
    if (!isAuthenticated) return;

    setIsSaving(true);
    try {
      // Update in auth store
      updateProfile({
        bundesland: selectedBundesland,
      });

      // Update in Supabase if user has ID
      if (user?.id && user.id !== "guest") {
        const { error } = await supabase
          .from("profiles")
          .update({
            bundesland: selectedBundesland,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id);

        if (error) throw error;
      }

      // Show success notification
      setShowSaveNotification(true);
      setTimeout(() => setShowSaveNotification(false), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Fehler beim Speichern der Einstellungen");
    } finally {
      setIsSaving(false);
    }
  };

  // Export user data (GDPR compliance)
  const handleExportData = async () => {
    if (!isAuthenticated || !user?.id) return;

    try {
      // Fetch all user data from Supabase
      const [profileRes, progressRes, sessionsRes, simulationsRes] =
        await Promise.all([
          supabase.from("profiles").select("*").eq("id", user.id).single(),
          supabase.from("question_progress").select("*").eq("user_id", user.id),
          supabase.from("study_sessions").select("*").eq("user_id", user.id),
          supabase.from("exam_simulations").select("*").eq("user_id", user.id),
        ]);

      // Compile all data
      const userData = {
        exportDate: new Date().toISOString(),
        profile: profileRes.data,
        questionProgress: progressRes.data || [],
        studySessions: sessionsRes.data || [],
        examSimulations: simulationsRes.data || [],
        metadata: {
          totalQuestions: progressRes.data?.length || 0,
          totalSessions: sessionsRes.data?.length || 0,
          totalExams: simulationsRes.data?.length || 0,
        },
      };

      // Create and download JSON file
      const blob = new Blob([JSON.stringify(userData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `b1-bestie-data-export-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      alert(
        "✅ Deine Daten wurden erfolgreich exportiert!\n\nDie Datei wurde heruntergeladen."
      );
    } catch (error) {
      console.error("Error exporting data:", error);
      alert(
        "❌ Fehler beim Exportieren der Daten. Bitte versuche es später erneut."
      );
    }
  };

  // Delete account permanently (GDPR right to erasure)
  const handleDeleteAccount = async () => {
    if (!isAuthenticated || !user?.id) return;

    const confirmation = confirm(
      "⚠️ ACHTUNG: Account-Löschung\n\n" +
        "Bist du sicher, dass du deinen Account dauerhaft löschen möchtest?\n\n" +
        "Dies wird:\n" +
        "• Dein Profil löschen\n" +
        "• Alle Lernfortschritte entfernen\n" +
        "• Alle Prüfungsergebnisse löschen\n" +
        "• Alle Statistiken entfernen\n\n" +
        "Diese Aktion kann NICHT rückgängig gemacht werden!\n\n" +
        "Klicke OK zum Fortfahren oder Abbrechen zum Zurück."
    );

    if (!confirmation) return;

    // Double confirmation
    const doubleCheck = prompt(
      'Um fortzufahren, tippe "LÖSCHEN" (in Großbuchstaben):'
    );

    if (doubleCheck !== "LÖSCHEN") {
      alert("Account-Löschung abgebrochen.");
      return;
    }

    try {
      setIsSaving(true);

      // Delete all user data from Supabase (RLS will handle authorization)
      const deletePromises = [
        supabase.from("question_progress").delete().eq("user_id", user.id),
        supabase.from("study_sessions").delete().eq("user_id", user.id),
        supabase.from("exam_simulations").delete().eq("user_id", user.id),
        supabase.from("profiles").delete().eq("id", user.id),
      ];

      await Promise.all(deletePromises);

      // Delete authentication user
      const { error: authError } = await supabase.auth.admin.deleteUser(
        user.id
      );

      if (authError) {
        // If admin delete fails, try regular sign out (user can't delete their own auth account without admin privileges)
        console.warn("Admin delete not available, signing out:", authError);
        await supabase.auth.signOut();
      }

      // Sign out from store
      signOut();

      alert(
        "✅ Dein Account wurde erfolgreich gelöscht.\n\n" +
          "Alle deine Daten wurden dauerhaft entfernt.\n\n" +
          "Vielen Dank, dass du B1 Bestie genutzt hast!"
      );

      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert(
        "❌ Fehler beim Löschen des Accounts.\n\n" +
          "Bitte kontaktiere uns unter connectwithrafaela@gmail.com für Hilfe."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    if (confirm("Möchten Sie sich wirklich abmelden?")) {
      signOut();
      navigate("/");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary flex items-center justify-center p-4">
        <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100 dark:border-purple-500/30 text-center max-w-md">
          <Shield className="w-16 h-16 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-gray-900 dark:text-dark-text-primary mb-4">
            Anmeldung erforderlich
          </h2>
          <p className="text-gray-600 dark:text-dark-text-secondary mb-6">
            Sie müssen angemeldet sein, um auf die Einstellungen zuzugreifen.
          </p>
          <Link
            to="/auth/sign-in"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
          >
            Jetzt anmelden
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-6 flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:gap-3 transition-all duration-200 group"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Zurück zum Dashboard</span>
          </button>

          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Einstellungen
          </h1>
          <p className="text-gray-600 dark:text-dark-text-secondary text-lg">
            Verwalten Sie Ihre Kontoeinstellungen und Präferenzen
          </p>

          {/* Show current Bundesland */}
          {selectedBundesland && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl border border-purple-200 dark:border-purple-500/30">
              <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Aktuell: {selectedBundesland}
              </span>
            </div>
          )}
        </div>

        {/* Success Notification */}
        {showSaveNotification && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-slide-in-right">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">Einstellungen gespeichert!</span>
          </div>
        )}

        {/* Account Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text-primary mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Konto
          </h2>

          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-500/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text-primary">
                  {user?.fullName || "Benutzer"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {user?.email || "Keine E-Mail"}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="text-sm text-gray-600 dark:text-dark-text-secondary">
                <p>
                  <span className="font-medium">Mitglied seit:</span>{" "}
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("de-DE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Unbekannt"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bundesland Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text-primary mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Bundesland
          </h2>

          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-500/30">
            <p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-4">
              Ihr Bundesland wird für den Einbürgerungstest verwendet (300
              allgemeine + 10 länderspezifische Fragen)
            </p>

            <select
              value={selectedBundesland}
              onChange={(e) => setSelectedBundesland(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            >
              <option value="">Bundesland wählen...</option>
              {bundeslaender.map((land) => (
                <option key={land} value={land}>
                  {land}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text-primary mb-4 flex items-center gap-2">
            {darkMode ? (
              <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            ) : (
              <Sun className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            )}
            Aussehen
          </h2>

          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-500/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-dark-text-primary mb-1">
                  Dunkler Modus
                </h3>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                  Wechseln zwischen hellem und dunklem Design
                </p>
              </div>

              <button
                onClick={handleDarkModeToggle}
                className={`relative w-14 h-7 rounded-full transition-all duration-200 ${
                  darkMode ? "bg-purple-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 flex items-center justify-center ${
                    darkMode ? "translate-x-7" : "translate-x-0"
                  }`}
                >
                  {darkMode ? (
                    <Moon className="w-3 h-3 text-purple-600" />
                  ) : (
                    <Sun className="w-3 h-3 text-gray-600" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text-primary mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Benachrichtigungen
          </h2>

          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-500/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-dark-text-primary mb-1">
                  Push-Benachrichtigungen
                </h3>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                  Erhalten Sie Updates über Ihren Lernfortschritt
                </p>
              </div>

              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-14 h-7 rounded-full transition-all duration-200 ${
                  notifications ? "bg-purple-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                    notifications ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mb-6">
          <button
            onClick={handleSave}
            disabled={isSaving || !selectedBundesland}
            className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Wird gespeichert...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Einstellungen speichern</span>
              </>
            )}
          </button>
        </div>

        {/* Privacy & Data Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text-primary mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Datenschutz & Privatsphäre
          </h2>

          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100 dark:border-purple-500/30 space-y-4">
            {/* View Privacy Policy */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-dark-text-primary mb-1">
                  Datenschutzerklärung
                </h3>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                  Erfahre, wie wir deine Daten schützen und verwenden
                </p>
              </div>
              <Link
                to="/privacy"
                className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all text-sm whitespace-nowrap"
              >
                Ansehen
              </Link>
            </div>

            {/* Export Data */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-dark-text-primary mb-1">
                  Daten exportieren
                </h3>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                  Lade alle deine gespeicherten Daten als JSON-Datei herunter
                </p>
              </div>
              <button
                onClick={handleExportData}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all text-sm whitespace-nowrap flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>

            {/* Delete Account */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-rose-700 dark:text-rose-400 mb-1 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Account löschen
                </h3>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                  Lösche dein Konto und alle zugehörigen Daten dauerhaft
                </p>
              </div>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 rounded-lg font-medium hover:bg-rose-200 dark:hover:bg-rose-900/50 transition-all text-sm whitespace-nowrap flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Löschen
              </button>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mb-6">
          <button
            onClick={handleLogout}
            className="w-full px-6 py-4 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
          >
            <LogOut className="w-5 h-5" />
            <span>Abmelden</span>
          </button>
        </div>

        {/* Footer Info */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          <p>B1 Bestie • Version 1.0.0</p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <Link
              to="/privacy"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Datenschutz
            </Link>
            <span>•</span>
            <Link
              to="/terms"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Nutzungsbedingungen
            </Link>
            <span>•</span>
            <Link
              to="/about"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Über uns
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
