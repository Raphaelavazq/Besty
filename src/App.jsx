import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HeroPage from "./pages/HeroPage";
import Dashboard from "./pages/Dashboard";
import ContentDetail from "./pages/ContentDetail";
import Section from "./pages/Section";
import Theme from "./pages/Theme";
import Bookmarks from "./pages/Bookmarks";
import About from "./pages/About";
import Tests from "./pages/Tests";
import TestDetail from "./pages/TestDetail";
import SynchronizedTestDetail from "./pages/SynchronizedTestDetail";
import HoerenCompleteTest from "./pages/HoerenCompleteTest";

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

      {/* All other pages with layout */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/section/:sectionId"
        element={
          <Layout>
            <Section />
          </Layout>
        }
      />
      <Route
        path="/theme/:themeId"
        element={
          <Layout>
            <Theme />
          </Layout>
        }
      />
      <Route
        path="/content/:contentId"
        element={
          <Layout>
            <ContentDetail />
          </Layout>
        }
      />
      <Route
        path="/bookmarks"
        element={
          <Layout>
            <Bookmarks />
          </Layout>
        }
      />
      <Route
        path="/tests"
        element={
          <Layout>
            <Tests />
          </Layout>
        }
      />
      <Route
        path="/tests/hoeren-komplett"
        element={
          <Layout>
            <HoerenCompleteTest />
          </Layout>
        }
      />
      <Route
        path="/test/:id"
        element={
          <Layout>
            <TestDetail />
          </Layout>
        }
      />
      <Route
        path="/synchronized-test/:id"
        element={
          <Layout>
            <SynchronizedTestDetail />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <About />
          </Layout>
        }
      />

      {/* Placeholder routes for sidebar navigation */}
      <Route
        path="/study"
        element={
          <Layout>
            <ComingSoon title="Study Mode" />
          </Layout>
        }
      />
      <Route
        path="/progress"
        element={
          <Layout>
            <ComingSoon title="Progress Tracking" />
          </Layout>
        }
      />
      <Route
        path="/achievements"
        element={
          <Layout>
            <ComingSoon title="Achievements" />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout>
            <ComingSoon title="Profile" />
          </Layout>
        }
      />
      <Route
        path="/settings"
        element={
          <Layout>
            <ComingSoon title="Settings" />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
