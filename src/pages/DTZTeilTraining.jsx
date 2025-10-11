import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Headphones,
  Clock,
  Users,
  Radio,
  MessageCircle,
  Mic2,
} from "lucide-react";
import StudyNotice from "../components/StudyNotice";

export default function DTZTeilTraining() {
  const [teilTests, setTeilTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load individual Teil tests
    const loadTeilTests = async () => {
      try {
        const teilIds = [
          "dtz-local-teil1",
          "dtz-local-teil2",
          "dtz-local-teil3",
          "dtz-local-teil4",
        ];
        const tests = [];

        for (const teilId of teilIds) {
          try {
            const response = await fetch(`/data/${teilId}.json`);
            if (response.ok) {
              const data = await response.json();
              tests.push(data);
            }
          } catch (error) {
            console.warn(`Could not load ${teilId}:`, error);
          }
        }

        setTeilTests(tests);
      } catch (error) {
        console.error("Error loading Teil tests:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTeilTests();
  }, []);

  const getPartIcon = (partId) => {
    switch (partId) {
      case "teil1":
        return <MessageCircle size={24} />;
      case "teil2":
        return <Radio size={24} />;
      case "teil3":
        return <Users size={24} />;
      case "teil4":
        return <Mic2 size={24} />;
      default:
        return <Headphones size={24} />;
    }
  };

  const getPartColor = (partId) => {
    switch (partId) {
      case "teil1":
        return "from-blue-500 to-blue-600";
      case "teil2":
        return "from-purple-500 to-purple-600";
      case "teil3":
        return "from-green-500 to-green-600";
      case "teil4":
        return "from-orange-500 to-orange-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getPartDescription = (partId) => {
    switch (partId) {
      case "teil1":
        return "Ansagen am Telefon und öffentliche Durchsagen";
      case "teil2":
        return "Radio-Ansagen und Werbung";
      case "teil3":
        return "Alltagsgespräche zwischen zwei Personen";
      case "teil4":
        return "Radiobeiträge und längere Texte";
      default:
        return "Hörverständnis";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Headphones size={24} className="text-white" />
          </div>
          <p className="text-slate-600">Lade Teil-Tests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link
              to="/tests"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/80 backdrop-blur-md shadow-lg border border-white/50 hover:bg-white transition-colors"
            >
              <ArrowLeft size={18} className="text-slate-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                DTZ Teil Training
              </h1>
              <p className="text-slate-600 mt-1">
                Übe einzelne Teile der Hörprüfung
              </p>
            </div>
          </div>
        </div>

        {/* Study Notice */}
        <StudyNotice />

        {/* Teil Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teilTests.map((test) => {
            const partNumber = test.id.replace("dtz-local-teil", "");
            const partId = `teil${partNumber}`;

            return (
              <Link
                key={test.id}
                to={`/synchronized-test/${test.id}`}
                className="group block p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getPartColor(partId)} flex items-center justify-center text-white flex-shrink-0`}
                  >
                    {getPartIcon(partId)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-purple-600 transition-colors">
                      Teil {partNumber}
                    </h3>
                    <p className="text-slate-600 text-sm mb-3 leading-relaxed">
                      {getPartDescription(partId)}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-slate-500">
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span className="text-sm">{test.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Headphones size={14} />
                          <span className="text-sm">
                            {test.questions?.length || 0} Fragen
                          </span>
                        </div>
                      </div>

                      <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                        Lokal
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Fallback if no tests loaded */}
        {teilTests.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Headphones size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Keine Teil-Tests verfügbar
            </h3>
            <p className="text-slate-600 mb-4">
              Die lokalen Audio-Dateien sind noch nicht vollständig
              konfiguriert.
            </p>
            <Link
              to="/tests"
              className="inline-flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Zurück zu den Tests</span>
            </Link>
          </div>
        )}

        {/* Tips Section */}
        {teilTests.length > 0 && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              💡 Trainings-Tipps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
              <div>
                <h4 className="font-medium text-slate-800 mb-2">
                  Teil 1 & 2: Ansagen
                </h4>
                <ul className="space-y-1">
                  <li>• Höre auf Schlüsselwörter wie Zeit, Ort, Grund</li>
                  <li>• Achte auf Zahlen und Namen</li>
                  <li>• Konzentriere dich auf die Hauptinformation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-slate-800 mb-2">
                  Teil 3 & 4: Gespräche
                </h4>
                <ul className="space-y-1">
                  <li>• Identifiziere Sprecher und ihre Rollen</li>
                  <li>• Höre auf Meinungen und Gefühle</li>
                  <li>• Achte auf Entscheidungen und Pläne</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
