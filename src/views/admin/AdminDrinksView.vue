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

  <BaseDialog
    v-model="openDialog"
    title="Supprimer une boisson ?"
    ok-text="Oui, supprimer"
    cancel-text="Annuler"
    persistent
    @confirm="onConfirm"
  >
    <template #default>
      Vous êtes sur le point de retirer <strong>{{ targetDrink?.name }}</strong> de la carte.<br />
      Cette action est irréversible
    </template>
  </BaseDialog>
</template>

<script setup lang="ts">
import AdminDrinkFilter from "@/components/admin/AdminDrinkFilter.vue";
import AdminDrinkTable from "@/components/admin/AdminDrinkTable.vue";
import AdminHeader from "@/components/admin/AdminHeader.vue";
import BaseDialog from "@/components/common/BaseDialog.vue";
import { useDrinkPagination } from "@/logic/composables/useDrinkPagination";
import { useSnackbar } from "@/stores/snackbar";
import { ref } from "vue";
import { useRouter } from "vue-router";

const {
  drink,
  pageSize,
  localPage,
  totalPages,
  pagedItems,
  loading,
  notResetFilter,
  onPageChange,
  refreshAll,
} = useDrinkPagination();

const router = useRouter();
const snackbar = useSnackbar();
const targetDrink = ref<{ id: number; name: string } | null>(null);

const openDialog = ref(false);

async function onConfirm() {
  if (!targetDrink.value) return;
  try {
    await drink.remove(targetDrink.value.id);
  } catch (e: any) {
    snackbar.triggerError(e?.message ?? "Erreur");
  }
  openDialog.value = false;
  snackbar.triggerSucces(`${targetDrink.value.name} supprimée`);
}

function newDrink() {
  router.push({ name: "admin-drinks-update", query: { mode: "CREATE" } });
}

function previewDrink(name: string) {
  notResetFilter.value = true;
  drink.search = name;
  router.push({ name: "drinks" });
}

function editDrink(id: number) {
  router.push({ name: "admin-drinks-update", params: { id: id }, query: { mode: "EDIT" } });
}

function deleteDrink(id: number, name: string) {
  if (!id) return;
  targetDrink.value = { id: id, name: name };
  openDialog.value = true;
}
</script>
