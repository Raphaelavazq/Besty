import { Routes, Route } from "react-router-dom";
import BareShell from "./components/layouts/BareShell";
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

// New Hören system (rebuilt)
import HoerenPruefung from "./features/hoeren/HoerenPruefung";
import HoerenUebung from "./features/hoeren/HoerenUebung";
import HoerenTraining from "./features/hoeren/HoerenTraining";

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

      {/* Dashboard with its own layout shell */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* All other pages with bare layout shell */}
      <Route
        path="/section/:sectionId"
        element={
          <BareShell>
            <Section />
          </BareShell>
        }
      />
      <Route
        path="/theme/:themeId"
        element={
          <BareShell>
            <Theme />
          </BareShell>
        }
      />
      <Route
        path="/content/:contentId"
        element={
          <BareShell>
            <ContentDetail />
          </BareShell>
        }
      />
      <Route
        path="/bookmarks"
        element={
          <BareShell>
            <Bookmarks />
          </BareShell>
        }
      />
      {/* New Unified Test System */}
      <Route
        path="/tests"
        element={
          <BareShell>
            <TestHub />
          </BareShell>
        }
      />

      {/* Hören Test Area */}
      <Route
        path="/tests/hoeren"
        element={
          <BareShell>
            <HoerenHub />
          </BareShell>
        }
      />

      {/* NEW: Hören Training Mode (Random Questions) */}
      <Route
        path="/tests/hoeren/training"
        element={
          <BareShell>
            <HoerenTraining />
          </BareShell>
        }
      />

      {/* NEW: Hören Practice Mode */}
      <Route
        path="/tests/hoeren/uebung/:teil"
        element={
          <BareShell>
            <HoerenUebung />
          </BareShell>
        }
      />

      {/* NEW: Hören Test Mode */}
      <Route
        path="/tests/hoeren/pruefung/:testId"
        element={
          <BareShell>
            <HoerenPruefung />
          </BareShell>
        }
      />
      <Route
        path="/tests/hoeren/pruefung"
        element={
          <BareShell>
            <HoerenPruefung />
          </BareShell>
        }
      />

      {/* Other test areas - Coming Soon */}
      <Route
        path="/tests/lesen"
        element={
          <BareShell>
            <ComingSoon title="Lesen Training" />
          </BareShell>
        }
      />
      <Route
        path="/tests/schreiben"
        element={
          <BareShell>
            <ComingSoon title="Schreiben Training" />
          </BareShell>
        }
      />
      <Route
        path="/tests/sprechen"
        element={
          <BareShell>
            <ComingSoon title="Sprechen Training" />
          </BareShell>
        }
      />
      <Route
        path="/about"
        element={
          <BareShell>
            <About />
          </BareShell>
        }
      />

      {/* Placeholder routes for sidebar navigation */}
      <Route
        path="/study"
        element={
          <BareShell>
            <ComingSoon title="Study Mode" />
          </BareShell>
        }
      />
      <Route
        path="/progress"
        element={
          <BareShell>
            <ComingSoon title="Progress Tracking" />
          </BareShell>
        }
      />
      <Route
        path="/achievements"
        element={
          <BareShell>
            <ComingSoon title="Achievements" />
          </BareShell>
        }
      />
      <Route
        path="/profile"
        element={
          <BareShell>
            <ComingSoon title="Profile" />
          </BareShell>
        }
      />
      <Route
        path="/settings"
        element={
          <BareShell>
            <ComingSoon title="Settings" />
          </BareShell>
        }
      />
    </Routes>
  );
}
export default App;
