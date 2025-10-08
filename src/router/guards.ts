import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const requiresAuth = async (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const auth = useAuthStore();
  const user = useUserStore();
  if (auth.token && !user.me) {
    try {
      await user.fetchMe();
    } catch {
      auth.logout();
      return next({ name: "login", query: { redirect: to.fullPath } });
    }
  }

  if (!auth.token) {
    return next({ name: "login", query: { redirect: to.fullPath } });
  }
  next();
};

export const requiresAdmin = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const user = useUserStore();
  if (!(user.isAdmin || user.isBarman)) {
    return next({ name: "forbidden" });
  }
  next();
};

export const guestOnly = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  console.log("GUEST ONLY");

  const auth = useAuthStore();
  if (auth.isAuthenticated) {
    return next({ name: "home" });
  }
  next();
};
