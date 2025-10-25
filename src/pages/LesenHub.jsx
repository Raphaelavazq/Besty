/**
 * LesenHub - New page matching Schreiben layout
 * Full viewport hero with direct CTA (placeholder for future development)
 */

import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock,
  Target,
  ArrowRight,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LesenHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
      {/* Hero Section - Full Viewport */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Lottie Animation */}
            <div className="w-40 h-40 lg:w-48 lg:h-48 flex-shrink-0">
              <DotLottieReact
                src="https://lottie.host/e625cdca-0dac-4776-a55e-0b437f54c0a7/diw9hO8Z3c.lottie"
                loop
                autoplay
                className="w-full h-full filter brightness-125"
              />
            </div>

            {/* Text Content */}
            <div className="text-center lg:text-left flex-1">
              <h1 className="text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
                Lesen Training
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-light mb-4">
                Leseverstehen üben mit Besty
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-white/80 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>25 Minuten</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>15 Punkte</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>3 Teile</span>
                </div>
              </div>

              {/* CTA Button - Placeholder */}
              <div className="space-y-4">
                <p className="text-white/70 text-sm">In Entwicklung – Bald verfügbar</p>
                <button 
                  disabled
                  className="inline-flex items-center gap-3 bg-white/50 text-purple-700/50 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl cursor-not-allowed"
                >
                  <span>Bald verfügbar</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
