import type { SVGProps } from "react";
import { icons, type IconName } from "../../lib/icons";
import styles from "./Windows.module.css";

type Props = {
  url: string;
  iconName: IconName;
} & SVGProps<SVGSVGElement>;

export const WindowUrlTitleBar = ({ url, iconName, ...svgProps }: Props) => {
  const Icon = icons[iconName];
  return (
    <div className={styles.addressBar}>
      <Icon width={14} height={14} color="#27c93f" {...svgProps} />
      <span>{url}</span>
    </div>
  );
};
