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
import Snackbar from "@/components/ui/Snackbar.vue";
import Footer from "./Footer.vue";
import AppNavbar from "@/navbars/AppNavbar.vue";
</script>
