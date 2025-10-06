<template>
  <div class="d-flex flex-wrap justify-content-center gap-3 mt-3">
    <v-chip
      prepend-icon="mdi-star"
      size="large"
      variant="flat"
      color="secondary"
      @click="$emit('favorites')"
      class="hover-card"
    >
      Best Of
    </v-chip>

    <v-chip
      prepend-icon="mdi-dice-5"
      size="large"
      variant="flat"
      color="secondary"
      @click="$emit('random')"
      class="hover-card"
    >
      Cuite Surprise
    </v-chip>
  </div>
</template>

<script setup lang="ts">
defineEmits<{ (e: "favorites"): void; (e: "random"): void }>();
</script>
