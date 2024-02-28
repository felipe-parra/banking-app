export const FormatNumber = (amount: number, currency: string) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
