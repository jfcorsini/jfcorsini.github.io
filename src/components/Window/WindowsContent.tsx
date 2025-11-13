import React from "react";
import styles from "./Windows.module.css";

export const WindowsContent = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.content}>{children}</div>;
};
