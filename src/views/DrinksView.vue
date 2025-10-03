<template>
  <div class="container-fluid p-2 p-md-3">
    <DrinkFilter />
    <pre>{{ formattedJson }}</pre>
  </div>
</template>

<script setup lang="ts">
import DrinkFilter from "@/components/drink/DrinkFilter.vue";
import type { DrinkCategory } from "@/models/drink";
import { useDrinkStore } from "@/stores/drink";
import { watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const drink = useDrinkStore();
const route = useRoute();

const formattedJson = computed(() => JSON.stringify(drink.filtered, null, 2));

onMounted(async () => {
  await drink.fetchAll();
});

watch(
  () => route.query,
  (q) => {
    console.log("Query params changés :", q);
    drink.category = (q.category as DrinkCategory) ?? "ALL";
  },
  { immediate: true }
);
</script>
