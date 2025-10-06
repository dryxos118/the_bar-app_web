<template>
  <div class="d-flex h-75 justify-content-center align-items-center">
    <AuthCard message="Inscris toi pour accéder au comptoir">
      <RegisterForm />
    </AuthCard>
  </div>
</template>

<script setup lang="ts">
import AuthCard from "@/components/auth/AuthCard.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";
</script>
