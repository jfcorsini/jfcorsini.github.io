import type { DragControls } from "motion/react";
import { createContext, useContext } from "react";
import type { AppName } from "../../lib/appName";

type WindowsInternalContextType = {
  name: AppName;
  dragControls: DragControls;
  isMaximized: boolean;
  setIsMaximized: (value: boolean) => void;
  closeWindow: () => void;
};

export const WindowsInternalContext = createContext<
  WindowsInternalContextType | undefined
>(undefined);

export const useWindowsInternal = () => {
  const context = useContext(WindowsInternalContext);
  if (!context) {
    throw new Error(
      "Windows compound components must be used within a Windows component",
    );
  }
  return context;
};
