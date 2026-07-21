import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { usePortfolio } from "./hooks/usePortfolio";
import type { Holding, TrendDirection } from "./types/dashboard";
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  formatShares,
  trendOf,
} from "../../shared/utils/formatters";

type SortDirection = "asc" | "desc";

const pageSize = 5;

interface TrendIndicatorProps {
  trend: TrendDirection;
  value: string;
  compact?: boolean;
}

function TrendIndicator({ trend, value, compact = false }: TrendIndicatorProps) {
  const Icon = trend === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <span
      className={`trend trend--${trend}${compact ? " trend--compact" : ""}`}
    >
      <Icon aria-hidden="true" size={compact ? 13 : 15} strokeWidth={2.6} />
      {value}
    </span>
  );
}

function LogoMark({ holding }: { holding: Holding }) {
  return (
    <span
      className={`stock-logo stock-logo--${holding.logoTone}`}
      aria-hidden="true"
    >
      {holding.logoText}
    </span>
  );
}

function Sparkline({
  points,
  trend,
}: {
  points: number[];
  trend: TrendDirection;
}) {
  const width = 108;
  const height = 34;
  const maxValue = Math.max(...points);
  const minValue = Math.min(...points);
  const range = maxValue - minValue || 1;
  const step = width / Math.max(points.length - 1, 1);
  const path = points
    .map((point, index) => {
      const x = Number((index * step).toFixed(2));
      const y = Number((height - ((point - minValue) / range) * height).toFixed(2));

      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <svg
      className={`sparkline sparkline--${trend}`}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="7 day trend"
      preserveAspectRatio="none"
    >
      <path className="sparkline__area" d={`${path} L ${width} ${height} L 0 ${height} Z`} />
      <path className="sparkline__line" d={path} />
    </svg>
  );
}

function MarketSkeleton() {
  return (
    <div className="market-strip" aria-label="Loading market indices">
      {Array.from({ length: 4 }, (_, index) => (
        <div className="market-index market-index--skeleton" key={index}>
          <span className="skeleton skeleton--text" />
          <span className="skeleton skeleton--short" />
        </div>
      ))}
    </div>
  );
}

function HoldingsSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => (
        <article className="holding-row holding-row--skeleton" key={index}>
          <div className="stock-identity">
            <span className="skeleton skeleton--avatar" />
            <div className="stock-identity__text">
              <span className="skeleton skeleton--company" />
              <span className="skeleton skeleton--ticker" />
            </div>
          </div>
          <span className="skeleton skeleton--text" />
          <span className="skeleton skeleton--text" />
          <span className="skeleton skeleton--sparkline" />
          <span className="skeleton skeleton--text" />
          <span className="skeleton skeleton--text" />
        </article>
      ))}
    </>
  );
}

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const { data, error, isLoading, refetch } = usePortfolio();
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [page, setPage] = useState(1);
  const query = searchParams.get("q")?.trim().toLowerCase() ?? "";
  const holdings = data?.holdings ?? [];
  const marketIndices = data?.marketIndices ?? [];
  const visibleHoldings = useMemo(() => {
    const filteredHoldings = query
      ? holdings.filter((holding) => {
        const companyName = holding.companyName.toLowerCase();
        const ticker = holding.ticker.toLowerCase();

        return companyName.includes(query) || ticker.includes(query);
      })
      : holdings;

    return [...filteredHoldings].sort((firstHolding, secondHolding) => {
      const difference = firstHolding.totalGainPercent - secondHolding.totalGainPercent;

      return sortDirection === "desc" ? -difference : difference;
    });
  }, [holdings, query, sortDirection]);
  const pageCount = Math.max(1, Math.ceil(visibleHoldings.length / pageSize));
  const paginatedHoldings = useMemo(() => {
    const startIndex = (page - 1) * pageSize;

    return visibleHoldings.slice(startIndex, startIndex + pageSize);
  }, [page, visibleHoldings]);

  useEffect(() => {
    setPage(1);
  }, [query, sortDirection]);

  function toggleReturnsSort() {
    setSortDirection((current) => (current === "desc" ? "asc" : "desc"));
  }

  return (
    <section className="stocks-dashboard" aria-labelledby="stocks-page-title">
      <h1 id="stocks-page-title" className="sr-only">
        My US Stocks
      </h1>

      {isLoading && !data ? (
        <MarketSkeleton />
      ) : (
        <div className="market-strip" aria-label="Market indices">
          {marketIndices.map((index) => {
            const trend = trendOf(index.change);

            return (
              <div className={`market-index market-index--${trend}`} key={index.id}>
                <div className="market-index__main">
                  <span className="market-index__name">{index.name}</span>
                  <strong className="market-index__value">{formatNumber(index.value)}</strong>
                </div>
                <span className={`market-index__badge market-index__badge--${trend}`}>
                  <TrendIndicator
                    compact
                    trend={trend}
                    value={`${formatNumber(Math.abs(index.change))} (${formatPercent(
                      Math.abs(index.changePercent)
                    )})`}
                  />
                </span>
              </div>
            );
          })}
        </div>
      )}

      <section className="holdings-surface" aria-label="US stock holdings">
        <div className="holding-row holding-row--header">
          <span>Stock</span>
          <span>Market Price</span>
          <span>Invested</span>
          <span>Trend</span>
          <span>Current Value</span>
          <button className="holding-sort-button" type="button" onClick={toggleReturnsSort}>
            Returns
            <span className="sr-only">
              , sorted {sortDirection === "desc" ? "highest first" : "lowest first"}
            </span>
          </button>
        </div>

        {isLoading && !data ? <HoldingsSkeleton /> : null}

        {error ? (
          <div className="empty-state empty-state--error" role="alert">
            <strong>Portfolio data could not load.</strong>
            <span>Please retry in a moment.</span>
            <button type="button" onClick={refetch}>
              Retry
            </button>
          </div>
        ) : null}

        {!isLoading && !error && holdings.length === 0 ? (
          <div className="empty-state" role="status">
            <strong>No holdings yet</strong>
            <span>Add your first stock to start tracking performance.</span>
          </div>
        ) : null}

        {!isLoading && !error && holdings.length > 0 && visibleHoldings.length === 0 ? (
          <div className="empty-state" role="status">
            <strong>No matching US stocks</strong>
            <span>Try another company name or ticker.</span>
          </div>
        ) : null}

        {paginatedHoldings.map((holding) => {
          const dailyTrend = trendOf(holding.dailyChangePercent);
          const totalTrend = trendOf(holding.totalGain);

          return (
            <article className="holding-row" key={holding.id}>
              <div className="stock-identity">
                <LogoMark holding={holding} />

                <div className="stock-identity__text">
                  <h2>{holding.companyName}</h2>
                  <span>{holding.ticker}</span>
                </div>
              </div>

              <div className="holding-cell holding-cell--price">
                <span className="cell-label">Market Price</span>
                <strong>{formatCurrency(holding.lastPrice)}</strong>
                <TrendIndicator
                  trend={dailyTrend}
                  value={formatPercent(Math.abs(holding.dailyChangePercent))}
                />
              </div>

              <div className="holding-cell holding-cell--invested">
                <span className="cell-label">Invested</span>
                <strong>{formatCurrency(holding.investedValue)}</strong>
                <span className="holding-meta">
                  {formatShares(holding.quantity)} Qty
                  <span aria-hidden="true" />
                  {formatCurrency(holding.averagePrice)} Avg.
                </span>
              </div>

              <div className="holding-cell holding-cell--sparkline">
                <span className="cell-label">Trend</span>
                <Sparkline points={holding.sparkline} trend={totalTrend} />
              </div>

              <div className="holding-cell">
                <span className="cell-label">Current Value</span>
                <strong>{formatCurrency(holding.currentValue)}</strong>
              </div>

              <div className="holding-cell holding-cell--returns">
                <span className="cell-label">Returns</span>
                <strong>{formatCurrency(holding.totalGain, { signed: true })}</strong>
                <TrendIndicator
                  trend={totalTrend}
                  value={formatPercent(Math.abs(holding.totalGainPercent))}
                />
              </div>
            </article>
          );
        })}

        {!isLoading && !error && visibleHoldings.length > pageSize ? (
          <div className="table-pagination" aria-label="Holdings pagination">
            <span>
              Page {page} of {pageCount}
            </span>
            <div>
              <button type="button" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>
                Previous
              </button>
              <button
                type="button"
                disabled={page === pageCount}
                onClick={() => setPage((value) => value + 1)}
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </section>
  );
}
