import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { guestOnly, requiresAdmin, requiresAuth } from "./guards";
import type { Mode } from "@/models/utils";

const routes: RouteRecordRaw[] = [
  {
    path: "/auth",
    component: () => import("@/layout/PublicLayout.vue"),
    beforeEnter: guestOnly,
    children: [
      { path: "login", name: "login", component: () => import("@/views/auth/LoginView.vue") },
      {
        path: "register",
        name: "register",
        component: () => import("@/views/auth/RegisterView.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layout/PrivateLayout.vue"),
    beforeEnter: requiresAuth,
    children: [
      { path: "", name: "home", component: () => import("@/views/HomeView.vue") },
      { path: "drinks", name: "drinks", component: () => import("@/views/DrinksView.vue") },
      { path: "orders", name: "orders", component: () => import("@/views/OrdersView.vue") },
    ],
  },
  {
    path: "/admin",
    component: () => import("@/layout/PrivateLayout.vue"),
    beforeEnter: [requiresAuth, requiresAdmin],
    children: [
      { path: "", name: "admin", component: () => import("@/views/admin/AdminHomeView.vue") },
      {
        path: "drinks",
        name: "admin-drinks",
        component: () => import("@/views/admin/AdminDrinksView.vue"),
      },
      {
        path: "drinks/update/:id?",
        name: "admin-drinks-update",
        component: () => import("@/views/admin/AdminUpdateDrinksView.vue"),
        props: (r) => {
          const id = r.params.id ? Number(r.params.id) : undefined;
          const mode = (r.query.mode as Mode) || (id ? "EDIT" : "CREATE");
          return { id, mode };
        },
      },
      {
        path: "users",
        name: "admin-users",
        component: () => import("@/views/admin/AdminUsersView.vue"),
      },
    ],
  },
  {
    path: "/forbidden",
    name: "forbidden",
    component: () => import("@/views/error/ForbiddenView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/error/NotFoundView.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
