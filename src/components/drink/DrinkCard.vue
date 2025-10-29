<template>
  <VCard elevation="4" border class="drinks-card h-100">
    <VImg v-if="drink.image" :src="drink.image" height="180" cover />
    <DrinkNoImg v-else />

    <VDivider class="my-1" />

    <VCardTitle class="d-flex justify-content-between align-items-center">
      <span class="fw-semibold">{{ drink.name }}</span>
      <VChip size="small" variant="flat">{{ drink.category }}</VChip>
    </VCardTitle>

    <VCardText class="pt-0">
      <div class="d-flex justify-content-between align-items-center">
        <span class="fw-semibold">{{ formatPrice(drink.price) }}</span>
        <VIcon
          :color="user.isFavorite(drink.id!) ? 'red' : 'grey'"
          size="24"
          class="cursor-pointer"
          @click="user.toggleFavorite(drink.id!)"
        >
          {{ user.isFavorite(drink.id!) ? "mdi-heart" : "mdi-heart-outline" }}
        </VIcon>
      </div>
      <div v-if="drink.tags.length" class="mt-2">
        <VIcon start size="14" icon="mdi-tag-multiple" class="me-1" />
        {{ drink.tags.join(", ") }}
      </div>
      <div v-if="drink.ingredients.length" class="mt-2">
        <VIcon start size="14" icon="mdi-silverware-fork-knife" class="me-1" />
        {{ drink.ingredients.join(", ") }}
      </div>
    </VCardText>

    <VDivider class="my-1" />

    <VCardActions class="p-2 d-flex justify-content-end">
      <VBtn
        size="small"
        variant="outlined"
        color="primary"
        append-icon="mdi-cart-plus"
        @click="$emit('addToCart', drink.name)"
        >Ajouter au panier</VBtn
      >
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
import type { DrinkDto } from "@/models/drink";
import DrinkNoImg from "./DrinkNoImg.vue";
import { useUserStore } from "@/stores/user";
import { formatPrice } from "@/logic/utils/utils";

defineProps<{ drink: DrinkDto }>();
const emit = defineEmits<{ (e: "addToCart", data: string): void }>();

const user = useUserStore();
</script>

<style lang="css" scoped>
.drinks-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.drinks-card:hover {
  transform: translateY(-6px);
}
</style>
