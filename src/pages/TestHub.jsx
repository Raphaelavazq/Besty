import { Link } from "react-router-dom";
import {
  Headphones,
  BookOpen,
  FileEdit,
  Mic,
  ChevronRight,
  Play,
  Target,
  Clock,
  Star,
} from "lucide-react";

export default function TestHub() {
  const skillAreas = [
    {
      id: "hoeren",
      title: "Hören",
      description: "Hörverstehen mit authentischen Dialogen und Ansagen",
      icon: Headphones,
      color: "from-purple-500 to-indigo-600",
      duration: "15-25 min",
      levels: "Teil 1-4",
      path: "/tests/hoeren",
      difficulty: "B1",
    },
    {
      id: "lesen",
      title: "Lesen",
      description: "Leseverstehen mit verschiedenen Textarten",
      icon: BookOpen,
      color: "from-blue-500 to-purple-600",
      duration: "45-60 min",
      levels: "Teil 1-3",
      path: "/tests/lesen",
      difficulty: "B1",
    },
    {
      id: "schreiben",
      title: "Schreiben",
      description: "Schriftlicher Ausdruck E-Mail und Brief",
      icon: FileEdit,
      color: "from-green-500 to-blue-600",
      duration: "30 min",
      levels: "1 Aufgabe",
      path: "/tests/schreiben",
      difficulty: "B1",
    },
    {
      id: "sprechen",
      title: "Sprechen",
      description: "Mündlicher Ausdruck Gespräch und Präsentation",
      icon: Mic,
      color: "from-orange-500 to-red-600",
      duration: "15 min",
      levels: "Teil 1-3",
      path: "/tests/sprechen",
      difficulty: "B1",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Play size={36} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            DTZ B1 Training
          </h1>
          <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Wähle einen Prüfungsbereich und trainiere gezielt für deine DTZ B1
            Zertifikatsprüfung
          </p>
        </div>

        {/* Skill Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillAreas.map((area) => {
            const Icon = area.icon;
            return (
              <Link key={area.id} to={area.path} className="group block">
                <div
                  className={`bg-gradient-to-br ${area.color} rounded-3xl p-8 shadow-xl border border-white/20 text-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Icon size={32} className="text-white" />
                    </div>
                    <div className="text-right">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        {area.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-3xl font-bold text-white mb-3">
                    {area.title}
                  </h3>

                  <p className="text-white/90 text-lg mb-6 leading-relaxed">
                    {area.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-white/80" />
                      <span className="text-white/80 text-sm font-medium">
                        {area.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target size={18} className="text-white/80" />
                      <span className="text-white/80 text-sm font-medium">
                        {area.levels}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-yellow-300" />
                      <span className="text-white/80 text-sm">
                        Training & Test Modi
                      </span>
                    </div>
                    <ChevronRight
                      size={24}
                      className="text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all duration-300"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Wie funktioniert das Training?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  Bereich wählen
                </h3>
                <p className="text-slate-600 text-sm">
                  Klicke auf einen Prüfungsbereich
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  Modus wählen
                </h3>
                <p className="text-slate-600 text-sm">
                  Training oder Test-Simulation
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Üben</h3>
                <p className="text-slate-600 text-sm">
                  Interaktive Übungen mit Feedback
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
