import type { AuthResponse, LoginDto, RegisterDto } from "@/models/auth";
import { http } from "@/plugins/http";

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
    localStorage.removeItem(STORAGE_KEY);
  }

  setToken(token: string | null): void {
    if (token) {
      localStorage.setItem(STORAGE_KEY, token);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEY);
  }
}

export const authService = new AuthService();
