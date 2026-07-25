import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import styles from "./BootScreen.module.css";

/** Short enough that returning visitors are not made to wait on a gimmick. */
const BOOT_DURATION_MS = 1600;

export const BootScreen = () => {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setIsBooting(false), BOOT_DURATION_MS);
    return () => clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          className={styles.boot}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setIsBooting(false)}
        >
          <motion.div
            className={styles.mark}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.dot} />
            jfcorsini
          </motion.div>
          <div className={styles.track}>
            <motion.div
              className={styles.fill}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: BOOT_DURATION_MS / 1000,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
