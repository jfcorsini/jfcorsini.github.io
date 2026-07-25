import { AnimatePresence } from "motion/react";
import { useState } from "react";
import type { AppName } from "../../lib/appName";
import { Wallpaper } from "../Desktop/Wallpaper";
import { AppScreen } from "./AppScreen";
import { HomeScreen } from "./HomeScreen";
import styles from "./MobileShell.module.css";
import { StatusBar } from "./StatusBar";

/**
 * The phone counterpart to the desktop: one app fills the screen at a time,
 * so there is nothing to drag, stack or resize.
 */
export const MobileShell = () => {
  const [openApp, setOpenApp] = useState<AppName | null>(null);

  return (
    <div className={styles.phone}>
      <Wallpaper />
      <StatusBar />
      <HomeScreen onOpen={setOpenApp} />

      <AnimatePresence>
        {openApp && (
          <AppScreen appName={openApp} onClose={() => setOpenApp(null)} />
        )}
      </AnimatePresence>

      <button
        className={styles.homeIndicator}
        onClick={() => setOpenApp(null)}
        aria-label="Home"
      />
    </div>
  );
};
