<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
    <div v-for="d in props.drinks" :key="d.id" class="col">
      <VCard elevation="4" rounded="xl" border class="drinks-card h-100">
        <!-- Header -->
        <VImg v-if="d.image" :src="d.image" height="180" cover />
        <DrinkNoImg v-else />
        <VDivider class="my-1" />
        <!-- Title and Text -->
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
        <VDivider class="my-1" />
        <!-- Actions -->
        <VCardActions class="p-2 d-flex justify-content-between">
          <v-btn
            class="ms-auto"
            size="small"
            variant="outlined"
            color="primary"
            append-icon="mdi-cart-plus"
          >
            Ajouter au panier
          </v-btn>
        </VCardActions>
      </VCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DrinkDto } from "@/models/drink";
import { useUserStore } from "@/stores/user";
import DrinkNoImg from "./DrinkNoImg.vue";

const props = defineProps<{
  drinks: DrinkDto[];
}>();

const user = useUserStore();
</script>

<style scoped>
.drinks-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.drinks-card:hover {
  transform: translateY(-6px);
}
</style>
