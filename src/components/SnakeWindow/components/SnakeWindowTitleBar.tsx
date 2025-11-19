import styles from "../SnakeWindow.module.css";

type SnakeWindowTitleBarProps = {
  score: number;
};

export const SnakeWindowTitleBar = ({ score }: SnakeWindowTitleBarProps) => {
  return (
    <div className={styles.snakeTitleBar}>
      <div className={styles.spacer} />
      <span className={styles.title}>Snake Game</span>
      <span className={styles.score}>Score: {score}</span>
    </div>
  );
};
