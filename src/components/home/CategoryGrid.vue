<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 justify-content-center g-5">
    <div v-for="cat in categories" :key="cat.key" class="col">
      <CategoryCard
        :icon="cat.icon"
        :label="cat.label"
        :description="cat.description"
        :short="cat.short"
        @click="$emit('select', cat.key)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DrinkCategory } from "@/models/drink";
import { categories } from "@/data/categoriesData";
import CategoryCard from "./CategoryCard.vue";

defineEmits<{ (e: "select", key: DrinkCategory): void }>();
</script>
