import type { ThemeDefinition } from "vuetify";

export const barDark: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#1E2029",
    surface: "#242424",
    primary: "#ff7800",
    secondary: "#0F766E",
    accent: "#B87333",
    info: "#4DA3FF",
    success: "#39B37E",
    warning: "#FFB020",
    error: "#FF4D4D",
    outline: "#4A4A4A",
  },
};

export const barLight: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#F6F6F6",
    surface: "#FFFFFF",
    primary: "#ff7800",
    secondary: "#14B8A6",
    accent: "#A5652A",
    info: "#2E7DD7",
    success: "#2F9F6E",
    warning: "#E79A00",
    error: "#D63C3C",
    outline: "#D6D6D6",
  },
};
