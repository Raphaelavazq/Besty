import { Link } from "react-router-dom";
import { ArrowLeft, Target, Brain, Trophy, Award } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function HoerenHub() {
  const practiceOptions = [
    {
      id: "training",
      title: "Training",
      description: "Practice with immediate feedback",
      icon: Brain,
      color: "from-purple-500 to-indigo-600",
      path: "/tests/hoeren/training",
    },
    {
      id: "test",
      title: "Test",
      description: "Full exam simulation",
      icon: Trophy,
      color: "from-pink-500 to-purple-600",
      path: "/tests/hoeren/test",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Navigation */}
        <Link
          to="/tests"
          className="inline-flex items-center gap-3 text-slate-600 hover:text-purple-600 mb-12 bg-white/70 backdrop-blur-xl rounded-3xl px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 border border-white/30 group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />
          <span className="font-semibold">Zurück zu Tests</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-32 h-32 mx-auto mb-8 flex items-center justify-center">
            <DotLottieReact
              src="https://lottie.host/df4c6eaa-b74d-4587-a196-fb9379541445/4SAvaM4Szg.lottie"
              loop
              autoplay
              className="w-full h-full"
            />
          </div>
          <h1 className="text-7xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent mb-6 leading-none tracking-tight">
            Hören Training
          </h1>
          <p className="text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
            Verbessern Sie Ihre deutschen Hörfertigkeiten mit interaktiven Übungen
          </p>
        </div>

        {/* Practice Mode Cards */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {practiceOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Link
                key={option.id}
                to={option.path}
                className={`group block bg-gradient-to-br ${option.color} rounded-3xl p-10 shadow-2xl hover:shadow-3xl border border-white/30 text-white transition-all duration-500 hover:-translate-y-2 hover:scale-[1.03] relative overflow-hidden`}
              >
                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-start gap-8 mb-8">
                    <Icon size={48} className="text-white drop-shadow-lg mt-2 group-hover:scale-110 transition-transform duration-300" />
                    <div className="flex-1">
                      <h3 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight leading-tight">
                        {option.title}
                      </h3>
                      <p className="text-white/90 text-xl font-medium leading-relaxed drop-shadow-sm">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 shadow-2xl hover:shadow-3xl border border-white/30 transition-all duration-500 hover:-translate-y-1 max-w-5xl mx-auto relative overflow-hidden">
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"></div>

          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Award size={28} className="text-white" />
              </div>
            </div>
            <h2 className="text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-8 tracking-tight leading-tight">
              DTZ Hören Prüfung
            </h2>
            <p className="text-slate-600 text-2xl leading-relaxed max-w-4xl mx-auto font-light tracking-wide">
              Die offizielle telc DTZ B1 Hörprüfung besteht aus vier verschiedenen Teilen mit insgesamt 20 Fragen
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-100/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Brain size={24} className="text-white" />
                </div>
                <h4 className="text-3xl font-bold text-slate-800 tracking-tight">
                  Training Mode
                </h4>
              </div>
              <p className="text-slate-600 text-xl leading-relaxed font-light">
                Practice with instant feedback and explanations to improve your skills progressively.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 border border-pink-100/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Trophy size={24} className="text-white" />
                </div>
                <h4 className="text-3xl font-bold text-slate-800 tracking-tight">Test Mode</h4>
              </div>
              <p className="text-slate-600 text-xl leading-relaxed font-light">
                Experience the real exam conditions with full timing and scoring simulation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
