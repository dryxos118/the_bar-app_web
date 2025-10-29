<template>
  <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
    <h2 class="mb-0 d-flex align-items-center">
      <VIcon class="me-2" color="primary">mdi-shield-crown</VIcon>
      {{ title }}
    </h2>
    <div :class="['d-flex align-items-center gap-2', slotCss]">
      <slot />
    </div>
  </div>
  <VDivider class="mb-5" />
</template>

<script setup lang="ts">
defineProps<{ title: string; slotCss?: string }>();
</script>
