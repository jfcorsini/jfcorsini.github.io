import { motion } from "motion/react";
import { useSystemDate } from "../../context/hooks";
import { dateFormat } from "../../lib/useHelsinkiNow";
import styles from "./Void.module.css";

/** What the site looks like on any date before João exists. */
export const Void = () => {
  const { date, today, reset } = useSystemDate();

  return (
    <motion.div
      className={styles.void}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <p className={styles.date}>
        {dateFormat.format(date)} {today.slice(0, 4)}
      </p>
      <h1 className={styles.line}>
        There is no one here before September 8th 1993.
      </h1>
      <button type="button" className={styles.back} onClick={reset}>
        Return to the present
      </button>
    </motion.div>
  );
};
