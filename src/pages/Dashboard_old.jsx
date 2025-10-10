import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Headphones,
  Eye,
  PenTool,
  MessageSquare,
  PlayCircle,
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
  Zap,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

export default function Dashboard() {
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("all");

  useEffect(() => {
    fetch("/data/themes.json")
      .then((r) => r.json())
      .then(setThemes)
      .catch(() => setThemes([]));
  }, []);

  const user = {
    name: "Maria Schmidt",
  };

  const subjects = [
    {
      id: "hoeren",
      name: "Hören",
      icon: Headphones,
      description: "Verstehen von Gesprächen",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      id: "lesen",
      name: "Lesen",
      icon: Eye,
      description: "Verstehen von Texten",
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      id: "schreiben",
      name: "Schreiben",
      icon: PenTool,
      description: "E-Mail und Briefe",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      id: "sprechen",
      name: "Sprechen",
      icon: MessageSquare,
      description: "Mündliche Kommunikation",
      gradient: "from-indigo-600 to-blue-600",
    },
  ];

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
    return icons[iconName] || Briefcase;
  };

  return (
    <div className="h-full overflow-hidden p-4 md:p-6">
      <div className="h-full flex flex-col max-w-7xl mx-auto">
        {/* Welcome Header - Compact */}
        <div className="flex-shrink-0 mb-6">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                <GraduationCap size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Deutsch-Test für Zuwanderer (DTZ)
                </h1>
                
              </div>
            </div>
          </div>
        </div>

        {/* Main App Grid - Fills remaining space */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Column - Tests */}
            <div className="lg:col-span-2 flex flex-col gap-4 overflow-hidden">
              {/* Test Actions */}
              <div className="flex-shrink-0">
                <h2 className="text-lg font-semibold text-slate-800 mb-3">
                  Prüfung starten
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    to="/tests"
                    className="group bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-4 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center gap-3">
                      <PlayCircle
                        size={24}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <div>
                        <h3 className="font-bold">Volltest</h3>
                        <p className="text-purple-100 text-sm">
                          DTZ B1 Simulation
                        </p>
                      </div>
                      <ArrowRight
                        size={16}
                        className="ml-auto group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </Link>

                  <Link
                    to="/tests?mode=quick"
                    className="group bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-4 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center gap-3">
                      <Zap
                        size={24}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <div>
                        <h3 className="font-bold">Schnelltest</h3>
                        <p className="text-indigo-100 text-sm">Kurze Übungen</p>
                      </div>
                      <ArrowRight
                        size={16}
                        className="ml-auto group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Subjects Grid */}
              <div className="flex-1 overflow-hidden">
                <h2 className="text-lg font-semibold text-slate-800 mb-3">
                  Prüfungsteile
                </h2>
                <div className="grid grid-cols-2 gap-3 h-fit">
                  {subjects.map((subject) => {
                    const Icon = subject.icon;
                    return (
                      <Link
                        key={subject.id}
                        to={`/tests?filter=${subject.id}`}
                        className="group bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:scale-105"
                      >
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${subject.gradient} rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}
                        >
                          <Icon size={16} className="text-white" />
                        </div>
                        <h3 className="font-bold text-slate-800 text-sm mb-1">
                          {subject.name}
                        </h3>
                        <p className="text-xs text-slate-600">
                          {subject.description}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Themes */}
            <div className="flex flex-col overflow-hidden">
              <h2 className="text-lg font-semibold text-slate-800 mb-3">
                Themen
              </h2>
              <div className="flex-1 bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50 overflow-hidden">
                <div className="h-full overflow-y-auto pr-2 -mr-2">
                  <div className="grid grid-cols-2 gap-2">
                    {themes.slice(0, 12).map((theme, index) => {
                      const Icon = getThemeIcon(theme.icon);
                      const gradients = [
                        "from-purple-400 to-indigo-500",
                        "from-indigo-400 to-purple-500",
                        "from-purple-500 to-pink-500",
                        "from-indigo-500 to-blue-500",
                      ];
                      const gradient = gradients[index % gradients.length];

                      return (
                        <button
                          key={theme.id}
                          onClick={() => setSelectedTheme(theme.id)}
                          className={`p-3 rounded-lg transition-all duration-300 border text-left ${
                            selectedTheme === theme.id
                              ? "bg-purple-50 border-purple-300 ring-2 ring-purple-200"
                              : "bg-white/60 border-white/50 hover:bg-purple-50"
                          }`}
                        >
                          <div
                            className={`w-6 h-6 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center mb-2 shadow-md`}
                          >
                            <Icon size={12} className="text-white" />
                          </div>
                          <h4 className="text-xs font-medium text-slate-800 truncate">
                            {theme.name}
                          </h4>
                        </button>
                      );
                    })}
                  </div>

                  {themes.length > 12 && (
                    <Link
                      to="/themes"
                      className="block text-center text-purple-600 hover:text-purple-700 font-medium mt-3 p-2 text-sm"
                    >
                      Alle Themen anzeigen
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
