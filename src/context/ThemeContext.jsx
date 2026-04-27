// ============================================================
// src/context/ThemeContext.jsx
// Global dark/light mode state — wrap App with this
// ============================================================

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Default to dark mode
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("portfolio-theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      root.style.backgroundColor = "rgba(3, 0, 20, 0.95)";
    } else {
      root.classList.remove("dark");
      root.style.backgroundColor = "rgba(248, 250, 255, 0.95)";
    }
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
