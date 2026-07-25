/**
 * Things that happen on a given day. `on` is either "MM-DD" (every year) or a
 * full "YYYY-MM-DD" (that one day only). Add entries here — the widgets pick
 * them up wherever the system date lands.
 */
export type DateEntry = {
  id: string;
  on: string;
  label: string;
  title: string;
  body: string;
};

export const BIRTH_DATE = "1993-09-08";

export const DATE_ENTRIES: DateEntry[] = [
  {
    id: "birthday",
    on: BIRTH_DATE.slice(5),
    label: "Today",
    title: "It's João's birthday",
    body: `Born in Brazil on ${BIRTH_DATE.slice(8)} September 1993. A great day to reach out with a birthday wish!`,
  },
];

/** @param iso a full "YYYY-MM-DD" date. */
export const entriesForDate = (iso: string): DateEntry[] =>
  DATE_ENTRIES.filter((entry) => entry.on === iso || entry.on === iso.slice(5));
