import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Headphones,
  Clock,
  Play,
  Shuffle,
  Target,
  Zap,
} from "lucide-react";

export default function Hoeren() {
  const practiceOptions = [
    {
      id: "single-question",
      title: "Einzelfrage Training",
      description: "Übe mit einer einzelnen Frage aus allen Bereichen",
      icon: Target,
      color: "from-emerald-500 to-teal-600",
      duration: "1-2 min",
      questions: "1",
      path: "/synchronized-test/dtz-single-question",
      features: [
        "Schnell & fokussiert",
        "Sofortiges Feedback",
        "Alle Teile gemischt",
      ],
    },
    {
      id: "random-practice",
      title: "Zufällige Übung",
      description: "5-8 zufällige Fragen zum lockeren Training",
      icon: Shuffle,
      color: "from-blue-500 to-indigo-600",
      duration: "8-12 min",
      questions: "5-8",
      path: "/synchronized-test/dtz-local-drills",
      features: [
        "Zufällige Auswahl",
        "Entspanntes Tempo",
        "Gemischte Schwierigkeit",
      ],
    },
    {
      id: "complete-test",
      title: "Kompletter Test",
      description: "Vollständige 20-minütige DTZ Hörprüfung",
      icon: Zap,
      color: "from-purple-500 to-pink-600",
      duration: "25 min",
      questions: "18",
      path: "/synchronized-test/dtz-local-fulltest",
      features: [
        "Echte Prüfungsbedingungen",
        "Timer aktiviert",
        "Vollständige Bewertung",
      ],
      recommended: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/tests"
            className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border border-white/50 hover:bg-white/90 transition-all duration-200"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Hören Training
            </h1>
            <p className="text-slate-600 text-lg">
              Wähle deinen bevorzugten Übungsmodus
            </p>
          </div>
        </div>

        {/* Practice Options */}
        <div className="space-y-6">
          {practiceOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div key={option.id} className="relative">
                {option.recommended && (
                  <div className="absolute -top-3 left-6 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      ⭐ Empfohlen
                    </div>
                  </div>
                )}

                <Link to={option.path} className="group block">
                  <div
                    className={`bg-gradient-to-br ${option.color} rounded-3xl p-8 shadow-xl border border-white/20 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden relative`}
                  >
                    {/* Background decoration */}
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full"></div>
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/5 rounded-full"></div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                          <Icon size={32} className="text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-white/90 text-sm font-medium">
                            {option.duration}
                          </div>
                          <div className="text-white/70 text-xs">Dauer</div>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3">
                        {option.title}
                      </h3>

                      <p className="text-white/90 text-lg mb-6 leading-relaxed">
                        {option.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <Play size={16} className="text-white" />
                            <span className="text-white font-medium">
                              {option.questions}
                            </span>
                          </div>
                          <div className="text-white/70 text-xs">Fragen</div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <Clock size={16} className="text-white" />
                            <span className="text-white font-medium">
                              {option.duration}
                            </span>
                          </div>
                          <div className="text-white/70 text-xs">Zeit</div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <Headphones size={16} className="text-white" />
                            <span className="text-white font-medium">
                              DTZ B1
                            </span>
                          </div>
                          <div className="text-white/70 text-xs">Level</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-white/80 text-sm font-medium mb-2">
                          Features:
                        </div>
                        {option.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 text-white/80"
                          >
                            <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                          <span className="text-white text-sm font-medium">
                            Jetzt starten
                          </span>
                        </div>
                        <div className="text-white/60 group-hover:text-white transition-colors">
                          <Play size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Headphones size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              DTZ B1 Hörverständnis
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Das Hörverständnis besteht aus 4 Teilen: Ansagen,
              Radio-Nachrichten, Alltagsgespräche und längere Beiträge. Jeder
              Modus hilft dir dabei, dich optimal auf die Prüfung vorzubereiten.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
