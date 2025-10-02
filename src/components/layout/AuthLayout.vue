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
import Footer from "./Footer.vue";
import AuthNavbar from "@/components/navbar/AuthNavbar.vue";
import Snackbar from "@/components/Snackbar.vue";
</script>
