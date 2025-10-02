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

export type DrinkTags = "CLASSIC" | "SIGNATURE" | "NON_ALCOHOLIC";

export interface DrinkDto {
  id: number;
  name: string;
  category: DrinkCategory;
  tags: DrinkTags[];
  glass: string;
  image: string;
  price: number;
  instruction: string;
  hasAlcohol: boolean;
  outOfStock: boolean;
  ingredients: string[];
}
