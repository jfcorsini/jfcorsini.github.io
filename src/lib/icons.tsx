import Folder from "../assets/icons/folder.svg?react";
import Globe from "../assets/icons/globe.svg?react";
import LockClosed from "../assets/icons/lock-closed.svg?react";
import LockOpen from "../assets/icons/lock-open.svg?react";

export const icons = {
  Globe,
  Folder,
  LockClosed,
  LockOpen,
};

export type IconName = keyof typeof icons;
