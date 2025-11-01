<template>
  <VCard elevation="4" border class="h-100">
    <VImg v-if="drink.image" :src="drink.image" height="150" />
    <DrinkNoImg v-else :size="150" />

    <VDivider class="my-1" />

    <VCardTitle class="d-flex justify-content-between align-items-center">
      <span class="fw-semibold">{{ drink.name }}</span>

      <VChip size="small" rounded="xl" color="accent">{{ drink.category }}</VChip>
    </VCardTitle>

    <VCardText>
      <div class="d-flex justify-content-center align-items-center mb-3">
        <span class="fw-bold">{{ formatPrice(drink.price) }}</span>
      </div>

      <div class="d-flex justify-content-between align-items-center">
        <VChip color="primary" size="small" rounded="xl">
          {{ drink.outOfStock ? "Rupture" : "En stock" }}
        </VChip>

        <VChip color="primary" size="small" rounded="xl">
          {{ drink.hasAlcohol ? "Avec alcool" : "sans alcool" }}
        </VChip>
      </div>
    </VCardText>

    <VDivider class="my-1" />

    <VCardActions class="d-flex justify-content-around">
      <VBtn
        variant="outlined"
        size="small"
        prepend-icon="mdi-eye"
        color="secondary"
        @click="$emit('preview', drink.name)"
        >Preview
      </VBtn>
      <VBtn
        variant="outlined"
        size="small"
        prepend-icon="mdi-pencil"
        color="primary"
        @click="$emit('edit', drink.id!)"
        >Editer
      </VBtn>
      <VBtn
        variant="outlined"
        size="small"
        prepend-icon="mdi-delete"
        color="error"
        @click="$emit('delete', drink.id!, drink.name)"
        >Supprimer
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
import DrinkNoImg from "@/components/drink/DrinkNoImg.vue";
import { formatPrice } from "@/logic/utils/utils";
import type { DrinkDto } from "@/models/drink";

defineProps<{ drink: DrinkDto }>();
const emit = defineEmits<{
  (e: "edit", id: number): void;
  (e: "preview", name: string): void;
  (e: "delete", id: number, name: string): void;
}>();
</script>
