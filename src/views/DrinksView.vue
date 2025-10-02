<template>
  <div class="p-4">
    <h1>Drinks View</h1>

    <div>category : {{ category ?? "Null" }}</div>
    <div>favorites : {{ favorites ?? "Null" }}</div>
    <div>search : {{ search ?? "Null" }}</div>

    <hr />
    <pre>{{ route.query }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const category = ref<string | null>(null);
const favorites = ref<string | null>(null);
const search = ref<string | null>(null);

watch(
  () => route.query,
  (q) => {
    console.log("Query params changés :", q);

    category.value = (q.category as string) ?? null;
    favorites.value = (q.favorites as string) ?? null;
    search.value = (q.search as string) ?? null;
  },
  { immediate: true }
);
</script>
