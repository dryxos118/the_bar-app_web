<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
    <div v-for="drink in drinks" :key="drink.id" class="col">
      <AdminDrinkCard :drink="drink" @preview="onPreview" @edit="onEdit" @delete="onDelete" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DrinkDto } from "@/models/drink";
import AdminDrinkCard from "./AdminDrinkCard.vue";

const props = defineProps<{ drinks: DrinkDto[] }>();
const emit = defineEmits<{
  (e: "edit", id: number): void;
  (e: "preview", name: string): void;
  (e: "delete", id: number, name: string): void;
}>();

function onPreview(name: string) {
  emit("preview", name);
}

function onEdit(id: number) {
  emit("edit", id);
}

function onDelete(id: number, name: string) {
  emit("delete", id, name);
}
</script>
