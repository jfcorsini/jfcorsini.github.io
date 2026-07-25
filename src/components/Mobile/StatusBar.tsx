import { timeFormat, useHelsinkiNow } from "../../lib/useHelsinkiNow";
import styles from "./MobileShell.module.css";

/** Phone status bar: the clock is real, the signal bars are set dressing. */
export const StatusBar = () => {
  const now = useHelsinkiNow();

  return (
    <div className={styles.statusBar}>
      <span>{timeFormat.format(now)}</span>
      <span className={styles.statusIcons} aria-hidden>
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 11.2 5.6 8.6a3.4 3.4 0 0 1 4.8 0L8 11.2ZM3.5 6.4a6.6 6.6 0 0 1 9 0l-1.3 1.4a4.7 4.7 0 0 0-6.4 0L3.5 6.4ZM1.2 4.1a9.9 9.9 0 0 1 13.6 0l-1.3 1.4a8 8 0 0 0-11 0L1.2 4.1Z" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="21"
            height="11"
            rx="3.2"
            stroke="currentColor"
            strokeOpacity="0.5"
          />
          <rect
            x="2"
            y="2"
            width="16"
            height="8"
            rx="2"
            fill="var(--accent)"
          />
          <path
            d="M23 4v4a2.1 2.1 0 0 0 0-4Z"
            fill="currentColor"
            fillOpacity="0.5"
          />
        </svg>
      </span>
    </div>
  );
};
