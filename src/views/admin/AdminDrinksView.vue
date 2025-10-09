<template>
  <div class="container-fluid p-2 p-md-3">
    <AdminHeader title="Gestion des boissons">
      <VBtn variant="outlined" prepend-icon="mdi-plus" color="primary" @click="">
        Nouvelle boisson
      </VBtn>
      <VBtn variant="outlined" prepend-icon="mdi-refresh" @click="">Rafraîchir</VBtn>
    </AdminHeader>

    <AdminDrinkFilter />

    <AdminDrinkTable />
  </div>
</template>

<script setup lang="ts">
import AdminDrinkFilter from "@/components/admin/AdminDrinkFilter.vue";
import AdminDrinkTable from "@/components/admin/AdminDrinkTable.vue";
import AdminHeader from "@/components/admin/AdminHeader.vue";
</script>
