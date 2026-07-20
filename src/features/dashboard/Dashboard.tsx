import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { holdings, marketIndices } from "./data/portfolioData";
import type { Holding, TrendDirection } from "./types/dashboard";

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

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim().toLowerCase() ?? "";
  const visibleHoldings = query
    ? holdings.filter((holding) => {
        const companyName = holding.companyName.toLowerCase();
        const ticker = holding.ticker.toLowerCase();

        return companyName.includes(query) || ticker.includes(query);
      })
    : holdings;

  return (
    <section className="stocks-dashboard" aria-labelledby="stocks-page-title">
      <h1 id="stocks-page-title" className="sr-only">
        My US Stocks
      </h1>

      <div className="market-strip" aria-label="Market indices">
        {marketIndices.map((index) => (
          <div className={`market-index market-index--${index.trend}`} key={index.id}>
            <div className="market-index__main">
              <span className="market-index__name">{index.name}</span>
              <strong className="market-index__value">{index.value}</strong>
            </div>
            <span className={`market-index__badge market-index__badge--${index.trend}`}>
              <TrendIndicator
                compact
                trend={index.trend}
                value={`${index.change} (${index.changePercent})`}
              />
            </span>
          </div>
        ))}
      </div>

      <section className="holdings-surface" aria-label="US stock holdings">
        <div className="holding-row holding-row--header" aria-hidden="true">
          <span>Stock</span>
          <span>Market Price</span>
          <span>Invested</span>
          <span>Trend</span>
          <span>Current Value</span>
          <span>Returns</span>
        </div>

        {visibleHoldings.map((holding) => (
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
              <strong>{holding.lastPrice}</strong>
              <TrendIndicator
                trend={holding.dailyTrend}
                value={holding.dailyChangePercent}
              />
            </div>

            <div className="holding-cell holding-cell--invested">
              <span className="cell-label">Invested</span>
              <strong>{holding.investedValue}</strong>
              <span className="holding-meta">
                {holding.quantity} Qty
                <span aria-hidden="true" />
                {holding.averagePrice} Avg.
              </span>
            </div>

            <div className="holding-cell holding-cell--sparkline">
              <span className="cell-label">Trend</span>
              <Sparkline points={holding.sparkline} trend={holding.totalTrend} />
            </div>

            <div className="holding-cell">
              <span className="cell-label">Current Value</span>
              <strong>{holding.currentValue}</strong>
            </div>

            <div className="holding-cell holding-cell--returns">
              <span className="cell-label">Returns</span>
              <strong>{holding.totalGain}</strong>
              <TrendIndicator
                trend={holding.totalTrend}
                value={holding.totalGainPercent}
              />
            </div>
          </article>
        ))}

        {visibleHoldings.length === 0 ? (
          <div className="empty-state" role="status">
            No matching US stocks
          </div>
        ) : null}
      </section>
    </section>
  );
}
