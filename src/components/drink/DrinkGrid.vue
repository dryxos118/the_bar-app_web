<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
    <div v-for="drink in drinks" :key="drink.id" class="col">
      <DrinkCard :drink="drink" @add-to-cart="forwardAddToCart" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DrinkDto } from "@/models/drink";
import DrinkCard from "./DrinkCard.vue";

defineProps<{ drinks: DrinkDto[] }>();
const emit = defineEmits<{ (e: "addToCart", data: string): void }>();

const forwardAddToCart = (name: string) => {
  emit("addToCart", name);
};
</script>
