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
