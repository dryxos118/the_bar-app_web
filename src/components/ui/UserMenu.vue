<template>
  <div class="user-menu">
    <VMenu location="bottom right" :offset="[4, 8]" transition="fade-transition">
      <template #activator="{ props: vProps }">
        <VBtn v-bind="vProps" icon aria-label="Menu utilisateur">
          <VAvatar size="34">
            <span class="avatar-text">{{ safeInitials }}</span>
          </VAvatar>
        </VBtn>
      </template>

      <VSheet min-width="240" elevation="2" rounded="lg">
        <div class="menu-header">
          <VAvatar size="40" class="ring">
            <span class="avatar-text">{{ safeInitials }}</span>
          </VAvatar>
          <div class="id-block">
            <div class="name">{{ safeUsername }}</div>
            <div class="role">
              <VIcon size="16" class="mr-1">mdi-shield-account</VIcon>
              {{ roleLabel }}
            </div>
          </div>
        </div>

        <VDivider class="my-2" />

        <VList nav density="comfortable">
          <VListItem to="/profile" router prepend-icon="mdi-account-circle" title="Profil" />
          <VListItem
            v-if="hasAdmin"
            to="/admin"
            router
            prepend-icon="mdi-shield-crown"
            title="Espace admin"
          />
          <VDivider class="my-1" />
          <VListItem
            class="text-danger"
            clickable
            prepend-icon="mdi-logout"
            title="Déconnexion"
            @click="show = true"
          />
        </VList>
      </VSheet>
    </VMenu>
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
