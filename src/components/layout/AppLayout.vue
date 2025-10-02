<template>
  <VApp>
    <Snackbar />
    <AppNavbar />
    <VMain class="page py-6">
      <RouterView />
    </VMain>
    <Footer />
  </VApp>
</template>

<script setup lang="ts">
import Footer from "./Footer.vue";
import AppNavbar from "@/components/navbar/AppNavbar.vue";
import Snackbar from "@/components/Snackbar.vue";
</script>
