/**
 * Centralized Theme Settings Configuration
 */

export type ThemeMode = "dark" | "light" | "system";

export const themeConfig = {
  defaultTheme: "dark" as ThemeMode,
  storageKey: "qc-ui-theme",
  accentColor: "cyan",
  enableSystemPreference: true,
} as const;
