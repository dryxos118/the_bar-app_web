<template>
  <div class="user-menu">
    <v-menu>
      <template #activator="{ props: vProps }">
        <v-btn v-bind="vProps" icon aria-label="Ouvrir le menu utilisateur">
          <v-avatar size="32">
            <span>{{ safeInitials }}</span>
          </v-avatar>
        </v-btn>
      </template>

      <v-list>
        <v-list-item :title="safeUsername" subtitle="Profil" />
        <v-divider />
        <v-list-item title="Déconnexion" @click="emit('logout')" />
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  username?: string | null;
  initials?: string;
}>();

const emit = defineEmits<{
  (e: "logout"): void;
}>();

const safeInitials = computed(() => props.initials?.trim() || "?");
const safeUsername = computed(() => props.username || "?");
</script>

<style scoped>
.user-menu {
  display: flex;
  align-items: center;
}
</style>
