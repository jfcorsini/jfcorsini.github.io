import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import styles from "./Calendar.module.css";

type Props = {
  /** Currently selected day, "YYYY-MM-DD". */
  value: string;
  /** The real today, marked on the grid so it stays findable. */
  today: string;
  align: "left" | "right";
  onSelect: (iso: string) => void;
  onClose: () => void;
};

/** Weeks start on Monday here — both of João's countries agree on that. */
const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const monthFormat = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const pad = (value: number) => String(value).padStart(2, "0");
const toIso = (year: number, month: number, day: number) =>
  `${year}-${pad(month + 1)}-${pad(day)}`;

/** Monday-based weekday index of the first of the month. */
const firstWeekday = (year: number, month: number) =>
  (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;

const daysInMonth = (year: number, month: number) =>
  new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

export const Calendar = ({ value, today, align, onSelect, onClose }: Props) => {
  const [year, month] = value.split("-").map(Number);
  const [cursor, setCursor] = useState({ year, month: month - 1 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      /* The trigger closes the calendar itself — closing here too would let it
         reopen on the click that follows. */
      if (
        ref.current?.contains(target) ||
        target.closest("[data-date-control]")
      )
        return;
      onClose();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const step = (years: number, months: number) =>
    setCursor((current) => {
      const shifted = new Date(
        Date.UTC(current.year + years, current.month + months, 1),
      );
      return { year: shifted.getUTCFullYear(), month: shifted.getUTCMonth() };
    });

  const total = daysInMonth(cursor.year, cursor.month);
  const blanks = firstWeekday(cursor.year, cursor.month);

  return (
    <motion.div
      ref={ref}
      className={styles.popover}
      data-align={align}
      initial={{ opacity: 0, y: -6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.97 }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
    >
      <header className={styles.header}>
        <button
          type="button"
          className={styles.nav}
          onClick={() => step(-1, 0)}
          aria-label="Previous year"
        >
          «
        </button>
        <button
          type="button"
          className={styles.nav}
          onClick={() => step(0, -1)}
          aria-label="Previous month"
        >
          ‹
        </button>
        <span className={styles.month}>
          {monthFormat.format(new Date(Date.UTC(cursor.year, cursor.month, 1)))}
        </span>
        <button
          type="button"
          className={styles.nav}
          onClick={() => step(0, 1)}
          aria-label="Next month"
        >
          ›
        </button>
        <button
          type="button"
          className={styles.nav}
          onClick={() => step(1, 0)}
          aria-label="Next year"
        >
          »
        </button>
      </header>

      <div className={styles.weekdays} aria-hidden>
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className={styles.grid}>
        {Array.from({ length: blanks }, (_, index) => (
          <span key={`blank-${index}`} />
        ))}
        {Array.from({ length: total }, (_, index) => {
          const iso = toIso(cursor.year, cursor.month, index + 1);

          return (
            <button
              key={iso}
              type="button"
              className={styles.day}
              data-selected={iso === value || undefined}
              data-today={iso === today || undefined}
              onClick={() => onSelect(iso)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <footer className={styles.footer}>
        <button
          type="button"
          className={styles.shortcut}
          onClick={() => onSelect(today)}
        >
          Today
        </button>
      </footer>
    </motion.div>
  );
};
