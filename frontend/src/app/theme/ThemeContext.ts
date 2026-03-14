import { createContext } from "react";

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const themeClasses = {
  light: "bg-[#f9fafb] text-black",
  dark: "bg-[#1f1f1f] text-white",
}

export const ThemeContext = createContext<ThemeContextType | null>(null)