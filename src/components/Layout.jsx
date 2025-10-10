import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Info,
  FileText,
  Menu,
  GraduationCap,
  Star,
  Settings,
  Award,
  User,
  HelpCircle,
  BarChart3,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Layout({ children }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if current page is dashboard
  const isDashboard = location.pathname === "/dashboard";

  const sidebarItems = [
    {
      name: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: location.pathname === "/dashboard",
    },
    {
      name: "Tests",
      icon: FileText,
      href: "/tests",
      active: location.pathname === "/tests",
    },
    {
      name: "Study",
      icon: GraduationCap,
      href: "/study",
      active: location.pathname === "/study",
    },
    {
      name: "Progress",
      icon: BarChart3,
      href: "/progress",
      active: location.pathname === "/progress",
    },
    {
      name: "Bookmarks",
      icon: Star,
      href: "/bookmarks",
      active: location.pathname === "/bookmarks",
    },
    {
      name: "Achievements",
      icon: Award,
      href: "/achievements",
      active: location.pathname === "/achievements",
    },
    {
      name: "Profile",
      icon: User,
      href: "/profile",
      active: location.pathname === "/profile",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      {/* Mobile Hamburger Menu Button - Top Right (Not on Dashboard) */}
      {!isDashboard && (
        <div className="fixed top-4 right-4 z-50 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center space-y-1 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 hover:bg-gradient-to-br hover:from-purple-600 hover:to-indigo-600 border border-purple-100 group"
          >
            <div className="w-5 h-0.5 bg-gray-700 transition-colors duration-200 group-hover:bg-white"></div>
            <div className="w-5 h-0.5 bg-gray-700 transition-colors duration-200 group-hover:bg-white"></div>
            <div className="w-5 h-0.5 bg-gray-700 transition-colors duration-200 group-hover:bg-white"></div>
          </button>
        </div>
      )}

      {/* Mobile Purple Sidebar (Not on Dashboard) */}
      {!isDashboard && (
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 shadow-2xl transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:hidden border-r border-purple-500`}
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
            <nav className="px-4 space-y-1 pb-6">
              {sidebarItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
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
          </div>
        </div>
      )}

      {/* Mobile overlay (Not on Dashboard) */}
      {!isDashboard && mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area - Fills remaining viewport */}
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
