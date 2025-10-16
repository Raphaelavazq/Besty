/**
 * DashboardShell
 * Layout shell specifically for dashboard routes.
 * Provides full sidebar navigation and dashboard-specific layout structure.
 * Preserves existing visual design exactly.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  BookOpen,
  FileText,
  Home,
  Star,
  Settings,
  Eye,
  BarChart3,
  Award,
  HelpCircle,
  User,
} from "lucide-react";

export default function DashboardShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { name: "Dashboard", icon: Home, href: "/dashboard", active: true, available: true },
    { name: "Tests", icon: FileText, href: "/tests", available: true },
    { name: "Study", icon: BookOpen, href: "/study", available: true },
    { name: "Progress", icon: BarChart3, href: "/progress", available: false },
    { name: "Bookmarks", icon: Star, href: "/bookmarks", available: false },
    { name: "Achievements", icon: Award, href: "/achievements", available: false },
    { name: "Profile", icon: User, href: "/profile", available: false },
    { name: "About", icon: HelpCircle, href: "/about", available: true },
    { name: "Settings", icon: Settings, href: "/settings", available: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 flex safe-area-inset">
      {/* Mobile Hamburger Menu Button - Top Right */}
      <div className="fixed top-4 right-4 z-50 lg:hidden safe-area-inset-top safe-area-inset-right">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`w-10 h-10 flex flex-col items-center justify-center space-y-1 group transition-all duration-300 hover:scale-105 ${
            sidebarOpen
              ? ""
              : "bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl"
          }`}
        >
          <div
            className={`w-6 h-0.5 transition-all duration-200 ${
              sidebarOpen ? "bg-white" : "bg-white"
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 transition-all duration-200 ${
              sidebarOpen ? "bg-white" : "bg-white"
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 transition-all duration-200 ${
              sidebarOpen ? "bg-white" : "bg-white"
            }`}
          ></div>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-64 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0 lg:left-0 lg:right-auto border-l lg:border-l-0 lg:border-r border-purple-500`}
      >
        <div className="flex flex-col h-full">
          {/* Spacer to push content to bottom */}
          <div className="flex-1"></div>

          {/* Avatar with Animation - Above navigation options */}
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
                to={item.available ? item.href : "#"}
                onClick={(e) => !item.available && e.preventDefault()}
                className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  item.active
                    ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                    : item.available
                    ? "text-white/80 hover:bg-white hover:text-purple-700 hover:shadow-md"
                    : "text-white/50 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center">
                  <item.icon size={18} className="mr-3" />
                  {item.name}
                </div>
                {!item.available && (
                  <span className="bg-white/20 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md border border-white/30">
                    Bald
                  </span>
                )}
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
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">{children}</div>
    </div>
  );
}
