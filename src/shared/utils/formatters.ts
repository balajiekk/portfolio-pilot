import type { TrendDirection } from "../types/portfolio";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const sharesFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 8,
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatCurrency(value: number, options: { signed?: boolean } = {}) {
  const prefix = options.signed && value > 0 ? "+" : "";

  return `${prefix}${currencyFormatter.format(value)}`;
}

export function formatNumber(value: number, options: { signed?: boolean } = {}) {
  const prefix = options.signed && value > 0 ? "+" : "";

  return `${prefix}${numberFormatter.format(value)}`;
}

export function formatPercent(value: number, options: { signed?: boolean } = {}) {
  const prefix = options.signed && value > 0 ? "+" : "";

  return `${prefix}${percentFormatter.format(value)}%`;
}

export function formatShares(value: number) {
  return sharesFormatter.format(value);
}

/** Large monetary values abbreviated to K/M/B/T, e.g. $3.6T market cap. */
export function formatCompactCurrency(value: number) {
  return compactCurrencyFormatter.format(value);
}

/** Single source of truth for up/down direction: derived from the value's sign. */
export function trendOf(value: number): TrendDirection {
  return value >= 0 ? "up" : "down";
}
