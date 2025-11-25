import { Routes, Route } from "react-router-dom";
import HoverSidebarShell from "./components/layouts/HoverSidebarShell";
import HeroPage from "./pages/HeroPage";
import Dashboard from "./pages/Dashboard";
import ContentDetail from "./pages/ContentDetail";
import Section from "./pages/Section";
import Theme from "./pages/Theme";
import Bookmarks from "./pages/Bookmarks";
import About from "./pages/About";

// New unified test system
import TestHub from "./pages/TestHub";
import HoerenHub from "./pages/HoerenHubNew";
import SprechenHub from "./pages/SprechenHubNew";
import SchreibenHub from "./pages/SchreibenHubNew";
import SchreibenTrainer from "./pages/SchreibenTrainerNew";
import LesenHub from "./pages/LesenHub";
import LesenTraining from "./pages/LesenTraining";
import LesenTeil1 from "./pages/LesenTeil1";
import LesenTeil2 from "./pages/LesenTeil2";
import LesenTeil3 from "./pages/LesenTeil3";
import LesenPruefung from "./pages/LesenPruefung";

// New Hören system (rebuilt)
import HoerenPruefung from "./features/hoeren/HoerenPruefung";
import HoerenUebung from "./features/hoeren/HoerenUebung";
import HoerenTraining from "./features/hoeren/HoerenTraining";

// Sprechen system
import SprechenUebung from "./features/sprechen/SprechenUebung";
import SprechenTeil1Interactive from "./pages/SprechenTeil1Interactive";
import DialogueMenu from "./features/sprechen/DialogueMenu";
import DialogTrainer from "./pages/DialogTrainer";
import DialogueTrainerAI from "./features/sprechen/DialogueTrainerAI";
import DialogueCatalogPage from "./pages/DialogueCatalogPage";
import BildBeschreiben from "./pages/BildBeschreiben";
import BildBeschreibenDetail from "./pages/BildBeschreibenDetail";
import ThemeGallery from "./pages/ThemeGallery";

// Theme/Wortschatz system
import ThemeDetail from "./features/themes/ThemeDetail";
import ThemeQuiz from "./features/themes/ThemeQuiz";

// Einbürgerungstest system
import EinbuergerungstestHub from "./features/einbuergerungstest/EinbuergerungstestHub";
import Fragenkatalog from "./features/einbuergerungstest/Fragenkatalog";
import ExamSimulator from "./features/einbuergerungstest/ExamSimulator";
import TrainingMode from "./features/einbuergerungstest/TrainingMode";

// Authentication
import AuthenticationPage from "./pages/auth/AuthenticationPage";
import AuthCallback from "./pages/auth/AuthCallback";

// Legal pages
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

// Settings
import Settings from "./pages/Settings";

// Placeholder component for coming soon pages
const ComingSoon = ({ title }) => (
  <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 flex items-center justify-center p-6">
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 shadow-xl border border-purple-100 text-center max-w-md">
      <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <span className="text-2xl">🚀</span>
      </div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
        {title}
      </h1>
      <p className="text-gray-600 text-lg">
        Diese Seite wird bald verfügbar sein!
      </p>
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      {/* Hero page without layout */}
      <Route path="/" element={<HeroPage />} />

      {/* Authentication pages without layout */}
      <Route path="/auth/sign-up" element={<AuthenticationPage />} />
      <Route path="/auth/sign-in" element={<AuthenticationPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Legal pages without layout */}
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />

      {/* Settings page without layout */}
      <Route path="/settings" element={<Settings />} />

      {/* Dashboard with always-visible sidebar (DashboardShell applied in component) */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* All other pages with hover sidebar */}
      <Route
        path="/section/:sectionId"
        element={
          <HoverSidebarShell>
            <Section />
          </HoverSidebarShell>
        }
      />
      <Route
        path="/theme/:themeId"
        element={
          <HoverSidebarShell>
            <Theme />
          </HoverSidebarShell>
        }
      />
      <Route
        path="/content/:contentId"
        element={
          <HoverSidebarShell>
            <ContentDetail />
          </HoverSidebarShell>
        }
      />
      <Route
        path="/bookmarks"
        element={
          <HoverSidebarShell>
            <Bookmarks />
          </HoverSidebarShell>
        }
      />
      {/* New Unified Test System */}
      <Route
        path="/tests"
        element={
          <HoverSidebarShell>
            <TestHub />
          </HoverSidebarShell>
        }
      />

      {/* Hören Test Area */}
      <Route
        path="/tests/hoeren"
        element={
          <HoverSidebarShell>
            <HoerenHub />
          </HoverSidebarShell>
        }
      />

      {/* NEW: Hören Training Mode (Random Questions) */}
      <Route
        path="/tests/hoeren/training"
        element={
          <HoverSidebarShell>
            <HoerenTraining />
          </HoverSidebarShell>
        }
      />

      {/* NEW: Hören Practice Mode */}
      <Route
        path="/tests/hoeren/uebung/:teil"
        element={
          <HoverSidebarShell>
            <HoerenUebung />
          </HoverSidebarShell>
        }
      />

      {/* NEW: Hören Test Mode */}
      <Route
        path="/tests/hoeren/pruefung/:testId"
        element={
          <HoverSidebarShell>
            <HoerenPruefung />
          </HoverSidebarShell>
        }
      />
      <Route
        path="/tests/hoeren/pruefung"
        element={
          <HoverSidebarShell>
            <HoerenPruefung />
          </HoverSidebarShell>
        }
      />

      {/* Sprechen Test Area */}
      <Route
        path="/tests/sprechen"
        element={
          <HoverSidebarShell>
            <SprechenHub />
          </HoverSidebarShell>
        }
      />

      {/* NEW: Sprechen Teil 1 Interactive Learning */}
      <Route
        path="/tests/sprechen/teil1"
        element={
          <HoverSidebarShell>
            <SprechenTeil1Interactive />
          </HoverSidebarShell>
        }
      />

      {/* Dialogue Catalog & Trainer */}
      <Route
        path="/tests/sprechen/trainer"
        element={
          <HoverSidebarShell>
            <DialogueCatalogPage />
          </HoverSidebarShell>
        }
      />

      <Route
        path="/tests/sprechen/trainer/:scenarioId"
        element={
          <HoverSidebarShell>
            <DialogueTrainerAI />
          </HoverSidebarShell>
        }
      />

      {/* Legacy routes for backwards compatibility */}
      <Route
        path="/tests/sprechen/menu"
        element={
          <HoverSidebarShell>
            <DialogueMenu />
          </HoverSidebarShell>
        }
      />

      {/* NEW: Sprechen Practice Mode */}
      <Route
        path="/tests/sprechen/uebung/:teil"
        element={
          <HoverSidebarShell>
            <SprechenUebung />
          </HoverSidebarShell>
        }
      />

      {/* Bild Beschreiben (Teil 2) */}
      <Route
        path="/tests/sprechen/bild-beschreiben"
        element={
          <HoverSidebarShell>
            <BildBeschreiben />
          </HoverSidebarShell>
        }
      />
      <Route
        path="/tests/sprechen/bild-beschreiben/:themeId/gallery"
        element={
          <HoverSidebarShell>
            <ThemeGallery />
          </HoverSidebarShell>
        }
      />
      <Route
        path="/tests/sprechen/bild-beschreiben/:id"
        element={
          <HoverSidebarShell>
            <BildBeschreibenDetail />
          </HoverSidebarShell>
        }
      />

      {/* Theme/Wortschatz Routes */}
      <Route
        path="/themes/:themeId"
        element={
          <HoverSidebarShell>
            <ThemeDetail />
          </HoverSidebarShell>
        }
      />
      <Route
        path="/themes/:themeId/quiz"
        element={
          <HoverSidebarShell>
            <ThemeQuiz />
          </HoverSidebarShell>
        }
      />

      {/* Schreiben Test Area */}
      <Route
        path="/tests/schreiben"
        element={
          <HoverSidebarShell>
            <SchreibenHub />
          </HoverSidebarShell>
        }
      />

      {/* Schreiben Trainer */}
      <Route
        path="/tests/schreiben/trainer"
        element={
          <HoverSidebarShell>
            <SchreibenTrainer />
          </HoverSidebarShell>
        }
      />

      {/* Lesen Test Area */}
      <Route
        path="/tests/lesen"
        element={
          <HoverSidebarShell>
            <LesenHub />
          </HoverSidebarShell>
        }
      />
      <Route
        path="/tests/lesen/pruefung"
        element={
          <HoverSidebarShell>
            <LesenPruefung />
          </HoverSidebarShell>
        }
      />
      <Route
        path="/tests/lesen/training"
        element={
          <HoverSidebarShell>
            <LesenTraining />
          </HoverSidebarShell>
        }
      />
      <Route
        path="/tests/lesen/training/teil1"
        element={
          <HoverSidebarShell>
            <LesenTeil1 />
          </HoverSidebarShell>
        }
      />
      <Route
        path="/tests/lesen/training/teil2"
        element={
          <HoverSidebarShell>
            <LesenTeil2 />
          </HoverSidebarShell>
        }
      />
      <Route
        path="/tests/lesen/training/teil3"
        element={
          <HoverSidebarShell>
            <LesenTeil3 />
          </HoverSidebarShell>
        }
      />

      <Route
        path="/about"
        element={
          <HoverSidebarShell>
            <About />
          </HoverSidebarShell>
        }
      />

      {/* Einbürgerungstest */}
      <Route
        path="/einbuergerungstest"
        element={
          <HoverSidebarShell>
            <EinbuergerungstestHub />
          </HoverSidebarShell>
        }
      />
      <Route
        path="/einbuergerungstest/fragenkatalog"
        element={
          <HoverSidebarShell>
            <Fragenkatalog />
          </HoverSidebarShell>
        }
      />
      <Route
        path="/einbuergerungstest/probetest"
        element={
          <HoverSidebarShell>
            <ExamSimulator mode="probetest" />
          </HoverSidebarShell>
        }
      />
      <Route
        path="/einbuergerungstest/training"
        element={
          <HoverSidebarShell>
            <TrainingMode />
          </HoverSidebarShell>
        }
      />

      {/* Placeholder routes for sidebar navigation */}
      <Route
        path="/study"
        element={
          <HoverSidebarShell>
            <ComingSoon title="Study Mode" />
          </HoverSidebarShell>
        }
      />
      <Route
        path="/progress"
        element={
          <HoverSidebarShell>
            <ComingSoon title="Progress Tracking" />
          </HoverSidebarShell>
        }
      />
      <Route
        path="/achievements"
        element={
          <HoverSidebarShell>
            <ComingSoon title="Achievements" />
          </HoverSidebarShell>
        }
      />
      <Route
        path="/profile"
        element={
          <HoverSidebarShell>
            <ComingSoon title="Profile" />
          </HoverSidebarShell>
        }
      />
      <Route
        path="/settings"
        element={
          <HoverSidebarShell>
            <ComingSoon title="Settings" />
          </HoverSidebarShell>
        }
      />
    </Routes>
  );
}
export default App;
