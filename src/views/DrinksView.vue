<template>
  <div class="container-fluid p-2 p-md-3">
    <BaseHeader
      title="Trouver votre prochain verre..."
      sub-title="Filtrez par catégorie, recherchez, tags, stock, ou consultez vos favoris."
    />

    <DrinkFilter />

    <DrinkLoading v-if="loading" />

    <NoDrinks v-else-if="drink.filtered.length === 0" @reset="drink.resetFilter" />

    <div v-else>
      <DrinkGrid :drinks="pagedItems" @add-to-cart="handleAddToCart" />

      <div class="d-flex justify-content-center mt-4">
        <VPagination
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
import BaseHeader from "@/components/common/BaseHeader.vue";
import DrinkFilter from "@/components/drink/DrinkFilter.vue";
import DrinkGrid from "@/components/drink/DrinkGrid.vue";
import DrinkLoading from "@/components/drink/DrinkLoading.vue";
import NoDrinks from "@/components/drink/NoDrinks.vue";
import { useDrinkPagination } from "@/logic/composables/useDrinkPagination";
import { useSnackbar } from "@/stores/snackbar";
import { VPagination } from "vuetify/components";

const { drink, pagedItems, totalPages, localPage, loading, onPageChange } = useDrinkPagination();
const snackbar = useSnackbar();

const handleAddToCart = (name: string) => {
  snackbar.triggerSucces(`Boisson ${name} ajoutée au panier`);
};
</script>
