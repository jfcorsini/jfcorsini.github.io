import { motion } from "motion/react";
import { APP_NAMES, type AppName } from "../../lib/appName";
import { APP_META } from "../../lib/apps";
import { icons } from "../../lib/icons";
import { dateFormat, useHelsinkiNow } from "../../lib/useHelsinkiNow";
import styles from "./MobileShell.module.css";

type Props = {
  onOpen: (appName: AppName) => void;
};

const enter = (index: number) => ({
  initial: { opacity: 0, y: 14, scale: 0.94 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: {
    delay: 0.15 + index * 0.05,
    ease: [0.16, 1, 0.3, 1] as const,
    duration: 0.45,
  },
});

const LINKS = [
  { label: "GitHub", href: "https://github.com/jfcorsini", icon: icons.Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/joaocorsini",
    icon: icons.Linkedin,
  },
];

export const HomeScreen = ({ onOpen }: Props) => {
  const now = useHelsinkiNow();

  return (
    <div className={styles.home}>
      <motion.header className={styles.hero} {...enter(0)}>
        <p className={styles.heroDate}>{dateFormat.format(now)}</p>
        <h1 className={styles.heroName}>João F. Corsini</h1>
        <p className={styles.heroRole}>
          <span className={styles.pulse} />
          Full stack engineer · Helsinki
        </p>
      </motion.header>

      <div className={styles.grid}>
        {APP_NAMES.map((appName, index) => {
          const { label, iconName } = APP_META[appName];
          const Icon = icons[iconName];

          return (
            <motion.button
              key={appName}
              className={styles.app}
              onClick={() => onOpen(appName)}
              whileTap={{ scale: 0.9 }}
              {...enter(index + 1)}
            >
              <span className={styles.appTile}>
                <Icon />
              </span>
              <span className={styles.appLabel}>{label}</span>
            </motion.button>
          );
        })}

        {LINKS.map(({ label, href, icon: Icon }, index) => (
          <motion.a
            key={label}
            className={styles.app}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.9 }}
            {...enter(APP_NAMES.length + index + 1)}
          >
            <span className={`${styles.appTile} ${styles.appTileLink}`}>
              <Icon />
            </span>
            <span className={styles.appLabel}>{label}</span>
          </motion.a>
        ))}
      </div>

      <motion.p className={styles.hint} {...enter(APP_NAMES.length + 3)}>
        Tap an app. On a laptop this is a whole desktop.
      </motion.p>
    </div>
  );
};
