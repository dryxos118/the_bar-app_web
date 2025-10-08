<template>
  <div class="d-flex h-75 justify-content-center align-items-center">
    <AuthCard message="Connecte-toi pour accéder au comptoir">
      <LoginForm />
    </AuthCard>
  </div>
</template>

<script setup lang="ts">
import AuthCard from "@/components/auth/AuthCard.vue";
import LoginForm from "@/components/auth/LoginForm.vue";
</script>
