<template>
  <div class="container-fluid py-4">
    <div class="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4">
      <h2 class="mb-2 mb-md-0 d-flex align-items-center">
        <VIcon class="me-2" color="primary">mdi-shield-crown</VIcon>
        Panneau d'administration
      </h2>
      <VChip color="accent" variant="flat"> {{ userName }} : {{ userRole }} </VChip>
    </div>

    <VDivider class="mb-5" />

    <div class="row justify-content-center g-4">
      <div class="col-12 col-md-6" v-for="card in actions" :key="card.title">
        <VCard elevation="3" border class="text-center pa-4 hover-card" @click="goTo(card.route)">
          <VIcon size="48" class="mb-2" color="primary">{{ card.icon }}</VIcon>
          <h4>{{ card.title }}</h4>
          <p class="">{{ card.subtitle }}</p>
        </VCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const user = useUserStore();
const router = useRouter();

const userRole = computed(() => user.me?.role);
const userName = computed(() => user.me?.username);

if (!(user.isAdmin || user.isBarman)) {
  router.replace({ name: "forbidden" });
}

const actions = [
  {
    title: "Utilisateurs",
    subtitle: "Gérer les comptes et rôles",
    icon: "mdi-account-group",
    route: "/admin/users",
  },
  {
    title: "Boissons",
    subtitle: "Ajouter ou modifier des boissons",
    icon: "mdi-glass-cocktail",
    route: "/admin/drinks",
  },
  {
    title: "Commandes",
    subtitle: "Suivi des commandes",
    icon: "mdi-cart-outline",
    route: "/admin/orders",
  },
];

function goTo(route: string) {
  router.push(route);
}
</script>
