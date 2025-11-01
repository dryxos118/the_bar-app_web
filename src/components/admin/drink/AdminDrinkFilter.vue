<template>
  <div class="row g-3 align-items-stretch toolbar mb-6">
    <div class="col-12 col-md-4 col-xxl-4">
      <VTextField
        v-model="drink.search"
        variant="outlined"
        density="comfortable"
        prepend-inner-icon="mdi-magnify"
        placeholder="Rechercher (nom, ingrédient)"
        hide-details
        class="w-100 h-100"
      />
    </div>

    <div class="col-12 col-sm-6 col-lg-3">
      <VSelect
        :items="categories.sort((a, b) => a.key.localeCompare(b.key))"
        item-title="label"
        item-value="key"
        v-model="drink.category"
        label="Catégorie"
        variant="outlined"
        density="comfortable"
        hide-details
        class="w-100 h-100"
      />
    </div>

    <div class="col-12 col-sm-6 col-lg-2">
      <VSelect
        :items="sortOptions"
        v-model="selectedKey"
        label="Trier par"
        variant="outlined"
        density="comfortable"
        hide-details
        class="w-100 h-100"
      />
    </div>

    <div class="col-12 col-md-6 col-lg-3 col-xxl-3 d-flex gap-2 justify-content-around">
      <VCheckbox v-model="drink.alcoholOnly" label="Alcool" density="comfortable" hide-details />
      <VCheckbox
        v-model="drink.showOutOfStock"
        label="Ruptures"
        density="comfortable"
        hide-details
      />
      <VBtn
        icon="mdi-filter-off"
        color="accent"
        title="Supprimer les filtres"
        @click="drink.resetFilter"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { categories } from "@/data/categoriesData";
import { fromKey, sortOptions, toKey, type SortKey } from "@/data/sortOptionsData";
import { useDrinkStore } from "@/stores/drink";
import { computed } from "vue";

const drink = useDrinkStore();

const selectedKey = computed<SortKey>({
  get() {
    return toKey[drink.sortBy]?.[drink.sortDirection] ?? "NAME_ASC";
  },
  set(v) {
    const m = fromKey[v];
    drink.setSort(m.by, m.dir);
  },
});
</script>
