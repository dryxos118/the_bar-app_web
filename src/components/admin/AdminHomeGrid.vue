<template>
  <div class="row row-cols-1 row-cols-md-2 justify-content-center g-4 h-100">
    <div v-for="route in routes" :key="route.title" class="col">
      <VCard
        elevation="4"
        border
        class="text-center pa-4 hover-card"
        @click="$emit('goTo', route.route)"
      >
        <VIcon size="48" class="mb-2" color="primary">{{ route.icon }}</VIcon>
        <h4>{{ route.title }}</h4>
        <p class="">{{ route.subtitle }}</p>
      </VCard>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{ (e: "goTo", route: string): void }>();

const routes = [
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
</script>
