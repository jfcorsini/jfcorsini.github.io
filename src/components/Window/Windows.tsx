import { AnimatePresence, motion, useDragControls } from "motion/react";
import React, { useState } from "react";
import { useApps } from "../../context/hooks";
import type { AppName } from "../../lib/appName";
import styles from "./Windows.module.css";
import { WindowsInternalContext } from "./WindowsContext";

type WindowsRootProps = React.PropsWithChildren<{
  name: AppName;
}>;

export const WindowsRoot = ({ children, name }: WindowsRootProps) => {
  const dragControls = useDragControls();
  const [isMaximized, setIsMaximized] = useState(false);

  const apps = useApps();
  const isOpen = !apps.closed.includes(name) && !apps.minimized.includes(name);

  const closeWindow = () => {
    setIsMaximized(false);
    apps.close(name);
  };

  return (
    <WindowsInternalContext.Provider
      value={{
        name,
        dragControls,
        isMaximized,
        setIsMaximized,
        closeWindow,
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={name}
            drag={!isMaximized}
            dragControls={dragControls}
            dragMomentum={false}
            dragListener={false}
            className={`${styles.container} ${isMaximized ? styles.maximized : ""}`}
            exit={{ y: 1000, opacity: 0.5 }}
            initial={{
              x: "-50%",
              y: "110%",
              left: "50%",
              top: "110%",
              width: isMaximized ? "100vw" : "900px",
              height: isMaximized ? "100vh" : "600px",
              borderRadius: isMaximized ? 0 : "var(--border-radius)",
              "--cursor": "grab",
            }}
            animate={{
              x: isMaximized ? 0 : "-50%",
              y: isMaximized ? 0 : "-50%",
              left: isMaximized ? 0 : "50%",
              top: isMaximized ? 0 : "50%",
              width: isMaximized ? "100vw" : "900px",
              height: isMaximized ? "100vh" : "600px",
              borderRadius: isMaximized ? 0 : "var(--border-radius)",
              "--cursor": "grab",
            }}
            whileDrag={{
              "--cursor": "grabbing",
            }}
            transition={{
              type: "tween",
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </WindowsInternalContext.Provider>
  );
};
