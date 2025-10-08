<template>
  <div class="row justify-content-center text-center mb-4">
    <div class="col-12 col-lg-10">
      <h1 class="text-gradient">{{ title }}</h1>
      <h6 class="my-3">{{ subTitle }}</h6>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subTitle: string;
}>();
</script>
