import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Headphones,
  PlayCircle,
  CheckCircle,
} from "lucide-react";
import HoerenTeilComplete from "../components/HoerenTeilComplete";

export default function HoerenCompleteTest() {
  const [testStarted, setTestStarted] = useState(false);

  if (testStarted) {
    return <HoerenTeilComplete />;
  }

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto p-6">
        {/* Navigation */}
        <Link
          to="/tests"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-600 mb-8 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Zurück zu Tests</span>
        </Link>

        {/* Test Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl shadow-xl mb-6">
            <Headphones size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            DTZ B1 Hörprüfung
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Kompletter Hörtest mit allen vier Teilen
          </p>
        </div>

        {/* Test Information */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <CheckCircle size={16} className="text-white" />
            </div>
            Testinformationen
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-purple-600 mr-3" />
              <div>
                <div className="font-medium">Dauer</div>
                <div className="text-gray-600">25 Minuten</div>
              </div>
            </div>
            <div className="flex items-center">
              <Headphones className="w-5 h-5 text-purple-600 mr-3" />
              <div>
                <div className="font-medium">Aufgaben</div>
                <div className="text-gray-600">Alle 4 Teile</div>
              </div>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-purple-600 mr-3" />
              <div>
                <div className="font-medium">Niveau</div>
                <div className="text-gray-600">B1</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-800 mb-2">
              Besonderheiten dieses Tests:
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Audio wird automatisch abgespielt</li>
              <li>• Fragen erscheinen zur richtigen Zeit</li>
              <li>• Sie können das Audio pausieren und zurückspulen</li>
              <li>• Alle vier Hörteile in einem Durchlauf</li>
            </ul>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-slate-800 mb-3">
              Was erwartet Sie:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 mb-2">
                  Teil 1: Ansagen
                </h4>
                <p className="text-sm text-purple-700">
                  Telefon- und öffentliche Durchsagen verstehen
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-indigo-800 mb-2">
                  Teil 2: Gespräche
                </h4>
                <p className="text-sm text-indigo-700">
                  Kurze Alltagsgespräche verstehen
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 mb-2">
                  Teil 3: Interviews
                </h4>
                <p className="text-sm text-purple-700">
                  Längere Gespräche und Interviews
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-indigo-800 mb-2">
                  Teil 4: Vorträge
                </h4>
                <p className="text-sm text-indigo-700">
                  Präsentationen und Vorträge verstehen
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={() => setTestStarted(true)}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <PlayCircle size={24} />
            Test starten
          </button>
          <p className="text-slate-500 mt-4 text-sm">
            Stellen Sie sicher, dass Ihr Audio funktioniert
          </p>
        </div>
      </div>
    </div>
  );
}
