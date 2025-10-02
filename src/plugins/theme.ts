import type { ThemeDefinition } from "vuetify";

export const barDark: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#1E2029",
    surface: "#242424",
    primary: "#ff7800",
    "primary-darken-1": "#8E5800",
    secondary: "#9C1F2D",
    "secondary-darken-1": "#6E1620",
    accent: "#B87333",
    info: "#4DA3FF",
    success: "#39B37E",
    warning: "#FFB020",
    error: "#FF4D4D",

    "on-background": "#EDEBE6",
    "on-surface": "#EDEBE6",
    "surface-variant": "#2B2B2B",
    outline: "#4A4A4A",
  },
};

export const barLight: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#F6F6F6",
    surface: "#FFFFFF",
    primary: "#ff7800",
    "primary-darken-1": "#7C4400",
    secondary: "#8A1B28",
    "secondary-darken-1": "#61131C",
    accent: "#A5652A",
    info: "#2E7DD7",
    success: "#2F9F6E",
    warning: "#E79A00",
    error: "#D63C3C",

    "on-background": "#1E1E1E",
    "on-surface": "#232323",
    "surface-variant": "#F1F1F1",
    outline: "#D6D6D6",
  },
};
