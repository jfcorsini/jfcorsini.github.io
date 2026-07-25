import type { AppName } from "./appName";
import type { IconName } from "./icons";

type AppMeta = {
  /** Shown under the desktop icon and in the dock tooltip. */
  label: string;
  /** Shown in the menu bar while the app is focused. */
  menuTitle: string;
  iconName: IconName;
};

export const APP_META: Record<AppName, AppMeta> = {
  portfolio: { label: "About Me", menuTitle: "About", iconName: "Globe" },
  projects: { label: "Projects", menuTitle: "Projects", iconName: "Folder" },
  snake: { label: "Snake", menuTitle: "Snake", iconName: "Snake" },
};
