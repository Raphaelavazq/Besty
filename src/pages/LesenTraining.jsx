/**
 * LesenTraining - Main training page for Lesen
 * Routes to individual Teil training pages
 */

import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Newspaper,
  Mail,
  Clock,
  Target,
  Play,
  BookOpen,
  Trophy,
} from "lucide-react";

export default function LesenTraining() {
  const navigate = useNavigate();

  const teile = [
    {
      id: "teil1",
      title: "Teil 1: Kataloge & Anzeigen",
      description: "Wohnungsanzeigen, Kursangebote zuordnen",
      icon: FileText,
      duration: "15 Min",
      points: "5 Punkte",
      exercises: "5 Zuordnungsaufgaben",
      color: "from-purple-500 to-pink-500",
      path: "/tests/lesen/training/teil1",
    },
    {
      id: "teil2",
      title: "Teil 2: Zeitungsartikel",
      description: "Texte lesen und verstehen",
      icon: Newspaper,
      duration: "15 Min",
      points: "5 Punkte",
      exercises: "5 Richtig/Falsch Aufgaben",
      color: "from-indigo-500 to-purple-500",
      path: "/tests/lesen/training/teil2",
    },
    {
      id: "teil3",
      title: "Teil 3: Formelle Texte",
      description: "Briefe, E-Mails, Mitteilungen",
      icon: Mail,
      duration: "15 Min",
      points: "10 Punkte",
      exercises: "10 Multiple-Choice",
      color: "from-purple-500 to-indigo-500",
      path: "/tests/lesen/training/teil3",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-dark-bg-primary dark:via-dark-bg-secondary dark:to-dark-bg-tertiary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/tests/lesen")}
            className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Zurück zum Lesen Hub</span>
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-3 tracking-tight">
              Lesen Training
            </h1>
            <p className="text-slate-600 dark:text-dark-text-secondary text-lg lg:text-xl">
              Wählen Sie einen Teil zum Üben
            </p>
          </div>
        </div>

        {/* Teile Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {teile.map((teil) => {
            const Icon = teil.icon;
            return (
              <Link
                key={teil.id}
                to={teil.path}
                className="group relative bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100 dark:border-purple-500/20 hover:shadow-3xl transition-all duration-200 hover:-translate-y-2 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                <div className="relative">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-black text-gray-900 dark:text-dark-text-primary mb-2">
                    {teil.title}
                  </h3>
                  <p className="text-gray-600 dark:text-dark-text-secondary mb-4 leading-relaxed">
                    {teil.description}
                  </p>

                  {/* Stats */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-dark-text-secondary">
                      <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span>{teil.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-dark-text-secondary">
                      <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span>{teil.points}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-dark-text-secondary">
                      <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span>{teil.exercises}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-end">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center group-hover:from-purple-600 group-hover:to-indigo-600 transition-all duration-200">
                      <Play className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Tips Card */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-purple-100 dark:border-purple-500/20">
          <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text-primary mb-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            Tipps für das Training
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-dark-text-secondary">
            <div className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
              <span>Lesen Sie die Fragen zuerst</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
              <span>Suchen Sie Schlüsselwörter im Text</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
              <span>Sie müssen nicht jedes Wort verstehen</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
              <span>Achten Sie auf Zeitangaben und Namen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
