/**
 * DialogueCatalogPage
 *
 * Main catalog page showing all 59 DTZ Sprechen Teil 3 dialogue scenarios.
 * Features:
 * - Grid of glass-morphism cards for each dialogue
 * - Search/filter functionality by title or theme
 * - Click card to navigate to practice interface
 * - Fully responsive with mobile-first design
 */

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  MessageCircle,
  Users,
  Calendar,
  Gift,
  Home,
  BookOpen,
  ArrowLeft,
} from "lucide-react";

export default function DialogueCatalogPage() {
  const navigate = useNavigate();
  const [dialogues, setDialogues] = useState([]);
  const [filteredDialogues, setFilteredDialogues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const themeNavRef = useRef(null);

  useEffect(() => {
    // Load dialogues catalog
    fetch("/data/sprechen/dialogues-catalog.json")
      .then((res) => res.json())
      .then((data) => {
        setDialogues(data.scenarios || []);
        setFilteredDialogues(data.scenarios || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load dialogues:", err);
        setIsLoading(false);
      });
  }, []);

  // Handle scroll to hide/show header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        // At top, always show
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down - hide header
        setShowHeader(false);
      } else {
        // Scrolling up - show header
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to selected theme in horizontal nav
  const scrollToTheme = (theme, index) => {
    setSelectedTheme(theme);

    if (themeNavRef.current) {
      const button = themeNavRef.current.children[index];
      if (button) {
        button.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  // Extract unique themes
  const themes = ["all", ...new Set(dialogues.map((d) => d.theme))];

  // Filter dialogues based on search and theme
  useEffect(() => {
    let filtered = dialogues;

    // Filter by theme
    if (selectedTheme !== "all") {
      filtered = filtered.filter((d) => d.theme === selectedTheme);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.title.toLowerCase().includes(term) ||
          d.aufgabe.toLowerCase().includes(term) ||
          d.theme.toLowerCase().includes(term) ||
          d.number.toString().includes(term)
      );
    }

    setFilteredDialogues(filtered);
  }, [searchTerm, selectedTheme, dialogues]);

  // Theme icon helper
  const getThemeIcon = (theme) => {
    if (theme.includes("Feier") || theme.includes("Fest"))
      return <Calendar className="w-5 h-5" />;
    if (theme.includes("Geschenk")) return <Gift className="w-5 h-5" />;
    if (theme.includes("Nachbar") || theme.includes("Wohn"))
      return <Home className="w-5 h-5" />;
    if (theme.includes("Kurs") || theme.includes("Schule"))
      return <BookOpen className="w-5 h-5" />;
    if (theme.includes("Freund")) return <Users className="w-5 h-5" />;
    return <MessageCircle className="w-5 h-5" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Lade Dialoge...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
      {/* Header - Hide on scroll */}
      <div
        className={`bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-sm sticky top-0 z-20 transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Back Button - Icon only */}
          <button
            onClick={() => navigate("/tests/sprechen")}
            className="mb-4 w-10 h-10 rounded-full bg-white hover:bg-purple-50 border border-purple-100 hover:border-purple-300 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm group"
            aria-label="Zurück zu Sprechen Tests"
          >
            <ArrowLeft className="w-5 h-5 text-purple-600 group-hover:-translate-x-0.5 transition-transform duration-200" />
          </button>

          <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2 tracking-tight">
            DTZ Sprechen Teil 3
          </h1>
          <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-light">
            Dialoge planen und üben — 59 Szenarien
          </p>
        </div>
      </div>

      {/* Sticky Theme Navigation - Horizontal Scroll Gallery */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div
            ref={themeNavRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {themes.map((theme, index) => (
              <button
                key={theme}
                onClick={() => scrollToTheme(theme, index)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedTheme === theme
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-105"
                    : "bg-white text-purple-700 border border-purple-200 hover:bg-purple-50 hover:scale-105"
                }`}
              >
                {theme === "all" ? "Alle" : theme}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-purple-100 mb-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Dialog suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-600 mt-3">
            {filteredDialogues.length}{" "}
            {filteredDialogues.length === 1 ? "Dialog" : "Dialoge"}
          </p>
        </div>

        {/* Dialogues Grid */}
        {filteredDialogues.length === 0 ? (
          <div className="text-center py-16">
            <MessageCircle className="w-16 h-16 text-purple-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-2">Keine Dialoge gefunden</p>
            <p className="text-gray-500">Versuche einen anderen Suchbegriff</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDialogues.map((dialogue) => (
              <Link
                key={dialogue.id}
                to={`/tests/sprechen/trainer/${dialogue.id}`}
                className="group bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-purple-100 hover:shadow-xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                {/* Dialogue Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {dialogue.number}
                  </div>
                  <div className="text-purple-600 group-hover:scale-110 transition-transform duration-300">
                    {getThemeIcon(dialogue.theme)}
                  </div>
                </div>

                {/* Theme Tag */}
                <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium mb-3">
                  {dialogue.theme}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-purple-700 transition-colors duration-200">
                  {dialogue.title}
                </h3>

                {/* Aufgabe Preview */}
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {dialogue.aufgabe}
                </p>

                {/* Leitpunkte Count */}
                {dialogue.leitpunkte && (
                  <div className="flex items-center text-xs text-purple-600">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span>{dialogue.leitpunkte.length} Diskussionspunkte</span>
                  </div>
                )}

                {/* Hover Arrow */}
                <div className="mt-4 flex items-center text-purple-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>Üben</span>
                  <svg
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
