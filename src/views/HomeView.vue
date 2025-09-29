<template>
  <v-btn color="accent" @click="show = true">Choisir une option</v-btn>

  <BaseDialog
    v-model="show"
    title="Choisissez une option"
    :show-actions="true"
    ok-text="OK"
    cancel-text="Annuler"
    :loading="loading"
    persistent
    @confirm="onConfirm"
  >
    <template #title-prefix>
      <v-icon>mdi-glass-cocktail</v-icon>
    </template>
    <template #default>
      <v-radio-group v-model="selected">
        <v-radio label="Mojito" value="🍹 Mojito" />
        <v-radio label="Bière" value="🍺 Bière" />
        <v-radio label="Eau" value="💧 Eau" />
      </v-radio-group>
    </template>
    <template #actions="{ confirm, cancel }">
      <v-btn variant="text" @click="cancel()">Annuler</v-btn>
      <v-btn color="primary" :disabled="!selected" @click="confirm(selected)">OK</v-btn>
    </template>
  </BaseDialog>

  <div v-if="selected" class="mt-4">
    ✅ Vous avez choisi : <strong>{{ selected }}</strong>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseDialog from "@/components/dialog/BaseDialog.vue";

const show = ref(false);
const loading = ref(false);
const selected = ref<string | null>("🍹 Mojito");

function onConfirm(value?: string) {
  selected.value = value ?? null;
  show.value = false;
  console.log("Valeur reçue :", value);
}
</script>
