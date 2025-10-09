<template>
  <div class="row g-3 align-items-stretch toolbar mb-6">
    <div class="col-12 col-md-4 col-xxl-5">
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

    <div class="col-12 col-md-6 col-lg-3 col-xxl-2 d-flex justify-content-around gap-2">
      <VBtnToggle v-model="drink.favorites" class="h-100" mandatory density="comfortable">
        <VBtn
          :value="false"
          variant="outlined"
          icon="mdi-star-outline"
          :aria-label="'Tous'"
          size="large"
        />
        <VBtn :value="true" icon="mdi-star" :aria-label="'Favoris'" size="large" />
      </VBtnToggle>
      <VBtn
        variant="outlined"
        color="accent"
        class="h-100 w-50"
        prepend-icon="mdi-filter-menu-outline"
        @click="dialog = true"
      >
        Filtres
      </VBtn>
    </div>
    <BaseDialog v-model="dialog" title="Filtres avancés" persistent @confirm="dialog = false">
      <template #default>
        <div class="row g-3">
          <div class="col-12">
            <VAutocomplete
              v-model="drink.tags"
              :items="tagItems"
              label="Tags"
              multiple
              chips
              closable-chips
              variant="outlined"
              hide-details
              class="w-100"
            />
          </div>

          <div class="col-12 col-md-6">
            <VCheckbox
              v-model="inStockOnly"
              label="En stock uniquement"
              color="success"
              hide-details
            />
          </div>
          <div class="col-12 col-md-6">
            <VCheckbox
              v-model="drink.alcoholOnly"
              label="Avec alcool uniquement"
              color="primary"
              hide-details
            />
          </div>
          <div class="col-12">
            <label class="form-label d-flex justify-content-between">
              <span>Prix</span>
              <span>
                {{ formatPrice((drink.priceRange ?? [priceMin, priceMax])[0]) }} –
                {{ formatPrice((drink.priceRange ?? [priceMin, priceMax])[1]) }}
              </span>
            </label>

            <VRangeSlider
              :min="priceMin"
              :max="priceMax"
              :step="0.5"
              thumb-label
              class="px-2"
              :model="drink.priceRange ?? [priceMin, priceMax]"
              @update:model-value="(val) => (drink.priceRange = val)"
            />
          </div>
        </div>
      </template>
      <template #actions="{ confirm, cancel }">
        <VBtn variant="outlined" prepend-icon="mdi-filter-off" @click="clearFilter(cancel)"
          >Réinitialiser</VBtn
        >
        <VBtn variant="outlined" prepend-icon="mdi-check" @click="confirm()">Appliquer</VBtn>
      </template>
    </BaseDialog>
  </div>
</template>

<script setup lang="ts">
import { categories, tagItems } from "@/data/categoriesData";
import { fromKey, sortOptions, toKey, type SortKey } from "@/data/sortOptionsData";
import { formatPrice } from "@/logic/utils/utils";
import { useDrinkStore } from "@/stores/drink";
import { computed, ref } from "vue";
import BaseDialog from "../common/BaseDialog.vue";

const drink = useDrinkStore();
const dialog = ref(false);
const priceMin = 0;
const priceMax = 150;

const inStockOnly = computed<boolean>({
  get: () => !drink.showOutOfStock,
  set: (v) => (drink.showOutOfStock = !v),
});

const selectedKey = computed<SortKey>({
  get() {
    return toKey[drink.sortBy]?.[drink.sortDirection] ?? "NAME_ASC";
  },
  set(v) {
    const m = fromKey[v];
    drink.setSort(m.by, m.dir);
  },
});

const clearFilter = (action: VoidFunction) => {
  drink.resetFilter();
  action();
};
</script>

<style lang="css" scoped>
.toolbar :deep(.v-field__field) {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}
</style>
