<template>
  <nav
    class="d-navbar"
    :class="{ open: isOpen }"
    role="navigation"
    aria-label="Navigation principale"
  >
    <div class="navbar-brand">
      <RouterLink :to="{ name: 'home' }" class="text-decoration-none" @click="handleNavClick">
        <div class="d-flex align-center gap-2">
          <v-icon size="28">mdi-glass-cocktail</v-icon>
          <span class="text-h6 font-weight-bold">TheBarApp</span>
        </div>
      </RouterLink>
    </div>

    <div class="navbar-links" :class="{ active: isOpen }" id="nav-menu">
      <template v-if="isAuthenticated">
        <RouterLink
          v-for="link in connectedLinks"
          :key="link.route"
          :to="link.route"
          class="nav-link"
          :class="{ active: isActive(link.route) }"
          @click="handleNavClick"
        >
          <v-icon start>{{ link.icon }}</v-icon> {{ link.name }}
        </RouterLink>
      </template>

      <UserMenu
        v-if="!isMobile"
        :username="user.username"
        :initials="initials"
        :role="user.$state.me?.role"
        @logout="logout"
      />

      <div class="social-icons">
        <a
          href="https://github.com/dryxos118"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          class="icon-link"
        >
          <v-icon>mdi-github</v-icon>
        </a>
        <button
          class="icon-link theme-toggle"
          type="button"
          @click="toggleTheme"
          :title="themeIsDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
        >
          <v-icon :icon="themeIsDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'" />
        </button>
      </div>
    </div>

    <div v-if="isMobile" class="d-flex align-items-center gap-3">
      <UserMenu
        :username="user.username"
        :role="user.me?.role"
        :initials="initials"
        @logout="logout"
      />

      <button
        class="navbar-toggle"
        :class="{ open: isOpen }"
        @click="toggleMenu"
        type="button"
        aria-controls="nav-menu"
        :aria-expanded="isOpen ? 'true' : 'false'"
        aria-label="Ouvrir/fermer le menu"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useNavbar } from "@/plugins/useNavbar";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useThemeStore } from "@/stores/theme";
import UserMenu from "../components/ui/UserMenu.vue";
import { useUserStore } from "@/stores/user";
import { connectedLinks } from "@/data/linksData";

const { isOpen, isActive, isMobile, toggleMenu, handleNavClick } = useNavbar();

const auth = useAuthStore();
const user = useUserStore();
const { isAuthenticated } = storeToRefs(auth);

const router = useRouter();

const logout = () => {
  auth.logout();
  router.replace({ name: "login" });
};

const initials = computed(() =>
  user.username
    ? user.username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?"
);

const theme = useThemeStore();
const themeIsDark = computed(() => theme.current === "barDark");
function toggleTheme() {
  theme.toggle();
}
</script>
