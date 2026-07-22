import { useMemo, useState } from "react";

import DividendFilters from "./components/DividendFilters";
import DividendTable from "./components/DividendTable";
import { dividendStocks } from "./data/dividendData";
import type { DividendFiltersState, DividendStock, MinYieldFilter } from "./types/dividend";

const defaultFilters: DividendFiltersState = {
  sector: "All",
  minYield: "Any",
  sort: "Highest Yield",
};

function matchesMinYield(stock: DividendStock, minYield: MinYieldFilter) {
  if (minYield === "4%+") {
    return stock.dividendYieldPercent >= 4;
  }

  if (minYield === "6%+") {
    return stock.dividendYieldPercent >= 6;
  }

  if (minYield === "8%+") {
    return stock.dividendYieldPercent >= 8;
  }

  return true;
}

function sortStocks(stocks: DividendStock[], sort: DividendFiltersState["sort"]) {
  return [...stocks].sort((firstStock, secondStock) => {
    if (sort === "Highest Annual Dividend") {
      return secondStock.annualDividend - firstStock.annualDividend;
    }

    if (sort === "Market Cap") {
      return secondStock.marketCap - firstStock.marketCap;
    }

    return secondStock.dividendYieldPercent - firstStock.dividendYieldPercent;
  });
}

export default function DividendsPage() {
  const [filters, setFilters] = useState(defaultFilters);

  const visibleStocks = useMemo(() => {
    const filteredStocks = dividendStocks.filter((stock) => {
      const matchesSector = filters.sector === "All" || stock.sector === filters.sector;

      return matchesSector && matchesMinYield(stock, filters.minYield);
    });

    return sortStocks(filteredStocks, filters.sort);
  }, [filters]);

  return (
    <section className="dividends-page" aria-labelledby="dividends-page-title">
      <div className="dividends-page__header">
        <span>Income Investing</span>
        <h1 id="dividends-page-title">Highest Dividend Stocks</h1>
        <p>
          Screen the market&rsquo;s highest-yielding names by sector and minimum yield, ranked by
          yield, annual dividend, or market cap.
        </p>
      </div>

      <DividendFilters filters={filters} onChange={setFilters} />
      <DividendTable stocks={visibleStocks} />
    </section>
  );
}
