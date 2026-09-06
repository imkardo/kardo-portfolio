import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";

// Dark-only site: the whole visual identity (aurora, glass, terminal,
// mockups) is designed for dark. No toggle — always dark.
const ThemeContext = createContext<{ theme: "dark" }>({ theme: "dark" });

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    document.documentElement.style.colorScheme = "dark";
    try {
      window.localStorage.removeItem("theme");
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ theme: "dark" as const }), []);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
