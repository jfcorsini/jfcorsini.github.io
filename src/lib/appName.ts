export const APP_NAMES = ["portfolio"] as const;

export type AppName = (typeof APP_NAMES)[number];
