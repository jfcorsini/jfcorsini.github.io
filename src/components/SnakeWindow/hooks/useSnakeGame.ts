import { useCallback, useEffect, useRef, useState } from "react";
import {
  GAME_SPEED,
  GRID_SIZE,
  INITIAL_DIRECTION,
  INITIAL_SNAKE,
  type Direction,
  type Position,
} from "../consts";

type UseSnakeGameProps = {
  setScore: (score: number | ((prev: number) => number)) => void;
};

export const useSnakeGame = ({ setScore }: UseSnakeGameProps) => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const directionRef = useRef(direction);
  const gameStateRef = useRef({ gameOver: false });
  const snakeRef = useRef(INITIAL_SNAKE);
  const foodRef = useRef<Position>({ x: 15, y: 15 });
  const lastUpdateTimeRef = useRef(0);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const hasStartedRef = useRef(false);

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      currentSnake.some((seg) => seg.x === newFood.x && seg.y === newFood.y)
    );
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    snakeRef.current = INITIAL_SNAKE;
    const newFood = generateFood(INITIAL_SNAKE);
    setFood(newFood);
    foodRef.current = newFood;
    setGameOver(false);
    setScore(0);
    setHasStarted(false);
    gameStateRef.current = { gameOver: false };
    hasStartedRef.current = false;
    lastUpdateTimeRef.current = 0;
  }, [generateFood, setScore]);

  const moveSnake = useCallback(() => {
    const head = snakeRef.current[0];
    let newHead: Position;

    switch (directionRef.current) {
      case "UP":
        newHead = { x: head.x, y: head.y - 1 };
        break;
      case "DOWN":
        newHead = { x: head.x, y: head.y + 1 };
        break;
      case "LEFT":
        newHead = { x: head.x - 1, y: head.y };
        break;
      case "RIGHT":
        newHead = { x: head.x + 1, y: head.y };
        break;
    }

    // Check wall collision
    if (
      newHead.x < 0 ||
      newHead.x >= GRID_SIZE ||
      newHead.y < 0 ||
      newHead.y >= GRID_SIZE
    ) {
      setGameOver(true);
      gameStateRef.current.gameOver = true;
      return;
    }

    // Check self collision
    if (
      snakeRef.current.some((seg) => seg.x === newHead.x && seg.y === newHead.y)
    ) {
      setGameOver(true);
      gameStateRef.current.gameOver = true;
      return;
    }

    const newSnake = [newHead, ...snakeRef.current];

    // Check food collision
    if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
      setScore((s) => s + 10);
      const newFood = generateFood(newSnake);
      setFood(newFood);
      foodRef.current = newFood;
    } else {
      newSnake.pop();
    }

    snakeRef.current = newSnake;
    setSnake(newSnake);
  }, [generateFood, setScore]);

  const changeDirection = useCallback((newDir: Direction) => {
    const opposites: Record<Direction, Direction> = {
      UP: "DOWN",
      DOWN: "UP",
      LEFT: "RIGHT",
      RIGHT: "LEFT",
    };

    // Only prevent opposite direction if snake has already started moving
    if (!hasStartedRef.current || opposites[directionRef.current] !== newDir) {
      setDirection(newDir);
      directionRef.current = newDir;
      if (!hasStartedRef.current) {
        setHasStarted(true);
        hasStartedRef.current = true;
      }
    }
  }, []);

  // Sync direction ref
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  // Sync game state ref
  useEffect(() => {
    gameStateRef.current = { gameOver };
  }, [gameOver]);

  // Sync hasStarted ref
  useEffect(() => {
    hasStartedRef.current = hasStarted;
  }, [hasStarted]);

  // Game loop with requestAnimationFrame
  useEffect(() => {
    const gameLoop = (timestamp: number) => {
      if (gameStateRef.current.gameOver || !hasStartedRef.current) {
        return;
      }

      if (timestamp - lastUpdateTimeRef.current >= GAME_SPEED) {
        moveSnake();
        lastUpdateTimeRef.current = timestamp;
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [moveSnake, gameOver, hasStarted]);

  return {
    snake,
    food,
    gameOver,
    resetGame,
    changeDirection,
  };
};
