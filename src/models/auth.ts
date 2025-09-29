export interface LoginDto {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  role: "USER" | "BARMAN" | "ADMIN";
}

export interface AuthResponse {
  username: string;
  email: string;
  token: string;
}

export interface UserSummaryDto {
  id: number;
  username: string;
  email: string;
  role: "USER" | "BARMAN" | "ADMIN";
  enabled: boolean;
}
