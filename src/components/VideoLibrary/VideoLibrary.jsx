import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  Play,
  Download,
  Clock,
} from "lucide-react";
import VideoCard from "./VideoCard";
import VideoPlayer from "./VideoPlayer";

const VideoLibrary = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("publishedAt");
  const [filterBy, setFilterBy] = useState("all");
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // YouTube playlist ID from the URL you provided
  const PLAYLIST_ID = "PLnigHW0PZn9icpHE6_JRK-aaarnt9DbvT";

  // Mock data structure that matches YouTube API response
  const mockVideos = [
    {
      id: "cWMwrsCITzY",
      videoId: "cWMwrsCITzY",
      type: "youtube",
      title: "DTZ Hörverstehen Teil 1 - Ansagen verstehen",
      description:
        "In diesem Video lernen Sie, wie Sie Ansagen im DTZ Hörverstehen Teil 1 erfolgreich bearbeiten.",
      thumbnail: "https://img.youtube.com/vi/cWMwrsCITzY/maxresdefault.jpg",
      duration: "PT12M34S",
      publishedAt: "2024-01-15T10:00:00Z",
      channelTitle: "Deutsch Lernen",
      viewCount: "15420",
      category: "Hörverstehen",
    },
    {
      id: "example2",
      videoId: "example2",
      type: "youtube",
      title: "DTZ Hörverstehen Teil 2 - Radiobeiträge",
      description:
        "Lernen Sie Strategien für das Verstehen von Radiobeiträgen in der DTZ Prüfung.",
      thumbnail: "https://img.youtube.com/vi/example2/maxresdefault.jpg",
      duration: "PT15M22S",
      publishedAt: "2024-01-20T14:30:00Z",
      channelTitle: "Deutsch Lernen",
      viewCount: "12890",
      category: "Hörverstehen",
    },
    {
      id: "example3",
      videoId: "example3",
      type: "youtube",
      title: "DTZ Hörverstehen Teil 3 - Gespräche",
      description:
        "Tipps und Tricks für das Verstehen von Alltagsgesprächen im DTZ.",
      thumbnail: "https://img.youtube.com/vi/example3/maxresdefault.jpg",
      duration: "PT18M45S",
      publishedAt: "2024-01-25T09:15:00Z",
      channelTitle: "Deutsch Lernen",
      viewCount: "18765",
      category: "Hörverstehen",
    },
  ];

  useEffect(() => {
    loadVideos();
  }, []);

  useEffect(() => {
    filterAndSortVideos();
  }, [videos, searchTerm, sortBy, filterBy]);

  const loadVideos = async () => {
    try {
      setLoading(true);
      // In a real implementation, you would fetch from YouTube API:
      // const response = await fetch(`/api/youtube/playlist/${PLAYLIST_ID}`);
      // const data = await response.json();

      // For now, using mock data
      setTimeout(() => {
        setVideos(mockVideos);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Failed to load videos");
      setLoading(false);
    }
  };

  const filterAndSortVideos = () => {
    let filtered = [...videos];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          video.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filterBy !== "all") {
      filtered = filtered.filter((video) => video.category === filterBy);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "publishedAt":
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        case "title":
          return a.title.localeCompare(b.title);
        case "viewCount":
          return parseInt(b.viewCount) - parseInt(a.viewCount);
        case "duration":
          // Parse duration for sorting
          const getDurationSeconds = (duration) => {
            const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
            if (!match) return 0;
            const hours = parseInt(match[1] || 0);
            const minutes = parseInt(match[2] || 0);
            const seconds = parseInt(match[3] || 0);
            return hours * 3600 + minutes * 60 + seconds;
          };
          return (
            getDurationSeconds(a.duration) - getDurationSeconds(b.duration)
          );
        default:
          return 0;
      }
    });

    setFilteredVideos(filtered);
  };

  const handlePlayVideo = (video) => {
    setCurrentVideo(video);
    setIsPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
    setCurrentVideo(null);
  };

  const handleNextVideo = () => {
    const currentIndex = filteredVideos.findIndex(
      (v) => v.id === currentVideo.id
    );
    if (currentIndex < filteredVideos.length - 1) {
      setCurrentVideo(filteredVideos[currentIndex + 1]);
    }
  };

  const handlePreviousVideo = () => {
    const currentIndex = filteredVideos.findIndex(
      (v) => v.id === currentVideo.id
    );
    if (currentIndex > 0) {
      setCurrentVideo(filteredVideos[currentIndex - 1]);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 flex items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-red-100 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-slate-600">{error}</p>
          <button
            onClick={loadVideos}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Play size={36} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Video Bibliothek
          </h1>
          <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Lernen Sie mit hochwertigen Videos für Ihre DTZ B1
            Prüfungsvorbereitung
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Videos suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm"
              >
                <option value="all">Alle Kategorien</option>
                <option value="Hörverstehen">Hörverstehen</option>
                <option value="Leseverstehen">Leseverstehen</option>
                <option value="Schreiben">Schreiben</option>
                <option value="Sprechen">Sprechen</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm"
              >
                <option value="publishedAt">Neueste zuerst</option>
                <option value="title">Titel A-Z</option>
                <option value="viewCount">Aufrufe</option>
                <option value="duration">Dauer</option>
              </select>

              <div className="flex items-center gap-2 border border-slate-200 rounded-lg p-1 bg-white/80 backdrop-blur-sm">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-purple-100 text-purple-600" : "text-slate-600 hover:bg-slate-100"} transition-colors`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-purple-100 text-purple-600" : "text-slate-600 hover:bg-slate-100"} transition-colors`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-indigo-100"></div>
                <div className="p-4">
                  <div className="h-4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video Grid */}
        {!loading && (
          <>
            {/* Results count */}
            <div className="mb-6 text-slate-600">
              {filteredVideos.length} Video
              {filteredVideos.length !== 1 ? "s" : ""} gefunden
            </div>

            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 max-w-4xl"
              }`}
            >
              {filteredVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onPlay={handlePlayVideo}
                  isActive={currentVideo?.id === video.id}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredVideos.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Keine Videos gefunden
                </h3>
                <p className="text-slate-500">
                  Versuchen Sie es mit anderen Suchbegriffen oder Filtern
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Video Player Modal */}
      <VideoPlayer
        video={currentVideo}
        isOpen={isPlayerOpen}
        onClose={handleClosePlayer}
        onNext={handleNextVideo}
        onPrevious={handlePreviousVideo}
      />
    </div>
  );
};

export default VideoLibrary;
