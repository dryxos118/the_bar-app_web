export interface LinksData {
  route: string;
  name: string;
  icon: string;
}

export const connectedLinks: LinksData[] = [
  { route: "/", name: "Le Comptoir", icon: "mdi-home" },
  { route: "/drinks", name: "La Carte", icon: "mdi-glass-mug-variant" },
  { route: "/orders", name: "Ma Tournée", icon: "mdi-cash" },
];

export const notConnectedLinks: LinksData[] = [
  { route: "/login", name: "Déjà client ?", icon: "mdi-door-open" },
  { route: "/register", name: "Nouvelle tournée", icon: "mdi-party-popper" },
];
