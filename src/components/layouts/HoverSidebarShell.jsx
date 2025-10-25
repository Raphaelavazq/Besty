/**
 * HoverSidebarShell
 * Layout shell with hover-activated sidebar for all pages.
 * Sidebar slides out from left edge on hover, providing navigation without taking up space.
 * Uses same purple gradient design as DashboardShell for consistency.
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  Home,
  Headphones,
  Eye,
  FileText,
  MessageSquare,
  HelpCircle,
  Settings,
} from "lucide-react";

export default function HoverSidebarShell({ children }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Reset sidebar state on window resize to prevent distortion
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarItems = [
    {
      name: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: location.pathname === "/dashboard",
    },
    {
      name: "Hören",
      icon: Headphones,
      href: "/tests/hoeren",
      active: location.pathname.startsWith("/tests/hoeren"),
    },
    {
      name: "Lesen",
      icon: Eye,
      href: "/tests/lesen",
      active: location.pathname.startsWith("/tests/lesen"),
    },
    {
      name: "Schreiben",
      icon: FileText,
      href: "/tests/schreiben",
      active: location.pathname.startsWith("/tests/schreiben"),
    },
    {
      name: "Sprechen",
      icon: MessageSquare,
      href: "/tests/sprechen",
      active: location.pathname.startsWith("/tests/sprechen"),
    },
    {
      name: "About",
      icon: HelpCircle,
      href: "/about",
      active: location.pathname === "/about",
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/settings",
      active: location.pathname === "/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      {/* Icon Sidebar - Desktop Only */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-20 z-40">
        {/* Icon sidebar */}
        <div className="absolute left-0 top-0 h-full w-20 bg-white/80 backdrop-blur-md shadow-lg border-r border-purple-100">
          <div className="flex flex-col h-full">
            {/* Spacer */}
            <div className="flex-1"></div>

            {/* Icon-only navigation */}
            <nav className="px-2 space-y-2 pb-3">
              {sidebarItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center justify-center w-16 h-12 rounded-xl transition-all duration-200 ${
                    item.active
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                      : "text-purple-600 hover:bg-purple-50"
                  }`}
                  title={item.name}
                >
                  <item.icon size={20} />
                </Link>
              ))}
            </nav>

            {/* Small logo at bottom */}
            <div className="px-2 pb-3 pt-2 border-t border-purple-100">
              <div className="w-16 h-16 flex items-center justify-center">
                <DotLottieReact
                  src="https://lottie.host/e625cdca-0dac-4776-a55e-0b437f54c0a7/diw9hO8Z3c.lottie"
                  loop
                  autoplay
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Hamburger Menu Button - Top Right */}
      <div className="fixed top-4 right-4 z-[100] lg:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex flex-col items-center justify-center space-y-1 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <div className="w-5 h-0.5 bg-white transition-all duration-200"></div>
          <div className="w-5 h-0.5 bg-white transition-all duration-200"></div>
          <div className="w-5 h-0.5 bg-white transition-all duration-200"></div>
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-[90] w-64 bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-800 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Spacer to push content to bottom */}
          <div className="flex-1"></div>

          {/* Avatar with Animation */}
          <div className="flex flex-col items-center px-4 pb-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-1">
              <DotLottieReact
                src="https://lottie.host/e625cdca-0dac-4776-a55e-0b437f54c0a7/diw9hO8Z3c.lottie"
                loop
                autoplay
                className="w-full h-full filter brightness-125 contrast-110 saturate-125"
              />
            </div>
            <div className="w-26 h-9 sm:w-30 sm:h-11 hover:scale-105 transition-all duration-300">
              <svg viewBox="0 0 229.4 94.9" className="w-full h-full">
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

          {/* Navigation */}
          <nav className="px-4 space-y-1 pb-3">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  item.active
                    ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                    : "text-white/80 hover:bg-white hover:text-purple-700 hover:shadow-md"
                }`}
              >
                <item.icon size={18} className="mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Attribution Footer */}
          <div className="px-4 pb-3 pt-3 border-t border-white/10">
            <p className="text-[11px] text-white/60 text-center leading-snug">
              Made with <span className="text-white/80">♥</span> for German
              learners
              <br />
              <span className="text-white/40">© Raphaella 2025</span>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[80] bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-20">{children}</main>
    </div>
  );
}
