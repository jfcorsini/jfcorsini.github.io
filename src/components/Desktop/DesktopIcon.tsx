import { motion } from "motion/react";
import { useApps } from "../../context/hooks";
import type { AppName } from "../../lib/appName";
import { icons } from "../../lib/icons";
import styles from "./Desktop.module.css";

type Props = {
  appName: AppName;
};

const ICON_MAP: Record<AppName, React.ReactNode> = {
  portfolio: <icons.Globe />,
  projects: <icons.Folder />,
  snake: <icons.Snake />,
};

const NAME_MAP: Record<AppName, string> = {
  portfolio: "About",
  projects: "Projects",
  snake: "Game",
};

export const DesktopIcon = ({ appName }: Props) => {
  const apps = useApps();
  return (
    <motion.div
      className={styles.icon}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => apps.open(appName)}
    >
      {ICON_MAP[appName]}
      <span>{NAME_MAP[appName]}</span>
    </motion.div>
  );
};
