import { createContext, useContext, useEffect } from "react";
import { useStore } from "../store/useStore";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const theme = useStore((state) => state.preferences.theme);

  useEffect(() => {
    // Apply theme class to html element immediately
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }, [theme]);

  // Initialize on mount
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
