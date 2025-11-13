import { useState, type PropsWithChildren } from "react";
import { AppsContext } from "./AppsContext";

export const AppsProvider = ({ children }: PropsWithChildren) => {
  const [closed, setClosed] = useState<string[]>([]);
  const [minimized, setMinimized] = useState<string[]>([]);

  const close = (id: string) => {
    setClosed((prev) => [...prev, id]);
    setMinimized((prev) => prev.filter((w) => w !== id));
  };

  const open = (id: string) => {
    if (closed.find((i) => i === id)) {
      setClosed((prev) => prev.filter((w) => w !== id));
    }
    if (minimized.find((i) => i === id)) {
      setMinimized((prev) => prev.filter((w) => w !== id));
    }
  };

  const minimize = (id: string) => {
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
