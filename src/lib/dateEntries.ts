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

/**
 * Kept to fixed dates on purpose — Easter, Carnival and Juhannus move around
 * the year, and chasing them would cost more than the widget is worth.
 */
export const DATE_ENTRIES: DateEntry[] = [
  {
    id: "new-year",
    on: "01-01",
    label: "Everywhere",
    title: "New Year's Day",
    body: "Helsinki spends it indoors, Rio spends it on the beach in white. Same fireworks, 25°C apart.",
  },
  {
    id: "runeberg",
    on: "02-05",
    label: "Finland",
    title: "Runeberg Day",
    body: "The national poet gets a cake named after him: almond, rum, raspberry jam on top. Finland celebrates poetry with pastry.",
  },
  {
    id: "career-start",
    on: "03-01",
    label: "Anniversary",
    title: "The career started here",
    body: "First day of the first engineering job, 1 March 2016. The experience counter on the desktop counts from this date.",
  },
  {
    id: "vappu",
    on: "05-01",
    label: "Finland",
    title: "Vappu",
    body: "May Day, Finnish edition: student overalls, white caps, sparkling wine and sima. The one day the whole country is loud.",
  },
  {
    id: "namorados",
    on: "06-12",
    label: "Brazil",
    title: "Dia dos Namorados",
    body: "Brazil's Valentine's Day, held in June because February is busy with Carnival.",
  },
  {
    id: "brazil-independence",
    on: "09-07",
    label: "Brazil",
    title: "Independência do Brasil",
    body: "Independence, 1822. Also the day before someone's birthday — keep scrolling one square right.",
  },
  {
    id: "birthday",
    on: BIRTH_DATE.slice(5),
    label: "Today",
    title: "It's João's birthday",
    body: `Born in Brazil on ${BIRTH_DATE.slice(8)} September 1993. A great day to reach out with a birthday wish!`,
  },
  {
    id: "finland-independence",
    on: "12-06",
    label: "Finland",
    title: "Itsenäisyyspäivä",
    body: "Independence, 1917. Two candles in the window, and the whole country watches the presidential ball on TV.",
  },
  {
    id: "christmas-eve",
    on: "12-24",
    label: "Finland",
    title: "Jouluaatto",
    body: "Christmas Eve is the actual Christmas here — ham, sauna, and Santa knocking at the door in person. He is a local.",
  },
  {
    id: "christmas",
    on: "12-25",
    label: "Everywhere",
    title: "Christmas Day",
    body: "In Brazil it arrives at midnight, in 30°C heat, with panetone. Both versions work.",
  },
  {
    id: "new-year-eve",
    on: "12-31",
    label: "Everywhere",
    title: "New Year's Eve",
    body: "Twelve grapes, seven waves, or just a quiet sauna. Whatever the year needs.",
  },
];

/** @param iso a full "YYYY-MM-DD" date. */
export const entriesForDate = (iso: string): DateEntry[] =>
  DATE_ENTRIES.filter((entry) => entry.on === iso || entry.on === iso.slice(5));
