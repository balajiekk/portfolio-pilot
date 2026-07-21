export type ScreenerSector =
  | "Semiconductors"
  | "Healthcare"
  | "Consumer"
  | "Technology"
  | "Financials";

export type MarketCapBucket = "Mega" | "Large" | "Mid";

export type ScreenerSort = "Top Gainers" | "Market Cap" | "Lowest P/E";

export type PeFilter = "Any" | "Under 25" | "25-40" | "40+";

export interface ScreenerFiltersState {
  sector: ScreenerSector | "All";
  marketCap: MarketCapBucket | "Any";
  pe: PeFilter;
  sort: ScreenerSort;
}

export interface ScreenerStock {
  id: string;
  companyName: string;
  ticker: string;
  exchange: string;
  sector: ScreenerSector;
  marketCap: string;
  marketCapValue: number;
  marketCapBucket: MarketCapBucket;
  peRatio: number;
  price: string;
  dayChange: string;
  returnPercent: string;
  returnValue: number;
  range52Week: string;
  summary: string;
  initial: string;
}
