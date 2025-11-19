export const APP_NAMES = ["portfolio", "projects", "snake"] as const;

export type AppName = (typeof APP_NAMES)[number];
