<template>
  <VCard class="h-100 hover-card" border @click="$emit('click')">
    <VCardText class="d-flex align-items-start gap-3">
      <VAvatar size="48" color="primary" variant="outlined">
        <VIcon :icon="icon" size="28" />
      </VAvatar>
      <div>
        <h5 class="mb-1">{{ label }}</h5>
        <div class="text-body-2">{{ description }}</div>
      </div>
    </VCardText>
    <VCardActions class="justify-content-end">
      <VBtn variant="outlined" color="accent" append-icon="mdi-arrow-right">
        Voir {{ short }}
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
  label: string;
  description: string;
  short: string;
}>();
defineEmits<{ (e: "click"): void }>();
</script>
