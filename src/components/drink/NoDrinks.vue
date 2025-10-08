<template>
  <div class="d-flex flex-column align-items-center justify-content-center text-center h-100 py-5">
    <VIcon :icon="randomIcon" size="64" color="amber" class="mb-5" />
    <h5 class="fw-bold mb-5">{{ randomMessage }}</h5>
    <p class="mb-5">
      Aucun cocktail ne correspond à vos filtres.<br />
      Essayez une autre combinaison ou enlevez un ingrédient.
    </p>
    <VBtn color="secondary" variant="elevated" prepend-icon="mdi-refresh" @click="$emit('reset')">
      Réinitialiser les filtres
    </VBtn>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

defineEmits<{ (e: "reset"): void }>();

const randomMessage = ref("");
const randomIcon = ref("");

onMounted(() => {
  const indexMsg = Math.floor(Math.random() * messages.length);
  const indexIcon = Math.floor(Math.random() * icons.length);

  randomMessage.value = messages[indexMsg];
  randomIcon.value = icons[indexIcon];
});

const messages = [
  "Le shaker est vide",
  "Aucun cocktail au comptoir",
  "Le fût est percé",
  "La cave est vide",
  "Pas de recette pour ce mélange",
  "Oups... tournée ratée",
];

const icons = [
  "mdi-glass-cocktail-off",
  "mdi-beer",
  "mdi-wine",
  "mdi-bottle-tonic-plus-outline",
  "mdi-emoticon-sad-outline",
  "mdi-cup-off",
];
</script>
