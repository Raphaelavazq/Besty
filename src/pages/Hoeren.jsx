import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Headphones,
  Clock,
  Play,
  Shuffle,
  Target,
  Zap,
  MessageSquare,
  FileText,
  Users,
  Video,
  Brain,
  Trophy,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Hoeren() {
  const practiceOptions = [
    {
      id: "training",
      title: "Training",
      description: "Zufällige Fragen üben",
      icon: Brain,
      path: "/tests/hoeren/training",
      details: "Alle Teile • Flexibel",
    },
    {
      id: "test",
      title: "Prüfung",
      description: "Kompletter Modelltest",
      icon: Trophy,
      path: "/tests/hoeren/pruefung/modelltest-1",
      details: "25 Min • 20 Punkte",
    },
  ];

  const teileInfo = [
    {
      teil: "1",
      title: "Alltagsgespräche",
      duration: "8 Min",
      description: "4 kurze Dialoge",
      icon: MessageSquare,
    },
    {
      teil: "2",
      title: "Radio & Ansagen",
      duration: "10 Min",
      description: "3 Durchsagen",
      icon: Headphones,
    },
    {
      teil: "3",
      title: "Telefongespräche",
      duration: "7 Min",
      description: "5 Notizen",
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Back Button */}
          <Link
            to="/tests"
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-200 text-white font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Zurück zu Tests
          </Link>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Lottie Animation */}
            <div className="w-40 h-40 lg:w-48 lg:h-48 flex-shrink-0">
              <DotLottieReact
                src="https://lottie.host/4d3e31f5-81a0-4a2f-ae91-4005e44d6183/yN5pIHb42r.lottie"
                loop
                autoplay
                className="w-full h-full filter brightness-125"
              />
            </div>

            {/* Text Content */}
            <div className="text-center lg:text-left flex-1">
              <h1 className="text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
                DTZ Hören
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-light mb-4">
                Hörverstehen trainieren
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>25 Minuten</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>20 Punkte</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4" />
                  <span>3 Teile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Prüfungsstruktur - Navigation Cards */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3 tracking-tight">
              Prüfungsstruktur
            </h2>
            <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-light">
              3 Teile • 25 Minuten • 20 Punkte
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {teileInfo.map((info) => {
              const Icon = info.icon;

              return (
                <div
                  key={info.teil}
                  className="group bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100 hover:shadow-3xl transition-all duration-200 hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                        <span className="text-2xl font-black text-white">
                          {info.teil}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">
                          Teil {info.teil}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Clock className="w-3 h-3" />
                          <span>{info.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-12 h-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:from-purple-100 group-hover:to-indigo-100 transition-all duration-200">
                      <Icon className="w-6 h-6 text-purple-600" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {info.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {info.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Title - Üben */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Wie möchten Sie üben?
          </h2>
          <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-light">
            Wählen Sie Ihren Lernweg
          </p>
        </div>

        {/* Practice Options Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {practiceOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Link
                key={option.id}
                to={option.path}
                className="group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100 hover:shadow-3xl transition-all duration-200 hover:-translate-y-2 hover:scale-105 overflow-hidden"
              >
                {/* Hover Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                <div className="relative">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-3">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 text-base lg:text-lg mb-6 leading-relaxed">
                    {option.description}
                  </p>

                  {/* Details Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-xl border border-purple-100">
                    <span className="text-purple-600 text-sm font-semibold">
                      {option.details}
                    </span>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="absolute bottom-8 right-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl flex items-center justify-center group-hover:from-purple-600 group-hover:to-indigo-600 transition-all duration-200">
                      <Play className="w-5 h-5 text-purple-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
