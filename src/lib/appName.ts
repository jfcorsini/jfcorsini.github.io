export const APP_NAMES = ["portfolio", "projects"] as const;

export type AppName = (typeof APP_NAMES)[number];
