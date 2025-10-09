import type { DrinkSortBy, DrinkSortDirection } from "@/models/drink";

export type SortKey =
  | "NAME_ASC"
  | "NAME_DESC"
  | "PRICE_ASC"
  | "PRICE_DESC"
  | "CATEGORY_ASC"
  | "CATEGORY_DESC";

export const sortOptions: Array<{ title: string; value: SortKey }> = [
  { title: "Nom A→Z", value: "NAME_ASC" },
  { title: "Nom Z→A", value: "NAME_DESC" },
  { title: "Prix croissant", value: "PRICE_ASC" },
  { title: "Prix décroissant", value: "PRICE_DESC" },
  { title: "Catégorie A→Z", value: "CATEGORY_ASC" },
  { title: "Catégorie Z→A", value: "CATEGORY_DESC" },
];

export const toKey: Record<DrinkSortBy, Record<DrinkSortDirection, SortKey>> = {
  NAME: { ASC: "NAME_ASC", DESC: "NAME_DESC" },
  PRICE: { ASC: "PRICE_ASC", DESC: "PRICE_DESC" },
  CATEGORY: { ASC: "CATEGORY_ASC", DESC: "CATEGORY_DESC" },
};

export const fromKey: Record<SortKey, { by: DrinkSortBy; dir: DrinkSortDirection }> = {
  NAME_ASC: { by: "NAME", dir: "ASC" },
  NAME_DESC: { by: "NAME", dir: "DESC" },
  PRICE_ASC: { by: "PRICE", dir: "ASC" },
  PRICE_DESC: { by: "PRICE", dir: "DESC" },
  CATEGORY_ASC: { by: "CATEGORY", dir: "ASC" },
  CATEGORY_DESC: { by: "CATEGORY", dir: "DESC" },
};
