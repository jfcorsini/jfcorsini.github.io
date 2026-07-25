import { useEffect, useState } from "react";

/** Clocks show João's local time, not the visitor's — it is his machine. */
const TIME_ZONE = "Europe/Helsinki";

export const timeFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
});

export const dateFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  weekday: "short",
  day: "numeric",
  month: "short",
});

/** "YYYY-MM-DD" for the given instant, as the day reads in Helsinki. */
const isoFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export const helsinkiIsoDate = (date: Date) => isoFormat.format(date);

/**
 * A Date that formats back to `iso` in Helsinki. Noon UTC keeps it on the
 * right side of midnight whatever the offset.
 */
export const dateFromIso = (iso: string) => new Date(`${iso}T12:00:00Z`);

export const useHelsinkiNow = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return now;
};
