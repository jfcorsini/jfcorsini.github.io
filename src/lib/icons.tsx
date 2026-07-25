import Folder from "../assets/icons/folder.svg?react";
import Github from "../assets/icons/github.svg?react";
import Globe from "../assets/icons/globe.svg?react";
import Linkedin from "../assets/icons/linkedin.svg?react";
import LockClosed from "../assets/icons/lock-closed.svg?react";
import LockOpen from "../assets/icons/lock-open.svg?react";
import Snake from "../assets/icons/snake.svg?react";

export const icons = {
  Globe,
  Folder,
  LockClosed,
  LockOpen,
  Snake,
  Github,
  Linkedin,
};

export type IconName = keyof typeof icons;
