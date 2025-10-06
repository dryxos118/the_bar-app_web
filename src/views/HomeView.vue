<template>
  <div class="container-fluid p-2 p-md-3">
    <div class="row align-items-center mb-4">
      <div class="col">
        <HomeHeader :username="user.username">
          <QuickActions @favorites="goFavorites" @random="goRandom" />
        </HomeHeader>
      </div>
    </div>

    <div class="row align-items-center mb-3">
      <div class="col d-flex align-items-center">
        <h2 class="h4 fw-semibold mb-0">À la Carte :</h2>
      </div>
      <div class="col-auto">
        <h6 class="mb-0">Choisissez une catégorie pour pré-filtrer la liste.</h6>
      </div>
    </div>

    <CategoryGrid @select="goCategory" />
  </div>
</template>

<script setup lang="ts">
import CategoryGrid from "@/components/home/CategoryGrid.vue";
import HomeHeader from "@/components/home/HomeHeader.vue";
import QuickActions from "@/components/home/QuickActions.vue";
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
