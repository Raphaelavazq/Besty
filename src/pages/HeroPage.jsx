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
    <div className="relative h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Mobile Only: App-style Welcome Screen */}
      <div className="sm:hidden relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Text and Logo - No spacing */}
        <div className="flex flex-col items-center mb-6">
          {/* Text Above Logo */}
          <div
            className={`text-center transform transition-all duration-1000 delay-200 ${
              showContent
                ? "translate-y-0 opacity-100"
                : "-translate-y-8 opacity-0"
            }`}
          >
            <p className="text-base text-white/90 font-semibold">Mit</p>
          </div>

          {/* Logo - Bigger */}
          <div
            className={`transform transition-all duration-1000 delay-250 ${
              showContent
                ? "translate-y-0 opacity-100"
                : "-translate-y-8 opacity-0"
            }`}
          >
            <img
              src="/logo.svg"
              alt="Besty"
              className="h-16 w-auto drop-shadow-2xl brightness-0 invert"
            />
          </div>

          {/* Text Below Logo */}
          <div
            className={`text-center transform transition-all duration-1000 delay-300 ${
              showContent
                ? "translate-y-0 opacity-100"
                : "-translate-y-8 opacity-0"
            }`}
          >
            <p className="text-base text-white/90 font-semibold">
              durch den Test
            </p>
          </div>
        </div>

        {/* Animation */}
        <div
          className={`w-56 h-56 mb-6 transform transition-all duration-1000 delay-400 ${
            showContent ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          <DotLottieReact
            src="https://lottie.host/e625cdca-0dac-4776-a55e-0b437f54c0a7/diw9hO8Z3c.lottie"
            loop
            autoplay
            className="w-full h-full object-contain"
          />
        </div>

        {/* Start Button - Smaller */}
        <div
          className={`transform transition-all duration-1000 delay-500 ${
            showContent
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <button
            onClick={() => navigate("/auth/sign-in")}
            className="bg-white/95 backdrop-blur-md text-purple-900 px-8 py-2.5 rounded-full hover:bg-white active:scale-95 transition-all duration-300 shadow-2xl"
          >
            <span className="font-black text-base">Starten</span>
          </button>
        </div>
      </div>

      {/* Background Animation - Smaller on tablet & desktop, hidden on mobile */}
      <div className="absolute inset-0 hidden sm:flex items-center justify-center pointer-events-none">
        <div className="w-full h-full max-w-3xl max-h-3xl">
          <DotLottieReact
            src="https://lottie.host/e625cdca-0dac-4776-a55e-0b437f54c0a7/diw9hO8Z3c.lottie"
            loop
            autoplay
            className="w-full h-full object-contain opacity-90"
          />
        </div>
      </div>

      {/* Tablet & Desktop Layout - Logo top-left, Button bottom-right */}
      <div className="hidden sm:block relative z-10 h-full">
        {/* Text and Logo - Top Left (same structure as mobile) */}
        <div
          className={`absolute top-8 sm:top-10 md:top-12 left-8 sm:left-10 md:left-12 flex flex-col items-start transform transition-all duration-1000 ${
            showContent
              ? "translate-y-0 opacity-100"
              : "-translate-y-8 opacity-0"
          }`}
        >
          {/* Text Above Logo */}
          <p className="text-base sm:text-lg md:text-lg text-white/90 font-semibold">
            Mit
          </p>

          {/* Logo */}
          <img
            src="/logo.svg"
            alt="Besty"
            className="h-14 sm:h-16 md:h-18 w-auto drop-shadow-2xl brightness-0 invert"
          />

          {/* Text Below Logo */}
          <p className="text-base sm:text-lg md:text-lg text-white/90 font-semibold">
            durch den Test
          </p>
        </div>

        {/* Button Only - Bottom Right */}
        <div
          className={`absolute bottom-8 sm:bottom-10 md:bottom-12 right-8 sm:right-10 md:right-12 transform transition-all duration-1000 delay-300 ${
            showContent
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <button
            onClick={() => navigate("/auth/sign-in")}
            className="bg-white/95 backdrop-blur-md text-purple-900 px-10 py-3 sm:px-12 sm:py-3.5 md:px-14 md:py-4 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            <span className="font-black text-base sm:text-lg md:text-xl">
              Starten
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
