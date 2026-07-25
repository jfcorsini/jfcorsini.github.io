import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { useApps } from "../../context/hooks";
import { APP_NAMES } from "../../lib/appName";
import { APP_META } from "../../lib/apps";
import { icons } from "../../lib/icons";
import styles from "./Dock.module.css";

const BASE_SIZE = 46;
const MAX_SIZE = 74;
/** How far from the cursor an icon still grows, in px. */
const INFLUENCE = 130;

type DockItemProps = {
  label: string;
  children: ReactNode;
  isRunning?: boolean;
  mouseX: MotionValue<number>;
  onClick: () => void;
};

const DockItem = ({
  label,
  children,
  isRunning,
  mouseX,
  onClick,
}: DockItemProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Distance from the cursor to this icon's centre drives its size.
  const distance = useTransform(mouseX, (x) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return INFLUENCE;
    return x - (bounds.x + bounds.width / 2);
  });

  const targetSize = useTransform(
    distance,
    [-INFLUENCE, 0, INFLUENCE],
    [BASE_SIZE, MAX_SIZE, BASE_SIZE],
    { clamp: true },
  );

  const size = useSpring(targetSize, {
    stiffness: 320,
    damping: 26,
    mass: 0.15,
  });

  return (
    <motion.button
      ref={ref}
      className={styles.item}
      style={{ width: size, height: size }}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.88 }}
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
  const mouseX = useMotionValue(Infinity);

  return (
    <div className={styles.dockLayer}>
      <motion.div
        className={styles.dock}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
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
              mouseX={mouseX}
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
          mouseX={mouseX}
          onClick={() => window.open("https://github.com/jfcorsini", "_blank")}
        >
          <icons.Github />
        </DockItem>
        <DockItem
          label="LinkedIn"
          mouseX={mouseX}
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
