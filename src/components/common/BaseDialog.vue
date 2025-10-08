<template>
  <VDialog
    v-model="open"
    :max-width="maxWidth"
    :persistent="persistent"
    transition="dialog-bottom-transition"
    @after-leave="afterLeave"
  >
    <VCard :loading="loading" rounded="lg" elevation="2">
      <header class="px-4 pt-4 pb-2">
        <div class="d-flex align-items-center justify-content-between">
          <div class="text-h6 d-flex align-center gap-2">
            <slot name="title-prefix" />
            <span>{{ title }}</span>
          </div>
          <VBtn icon="mdi-close" variant="text" @click="close" />
        </div>
      </header>
      <VDivider />
      <section class="px-4 pb-2">
        <slot :confirm="confirm" :cancel="cancel" :close="close" />
      </section>
      <VDivider v-if="showActions" />
      <footer v-if="showActions" class="px-4 py-3 d-flex justify-end gap-2">
        <slot name="actions" :confirm="confirm" :cancel="cancel" :close="close" :loading="loading">
          <v-btn variant="text" :disabled="loading" @click="cancel">{{ cancelText }}</v-btn>
          <v-btn color="primary" :loading="loading" @click="confirm">{{ okText }}</v-btn>
        </slot>
      </footer>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title: string;

    showActions?: boolean;
    okText?: string;
    cancelText?: string;
    loading?: boolean;
    persistent?: boolean;
    maxWidth?: number | string;
  }>(),
  {
    title: "Titre de la boîte de dialogue",
    showActions: true,
    okText: "Valider",
    cancelText: "Annuler",
    loading: false,
    persistent: false,
    maxWidth: 480,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
  (e: "confirm", data?: any): void;
  (e: "cancel"): void;
  (e: "after-leave"): void;
}>();

const open = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit("update:modelValue", v),
});

function close() {
  open.value = false;
}
function cancel() {
  emit("cancel");
  close();
}
function confirm(data?: any) {
  emit("confirm", data);
}
function afterLeave() {
  emit("after-leave");
}
</script>
