<template>
  <VForm ref="form" v-model="isValid" @submit.prevent="onSubmit">
    <div class="row g-3">
      <div class="col-12">
        <VTextField
          v-model="usernameOrEmail"
          :rules="rules.email"
          label="Email ou Nom d'utilisateur"
          prepend-inner-icon="mdi-email-outline"
          autocomplete="email"
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
          required
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
          Se connecter
        </VBtn>
      </div>
    </div>
  </VForm>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useSnackbar } from "@/stores/snackbar";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { VForm } from "vuetify/components";

const auth = useAuthStore();
const snackbar = useSnackbar();
const route = useRoute();
const router = useRouter();

const form = ref<InstanceType<typeof VForm> | null>(null);
const isValid = ref(false);
const usernameOrEmail = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);

const rules = {
  email: [(v: string) => !!v || "Email ou Nom D'utilisateur requis"],
  password: [(v: string) => !!v || "Mot de passe requis"],
};

async function onSubmit() {
  const isOk = await form.value?.validate();
  if (!isOk?.valid) return;

  try {
    loading.value = true;
    await auth.login({ usernameOrEmail: usernameOrEmail.value, password: password.value });
    snackbar.trigger("Hop, te voilà connecté !", "success");
    const redirect = (route.query.redirect as string) ?? "/";
    await router.push(redirect);
  } catch (e: any) {
    snackbar.trigger(e?.message ?? "Impossible de t’ouvrir la porte du bar", "error");
  } finally {
    loading.value = false;
  }
}
</script>
