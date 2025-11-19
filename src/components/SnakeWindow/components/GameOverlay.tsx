import { useSnakeGameContext } from "../context/SnakeGameContext";
import styles from "../SnakeWindow.module.css";

export const GameOverlay = () => {
  const { gameOver, score, resetGame } = useSnakeGameContext();

  if (!gameOver) return null;

  return (
    <div className={styles.gameOver}>
      <h2>Game Over!</h2>
      <p>Final Score: {score}</p>
      <button onClick={resetGame}>Play Again</button>
    </div>
  );
};
