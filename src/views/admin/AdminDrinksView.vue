<template>
  <div class="container-fluid py-4">
    <AdminHeader />
    <VDivider />
    <DrinkFilter />
  </div>
</template>

<script setup lang="ts">
import AdminHeader from "@/components/drink/admin/AdminHeader.vue";
import DrinkFilter from "@/components/drink/DrinkFilter.vue";
import { useDrinkPagination } from "@/plugins/useDrinkPagination";
const { drink, pagedItems, totalPages, localPage, loading, onPageChange } = useDrinkPagination();
</script>
