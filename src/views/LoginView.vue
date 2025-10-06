<template>
  <div class="d-flex h-75 justify-content-center align-items-center">
    <AuthCard message="Connecte-toi pour accéder au comptoir">
      <LoginFrom />
    </AuthCard>
  </div>
</template>

<script setup lang="ts">
import AuthCard from "@/components/auth/AuthCard.vue";
import LoginFrom from "@/components/auth/LoginFrom.vue";
</script>
