<template>
  <nav
    class="d-navbar"
    :class="{ open: isOpen }"
    role="navigation"
    aria-label="Navigation principale (auth)"
  >
    <div class="navbar-brand">
      <RouterLink :to="{ name: 'home' }" class="text-decoration-none" @click="handleNavClick">
        <div class="d-flex align-center gap-2">
          <v-icon size="28">mdi-glass-cocktail</v-icon>
          <span class="text-h6 font-weight-bold">TheBarApp</span>
        </div>
      </RouterLink>
    </div>

    <div class="navbar-links" :class="{ active: isOpen }">
      <RouterLink
        v-for="link in notConnectedLinks"
        :key="link.route"
        :to="link.route"
        class="nav-link"
        :class="{ active: isActive(link.route) }"
        @click="handleNavClick"
      >
        <v-icon start>{{ link.icon }}</v-icon> {{ link.name }}
      </RouterLink>

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

    <button
      class="navbar-toggle"
      :class="{ open: isOpen }"
      @click="toggleMenu"
      type="button"
      aria-controls="nav-menu"
      aria-label="Ouvrir/fermer le menu"
    >
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useNavbar } from "../plugins/useNavbar";
import { useThemeStore } from "@/stores/theme";
import { notConnectedLinks } from "@/data/linksData";

const { isOpen, isActive, toggleMenu, handleNavClick } = useNavbar();

const theme = useThemeStore();
const themeIsDark = computed(() => theme.current === "barDark");
function toggleTheme() {
  theme.toggle();
}
</script>
