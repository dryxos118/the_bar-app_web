export type DrinkCategory =
  | "COCKTAIL"
  | "MOCKTAIL"
  | "BEER"
  | "WINE"
  | "SHOT"
  | "SPIRIT"
  | "SOFT"
  | "OTHER"
  | "ALL";

export type DrinkTag = "CLASSIC" | "SIGNATURE" | "NON_ALCOHOLIC";

export type DrinkSortBy = "NAME" | "PRICE" | "CATEGORY";

export type DrinkSortDirection = "ASC" | "DESC";

export interface DrinkDto {
  id?: number;
  name: string;
  category: DrinkCategory;
  tags: DrinkTag[];
  glass: string;
  image: string;
  price: number;
  instruction: string;
  hasAlcohol: boolean;
  outOfStock: boolean;
  ingredients: string[];
}
