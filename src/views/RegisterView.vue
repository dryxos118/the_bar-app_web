<template>
  <div class="d-flex h-75 justify-content-center align-items-center">
    <VCard class="p-4 w-md-50" elevation="10" rounded="xl">
      <div class="d-flex align-center justify-space-between mb-4">
        <div class="d-flex align-center gap-3">
          <VAvatar size="48" class="bar-avatar">
            <VIcon>mdi-glass-cocktail</VIcon>
          </VAvatar>
          <div>
            <h1 class="text-h5 mb-1">The Bar App</h1>
            <p class="text-body-2 text-medium-emphasis m-0">Inscris toi pour accéder au comptoir</p>
          </div>
        </div>
      </div>
      <VDivider />
      <VForm ref="formRef" v-model="isValid" @submit.prevent="onSubmit">
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
            <VExpandTransition>
              <div v-if="password" class="d-flex align-center mt-2" aria-live="polite">
                <v-progress-linear
                  :model-value="pwdScore.percent"
                  height="8"
                  rounded
                  class="flex-grow-1"
                />
                <span class="ms-3 text-caption" :class="pwdScore.colorClass">
                  {{ pwdScore.label }}
                </span>
              </div>
            </VExpandTransition>
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
    </VCard>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useSnackbar } from "@/stores/snackbar";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { VForm } from "vuetify/components";

const formRef = ref<InstanceType<typeof VForm> | null>(null);
const isValid = ref(false);
const username = ref("");
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);

const auth = useAuthStore();
const snackbar = useSnackbar();
const router = useRouter();

async function onSubmit() {
  const ok = await formRef.value?.validate();
  if (!ok?.valid) return;
  try {
    loading.value = true;
    await auth.register({
      username: username.value,
      email: email.value,
      password: password.value,
      role: "USER",
    });
  } catch (e: any) {
    snackbar.trigger(e?.message ?? "Échec de l'authentification", "error");
  } finally {
    loading.value = false;
  }
}

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
