<template>
  <div class="container-fluid py-4">
    <AdminHeader :title="title" slot-css="flex-column flex-md-row">
      <VChip v-if="model.id" rounded="xl" color="primary">ID #{{ model.id }}</VChip>

      <VTabs v-model="mode" class="ms-2" density="comfortable" slider-color="primary" grow>
        <VTab :value="'PREVIEW'" :disabled="!model.id">
          <VIcon start>mdi-eye-outline</VIcon> Preview
        </VTab>
        <VTab :value="'EDIT'" :disabled="!model.id"> <VIcon start>mdi-pencil</VIcon> Éditer </VTab>
        <VTab :value="'CREATE'" :disabled="!!model.id"> <VIcon start>mdi-plus</VIcon> Créer </VTab>
      </VTabs>
    </AdminHeader>

    <div class="mt-4">
      <template v-if="loading">
        <VSkeletonLoader type="article" height="400" />
      </template>

      <VSheet v-else border rounded="xl" class="pa-4">
        <template v-if="mode === 'PREVIEW'">
          <div class="row g-4">
            <div class="col">
              <DrinkCard :drink="model" />
            </div>
          </div>
        </template>

        <template v-else-if="mode === 'EDIT'">
          <AdminDrinkForm v-model="model" :readonly="false" @submit="save" @cancel="goBack" />
        </template>

        <template v-else>
          <AdminDrinkForm v-model="model" :readonly="false" @submit="save" @cancel="goBack" />
        </template>
      </VSheet>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminDrinkForm from "@/components/admin/AdminDrinkForm.vue";
import AdminHeader from "@/components/admin/AdminHeader.vue";
import DrinkCard from "@/components/drink/DrinkCard.vue";
import type { DrinkDto } from "@/models/drink";
import type { Mode } from "@/models/utils";
import { useDrinkStore } from "@/stores/drink";
import { useSnackbar } from "@/stores/snackbar";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps<{ id?: number; mode: Mode }>();
const router = useRouter();
const route = useRoute();
const store = useDrinkStore();
const snackbar = useSnackbar();

const loading = ref(false);
const saving = ref(false);

const mode = ref<Mode>(props.mode);
watch(mode, (m) => {
  router.replace({
    name: route.name as string,
    params: route.params,
    query: { ...route.query, mode: m },
  });
});

const model = ref<DrinkDto>({
  id: props.id,
  name: "",
  category: "COCKTAIL",
  tags: [],
  glass: "",
  image: "",
  price: 0,
  instruction: "",
  hasAlcohol: false,
  outOfStock: false,
  ingredients: [],
});

const title = computed(() =>
  mode.value === "CREATE"
    ? "Nouvelle boisson"
    : mode.value === "EDIT"
    ? "Modifier une boisson"
    : "Aperçu de la boisson"
);

onMounted(async () => {
  if (props.id) {
    loading.value = true;
    if (store.all.length === 0) {
      await store.fetchAll(true);
    }
    const data = store.byId(props.id);
    if (!data) {
      router.replace({ name: "admin-drinks" });
      return;
    }
    Object.assign(model.value, data);
    if (mode.value === "CREATE") {
      mode.value = "PREVIEW";
    }
    loading.value = false;
  } else {
    mode.value === "CREATE";
  }
});

function goBack() {
  router.push({ name: "admin-drinks" });
}

async function save() {
  try {
    saving.value = true;
    let saved: boolean;

    if (!model.value.id) {
      saved = await store.create(model.value);
      if (saved) {
        snackbar.trigger("Boisson ajouter avec succes", "success");
      }
    } else {
      saved = await store.replace(model.value.id, model.value);
      if (saved) {
        snackbar.trigger("Boisson mis a jour avec succes", "success");
      }
    }
  } finally {
    if (mode.value === "CREATE") {
      goBack();
    }
    await store.fetchAll(true);
    saving.value = false;
  }
}
</script>
