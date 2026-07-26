import { motion } from "motion/react";
import styles from "./Wallpaper.module.css";

const TOTAL_PARTICLES = 40;

const easeOptions = ["easeIn", "easeOut", "linear"] as const;

// Scattered once at module load rather than during render: the field is purely
// decorative, and re-rolling it on a re-render would make particles jump.
const particles = Array.from({ length: TOTAL_PARTICLES }).map((_, index) => ({
  id: `particle-${index}`,
  position: Math.random() * 100,
  delay: Math.random() * 10,
  size: 1 + Math.random() * 3,
  duration: Math.random() * 15 + 15,
  drift: (Math.random() - 0.5) * 30,
  initialOpacity: 0.2 + Math.random() * 0.5,
  finalOpacity: Math.random() * 0.2,
  blur: Math.random() > 0.7 ? 1.5 : 0,
  repeatDelay: Math.random() * 2,
  ease: easeOptions[Math.floor(Math.random() * easeOptions.length)],
}));

export const Particles = () => {
  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={styles.particle}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.position}%`,
            filter: particle.blur ? `blur(${particle.blur}px)` : undefined,
          }}
          initial={{
            top: "105%",
            opacity: particle.initialOpacity,
            x: 0,
          }}
          animate={{
            top: "-20%",
            opacity: particle.finalOpacity,
            x: particle.drift,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatDelay: particle.repeatDelay,
            ease: particle.ease,
          }}
        />
      ))}
    </>
  );
};
