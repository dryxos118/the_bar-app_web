<template>
  <VForm ref="form" v-model="isValid" @submit.prevent="onSubmit">
    <div class="row g-3">
      <div class="col-12">
        <VTextField
          v-model="username"
          :rules="rules.username"
          label="Nom d'utilisateur"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          hide-details="auto"
          :loading="loading"
        />
      </div>
      <div class="col-12">
        <VTextField
          v-model="email"
          :rules="rules.email"
          label="Email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          hide-details="auto"
          :disabled="loading"
        />
      </div>
      <div class="col-12">
        <VTextField
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          :rules="rules.password"
          label="Mot de passe"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          hide-details="auto"
          :disabled="loading"
        />
      </div>
      <div class="col-12">
        <VBtn
          type="submit"
          block
          color="primary"
          size="large"
          :loading="loading"
          :disabled="!isValid || loading"
        >
          <template #loader>
            <VProgressCircular indeterminate size="22" />
          </template>
          S'inscrire
        </VBtn>
      </div>
    </div>
  </VForm>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useSnackbar } from "@/stores/snackbar";
import { ref } from "vue";
import type { VForm } from "vuetify/components";

const auth = useAuthStore();
const snackbar = useSnackbar();

const form = ref<InstanceType<typeof VForm> | null>(null);
const isValid = ref(false);
const username = ref("");
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);

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
  username: [(v: string) => !!v || "Nom d'utilisateur requis"],
};

async function onSubmit() {
  const isOk = await form.value?.validate();
  if (!isOk?.valid) return;

  try {
    loading.value = true;
    await auth.register({
      username: username.value,
      email: email.value,
      password: password.value,
      role: "USER",
    });
    snackbar.trigger("Inscription réussie ! Bienvenue parmi les habitués", "success");
  } catch (e: any) {
    snackbar.trigger(e?.message ?? "", "error");
  } finally {
    loading.value = false;
  }
}
</script>
