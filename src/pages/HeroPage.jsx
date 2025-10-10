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
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Animation - Optimized for All Screen Sizes */}
      <div className="absolute inset-0 -translate-x-16 sm:-translate-x-24 md:-translate-x-32 lg:-translate-x-48">
        <DotLottieReact
          src="https://lottie.host/e625cdca-0dac-4776-a55e-0b437f54c0a7/diw9hO8Z3c.lottie"
          loop
          autoplay
          className="w-full h-full scale-105 xs:scale-108 sm:scale-110 md:scale-115 lg:scale-125 xl:scale-130 object-cover"
        />
      </div>

      {/* Logo in Top Right - Responsive Sizing */}
      <div
        className={`absolute top-4 xs:top-6 sm:top-8 md:top-10 lg:top-12 right-4 xs:right-6 sm:right-8 md:right-10 lg:right-12 z-20 transform transition-all duration-1000 delay-200 ${
          showContent ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
      >
        <img
          src="/logo.svg"
          alt="B1 Bestie"
          className="h-6 xs:h-7 sm:h-8 md:h-10 lg:h-12 xl:h-14 w-auto filter brightness-0 invert"
        />
      </div>

      {/* Arrow Button in Bottom Right with Question Above - Responsive */}
      <div
        className={`absolute bottom-4 xs:bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-12 right-4 xs:right-6 sm:right-8 md:right-10 lg:right-12 z-20 transform transition-all duration-1000 delay-400 ${
          showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {/* Question Text Above Button - Hidden on Mobile */}
        <div className="hidden sm:block md:mb-4 lg:mb-6 text-right">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80 font-light tracking-wide">
            Bereit für deine DTZ Prüfung?
          </p>
        </div>

        {/* Arrow Button - Responsive Sizing */}
        <button
          onClick={handleEnterApp}
          className="group bg-white/15 backdrop-blur-md border border-white/25 text-white w-12 h-12 xs:w-13 xs:h-13 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 rounded-full hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center ml-auto"
        >
          <ArrowRight className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}
