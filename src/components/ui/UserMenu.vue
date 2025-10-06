<template>
  <div class="user-menu">
    <v-menu location="bottom right" :offset="[4, 8]" transition="fade-transition">
      <template #activator="{ props: vProps }">
        <v-btn v-bind="vProps" icon aria-label="Menu utilisateur">
          <v-avatar size="34" class="ring">
            <span class="avatar-text">{{ safeInitials }}</span>
          </v-avatar>
        </v-btn>
      </template>

      <v-sheet min-width="240" elevation="2" rounded="lg">
        <div class="menu-header">
          <v-avatar size="40" class="ring">
            <span class="avatar-text">{{ safeInitials }}</span>
          </v-avatar>
          <div class="id-block">
            <div class="name">{{ safeUsername }}</div>
            <div class="role">
              <v-icon size="16" class="mr-1">mdi-shield-account</v-icon>
              {{ roleLabel }}
            </div>
          </div>
        </div>

        <v-divider class="my-2" />

        <v-list nav density="comfortable">
          <v-list-item to="/profile" router prepend-icon="mdi-account-circle" title="Profil" />
          <v-list-item
            v-if="hasAdmin"
            to="/admin"
            router
            prepend-icon="mdi-shield-crown"
            title="Espace admin"
          />
          <v-divider class="my-1" />
          <v-list-item
            class="text-danger"
            clickable
            prepend-icon="mdi-logout"
            title="Déconnexion"
            @click="show = true"
          />
        </v-list>
      </v-sheet>
    </v-menu>
  </div>

  <BaseDialog
    v-model="show"
    title="Dernier verre ?"
    :show-actions="true"
    ok-text="Oui, je rentre"
    cancel-text="Non, encore une"
    :loading="loading"
    persistent
    @confirm="onConfirm"
  >
    <template #default>
      Vous êtes sur le point de quitter le bar <v-icon icon="mdi-beer" size="28" /><br />
      Voulez-vous vraiment partir ?
    </template>
  </BaseDialog>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { VAvatar, VBtn, VList, VMenu } from "vuetify/components";
import BaseDialog from "../base/BaseDialog.vue";

type Role = "ADMIN" | "BARMAN" | "USER";

const props = defineProps<{
  username?: string | null;
  initials?: string;
  role?: Role;
}>();

const emit = defineEmits<{
  (e: "logout"): void;
}>();

const show = ref(false);
const loading = ref(false);

function onConfirm() {
  loading.value = true;
  try {
    emit("logout");
  } finally {
    loading.value = false;
    show.value = false;
  }
}

const safeInitials = computed(() => (props.initials?.trim() || "?").slice(0, 3).toUpperCase());
const safeUsername = computed(() => props.username || "Utilisateur");
const roleLabel = computed(() => {
  switch (props.role) {
    case "ADMIN":
      return "Administrateur";
    case "BARMAN":
      return "Barman";
    default:
      return "Membre";
  }
});
const hasAdmin = computed(() => props.role === "ADMIN");
</script>

<style scoped>
.user-menu {
  display: flex;
  align-items: center;
}
.ring {
  box-shadow: 0 0 0 2px var(--color-primary);
}
.avatar-text {
  font-weight: 700;
  text-transform: uppercase;
}
.menu-header {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 0.75rem;
  align-items: center;
  padding: 0.75rem 0.9rem;
}
</style>
