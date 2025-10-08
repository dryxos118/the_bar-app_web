import type { AuthResponse, LoginDto, RegisterDto } from "@/models/auth";
import { http } from "@/logic/plugins/http";

const STORAGE_KEY = "thebarapp_auth";

class AuthService {
  async login(dto: LoginDto): Promise<AuthResponse> {
    const { data } = await http.post<AuthResponse>("/auth/login", dto);
    return data;
  }

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const { data } = await http.post<AuthResponse>("/auth/register", dto);
    return data;
  }

  logout(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  setToken(token: string | null): void {
    try {
      if (token) {
        localStorage.setItem(STORAGE_KEY, token);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {}
  }

  getToken(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }
}

export const authService = new AuthService();
