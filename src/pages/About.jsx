import { BookOpen, Users, Target, Award, Sparkles, ChevronRight } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: BookOpen,
      title: "Strukturierte Inhalte",
      description: "Alle Prüfungsteile übersichtlich organisiert",
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      icon: Users,
      title: "Praxisnah",
      description: "Realistische Übungen und Beispiele",
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      icon: Target,
      title: "Zielorientiert",
      description: "Fokus auf B1 DTZ Prüfung",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: Award,
      title: "Erfolgreich",
      description: "Bewährte Lernmethoden",
      gradient: "from-indigo-600 to-blue-600"
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Wähle einen Prüfungsteil",
      description: "Hören, Lesen, Schreiben oder Sprechen",
      icon: Target
    },
    {
      number: "2", 
      title: "Übe mit echten Tests",
      description: "Praxisnahe Aufgaben und Beispiele",
      icon: BookOpen
    },
    {
      number: "3",
      title: "Lerne nach Themen",
      description: "Gezielt nach Lebensbereichen",
      icon: Users
    }
  ];

  const examParts = [
    {
      emoji: "🎧",
      title: "Hören (25 min)",
      description: "Verstehen von Gesprächen, Durchsagen und Nachrichten",
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      emoji: "📖",
      title: "Lesen (45 min)", 
      description: "Verstehen von Texten, E-Mails und Anzeigen",
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      emoji: "✍️",
      title: "Schreiben (30 min)",
      description: "Formelle E-Mails und persönliche Meinungen",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      emoji: "🗣️",
      title: "Sprechen (15 min)",
      description: "Gespräche führen und Aufgaben gemeinsam lösen",
      gradient: "from-indigo-600 to-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      <div className="max-w-6xl mx-auto p-6 space-y-12">
        
        {/* Header */}
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg mb-6">
            <Sparkles className="text-purple-600" size={16} />
            <span className="text-sm font-medium text-purple-700">Über uns</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Über B1 Bestie
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Dein moderner Content Hub zur DTZ B1 Prüfungsvorbereitung
          </p>
        </div>

        {/* Main Info */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 lg:p-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">?</span>
            </div>
            Was ist B1 Bestie?
          </h2>
          <p className="text-slate-700 leading-relaxed text-lg">
            B1 Bestie ist ein moderner Content Hub zur Vorbereitung auf die
            DTZ (Deutsch-Test für Zuwanderer) B1 Prüfung. Hier findest du gut
            strukturierte Lerninhalte, Übungen und praktische Tipps für
            alle vier Prüfungsteile: Hören, Lesen, Schreiben und Sprechen.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Warum B1 Bestie?</h2>
            <p className="text-slate-600">Diese Vorteile helfen dir bei deiner Prüfungsvorbereitung</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-purple-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* How to Use */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 lg:p-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">💡</span>
            </div>
            Wie nutzt du B1 Bestie?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {step.number}
                    </div>
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Icon size={16} className="text-purple-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-purple-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Prüfungsteile */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Die vier Prüfungsteile</h2>
            <p className="text-slate-600">Alle Bereiche der DTZ B1 Prüfung im Überblick</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {examParts.map((part, index) => (
              <div key={index} className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">{part.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 group-hover:text-purple-700 transition-colors">
                      {part.title}
                    </h3>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-purple-600 transition-colors" />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{part.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Viel Erfolg bei deiner Prüfung! 🎯</h2>
            <p className="text-purple-100 mb-6">Mit B1 Bestie bist du bestens vorbereitet</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors shadow-lg"
              >
                <Sparkles size={20} />
                Jetzt starten
              </a>
              <a
                href="/tests"
                className="inline-flex items-center justify-center gap-2 bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-800 transition-colors shadow-lg"
              >
                <BookOpen size={20} />
                Tests durchsuchen
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}