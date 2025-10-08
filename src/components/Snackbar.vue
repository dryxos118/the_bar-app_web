<template>
  <VSnackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    :timeout="snackbar.timeout"
    transition="scroll-y-transition"
    location="top center"
  >
    <div class="d-flex align-center gap-2">
      <VIcon v-if="icon" start>{{ icon }}</VIcon>
      <span>{{ snackbar.message }}</span>
    </div>

    <template #actions>
      <VBtn class="close-btn" icon="mdi-close" variant="text" @click="snackbar.close" />
    </template>
  </VSnackbar>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSnackbar } from "@/stores/snackbar";
const snackbar = useSnackbar();

const icon = computed(() => {
  switch (snackbar.color) {
    case "success":
      return "mdi-check-circle-outline";
    case "error":
      return "mdi-alert-circle-outline";
    case "warning":
      return "mdi-alert-outline";
    case "info":
    default:
      return "mdi-information-outline";
  }
});
</script>

<style lang="css" scoped>
.close-btn,
i {
  color: var(--nav-text) !important;
}
</style>
