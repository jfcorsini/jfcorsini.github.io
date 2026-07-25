/** First day of the first engineering job. Everything counts forward from here. */
export const CAREER_START = "2016-03-01";

/** Whole months between the career start and `iso`, negative before it began. */
const monthsSinceStart = (iso: string) => {
  const [startYear, startMonth, startDay] = CAREER_START.split("-").map(Number);
  const [year, month, day] = iso.split("-").map(Number);

  const months = (year - startYear) * 12 + (month - startMonth);
  return day < startDay ? months - 1 : months;
};

/**
 * How much experience there is on a given day. Before March 2016 there is
 * none, and for the first year it reads in months — a junior counts them.
 */
export const experienceOn = (iso: string) => {
  const months = monthsSinceStart(iso);

  if (months < 0) return { value: null, unit: null };
  if (months < 12)
    return { value: months, unit: months === 1 ? "month" : "months" };

  const years = Math.floor(months / 12);
  return { value: years, unit: years === 1 ? "year" : "years" };
};
