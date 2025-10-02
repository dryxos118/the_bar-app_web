<template>
  <v-app>
    <div class="d-flex flex-column justify-center align-center text-center vh-100">
      <v-icon size="96" color="accent" class="mb-4 rotate">mdi-glass-cocktail</v-icon>

      <h1 class="display-2 font-weight-bold text-accent">404</h1>
      <p class="mt-2 text-h6">Oops... Ce cocktail n’existe pas</p>
      <p class="mb-6">Tu t’es peut-être trompé de recette...</p>

      <RouterLink to="/" class="text-decoration-none">
        <v-btn color="accent" size="large" variant="elevated" rounded="l">
          <v-icon start>mdi-home</v-icon>
          Retour au bar
        </v-btn>
      </RouterLink>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
