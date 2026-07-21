import ScreenerListItem from "./ScreenerListItem";
import type { ScreenerStock } from "../types/screener";

interface ScreenerListProps {
  stocks: ScreenerStock[];
  selectedStockId: string;
  onSelectStock: (stockId: string) => void;
}

export default function ScreenerList({
  stocks,
  selectedStockId,
  onSelectStock,
}: ScreenerListProps) {
  if (stocks.length === 0) {
    return (
      <div className="screener-empty" role="status">
        <strong>No stocks match these filters.</strong>
        <span>Try widening the sector, market cap, or P/E range.</span>
      </div>
    );
  }

  return (
    <div className="screener-list" aria-label="Top screened stocks">
      {stocks.map((stock) => (
        <ScreenerListItem
          key={stock.id}
          stock={stock}
          isSelected={stock.id === selectedStockId}
          onSelect={onSelectStock}
        />
      ))}
    </div>
  );
}
