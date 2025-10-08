import { defineStore } from "pinia";

export interface SnackbarState {
  show: boolean;
  message: string;
  color: "success" | "error" | "warning" | "info";
  timeout: number;
}

export const useSnackbar = defineStore("snackbar", {
  state: (): SnackbarState => ({
    show: false,
    message: "",
    color: "info",
    timeout: 3000,
  }),
  actions: {
    //* TRIGGER
    trigger(message: string, color: SnackbarState["color"] = "info", timeout = 3000) {
      this.message = message;
      this.color = color;
      this.timeout = timeout;
      this.show = true;
    },
    //* CLOSE
    close() {
      this.show = false;
    },
  },
});
