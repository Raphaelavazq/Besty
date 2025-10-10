import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Headphones,
  Eye,
  PenTool,
  MessageSquare,
  Target,
  Award,
  TrendingUp,
  PlayCircle,
  BarChart3,
  BookOpen,
  Briefcase,
  Heart,
  Plane,
  Home,
  Leaf,
  Banknote,
  Users,
  Building,
  ShoppingCart,
  Smartphone,
  Clock,
  Star,
  ChevronRight,
  Filter,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";
import { useStore } from "../store/useStore";

export default function Dashboard() {
  const { recentlyViewed } = useStore();
  const [themes, setThemes] = useState([]);
  const [tests, setTests] = useState([]);
  const [content, setContent] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Load data
  useEffect(() => {
    // Load themes
    fetch("/data/themes.json")
      .then((r) => r.json())
      .then(setThemes)
      .catch(() => setThemes([]));

    // Load tests
    fetch("/data/tests.json")
      .then((r) => r.json())
      .then(setTests)
      .catch(() => setTests([]));

    // Load content
    fetch("/data/content.json")
      .then((r) => r.json())
      .then(setContent)
      .catch(() => setContent([]));
  }, []);

  // Essential user data only
  const user = {
    name: "Maria Schmidt",
    progress: 78,
    streak: 12,
    completedTests: 24,
  };

  // Essential stats only
  const stats = [
    { title: "Fortschritt", value: "78%", icon: Target },
    { title: "Tests", value: "24", icon: Award },
    { title: "Streak", value: "12 Tage", icon: TrendingUp },
  ];

  // Essential subjects with purple/indigo theme
  const subjects = [
    {
      id: "hoeren",
      name: "Hören",
      icon: Headphones,
      progress: 85,
      description: "Verstehen von Gesprächen",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      id: "lesen",
      name: "Lesen",
      icon: Eye,
      progress: 72,
      description: "Verstehen von Texten",
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      id: "schreiben",
      name: "Schreiben",
      icon: PenTool,
      progress: 68,
      description: "E-Mails und Texte",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      id: "sprechen",
      name: "Sprechen",
      icon: MessageSquare,
      progress: 60,
      description: "Diskussion und Dialog",
      gradient: "from-indigo-600 to-blue-600",
    },
  ];

  // Helper functions
  const getThemeIcon = (iconName) => {
    const icons = {
      briefcase: Briefcase,
      heart: Heart,
      plane: Plane,
      home: Home,
      leaf: Leaf,
      banknote: Banknote,
      users: Users,
      building: Building,
      "shopping-cart": ShoppingCart,
      smartphone: Smartphone,
    };
    return icons[iconName] || Target;
  };

  const getSectionIcon = (section) => {
    switch (section) {
      case "hoeren":
        return Headphones;
      case "lesen":
        return BookOpen;
      case "schreiben":
        return PenTool;
      case "sprechen":
        return MessageSquare;
      default:
        return PlayCircle;
    }
  };

  // Filter functions
  const filteredTests = tests.filter((test) => {
    const matchesSection =
      selectedSection === "all" || test.section === selectedSection;
    const matchesSearch =
      test.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSection && matchesSearch;
  });

  const filteredContent = content.filter((item) => {
    const matchesTheme =
      selectedTheme === "all" || item.theme === selectedTheme;
    const matchesSection =
      selectedSection === "all" || item.section === selectedSection;
    const matchesSearch =
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subtitle?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTheme && matchesSection && matchesSearch;
  });

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 overflow-hidden">
      <div className="h-full max-w-7xl mx-auto p-4 grid grid-rows-[auto_1fr] gap-4">
        {/* Compact Header */}
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg mb-3">
            <Sparkles className="text-purple-600" size={16} />
            <span className="text-sm font-medium text-purple-700">
              DTZ B1 Hub
            </span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Willkommen, {user.name}
          </h1>
          <p className="text-slate-600">
            Alles für deine DTZ B1 Prüfung an einem Ort
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-12 grid-rows-6 gap-4 h-full min-h-0">
          {/* Stats Row */}
          <div className="col-span-12 row-span-1 grid grid-cols-3 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const gradients = [
                "from-purple-500 to-indigo-600",
                "from-indigo-500 to-purple-600",
                "from-purple-600 to-pink-600",
              ];
              return (
                <div
                  key={index}
                  className="relative overflow-hidden bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-5`}
                  ></div>
                  <div className="relative z-10 flex items-center gap-3">
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${gradients[index]} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-600">
                        {stat.title}
                      </p>
                      <p className="text-lg font-bold text-slate-800">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Prüfungsteile */}
          <div className="col-span-6 row-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
            <h2 className="text-lg font-bold text-slate-800 mb-3">
              Prüfungsteile
            </h2>
            <div className="grid grid-cols-2 gap-3 h-full">
              {subjects.map((subject) => {
                const Icon = subject.icon;
                return (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSection(subject.id)}
                    className="group bg-white/60 rounded-xl p-3 hover:shadow-md transition-all duration-300 border border-white/50"
                  >
                    <div
                      className={`w-8 h-8 bg-gradient-to-br ${subject.gradient} rounded-lg flex items-center justify-center mb-2 mx-auto shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon size={16} className="text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 mb-1 group-hover:text-purple-700 transition-colors">
                      {subject.name}
                    </h3>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mb-1">
                      <div
                        className={`h-1.5 rounded-full bg-gradient-to-r ${subject.gradient} transition-all duration-500`}
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-500">
                      {subject.progress}%
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Themes */}
          <div className="col-span-6 row-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
            <h2 className="text-lg font-bold text-slate-800 mb-3">Themen</h2>
            <div className="grid grid-cols-5 gap-2 h-full">
              {themes.slice(0, 10).map((theme, index) => {
                const Icon = getThemeIcon(theme.icon);
                const gradients = [
                  "from-purple-400 to-indigo-500",
                  "from-indigo-400 to-purple-500",
                  "from-purple-500 to-pink-500",
                  "from-indigo-500 to-blue-500",
                  "from-purple-600 to-indigo-600",
                ];
                const gradient = gradients[index % gradients.length];

                return (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`group bg-white/60 rounded-lg p-2 hover:shadow-md transition-all duration-300 border border-white/50 ${
                      selectedTheme === theme.id ? "ring-2 ring-purple-400" : ""
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-gradient-to-br ${gradient} rounded-md flex items-center justify-center mb-1 mx-auto shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon size={12} className="text-white" />
                    </div>
                    <h3 className="text-xs font-medium text-slate-800 text-center group-hover:text-purple-700 transition-colors truncate">
                      {theme.name}
                    </h3>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tests Section */}
          <div className="col-span-7 row-span-3 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-slate-800">Tests</h2>
              <div className="flex gap-1">
                {["all", "hoeren", "lesen", "schreiben", "sprechen"]
                  .slice(0, 5)
                  .map((section) => {
                    const Icon = getSectionIcon(section);
                    return (
                      <button
                        key={section}
                        onClick={() => setSelectedSection(section)}
                        className={`p-1.5 rounded-lg text-xs transition-all duration-200 ${
                          selectedSection === section
                            ? "bg-purple-600 text-white"
                            : "bg-white/60 text-slate-600 hover:bg-purple-50"
                        }`}
                      >
                        <Icon size={14} />
                      </button>
                    );
                  })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 h-[calc(100%-2.5rem)] overflow-y-auto">
              {filteredTests.slice(0, 6).map((test) => {
                const Icon = getSectionIcon(test.section);
                const sectionGradients = {
                  hoeren: "from-purple-500 to-indigo-600",
                  lesen: "from-indigo-500 to-purple-600",
                  schreiben: "from-purple-600 to-pink-600",
                  sprechen: "from-indigo-600 to-blue-600",
                };

                return (
                  <Link
                    key={test.id}
                    to={`/test/${test.id}`}
                    className="group bg-white/60 rounded-xl p-3 hover:shadow-md transition-all duration-300 border border-white/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div
                        className={`w-8 h-8 bg-gradient-to-br ${sectionGradients[test.section] || "from-purple-500 to-indigo-600"} rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon size={16} className="text-white" />
                      </div>
                      <span className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {test.duration || "15min"}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-800 mb-1 group-hover:text-purple-700 transition-colors line-clamp-1">
                      {test.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {test.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Content Section */}
          <div className="col-span-5 row-span-3 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-slate-800">Inhalte</h2>
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-24 pl-7 pr-2 py-1 text-xs rounded-lg border border-slate-200 focus:border-purple-500 transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-2 h-[calc(100%-2.5rem)] overflow-y-auto">
              {filteredContent.slice(0, 8).map((item) => {
                const Icon = getSectionIcon(item.section);
                const sectionGradients = {
                  hoeren: "from-purple-500 to-indigo-600",
                  lesen: "from-indigo-500 to-purple-600",
                  schreiben: "from-purple-600 to-pink-600",
                  sprechen: "from-indigo-600 to-blue-600",
                };
                const themeData = themes.find((t) => t.id === item.theme);

                return (
                  <Link
                    key={item.id}
                    to={`/content/${item.id}`}
                    className="group bg-white/60 rounded-lg p-3 hover:shadow-md transition-all duration-300 border border-white/50 block"
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={`w-6 h-6 bg-gradient-to-br ${sectionGradients[item.section] || "from-purple-500 to-indigo-600"} rounded-md flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                      >
                        <Icon size={12} className="text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-xs text-slate-800 mb-1 group-hover:text-purple-700 transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-1">
                          {item.subtitle}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs font-medium text-purple-600 bg-purple-50 px-1 py-0.5 rounded">
                            {item.section?.toUpperCase()}
                          </span>
                          {themeData && (
                            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded">
                              {themeData.name}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
