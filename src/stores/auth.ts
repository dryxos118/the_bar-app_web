import { http } from "@/plugins/http";
import type { AuthResponse, LoginDto, RegisterDto } from "@/models/auth";
import { defineStore } from "pinia";
import { authService } from "@/services/authService";

interface AuthState {
  token: string | null;
  loading: boolean;
}

const STORAGE_KEY = "thebarapp_auth";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: authService.getToken(),
    loading: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(dto: LoginDto) {
      this.loading = true;
      try {
        const data = await authService.login(dto);
        this.token = data.token;
        authService.setToken(data.token);
        return true;
      } catch (error: any) {
        console.error(error);
        throw Error(error.response?.data?.message ?? "Erreur");
      } finally {
        this.loading = false;
      }
    },
    async register(dto: RegisterDto) {
      this.loading = true;
      try {
        const data = await authService.register(dto);
        this.token = data.token;
        authService.setToken(data.token);
        return true;
      } catch (error: any) {
        console.error(error);
        throw Error(error.response?.data?.message ?? "Erreur");
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.token = null;
      authService.logout();
    },
  },
});
