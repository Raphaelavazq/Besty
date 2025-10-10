import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  Info,
  Menu,
  X,
  GraduationCap,
  Bookmark,
  Settings,
} from "lucide-react";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Tests", href: "/tests", icon: FileText },
    { name: "Lesezeichen", href: "/bookmarks", icon: Bookmark },
    { name: "Über uns", href: "/about", icon: Info },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button - Fixed Position */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button
          onClick={toggleMenu}
          className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          {isOpen ? (
            <X size={20} className="text-white" />
          ) : (
            <Menu size={20} className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={closeMenu}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        </div>
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-80 bg-white/95 backdrop-blur-md shadow-2xl transform transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="p-6 border-b border-purple-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <GraduationCap size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                B1 Bestie
              </h2>
              <p className="text-slate-600 text-sm">DTZ Prüfungsvorbereitung</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-6">
          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={closeMenu}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                      : "text-slate-700 hover:bg-purple-50 hover:text-purple-700"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 pt-6 border-t border-purple-100">
            <h3 className="text-sm font-semibold text-slate-600 mb-3 px-4">
              Schnellzugriff
            </h3>
            <div className="space-y-2">
              <Link
                to="/tests/hoeren-komplett"
                onClick={closeMenu}
                className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <FileText size={16} className="text-white" />
                </div>
                <span className="font-medium">Vollständiger Hörtest</span>
              </Link>

              <button
                onClick={closeMenu}
                className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 w-full text-left"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Settings size={16} className="text-white" />
                </div>
                <span className="font-medium">Einstellungen</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Menu Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white to-transparent">
          <div className="text-center">
            <p className="text-xs text-slate-500">Version 1.0.0</p>
            <p className="text-xs text-slate-500">© 2025 B1 Bestie</p>
          </div>
        </div>
      </div>
    </>
  );
}
