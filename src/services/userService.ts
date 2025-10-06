import type { Role, UserPreferencesDto, UserSettingsDto, UserSummaryDto } from "@/models/user";
import { http } from "@/plugins/http";

class UsersService {
  async getMe() {
    const { data } = await http.get<UserSummaryDto>("/me/info");
    return data;
  }
  async getPreferences() {
    const { data } = await http.get<UserPreferencesDto>("/me/preferences");
    return data;
  }
  async updatePreferences(payload: UserSettingsDto) {
    const { data } = await http.patch<UserSettingsDto>("/me/settings", payload);
    return data;
  }
  async toggleFavorite(id: number) {
    await http.post(`/me/addFavorites/${id}`);
  }
  // ADMIN
  async getAll() {
    const { data } = await http.get<UserSummaryDto[]>("/user/list");
    return data;
  }
  async updateRole(id: number, payload: Role) {
    const { data } = await http.patch(`/user/role/${id}?role=${payload}`);
    return data;
  }
  async updateEnabled(id: number) {
    const { data } = await http.patch(`/user/enabled/${id}`);
    return data;
  }
  async deleteUser(id: number) {
    const { data } = await http.delete(`/user/delete/${id}`);
    return data;
  }
}

export const usersService = new UsersService();
