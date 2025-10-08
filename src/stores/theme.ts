import { defineStore } from "pinia";

type ThemeName = "barDark" | "barLight";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    current: (localStorage.getItem("theme") as ThemeName) || ("barDark" as ThemeName),
  }),
  actions: {
    //* APPLY
    apply(theme: ThemeName) {
      this.current = theme;
      localStorage.setItem("theme", theme);
    },
    //* TOGGLE
    toggle() {
      this.apply(this.current === "barDark" ? "barLight" : "barDark");
    },
    //* INIT
    init() {
      this.apply(this.current);
    },
  },
});
