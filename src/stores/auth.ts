import { http } from "@/plugins/http";
import type { AuthResponse, LoginDto, RegisterDto, UserSummaryDto } from "@/models/auth";
import { defineStore } from "pinia";

interface AuthState {
  user: UserSummaryDto | null;
  token: string | null;
  loading: boolean;
}

const STORAGE_KEY = "thebarapp_auth";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: getToken(),
    loading: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    username: (state) => state.user?.username || null,
    isAdmin: (state) => state.user?.role === "ADMIN",
    isBarman: (state) => state.user?.role === "BARMAN",
    isUser: (state) => state.user?.role === "USER",
  },
  actions: {
    setUser(user: UserSummaryDto | null) {
      this.user = user;
    },
    async login(dto: LoginDto) {
      this.loading = true;
      try {
        const { data } = await http.post<AuthResponse>("/auth/login", dto);
        this.token = data.token;
        setToken(data.token);
        await this.fetchMe();
        return true;
      } catch (error) {
        console.log(error);
        throw Error("ERR : " + error);
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
        await this.fetchMe();
        return true;
      } catch (error) {
        console.log(error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    async fetchMe() {
      if (!this.token) return;
      const { data } = await http.get<UserSummaryDto>("/user/me");
      this.setUser(data);
    },
    logout() {
      this.token = null;
      this.user = null;
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
