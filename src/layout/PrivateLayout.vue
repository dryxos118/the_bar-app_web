<template>
  <SharedLayout>
    <AppNavbar :links="connectedLinks" />
  </SharedLayout>
</template>

<script setup lang="ts">
import AppNavbar from "@/components/navbar/AppNavbar.vue";
import SharedLayout from "./SharedLayout.vue";
import { connectedLinks } from "@/data/linksData";
</script>
