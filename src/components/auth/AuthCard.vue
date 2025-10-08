<template>
  <VCard class="p-4 w-md-50" elevation="10" rounded="xl">
    <div class="d-flex align-center justify-space-between mb-4">
      <div class="d-flex align-center gap-3">
        <VAvatar size="48" class="bar-avatar">
          <VIcon>mdi-glass-cocktail</VIcon>
        </VAvatar>
        <div>
          <h1 class="text-h5 mb-1">The Bar App</h1>
          <p class="text-body-2 text-medium-emphasis m-0">{{ message }}</p>
        </div>
      </div>
    </div>
    <VDivider />
    <slot />
  </VCard>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>
