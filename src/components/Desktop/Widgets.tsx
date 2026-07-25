import { motion } from "motion/react";
import styles from "./Widgets.module.css";

const enter = (delay: number) => ({
  initial: { opacity: 0, y: -12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, ease: [0.16, 1, 0.3, 1] as const },
});

export const InfoCard = () => (
  <motion.div className={styles.card} {...enter(0.45)}>
    <p className={styles.cardLabel}>Experience</p>
    <div className={styles.stat}>
      <span className={styles.statValue}>9</span>
      <span className={styles.statUnit}>years</span>
    </div>
    <p className={styles.statCaption}>
      Full stack engineer, building web applications end to end.
    </p>
    <div className={styles.location}>
      <span className={styles.pulse} />
      Helsinki, Finland
    </div>
  </motion.div>
);

export const StickyNote = () => (
  <motion.div className={styles.note} {...enter(0.6)}>
    <p className={styles.noteTitle}>It's a desktop — poke at it</p>
    <ul className={styles.noteList}>
      <li>Drag windows by their title bar</li>
      <li>
        <kbd>●</kbd> <kbd>●</kbd> <kbd>●</kbd> close, minimize, zoom
      </li>
      <li>The dock brings them back</li>
      <li>Snake takes the arrow keys</li>
    </ul>
  </motion.div>
);
