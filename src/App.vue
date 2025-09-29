<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useThemeStore } from "./stores/theme";
import { useTheme } from "vuetify";

const vtheme = useTheme();
const theme = useThemeStore();

onMounted(() => {
  theme.init();
  vtheme.change(theme.current);
});

watch(
  () => theme.current,
  (val) => {
    vtheme.global.name.value = val;
  }
);
</script>
