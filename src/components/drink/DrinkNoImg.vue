<template>
  <div class="no-photo">
    <VIcon icon="mdi-glass-cocktail-off" size="62" class="mb-4" />
    <span>Pas encore de photo</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = withDefaults(defineProps<{ size?: number }>(), { size: 180 });

const sizePx = computed(() => `${props.size}px`);
</script>

<style lang="css" scoped>
.no-photo {
  height: v-bind(sizePx);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 0.9rem;
  font-style: italic;
}
</style>
