<template>
  <div class="container-fluid p-2 p-md-3">
    <div class="row justify-content-center text-center mb-4">
      <div class="col-12 col-lg-10">
        <h1 class="text-gradient">Santé {{ user.username }}</h1>
        <p class="mt-2">Accédez rapidement à vos habitudes, ou parcourez par catégories.</p>
        <div class="d-flex flex-wrap justify-content-center gap-3 mt-3">
          <v-chip
            prepend-icon="mdi-star"
            size="large"
            variant="elevated"
            color="secondary"
            @click="goFavorites"
            class="hover-card"
          >
            Best Of
          </v-chip>
          <v-chip
            prepend-icon="mdi-dice-5"
            size="large"
            variant="elevated"
            color="secondary"
            @click="goRandom"
            class="hover-card"
          >
            Cuite Surprise
          </v-chip>
        </div>
      </div>
    </div>

    <div class="row align-items-center mb-6">
      <div class="col d-flex align-items-center">
        <h2 class="h4 fw-semibold mb-0">À la Carte :</h2>
      </div>
      <div class="col-auto">
        <h6>Choisissez une catégorie pour pré-filtrer la liste.</h6>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 justify-content-center g-5">
      <div v-for="cat in categories" :key="cat.key" class="col">
        <v-card
          class="h-100 hover-card"
          elevation="6"
          rounded="l"
          border
          @click="goCategory(cat.key)"
        >
          <v-card-text class="d-flex align-items-start gap-3">
            <v-avatar size="48" color="primary">
              <v-icon :icon="cat.icon" size="28" />
            </v-avatar>
            <div>
              <h5 class="mb-1">{{ cat.label }}</h5>
              <div>{{ cat.description }}</div>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn variant="outlined" color="accent" append-icon="mdi-arrow-right">
              Voir {{ cat.short }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { categories } from "@/data/categoriesData";
import type { DrinkCategory } from "@/models/drink";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const router = useRouter();
const user = useUserStore();

function goCategory(category: DrinkCategory) {
  if (category == "ALL") {
    router.push({ name: "drinks" });
  } else {
    router.push({ name: "drinks", query: { category } });
  }
}
function goFavorites() {
  router.push({ name: "drinks", query: { favorites: "ALL" } });
}
function goRandom() {
  const randomIndex = Math.floor(Math.random() * categories.length);
  const randomCategory = categories[randomIndex];
  goCategory(randomCategory.key);
}
</script>
