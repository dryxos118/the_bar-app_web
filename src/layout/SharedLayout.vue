<template>
  <VApp>
    <Snackbar />
    <slot />
    <VMain class="page py-6">
      <RouterView />
    </VMain>
    <Footer />
  </VApp>
</template>

<script setup lang="ts">
import Snackbar from "@/components/Snackbar.vue";
import Footer from "./Footer.vue";
</script>
