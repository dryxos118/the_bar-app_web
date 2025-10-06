<template>
  <div class="container-fluid p-3">
    <DrinkFilter />

    <VDivider />

    <DrinkLoading v-if="loading" />

    <DrinkEmptyState v-else-if="drink.filtered.length === 0" @reset="drink.resetFilter" />

    <div v-else>
      <DrinkCard :drinks="pagedItems" />

      <div class="d-flex justify-content-center mt-4">
        <v-pagination
          v-model="localPage"
          :length="totalPages"
          :total-visible="6"
          @update:model-value="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DrinkCard from "@/components/drink/DrinkCard.vue";
import DrinkEmptyState from "@/components/drink/DrinkEmptyState.vue";
import DrinkFilter from "@/components/drink/DrinkFilter.vue";
import DrinkLoading from "@/components/drink/DrinkLoading.vue";
import type { DrinkCategory } from "@/models/drink";
import { useDrinkStore } from "@/stores/drink";
import { watch, onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const drink = useDrinkStore();
const route = useRoute();
const router = useRouter();

const pageSize = computed(() => 12);
const localPage = ref<number>(Number(route.query.page ?? 1));
const totalPages = computed(() => Math.max(1, Math.ceil(drink.filtered.length / pageSize.value)));
const pagedItems = computed(() => {
  const start = (localPage.value - 1) * pageSize.value;
  return drink.filtered.slice(start, start + pageSize.value);
});
const loading = computed(() => drink.loading);
onMounted(() => {
  drink.fetchAll();
});

watch(
  () => route.query,
  (q) => {
    drink.category = (q.category as DrinkCategory) ?? "ALL";
    drink.favorites = q.favorites === "ALL" || q.favorites === "1";
    const p = Number(q.page ?? 1);
    localPage.value = isNaN(p) || p < 1 ? 1 : p;
    updateQuery({});
  },
  { immediate: true }
);

watch(
  () => [
    drink.category,
    drink.favorites,
    drink.search,
    drink.sortBy,
    drink.sortDirection,
    drink.tags,
    drink.showOutOfStock,
  ],
  () => {
    if (localPage.value !== 1) {
      updateQuery({ page: 1 });
    }
  },
  { deep: true }
);

function onPageChange(p: number) {
  updateQuery({ page: p });
}

function updateQuery(partial: Record<string, any>) {
  const merged = { ...route.query, ...partial };
  Object.keys(merged).forEach((k) => {
    const v = merged[k];
    if (v === null || v === undefined || v === "" || v === false) delete merged[k];
  });
  router.push({ name: route.name as string, query: merged });
}
</script>
