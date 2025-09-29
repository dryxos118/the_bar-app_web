<template>
  <div class="d-flex h-75 justify-content-center align-items-center">
    <VCard class="p-4 w-md-50" elevation="10" rounded="xl">
      <div class="d-flex align-center justify-space-between mb-4">
        <div class="d-flex align-center gap-3">
          <VAvatar size="48" class="bar-avatar">
            <v-icon>mdi-glass-cocktail</v-icon>
          </VAvatar>
          <div>
            <h1 class="text-h5 mb-1">The Bar App</h1>
            <p class="text-body-2 text-medium-emphasis m-0">
              Connecte-toi pour accéder au comptoir
            </p>
          </div>
        </div>
      </div>
      <VDivider />
      <VForm ref="formRef" v-model="isValid" @submit.prevent="onSubmit">
        <div class="row g-3">
          <div class="col-12">
            <VTextField
              v-model="email"
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
    </VCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useSnackbar } from "@/stores/snackbar";
import { useRoute, useRouter } from "vue-router";

const formRef = ref();
const isValid = ref(false);
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);

const rules = {
  email: [(v: string) => !!v || "Email ou Nom D'utilisateur requis"],
  password: [(v: string) => !!v || "Mot de passe requis"],
};

const auth = useAuthStore();
const snackbar = useSnackbar();
const route = useRoute();
const router = useRouter();

async function onSubmit() {
  const ok = await formRef.value?.validate();
  if (!ok?.valid) return;

  try {
    loading.value = true;
    await auth.login({ usernameOrEmail: email.value, password: password.value });
    const redirect = (route.query.redirect as string) ?? "/";
    await router.replace(redirect);
  } catch (e: any) {
    snackbar.trigger(e?.message ?? "Échec de l'authentification", "error");
  } finally {
    loading.value = false;
  }
}
</script>
