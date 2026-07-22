import {
  formatCompactCurrency,
  formatCurrency,
  formatPercent,
  trendOf,
} from "../../../shared/utils/formatters";
import type { DividendStock } from "../types/dividend";

interface DividendTableProps {
  stocks: DividendStock[];
}

export default function DividendTable({ stocks }: DividendTableProps) {
  if (stocks.length === 0) {
    return (
      <div className="empty-state" role="status">
        <strong>No dividend stocks match these filters.</strong>
        <span>Try a lower minimum yield or a different sector.</span>
      </div>
    );
  }

  return (
    <div className="holdings-surface" aria-label="Highest dividend stocks">
      <div className="holding-row holding-row--header holding-row--dividends">
        <span>Company</span>
        <span>Price</span>
        <span>Change</span>
        <span>Dividend Yield</span>
        <span>Annual Dividend</span>
        <span>Market Cap</span>
      </div>

      {stocks.map((stock) => (
        <article className="holding-row holding-row--dividends" key={stock.id}>
          <div className="stock-identity">
            <span className={`stock-logo stock-logo--${stock.logoTone}`} aria-hidden="true">
              {stock.logoText}
            </span>
            <div className="stock-identity__text">
              <h2>{stock.companyName}</h2>
              <span>
                {stock.ticker} · {stock.sector}
              </span>
            </div>
          </div>

          <div className="holding-cell">
            <span className="cell-label">Price</span>
            <strong>{formatCurrency(stock.price)}</strong>
          </div>

          <div className="holding-cell">
            <span className="cell-label">Change</span>
            <span className={`trend trend--${trendOf(stock.dailyChangePercent)}`}>
              {formatPercent(stock.dailyChangePercent, { signed: true })}
            </span>
          </div>

          <div className="holding-cell">
            <span className="cell-label">Dividend Yield</span>
            <strong>{formatPercent(stock.dividendYieldPercent)}</strong>
          </div>

          <div className="holding-cell">
            <span className="cell-label">Annual Dividend</span>
            <strong>{formatCurrency(stock.annualDividend)}</strong>
          </div>

          <div className="holding-cell">
            <span className="cell-label">Market Cap</span>
            <strong>{formatCompactCurrency(stock.marketCap)}</strong>
          </div>
        </article>
      ))}
    </div>
  );
}
