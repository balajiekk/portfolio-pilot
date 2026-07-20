import { holdings, kpis, marketIndices } from "../data/portfolioData";
import type { PortfolioSnapshot } from "../types/dashboard";

let cachedSnapshot: PortfolioSnapshot | null = null;
let pendingSnapshot: Promise<PortfolioSnapshot> | null = null;

export function fetchPortfolioSnapshot() {
  if (cachedSnapshot) {
    return Promise.resolve(cachedSnapshot);
  }

  if (!pendingSnapshot) {
    pendingSnapshot = new Promise<PortfolioSnapshot>((resolve) => {
      window.setTimeout(() => {
        cachedSnapshot = {
          holdings,
          kpis,
          marketIndices,
        };
        resolve(cachedSnapshot);
        pendingSnapshot = null;
      }, 220);
    });
  }

  return pendingSnapshot;
}
