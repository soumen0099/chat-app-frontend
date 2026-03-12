import React from "react";
import { useTheme } from "../hooks/useTheme.js";

const ThemeToggle = ({ variant = "icon" }) => {
  const { theme, toggleTheme } = useTheme();

  if (variant === "compact") {
    return (
      <button
        onClick={() => toggleTheme(theme === "night" ? "light" : "night")}
        title="Toggle theme"
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-xl bg-base-200 hover:bg-base-300 text-base-content transition-all hover:scale-105"
      >
        {theme === "night" ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8,8,0,1,1,6.19-6.19,1,1,0,0,0-.92-1.22A10,10,0,1,0,23.35,13.05,1,1,0,0,0,21.64,13Z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5" />
            <path d="M12,1V3m0,18v2M4.22,4.22l1.41,1.41M17.37,18.37l1.41,1.41M1,12H3m18,0h2M4.22,19.78l1.41-1.41M17.37,5.63l1.41-1.41" />
          </svg>
        )}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-base-200/50 rounded-lg p-1">
      <button
        onClick={() => toggleTheme("light")}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          theme === "light"
            ? "bg-base-100 text-base-content shadow-sm"
            : "text-base-content/50 hover:text-base-content"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" />
          <path d="M12,1V3m0,18v2M4.22,4.22l1.41,1.41M17.37,18.37l1.41,1.41M1,12H3m18,0h2M4.22,19.78l1.41-1.41M17.37,5.63l1.41-1.41" />
        </svg>
        Light
      </button>
      <button
        onClick={() => toggleTheme("night")}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          theme === "night"
            ? "bg-base-100 text-base-content shadow-sm"
            : "text-base-content/50 hover:text-base-content"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8,8,0,1,1,6.19-6.19,1,1,0,0,0-.92-1.22A10,10,0,1,0,23.35,13.05,1,1,0,0,0,21.64,13Z" />
        </svg>
        Dark
      </button>
    </div>
  );
};

export default ThemeToggle;
