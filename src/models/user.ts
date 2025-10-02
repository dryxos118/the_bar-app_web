export type Role = "USER" | "BARMAN" | "ADMIN";

export interface UserSummaryDto {
  id: number;
  username: string;
  email: string;
  role: Role;
  enabled: boolean;
}

export interface UserSettingsDto {
  avatarUrl: string;
  theme: string;
  currency: string;
  showOutOfStock: boolean;
}

export interface UserPreferencesDto {
  settings: UserSettingsDto;
  favoriteDrinkIds: number[];
}
