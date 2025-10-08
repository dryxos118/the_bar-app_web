export function normalizeError(error: any, fallback = "Erreur"): Error {
  console.log(error);
  return new Error(error?.response?.data?.message ?? error?.message ?? fallback);
}

export function formatPrice(num: number): string {
  try {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(num);
  } catch {
    return `${num.toFixed(2)} €`;
  }
}
