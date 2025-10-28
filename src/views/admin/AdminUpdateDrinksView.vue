<template>
  <div class="container-fluid py-4">
    <AdminHeader :title="title">
      <VChip v-if="model.id" variant="outlined" color="primary">ID #{{ model.id }}</VChip>

      <VBtnToggle v-model="mode" divided>
        <VBtn value="PREVIEW" :active="mode === 'PREVIEW'" :disabled="!model.id" title="Aperçu">
          <VIcon start>mdi-eye-outline</VIcon> Preview
        </VBtn>
        <VBtn value="EDIT" :active="mode === 'EDIT'" :disabled="!model.id" title="Éditer">
          <VIcon start>mdi-pencil</VIcon> Éditer
        </VBtn>
        <VBtn value="CREATE" :active="mode === 'CREATE'" :disabled="!!model.id" title="Créer">
          <VIcon start>mdi-plus</VIcon> Créer
        </VBtn>
      </VBtnToggle>

      <VBtn variant="outlined" prepend-icon="mdi-arrow-left" @click="goBack">Retour</VBtn>
    </AdminHeader>

    <VCard class="rounded-2xl">
      <VCardText>
        <template v-if="loading">
          <VSkeletonLoader type="article" />
        </template>

        <!-- PREVIEW -->
        <template v-else-if="mode === 'PREVIEW'">
          <div class="row g-4">
            <div class="col">
              <DrinkCard :drink="model" />
            </div>
          </div>
        </template>

        <!-- CREATE / EDIT -->
        <template v-else>
          <AdminDrinkForm v-model="model" :readonly="false" @submit="save" @cancel="goBack" />
        </template>
      </VCardText>
    </VCard>
  </div>
</template>

<script setup lang="ts">
import AdminDrinkForm from "@/components/admin/AdminDrinkForm.vue";
import AdminHeader from "@/components/admin/AdminHeader.vue";
import DrinkCard from "@/components/drink/DrinkCard.vue";
import type { DrinkDto } from "@/models/drink";
import type { Mode } from "@/models/utils";
import { useDrinkStore } from "@/stores/drink";
import { computed, onMounted, ref, watch } from "vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";

const props = defineProps<{ id?: number; mode: Mode }>();
const router = useRouter();
const route = useRoute();
const store = useDrinkStore();

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
  id: props.id ?? 0,
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

onMounted(() => {
  if (props.id) {
    loading.value = true;
    const data = store.byId(props.id);
    Object.assign(model.value, data);
    loading.value = false;
  } else {
    mode.value === "CREATE";
  }
});

function goBack() {
  const canGoBack = !!(history.state && (history.state as any).back);
  if (canGoBack) router.back();
  else router.push({ name: "drink-page" });
}

async function save() {
  try {
    saving.value = true;
    let saved;
    if (!model.value.id) {
      saved = await store.create(model.value);
      Object.assign(model.value, saved);
    } else {
      saved = await store.replace(model.value.id, model.value);
      Object.assign(model.value, saved);
    }
  } finally {
    saving.value = false;
  }
}
</script>
