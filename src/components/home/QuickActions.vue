<template>
  <div class="d-flex flex-wrap justify-content-center gap-3 mt-3">
    <VChip
      prepend-icon="mdi-star"
      size="large"
      variant="flat"
      color="secondary"
      @click="$emit('favorites')"
      class="hover-card"
    >
      Best Of
    </VChip>

    <VChip
      prepend-icon="mdi-dice-5"
      size="large"
      variant="flat"
      color="secondary"
      @click="$emit('random')"
      class="hover-card"
    >
      Cuite Surprise
    </VChip>
  </div>
</template>

<script setup lang="ts">
defineEmits<{ (e: "favorites"): void; (e: "random"): void }>();
</script>
