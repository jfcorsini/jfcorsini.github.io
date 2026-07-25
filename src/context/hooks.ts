import { useContext } from "react";
import { AppsContext } from "./AppsContext";
import { SystemDateContext } from "./SystemDateContext";
import { ThemeContext } from "./ThemeContext";

export const useApps = () => {
  const context = useContext(AppsContext);
  if (!context) {
    throw new Error("useApps must be used within AppsProvider");
  }
  return context;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const useSystemDate = () => {
  const context = useContext(SystemDateContext);
  if (!context) {
    throw new Error("useSystemDate must be used within SystemDateProvider");
  }
  return context;
};
