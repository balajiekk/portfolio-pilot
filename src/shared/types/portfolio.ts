export type TrendDirection = "up" | "down";

export interface Kpi {
  id: number;
  title: string;
  value: string;
  change: string;
  positive: boolean;
}

export interface MarketIndex {
  id: string;
  name: string;
  /** Numeric domain values. Formatted for display at render time. */
  value: number;
  /** Signed day change in index points. */
  change: number;
  /** Signed day change as a percentage, e.g. -1.26. */
  changePercent: number;
}

export interface Holding {
  id: string;
  companyName: string;
  ticker: string;
  logoText: string;
  logoTone: "navy" | "black" | "blue" | "teal";
  sparkline: number[];
  /** All monetary/percent fields are raw numbers; format at render. */
  lastPrice: number;
  /** Signed daily change as a percentage, e.g. -0.92. */
  dailyChangePercent: number;
  investedValue: number;
  quantity: number;
  averagePrice: number;
  currentValue: number;
  /** Signed total gain in currency. */
  totalGain: number;
  /** Signed total gain as a percentage. */
  totalGainPercent: number;
}

export interface PortfolioSnapshot {
  holdings: Holding[];
  kpis: Kpi[];
  marketIndices: MarketIndex[];
}
