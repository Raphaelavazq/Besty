import { Moon, Sun } from "lucide-react";
import { useStore } from "../store/useStore";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const theme = useStore((state) => state.preferences.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const [htmlHasDark, setHtmlHasDark] = useState(false);

  useEffect(() => {
    // Check if HTML has dark class
    const check = () => {
      setHtmlHasDark(document.documentElement.classList.contains("dark"));
    };
    check();
    const interval = setInterval(check, 100);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    console.log("🌓 Theme toggle clicked!");
    console.log("📊 Current theme in store:", theme);
    console.log(
      "📄 HTML has 'dark' class:",
      document.documentElement.classList.contains("dark")
    );
    toggleTheme();
    setTimeout(() => {
      const newTheme = useStore.getState().preferences.theme;
      const hasDark = document.documentElement.classList.contains("dark");
      console.log("✅ New theme in store:", newTheme);
      console.log("✅ HTML now has 'dark' class:", hasDark);
      if (newTheme === "dark" && !hasDark) {
        console.error(
          "❌ PROBLEM: Theme is dark but HTML doesn't have dark class!"
        );
      }
    }, 100);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleClick}
        className="relative w-12 h-12 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-md border border-purple-100 dark:border-purple-500/30 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 group"
        aria-label="Toggle theme"
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {/* Sun icon (visible in light mode) */}
        <Sun className="absolute inset-0 m-auto w-5 h-5 text-purple-600 transition-all duration-300 rotate-0 scale-100 dark:rotate-90 dark:scale-0" />

        {/* Moon icon (visible in dark mode) */}
        <Moon className="absolute inset-0 m-auto w-5 h-5 text-purple-300 transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-200 blur-xl"></div>
      </button>
    </div>
  );
}
