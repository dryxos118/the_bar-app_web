<template>
  <VForm ref="formRef" @submit.prevent="onSubmit">
    <div class="row justify-content-center g-3">
      <div class="col-12 col-md-6">
        <VTextField
          v-model="local.name"
          label="Nom"
          variant="outlined"
          :rules="rules.required"
          clearable
          prepend-inner-icon="mdi-form-textbox"
        />
      </div>

      <div class="col-12 col-md-3">
        <VTextField
          v-model.number="local.price"
          label="Prix (€)"
          type="number"
          min="0"
          step="0.1"
          variant="outlined"
          :rules="rules.number"
          prepend-inner-icon="mdi-currency-eur"
        />
      </div>

      <div class="col-12 col-md-3">
        <VSelect
          v-model="local.category"
          :items="categoryItems"
          item-title="label"
          item-value="key"
          label="Catégorie"
          variant="outlined"
          :rules="rules.required"
          clearable
          prepend-inner-icon="mdi-tag-outline"
        />
      </div>

      <div class="col-12 col-md-3">
        <VTextField
          v-model="local.glass"
          label="Verre"
          variant="outlined"
          clearable
          prepend-inner-icon="mdi-glass-cocktail"
        />
      </div>

      <div class="col-12 col-md-3">
        <VSelect
          v-model="local.tags"
          :items="tagItems"
          label="Tags"
          multiple
          chips
          closable-chips
          variant="outlined"
          hide-details
          class="w-100"
          prepend-inner-icon="mdi-tag-multiple-outline"
        />
      </div>

      <div class="col-6 col-md-3 d-flex justify-content-center">
        <VSwitch v-model="local.hasAlcohol" color="accent" label="Alcool" />
      </div>
      <div class="col-6 col-md-3 d-flex justify-content-center">
        <VSwitch v-model="local.outOfStock" color="accent" label="Rupture" />
      </div>

      <div class="col-12">
        <VTextField
          v-model="local.image"
          label="URL image"
          placeholder="https://…"
          variant="outlined"
          clearable
          prepend-inner-icon="mdi-image-outline"
          :rules="rules.urlOptional"
        />
      </div>

      <div class="col-12">
        <VTextField
          v-model="ingredientNew"
          label="Ajouter un ingrédient"
          variant="outlined"
          hide-details
          prepend-inner-icon="mdi-plus"
          @keyup.enter="addIngredient"
          clearable
        />

        <div class="d-flex align-items-center justify-content-between mt-2 mb-3">
          <span class="fw-600">Ingrédients :</span>
          <VBtn
            v-if="(local.ingredients?.length || 0) > 0"
            size="small"
            variant="outlined"
            prepend-icon="mdi-close-circle-outline"
            @click="clearIngredients"
          >
            Tout effacer
          </VBtn>
        </div>

        <div class="d-flex flex-wrap gap-2 mb-3">
          <VChip
            v-for="(ing, i) in local.ingredients"
            :key="ing + i"
            rounded="xl"
            closable
            @click:close="removeIngredient(i)"
            prepend-icon="mdi-silverware-fork-knife"
          >
            {{ ing }}
          </VChip>
        </div>
      </div>

      <div class="col-12">
        <VTextarea
          v-model="local.instruction"
          label="Préparation"
          variant="outlined"
          rows="3"
          auto-grow
          clearable
          prepend-inner-icon="mdi-text"
        />
      </div>

      <div class="col-12 d-flex gap-2 justify-content-end">
        <VBtn color="accent" variant="outlined" @click="onCancel">Annuler</VBtn>
        <VBtn color="primary" variant="outlined" :disabled="!isDirty" @click="onReset">
          <VIcon start>mdi-refresh</VIcon> Reset
        </VBtn>
        <VBtn color="primary" variant="outlined" :disabled="!isDirty" @click="onSubmit">
          <VIcon start>mdi-content-save</VIcon> Enregistrer
        </VBtn>
      </div>
    </div>
  </VForm>

  <BaseDialog
    v-model="openDialog"
    title="Quitter sans enregistrer ?"
    ok-text="Oui, quitter"
    cancel-text="Non, je reste"
    persistent
    @confirm="onConfirm"
  >
    <template #default>
      Vous êtes sur le point de quitter sans sauvegarder vos modifications.<br />
      <strong>Les changements non enregistrés seront perdus.</strong><br />
    </template>
  </BaseDialog>
</template>

<script setup lang="ts">
import { categories, tagItems } from "@/data/categoriesData";
import type { DrinkDto } from "@/models/drink";
import type { Mode } from "@/models/utils";
import { ref, reactive, watch, computed, onMounted } from "vue";
import type { VForm } from "vuetify/components";
import BaseDialog from "../common/BaseDialog.vue";

const props = defineProps<{ modelValue: DrinkDto; mode: Mode }>();
const emit = defineEmits<{
  (e: "update:modelValue", v: DrinkDto): void;
  (e: "submit", v: DrinkDto): void;
  (e: "cancel"): void;
}>();

const formRef = ref<InstanceType<typeof VForm> | null>(null);
const local = reactive<DrinkDto>({ ...props.modelValue });
const categoryItems = computed(() => categories.filter((c) => c.key !== "ALL"));

const initialJson = ref<string>("");
const isDirty = computed(() => initialJson.value !== JSON.stringify(local));
onMounted(() => {
  initialJson.value = JSON.stringify(local);
});
const openDialog = ref(false);
const ingredientNew = ref("");

watch(
  () => props.modelValue,
  (v) => Object.assign(local, v),
  { deep: true }
);
watch(local, (v) => emit("update:modelValue", { ...v }), { deep: true });

const rules = {
  required: [(v: any) => !!v || "Requis"],
  number: [(v: any) => v === null || v === "" || Number(v) >= 0 || "≥ 0 requis"],
  urlOptional: [
    (v: any) => {
      if (!v) return true;
      try {
        new URL(v);
        return true;
      } catch {
        return "URL invalide";
      }
    },
  ],
  ingredients: [(v: string[]) => (v?.length ?? 0) > 0 || "Au moins 1 ingrédient"],
};

function normalizeIngredient(s: string) {
  const t = (s || "").trim();
  if (!t) return "";
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function addIngredient() {
  const v = normalizeIngredient(ingredientNew.value);
  if (!v) return;
  if (!local.ingredients.includes(v)) local.ingredients.push(v);
  ingredientNew.value = "";
}

function clearIngredients() {
  local.ingredients = [];
}

function removeIngredient(i: number) {
  local.ingredients.splice(i, 1);
}

function onCancel() {
  if (isDirty.value) {
    openDialog.value = true;
  } else {
    Object.assign(local, JSON.parse(initialJson.value));
    emit("cancel");
  }
}

function onConfirm() {
  Object.assign(local, JSON.parse(initialJson.value));
  emit("cancel");
}

function onReset() {
  Object.assign(local, JSON.parse(initialJson.value));
}

async function onSubmit() {
  const r = await formRef.value?.validate();
  if (!r?.valid) {
    console.warn("Formulaire invalide");
    return;
  }
  initialJson.value = JSON.stringify(local);
  emit("submit", { ...local });
}
</script>
