import type { Role } from "./user";

export interface LoginDto {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  role: Role;
}

export interface AuthResponse {
  username: string;
  email: string;
  token: string;
}
