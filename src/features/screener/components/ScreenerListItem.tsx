import type { ScreenerStock } from "../types/screener";

interface ScreenerListItemProps {
  stock: ScreenerStock;
  isSelected: boolean;
  onSelect: (stockId: string) => void;
}

export default function ScreenerListItem({ stock, isSelected, onSelect }: ScreenerListItemProps) {
  return (
    <button
      className={`screener-list-item${isSelected ? " screener-list-item--selected" : ""}`}
      type="button"
      onClick={() => onSelect(stock.id)}
      aria-pressed={isSelected}
    >
      <span className="screener-avatar" aria-hidden="true">
        {stock.initial}
      </span>
      <span className="screener-list-item__copy">
        <strong>{stock.companyName}</strong>
        <small>
          {stock.ticker} · {stock.sector}
        </small>
      </span>
      <span className="screener-list-item__return">{stock.returnPercent}</span>
    </button>
  );
}
