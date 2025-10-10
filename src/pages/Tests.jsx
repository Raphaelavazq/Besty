import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Headphones,
  BookOpen,
  FileEdit,
  Mic,
  Play,
  Clock,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function Tests() {
  const [tests, setTests] = useState([]);
  const [filterSection, setFilterSection] = useState("all");

  useEffect(() => {
    fetch("/data/tests.json")
      .then((res) => res.json())
      .then((data) => setTests(data))
      .catch((err) => console.error("Error loading tests:", err));
  }, []);

  const getSectionIcon = (section) => {
    switch (section) {
      case "hoeren":
        return <Headphones size={18} />;
      case "lesen":
        return <BookOpen size={18} />;
      case "schreiben":
        return <FileEdit size={18} />;
      case "sprechen":
        return <Mic size={18} />;
      default:
        return <Play size={18} />;
    }
  };

  const sections = [
    {
      id: "all",
      name: "Alle Tests",
      icon: Play,
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      id: "hoeren",
      name: "Hören",
      icon: Headphones,
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      id: "lesen",
      name: "Lesen",
      icon: BookOpen,
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      id: "schreiben",
      name: "Schreiben",
      icon: FileEdit,
      gradient: "from-purple-600 to-pink-600",
    },
    {
      id: "sprechen",
      name: "Sprechen",
      icon: Mic,
      gradient: "from-indigo-600 to-blue-600",
    },
  ];

  const filteredTests =
    filterSection === "all"
      ? tests
      : tests.filter((test) => test.section === filterSection);

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              DTZ B1 Tests
            </h1>
            <p className="text-slate-600 mt-1">Wähle einen Test zum Üben</p>
          </div>
        </div>

        {/* Section Filter */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Prüfungsteile
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = filterSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => setFilterSection(section.id)}
                  className={`p-4 rounded-xl transition-all duration-300 border text-center ${
                    isActive
                      ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg border-transparent"
                      : "bg-white/60 border-white/50 hover:bg-purple-50 text-slate-700"
                  }`}
                >
                  <div
                    className={`w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                      isActive ? "bg-white/20" : "bg-purple-100"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={isActive ? "text-white" : "text-purple-600"}
                    />
                  </div>
                  <span className="text-sm font-medium">{section.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Complete Hören Test */}
        {(filterSection === "all" || filterSection === "hoeren") && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Kompletter Hörtest
            </h2>
            <Link
              to="/tests/hoeren-komplett"
              className="group block p-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-white"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Headphones size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      DTZ B1 Hörprüfung - Komplett
                    </h3>
                    <p className="text-purple-100">
                      Alle vier Teile des Hörverstehens in einem Test
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <span className="text-sm font-medium">Interaktiv</span>
                  <ChevronRight size={16} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-purple-100">
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span className="text-sm">25 min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Sparkles size={14} />
                    <span className="text-sm">Synchronisiertes Audio</span>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs font-medium text-white">
                    Empfohlen
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <Link
              key={test.id}
              to={`/tests/${test.id}`}
              className="group block p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white">
                    {getSectionIcon(test.section)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 group-hover:text-purple-600 transition-colors">
                      {test.title}
                    </h3>
                    <p className="text-sm text-slate-500 capitalize">
                      {test.section}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  className="text-slate-400 group-hover:text-purple-600 transition-colors"
                />
              </div>

              {test.description && (
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {test.description}
                </p>
              )}

              {test.duration && (
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <Clock size={14} />
                  <span>{test.duration}</span>
                </div>
              )}

              {test.points && (
                <div className="flex items-center space-x-2 text-sm text-slate-500 mt-2">
                  <Sparkles size={14} />
                  <span>{test.points} Punkte</span>
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
              <BookOpen size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Keine Tests gefunden
            </h3>
            <p className="text-slate-600">
              Für "{sections.find((s) => s.id === filterSection)?.name}" sind
              noch keine Tests verfügbar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
