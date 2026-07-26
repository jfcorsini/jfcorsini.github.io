import React from "react";
import { useApps } from "../../context/hooks";
import { VISIBLE_APPS } from "../../lib/apps";
import { DateEntryCard } from "../DateEntry/DateEntryCard";
import { Capivara } from "./Capivara";
import styles from "./Desktop.module.css";
import { DesktopIcon } from "./DesktopIcon";
import { Dock } from "./Dock";
import { MenuBar } from "./MenuBar";
import { Wallpaper } from "./Wallpaper";
import { InfoCard, StickyNote } from "./Widgets";

export const Desktop = ({ children }: React.PropsWithChildren) => {
  const { hasExplored } = useApps();

  return (
    <div className={styles.container}>
      <Wallpaper />
      <MenuBar />

      <div className={styles.iconsContainer}>
        {VISIBLE_APPS.map((appName, index) => (
          <DesktopIcon key={appName} appName={appName} index={index} />
        ))}
      </div>

      <div className={styles.widgets}>
        <DateEntryCard />
        <InfoCard />
        <StickyNote />
      </div>

      {children}

      {/* She waits until someone has opened a window of their own accord. A
          first look at the desktop is a résumé; she is for the second look. */}
      {hasExplored && <Capivara />}
      <Dock />
    </div>
  );
};
