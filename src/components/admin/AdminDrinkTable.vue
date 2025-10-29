<template>
  <VDataTable
    :headers="headers"
    :items="pagedItems"
    :items-per-page="pageSize"
    :loading="loading"
    hover
    fixed-header
    height="50vh"
    item-key="id"
    hide-default-footer
  >
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@8"></v-skeleton-loader>
    </template>

    <template #item.name="{ item }">
      <div class="d-flex align-items-center">
        <VAvatar size="28" class="me-2">
          <VImg v-if="item.image" :src="item.image" cover />
          <VIcon v-else icon="mdi-glass-cocktail-off" />
        </VAvatar>
        <span class="fw-semibold text-truncate">{{ item.name }}</span>
      </div>
    </template>

    <template #item.category="{ item }">
      <div class="d-flex align-items-center">
        <VIcon :icon="categories.find((x) => x.key === item.category)?.icon" />
        <span class="ms-2">{{ categories.find((x) => x.key === item.category)?.label }}</span>
      </div>
    </template>

    <template #item.price="{ item }">
      <span class="fw-semibold">{{ formatPrice(item.price) }}</span>
    </template>

    <template #item.outOfStock="{ item }">
      <VChip size="x-small" variant="flat">
        {{ item.outOfStock ? "Rupture" : "En stock" }}
      </VChip>
    </template>

    <template #item.actions="{ item }">
      <VBtn
        variant="text"
        size="small"
        icon="mdi-eye"
        color="secondary"
        @click="$emit('preview', item.id!)"
      />
      <VBtn
        variant="text"
        size="small"
        icon="mdi-pencil"
        color="primary"
        @click="$emit('edit', item.id!)"
      />
      <VBtn
        variant="text"
        size="small"
        icon="mdi-delete"
        color="error"
        @click="$emit('delete', item.id!)"
      />
    </template>

    <template #no-data>
      <div class="py-8 text-center text-medium-emphasis">
        <VIcon size="36" class="mb-2">mdi-glass-cocktail-off</VIcon>
        <div>Aucune boisson trouvée.</div>
      </div>
    </template>
  </VDataTable>
</template>

<script setup lang="ts">
import { categories } from "@/data/categoriesData";
import { formatPrice } from "@/logic/utils/utils";
import type { DrinkDto } from "@/models/drink";

const props = defineProps<{ pageSize: number; pagedItems: DrinkDto[]; loading: boolean }>();

const emit = defineEmits<{
  (e: "edit", id: number): void;
  (e: "preview", id: number): void;
  (e: "delete", id: number): void;
}>();

const headers = [
  { title: "Nom", value: "name", width: 260 },
  { title: "Catégorie", value: "category", width: 160 },
  { title: "Prix", value: "price", width: 110 },
  { title: "Stock", value: "outOfStock", width: 120 },
  { title: "Alcool", value: "hasAlcohol", width: 120 },
  { title: "Actions", value: "actions", width: "20%", align: "center" as const },
];
</script>
