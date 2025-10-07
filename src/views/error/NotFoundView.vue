<template>
  <VApp>
    <div class="d-flex flex-column justify-center align-center text-center vh-100">
      <VIcon size="96" color="accent" class="mb-4 rotate">mdi-glass-cocktail</VIcon>

      <h1 class="display-2 font-weight-bold text-accent">404</h1>
      <p class="mt-2 text-h6">Oops... Ce cocktail n’existe pas</p>
      <p class="mb-6">Tu t’es peut-être trompé de recette...</p>

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
