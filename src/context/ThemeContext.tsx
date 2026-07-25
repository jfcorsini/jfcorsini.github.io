import { createContext } from "react";

/** What the user picked. "system" defers to the OS. */
export const THEME_PREFERENCES = ["system", "light", "dark", "sepia"] as const;
export type ThemePreference = (typeof THEME_PREFERENCES)[number];

/** What actually ends up on the document. */
export type ResolvedTheme = Exclude<ThemePreference, "system">;

type ThemeContextType = {
  preference: ThemePreference;
  resolved: ResolvedTheme;
  setPreference: (preference: ThemePreference) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
