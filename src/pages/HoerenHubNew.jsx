/**
 * HoerenHub - Redesigned with full viewport hero + all original content
 */

import { Link } from "react-router-dom";
import {
  ArrowRight,
  Target,
  Brain,
  Trophy,
  Play,
  Clock,
  Headphones,
  FileText,
  MessageSquare,
  X,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";

export default function HoerenHubNew() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const practiceOptions = [
    {
      id: "training",
      title: "Training",
      description: "Zufällige Fragen üben",
      icon: Brain,
      color: "from-purple-500 to-indigo-600",
      path: "/tests/hoeren/training",
    },
    {
      id: "test",
      title: "Prüfung",
      description: "Modelltest (25 Min)",
      icon: Trophy,
      color: "from-pink-500 to-purple-600",
      path: "/tests/hoeren/pruefung/modelltest-1",
    },
  ];

  const teileInfo = [
    {
      teil: "1",
      title: "Alltagsgespräche",
      duration: "8 Min",
      description: "4 kurze Dialoge",
      icon: MessageSquare,
      available: true,
    },
    {
      teil: "2",
      title: "Radio & Ansagen",
      duration: "10 Min",
      description: "3 Durchsagen",
      icon: Headphones,
      available: true,
    },
    {
      teil: "3",
      title: "Telefongespräche",
      duration: "7 Min",
      description: "5 Notizen",
      icon: FileText,
      available: true,
    },
  ];

  const videoGallery = [
    {
      id: "cWMwrsCITzY",
      title: "DTZ Hören",
      subtitle: "Probetest 1",
      category: "Hören Teil 1",
      difficulty: "B1",
      thumbnail: "https://img.youtube.com/vi/cWMwrsCITzY/maxresdefault.jpg",
    },
    {
      id: "TAd0wgrPzLE",
      title: "DTZ Hören",
      subtitle: "Probetest 2",
      category: "Hören Teil 1",
      difficulty: "B1",
      thumbnail: "https://img.youtube.com/vi/TAd0wgrPzLE/maxresdefault.jpg",
    },
    {
      id: "Y3ZOPYk6krQ",
      title: "DTZ Hören",
      subtitle: "Probetest 3",
      category: "Hören Teil 1",
      difficulty: "B1",
      thumbnail: "https://img.youtube.com/vi/Y3ZOPYk6krQ/maxresdefault.jpg",
    },
    {
      id: "m5xwgGUu5qA",
      title: "DTZ Hören",
      subtitle: "Probetest 4",
      category: "Hören Teil 1",
      difficulty: "B1",
      thumbnail: "https://img.youtube.com/vi/m5xwgGUu5qA/maxresdefault.jpg",
    },
    {
      id: "6lDEKYFhPy0",
      title: "DTZ Hören",
      subtitle: "Probetest 5",
      category: "Hören Teil 1",
      difficulty: "B1",
      thumbnail: "https://img.youtube.com/vi/6lDEKYFhPy0/maxresdefault.jpg",
    },
    {
      id: "uoxZqoLVY0o",
      title: "DTZ Hören",
      subtitle: "Probetest 6",
      category: "Hören Teil 1",
      difficulty: "B1",
      thumbnail: "https://img.youtube.com/vi/uoxZqoLVY0o/maxresdefault.jpg",
    },
    {
      id: "hIzmW8qQsDg",
      title: "DTZ Hören",
      subtitle: "Probetest 7",
      category: "Hören Teil 1",
      difficulty: "B1",
      thumbnail: "https://img.youtube.com/vi/hIzmW8qQsDg/maxresdefault.jpg",
    },
    {
      id: "pLtMtvcfKX8",
      title: "DTZ Hören",
      subtitle: "Probetest 8",
      category: "Hören Teil 1",
      difficulty: "B1",
      thumbnail: "https://img.youtube.com/vi/pLtMtvcfKX8/maxresdefault.jpg",
    },
  ];

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
      {/* Hero Section - Full Viewport */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Lottie Animation */}
            <div className="w-40 h-40 lg:w-48 lg:h-48 flex-shrink-0">
              <DotLottieReact
                src="https://lottie.host/e625cdca-0dac-4776-a55e-0b437f54c0a7/diw9hO8Z3c.lottie"
                loop
                autoplay
                className="w-full h-full filter brightness-125"
              />
            </div>

            {/* Text Content */}
            <div className="text-center lg:text-left flex-1">
              <h1 className="text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
                Hören Training
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-light mb-4">
                Hörverstehen üben mit Besty
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-white/80 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>25 Minuten</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>20 Punkte</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4" />
                  <span>3 Teile</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link to="/tests/hoeren/pruefung/modelltest-1">
                <button className="inline-flex items-center gap-3 bg-white text-purple-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-200 hover:bg-purple-50">
                  <span>Jetzt üben</span>
                  <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Prüfungsstruktur */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3 tracking-tight">
              Prüfungsstruktur
            </h2>
            <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-light">
              3 Teile • 25 Minuten • 20 Punkte
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {teileInfo.map((info) => {
              const Icon = info.icon;

              return (
                <div
                  key={info.teil}
                  className="group bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100 hover:shadow-3xl transition-all duration-200 hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                        <span className="text-2xl font-black text-white">
                          {info.teil}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">
                          Teil {info.teil}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Clock className="w-3 h-3" />
                          <span>{info.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-12 h-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:from-purple-100 group-hover:to-indigo-100 transition-all duration-200">
                      <Icon className="w-6 h-6 text-purple-600" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {info.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {info.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Übungsoptionen */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Wie möchten Sie üben?
          </h2>
          <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-light">
            Wählen Sie Ihren Lernweg
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {practiceOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Link
                key={option.id}
                to={option.path}
                className="group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100 hover:shadow-3xl transition-all duration-200 hover:-translate-y-2 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-3">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 text-base lg:text-lg mb-6 leading-relaxed">
                    {option.description}
                  </p>

                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-xl border border-purple-100 mb-6">
                    <span className="text-purple-600 text-sm font-semibold">
                      Alle Teile • Flexibel
                    </span>
                  </div>

                  <div className="flex items-center justify-end">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl flex items-center justify-center group-hover:from-purple-600 group-hover:to-indigo-600 transition-all duration-200">
                      <Play className="w-5 h-5 text-purple-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Video Gallery */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
              🎧 Probetests
            </h2>
            <p className="text-slate-600 text-xl leading-relaxed max-w-3xl mx-auto font-light">
              Echte DTZ Videos mit Lösungen
            </p>
          </div>

          <div className="relative py-8 px-4 -mx-4">
            <div className="flex gap-8 overflow-x-auto pb-16 pt-8 px-8 scrollbar-hide snap-x snap-mandatory scroll-smooth touch-pan-x md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4 lg:gap-6">
              {videoGallery.map((video) => (
                <div
                  key={video.id}
                  onClick={() => handleVideoClick(video)}
                  className="flex-none w-80 md:w-auto md:flex-auto group cursor-pointer snap-center md:snap-align-none transform-gpu"
                >
                  <div className="bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 group-hover:opacity-95">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover opacity-0"
                        onError={(e) => {
                          const videoId = video.id;
                          const fallbacks = [
                            `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
                            `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
                            `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
                            "https://via.placeholder.com/480x270/8B5CF6/FFFFFF?text=📺+Video",
                          ];

                          const currentSrc = e.target.src;
                          const currentIndex = fallbacks.findIndex((fb) =>
                            currentSrc.includes(fb.split("/").pop().split(".")[0])
                          );
                          const nextIndex = currentIndex + 1;

                          if (nextIndex < fallbacks.length) {
                            e.target.src = fallbacks[nextIndex];
                          }
                        }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 group-hover:from-purple-700 group-hover:via-indigo-700 group-hover:to-purple-900 transition-all duration-700">
                        <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/15 group-hover:scale-110 group-hover:bg-white/15 transition-all duration-500"></div>

                        <div className="absolute top-5 right-5">
                          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-purple-600 shadow-lg group-hover:bg-white group-hover:scale-105 transition-all duration-500">
                            {video.difficulty}
                          </div>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-24 h-24 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-125 group-hover:bg-white transition-all duration-500 shadow-2xl border border-white/20 group-hover:shadow-3xl">
                            <Play className="w-10 h-10 text-purple-600 fill-current ml-1 group-hover:text-purple-700 transition-colors duration-300" />
                          </div>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="text-center">
                        <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-purple-600 transition-colors duration-500">
                          {video.title}
                        </h3>
                        <p className="text-base font-semibold text-slate-600 mt-1 group-hover:text-purple-500 transition-colors duration-500">
                          {video.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8">
            <div className="relative bg-white rounded-2xl overflow-hidden max-w-5xl w-full max-h-[95vh] shadow-2xl">
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 hover:text-slate-800 hover:bg-white transition-all duration-300 shadow-lg"
              >
                ✕
              </button>

              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
                <h3 className="text-2xl font-bold mb-1">{selectedVideo.title}</h3>
                <p className="text-xl font-semibold text-purple-100">{selectedVideo.subtitle}</p>
              </div>

              <div className="relative bg-black">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=1`}
                    title={`${selectedVideo.title} ${selectedVideo.subtitle}`}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="h-2 bg-black"></div>
              </div>

              <div className="p-6 bg-slate-50">
                <div className="flex items-center gap-4">
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedVideo.category}
                  </span>
                  <span className="text-slate-600 flex items-center gap-1">
                    <span className="font-medium">{selectedVideo.difficulty} Level</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Animation */}
        <div className="text-center mt-16 mb-8">
          <div className="w-full h-96 flex items-center justify-center">
            <div className="w-full h-full">
              <DotLottieReact
                src="https://lottie.host/df4c6eaa-b74d-4587-a196-fb9379541445/4SAvaM4Szg.lottie"
                loop
                autoplay
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
