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
  ChevronRight
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
      case "hoeren": return <Headphones size={18} />;
      case "lesen": return <BookOpen size={18} />;
      case "schreiben": return <FileEdit size={18} />;
      case "sprechen": return <Mic size={18} />;
      default: return <Play size={18} />;
    }
  };

  const sections = [
    { id: "all", name: "Alle Tests", icon: Play, gradient: "from-purple-500 to-indigo-600" },
    { id: "hoeren", name: "Hören", icon: Headphones, gradient: "from-purple-500 to-indigo-600" },
    { id: "lesen", name: "Lesen", icon: BookOpen, gradient: "from-indigo-500 to-purple-600" },
    { id: "schreiben", name: "Schreiben", icon: FileEdit, gradient: "from-purple-600 to-pink-600" },
    { id: "sprechen", name: "Sprechen", icon: Mic, gradient: "from-indigo-600 to-blue-600" }
  ];

  const filteredTests = filterSection === "all" 
    ? tests 
    : tests.filter(test => test.section === filterSection);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        
        {/* Header */}
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg mb-6">
            <Sparkles className="text-purple-600" size={16} />
            <span className="text-sm font-medium text-purple-700">DTZ B1 Tests</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Prüfungstests
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Wähle einen Test zum Üben und bereite dich optimal auf deine DTZ B1 Prüfung vor
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = filterSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => setFilterSection(section.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                  isActive
                    ? `bg-gradient-to-r ${section.gradient} text-white shadow-xl`
                    : "bg-white/90 backdrop-blur-sm text-slate-700 border border-purple-100/50 hover:bg-purple-50 hover:text-purple-700 shadow-lg"
                }`}
              >
                <Icon size={18} />
                <span>{section.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <Link
              key={test.id}
              to={`/test/${test.id}`}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {getSectionIcon(test.section)}
                  <span className="text-white">{getSectionIcon(test.section)}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 group-hover:text-purple-700 transition-colors line-clamp-1">
                    {test.title}
                  </h3>
                  <p className="text-sm text-slate-500 capitalize">{test.section}</p>
                </div>
                <ChevronRight size={16} className="text-slate-400 group-hover:text-purple-600 transition-colors" />
              </div>
              
              {test.description && (
                <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                  {test.description}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock size={12} />
                  <span>{test.duration || "15 min"}</span>
                </div>
                <span className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">
                  {test.difficulty || "Mittel"}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredTests.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50 max-w-md mx-auto">
              <Play size={48} className="text-slate-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Keine Tests gefunden</h3>
              <p className="text-slate-600 mb-6">
                Für diesen Filter sind keine Tests verfügbar.
              </p>
              <button 
                onClick={() => setFilterSection("all")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <Play size={20} />
                Alle Tests anzeigen
              </button>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-2">Bereit für mehr?</h3>
            <p className="text-purple-100 mb-6">
              Entdecke thematische Lerninhalte und übe gezielt
            </p>
            <Link
              to="/#themes"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Sparkles size={20} />
              Themen entdecken
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}