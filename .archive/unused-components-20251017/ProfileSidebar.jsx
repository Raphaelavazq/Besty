import { Link, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  BookOpen,
  User,
  Settings,
  X,
  Headphones,
  PenTool,
  MessageSquare,
  Eye,
} from "lucide-react";

export default function ProfileSidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const user = {
    name: "Maria Schmidt",
  };

  const navigationItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Headphones, label: "Hören", path: "/tests?filter=hoeren" },
    { icon: Eye, label: "Lesen", path: "/tests?filter=lesen" },
    { icon: PenTool, label: "Schreiben", path: "/tests?filter=schreiben" },
    { icon: MessageSquare, label: "Sprechen", path: "/tests?filter=sprechen" },
    { icon: BookOpen, label: "Tests", path: "/tests" },
    { icon: FileText, label: "Inhalte", path: "/content" },
    { icon: User, label: "Profil", path: "/profile" },
    { icon: Settings, label: "Einstellungen", path: "/settings" },
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white/95 backdrop-blur-md border-r border-white/50 shadow-lg z-50 transition-transform duration-300 transform flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:block w-64`}
      >
        {/* Header */}
        <div className="p-4 border-b border-purple-100">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              B1 Bestie
            </h1>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1 hover:bg-purple-50 rounded"
            >
              <X size={20} className="text-slate-600" />
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-purple-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <User size={20} className="text-white" />
            </div>
            <div>
              <p className="font-medium text-slate-700">{user.name}</p>
              <p className="text-sm text-slate-500">Level B1</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200
                      ${
                        active
                          ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg"
                          : "text-slate-600 hover:bg-purple-50 hover:text-purple-700"
                      }`}
                  >
                    <Icon
                      size={18}
                      className={active ? "text-white" : "text-slate-500"}
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
