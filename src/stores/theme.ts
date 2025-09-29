import { defineStore } from "pinia";

type ThemeName = "barDark" | "barLight";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    current: (localStorage.getItem("theme") as ThemeName) || ("barDark" as ThemeName),
  }),
  actions: {
    apply(theme: ThemeName) {
      this.current = theme;
      localStorage.setItem("theme", theme);
    },
    toggle() {
      this.apply(this.current === "barDark" ? "barLight" : "barDark");
    },
    init() {
      this.apply(this.current);
    },
  },
});
