import { useCallback, useEffect, useState } from "react";

import { fetchPortfolioSnapshot } from "../services/portfolioService";
import type { PortfolioSnapshot } from "../types/dashboard";

interface PortfolioState {
  data: PortfolioSnapshot | null;
  error: Error | null;
  isLoading: boolean;
}

export function usePortfolio() {
  const [state, setState] = useState<PortfolioState>({
    data: null,
    error: null,
    isLoading: true,
  });

  const loadPortfolio = useCallback(() => {
    let isActive = true;

    setState((current) => ({
      ...current,
      error: null,
      isLoading: !current.data,
    }));

    fetchPortfolioSnapshot()
      .then((data) => {
        if (isActive) {
          setState({ data, error: null, isLoading: false });
        }
      })
      .catch((error: unknown) => {
        if (isActive) {
          setState({
            data: null,
            error: error instanceof Error ? error : new Error("Unable to load portfolio data."),
            isLoading: false,
          });
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => loadPortfolio(), [loadPortfolio]);

  return {
    ...state,
    refetch: loadPortfolio,
  };
}
