<template>
  <VApp>
    <Snackbar />
    <AppNavbar />
    <VMain class="page py-6">
      <RouterView />
    </VMain>
  </VApp>
</template>

<script setup lang="ts">
import AppNavbar from "@/components/navbar/AppNavbar.vue";
import Snackbar from "@/components/Snackbar.vue";
</script>
