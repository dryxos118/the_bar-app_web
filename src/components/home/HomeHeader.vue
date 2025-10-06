<template>
  <div class="row justify-content-center text-center mb-4">
    <div class="col-12 col-lg-10">
      <h1 class="text-gradient">Santé {{ username }}</h1>
      <p class="mt-2">Accédez rapidement à vos habitudes, ou parcourez par catégories.</p>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ username: string | null }>();
</script>
