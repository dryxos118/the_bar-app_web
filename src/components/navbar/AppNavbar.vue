<template>
  <nav class="d-navbar" :class="{ open: isOpen }" role="navigation">
    <div class="navbar-brand">
      <RouterLink :to="{ name: 'home' }" class="text-decoration-none" @click="handleNavClick">
        <div class="d-flex align-center gap-2">
          <VIcon size="28">mdi-glass-cocktail</VIcon>
          <span class="text-h6 font-weight-bold">TheBarApp</span>
        </div>
      </RouterLink>
    </div>
    <div class="navbar-links" :class="{ active: isOpen }" id="nav-menu">
      <RouterLink
        v-for="link in links"
        :key="String(link.route)"
        :to="link.route"
        class="nav-link"
        :class="{ active: isActive(link.route) }"
        @click="handleNavClick"
      >
        <VIcon start>{{ link.icon }}</VIcon> {{ link.name }}
      </RouterLink>
      <UserMenu
        v-if="!isMobile && isAuthenticated && user.me"
        :username="user.me.username"
        :initials="user.getInitials"
        :role="user.me.role"
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
          <VIcon>mdi-github</VIcon>
        </a>
        <VBtn
          class="icon-link"
          @click="toggleTheme"
          :icon="themeIsDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
          :title="themeIsDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
        />
      </div>
    </div>
    <!--* MOBILE  -->
    <div v-if="isMobile" class="d-flex align-items-center gap-3">
      <UserMenu
        v-if="isAuthenticated && user.me"
        :username="user.me.username"
        :initials="user.getInitials"
        :role="user.me.role"
        @logout="logout"
      />
      <button class="navbar-toggle" :class="{ open: isOpen }" @click="toggleMenu" type="button">
        <span class="bar"></span><span class="bar"></span><span class="bar"></span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { LinksData } from "@/data/linksData";
import { useNavbar } from "@/logic/composables/useNavbar";
import { useAuthStore } from "@/stores/auth";
import { useThemeStore } from "@/stores/theme";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import UserMenu from "./UserMenu.vue";

defineProps<{
  links: LinksData[];
}>();
defineEmits<{
  (e: "toggle-theme"): void;
}>();

const auth = useAuthStore();
const user = useUserStore();
const router = useRouter();
const theme = useThemeStore();
const { isOpen, isActive, isMobile, toggleMenu, handleNavClick } = useNavbar();

const isAuthenticated = computed(() => auth.isAuthenticated);
const themeIsDark = computed(() => theme.current === "barDark");

const toggleTheme = () => {
  theme.toggle();
};

const logout = () => {
  auth.logout();
  router.replace({ name: "login" });
};
</script>
