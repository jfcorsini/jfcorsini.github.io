import { createContext } from "react";
import type { AppName } from "../lib/appName";

interface AppsContextType {
  closed: string[];
  minimized: string[];
  close: (id: AppName) => void;
  open: (id: AppName) => void;
  minimize: (id: AppName) => void;
}

export const AppsContext = createContext<AppsContextType | undefined>(
  undefined,
);
