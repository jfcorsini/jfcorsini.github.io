import { useEffect, useRef } from "react";
import type { Direction } from "../consts";

type UseKeyboardControlsProps = {
  gameOver: boolean;
  onDirectionChange: (direction: Direction) => void;
};

export const useKeyboardControls = ({
  gameOver,
  onDirectionChange,
}: UseKeyboardControlsProps) => {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      if (e.key === " ") {
        e.preventDefault();
        return;
      }

      const directionMap: Record<string, Direction> = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
        w: "UP",
        s: "DOWN",
        a: "LEFT",
        d: "RIGHT",
      };

      const dir = directionMap[e.key];
      if (dir) {
        onDirectionChange(dir);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (gameOver) return;
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (gameOver || !touchStartRef.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const minSwipeDistance = 30;

      // Determine if swipe is more horizontal or vertical
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) > minSwipeDistance) {
          onDirectionChange(deltaX > 0 ? "RIGHT" : "LEFT");
        }
      } else {
        // Vertical swipe
        if (Math.abs(deltaY) > minSwipeDistance) {
          onDirectionChange(deltaY > 0 ? "DOWN" : "UP");
        }
      }

      touchStartRef.current = null;
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [gameOver, onDirectionChange]);
};
