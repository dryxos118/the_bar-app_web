<template>
  <VApp>
    <Snackbar />
    <AuthNavbar />
    <VMain class="page py-6">
      <RouterView />
    </VMain>
    <Footer />
  </VApp>
</template>

<script setup lang="ts">
import AuthNavbar from "@/navbars/AuthNavbar.vue";
import Footer from "./Footer.vue";
import Snackbar from "@/components/ui/Snackbar.vue";
</script>
