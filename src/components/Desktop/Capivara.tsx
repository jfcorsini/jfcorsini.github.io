import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useApps, useSystemDate } from "../../context/hooks";
import styles from "./Capivara.module.css";

/**
 * A capybara sitting in three-quarter view, flat-coloured with no outline.
 * Proportions are traced off the reference: the head clears the back by only a
 * little, so the neck is a shallow dip rather than a step. Head and body are
 * one path for that reason — two overlapping blobs always read as a join.
 */
const CapivaraGlyph = () => (
  <svg viewBox="40 10 370 428" aria-hidden="true">
    {/* Ears sit behind the skull so only their top half reads. */}
    <g className={styles.dark}>
      <ellipse
        cx="134"
        cy="44"
        rx="20"
        ry="24"
        transform="rotate(-14 134 44)"
      />
      <ellipse cx="240" cy="52" rx="26" ry="27" transform="rotate(22 240 52)" />
    </g>
    <path className={styles.crease} d="M248 32c-8 10-10 20-8 30" />

    {/*
     * Traced clockwise from the cheek: over the skull, through the neck dip,
     * along the back, round the rump and up the belly into the jaw.
     */}
    <path
      className={styles.body}
      d="M60 150C56 112 78 68 114 50C142 36 176 34 200 44C228 54 252 76 264 104C266 122 284 142 300 162C324 188 350 210 370 240C388 266 399 296 399 326C400 358 390 386 360 398C332 409 240 411 176 405C136 401 112 396 110 360C108 300 108 240 110 198C86 190 66 178 60 150Z"
    />

    {/* Muzzle: the head's own left cap, traced and darkened. */}
    <path
      className={styles.dark}
      d="M112 96C84 90 55 116 55 145c0 24 12 46 40 53 13-2 21-20 23-48 1-24 0-42-6-54Z"
    />

    {/* Legs read as separate darker masses tucked under the body. The two front
        legs swing from the shoulder while she walks; the rear foot is planted. */}
    <g className={styles.dark}>
      <path
        className={styles.legFront}
        d="M117 350c0 20-4 34-15 42-11 8-6 18 7 18h42c11 0 15-8 8-16-9-10-12-24-12-44Z"
      />
      <path
        className={styles.legBack}
        d="M186 360h44c0 24-2 38 3 47 5 9 0 15-11 15h-44c-10 0-13-7-6-15 10-10 14-23 14-47Z"
      />
      <path d="M262 388c26-8 52-2 70 10 12 8 8 18-12 21-24 3-44 4-58 3-22-2-22-32 0-34Z" />
    </g>

    {/* Fur ticks and face lines — all one lighter brown, stroke only. */}
    <g className={styles.crease}>
      <path d="M118 190c32 16 72 10 106-10 12-7 20-12 26-18" strokeWidth="8" />
      <path d="M255 133c6 8 9 16 11 25M314 218c4 6 7 12 9 18M338 232c8 8 14 14 18 20" />
      <path d="M126 244c2 12 2 22 1 34M145 280c2 8 2 14 1 20M172 280c2 8 2 14 1 20M178 314c4 16 6 32 8 48M126 304c6 16 12 30 20 44M240 315c2 15 2 30 1 45" />
      <path d="M296 278c-32 14-42 34-32 96" strokeWidth="8" />
    </g>

    {/* Nose, mouth and toes are cut into the dark areas, so they go darker. */}
    <g className={styles.toe}>
      <path d="M64 120c5 8 7 16 8 25M102 119c-2 6-3 11-2 17" />
      <path d="M80 146v32c0 12 10 18 24 15" />
      <path d="M118 400v10M132 400v10M146 399v10" />
      <path d="M180 411v9M198 411v9M215 410v9" />
      <path d="M259 408v9M276 410v9M295 410v8" />
    </g>

    <g className={styles.eyes}>
      <circle cx="189" cy="98" r="11" className={styles.eye} />
    </g>
  </svg>
);

/**
 * She is quiet by default. A line only appears when you poke her, and it goes
 * away on its own — nothing here is important enough to sit on screen.
 */
const LINES = [
  "This is a capybara. She is quiet by default.",
  "João is a Brazilian living in Finland.",
  "The menu bar date is editable.",
  "You can check what's shipped in Projects.",
];

const HIDE_AFTER = 3400;

export const Capivara = () => {
  const [line, setLine] = useState<{ id: number; text: string } | null>(null);
  const nextIndex = useRef(0);
  const { date, today } = useSystemDate();
  const { focused } = useApps();

  const say = useCallback((text: string) => {
    setLine({ id: Date.now(), text });
  }, []);

  /* One timer, restarted by whatever spoke last. */
  useEffect(() => {
    if (!line) return;
    const timer = window.setTimeout(() => setLine(null), HIDE_AFTER);
    return () => window.clearTimeout(timer);
  }, [line]);

  /* She reacts to the two things worth reacting to, then shuts up again. */
  const isTimeTravelling = today !== new Date().toISOString().slice(0, 10);
  const year = date.getFullYear();
  useEffect(() => {
    if (isTimeTravelling) say(`${year}. I was here then too.`);
  }, [isTimeTravelling, year, say]);

  useEffect(() => {
    if (focused === "snake") say("Arrow keys. No high score.");
  }, [focused, say]);

  return (
    <motion.div
      className={styles.assistant}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
    >
      {/* She strolls; the bubble is towed along so the tail keeps pointing at
          her. Hovering anywhere on the pair stops her — see the CSS. */}
      <div className={styles.walker}>
        {/* The whole animal is the button — clicking her is the obvious move. */}
        <motion.button
          type="button"
          className={styles.character}
          onClick={() => {
            say(LINES[nextIndex.current % LINES.length]);
            nextIndex.current += 1;
          }}
          aria-label="Poke the capybara"
          whileTap={{ scale: 0.97 }}
        >
          {/* Nested transforms so they never fight: bob, then facing. */}
          <span className={styles.bob}>
            <span className={styles.facing}>
              <CapivaraGlyph />
            </span>
          </span>
        </motion.button>

        <AnimatePresence mode="wait">
          {line && (
            <motion.p
              key={line.id}
              className={styles.bubble}
              initial={{ opacity: 0, scale: 0.94, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18 }}
            >
              {line.text}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
