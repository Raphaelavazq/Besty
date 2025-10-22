import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ImageIcon,
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
} from "lucide-react";
import GradientHeading from "../components/ui/GradientHeading";
import { useState } from "react";
import bildData from "../../data/bild-beschreiben.json";

export default function ThemeGallery() {
  const { themeId } = useParams();
  const navigate = useNavigate();

  // Theme data matching BildBeschreiben.jsx
  const themes = {
    "lernen-bildung": {
      name: "Lernen und Bildung",
      icon: BookOpen,
      color: "from-purple-500 to-indigo-600",
      exercises: [1],
    },
    "familie-kinder": {
      name: "Familie und Kinder",
      icon: Users,
      color: "from-pink-500 to-purple-600",
      exercises: [2, 3],
    },
    einkaufen: {
      name: "Einkaufen",
      icon: ShoppingCart,
      color: "from-indigo-500 to-purple-600",
      exercises: [4],
    },
    gesundheit: {
      name: "Gesundheit",
      icon: Heart,
      color: "from-red-500 to-pink-600",
      exercises: [5],
    },
    wohnen: {
      name: "Wohnen",
      icon: Home,
      color: "from-blue-500 to-indigo-600",
      exercises: [6],
    },
    "arbeit-beruf": {
      name: "Arbeit und Beruf",
      icon: Briefcase,
      color: "from-purple-600 to-pink-600",
      exercises: [7],
    },
    "essen-trinken": {
      name: "Essen und Trinken",
      icon: Utensils,
      color: "from-orange-500 to-red-600",
      exercises: [8],
    },
    "reisen-verkehr": {
      name: "Reisen und Verkehr",
      icon: Plane,
      color: "from-cyan-500 to-blue-600",
      exercises: [9],
    },
    "medien-kommunikation": {
      name: "Medien und Kommunikation",
      icon: Smartphone,
      color: "from-indigo-500 to-purple-600",
      exercises: [10],
    },
    "sport-fitness": {
      name: "Sport und Fitness",
      icon: Trophy,
      color: "from-green-500 to-teal-600",
      exercises: [11],
    },
    "natur-umwelt": {
      name: "Natur und Umwelt",
      icon: TreePine,
      color: "from-emerald-500 to-green-600",
      exercises: [12],
    },
    "feste-feiern": {
      name: "Feste und Feiern",
      icon: PartyPopper,
      color: "from-purple-500 to-pink-600",
      exercises: [13],
    },
    freizeit: {
      name: "Freizeit",
      icon: Palette,
      color: "from-violet-500 to-purple-600",
      exercises: [14],
    },
    freundschaft: {
      name: "Freundschaft",
      icon: UserPlus,
      color: "from-amber-500 to-orange-600",
      exercises: [15],
    },
  };

  const theme = themes[themeId];

  // manifest fallback: if manifest has images for this themeId, use them
  const manifest = bildData && bildData.themes ? bildData.themes : {};
  const manifestImages = manifest[themeId] || null;
  const [visibleCount, setVisibleCount] = useState(12);

  if (!theme) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Thema nicht gefunden
          </h2>
          <Link
            to="/tests/sprechen/bild-beschreiben"
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            ← Zurück zur Übersicht
          </Link>
        </div>
      </div>
    );
  }

  // Exercise details for image display (fallback)
  const exerciseDetails = {
    1: {
      title: "Lernen und Bildung",
      imageUrl: "/images/sprechen/bild-beschreiben/1.png",
    },
    2: {
      title: "Familie und Kinder - Bild 1",
      imageUrl: "/images/sprechen/bild-beschreiben/2.jpg",
    },
    3: {
      title: "Familie und Kinder - Bild 2",
      imageUrl: "/images/sprechen/bild-beschreiben/3.png",
    },
    4: {
      title: "Einkaufen",
      imageUrl: "/images/sprechen/bild-beschreiben/4.jpg",
    },
    5: {
      title: "Gesundheit",
      imageUrl: "/images/sprechen/bild-beschreiben/5.jpg",
    },
    6: { title: "Wohnen", imageUrl: "/images/sprechen/bild-beschreiben/6.jpg" },
    7: {
      title: "Arbeit und Beruf",
      imageUrl: "/images/sprechen/bild-beschreiben/7.jpg",
    },
    8: {
      title: "Essen und Trinken",
      imageUrl: "/images/sprechen/bild-beschreiben/8.png",
    },
    9: {
      title: "Reisen und Verkehr",
      imageUrl: "/images/sprechen/bild-beschreiben/9.jpeg",
    },
    10: {
      title: "Medien und Kommunikation",
      imageUrl: "/images/sprechen/bild-beschreiben/10.jpg",
    },
    11: {
      title: "Sport und Fitness",
      imageUrl: "/images/sprechen/bild-beschreiben/11.jpg",
    },
    12: {
      title: "Natur und Umwelt",
      imageUrl: "/images/sprechen/bild-beschreiben/12.jpg",
    },
    13: {
      title: "Feste und Feiern",
      imageUrl: "/images/sprechen/bild-beschreiben/13.jpg",
    },
    14: {
      title: "Freizeit",
      imageUrl: "/images/sprechen/bild-beschreiben/14.jpeg",
    },
    15: {
      title: "Freundschaft",
      imageUrl: "/images/sprechen/bild-beschreiben/15.jpeg",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/tests/sprechen/bild-beschreiben")}
          className="group mb-8 flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
        >
          <div className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-xl flex items-center justify-center shadow-sm border border-purple-100 group-hover:shadow-md group-hover:border-purple-200 transition-all duration-200">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-semibold">Zurück zur Themenübersicht</span>
        </button>

        {/* Theme Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div
              className={`w-12 h-12 bg-gradient-to-r ${theme.color} rounded-xl flex items-center justify-center shadow-lg`}
            >
              <theme.icon className="w-6 h-6 text-white" />
            </div>
          </div>
          <GradientHeading className="mb-2">{theme.name}</GradientHeading>
          <p className="text-gray-600">
            {theme.exercises.length}{" "}
            {theme.exercises.length === 1 ? "Bild" : "Bilder"} verfügbar
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {manifestImages
            ? manifestImages
                .map((img, index) => (
                  <Link
                    key={img.id || img.file}
                    to={`/tests/sprechen/bild-beschreiben/${img.id}`}
                    className="group bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-purple-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                  >
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-purple-100 to-indigo-100 overflow-hidden">
                      <img
                        src={img.file}
                        alt={img.alt || `${theme.name} Bild ${index + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                        <span className="text-xs font-bold text-purple-600">
                          Bild {index + 1}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                        {img.title || `${theme.name} - Bild ${index + 1}`}
                      </h3>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-sm text-purple-600 font-semibold group-hover:text-purple-700">
                          Übung starten
                        </span>
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                          <ImageIcon className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
                .slice(0, visibleCount)
            : theme.exercises.map((exerciseId, index) => {
                const exercise = exerciseDetails[exerciseId];
                return (
                  <Link
                    key={exerciseId}
                    to={`/tests/sprechen/bild-beschreiben/${exerciseId}`}
                    className="group bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-purple-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-purple-100 to-indigo-100 overflow-hidden">
                      <img
                        src={exercise.imageUrl}
                        alt={exercise.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center">
                              <div class="text-center">
                                <div class="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                                  <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                                <div class="text-sm font-medium text-gray-600">Bild ${index + 1}</div>
                              </div>
                            </div>
                          `;
                        }}
                      />
                      {/* Badge */}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                        <span className="text-xs font-bold text-purple-600">
                          Bild {index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="text-base font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                        {exercise.title}
                      </h3>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-sm text-purple-600 font-semibold group-hover:text-purple-700">
                          Übung starten
                        </span>
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                          <ImageIcon className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
        </div>
        {/* Load more */}
        {manifestImages && manifestImages.length > visibleCount && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setVisibleCount((v) => v + 12)}
              className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md hover:scale-105 transition-transform duration-150"
            >
              Mehr Bilder laden
            </button>
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-white/80 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg border border-purple-100">
            <p className="text-gray-600">
              💡 <strong>Tipp:</strong> Wählen Sie ein Bild aus, um die Übung zu
              starten
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
