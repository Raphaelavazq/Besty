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

function App() {
  return (
    <Routes>
      {/* Hero page without layout */}
      <Route path="/" element={<HeroPage />} />
      
      {/* All other pages with layout */}
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/section/:sectionId" element={<Layout><Section /></Layout>} />
      <Route path="/theme/:themeId" element={<Layout><Theme /></Layout>} />
      <Route path="/content/:contentId" element={<Layout><ContentDetail /></Layout>} />
      <Route path="/bookmarks" element={<Layout><Bookmarks /></Layout>} />
      <Route path="/tests" element={<Layout><Tests /></Layout>} />
      <Route path="/tests/hoeren-komplett" element={<Layout><HoerenCompleteTest /></Layout>} />
      <Route path="/test/:id" element={<Layout><TestDetail /></Layout>} />
      <Route path="/synchronized-test/:id" element={<Layout><SynchronizedTestDetail /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
    </Routes>
  );
}

export default App;
