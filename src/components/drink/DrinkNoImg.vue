<script setup lang="ts">
import { VIcon } from "vuetify/components";
</script>

<template>
  <div class="no-photo">
    <VIcon icon="mdi-glass-cocktail-off" size="62" class="mb-4" />
    <span>Pas encore de photo</span>
  </div>
</template>

<style scoped>
.no-photo {
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #aaa;
  background: #f8f8f8;
  border-radius: 12px;
  font-size: 0.9rem;
  font-style: italic;
}
</style>
