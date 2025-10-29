<template>
  <div class="container-fluid p-2 p-md-3">
    <AdminHeader title="Gestion des boissons">
      <VBtn variant="outlined" prepend-icon="mdi-plus" color="primary" @click="newDrink">
        Nouvelle boisson
      </VBtn>
      <VBtn variant="outlined" prepend-icon="mdi-refresh" @click="refreshAll">Rafraîchir</VBtn>
    </AdminHeader>

    <AdminDrinkFilter />

    <VSheet border rounded="xl" class="pa-4">
      <AdminDrinkTable
        :page-size="pageSize"
        :paged-items="pagedItems"
        :loading="loading"
        @preview="previewDrink"
        @edit="editDrink"
        @delete="deleteDrink"
      />
    </VSheet>

    <div class="d-flex justify-content-around align-items-center mt-2">
      <div>Page {{ localPage }} / {{ totalPages }}</div>
      <VPagination
        v-model="localPage"
        :length="totalPages"
        :total-visible="6"
        rounded="xl"
        @update:modelValue="onPageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminDrinkFilter from "@/components/admin/AdminDrinkFilter.vue";
import AdminDrinkTable from "@/components/admin/AdminDrinkTable.vue";
import AdminHeader from "@/components/admin/AdminHeader.vue";
import { useDrinkPagination } from "@/logic/composables/useDrinkPagination";
import { useSnackbar } from "@/stores/snackbar";
import { useRouter } from "vue-router";

const { pageSize, localPage, totalPages, pagedItems, loading, onPageChange, refreshAll } =
  useDrinkPagination();

const router = useRouter();
const snackbar = useSnackbar();

function newDrink() {
  router.push({ name: "admin-drinks-update", query: { mode: "CREATE" } });
}

function previewDrink(id: number) {
  router.push({ name: "admin-drinks-update", params: { id: id }, query: { mode: "PREVIEW" } });
}

function editDrink(id: number) {
  router.push({ name: "admin-drinks-update", params: { id: id }, query: { mode: "EDIT" } });
}

function deleteDrink(id: number) {
  snackbar.trigger("Pas encore implementer", "warning");
}
</script>
