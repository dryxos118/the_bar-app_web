<template>
  <SharedLayout>
    <AppNavbar :links="notConnectedLinks" />
  </SharedLayout>
</template>

<script setup lang="ts">
import SharedLayout from "./SharedLayout.vue";
import AppNavbar from "@/components/navbar/AppNavbar.vue";
import { notConnectedLinks } from "@/data/linksData";
</script>
