import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ArrowRight } from "lucide-react";

export default function HeroPage() {
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleEnterApp = () => {
    setShowContent(false);
    setTimeout(() => {
      navigate("/dashboard");
    }, 400);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Background Animation - Better Fit */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full max-w-4xl max-h-4xl">
          <DotLottieReact
            src="https://lottie.host/e625cdca-0dac-4776-a55e-0b437f54c0a7/diw9hO8Z3c.lottie"
            loop
            autoplay
            className="w-full h-full object-contain opacity-90"
          />
        </div>
      </div>

      {/* Besty Logo - Top Left */}
      <div
        className={`absolute top-8 sm:top-12 md:top-16 left-8 sm:left-12 md:left-16 z-20 transform transition-all duration-1000 delay-200 ${
          showContent ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
        }`}
      >
        <div className="w-28 h-12 sm:w-36 sm:h-14 md:w-44 md:h-18">
          <svg
            viewBox="0 0 229.4 94.9"
            className="w-full h-full drop-shadow-2xl"
          >
            <text
              x="0"
              y="74.5"
              fill="#ffffff"
              fontFamily="AglonemaRegular, Aglonema, sans-serif"
              fontSize="93.3"
              fontWeight="normal"
            >
              Besty
            </text>
          </svg>
        </div>
      </div>

      {/* Call to Action Button - Bottom Right */}
      <div
        className={`absolute bottom-8 sm:bottom-12 md:bottom-16 right-8 sm:right-12 md:right-16 z-20 transform transition-all duration-1000 delay-400 ${
          showContent ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <button
          onClick={handleEnterApp}
          className="bg-white/90 dark:bg-white/80 backdrop-blur-md text-purple-900 dark:text-purple-800 px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6 rounded-full hover:bg-white dark:hover:bg-white hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl"
        >
          <span className="font-black text-base sm:text-lg md:text-xl">
            Starten
          </span>
        </button>
      </div>
    </div>
  );
}
