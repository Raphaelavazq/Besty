import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Clock, Play } from "lucide-react";
import * as Icons from "lucide-react";

export default function Theme() {
  const { themeId } = useParams();
  const [theme, setTheme] = useState(null);
  const [content, setContent] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/data/themes.json").then((r) => r.json()),
      fetch("/data/content.json").then((r) => r.json()),
    ]).then(([themes, allContent]) => {
      const thm = themes.find((t) => t.id === themeId);
      setTheme(thm);
      setContent(allContent.filter((c) => c.theme === themeId));
    });
  }, [themeId]);

  if (!theme) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Lade Thema...</p>
        </div>
      </div>
    );
  }

  const getIcon = (iconName) => {
    const IconComponent =
      Icons[
        iconName
          .split("-")
          .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
          .join("")
      ];
    return IconComponent || Icons.FileText;
  };

  const Icon = getIcon(theme.icon);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      <div className="max-w-6xl mx-auto p-6">
        
        {/* Navigation */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-600 mb-8 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Zurück zur Übersicht</span>
        </Link>

        {/* Theme Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl shadow-xl mb-6">
            <Icon size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            {theme.name}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Lerne alles rund um das Thema {theme.name.toLowerCase()}
          </p>
        </div>

        {/* Content Grid */}
        {content.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50 max-w-md mx-auto">
              <BookOpen size={48} className="text-slate-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Keine Inhalte verfügbar</h3>
              <p className="text-slate-600 mb-6">
                Für dieses Thema sind noch keine Lerninhalte vorhanden.
              </p>
              <Link
                to="/tests"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <Play size={20} />
                Alle Tests ansehen
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.map((item) => (
              <Link
                key={item.id}
                to={`/content/${item.id}`}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">
                    {item.level || "B1"}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock size={12} />
                    <span>{item.duration || "15 min"}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-purple-700 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                
                {item.subtitle && (
                  <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                    {item.subtitle}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                    {item.type || "Übung"}
                  </span>
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play size={14} className="text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-2">Mehr Übungen gefällig?</h3>
            <p className="text-purple-100 mb-6">
              Entdecke weitere Themen und Prüfungsteile
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors shadow-lg"
              >
                <Icon size={20} />
                Andere Themen
              </Link>
              <Link
                to="/tests"
                className="inline-flex items-center justify-center gap-2 bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-800 transition-colors shadow-lg"
              >
                <BookOpen size={20} />
                Alle Tests
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}