/**
 * SprechenUebung
 * Practice mode for DTZ Speaking test.
 * Watch example videos, study prompts and tips for each Teil.
 * No recording - pure learning mode.
 */
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Play, BookOpen, CheckCircle } from "lucide-react";
import VideoPlayer from "./components/VideoPlayer";

export default function SprechenUebung() {
  const { teil } = useParams();
  const navigate = useNavigate();
  const [videoManifest, setVideoManifest] = useState(null);
  const [currentTeil, setCurrentTeil] = useState(null);
  const [activeVideo, setActiveVideo] = useState("beispiel");

  useEffect(() => {
    // Load video manifest
    fetch("/data/sprechen/video-manifest.json")
      .then((res) => res.json())
      .then((data) => {
        setVideoManifest(data);
        setCurrentTeil(data.videos[teil]);
      })
      .catch((err) => console.error("Failed to load video manifest:", err));
  }, [teil]);

  if (!videoManifest || !currentTeil) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const teile = ["teil1", "teil2", "teil3"];
  const currentIndex = teile.indexOf(teil);
  const nextTeil =
    currentIndex < teile.length - 1 ? teile[currentIndex + 1] : null;

  const videoToShow =
    activeVideo === "beispiel" ? currentTeil.beispiel : currentTeil.jetztSie;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-6 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/tests/sprechen")}
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-200 mb-4 group"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-200">
              <ArrowLeft size={16} />
            </div>
            <span className="font-medium">Zurück</span>
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black mb-2 text-white">
                {currentTeil.title}
              </h1>
              <p className="text-white/90">{currentTeil.description}</p>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-sm">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <span className="font-medium text-white">
                  {currentTeil.duration}
                </span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <span className="font-medium text-white">
                  {currentTeil.points}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Video Selection Tabs */}
        <div className="mb-8">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveVideo("beispiel")}
              className={`flex-1 px-6 py-4 rounded-2xl font-medium transition-all duration-200 ${
                activeVideo === "beispiel"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                  : "bg-white/80 backdrop-blur-md text-gray-700 hover:shadow-md border border-purple-100"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Play size={20} />
                <span>Beispiel</span>
              </div>
            </button>
            <button
              onClick={() => setActiveVideo("jetztSie")}
              className={`flex-1 px-6 py-4 rounded-2xl font-medium transition-all duration-200 ${
                activeVideo === "jetztSie"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                  : "bg-white/80 backdrop-blur-md text-gray-700 hover:shadow-md border border-purple-100"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <BookOpen size={20} />
                <span>Jetzt Sie!</span>
              </div>
            </button>
          </div>

          {/* Subtle reference for Beispiel/Jetzt Sie */}
          <div className="text-xs text-white/80 text-center mb-4">
            <span
              className={
                activeVideo === "beispiel"
                  ? "font-bold text-white"
                  : "text-white/70"
              }
            >
              Beispiel: Modellantwort
            </span>
            <span className="mx-2">•</span>
            <span
              className={
                activeVideo === "jetztSie"
                  ? "font-bold text-white"
                  : "text-white/70"
              }
            >
              Jetzt Sie: Ihre Aufgabe
            </span>
          </div>

          {/* Video Player */}
          <VideoPlayer
            videoUrl={videoToShow.url}
            title={videoToShow.title}
            description={videoToShow.description}
          />
        </div>

        {/* Study Materials */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Prompts/Structure */}
          {currentTeil.prompts && (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-purple-100">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-purple-600">
                <BookOpen size={20} className="text-purple-600" />
                Fragen / Leitpunkte
              </h3>
              <ul className="space-y-2">
                {currentTeil.prompts.map((prompt, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="text-purple-600 mt-0.5">•</span>
                    <span>{prompt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {currentTeil.structure && (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-purple-100">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-purple-600">
                <BookOpen size={20} className="text-purple-600" />
                Struktur
              </h3>
              <ul className="space-y-2">
                {currentTeil.structure.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="text-purple-600 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {currentTeil.skills && (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-purple-100">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-purple-600">
                <BookOpen size={20} className="text-purple-600" />
                Wichtige Fähigkeiten
              </h3>
              <ul className="space-y-2">
                {currentTeil.skills.map((skill, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <CheckCircle
                      size={16}
                      className="text-green-500 mt-0.5 flex-shrink-0"
                    />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tips */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
            <h3 className="text-lg font-bold mb-4 text-purple-600">💡 Tipps</h3>
            <ul className="space-y-2">
              {currentTeil.tips.map((tip, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span className="text-purple-600 mt-0.5">→</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Link
              to="/tests/sprechen"
              className="px-6 py-3 bg-white/80 backdrop-blur-md text-gray-700 rounded-xl font-medium hover:shadow-md transition-all duration-200 border border-purple-100"
            >
              Übersicht
            </Link>
            <Link
              to="/tests/sprechen/pruefung"
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <span>Prüfungsinfo</span>
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
          </div>

          {nextTeil ? (
            <Link
              to={`/tests/sprechen/uebung/${nextTeil}`}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <span>Nächster Teil</span>
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
