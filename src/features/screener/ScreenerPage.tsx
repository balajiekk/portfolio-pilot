import { useEffect, useMemo, useState } from "react";

import ScreenerFilters from "./components/ScreenerFilters";
import ScreenerList from "./components/ScreenerList";
import StockDetailPanel from "./components/StockDetailPanel";
import { screenerStocks } from "./data/screenerData";
import type { PeFilter, ScreenerFiltersState, ScreenerStock } from "./types/screener";

const defaultFilters: ScreenerFiltersState = {
  sector: "All",
  marketCap: "Any",
  pe: "Any",
  sort: "Top Gainers",
};

function matchesPeFilter(stock: ScreenerStock, peFilter: PeFilter) {
  if (peFilter === "Under 25") {
    return stock.peRatio < 25;
  }

  if (peFilter === "25-40") {
    return stock.peRatio >= 25 && stock.peRatio <= 40;
  }

  if (peFilter === "40+") {
    return stock.peRatio > 40;
  }

  return true;
}

function sortStocks(stocks: ScreenerStock[], sort: ScreenerFiltersState["sort"]) {
  return [...stocks].sort((firstStock, secondStock) => {
    if (sort === "Market Cap") {
      return secondStock.marketCapValue - firstStock.marketCapValue;
    }

    if (sort === "Lowest P/E") {
      return firstStock.peRatio - secondStock.peRatio;
    }

    return secondStock.returnValue - firstStock.returnValue;
  });
}

export default function ScreenerPage() {
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedStockId, setSelectedStockId] = useState(screenerStocks[0].id);

  const visibleStocks = useMemo(() => {
    const filteredStocks = screenerStocks.filter((stock) => {
      const matchesSector = filters.sector === "All" || stock.sector === filters.sector;
      const matchesMarketCap =
        filters.marketCap === "Any" || stock.marketCapBucket === filters.marketCap;

      return matchesSector && matchesMarketCap && matchesPeFilter(stock, filters.pe);
    });

    return sortStocks(filteredStocks, filters.sort).slice(0, 10);
  }, [filters]);

  useEffect(() => {
    if (!visibleStocks.some((stock) => stock.id === selectedStockId)) {
      setSelectedStockId(visibleStocks[0]?.id ?? screenerStocks[0].id);
    }
  }, [selectedStockId, visibleStocks]);

  const selectedStock =
    visibleStocks.find((stock) => stock.id === selectedStockId) ?? visibleStocks[0] ?? screenerStocks[0];

  return (
    <section className="screener-page" aria-labelledby="screener-page-title">
      <div className="screener-page__header">
        <span>Screener</span>
        <h1 id="screener-page-title">Top 10 Stocks</h1>
      </div>

      <ScreenerFilters filters={filters} onChange={setFilters} />

      <div className="screener-split">
        <ScreenerList
          stocks={visibleStocks}
          selectedStockId={selectedStock.id}
          onSelectStock={setSelectedStockId}
        />
        <StockDetailPanel stock={selectedStock} />
      </div>
    </section>
  );
}
