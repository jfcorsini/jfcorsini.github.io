import {
  AnimatePresence,
  motion,
  useDragControls,
  useMotionValue,
} from "motion/react";
import React, { useState } from "react";
import { useApps } from "../../context/hooks";
import { APP_NAMES, type AppName } from "../../lib/appName";
import { CASCADE_STEP } from "../../lib/layout";
import styles from "./Windows.module.css";
import { WindowsInternalContext } from "./WindowsContext";

type WindowsRootProps = React.PropsWithChildren<{
  name: AppName;
  width?: string;
  height?: string;
}>;

export const WindowsRoot = ({
  children,
  name,
  width,
  height,
}: WindowsRootProps) => {
  const dragControls = useDragControls();
  const [isMaximized, setIsMaximized] = useState(false);

  // Drag offset from the CSS resting position. Owned by Motion alone: keeping it
  // out of `animate` is what stops a re-render from snapping the window back.
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const apps = useApps();
  const isOpen = !apps.closed.includes(name) && !apps.minimized.includes(name);
  const isFocused = apps.focused === name;

  /** Maximising is relative to the viewport, so any drag offset must go. */
  const maximize = (value: boolean) => {
    x.set(0);
    y.set(0);
    setIsMaximized(value);
  };

  const closeWindow = () => {
    maximize(false);
    apps.close(name);
  };

  // Stagger resting positions so stacked windows stay individually reachable.
  const cascade = APP_NAMES.indexOf(name) * CASCADE_STEP;

  return (
    <WindowsInternalContext.Provider
      value={{
        name,
        dragControls,
        isMaximized,
        setIsMaximized: maximize,
        closeWindow,
        isFocused,
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={name}
            drag={!isMaximized}
            dragControls={dragControls}
            dragMomentum={false}
            dragListener={false}
            onPointerDown={() => apps.focus(name)}
            className={`${styles.container} ${
              isMaximized ? styles.maximized : ""
            } ${isFocused ? "" : styles.unfocused}`}
            style={{
              x,
              y,
              zIndex: apps.zIndexOf(name),
              width: isMaximized ? undefined : width,
              height: isMaximized ? undefined : height,
              // Custom properties are valid CSS but absent from MotionStyle.
              ["--cascade" as string]: `${cascade}px`,
            }}
            exit={{ opacity: 0, scale: 0.96 }}
            initial={{
              opacity: 0,
              scale: 0.94,
              "--cursor": "grab",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              "--cursor": "grab",
            }}
            whileDrag={{
              "--cursor": "grabbing",
            }}
            transition={{
              type: "tween",
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </WindowsInternalContext.Provider>
  );
};
