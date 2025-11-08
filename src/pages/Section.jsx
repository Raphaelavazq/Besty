import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import * as Icons from "lucide-react";

export default function Section() {
  const { sectionId } = useParams();
  const [section, setSection] = useState(null);
  const [content, setContent] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/data/sections.json").then((r) => r.json()),
      fetch("/data/content.json").then((r) => r.json()),
    ]).then(([sections, allContent]) => {
      const sec = sections.find((s) => s.id === sectionId);
      setSection(sec);
      setContent(allContent.filter((c) => c.section === sectionId));
    });
  }, [sectionId]);

  if (!section) {
    return <div className="text-center py-12">Laden...</div>;
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

  const Icon = getIcon(section.icon);

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-6xl mx-auto p-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text-primary mb-6"
        >
          <ArrowLeft size={20} />
          Zurück zur Übersicht
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`${section.color} w-16 h-16 rounded-xl flex items-center justify-center text-white`}
            >
              <Icon size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold dark:text-dark-text-primary">
                {section.title}
              </h1>
              <p className="text-gray-600 dark:text-dark-text-secondary">
                {section.description}
              </p>
            </div>
          </div>

          {section.parts && (
            <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4 mt-4 border dark:border-purple-500/20">
              <h3 className="font-semibold mb-2 dark:text-dark-text-primary">
                Prüfungsteile:
              </h3>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-dark-text-secondary">
                {section.parts.map((part, idx) => (
                  <li key={idx}>• {part}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.map((item) => (
            <Link
              key={item.id}
              to={`/content/${item.id}`}
              className="card hover:scale-105 transition-transform"
            >
              <div className="badge bg-primary/10 text-primary mb-2">
                {item.level}
              </div>
              <h3 className="font-semibold text-lg dark:text-dark-text-primary">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">
                {item.subtitle}
              </p>
              <div className="text-xs text-gray-500 dark:text-dark-text-muted mt-3">
                {item.duration}
              </div>
            </Link>
          ))}
        </div>

        {content.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-dark-text-muted">
            Noch keine Inhalte für diesen Bereich verfügbar.
          </div>
        )}
      </div>
    </div>
  );
}
