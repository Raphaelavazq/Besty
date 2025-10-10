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
  Sparkles,
  Zap,
  GraduationCap,
  FileText,
  Brain,
} from "lucide-react";

export default function Dashboard() {
  const [themes, setThemes] = useState([]);
  const [selectedAction, setSelectedAction] = useState("overview");
  const [selectedTheme, setSelectedTheme] = useState(null);

  // Load themes data
  useEffect(() => {
    fetch("/data/themes.json")
      .then((r) => r.json())
      .then(setThemes)
      .catch(() => setThemes([]));
  }, []);

  // User data
  const user = {
    name: "Maria Schmidt",
    level: "B1",
    streak: 12,
    completedTests: 24,
  };

  // Main action categories
  const actions = [
    {
      id: "overview",
      title: "Überblick",
      icon: Target,
      color: "from-purple-500 to-indigo-600",
      description: "Deine Übersicht",
    },
    {
      id: "study",
      title: "Lernen",
      icon: Brain,
      color: "from-indigo-500 to-purple-600",
      description: "Inhalte studieren",
    },
    {
      id: "test",
      title: "Tests",
      icon: FileText,
      color: "from-purple-600 to-pink-600",
      description: "Prüfung üben",
    },
  ];

  // 4 Prüfungsteile
  const teile = [
    {
      id: "hoeren",
      name: "Hören",
      icon: Headphones,
      color: "from-purple-500 to-indigo-600",
    },
    {
      id: "lesen",
      name: "Lesen",
      icon: Eye,
      color: "from-indigo-500 to-purple-600",
    },
    {
      id: "schreiben",
      name: "Schreiben",
      icon: PenTool,
      color: "from-purple-600 to-pink-600",
    },
    {
      id: "sprechen",
      name: "Sprechen",
      icon: MessageSquare,
      color: "from-indigo-600 to-blue-600",
    },
  ];

  // Theme icon mapping
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

  return (
    // Viewport-locked app shell
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 grid grid-rows-[auto_1fr] md:grid-rows-[auto_1fr_auto] grid-cols-1 md:grid-cols-[280px_1fr] gap-1 p-1 md:p-2">
      {/* Header - spans full width on mobile, left column on desktop */}
      <header className="md:col-span-2 bg-white/80 backdrop-blur-md rounded-xl border border-white/50 shadow-lg p-4 flex items-center justify-between min-h-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <GraduationCap size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              B1 Bestie
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              DTZ Vorbereitung
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-slate-700">
            Willkommen, {user.name}
          </div>
          <div className="text-xs text-slate-500">Level {user.level}</div>
        </div>
      </header>

      {/* Sidebar - hidden on mobile, fixed width on desktop */}
      <aside className="hidden md:block bg-white/80 backdrop-blur-md rounded-xl border border-white/50 shadow-lg overflow-hidden">
        <div className="p-4 border-b border-purple-100">
          <h2 className="font-semibold text-slate-700 text-sm">Aktionen</h2>
        </div>
        <nav className="p-2 space-y-1 overflow-y-auto h-full">
          {actions.map((action) => {
            const Icon = action.icon;
            const isActive = selectedAction === action.id;
            return (
              <button
                key={action.id}
                onClick={() => setSelectedAction(action.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left ${
                  isActive
                    ? `bg-gradient-to-r ${action.color} text-white shadow-lg`
                    : "text-slate-600 hover:bg-purple-50 hover:text-purple-700"
                }`}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-white" : "text-slate-500"}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{action.title}</div>
                  <div
                    className={`text-xs ${isActive ? "text-white/80" : "text-slate-500"}`}
                  >
                    {action.description}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area - scrollable panel */}
      <main className="bg-white/80 backdrop-blur-md rounded-xl border border-white/50 shadow-lg overflow-hidden flex flex-col min-h-0">
        {/* Mobile Action Tabs */}
        <div className="md:hidden border-b border-purple-100 p-2">
          <div className="flex gap-1">
            {actions.map((action) => {
              const Icon = action.icon;
              const isActive = selectedAction === action.id;
              return (
                <button
                  key={action.id}
                  onClick={() => setSelectedAction(action.id)}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? `bg-gradient-to-r ${action.color} text-white shadow-lg`
                      : "text-slate-600 hover:bg-purple-50"
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm font-medium hidden sm:inline">
                    {action.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Overview Panel */}
          {selectedAction === "overview" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-4 text-white">
                  <Award size={20} className="mb-2 opacity-80" />
                  <div className="text-2xl font-bold">
                    {user.completedTests}
                  </div>
                  <div className="text-sm opacity-80">Tests</div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-4 text-white">
                  <TrendingUp size={20} className="mb-2 opacity-80" />
                  <div className="text-2xl font-bold">{user.streak}</div>
                  <div className="text-sm opacity-80">Tage Streak</div>
                </div>
                <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl p-4 text-white">
                  <Sparkles size={20} className="mb-2 opacity-80" />
                  <div className="text-2xl font-bold">B1</div>
                  <div className="text-sm opacity-80">Level</div>
                </div>
              </div>

              {/* Prüfungsteile */}
              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-4">
                  Prüfungsteile
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {teile.map((teil) => {
                    const Icon = teil.icon;
                    return (
                      <Link
                        key={teil.id}
                        to={`/tests?filter=${teil.id}`}
                        className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-slate-100"
                      >
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${teil.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}
                        >
                          <Icon size={20} className="text-white" />
                        </div>
                        <h4 className="font-medium text-slate-700 mb-1">
                          {teil.name}
                        </h4>
                        <p className="text-xs text-slate-500">Prüfung üben</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Study Panel */}
          {selectedAction === "study" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-4">
                  Themen zum Lernen
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {themes.map((theme, index) => {
                    const Icon = getThemeIcon(theme.icon);
                    const colors = [
                      "from-purple-400 to-indigo-500",
                      "from-indigo-400 to-purple-500",
                      "from-purple-500 to-pink-500",
                      "from-indigo-500 to-blue-500",
                      "from-purple-600 to-indigo-600",
                    ];
                    const color = colors[index % colors.length];
                    const isSelected = selectedTheme === theme.id;

                    return (
                      <button
                        key={theme.id}
                        onClick={() =>
                          setSelectedTheme(isSelected ? null : theme.id)
                        }
                        className={`group bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-200 border ${
                          isSelected
                            ? "border-purple-300 ring-2 ring-purple-200"
                            : "border-slate-100"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-transform duration-200`}
                        >
                          <Icon size={16} className="text-white" />
                        </div>
                        <div className="text-xs font-medium text-slate-700 text-center">
                          {theme.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedTheme && (
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      {(() => {
                        const ThemeIcon = getThemeIcon(
                          themes.find((t) => t.id === selectedTheme)?.icon
                        );
                        return <ThemeIcon size={16} className="text-white" />;
                      })()}
                    </div>
                    <h4 className="font-semibold text-slate-700">
                      {themes.find((t) => t.id === selectedTheme)?.name}
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to={`/content?theme=${selectedTheme}`}
                      className="bg-white rounded-lg p-3 text-center hover:bg-purple-50 transition-colors"
                    >
                      <BookOpen
                        size={16}
                        className="mx-auto mb-1 text-purple-600"
                      />
                      <div className="text-xs font-medium text-slate-700">
                        Inhalte
                      </div>
                    </Link>
                    <Link
                      to={`/tests?theme=${selectedTheme}`}
                      className="bg-white rounded-lg p-3 text-center hover:bg-purple-50 transition-colors"
                    >
                      <PlayCircle
                        size={16}
                        className="mx-auto mb-1 text-purple-600"
                      />
                      <div className="text-xs font-medium text-slate-700">
                        Üben
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Test Panel */}
          {selectedAction === "test" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-4">
                  Prüfung üben
                </h3>

                {/* Quick Test Actions */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Link
                    to="/tests"
                    className="group bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <PlayCircle
                      size={24}
                      className="mb-3 group-hover:scale-110 transition-transform"
                    />
                    <h4 className="font-semibold mb-1">Volltest</h4>
                    <p className="text-sm opacity-80">
                      Komplette DTZ B1 Simulation
                    </p>
                  </Link>
                  <Link
                    to="/tests?mode=quick"
                    className="group bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Zap
                      size={24}
                      className="mb-3 group-hover:scale-110 transition-transform"
                    />
                    <h4 className="font-semibold mb-1">Schnelltest</h4>
                    <p className="text-sm opacity-80">Kurze Übungsrunden</p>
                  </Link>
                </div>

                {/* Test by Prüfungsteil */}
                <div>
                  <h4 className="font-medium text-slate-600 mb-3">
                    Nach Prüfungsteil
                  </h4>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {teile.map((teil) => {
                      const Icon = teil.icon;
                      return (
                        <Link
                          key={teil.id}
                          to={`/tests?filter=${teil.id}`}
                          className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-slate-100"
                        >
                          <div
                            className={`w-10 h-10 bg-gradient-to-br ${teil.color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200`}
                          >
                            <Icon size={16} className="text-white" />
                          </div>
                          <div className="text-sm font-medium text-slate-700 text-center">
                            {teil.name}
                          </div>
                          <div className="text-xs text-slate-500 text-center mt-1">
                            Jetzt üben
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
