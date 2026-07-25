import { AnimatePresence, motion } from "motion/react";
import { useSystemDate } from "../../context/hooks";
import { entriesForDate } from "../../lib/dateEntries";
import styles from "./DateEntryCard.module.css";

/** Whatever the calendar has to say about the day the site is currently on. */
export const DateEntryCard = () => {
  const { today } = useSystemDate();
  const entries = entriesForDate(today);

  return (
    <AnimatePresence>
      {entries.map((entry) => (
        <motion.aside
          key={entry.id}
          className={styles.card}
          initial={{ opacity: 0, y: -10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.45 }}
        >
          <p className={styles.label}>{entry.label}</p>
          <h3 className={styles.title}>{entry.title}</h3>
          <p className={styles.body}>{entry.body}</p>
        </motion.aside>
      ))}
    </AnimatePresence>
  );
};
