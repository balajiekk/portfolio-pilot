import type { EarningsEvent } from "../types/earnings";

/** Percentage by which reported EPS beat (positive) or missed (negative) the estimate. */
export function getSurprisePercent(event: EarningsEvent) {
  if (event.epsReported === null || event.epsEstimate === 0) {
    return null;
  }

  return ((event.epsReported - event.epsEstimate) / Math.abs(event.epsEstimate)) * 100;
}
