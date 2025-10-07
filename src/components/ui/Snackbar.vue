<template>
  <VSnackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    :timeout="snackbar.timeout"
    location="top center"
    rounded="pill"
  >
    {{ snackbar.message }}

    <template v-slot:actions>
      <VBtn icon="mdi-close" size="small" variant="outlined" @click="snackbar.close" />
    </template>
  </VSnackbar>
</template>

<script setup lang="ts">
import { useSnackbar } from "@/stores/snackbar";
const snackbar = useSnackbar();
</script>
