<template>
  <div class="container-fluid p-3">
    <DrinkFilter />

    <!-- Loading -->
    <div v-if="loading" class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
      <div v-for="n in pageSize" :key="n" class="col">
        <v-skeleton-loader class="w-100" type="card, article, button" elevation="2" />
      </div>
    </div>

    <!-- Empty -->
    <DrinkEmptyState v-else-if="drink.filtered.length === 0" @reset="drink.resetFilter" />

    <!-- Grid -->
    <div v-else>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        <div v-for="d in pagedItems" :key="d.id" class="col">
          <VCard elevation="4" rounded="xl" class="drinks-card h-100">
            <VImg v-if="d.image" :src="d.image" height="180" cover />
            <DrinkNoImg v-else />

            <VCardTitle class="d-flex justify-content-between align-items-center">
              <span class="fw-semibold">{{ d.name }}</span>
              <VChip size="small" variant="flat">{{ d.category }}</VChip>
            </VCardTitle>

            <VCardText class="pt-0">
              <div class="d-flex justify-content-between">
                <span class="fw-semibold">{{ d.price.toFixed(2) }} €</span>
                <VIcon
                  :color="user.isFavorite(d.id) ? 'red' : 'grey'"
                  size="24"
                  class="cursor-pointer"
                  @click="user.toggleFavorite(d.id)"
                >
                  {{ user.isFavorite(d.id) ? "mdi-heart" : "mdi-heart-outline" }}
                </VIcon>
              </div>

              <div v-if="d.tags?.length" class="mt-2">
                <VIcon start size="14" icon="mdi-tag-multiple" class="me-1" />
                {{ d.tags.join(", ") }}
              </div>

              <div v-if="d.ingredients?.length" class="mt-1">
                <VIcon start size="14" icon="mdi-silverware-fork-knife" class="me-1" />
                {{ d.ingredients.join(", ") }}
              </div>
            </VCardText>

            <VCardActions class="p-2 d-flex justify-content-between">
              <v-btn size="small" variant="outlined" color="primary" append-icon="mdi-arrow-right">
                Détails
              </v-btn>
              <v-btn size="small" variant="outlined" color="primary" append-icon="mdi-cart-plus">
                Ajouter au panier
              </v-btn>
            </VCardActions>
          </VCard>
        </div>
      </div>

      <!-- Pagination -->
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
import DrinkEmptyState from "@/components/drink/DrinkEmptyState.vue";
import DrinkFilter from "@/components/drink/DrinkFilter.vue";
import DrinkNoImg from "@/components/drink/DrinkNoImg.vue";
import type { DrinkCategory } from "@/models/drink";
import { useDrinkStore } from "@/stores/drink";
import { useUserStore } from "@/stores/user";
import { watch, onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const drink = useDrinkStore();
const user = useUserStore();
const route = useRoute();
const router = useRouter();
const placeholder =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=60";

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
  delete merged.category;
  delete merged.favorites;
  Object.keys(merged).forEach((k) => {
    const v = merged[k];
    if (v === null || v === undefined || v === "" || v === false) delete merged[k];
  });
  router.push({ name: route.name as string, query: merged });
}
</script>

<style scoped>
.drinks-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.drinks-card:hover {
  transform: translateY(-6px);
}
</style>
