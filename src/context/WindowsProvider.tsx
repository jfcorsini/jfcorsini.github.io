import { useState, type PropsWithChildren } from "react";
import { WindowsContext } from "./WindowsContext";

export const WindowsProvider = ({ children }: PropsWithChildren) => {
  const [closed, setClosed] = useState<string[]>([]);
  const [minimized, setMinimized] = useState<string[]>([]);

  const closeWindow = (id: string) => {
    setClosed((prev) => [...prev, id]);
    setMinimized((prev) => prev.filter((w) => w !== id));
  };

  const openWindow = (id: string) => {
    if (closed.find((i) => i === id)) {
      setClosed((prev) => prev.filter((w) => w !== id));
    }
    if (minimized.find((i) => i === id)) {
      setMinimized((prev) => prev.filter((w) => w !== id));
    }
  };

  const minimizeWindow = (id: string) => {
    setMinimized((prev) => [...prev, id]);
  };

  return (
    <WindowsContext
      value={{
        closed,
        minimized,
        closeWindow,
        openWindow,
        minimizeWindow,
      }}
    >
      {children}
    </WindowsContext>
  );
};
