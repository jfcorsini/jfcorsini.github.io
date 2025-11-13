import { createContext } from "react";
import type { AppName } from "../lib/appName";

interface WindowsContextType {
  closed: string[];
  minimized: string[];
  closeWindow: (id: AppName) => void;
  openWindow: (id: AppName) => void;
  minimizeWindow: (id: AppName) => void;
}

export const WindowsContext = createContext<WindowsContextType | undefined>(
  undefined,
);
