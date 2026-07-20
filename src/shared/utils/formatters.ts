const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(value: number, options: { signed?: boolean } = {}) {
  const prefix = options.signed && value > 0 ? "+" : "";

  return `${prefix}${currencyFormatter.format(value)}`;
}

export function formatPercent(value: number, options: { signed?: boolean } = {}) {
  const prefix = options.signed && value > 0 ? "+" : "";

  return `${prefix}${percentFormatter.format(value)}%`;
}

export function parseCurrency(value: string) {
  return Number(value.replace(/[$,+]/g, ""));
}

export function parsePercent(value: string) {
  return Number(value.replace(/[%,+]/g, ""));
}
