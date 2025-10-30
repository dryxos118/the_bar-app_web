import type { LoginDto, RegisterDto } from "@/models/auth";
import { defineStore } from "pinia";
import { authService } from "@/logic/services/authService";
import { normalizeError } from "@/logic/utils/utils";
import { useDrinkStore } from "./drink";
import { useUserStore } from "./user";

interface AuthState {
  token: string | null;
  loading: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: authService.getToken(),
    loading: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    //* LOGIN
    async login(dto: LoginDto) {
      this.loading = true;
      try {
        const data = await authService.login(dto);
        this.token = data.token;
        authService.setToken(data.token);
        return true;
      } catch (error: any) {
        throw normalizeError(error, "Erreur de connexion");
      } finally {
        this.loading = false;
      }
    },
    //* REGISTER
    async register(dto: RegisterDto) {
      this.loading = true;
      try {
        const data = await authService.register(dto);
        this.token = data.token;
        authService.setToken(data.token);
        return true;
      } catch (error: any) {
        throw normalizeError(error, "Erreur de connexion");
      } finally {
        this.loading = false;
      }
    },
    //* LOGOUT
    logout() {
      this.$reset();
      authService.logout();
    },
    //* RESET
    $reset() {
      // TODO :
      //const user = useUserStore();
      const drinks = useDrinkStore();
      this.token = null;
      this.loading = false;
      drinks.$reset();
    },
  },
});
