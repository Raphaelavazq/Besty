import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Target,
  Brain,
  Trophy,
  Award,
  Play,
  Clock,
  Eye,
  Users,
  ChevronRight,
  Bookmark,
  X,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";

export default function HoerenHub() {
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

  // Video gallery data extracted from YouTube URLs
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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Navigation */}
        <Link
          to="/tests"
          className="inline-flex items-center gap-3 text-slate-600 hover:text-purple-600 mb-12 bg-white/70 backdrop-blur-xl rounded-3xl px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 border border-white/30 group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />
          <span className="font-semibold">Zurück zu Tests</span>
        </Link>

        {/* Main Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Hören üben
          </h1>
          <p className="text-slate-600 text-xl leading-relaxed max-w-3xl mx-auto font-light">
            Deutsche Hörtexte verstehen und DTZ bestehen
          </p>
        </div>

        {/* Practice Mode Cards */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {practiceOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Link
                key={option.id}
                to={option.path}
                className="group block bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 relative"
              >
                {/* Glass-morphism card with gradient overlay */}
                <div
                  className={`relative bg-gradient-to-br ${option.color} p-10 overflow-hidden`}
                >
                  {/* Glassmorphism Bubble Decorations */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 group-hover:scale-125 transition-transform duration-500"></div>
                  <div className="absolute top-1/2 -right-6 w-12 h-12 bg-white/8 backdrop-blur-sm rounded-full border border-white/20 group-hover:scale-105 transition-transform duration-600"></div>
                  <div className="absolute -top-4 left-1/4 w-8 h-8 bg-white/12 backdrop-blur-sm rounded-full border border-white/20 group-hover:scale-115 transition-transform duration-800"></div>
                  <div className="absolute bottom-1/4 -left-2 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full border border-white/20 group-hover:scale-120 transition-transform duration-400"></div>

                  {/* Animated background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-500">
                        <Icon size={32} className="text-white drop-shadow-lg" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg tracking-tight leading-tight">
                          {option.title}
                        </h3>
                        <p className="text-white/90 text-lg font-medium leading-relaxed drop-shadow-sm">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Video Gallery Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
              🎧 Probetests
            </h2>
            <p className="text-slate-600 text-xl leading-relaxed max-w-3xl mx-auto font-light">
              Echte DTZ Videos mit Lösungen
            </p>
          </div>

          {/* Responsive Video Gallery */}
          <div className="relative py-8 px-4 -mx-4">
            <div className="flex gap-8 overflow-x-auto pb-16 pt-8 px-8 scrollbar-hide snap-x snap-mandatory scroll-smooth touch-pan-x md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4 lg:gap-6">
              {videoGallery.map((video, index) => (
                <div
                  key={video.id}
                  onClick={() => handleVideoClick(video)}
                  className="flex-none w-80 md:w-auto md:flex-auto group cursor-pointer snap-center md:snap-align-none transform-gpu"
                >
                  {/* Clean Video Card */}
                  <div className="bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 group-hover:opacity-95">
                    {/* Video Cover */}
                    <div className="relative aspect-video overflow-hidden">
                      {/* Background thumbnail (completely hidden) */}
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
                            currentSrc.includes(
                              fb.split("/").pop().split(".")[0]
                            )
                          );
                          const nextIndex = currentIndex + 1;

                          if (nextIndex < fallbacks.length) {
                            e.target.src = fallbacks[nextIndex];
                          }
                        }}
                      />

                      {/* Modern Glass Cover Design */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 group-hover:from-purple-700 group-hover:via-indigo-700 group-hover:to-purple-900 transition-all duration-700">
                        {/* Glassmorphism Bubble - Bottom Left Corner (partially hidden) */}
                        <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/15 group-hover:scale-110 group-hover:bg-white/15 transition-all duration-500"></div>

                        {/* B1 Badge - Top Right */}
                        <div className="absolute top-5 right-5">
                          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-purple-600 shadow-lg group-hover:bg-white group-hover:scale-105 transition-all duration-500">
                            {video.difficulty}
                          </div>
                        </div>

                        {/* Center Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-24 h-24 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-125 group-hover:bg-white transition-all duration-500 shadow-2xl border border-white/20 group-hover:shadow-3xl">
                            <Play className="w-10 h-10 text-purple-600 fill-current ml-1 group-hover:text-purple-700 transition-colors duration-300" />
                          </div>
                        </div>

                        {/* Hover overlay with fade effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </div>
                    </div>

                    {/* Clean Title Section */}
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
              {/* Close Button */}
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 hover:text-slate-800 hover:bg-white transition-all duration-300 shadow-lg"
              >
                ✕
              </button>

              {/* Video Header */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
                <h3 className="text-2xl font-bold mb-1">
                  {selectedVideo.title}
                </h3>
                <p className="text-xl font-semibold text-purple-100">
                  {selectedVideo.subtitle}
                </p>
              </div>

              {/* Embedded Video with Proper Spacing */}
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
                {/* Extra space for YouTube controls */}
                <div className="h-2 bg-black"></div>
              </div>

              {/* Video Info Footer */}
              <div className="p-6 bg-slate-50">
                <div className="flex items-center gap-4">
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedVideo.category}
                  </span>
                  <span className="text-slate-600 flex items-center gap-1">
                    <span className="font-medium">
                      {selectedVideo.difficulty} Level
                    </span>
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
