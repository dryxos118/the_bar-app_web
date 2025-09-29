<template>
  <VApp>
    <Snackbar />
    <AuthNavbar />
    <VMain class="page py-6">
      <RouterView />
    </VMain>
  </VApp>
</template>

<script setup lang="ts">
import AuthNavbar from "@/components/navbar/AuthNavbar.vue";
import Snackbar from "@/components/Snackbar.vue";
</script>
