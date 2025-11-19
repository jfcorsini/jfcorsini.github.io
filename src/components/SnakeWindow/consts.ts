export type Position = { x: number; y: number };
export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export const GRID_SIZE = 20;
export const CELL_SIZE = 20;
export const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
export const INITIAL_DIRECTION: Direction = "RIGHT";
export const GAME_SPEED = 100;
