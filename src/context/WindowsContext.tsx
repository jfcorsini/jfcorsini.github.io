import { createContext } from "react";

export type WindowsContextId = "portfolio";

interface WindowsContextType {
  closed: string[];
  minimized: string[];
  closeWindow: (id: WindowsContextId) => void;
  openWindow: (id: WindowsContextId) => void;
  minimizeWindow: (id: WindowsContextId) => void;
  restoreWindow: (id: WindowsContextId) => void;
}

export const WindowsContext = createContext<WindowsContextType | undefined>(
  undefined,
);
