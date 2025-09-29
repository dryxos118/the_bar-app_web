<template>
  <h1>RegisterView</h1>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
const password = ref("");

const rules = {
  email: [
    (v: string) => !!v || "Email requis",
    (v: string) => /^\S+@\S+\.\S+$/.test(v) || "Format email invalide",
  ],
  password: [
    (v: string) => !!v || "Mot de passe requis",
    (v: string) => v.length >= 8 || "Au moins 8 caractères",
    (v: string) => /[a-z]/.test(v) || "1 minuscule",
    (v: string) => /[A-Z]/.test(v) || "1 majuscule",
    (v: string) => /\d/.test(v) || "1 chiffre",
    (v: string) => /[^A-Za-z0-9]/.test(v) || "1 caractère spécial",
  ],
};

const pwdScore = computed(() => {
  const v = password.value;
  let score = 0;
  if (v.length >= 8) score++;
  if (/[a-z]/.test(v)) score++;
  if (/[A-Z]/.test(v)) score++;
  if (/\d/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;

  const percent = (score / 5) * 100;
  const label = ["Très faible", "Faible", "Moyen", "Bon", "Fort"][Math.max(0, score - 1)];
  const colorClass = percent < 40 ? "text-error" : percent < 70 ? "text-warning" : "text-success";

  return { percent, label, colorClass };
});
</script>
