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
    //* TRIGGER INFO
    triggerInfo(message: string) {
      this.message = message;
      this.color = "info";
      this.timeout = 3000;
      this.show = true;
    },
    //* TRIGGER SUCCESS
    triggerSucces(message: string) {
      this.message = message;
      this.color = "success";
      this.timeout = 3000;
      this.show = true;
    },
    //* TRIGGER WARN
    triggerWarn(message: string) {
      this.message = message;
      this.color = "warning";
      this.timeout = 3500;
      this.show = true;
    },
    //* TRIGGER ERROR
    triggerError(message: string) {
      this.message = message;
      this.color = "error";
      this.timeout = 4000;
      this.show = true;
    },
    //* CLOSE
    close() {
      this.show = false;
    },
  },
});
