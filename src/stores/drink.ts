import { defineStore } from "pinia";
import {
  type DrinkCategory,
  type DrinkDto,
  type DrinkSortBy,
  type DrinkSortDirection,
  type DrinkTag,
} from "@/models/drink";
import { drinkService } from "@/logic/services/drinkService";
import { useUserStore } from "./user";

interface DrinkState {
  all: DrinkDto[];
  loading: boolean;
  loaded: boolean;
  //* FILTERS
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

function compareValues(a: string | number, b: string | number, dir: DrinkSortDirection) {
  const mult = dir === "ASC" ? 1 : -1;
  if (a < b) return -1 * mult;
  if (a > b) return 1 * mult;
  return 0;
}

export const useDrinkStore = defineStore("drink", {
  state: (): DrinkState => ({
    all: [],
    loading: false,
    loaded: false,
    //* FILTERS
    search: "",
    category: "ALL",
    tags: [],
    showOutOfStock: false,
    sortBy: "NAME",
    sortDirection: "ASC",
    priceRange: null,
    favorites: false,
    alcoholOnly: false,
  }),
  getters: {
    //** FILTERED
    filtered(state): DrinkDto[] {
      let list = state.all;
      //* CATEGORY
      if (state.category !== "ALL") {
        list = list.filter((d) => d.category === state.category);
      }
      //* TAGS
      if (state.tags.length) {
        const selected = state.tags;
        list = list.filter((d) => {
          const dTags = d.tags ?? [];
          return selected.some((tag) => dTags.includes(tag));
        });
      }
      //* STOCK
      if (!state.showOutOfStock) {
        list = list.filter((d) => !d.outOfStock);
      }
      //* PRICE
      if (state.priceRange) {
        const [min, max] = state.priceRange;
        list = list.filter((d) => d.price >= min && d.price <= max);
      }
      //* ALCOHOL
      if (state.alcoholOnly) {
        list = list.filter((d) => d.hasAlcohol);
      }
      //* FAVORITE
      if (state.favorites) {
        const user = useUserStore();
        list = list.filter((d) => user.isFavorite(d.id));
      }
      //* SEARCH
      const q = state.search.trim().toLowerCase();
      if (q) {
        list = list.filter((d) => {
          const inName = d.name.toLowerCase().includes(q);
          const inIngr = (d.ingredients ?? []).some((i) => i?.toLowerCase?.().includes(q));
          return inName || inIngr;
        });
      }
      //* SORT
      return [...list].sort((a, b) => {
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
          case "CATEGORY":
            va = a.category;
            vb = b.category;
            break;
        }
        return compareValues(va, vb, state.sortDirection);
      });
    },
    //* BY ID
    byId: (state) => (id: number) => state.all.find((d) => d.id === id) ?? null,
  },
  actions: {
    //* FETCH ALL
    async fetchAll(force = false) {
      if (this.loading) return;
      if (this.loaded && !force) return;
      this.loading = true;
      try {
        const data = await drinkService.getAll();
        this.all = data;
        this.loaded = true;
      } finally {
        await new Promise((r) => setTimeout(r, 1000));
        this.loading = false;
      }
    },
    //* CREATE
    async create(payload: Partial<DrinkDto>) {
      const created = await drinkService.create(payload);
      this.all.unshift(created);
      return created;
    },
    //* REPLACE
    async replace(id: number, payload: DrinkDto) {
      const updated = await drinkService.replace(id, payload);
      const i = this.all.findIndex((d) => d.id === id);
      if (i >= 0) {
        this.all[i] = updated;
      } else {
        this.all.push(updated);
      }
      return updated;
    },
    //* UPDATE
    async update(id: number, payload: Partial<DrinkDto>) {
      const updated = await drinkService.update(id, payload);
      const i = this.all.findIndex((d) => d.id === id);
      if (i >= 0) {
        this.all[i] = updated;
      } else {
        this.all.push(updated);
      }
      return updated;
    },
    //* REMOVE
    async remove(id: number) {
      await drinkService.delete(id);
      this.all = this.all.filter((d) => d.id !== id);
    },
    //* RESET FILTER
    resetFilter() {
      this.search = "";
      this.category = "ALL";
      this.priceRange = null;
      this.sortBy = "NAME";
      this.sortDirection = "ASC";
      this.tags = [];
      this.showOutOfStock = false;
      this.favorites = false;
      this.alcoholOnly = false;
    },
    //* SET SORT
    setSort(by: DrinkSortBy, dir: DrinkSortDirection) {
      this.sortBy = by;
      this.sortDirection = dir;
    },
    //* RESET
    $reset() {
      this.all = [];
      this.loading = false;
      this.loaded = false;
      this.resetFilter();
    },
  },
});
