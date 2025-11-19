import { createContext, useContext, type ReactNode } from "react";
import type { Direction, Position } from "../consts";
import { useSnakeGame } from "../hooks/useSnakeGame";

type SnakeGameContextType = {
  snake: Position[];
  food: Position;
  gameOver: boolean;
  score: number;
  resetGame: () => void;
  changeDirection: (direction: Direction) => void;
};

const SnakeGameContext = createContext<SnakeGameContextType | undefined>(
  undefined,
);

type SnakeGameProviderProps = {
  children: ReactNode;
  score: number;
  setScore: (score: number | ((prev: number) => number)) => void;
};

export const SnakeGameProvider = ({
  children,
  score,
  setScore,
}: SnakeGameProviderProps) => {
  const gameState = useSnakeGame({ setScore });

  return (
    <SnakeGameContext.Provider value={{ ...gameState, score }}>
      {children}
    </SnakeGameContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSnakeGameContext = () => {
  const context = useContext(SnakeGameContext);
  if (!context) {
    throw new Error(
      "useSnakeGameContext must be used within SnakeGameProvider",
    );
  }
  return context;
};
