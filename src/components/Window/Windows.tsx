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
  const closeWindow = () => {
    setIsMaximized(false);
    windows.closeWindow(name);
  };

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
          <motion.div
            className={styles.titleBar}
            style={{
              // whileTap didn't work, so this is a workaround
              cursor: "var(--cursor)",
            }}
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
          </motion.div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
