<template>
  <div class="row justify-content-center text-center mb-4">
    <h1 class="text-gradient">Trouver votre prochain verre...</h1>
    <p class="mt-2">Filtrez par catégorie, recherchez, tags, stock, ou consultez vos favoris.</p>
  </div>
  <div class="row g-2 align-items-stretch toolbar mb-6">
    <div class="col-12 col-lg-5">
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
        :items="categories.map((d) => d.key)"
        v-model="drink.category"
        label="Catégorie"
        variant="outlined"
        hide-details
        class="w-100 h-100"
      />
    </div>

    <div class="col-12 col-sm-6 col-lg-2">
      <VSelect
        :items="options"
        v-model="selectedKey"
        label="Trier par"
        variant="outlined"
        density="comfortable"
        hide-details
        class="w-100 h-100"
      />
    </div>

    <div class="col-12 col-lg-2 d-flex gap-2">
      <v-btn-toggle v-model="drink.favorites" class="w-100 h-100" mandatory density="comfortable">
        <v-btn
          :value="false"
          variant="outlined"
          icon="mdi-star-outline"
          :aria-label="'Tous'"
        ></v-btn>
        <v-btn :value="true" icon="mdi-star" :aria-label="'Favoris'"></v-btn>
      </v-btn-toggle>
      <v-btn
        variant="outlined"
        color="accent"
        class="h-100"
        prepend-icon="mdi-filter-menu-outline"
        @click="dialog = true"
      >
        Filtres
      </v-btn>
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
        <VBtn variant="tonal" prepend-icon="mdi-filter-off" @click="clearFilter(cancel)"
          >Réinitialiser</VBtn
        >
        <VBtn variant="tonal" prepend-icon="mdi-check" @click="confirm()">Appliquer</VBtn>
      </template>
    </BaseDialog>
  </div>
</template>

<script setup lang="ts">
import { categories } from "@/data/categoriesData";
import { useDrinkStore } from "@/stores/drink";
import { computed, ref } from "vue";
import BaseDialog from "../dialog/BaseDialog.vue";

const drink = useDrinkStore();
const dialog = ref(false);
const priceMin = 0;
const priceMax = 150;

function clearFilter(action: VoidFunction) {
  drink.resetFilter();
  action();
}

const options = [
  { title: "Nom A→Z", value: "NAME_ASC" },
  { title: "Nom Z→A", value: "NAME_DESC" },
  { title: "Prix croissant", value: "PRICE_ASC" },
  { title: "Prix décroissant", value: "PRICE_DESC" },
];
type SortKey = "NAME_ASC" | "NAME_DESC" | "PRICE_ASC" | "PRICE_DESC";

const selectedKey = computed<SortKey>({
  get() {
    if (drink.sortBy === "NAME") return drink.sortDirection === "ASC" ? "NAME_ASC" : "NAME_DESC";
    return drink.sortDirection === "ASC" ? "PRICE_ASC" : "PRICE_DESC";
  },
  set(v) {
    switch (v) {
      case "NAME_ASC":
        drink.setSort("NAME", "ASC");
        break;
      case "NAME_DESC":
        drink.setSort("NAME", "DESC");
        break;
      case "PRICE_ASC":
        drink.setSort("PRICE", "ASC");
        break;
      case "PRICE_DESC":
        drink.setSort("PRICE", "DESC");
        break;
    }
  },
});

const tagItems = [
  { title: "Classic", value: "CLASSIC" },
  { title: "Signature", value: "SIGNATURE" },
  { title: "Sans alcool", value: "NON_ALCOHOLIC" },
];

const inStockOnly = computed<boolean>({
  get: () => !drink.showOutOfStock,
  set: (v) => (drink.showOutOfStock = !v),
});

function formatPrice(v: number) {
  return `${v.toFixed(2)} €`;
}
</script>

<style lang="css" scoped>
.toolbar :deep(.v-field__field) {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}
</style>
