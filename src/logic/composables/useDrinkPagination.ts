import type { DrinkCategory } from "@/models/drink";
import { useDrinkStore } from "@/stores/drink";
import { useSnackbar } from "@/stores/snackbar";
import { computed, onMounted, ref, watch } from "vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";

export function useDrinkPagination() {
  const drink = useDrinkStore();
  const snackbar = useSnackbar();
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
  const notResetFilter = ref(false);

  onMounted(async () => {
    try {
      await drink.fetchAll();
    } catch (e: any) {
      snackbar.triggerError(e?.message ?? "Erreur");
    }
  });

  onBeforeRouteLeave(() => {
    if (notResetFilter.value) {
      notResetFilter.value = false;
    } else {
      drink.resetFilter();
    }
  });

  watch(
    () => route.query,
    (q) => {
      drink.category = (q.category as DrinkCategory) ?? "ALL";
      drink.favorites = q.favorites === "ALL" || q.favorites === "1";
      const p = Number(q.page ?? 1);
      localPage.value = isNaN(p) || p < 1 ? 1 : p;
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

  async function refreshAll() {
    try {
      await drink.fetchAll(true);
    } catch (e: any) {
      snackbar.triggerError(e?.message ?? "Erreur");
    }
  }

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

  return {
    drink,
    route,
    router,
    pageSize,
    localPage,
    totalPages,
    pagedItems,
    loading,
    notResetFilter,
    onPageChange,
    updateQuery,
    refreshAll,
  };
}
