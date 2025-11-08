import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Bookmark, BookmarkCheck, Clock } from "lucide-react";
import { useStore } from "../store/useStore";

export default function ContentDetail() {
  const { contentId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [allContent, setAllContent] = useState([]);
  const { toggleBookmark, isBookmarked, addToRecent } = useStore();

  const bookmarked = content ? isBookmarked(content.id) : false;

  useEffect(() => {
    fetch("/data/content.json")
      .then((r) => r.json())
      .then((data) => {
        setAllContent(data);
        const item = data.find((c) => c.id === contentId);
        if (item) {
          setContent(item);
          addToRecent(item.id);
        }
      });
  }, [contentId, addToRecent]);

  if (!content) {
    return (
      <div className="h-full overflow-auto">
        <div className="max-w-4xl mx-auto p-6 flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-gray-500">Inhalt wird geladen...</p>
          </div>
        </div>
      </div>
    );
  }

  const relatedContent = allContent
    .filter(
      (c) =>
        c.id !== content.id &&
        (c.theme === content.theme || c.section === content.section)
    )
    .slice(0, 3);

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text-primary mb-4"
          >
            <ArrowLeft size={20} />
            Zurück
          </button>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge bg-primary/10 text-primary">
                  {content.level}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-dark-text-muted">
                  <Clock size={14} />
                  {content.duration}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-2 dark:text-dark-text-primary">
                {content.title}
              </h1>
              {content.subtitle && (
                <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
                  {content.subtitle}
                </p>
              )}
            </div>

            <button
              onClick={() => toggleBookmark(content.id)}
              className={`p-3 rounded-lg transition-colors ${
                bookmarked
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-dark-text-secondary hover:bg-gray-200 dark:hover:bg-white/20"
              }`}
              title={bookmarked ? "Bookmark entfernen" : "Bookmark hinzufügen"}
            >
              {bookmarked ? (
                <BookmarkCheck size={20} />
              ) : (
                <Bookmark size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="card space-y-6">
          {/* Introduction */}
          {content.content.introduction && (
            <div className="text-gray-700 dark:text-dark-text-secondary leading-relaxed">
              {content.content.introduction}
            </div>
          )}

          {/* Key Points */}
          {content.content.keyPoints &&
            content.content.keyPoints.length > 0 && (
              <div className="space-y-6">
                {content.content.keyPoints.map((point, idx) => (
                  <div key={idx} className="border-l-4 border-primary pl-4">
                    <h3 className="font-semibold text-lg mb-2 dark:text-dark-text-primary">
                      {point.heading}
                    </h3>
                    <div className="text-gray-700 dark:text-dark-text-secondary whitespace-pre-line leading-relaxed">
                      {point.text}
                    </div>
                  </div>
                ))}
              </div>
            )}

          {/* Tips */}
          {content.content.tips && content.content.tips.length > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/30 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2 dark:text-dark-text-primary">
                💡 Tipps
              </h3>
              <ul className="space-y-2">
                {content.content.tips.map((tip, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-gray-700 dark:text-dark-text-secondary flex gap-2"
                  >
                    <span className="text-yellow-600 dark:text-yellow-400">
                      •
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Vocabulary */}
          {content.content.vocabulary &&
            content.content.vocabulary.length > 0 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/30 rounded-lg p-4">
                <h3 className="font-semibold mb-3 dark:text-dark-text-primary">
                  📚 Wortschatz
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {content.content.vocabulary.map((item, idx) => (
                    <div key={idx} className="text-sm">
                      <div className="font-medium text-gray-900 dark:text-dark-text-primary">
                        {item.word}
                      </div>
                      <div className="text-gray-600 dark:text-dark-text-secondary">
                        {item.meaning}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Related Content */}
        {relatedContent.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 dark:text-dark-text-primary">
              Ähnliche Themen
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedContent.map((item) => (
                <Link
                  key={item.id}
                  to={`/content/${item.id}`}
                  className="card hover:scale-105 transition-transform"
                >
                  <div className="badge bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-dark-text-secondary mb-2">
                    {item.level}
                  </div>
                  <h3 className="font-semibold dark:text-dark-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">
                    {item.subtitle}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-dark-text-muted mt-2">
                    {item.duration}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
