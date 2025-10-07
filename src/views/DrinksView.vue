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
import { useDrinkPagination } from "@/plugins/useDrinkPagination";
const { drink, pagedItems, totalPages, localPage, loading, onPageChange } = useDrinkPagination();
</script>
