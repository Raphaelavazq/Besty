import { Link } from "react-router-dom";
import {
  Headphones,
  BookOpen,
  FileEdit,
  Mic,
  ChevronRight,
  Clock,
  Play,
} from "lucide-react";

export default function Tests() {
  const practiceTypes = [
    {
      id: "hoeren",
      title: "Hören",
      description: "Hörverstehen üben mit authentischen Dialogen und Texten",
      icon: Headphones,
      color: "from-purple-800 to-indigo-900",
      duration: "15-25 min",
      questions: "10-18",
      path: "/tests/hoeren",
    },
    {
      id: "lesen",
      title: "Lesen",
      description: "Leseverstehen mit verschiedenen Textarten trainieren",
      icon: BookOpen,
      color: "from-blue-500 to-purple-600",
      duration: "20-30 min",
      questions: "15-20",
      path: "/tests/lesen",
    },
    {
      id: "schreiben",
      title: "Schreiben",
      description: "Schriftlichen Ausdruck mit gezielten Übungen verbessern",
      icon: FileEdit,
      color: "from-green-500 to-blue-600",
      duration: "30-45 min",
      questions: "2-3",
      path: "/tests/schreiben",
    },
    {
      id: "sprechen",
      title: "Sprechen",
      description: "Mündlichen Ausdruck durch Sprechübungen stärken",
      icon: Mic,
      color: "from-orange-500 to-red-600",
      duration: "10-15 min",
      questions: "3-4",
      path: "/tests/sprechen",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Play size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Tests & Übungen
          </h1>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto">
            Wähle einen Bereich aus und übe gezielt für deine DTZ B1 Prüfung
          </p>
        </div>

        {/* Practice Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {practiceTypes.map((practice) => {
            const Icon = practice.icon;
            return (
              <Link
                key={practice.id}
                to={practice.path}
                className="group block"
              >
                <div
                  className={`bg-gradient-to-br ${practice.color} rounded-3xl p-8 shadow-xl border border-white/20 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Icon size={32} className="text-white" />
                    </div>
                    <ChevronRight
                      size={24}
                      className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-200"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    {practice.title}
                  </h3>

                  <p className="text-white/90 text-lg mb-6 leading-relaxed">
                    {practice.description}
                  </p>

                  <div className="flex items-center gap-6 text-white/80">
                    <div className="flex items-center gap-2">
                      <Clock size={18} />
                      <span className="font-medium">{practice.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Play size={18} />
                      <span className="font-medium">
                        {practice.questions} Aufgaben
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Featured DTZ Complete Test */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50 mb-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Headphones size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              DTZ B1 Komplett-Test
            </h2>
            <p className="text-slate-600 text-lg">
              Vollständige Prüfungssimulation mit allen Teilen
            </p>
          </div>

          <Link to="/tests/hoeren-komplett" className="group block">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Hörprüfung Komplett
                  </h3>
                  <p className="text-amber-100 mb-4">
                    Alle 4 Teile der DTZ Hörprüfung unter Prüfungsbedingungen
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>25 Minuten</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Play size={16} />
                      <span>18 Fragen</span>
                    </div>
                  </div>
                </div>
                <ChevronRight
                  size={28}
                  className="text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all duration-200"
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Info Section */}
        <div className="text-center">
          <p className="text-slate-500 text-lg">
            Jeder Bereich enthält verschiedene Übungen und Tests für dein Level
          </p>
        </div>
      </div>
    </div>
  );
}
