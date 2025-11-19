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
  Headphones,
  FileText,
  MessageSquare,
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary">
      {/* Hero Section - Full Viewport with Glass Layer */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 dark:from-purple-900 dark:via-indigo-950 dark:to-purple-950 min-h-screen flex items-center p-4 sm:p-8 lg:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>

        {/* Full Glass Container */}
        <div className="absolute inset-4 sm:inset-8 lg:inset-12 bg-purple-500/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl"></div>

        <div className="relative max-w-7xl mx-auto w-full z-10">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12">
            {/* Lottie Animation */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-80 lg:h-80 flex-shrink-0 flex items-center justify-center">
              <DotLottieReact
                src="https://lottie.host/4d3e31f5-81a0-4a2f-ae91-4005e44d6183/yN5pIHb42r.lottie"
                loop
                autoplay
                className="w-full h-full filter brightness-125"
              />
            </div>

            {/* Text Content */}
            <div className="text-center lg:text-left flex-1 px-2 sm:px-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 lg:mb-8 tracking-tight leading-tight">
                DTZ Hören
              </h1>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-white/80 text-xs sm:text-sm mb-5 sm:mb-6 lg:mb-8">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="font-semibold">25 Minuten</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="font-semibold">20 Punkte</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="font-semibold">3 Teile</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link to="/tests/hoeren/training">
                <button className="inline-flex items-center gap-2 bg-white dark:bg-white/10 text-purple-700 dark:text-purple-400 px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-200 hover:bg-purple-50 dark:hover:bg-white/20 border-2 border-transparent dark:border-purple-500/30 w-full sm:w-auto">
                  <span>Jetzt üben</span>
                  <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                </button>
              </Link>
            </div>
          </div>

          {/* Scroll Indicator - Centered Below Content - Hidden on Mobile */}
          <div className="hidden sm:flex justify-center mt-8 lg:mt-12 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1">
              <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Prüfungsstruktur - Clean Timeline Design */}
        <div className="mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2 sm:mb-3 tracking-tight leading-tight pb-2">
              Prüfungsstruktur
            </h2>
            <p className="text-slate-600 dark:text-dark-text-secondary text-base sm:text-lg lg:text-xl leading-relaxed font-light">
              3 Teile • 25 Minuten • 20 Punkte
            </p>
          </div>

          {/* Timeline Layout */}
          <div className="max-w-5xl mx-auto space-y-8">
            {teileInfo.map((info, index) => {
              const Icon = info.icon;

              return (
                <div
                  key={info.teil}
                  className="relative flex gap-6 items-start group"
                >
                  {/* Part Number Circle */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl font-black text-white">
                        {info.teil}
                      </span>
                    </div>
                    {/* Connecting Line */}
                    {index < teileInfo.length - 1 && (
                      <div className="absolute left-10 top-20 w-0.5 h-16 bg-gradient-to-b from-purple-300 to-purple-200 dark:from-purple-500/50 dark:to-purple-600/30"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">
                          {info.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                        <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                          {info.duration}
                        </span>
                      </div>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-dark-text-secondary leading-relaxed">
                      {info.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Divider */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4 tracking-tight">
            Wie möchten Sie üben?
          </h2>
          <p className="text-slate-600 dark:text-dark-text-secondary text-lg lg:text-xl leading-relaxed font-light">
            Wählen Sie Ihren Lernweg
          </p>
        </div>

        {/* Practice Mode Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {practiceOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Link
                key={option.id}
                to={option.path}
                className="group relative bg-white/90 dark:bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-200 dark:border-purple-400/40 hover:shadow-3xl hover:border-purple-300 dark:hover:border-purple-400/60 transition-all duration-200 hover:-translate-y-2 hover:scale-105 overflow-hidden cursor-pointer"
              >
                {/* Hover Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 dark:from-purple-500/10 dark:to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                <div className="relative">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-dark-text-primary mb-3">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 dark:text-dark-text-secondary text-base lg:text-lg mb-6 leading-relaxed">
                    {option.description}
                  </p>

                  {/* Details Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-100 dark:border-purple-500/30 mb-6">
                    <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold">
                      Alle Teile • Flexibel
                    </span>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="flex items-center justify-end">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center group-hover:from-purple-600 group-hover:to-indigo-600 dark:group-hover:from-purple-500 dark:group-hover:to-indigo-500 transition-all duration-200">
                      <Play className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Video Gallery Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4 tracking-tight">
              🎧 Probetests
            </h2>
            <p className="text-slate-600 dark:text-dark-text-secondary text-xl leading-relaxed max-w-3xl mx-auto font-light">
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
                  <div className="bg-white/90 dark:bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-xl border border-purple-200 dark:border-purple-400/40 hover:shadow-3xl hover:border-purple-300 dark:hover:border-purple-400/60 transition-all duration-500 hover:-translate-y-2 hover:scale-105">
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
                        <h3 className="text-lg font-bold text-slate-800 dark:text-dark-text-primary leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-500">
                          {video.title}
                        </h3>
                        <p className="text-base font-semibold text-slate-600 dark:text-dark-text-secondary mt-1 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-500">
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
            <div className="relative bg-white dark:bg-dark-bg-secondary rounded-2xl overflow-hidden max-w-5xl w-full max-h-[95vh] shadow-2xl">
              {/* Close Button */}
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 dark:bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 dark:text-dark-text-primary hover:text-slate-800 dark:hover:text-white hover:bg-white dark:hover:bg-white/20 transition-all duration-300 shadow-lg"
              >
                ✕
              </button>

              {/* Video Header */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 text-white p-6">
                <h3 className="text-2xl font-bold mb-1">
                  {selectedVideo.title}
                </h3>
                <p className="text-xl font-semibold text-purple-100 dark:text-purple-200">
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
              <div className="p-6 bg-slate-50 dark:bg-dark-bg-tertiary">
                <div className="flex items-center gap-4">
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedVideo.category}
                  </span>
                  <span className="text-slate-600 dark:text-dark-text-secondary flex items-center gap-1">
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
