import { useApps, useSystemDate } from "../../context/hooks";
import { APP_META } from "../../lib/apps";
import { timeFormat } from "../../lib/useHelsinkiNow";
import { DateControl } from "../DateControl/DateControl";
import styles from "./MenuBar.module.css";
import { ThemeMenu } from "./ThemeMenu";

export const MenuBar = () => {
  const { focused } = useApps();
  const { now } = useSystemDate();

  return (
    <div className={styles.menuBar}>
      <span className={styles.brand}>
        <span className={styles.logo} />
        jfcorsini
      </span>
      <span className={styles.appTitle}>
        {focused ? APP_META[focused].menuTitle : "Finder"}
      </span>
      <span className={styles.spacer} />
      <div className={styles.status}>
        <a
          href="https://github.com/jfcorsini"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/joaocorsini"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <ThemeMenu />
        <span className={styles.date}>
          <DateControl />
        </span>
        <span className={styles.clock}>{timeFormat.format(now)}</span>
      </div>
    </div>
  );
};
