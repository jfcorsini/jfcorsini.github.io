import { motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { useApps } from "../../context/hooks";
import { APP_NAMES } from "../../lib/appName";
import { APP_META } from "../../lib/apps";
import { icons } from "../../lib/icons";
import styles from "./Dock.module.css";

const ICON_SIZE = 46;

type DockItemProps = {
  label: string;
  children: ReactNode;
  isRunning?: boolean;
  onClick: () => void;
};

const DockItem = ({ label, children, isRunning, onClick }: DockItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={styles.item}
      style={{ width: ICON_SIZE, height: ICON_SIZE }}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      // Scale and lift are transforms, so the dock's own width never changes
      // and neighbouring icons stay put.
      whileHover={{ scale: 1.12, y: -5 }}
      whileTap={{ scale: 0.94, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.5 }}
      aria-label={label}
    >
      {isHovered && <span className={styles.tooltip}>{label}</span>}
      <span className={styles.tile}>{children}</span>
      {isRunning && <span className={styles.runDot} />}
    </motion.button>
  );
};

export const Dock = () => {
  const apps = useApps();

  return (
    <div className={styles.dockLayer}>
      <motion.div
        className={styles.dock}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35, type: "spring", stiffness: 180, damping: 22 }}
      >
        {APP_NAMES.map((appName) => {
          const { label, iconName } = APP_META[appName];
          const Icon = icons[iconName];
          const isRunning = !apps.closed.includes(appName);
          const isVisible = isRunning && !apps.minimized.includes(appName);

          return (
            <DockItem
              key={appName}
              label={label}
              isRunning={isRunning}
              onClick={() => {
                // Clicking the frontmost window tucks it away, like a real dock.
                if (isVisible && apps.focused === appName) {
                  apps.minimize(appName);
                } else {
                  apps.open(appName);
                }
              }}
            >
              <Icon />
            </DockItem>
          );
        })}

        <span className={styles.separator} />

        <DockItem
          label="GitHub"
          onClick={() => window.open("https://github.com/jfcorsini", "_blank")}
        >
          <icons.Github />
        </DockItem>
        <DockItem
          label="LinkedIn"
          onClick={() =>
            window.open("https://www.linkedin.com/in/joaocorsini", "_blank")
          }
        >
          <icons.Linkedin />
        </DockItem>
      </motion.div>
    </div>
  );
};
