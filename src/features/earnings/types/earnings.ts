export type EarningsSession = "BMO" | "AMC" | "TNS";

export type EarningsSessionFilter = EarningsSession | "All";

export interface EarningsEvent {
  id: string;
  ticker: string;
  companyName: string;
  logoText: string;
  logoTone: "navy" | "black" | "blue" | "teal";
  /** ISO date, e.g. "2026-07-22". */
  date: string;
  session: EarningsSession;
  /** Analyst consensus EPS. */
  epsEstimate: number;
  /** Actual reported EPS; null until the session has occurred. */
  epsReported: number | null;
  marketCap: number;
}
