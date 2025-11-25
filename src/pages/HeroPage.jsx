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
    <div className="relative h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden flex flex-col">
      {/* Background Animation - Optimized for mobile */}
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

      {/* Besty Logo - Top, smaller on mobile */}
      <div
        className={`relative z-20 pt-6 sm:pt-8 md:pt-12 px-6 sm:px-8 md:px-12 transform transition-all duration-1000 delay-200 ${
          showContent ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
        }`}
      >
        <div className="w-24 h-10 sm:w-32 sm:h-12 md:w-44 md:h-18">
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

      {/* Spacer to push button to bottom */}
      <div className="flex-1"></div>

      {/* Call to Action Button - Bottom center on mobile, bottom right on desktop */}
      <div
        className={`relative z-20 pb-6 sm:pb-8 md:pb-12 px-6 sm:px-8 md:px-12 flex justify-center sm:justify-end transform transition-all duration-1000 delay-400 ${
          showContent ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <button
          onClick={() => navigate("/auth/sign-in")}
          className="bg-white/90 dark:bg-white/80 backdrop-blur-md text-purple-900 dark:text-purple-800 px-8 py-3.5 sm:px-10 sm:py-4 md:px-12 md:py-5 rounded-full hover:bg-white dark:hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl hover:shadow-3xl"
        >
          <span className="font-black text-base sm:text-lg md:text-xl">
            Starten
          </span>
        </button>
      </div>
    </div>
  );
}
