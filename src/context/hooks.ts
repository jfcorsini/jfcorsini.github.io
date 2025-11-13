import { useContext } from "react";
import { AppsContext } from "./AppsContext";

export const useApps = () => {
  const context = useContext(AppsContext);
  if (!context) {
    throw new Error("useApps must be used within AppsProvider");
  }
  return context;
};
