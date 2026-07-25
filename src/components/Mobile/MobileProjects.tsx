import { motion } from "motion/react";
import { PROJECTS } from "../../lib/projects";
import styles from "./AppScreen.module.css";

/** Live iframes are unreadable on a phone, so projects become tappable cards. */
export const MobileProjects = () => (
  <div className={styles.projects}>
    {PROJECTS.map(({ id, name, url }) => (
      <motion.a
        key={id}
        className={styles.projectCard}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.98 }}
      >
        <span className={styles.projectName}>{name}</span>
        <span className={styles.projectUrl}>{new URL(url).host}</span>
        <span className={styles.projectGo} aria-hidden>
          ↗
        </span>
      </motion.a>
    ))}
  </div>
);
