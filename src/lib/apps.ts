import { APP_NAMES, type AppName } from "./appName";
import type { IconName } from "./icons";
import { POSTS } from "./posts";

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
  notes: { label: "Notes", menuTitle: "Notes", iconName: "Notes" },
  snake: { label: "Snake", menuTitle: "Snake", iconName: "Snake" },
};

/**
 * The apps the desktop, dock and phone actually put on screen. Notes is only
 * one of them while there is something to read — an empty reader is worse than
 * no reader.
 */
export const VISIBLE_APPS: readonly AppName[] = APP_NAMES.filter(
  (name) => name !== "notes" || POSTS.length > 0,
);
