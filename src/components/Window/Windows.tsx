import { AnimatePresence, motion, useDragControls } from "motion/react";
import React, { useState } from "react";
import { useWindows } from "../../context/hooks";
import type { AppName } from "../../lib/appName";
import styles from "./Windows.module.css";

type Props = React.PropsWithChildren<{
  name: AppName;
  titleBar?: React.ReactNode;
}>;

export const Windows = ({ children, titleBar, name }: Props) => {
  const dragControls = useDragControls();
  const [isMaximized, setIsMaximized] = useState(false);

  const windows = useWindows();
  const isOpen =
    !windows.closed.includes(name) && !windows.minimized.includes(name);
  const closeWindow = () => windows.closeWindow(name);

  return (
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
          initial={false}
          animate={{
            x: isMaximized ? 0 : "-50%",
            y: isMaximized ? 0 : "-50%",
            left: isMaximized ? 0 : "50%",
            top: isMaximized ? 0 : "50%",
            width: isMaximized ? "100vw" : "900px",
            height: isMaximized ? "100vh" : "600px",
            borderRadius: isMaximized ? 0 : "var(--border-radius)",
          }}
          transition={{
            type: "spring",
            damping: 50,
            stiffness: 600,
            mass: 2,
          }}
        >
          <div
            className={styles.titleBar}
            onPointerDown={(e) => dragControls.start(e)}
          >
            <div className={styles.buttons}>
              <div onClick={closeWindow} className={styles.close} />
              <div
                onClick={() => windows.minimizeWindow(name)}
                className={styles.hide}
              />
              <div
                onClick={() => setIsMaximized(!isMaximized)}
                className={styles.resize}
              />
            </div>
            {titleBar}
          </div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
