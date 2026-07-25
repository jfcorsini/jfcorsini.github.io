import { Particles } from "./Particles";
import styles from "./Wallpaper.module.css";

export const Wallpaper = () => (
  <div className={styles.wallpaper}>
    <div className={`${styles.aurora} ${styles.auroraOne}`} />
    <div className={`${styles.aurora} ${styles.auroraTwo}`} />
    <div className={`${styles.aurora} ${styles.auroraThree}`} />
    <Particles />
    <div className={styles.vignette} />
    <div className={styles.grain} />
  </div>
);
