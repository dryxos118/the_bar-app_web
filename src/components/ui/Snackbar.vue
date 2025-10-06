<template>
  <v-snackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    :timeout="snackbar.timeout"
    location="top center"
  >
    {{ snackbar.message }}

    <template v-slot:actions>
      <v-btn icon="mdi-close" size="small" variant="text" @click="snackbar.close" />
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSnackbar } from "@/stores/snackbar";
const snackbar = useSnackbar();
</script>
