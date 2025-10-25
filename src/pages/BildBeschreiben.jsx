/**
 * BildBeschreiben - DTZ Speaking Teil 2
 * Theme catalog page - shows 15 main themes
 * Click a theme to see available images for that theme
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ImageIcon,
  Play,
  Clock,
  Folder,
  CheckCircle,
  BookOpen,
  Users,
  ShoppingCart,
  Heart,
  Home,
  Briefcase,
  Utensils,
  Plane,
  Smartphone,
  Trophy,
  TreePine,
  PartyPopper,
  Palette,
  UserPlus,
  Search,
  X,
} from "lucide-react";
import GradientHeading from "../components/ui/GradientHeading";
import bildData from "../../data/bild-beschreiben.json";

export default function BildBeschreiben() {
  const [searchQuery, setSearchQuery] = useState("");
  // 15 main themes for DTZ B1 Speaking Teil 2
  const themes = [
    {
      id: "lernen-bildung",
      name: "Lernen und Bildung",
      category: "Lernen & Bildung",
      imageCount: 1,
      icon: BookOpen,
      color: "from-purple-800 to-indigo-900",
    },
    {
      id: "familie-kinder",
      name: "Familie und Kinder",
      category: "Familie & Kinder",
      imageCount: 2,
      icon: Users,
      color: "from-pink-800 to-purple-900",
    },
    {
      id: "einkaufen",
      name: "Einkaufen",
      category: "Alltag",
      imageCount: 1,
      icon: ShoppingCart,
      color: "from-indigo-800 to-purple-900",
    },
    {
      id: "gesundheit",
      name: "Gesundheit",
      category: "Gesundheit",
      imageCount: 1,
      icon: Heart,
      color: "from-red-500 to-pink-600",
    },
    {
      id: "wohnen",
      name: "Wohnen",
      category: "Wohnen",
      imageCount: 1,
      icon: Home,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "arbeit-beruf",
      name: "Arbeit und Beruf",
      category: "Arbeit",
      imageCount: 1,
      icon: Briefcase,
      color: "from-purple-800 to-pink-800",
    },
    {
      id: "essen-trinken",
      name: "Essen und Trinken",
      category: "Alltag",
      imageCount: 1,
      icon: Utensils,
      color: "from-orange-500 to-red-600",
    },
    {
      id: "reisen-verkehr",
      name: "Reisen und Verkehr",
      category: "Reisen",
      imageCount: 1,
      icon: Plane,
      color: "from-cyan-500 to-blue-600",
    },
    {
      id: "medien-kommunikation",
      name: "Medien und Kommunikation",
      category: "Medien",
      imageCount: 1,
      icon: Smartphone,
      color: "from-indigo-800 to-purple-900",
    },
    {
      id: "sport-fitness",
      name: "Sport und Fitness",
      category: "Gesundheit",
      imageCount: 1,
      icon: Trophy,
      color: "from-green-500 to-teal-600",
    },
    {
      id: "natur-umwelt",
      name: "Natur und Umwelt",
      category: "Umwelt",
      imageCount: 1,
      icon: TreePine,
      color: "from-emerald-500 to-green-600",
    },
    {
      id: "feste-feiern",
      name: "Feste und Feiern",
      category: "Kultur",
      imageCount: 1,
      icon: PartyPopper,
      color: "from-purple-500 to-pink-600",
    },
    {
      id: "freizeit",
      name: "Freizeit",
      category: "Freizeit",
      imageCount: 1,
      icon: Palette,
      color: "from-violet-500 to-purple-600",
    },
    {
      id: "freundschaft",
      name: "Freundschaft",
      category: "Soziales",
      imageCount: 1,
      icon: UserPlus,
      color: "from-amber-500 to-orange-600",
    },
  ];

  // If a manifest exists, compute image counts from it (keep fallback)
  const manifest = bildData && bildData.themes ? bildData.themes : {};
  const themesWithCounts = themes.map((t) => ({
    ...t,
    imageCount: manifest[t.id] ? manifest[t.id].length : t.imageCount,
  }));

  // Filter themes based on search query - includes dialogue numbers
  const filteredThemes = themesWithCounts.filter((theme) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();

    // Check if query matches theme name or category
    const matchesText =
      theme.name.toLowerCase().includes(query) ||
      theme.category.toLowerCase().includes(query);

    // Check if query matches any dialogue ID numbers within this theme
    const themeImages = manifest[theme.id] || [];
    const matchesDialogueNumber = themeImages.some((img) => {
      const imgId = String(img.id);
      return imgId === query || imgId.includes(query);
    });

    return matchesText || matchesDialogueNumber;
  });

  // Clear search
  const clearSearch = () => setSearchQuery("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              to="/tests/sprechen"
              className="w-10 h-10 rounded-full bg-white hover:bg-purple-50 border border-purple-100 hover:border-purple-300 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group shadow-sm"
              aria-label="Zurück zu Sprechen Tests"
            >
              <ArrowLeft className="w-5 h-5 text-purple-600 group-hover:-translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <GradientHeading level="h1" className="mb-4">
            DTZ B1 Bild beschreiben
          </GradientHeading>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Üben Sie die Bildbeschreibung für die DTZ-Prüfung Teil 2. Wählen Sie
            ein Thema und hören Sie sich Beispielantworten an.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Suche nach Thema, Kategorie oder Dialog-Nummer..."
              className="w-full pl-12 pr-12 py-4 bg-white/80 backdrop-blur-md rounded-2xl border border-purple-100 focus:border-purple-300 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-20 transition-all duration-200 text-gray-900 placeholder-gray-400 shadow-sm hover:shadow-md"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-600">
                {filteredThemes.length === 0 ? (
                  <span className="text-red-600 font-medium">
                    Keine Ergebnisse gefunden für "{searchQuery}"
                  </span>
                ) : (
                  <span className="text-purple-600 font-medium">
                    {filteredThemes.length}{" "}
                    {filteredThemes.length === 1
                      ? "Thema gefunden"
                      : "Themen gefunden"}
                  </span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Info Banner */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-purple-100 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Wie funktioniert die Bildbeschreibung?
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Sie haben 1-2 Minuten Zeit, um ein Bild zu beschreiben
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Beschreiben Sie, was Sie sehen: Personen, Ort, Handlung,
                    Stimmung
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Stellen Sie Vermutungen an oder erzählen Sie von eigenen
                    Erfahrungen
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Themen für Bildbeschreibung
          </h2>
          <p className="text-gray-600">
            {filteredThemes.length}{" "}
            {filteredThemes.length === 1 ? "Thema" : "Themen"}{" "}
            {searchQuery ? "gefunden" : "verfügbar"}
          </p>
        </div>

        {/* Theme Grid */}
        {filteredThemes.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 opacity-20">
              <Search className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Keine Themen gefunden
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Versuchen Sie eine andere Suche oder löschen Sie den Suchbegriff.
            </p>
            <button
              onClick={clearSearch}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <X className="w-4 h-4" />
              Suche löschen
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredThemes.map((theme) => {
              const IconComponent = theme.icon;
              return (
                <Link
                  key={theme.id}
                  to={`/tests/sprechen/bild-beschreiben/${theme.id}/gallery`}
                  className="group bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-purple-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  {/* Icon and Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${theme.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200`}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
                      {theme.imageCount}{" "}
                      {theme.imageCount === 1 ? "Bild" : "Bilder"}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {theme.name}
                  </h3>

                  {/* Category */}
                  <p className="text-xs text-gray-600 mb-3">{theme.category}</p>

                  {/* View Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-purple-600 font-semibold group-hover:text-purple-700">
                      Bilder ansehen
                    </span>
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200">
                      <ImageIcon className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Info footer */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-white/80 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg border border-purple-100">
            <p className="text-gray-600">
              💡 <strong>Tipp:</strong> Sie können für jedes Thema später
              weitere Bilder hinzufügen
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
