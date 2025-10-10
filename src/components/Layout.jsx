import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Info, FileText, Menu, GraduationCap } from "lucide-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import MobileNavigation from "./MobileNavigation";

export default function Layout({ children }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Tests", href: "/tests", icon: FileText },
    { name: "About", href: "/about", icon: Info },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      {/* Mobile Navigation Component */}
      <MobileNavigation />

      <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-white/95 via-purple-50/90 to-indigo-50/95 backdrop-blur-lg border-b border-purple-200/50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-105 transition-all duration-300 relative">
                {/* Circle background for logo */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-full backdrop-blur-sm border border-white/30"></div>
                <div className="relative z-10 p-2 sm:p-2.5">
                  <DotLottieReact
                    src="https://lottie.host/e625cdca-0dac-4776-a55e-0b437f54c0a7/diw9hO8Z3c.lottie"
                    loop
                    autoplay
                    className="w-full h-full"
                  />
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-indigo-500 transition-all duration-300">
                  B1 Bestie
                </div>
                <div className="text-xs text-slate-600 font-medium">DTZ Prüfungsvorbereitung</div>
              </div>
            </Link>

            <nav className="hidden md:flex gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-105"
                        : "text-slate-700 hover:bg-white/80 hover:text-purple-700 hover:shadow-md hover:scale-105"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 hover:bg-white/80 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-105"
            >
              <Menu size={20} className="text-slate-700" />
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-purple-200/50">
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                          : "text-slate-700 hover:bg-white/80 hover:text-purple-700 hover:shadow-md"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area - Fills remaining viewport */}
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
