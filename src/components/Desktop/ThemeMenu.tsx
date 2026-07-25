import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/hooks";
import {
  THEME_PREFERENCES,
  type ThemePreference,
} from "../../context/ThemeContext";
import styles from "./ThemeMenu.module.css";

const LABELS: Record<ThemePreference, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
  sepia: "Sepia",
};

export const ThemeMenu = () => {
  const { preference, resolved, setPreference } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // A menu bar menu closes when you click anywhere else or press Escape.
  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={`Appearance: ${LABELS[preference]}`}
      >
        <span className={styles.swatch} data-resolved={resolved} />
      </button>

      {isOpen && (
        <div className={styles.menu} role="menu">
          {THEME_PREFERENCES.map((option) => (
            <button
              key={option}
              className={styles.option}
              role="menuitemradio"
              aria-checked={preference === option}
              onClick={() => {
                setPreference(option);
                setIsOpen(false);
              }}
            >
              <span className={styles.check}>
                {preference === option ? "✓" : ""}
              </span>
              {LABELS[option]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
