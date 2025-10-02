import type { DrinkCategory } from "@/models/drink";

export const categories: Array<{
  key: DrinkCategory;
  label: string;
  short: string;
  description: string;
  icon: string;
}> = [
  {
    key: "COCKTAIL",
    label: "Cocktails",
    short: "les cocktails",
    description: "Classiques & créations.",
    icon: "mdi-glass-cocktail",
  },
  {
    key: "MOCKTAIL",
    label: "Mocktails",
    short: "les mocktails",
    description: "Sans alcool, mêmes saveurs.",
    icon: "mdi-glass-cocktail",
  },
  {
    key: "BEER",
    label: "Bières",
    short: "les bières",
    description: "Pressions et artisanales.",
    icon: "mdi-beer",
  },
  {
    key: "WINE",
    label: "Vins",
    short: "les vins",
    description: "Rouges, blancs, rosés & bulles.",
    icon: "mdi-glass-wine",
  },
  {
    key: "SHOT",
    label: "Shots",
    short: "les shots",
    description: "Format court, effet immédiat.",
    icon: "mdi-cup",
  },
  {
    key: "SPIRIT",
    label: "Spiritueux",
    short: "les spiritueux",
    description: "Whisky, rhum, gin, tequila…",
    icon: "mdi-bottle-wine",
  },
  {
    key: "SOFT",
    label: "Softs",
    short: "les softs",
    description: "Sodas, jus, eaux, mixers.",
    icon: "mdi-bottle-soda-classic",
  },
  {
    key: "OTHER",
    label: "Autres",
    short: "le reste",
    description: "Tout ce qui ne rentre pas ailleurs.",
    icon: "mdi-dots-horizontal-circle",
  },
  {
    key: "ALL",
    label: "Toutes les boissons",
    short: "tout",
    description: "Explorez l’intégralité de la carte.",
    icon: "mdi-infinity",
  },
];
