<template>
  <VApp>
    <div class="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <VIcon size="96" color="error" class="mb-3">mdi-shield-alert-outline</VIcon>
      <h1>Accès refusé</h1>
      <p>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
      <VBtn color="primary" class="mt-3" @click="router.push({ name: 'home' })">
        <VIcon start>mdi-home</VIcon>
        Retour à l'accueil
      </VBtn>
    </div>
  </VApp>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>
