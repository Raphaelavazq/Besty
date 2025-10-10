import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Info, FileText, Menu, GraduationCap } from "lucide-react";

export default function Layout({ children }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Tests", href: "/tests", icon: FileText },
    { name: "About", href: "/about", icon: Info },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 flex flex-col">
      {/* Fixed Header */}
      <header className="flex-shrink-0 bg-white/80 backdrop-blur-md border-b border-white/50 shadow-lg">
        <div className="px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <GraduationCap size={16} className="text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  B1 Bestie
                </div>
              </div>
            </Link>

            <nav className="hidden md:flex gap-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                        : "text-slate-700 hover:bg-purple-100 hover:text-purple-700"
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
              className="md:hidden p-2 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <Menu size={20} className="text-slate-700" />
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-3 pt-3 border-t border-purple-100">
              <nav className="flex gap-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                          : "text-slate-700 hover:bg-purple-100 hover:text-purple-700"
                      }`}
                    >
                      <Icon size={16} />
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
