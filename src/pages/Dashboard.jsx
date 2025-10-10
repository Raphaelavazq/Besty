import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  BookOpen,
  Play,
  FileText,
  Headphones,
  MessageSquare,
  PenTool,
  Users,
  Menu,
  Home,
  Star,
  Settings,
  LogOut,
  Eye,
  Target,
  TrendingUp,
  BarChart3,
  Calendar,
  Clock,
  Award,
  HelpCircle,
  User,
  Bell,
  Download,
  Share2,
} from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const examParts = [
    {
      title: "Hörverstehen",
      subtitle: "Teil 1-3",
      description: "Listening comprehension exercises",
      icon: Headphones,
      color: "from-purple-500 to-indigo-600",
      progress: 75,
    },
    {
      title: "Leseverstehen",
      subtitle: "Teil 1-3",
      description: "Reading comprehension practice",
      icon: Eye,
      color: "from-indigo-500 to-purple-600",
      progress: 60,
    },
    {
      title: "Sprachbausteine",
      subtitle: "Teil 1-2",
      description: "Grammar and vocabulary exercises",
      icon: PenTool,
      color: "from-purple-600 to-pink-600",
      progress: 40,
    },
    {
      title: "Schriftlicher Ausdruck",
      subtitle: "Brief schreiben",
      description: "Letter writing practice",
      icon: FileText,
      color: "from-pink-500 to-purple-600",
      progress: 30,
    },
  ];

  const mainActions = [
    {
      title: "Prüfung starten",
      subtitle: "Vollständige Simulation",
      description: "Komplette DTZ-Prüfung unter realen Bedingungen",
      icon: Play,
      color: "from-purple-600 to-indigo-600",
      href: "/tests",
    },
    {
      title: "Gezieltes Training",
      subtitle: "Einzelne Bereiche",
      description: "Fokussierte Übungen für spezifische Fertigkeiten",
      icon: Target,
      color: "from-indigo-600 to-purple-600",
      href: "/study",
    },
  ];

  const themes = [
    {
      name: "Familie & Freunde",
      count: 12,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Wohnen & Leben",
      count: 15,
      color: "from-indigo-500 to-purple-500",
    },
    { name: "Gesundheit", count: 10, color: "from-purple-600 to-indigo-600" },
    { name: "Arbeit & Beruf", count: 18, color: "from-pink-500 to-purple-500" },
    { name: "Einkaufen", count: 8, color: "from-purple-500 to-indigo-500" },
    {
      name: "Verkehr & Mobilität",
      count: 9,
      color: "from-indigo-600 to-purple-600",
    },
  ];

  const sidebarItems = [
    { name: "Dashboard", icon: Home, href: "/dashboard", active: true },
    { name: "Tests", icon: FileText, href: "/tests" },
    { name: "Study", icon: BookOpen, href: "/study" },
    { name: "Progress", icon: BarChart3, href: "/progress" },
    { name: "Bookmarks", icon: Star, href: "/bookmarks" },
    { name: "Achievements", icon: Award, href: "/achievements" },
    { name: "Profile", icon: User, href: "/profile" },
    { name: "About", icon: HelpCircle, href: "/about" },
    { name: "Settings", icon: Settings, href: "/settings" },
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
        className={`fixed inset-y-0 right-0 z-40 w-64 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 shadow-2xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "translate-x-full"} lg:translate-x-0 lg:static lg:inset-0 lg:left-0 lg:right-auto border-l lg:border-l-0 lg:border-r border-purple-500`}
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

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Dashboard Content */}
        <div className="pt-20 px-4 pb-8 sm:p-6 lg:p-8 lg:pt-8 h-screen overflow-hidden flex flex-col">
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto space-y-6 pr-2">
            {/* Main Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mainActions.map((action) => (
                <Link
                  key={action.title}
                  to={action.href}
                  className="group bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <action.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-purple-600 mb-1">
                    {action.subtitle}
                  </p>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </Link>
              ))}
            </div>

            {/* Exam Parts */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Prüfungsteile
              </h2>
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                {examParts.map((part) => (
                  <div
                    key={part.title}
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-purple-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                  >
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${part.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <part.icon size={20} className="text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">
                      {part.title}
                    </h3>
                    <p className="text-xs text-purple-600 mb-2">
                      {part.subtitle}
                    </p>
                    <div className="w-full bg-purple-100 rounded-full h-2 mb-2">
                      <div
                        className={`h-2 bg-gradient-to-r ${part.color} rounded-full transition-all duration-500`}
                        style={{ width: `${part.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs font-medium text-gray-700">
                      {part.progress}%
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Themes */}
            <div className="pb-6 lg:pb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Themen</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {themes.map((theme) => (
                  <div
                    key={theme.name}
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-purple-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                  >
                    <div
                      className={`w-8 h-8 bg-gradient-to-r ${theme.color} rounded-lg mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    ></div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">
                      {theme.name}
                    </h3>
                    <p className="text-purple-600 text-xs">
                      {theme.count} Übungen
                    </p>
                  </div>
                ))}
              </div>
              {/* Extra spacing for mobile to avoid hamburger button overlap */}
              <div className="h-20 lg:h-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
