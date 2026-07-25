import { motion } from "motion/react";
import { useApps } from "../../context/hooks";
import type { AppName } from "../../lib/appName";
import { APP_META } from "../../lib/apps";
import { icons } from "../../lib/icons";
import styles from "./Desktop.module.css";

type Props = {
  appName: AppName;
  index: number;
};

export const DesktopIcon = ({ appName, index }: Props) => {
  const apps = useApps();
  const { label, iconName } = APP_META[appName];
  const Icon = icons[iconName];

  return (
    <motion.div
      className={styles.icon}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => apps.open(appName)}
    >
      <span className={styles.iconGlyph}>
        <Icon />
      </span>
      <span>{label}</span>
    </motion.div>
  );
};
