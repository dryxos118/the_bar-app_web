<template>
  <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
    <h2 class="mb-0 d-flex align-items-center">
      <VIcon class="me-2" color="primary">mdi-glass-cocktail</VIcon>
      Gestion des boissons
    </h2>
    <div class="d-flex align-items-center gap-2">
      <VBtn variant="outlined" prepend-icon="mdi-plus" color="primary" @click="">
        Nouvelle boisson
      </VBtn>
      <VBtn variant="outlined" prepend-icon="mdi-refresh" @click=""> Rafraîchir </VBtn>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
