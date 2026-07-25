import React from "react";
import { APP_NAMES } from "../../lib/appName";
import { DateEntryCard } from "../DateEntry/DateEntryCard";
import styles from "./Desktop.module.css";
import { DesktopIcon } from "./DesktopIcon";
import { Dock } from "./Dock";
import { MenuBar } from "./MenuBar";
import { Wallpaper } from "./Wallpaper";
import { InfoCard, StickyNote } from "./Widgets";

export const Desktop = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={styles.container}>
      <Wallpaper />
      <MenuBar />

      <div className={styles.iconsContainer}>
        {APP_NAMES.map((appName, index) => (
          <DesktopIcon key={appName} appName={appName} index={index} />
        ))}
      </div>

      <div className={styles.widgets}>
        <DateEntryCard />
        <InfoCard />
        <StickyNote />
      </div>

      {children}

      <Dock />
    </div>
  );
};
