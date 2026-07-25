import { createContext } from "react";

type SystemDateContextType = {
  /** Live clock. The time of day is always real, even while time travelling. */
  now: Date;
  /** The active calendar day as "YYYY-MM-DD" — today unless the visitor picked another. */
  today: string;
  /** The active day as a Date, safe to hand to the Helsinki formatters. */
  date: Date;
  isOverridden: boolean;
  setToday: (iso: string) => void;
  reset: () => void;
};

export const SystemDateContext = createContext<
  SystemDateContextType | undefined
>(undefined);
