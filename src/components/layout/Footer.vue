<template>
  <footer class="footer-bar py-4 mt-auto w-100">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center flex-column flex-md-row">
        <div class="mb-2 mb-md-0">
          <v-icon color="accent" class="me-2">mdi-glass-cocktail</v-icon>
          <strong>The Bar App</strong> – “Un dernier pour la route ?”
        </div>
        <div class="small">
          © 2025 The Bar App · <span class="fst-italic">“Drink responsibly”</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
//
</script>

<style scoped>
.footer-bar {
  background-color: var(--nav-bg);
  border-top: 1px solid var(--nav-border);
}
</style>
