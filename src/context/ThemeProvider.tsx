import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  THEME_PREFERENCES,
  ThemeContext,
  type ResolvedTheme,
  type ThemePreference,
} from "./ThemeContext";

const STORAGE_KEY = "theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

/* Storage access throws in sandboxed iframes and some private modes, and a
   theme preference is never worth taking the page down for. */
const readStoredPreference = (): ThemePreference => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (THEME_PREFERENCES.includes(stored as ThemePreference)) {
      return stored as ThemePreference;
    }
  } catch {
    /* fall through to the default */
  }
  return "system";
};

const writeStoredPreference = (preference: ThemePreference) => {
  try {
    localStorage.setItem(STORAGE_KEY, preference);
  } catch {
    /* preference simply will not persist */
  }
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [preference, setPreferenceState] =
    useState<ThemePreference>(readStoredPreference);
  const [systemIsDark, setSystemIsDark] = useState(
    () => window.matchMedia(DARK_QUERY).matches,
  );

  // Following the OS means following it live, not just at load.
  useEffect(() => {
    const query = window.matchMedia(DARK_QUERY);
    const onChange = (event: MediaQueryListEvent) =>
      setSystemIsDark(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const resolved: ResolvedTheme =
    preference === "system" ? (systemIsDark ? "dark" : "light") : preference;

  useEffect(() => {
    document.documentElement.dataset.theme = resolved;
  }, [resolved]);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    writeStoredPreference(next);
  }, []);

  return (
    <ThemeContext.Provider value={{ preference, resolved, setPreference }}>
      {children}
    </ThemeContext.Provider>
  );
};
