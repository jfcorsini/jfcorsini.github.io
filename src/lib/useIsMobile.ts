import { useSyncExternalStore } from "react";

/** Phones get the mobile shell; tablets keep the desktop, they have room for windows. */
const QUERY = "(max-width: 767px)";

const subscribe = (onChange: () => void) => {
  const list = window.matchMedia(QUERY);
  list.addEventListener("change", onChange);
  return () => list.removeEventListener("change", onChange);
};

export const useIsMobile = () =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
