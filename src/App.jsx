import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
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
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/section/:sectionId" element={<Section />} />
        <Route path="/theme/:themeId" element={<Theme />} />
        <Route path="/content/:contentId" element={<ContentDetail />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/tests/hoeren-komplett" element={<HoerenCompleteTest />} />
        <Route path="/test/:id" element={<TestDetail />} />
        <Route
          path="/synchronized-test/:id"
          element={<SynchronizedTestDetail />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  );
}

export default App;
