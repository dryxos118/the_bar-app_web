import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useRoute } from "vue-router";

export function useNavbar() {
  const route = useRoute();
  const isOpen = ref(false);
  const MOBILE_BP = 1000;
  const isMobile = ref(typeof window !== "undefined" ? window.innerWidth < MOBILE_BP : false);

  function isActive(path: string) {
    return route.path === path;
  }

  function toggleMenu() {
    isOpen.value = !isOpen.value;
  }

  function handleNavClick() {
    if (isMobile.value) isOpen.value = false;
  }

  function handleResize() {
    const m = window.innerWidth < MOBILE_BP;
    if (m !== isMobile.value) isMobile.value = m;
    if (!m && isOpen.value) isOpen.value = false;
  }

  onMounted(() => {
    window.addEventListener("resize", handleResize, { passive: true });
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
  });

  watch(
    () => route.fullPath,
    () => {
      if (window.innerWidth < MOBILE_BP) isOpen.value = false;
    }
  );

  return {
    route,
    isOpen,
    isMobile,
    isActive,
    toggleMenu,
    handleNavClick,
  };
}
