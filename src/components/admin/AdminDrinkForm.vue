<template>
  <VForm ref="formRef" @submit.prevent="onSubmit">
    <div class="row g-3">
      <div class="col-12 col-md-6">
        <VTextField
          v-model="local.name"
          :readonly="readonly"
          label="Nom"
          variant="outlined"
          :rules="rules.required"
        />
      </div>
      <div class="col-6 col-md-3">
        <VTextField
          v-model.number="local.price"
          :readonly="readonly"
          label="Prix (€)"
          type="number"
          min="0"
          step="0.1"
          variant="outlined"
          :rules="rules.number"
        />
      </div>
      <div class="col-6 col-md-3">
        <VSelect
          v-model="local.category"
          item-title="label"
          item-value="key"
          :readonly="readonly"
          :items="categoryKeys"
          label="Catégorie"
          variant="outlined"
          :rules="rules.required"
        />
      </div>

      <div class="col-6 col-md-3">
        <VSwitch v-model="local.hasAlcohol" :disabled="readonly" inset label="Alcool" />
      </div>
      <div class="col-6 col-md-3">
        <VSwitch v-model="local.outOfStock" :disabled="readonly" inset label="Rupture" />
      </div>

      <div class="col-12">
        <VTextField
          v-model="local.image"
          :readonly="readonly"
          label="URL image"
          variant="outlined"
        />
      </div>

      <div class="col-12">
        <VTextarea
          v-model="local.instruction"
          :readonly="readonly"
          label="Préparation"
          variant="outlined"
          rows="3"
          auto-grow
        />
      </div>

      <div v-if="!readonly" class="col-12 d-flex gap-2 justify-content-end">
        <VBtn variant="text" @click="$emit('cancel')">Annuler</VBtn>
        <VBtn color="primary" variant="outlined" @click="onSubmit">
          <VIcon start>mdi-content-save</VIcon> Enregistrer
        </VBtn>
      </div>
    </div>
  </VForm>
</template>

<script setup lang="ts">
import { categories } from "@/data/categoriesData";
import type { DrinkDto } from "@/models/drink";
import { ref, reactive, watch, computed } from "vue";
import type { VForm } from "vuetify/components";

const props = defineProps<{ modelValue: DrinkDto; readonly?: boolean }>();
const emit = defineEmits<{
  (e: "update:modelValue", v: DrinkDto): void;
  (e: "submit", v: DrinkDto): void;
  (e: "cancel"): void;
}>();

const formRef = ref<InstanceType<typeof VForm> | null>(null);
const local = reactive<DrinkDto>({ ...props.modelValue });

const categoryKeys = computed(() => categories.filter((c) => c.key !== "ALL"));

watch(
  () => props.modelValue,
  (v) => Object.assign(local, v),
  { deep: true }
);
watch(local, (v) => emit("update:modelValue", { ...v }), { deep: true });

const rules = {
  required: [(v: string) => !!v || "Requis"],
  number: [(v: any) => v === null || v === "" || Number(v) >= 0 || "≥ 0 requis"],
};

async function onSubmit() {
  const isOk = await formRef.value?.validate();
  if (isOk?.valid) {
    console.log("FORM INVALIDE");
    return;
  }
  console.log("submit");
  emit("submit", { ...local });
}
</script>
