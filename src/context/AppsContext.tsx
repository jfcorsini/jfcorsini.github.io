import { createContext } from "react";
import type { AppName } from "../lib/appName";

interface AppsContextType {
  closed: AppName[];
  minimized: AppName[];
  close: (id: AppName) => void;
  open: (id: AppName) => void;
  minimize: (id: AppName) => void;
}

export const AppsContext = createContext<AppsContextType | undefined>(
  undefined,
);
