export const APP_NAMES = ["portfolio", "projects", "notes", "snake"] as const;

export type AppName = (typeof APP_NAMES)[number];
