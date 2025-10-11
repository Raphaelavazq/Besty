import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Headphones,
  BookOpen,
  Star,
  Info,
  Menu,
  X,
  ChevronUp,
  Volume2,
} from "lucide-react";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Hide/show nav on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const shouldHide = isScrollingDown && currentScrollY > 100;

      setIsVisible(!shouldHide);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navigationItems = [
    {
      id: "home",
      label: "Dashboard",
      icon: Home,
      path: "/",
      description: "Startseite",
    },
    {
      id: "tests",
      label: "Tests",
      icon: Headphones,
      path: "/tests",
      description: "Hörtests",
    },
    {
      id: "content",
      label: "Lernen",
      icon: BookOpen,
      path: "/content",
      description: "Lernmaterial",
    },
    {
      id: "bookmarks",
      label: "Favoriten",
      icon: Star,
      path: "/bookmarks",
      description: "Gespeicherte Inhalte",
    },
    {
      id: "about",
      label: "Info",
      icon: Info,
      path: "/about",
      description: "Über die App",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const isActivePath = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Bottom Navigation Bar - Mobile Only */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200 md:hidden transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-center justify-around py-2">
          {navigationItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);

            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center justify-center p-2 min-w-[44px] min-h-[44px] rounded-lg transition-colors ${
                  isActive
                    ? "text-purple-600 bg-purple-50"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
                aria-label={item.description}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span
                  className={`text-xs mt-1 font-medium ${isActive ? "text-purple-600" : "text-gray-500"}`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* More Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="flex flex-col items-center justify-center p-2 min-w-[44px] min-h-[44px] rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
            aria-label="Mehr Optionen"
          >
            <Menu size={20} />
            <span className="text-xs mt-1 font-medium text-gray-500">Mehr</span>
          </button>
        </div>
      </div>

      {/* Fullscreen Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-white md:hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Navigation</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Menü schließen"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-colors min-h-[56px] ${
                    isActive
                      ? "text-purple-600 bg-purple-50 border border-purple-200"
                      : "text-gray-700 hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  <div className="text-left">
                    <div
                      className={`font-medium ${isActive ? "text-purple-600" : "text-gray-800"}`}
                    >
                      {item.label}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.description}
                    </div>
                  </div>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-purple-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-gray-200 mt-auto">
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Schnellzugriff
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  handleNavigation("/synchronized-test/dtz-local-fulltest")
                }
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors min-h-[80px]"
              >
                <Volume2 size={24} />
                <span className="text-sm font-medium">Volltest</span>
              </button>
              <button
                onClick={() => handleNavigation("/dtz-teil-training")}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors min-h-[80px]"
              >
                <Headphones size={24} />
                <span className="text-sm font-medium">Teil Training</span>
              </button>
            </div>
          </div>

          {/* Bottom Safe Area */}
          <div
            style={{ height: "env(safe-area-inset-bottom)" }}
            className="bg-white"
          />
        </div>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-20 right-4 z-40 p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 md:hidden ${
          lastScrollY > 500
            ? "translate-y-0 opacity-100"
            : "translate-y-16 opacity-0"
        }`}
        aria-label="Nach oben scrollen"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        <ChevronUp size={20} />
      </button>

      {/* Bottom spacing for content */}
      <div className="h-20 md:h-0" />
    </>
  );
};

export default MobileNavigation;
