import { motion } from "motion/react";
import React from "react";
import { useApps } from "../../context/hooks";
import styles from "./Windows.module.css";
import { useWindowsInternal } from "./WindowsContext";

export const WindowsTitleBar = ({ children }: React.PropsWithChildren) => {
  const { name, dragControls, isMaximized, setIsMaximized, closeWindow } =
    useWindowsInternal();
  const apps = useApps();

  /** Buttons sit inside the drag handle, so they must not start a drag. */
  const button = (onClick: () => void) => ({
    onPointerDown: (e: React.PointerEvent) => e.stopPropagation(),
    onClick,
  });

  return (
    <motion.div
      className={styles.titleBar}
      style={{
        cursor: "var(--cursor)",
      }}
      onPointerDown={(e) => dragControls.start(e)}
      onDoubleClick={() => setIsMaximized(!isMaximized)}
    >
      <div className={styles.buttons}>
        <div
          {...button(closeWindow)}
          className={styles.close}
          role="button"
          aria-label="Close window"
        />
        <div
          {...button(() => apps.minimize(name))}
          className={styles.hide}
          role="button"
          aria-label="Minimize window"
        />
        <div
          {...button(() => setIsMaximized(!isMaximized))}
          className={styles.resize}
          role="button"
          aria-label={isMaximized ? "Restore window" : "Maximize window"}
        />
      </div>
      {children}
    </motion.div>
  );
};
