import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MessageSquare, Play, Info, BookOpen, Video } from "lucide-react";

function IconPlay(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="w-6 h-6"
      {...props}
    >
      <path d="M5 3v18l15-9L5 3z" fill="currentColor" />
    </svg>
  );
}

function IconVideo(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="w-6 h-6"
      {...props}
    >
      <path
        d="M2 6.5A2.5 2.5 0 014.5 4h11A2.5 2.5 0 0118 6.5V17a2 2 0 01-2 2H4.5A2.5 2.5 0 012 16.5v-10z"
        fill="currentColor"
      />
      <path d="M19 8l4-2v10l-4-2v-6z" fill="currentColor" />
    </svg>
  );
}

function InfoCard({
  title,
  subtitle,
  onClick,
  icon,
  accent = "from-purple-600 to-indigo-600",
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-start gap-3 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-purple-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-purple-500`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow`}
        style={{ background: "linear-gradient(90deg,#7c3aed,#4f46e5)" }}
      >
        {icon}
      </div>
      <div className="text-left">
        <div className="text-sm font-semibold">{title}</div>
        {subtitle && (
          <div className="text-xs text-gray-600 mt-1">{subtitle}</div>
        )}
      </div>
    </button>
  );
}

export default function DialogueMenu() {
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // load the machine-readable catalog we created
    fetch("/data/sprechen/dialogues-catalog.json")
      .then((res) => res.json())
      .then((data) => setScenarios(data || []))
      .catch(() => setScenarios([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600" />
      </div>
    );
  }

  const openDefaultTrainer = () => navigate(`/tests/sprechen/trainer/1`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6 flex items-center gap-3">
          <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-lg">
            <MessageSquare />
          </div>
          <div>
            <h1 className="text-2xl font-black">Dialogtrainer — Szenarien</h1>
            <p className="text-gray-600">
              Wählen Sie ein Szenario, um Teil 3 zu üben.
            </p>
          </div>
        </div>

        {/* Reuse SprechenHub practice options layout exactly */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Wie möchten Sie üben?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                id: "uebung",
                title: "Übung",
                description: "Videos anschauen und lernen",
                icon: Video,
                color: "from-purple-500 to-indigo-600",
                path: "/tests/sprechen/uebung/teil1",
                details: "Teil 1-3 mit Beispielen",
              },
              {
                id: "pruefung-info",
                title: "Prüfungsinfo",
                description: "Was Sie wissen müssen",
                icon: Info,
                color: "from-pink-500 to-purple-600",
                path: "/tests/sprechen/pruefung",
                details: "Ablauf, Tipps, Bewertung",
              },
              {
                id: "dialogue-trainer",
                title: "Dialogue Trainer",
                description: "Interaktiver Dialog (Teil 3)",
                icon: MessageSquare,
                color: "from-green-500 to-teal-500",
                path: "/tests/sprechen/trainer",
                details: "Interaktives Üben — Auswahl von Dialogtypen",
              },
            ].map((option) => {
              const Icon = option.icon;
              return (
                <Link
                  key={option.id}
                  to={option.path}
                  className="group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-purple-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  ></div>

                  <div className="relative">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon size={28} className="text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {option.title}
                    </h3>
                    <p className="text-purple-600 font-medium mb-2">
                      {option.description}
                    </p>
                    <p className="text-gray-600 text-sm">{option.details}</p>

                    <div className="absolute bottom-8 right-8 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                      <svg
                        className="w-5 h-5 text-purple-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => navigate(`/tests/sprechen/trainer/${s.id}`)}
              className="text-left bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-purple-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-150"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">{`${s.number}. ${s.title}`}</h2>
                  <p className="text-sm text-gray-600 mt-1">{s.short}</p>
                </div>
                <div className="text-xs text-gray-500">
                  Kategorie: {s.theme}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
