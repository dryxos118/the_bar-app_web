import { defineStore } from "pinia";
import type { Role, UserPreferencesDto, UserSettingsDto, UserSummaryDto } from "@/models/user";
import { usersService } from "@/logic/services/userService";

interface UserState {
  me: UserSummaryDto | null;
  preferences: UserPreferencesDto | null;
  loading: boolean;
  toggling: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    me: null,
    preferences: null,
    loading: false,
    toggling: false,
  }),
  getters: {
    //* USER
    getInitials: (s) => (s.me?.username ? s.me.username.slice(0, 2).toUpperCase() : "?"),
    //* ROLE
    isAdmin: (s) => s.me?.role === "ADMIN",
    isBarman: (s) => s.me?.role === "BARMAN",
    isUser: (s) => s.me?.role === "USER",
    //* PREF
    theme: (s) => s.preferences?.settings.theme ?? "DARK",
    currency: (s) => s.preferences?.settings.currency ?? "EUR",
    //* FAV
    getFavoritesIds: (s) => s.preferences?.favoriteDrinkIds ?? [],
    isFavorite: (s) => (drinkId: number) =>
      (s.preferences?.favoriteDrinkIds ?? []).includes(drinkId),
  },
  actions: {
    //* FETCH ME
    async fetchMe() {
      this.loading = true;
      try {
        this.me = await usersService.getMe();
        await this.fetchPreferences();
      } finally {
        this.loading = false;
      }
    },
    //* FETCH PREF
    async fetchPreferences() {
      const data = await usersService.getPreferences();
      this.preferences = data;
    },
    //* UPDATE PREF
    async updatePreferences(dto: UserSettingsDto) {
      this.loading = true;
      try {
        const data = await usersService.updatePreferences(dto);
        if (this.preferences) {
          this.preferences.settings = data;
        }
      } finally {
        this.loading = false;
      }
    },
    //* TOGGLE FAV
    async toggleFavorite(drinkId: number) {
      if (!this.preferences) return;
      try {
        await usersService.toggleFavorite(drinkId);
        if (this.isFavorite(drinkId)) {
          this.preferences.favoriteDrinkIds = this.preferences.favoriteDrinkIds.filter(
            (id) => id !== drinkId
          );
        } else {
          this.preferences.favoriteDrinkIds.push(drinkId);
        }
      } catch (error: any) {}
    },
    //* ADMIN
    async adminFetchAll() {
      return usersService.getAll();
    },
    async adminUpdateRole(id: number, role: Role) {
      return usersService.updateRole(id, role);
    },
    async adminUpdateEnabled(id: number) {
      return usersService.updateEnabled(id);
    },
    async adminDeleteUser(id: number) {
      return usersService.deleteUser(id);
    },
    //* RESET
    $reset() {
      this.me = null;
      this.preferences = null;
      this.loading = false;
      this.toggling = false;
    },
  },
});
