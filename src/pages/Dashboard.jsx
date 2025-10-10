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
      title: "Sprachliche Strukturen",
      subtitle: "Teil 1-3", 
      description: "Grammar and vocabulary",
      icon: PenTool,
      color: "from-purple-600 to-violet-600",
      progress: 85,
    },
    {
      title: "Schriftlicher Ausdruck",
      subtitle: "Brief schreiben",
      description: "Writing practice",
      icon: MessageSquare,
      color: "from-indigo-600 to-purple-700",
      progress: 45,
    },
  ];

  const mainActions = [
    {
      title: "Lernen",
      subtitle: "Study Mode",
      description: "Review materials and practice",
      icon: BookOpen,
      color: "from-purple-500 to-indigo-600",
      href: "/study",
    },
    {
      title: "Test",
      subtitle: "Exam Mode", 
      description: "Take timed practice tests",
      icon: Play,
      color: "from-indigo-500 to-purple-600",
      href: "/tests",
    },
  ];

  const themes = [
    { name: "Familie & Beziehungen", count: 15, color: "from-purple-400 to-indigo-500" },
    { name: "Arbeit & Beruf", count: 22, color: "from-indigo-400 to-purple-500" },
    { name: "Gesundheit", count: 18, color: "from-purple-500 to-violet-500" },
    { name: "Wohnen", count: 12, color: "from-violet-400 to-purple-500" },
    { name: "Freizeit", count: 16, color: "from-indigo-500 to-purple-600" },
    { name: "Einkaufen", count: 14, color: "from-purple-600 to-indigo-600" },
  ];

  const sidebarItems = [
    { name: "Dashboard", icon: Home, href: "/dashboard", active: true },
    { name: "Tests", icon: Play, href: "/tests" },
    { name: "Study", icon: BookOpen, href: "/study" },
    { name: "Progress", icon: BarChart3, href: "/progress" },
    { name: "Schedule", icon: Calendar, href: "/schedule" },
    { name: "Bookmarks", icon: Star, href: "/bookmarks" },
    { name: "Achievements", icon: Award, href: "/achievements" },
    { name: "Profile", icon: User, href: "/profile" },
    { name: "Notifications", icon: Bell, href: "/notifications" },
    { name: "Downloads", icon: Download, href: "/downloads" },
    { name: "Help", icon: HelpCircle, href: "/help" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-md shadow-2xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0 border-r border-purple-100`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-20 px-6 border-b border-purple-100">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <DotLottieReact
                src="https://lottie.host/fd1c3021-0a8e-4b3e-8c5b-6b9c4d2a8f7e/9XzKQs8bkC.lottie"
                autoplay
                loop
                className="w-8 h-8"
              />
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">B1 Bestie</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  item.active
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                }`}
              >
                <item.icon size={18} className="mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="px-4 py-4 border-t border-purple-100">
            <div className="flex items-center px-3 py-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mr-3">
                <User size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Maria Schmidt</p>
                <p className="text-xs text-purple-500">Premium</p>
              </div>
            </div>
            <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-xl hover:bg-purple-50 hover:text-purple-700 transition-all duration-200">
              <LogOut size={18} className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-6 bg-white/80 backdrop-blur-md shadow-sm border-b border-purple-100">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-3 rounded-2xl text-purple-600 hover:bg-purple-50 transition-colors"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Dashboard</h1>
          <div className="w-12"></div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 lg:p-8 h-screen overflow-hidden flex flex-col">
          {/* Welcome */}
          <div className="mb-6 flex-shrink-0">
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Willkommen zurück! 👋
            </h1>
          </div>

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
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <action.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-purple-600 mb-1">{action.subtitle}</p>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </Link>
              ))}
            </div>

            {/* Exam Parts */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Prüfungsteile</h2>
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                {examParts.map((part) => (
                  <div
                    key={part.title}
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-purple-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${part.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <part.icon size={20} className="text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">
                      {part.title}
                    </h3>
                    <p className="text-xs text-purple-600 mb-2">{part.subtitle}</p>
                    <div className="w-full bg-purple-100 rounded-full h-2 mb-2">
                      <div 
                        className={`h-2 bg-gradient-to-r ${part.color} rounded-full transition-all duration-500`}
                        style={{ width: `${part.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs font-medium text-gray-700">{part.progress}%</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Themes */}
            <div className="pb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Themen</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {themes.map((theme) => (
                  <div
                    key={theme.name}
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-purple-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                  >
                    <div className={`w-8 h-8 bg-gradient-to-r ${theme.color} rounded-lg mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}></div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">
                      {theme.name}
                    </h3>
                    <p className="text-purple-600 text-xs">{theme.count} Übungen</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
