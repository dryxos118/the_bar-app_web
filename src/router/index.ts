import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { guestOnly, requiresAdmin, requiresAuth } from "./guards";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
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
