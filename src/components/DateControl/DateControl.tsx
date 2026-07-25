import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { useSystemDate } from "../../context/hooks";
import { dateFormat, helsinkiIsoDate } from "../../lib/useHelsinkiNow";
import { Calendar } from "./Calendar";
import styles from "./DateControl.module.css";

type Props = {
  /** Which edge the calendar hangs from — the menu bar sits at the right. */
  align?: "left" | "right";
};

/**
 * The date in the chrome, but clickable: it opens a calendar and moves the
 * whole site to whatever day you pick.
 */
export const DateControl = ({ align = "right" }: Props) => {
  const { now, date, today, isOverridden, setToday, reset } = useSystemDate();
  const [open, setOpen] = useState(false);

  return (
    <span
      className={styles.root}
      data-date-control
      data-active={isOverridden || undefined}
    >
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        title="Set the date"
      >
        {isOverridden && <span className={styles.marker} aria-hidden />}
        {dateFormat.format(date)}
        <span className={styles.year}>{today.slice(0, 4)}</span>
      </button>

      {isOverridden && (
        <button
          type="button"
          className={styles.reset}
          onClick={reset}
          title="Back to today"
        >
          ×
        </button>
      )}

      <AnimatePresence>
        {open && (
          <Calendar
            value={today}
            today={helsinkiIsoDate(now)}
            align={align}
            onSelect={(iso) => {
              /* Landing back on the real today is not time travel. */
              if (iso === helsinkiIsoDate(now)) reset();
              else setToday(iso);
              setOpen(false);
            }}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </span>
  );
};
