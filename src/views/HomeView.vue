<template>
  <div class="container-fluid p-2 p-md-3">
    <BaseHeader
      :title="'Santé ' + user.me?.username"
      sub-title="Accédez rapidement à vos habitudes, ou parcourez par catégories."
    >
      <QuickActions @favorites="goFavorites" @random="goRandom" />
    </BaseHeader>

    <div class="row align-items-center mb-5">
      <div class="col d-flex align-items-center">
        <h2 class="h4 fw-semibold mb-3 mb-md-0">À la Carte :</h2>
      </div>
      <div class="col-auto">
        <h6 class="mb-0">Choisissez une catégorie pour pré-filtrer la liste.</h6>
      </div>
    </div>

    <CategoryGrid @select="goCategory" />
  </div>
</template>

<script setup lang="ts">
import BaseHeader from "@/components/common/BaseHeader.vue";
import CategoryGrid from "@/components/home/CategoryGrid.vue";
import QuickActions from "@/components/home/QuickActions.vue";
import { categories } from "@/data/categoriesData";
import type { DrinkCategory } from "@/models/drink";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const user = useUserStore();
const router = useRouter();

const goCategory = (category: DrinkCategory) => {
  if (category == "ALL") {
    router.push({ name: "drinks" });
  } else {
    router.push({ name: "drinks", query: { category } });
  }
};
const goFavorites = () => {
  router.push({ name: "drinks", query: { favorites: "ALL" } });
};
const goRandom = () => {
  const randomIndex = Math.floor(Math.random() * categories.length);
  const randomCategory = categories[randomIndex];
  goCategory(randomCategory.key);
};
</script>
