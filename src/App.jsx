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
import HoerenHub from "./pages/HoerenHub";
import SprechenHub from "./pages/SprechenHub";

// New Hören system (rebuilt)
import HoerenPruefung from "./features/hoeren/HoerenPruefung";
import HoerenUebung from "./features/hoeren/HoerenUebung";
import HoerenTraining from "./features/hoeren/HoerenTraining";

// Sprechen system
import SprechenUebung from "./features/sprechen/SprechenUebung";
import SprechenPruefung from "./features/sprechen/SprechenPruefung";
import DialogueMenu from "./features/sprechen/DialogueMenu";
import DialogueTrainer from "./features/sprechen/DialogueTrainer";
import DialogueTrainerIndex from "./features/sprechen/DialogueTrainerIndex";
import DialogTrainer from "./pages/DialogTrainer";

// Theme/Wortschatz system
import ThemeDetail from "./features/themes/ThemeDetail";
import ThemeQuiz from "./features/themes/ThemeQuiz";

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

      {/* Dialogue Menu & Trainer */}
      <Route
        path="/tests/sprechen/menu"
        element={
          <HoverSidebarShell>
            <DialogueMenu />
          </HoverSidebarShell>
        }
      />

      <Route
        path="/tests/sprechen/trainer"
        element={
          <HoverSidebarShell>
            <DialogTrainer />
          </HoverSidebarShell>
        }
      />

      <Route
        path="/tests/sprechen/trainer/:scenarioId"
        element={
          <HoverSidebarShell>
            <DialogueTrainer />
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

      {/* NEW: Sprechen Test Info */}
      <Route
        path="/tests/sprechen/pruefung"
        element={
          <HoverSidebarShell>
            <SprechenPruefung />
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

      {/* Other test areas - Coming Soon */}
      <Route
        path="/tests/lesen"
        element={
          <HoverSidebarShell>
            <ComingSoon title="Lesen Training" />
          </HoverSidebarShell>
        }
      />
      <Route
        path="/tests/schreiben"
        element={
          <HoverSidebarShell>
            <ComingSoon title="Schreiben Training" />
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
