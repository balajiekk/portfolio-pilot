import type { ScreenerStock } from "../types/screener";

interface StockDetailPanelProps {
  stock: ScreenerStock;
}

export default function StockDetailPanel({ stock }: StockDetailPanelProps) {
  return (
    <aside className="stock-detail-panel" aria-label={`${stock.companyName} detail summary`}>
      <div className="stock-detail-panel__identity">
        <span className="screener-avatar screener-avatar--large" aria-hidden="true">
          {stock.initial}
        </span>
        <div>
          <h2>{stock.companyName}</h2>
          <p>
            {stock.ticker} · {stock.exchange}
          </p>
        </div>
      </div>

      <div className="stock-detail-panel__price">
        <strong>{stock.price}</strong>
        <span className={stock.dayChange.startsWith("-") ? "detail-change--down" : undefined}>
          {stock.dayChange}
        </span>
      </div>

      <dl className="stock-detail-metrics">
        <div>
          <dt>Market Cap</dt>
          <dd>{stock.marketCap}</dd>
        </div>
        <div>
          <dt>P/E Ratio</dt>
          <dd>{stock.peRatio.toFixed(1)}</dd>
        </div>
        <div>
          <dt>52W Range</dt>
          <dd>{stock.range52Week}</dd>
        </div>
      </dl>

      <div className="stock-detail-about">
        <span>About</span>
        <p>{stock.summary}</p>
      </div>

      <button className="stock-detail-panel__action" type="button">
        Add to Watchlist
      </button>
    </aside>
  );
}
