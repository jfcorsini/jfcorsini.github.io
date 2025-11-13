import React from "react";
import styles from "./Desktop.module.css";
import { Particles } from "./Particles";

export const Desktop = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={styles.container}>
      <Particles />
      {children}
    </div>
  );
};
