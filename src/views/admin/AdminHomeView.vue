<template>
  <div class="container-fluid p-2 p-md-3">
    <AdminHeader title="Panneau d'administration">
      <VChip color="accent" variant="flat"> {{ userName }} : {{ userRole }} </VChip>
    </AdminHeader>

    <AdminHomeGrid @go-to="handleGoTo" />
  </div>
</template>

<script setup lang="ts">
import AdminHeader from "@/components/admin/AdminHeader.vue";
import AdminHomeGrid from "@/components/admin/AdminHomeGrid.vue";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";

const user = useUserStore();
const router = useRouter();

const userRole = computed(() => user.me?.role);
const userName = computed(() => user.me?.username);

const handleGoTo = (route: string) => {
  router.push(route);
};
</script>
