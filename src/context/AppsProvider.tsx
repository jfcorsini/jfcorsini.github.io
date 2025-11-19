import { useState, type PropsWithChildren } from "react";
import type { AppName } from "../lib/appName";
import { AppsContext } from "./AppsContext";

export const AppsProvider = ({ children }: PropsWithChildren) => {
  const [closed, setClosed] = useState<AppName[]>(["projects", "snake"]);
  const [minimized, setMinimized] = useState<AppName[]>([]);

  const close = (id: AppName) => {
    setClosed((prev) => [...prev, id]);
    setMinimized((prev) => prev.filter((w) => w !== id));
  };

  const open = (id: AppName) => {
    if (closed.find((i) => i === id)) {
      setClosed((prev) => prev.filter((w) => w !== id));
    }
    if (minimized.find((i) => i === id)) {
      setMinimized((prev) => prev.filter((w) => w !== id));
    }
  };

  const minimize = (id: AppName) => {
    setMinimized((prev) => [...prev, id]);
  };

  return (
    <AppsContext
      value={{
        closed,
        minimized,
        close,
        open,
        minimize,
      }}
    >
      {children}
    </AppsContext>
  );
};
