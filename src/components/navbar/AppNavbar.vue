<template>
  <nav
    class="d-navbar"
    :class="{ open: isOpen }"
    role="navigation"
    aria-label="Navigation principale"
  >
    <!-- 1) Brand -->
    <div class="navbar-brand">
      <RouterLink :to="{ name: 'home' }" class="text-decoration-none" @click="handleNavClick">
        <div class="d-flex align-center gap-2">
          <v-icon size="28">mdi-glass-cocktail</v-icon>
          <span class="text-h6 font-weight-bold">TheBarApp</span>
        </div>
      </RouterLink>
    </div>

    <!-- 2) Liens (SEUL bloc qui collapse) -->
    <div class="navbar-links" :class="{ active: isOpen }" id="nav-menu">
      <template v-if="isAuthenticated">
        <RouterLink
          v-for="link in connectedLinks"
          :key="link.url"
          :to="link.url"
          class="nav-link"
          :class="{ active: isActive(link.url) }"
          @click="handleNavClick"
        >
          {{ link.name }}
        </RouterLink>
      </template>

      <UserMenu v-if="!isMobile" :username="auth.username" :initials="initials" @logout="logout" />

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

    <div v-if="isMobile" class="d-flex align-items-center gap-2">
      <UserMenu :username="auth.username" :initials="initials" @logout="logout" />

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
import { useNavbar } from "./useNavbar";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useThemeStore } from "@/stores/theme";
import UserMenu from "./UserMenu.vue";

const connectedLinks = [
  { url: "/", name: "Accueil" },
  { url: "/drinks", name: "Boissons" },
  { url: "/order", name: "Commande" },
];

const { isOpen, isActive, isMobile, toggleMenu, handleNavClick } = useNavbar();

const auth = useAuthStore();
const { isAuthenticated } = storeToRefs(auth);

const router = useRouter();

const logout = () => {
  auth.logout();
  router.replace({ name: "login" });
};

const initials = computed(() =>
  auth.username
    ? auth.username
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
