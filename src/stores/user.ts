import type { UserPreferencesDto, UserSettingsDto, UserSummaryDto } from "@/models/user";
import { http } from "@/plugins/http";
import { defineStore } from "pinia";

interface UserState {
  me: UserSummaryDto | null;
  preferences: UserPreferencesDto | null;
  loading: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    me: null,
    preferences: null,
    loading: false,
  }),
  getters: {
    isFavorite: (s) => (drinkId: number) => s.preferences?.favoriteDrinkIds.includes(drinkId),
    getFavoritesIds: (s) => s.preferences?.favoriteDrinkIds ?? [],
    username: (state) => state.me?.username || null,
    isAdmin: (state) => state.me?.role === "ADMIN",
    isBarman: (state) => state.me?.role === "BARMAN",
    isUser: (state) => state.me?.role === "USER",
    theme: (s) => s.preferences?.settings.theme ?? "DARK",
    currency: (s) => s.preferences?.settings.currency ?? "EUR",
  },
  actions: {
    async fetchMe() {
      this.loading = true;
      try {
        const { data } = await http.get<UserSummaryDto>("/me/info");
        this.me = data;
      } finally {
        this.loading = false;
      }
    },
    async fetchPreferences() {
      const { data } = await http.get<UserPreferencesDto>("/me/preferences");
      this.preferences = data;
    },
    async updatePreferences(dto: UserSettingsDto) {
      const { data } = await http.patch<UserSettingsDto>("/me/settings", dto);
      if (this.preferences) {
        this.preferences.settings = data;
      }
    },
    async toggleFavorite(drinkId: number) {
      if (this.isFavorite(drinkId)) {
        if (this.preferences) {
          this.preferences.favoriteDrinkIds = this.preferences.favoriteDrinkIds.filter(
            (id) => id !== drinkId
          );
        }
      } else {
        if (this.preferences) {
          this.preferences.favoriteDrinkIds.push(drinkId);
        }
      }
      await http.post(`/me/addFavorites/${drinkId}`);
    },
  },
});
