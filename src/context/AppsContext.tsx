import { createContext } from "react";
import type { AppName } from "../lib/appName";

interface AppsContextType {
  closed: AppName[];
  minimized: AppName[];
  /** Stacking order, back to front. The last visible entry is focused. */
  stack: AppName[];
  /** Topmost app that is actually on screen, or null when the desktop is bare. */
  focused: AppName | null;
  close: (id: AppName) => void;
  open: (id: AppName) => void;
  minimize: (id: AppName) => void;
  /** Raise a window to the front without changing its open/closed state. */
  focus: (id: AppName) => void;
  zIndexOf: (id: AppName) => number;
}

export const AppsContext = createContext<AppsContextType | undefined>(
  undefined,
);
