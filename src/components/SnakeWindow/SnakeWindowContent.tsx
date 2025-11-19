import { GameGrid } from "./components/GameGrid";
import { GameOverlay } from "./components/GameOverlay";
import {
  SnakeGameProvider,
  useSnakeGameContext,
} from "./context/SnakeGameContext";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import styles from "./SnakeWindow.module.css";

type Props = {
  score: number;
  setScore: (score: number | ((prev: number) => number)) => void;
};

const SnakeGame = () => {
  const { gameOver, changeDirection } = useSnakeGameContext();

  useKeyboardControls({
    gameOver,
    onDirectionChange: changeDirection,
  });

  return (
    <div className={styles.container}>
      <GameOverlay />
      <GameGrid />
      <div className={styles.instructions}>
        Use arrow keys or swipe to move the snake. Eat food to earn points!
      </div>
    </div>
  );
};

export const SnakeWindowContent = ({ score, setScore }: Props) => {
  return (
    <SnakeGameProvider score={score} setScore={setScore}>
      <SnakeGame />
    </SnakeGameProvider>
  );
};
