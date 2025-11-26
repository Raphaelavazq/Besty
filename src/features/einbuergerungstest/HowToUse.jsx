import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Award,
  Brain,
  Target,
  CheckCircle,
} from "lucide-react";

export default function EinbuergerungstestInstructions() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: BookOpen,
      title: "Fragenkatalog",
      text: "Lerne alle 310 Fragen",
      color: "purple",
      path: "/einbuergerungstest/fragenkatalog",
    },
    {
      icon: Brain,
      title: "Training",
      text: "Übe nach Thema oder zufällig",
      color: "indigo",
      path: "/einbuergerungstest/training",
    },
    {
      icon: Clock,
      title: "Probetest",
      text: "33 Fragen in 60 Minuten",
      color: "blue",
      path: "/einbuergerungstest/probetest",
    },
    {
      icon: Award,
      title: "Bestehen",
      text: "17 richtige Antworten = Test bestanden",
      color: "emerald",
      path: null, // No link for this info card
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate("/einbuergerungstest")}
          className="mb-6 flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Zurück
        </button>

        {/* Title */}
        <div className="text-center mb-10">
          <Target className="w-16 h-16 mx-auto mb-4 text-purple-600 dark:text-purple-400 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3 pb-2">
            So geht's
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            In 4 Schritten zum Ziel
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isClickable = step.path !== null;
            
            const CardContent = (
              <div className="flex items-center gap-4">
                {/* Number Badge */}
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-xl">
                    {idx + 1}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center bg-${step.color}-50 dark:bg-${step.color}-900/20`}
                >
                  <Icon
                    className={`w-7 h-7 text-${step.color}-600 dark:text-${step.color}-400`}
                  />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {step.text}
                  </p>
                </div>
              </div>
            );
            
            return isClickable ? (
              <button
                key={idx}
                onClick={() => navigate(step.path)}
                className="w-full bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-purple-100 dark:border-purple-500/30 hover:-translate-y-1 hover:shadow-2xl transition-all text-left group"
              >
                {CardContent}
              </button>
            ) : (
              <div
                key={idx}
                className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-purple-100 dark:border-purple-500/30"
              >
                {CardContent}
              </div>
            );
          })}
        </div>

        {/* Tips Card */}
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 backdrop-blur-md rounded-3xl p-6 border border-purple-200 dark:border-purple-500/30 mb-8">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-8 h-8 text-purple-600 dark:text-purple-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-black text-purple-900 dark:text-purple-200 mb-2">
                Tipp
              </h3>
              <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5">
                    •
                  </span>
                  <span>Markiere schwere Fragen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5">
                    •
                  </span>
                  <span>Übe jeden Tag 10 Minuten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5">
                    •
                  </span>
                  <span>Mache 3-4 Probetests</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/einbuergerungstest")}
          className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
        >
          Jetzt starten
        </button>
      </div>
    </div>
  );
}
