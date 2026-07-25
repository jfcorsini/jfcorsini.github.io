import { useCallback, useMemo, useState, type ReactNode } from "react";
import {
  dateFromIso,
  helsinkiIsoDate,
  useHelsinkiNow,
} from "../lib/useHelsinkiNow";
import { SystemDateContext } from "./SystemDateContext";

/**
 * Lets a visitor set the machine's date, the way you would on a real one.
 * Deliberately not persisted: a reload puts the clock back where it belongs.
 */
export const SystemDateProvider = ({ children }: { children: ReactNode }) => {
  const now = useHelsinkiNow();
  const [override, setOverride] = useState<string | null>(null);

  const reset = useCallback(() => setOverride(null), []);

  const value = useMemo(() => {
    const today = override ?? helsinkiIsoDate(now);

    return {
      now,
      today,
      date: override ? dateFromIso(override) : now,
      isOverridden: override !== null,
      setToday: setOverride,
      reset,
    };
  }, [now, override, reset]);

  return (
    <SystemDateContext.Provider value={value}>
      {children}
    </SystemDateContext.Provider>
  );
};
