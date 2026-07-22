export type DividendSector =
  | "Financials"
  | "Energy"
  | "Utilities"
  | "REIT"
  | "Consumer"
  | "Healthcare";

export type MinYieldFilter = "Any" | "4%+" | "6%+" | "8%+";

export type DividendSort = "Highest Yield" | "Highest Annual Dividend" | "Market Cap";

export interface DividendFiltersState {
  sector: DividendSector | "All";
  minYield: MinYieldFilter;
  sort: DividendSort;
}

export interface DividendStock {
  id: string;
  ticker: string;
  companyName: string;
  logoText: string;
  logoTone: "navy" | "black" | "blue" | "teal";
  sector: DividendSector;
  price: number;
  /** Signed daily change, e.g. -0.42. */
  dailyChangePercent: number;
  dividendYieldPercent: number;
  /** Annual dividend paid per share, in dollars. */
  annualDividend: number;
  marketCap: number;
}
