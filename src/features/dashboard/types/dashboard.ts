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
  value: string;
  change: string;
  changePercent: string;
  trend: TrendDirection;
}

export interface Holding {
  id: string;
  companyName: string;
  ticker: string;
  logoText: string;
  logoTone: "navy" | "black" | "blue" | "teal";
  sparkline: number[];
  lastPrice: string;
  dailyChangePercent: string;
  dailyTrend: TrendDirection;
  investedValue: string;
  quantity: string;
  averagePrice: string;
  currentValue: string;
  totalGain: string;
  totalGainPercent: string;
  totalTrend: TrendDirection;
}
