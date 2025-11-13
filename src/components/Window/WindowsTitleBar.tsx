import { motion } from "motion/react";
import React from "react";
import { useApps } from "../../context/hooks";
import styles from "./Windows.module.css";
import { useWindowsInternal } from "./WindowsContext";

export const WindowsTitleBar = ({ children }: React.PropsWithChildren) => {
  const { name, dragControls, isMaximized, setIsMaximized, closeWindow } =
    useWindowsInternal();
  const apps = useApps();

  return (
    <motion.div
      className={styles.titleBar}
      style={{
        cursor: "var(--cursor)",
      }}
      onPointerDown={(e) => dragControls.start(e)}
    >
      <div className={styles.buttons}>
        <div onClick={closeWindow} className={styles.close} />
        <div onClick={() => apps.minimize(name)} className={styles.hide} />
        <div
          onClick={() => setIsMaximized(!isMaximized)}
          className={styles.resize}
        />
      </div>
      {children}
    </motion.div>
  );
};
