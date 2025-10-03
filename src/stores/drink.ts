import { defineStore } from "pinia";
import { http } from "@/plugins/http";
import type {
  DrinkCategory,
  DrinkDto,
  DrinkSortBy,
  DrinkSortDirection,
  DrinkTag,
} from "@/models/drink";
import { useUserStore } from "./user";

interface DrinkState {
  // data
  all: DrinkDto[];
  loading: boolean;
  loaded: boolean;
  // filters
  search: string;
  category: DrinkCategory;
  tags: DrinkTag[];
  showOutOfStock: boolean;
  sortBy: DrinkSortBy;
  sortDirection: DrinkSortDirection;
  priceRange: [number, number] | null;
  favorites: boolean;
  alcoholOnly: boolean;
}

export const useDrinkStore = defineStore("drink", {
  state: (): DrinkState => ({
    all: [],
    loading: false,
    loaded: false,
    // filter
    search: "",
    category: "ALL",
    tags: [],
    showOutOfStock: false,
    sortBy: "NAME",
    sortDirection: "DESC",
    priceRange: null,
    favorites: false,
    alcoholOnly: false,
  }),
  getters: {
    filtered(state) {
      let list = state.all;
      if (state.category !== "ALL") {
        list = list.filter((d) => d.category === state.category);
      }
      if (state.tags.length) {
        const selected = state.tags;
        list = list.filter((d) => {
          const dTags = d.tags ?? [];
          return selected.some((tag) => dTags.includes(tag));
        });
      }
      if (!state.showOutOfStock) {
        list = list.filter((d) => !d.outOfStock);
      }
      if (state.priceRange) {
        const [min, max] = state.priceRange;
        list = list.filter((d) => d.price >= min && d.price <= max);
      }
      if (state.alcoholOnly) {
        list = list.filter((d) => d.hasAlcohol);
      }
      if (state.favorites) {
        const user = useUserStore();
        list = list.filter((d) => user.isFavorite(d.id));
      }
      if (state.search.trim()) {
        list = list.filter(
          (d) =>
            d.name.toLowerCase().includes(state.search.toLowerCase()) ||
            d.ingredients.some((i) => i.toLowerCase().includes(state.search.toLowerCase()))
        );
      }
      return list.sort((a, b) => {
        let va: string | number = "";
        let vb: string | number = "";

        switch (state.sortBy) {
          case "NAME":
            va = a.name.toLowerCase();
            vb = b.name.toLowerCase();
            break;
          case "PRICE":
            va = a.price;
            vb = b.price;
            break;
        }

        const dir = state.sortDirection === "ASC" ? 1 : -1;

        if (va < vb) return -1 * dir;
        if (va > vb) return 1 * dir;
        return 0;
      });
    },
  },
  actions: {
    async fetchAll(force = false) {
      if (this.loading) return;
      if (this.loaded && !force) return;
      this.loading = true;
      try {
        const { data } = await http.get("/drinks/get/all");
        this.all = data;
        this.loaded = true;
      } finally {
        this.loading = false;
      }
    },
    resetFilter() {
      this.search = "";
      this.category = "ALL";
      this.priceRange = null;
      this.sortBy = "NAME";
      this.sortDirection = "DESC";
      this.tags = [];
      this.showOutOfStock = false;
    },
    setSort(by: DrinkSortBy, dir: DrinkSortDirection) {
      this.sortBy = by;
      this.sortDirection = dir;
    },
  },
});
