import { motion, useDragControls, type PanInfo } from "motion/react";
import { useEffect } from "react";
import type { AppName } from "../../lib/appName";
import { APP_META } from "../../lib/apps";
import { PortfolioWindowContent } from "../PortfolioWindow/PortfolioWindowContent";
import styles from "./AppScreen.module.css";
import { MobileProjects } from "./MobileProjects";
import { MobileSnake } from "./MobileSnake";

type Props = {
  appName: AppName;
  onClose: () => void;
};

const CONTENT: Record<AppName, () => React.ReactNode> = {
  portfolio: PortfolioWindowContent,
  projects: MobileProjects,
  snake: MobileSnake,
};

/** Past these, a downward drag reads as "put it away" rather than a scroll. */
const DISMISS_DISTANCE = 110;
const DISMISS_VELOCITY = 600;

export const AppScreen = ({ appName, onClose }: Props) => {
  const Content = CONTENT[appName];
  // Only the title bar starts a drag, so Snake keeps its own swipes.
  const dragControls = useDragControls();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > DISMISS_DISTANCE || info.velocity.y > DISMISS_VELOCITY) {
      onClose();
    }
  };

  return (
    <motion.section
      className={styles.screen}
      initial={{ opacity: 0, scale: 0.92, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 40 }}
      transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.7 }}
      drag="y"
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.5 }}
      onDragEnd={handleDragEnd}
    >
      <header
        className={styles.bar}
        onPointerDown={(e) => dragControls.start(e)}
      >
        <span className={styles.grabber} />
        <h2 className={styles.title}>{APP_META[appName].menuTitle}</h2>
        <button className={styles.close} onClick={onClose} aria-label="Close">
          ✕
        </button>
      </header>

      <div className={styles.body}>
        <Content />
      </div>
    </motion.section>
  );
};
