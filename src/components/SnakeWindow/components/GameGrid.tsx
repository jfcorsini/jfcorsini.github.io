import classNames from "classnames";
import { GRID_SIZE } from "../consts";
import { useSnakeGameContext } from "../context/SnakeGameContext";
import styles from "../SnakeWindow.module.css";

export const GameGrid = () => {
  const { snake, food } = useSnakeGameContext();

  return (
    <div
      className={styles.grid}
      style={{
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
      }}
    >
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
        const x = idx % GRID_SIZE;
        const y = Math.floor(idx / GRID_SIZE);
        const isSnake = snake.some((seg) => seg.x === x && seg.y === y);
        const isHead = snake[0]?.x === x && snake[0]?.y === y;
        const isFood = food.x === x && food.y === y;

        return (
          <div
            key={idx}
            className={classNames(styles.cell, {
              [styles.snake]: isSnake,
              [styles.head]: isHead,
              [styles.food]: isFood,
            })}
          />
        );
      })}
    </div>
  );
};
