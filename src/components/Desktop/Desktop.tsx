import React from "react";
import { APP_NAMES } from "../../lib/appName";
import styles from "./Desktop.module.css";
import { DesktopIcon } from "./DesktopIcon";
import { Particles } from "./Particles";

export const Desktop = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={styles.container}>
      <Particles />
      <div className={styles.iconsContainer}>
        {APP_NAMES.map((appName) => (
          <DesktopIcon key={appName} appName={appName} />
        ))}
      </div>
      {children}
    </div>
  );
};
