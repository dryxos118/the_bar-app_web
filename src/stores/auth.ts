import { http } from "@/plugins/http";
import type { AuthResponse, LoginDto, RegisterDto } from "@/models/auth";
import { defineStore } from "pinia";

interface AuthState {
  token: string | null;
  loading: boolean;
}

const STORAGE_KEY = "thebarapp_auth";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: getToken(),
    loading: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(dto: LoginDto) {
      this.loading = true;
      try {
        const { data } = await http.post<AuthResponse>("/auth/login", dto);
        this.token = data.token;
        setToken(data.token);
        return true;
      } catch (error: any) {
        console.log(error.response);
        throw Error("ERR : " + error.response.data.message);
      } finally {
        this.loading = false;
      }
    },
    async register(dto: RegisterDto) {
      this.loading = true;
      try {
        const { data } = await http.post<AuthResponse>("/auth/register", dto);
        this.token = data.token;
        setToken(data.token);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.token = null;
      setToken(null);
    },
  },
});

function setToken(token: string | null) {
  if (token) {
    localStorage.setItem(STORAGE_KEY, token);
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function getToken(): string | null {
  return localStorage.getItem(STORAGE_KEY);
}
