import AuthLayout from "@/layouts/AuthLayout.vue";
import DefaultLayout from "@/layouts/AppLayout.vue";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import DrinksView from "@/views/DrinksView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import NotFoundView from "@/views/error/NotFoundView.vue";
import OrderView from "@/views/OrderView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import AdminView from "@/views/admin/AdminView.vue";
import AdminDrinksView from "@/views/admin/AdminDrinksView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", name: "home", component: HomeView },
      { path: "drinks", name: "drinks", component: DrinksView },
      { path: "order", name: "order", component: OrderView },
      { path: "admin", name: "admin", component: AdminView, meta: { requiresAdmin: true } },
      {
        path: "admin/drinks",
        name: "adminDrinks",
        component: AdminDrinksView,
        meta: { requiresAdmin: true },
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    component: AuthLayout,
    children: [
      { path: "login", name: "login", component: LoginView },
      { path: "register", name: "register", component: RegisterView },
    ],
    meta: { guestOnly: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  const user = useUserStore();

  if (auth.token && !user.$state.me) {
    try {
      await user.fetchMe();
    } catch {
      auth.logout();
    }
  }
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: "login", query: { redirect: to.fullPath } };
  }
  if (to.meta.requiresAdmin && !(user.isAdmin || user.isBarman)) {
    return { name: "forbidden" };
  }
  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: "home" };
  }
});

export default router;
