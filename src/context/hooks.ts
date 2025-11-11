import { useContext } from "react";
import { WindowsContext } from "./WindowsContext";

export const useWindows = () => {
  const context = useContext(WindowsContext);
  if (!context) {
    throw new Error('useWindows must be used within WindowsProvider');
  }
  return context;
};