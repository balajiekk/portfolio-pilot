import type {
  MarketCapBucket,
  PeFilter,
  ScreenerFiltersState,
  ScreenerSector,
  ScreenerSort,
} from "../types/screener";

interface ScreenerFiltersProps {
  filters: ScreenerFiltersState;
  onChange: (filters: ScreenerFiltersState) => void;
}

const sectorOptions: Array<ScreenerSector | "All"> = [
  "All",
  "Semiconductors",
  "Healthcare",
  "Consumer",
  "Technology",
  "Financials",
];
const marketCapOptions: Array<MarketCapBucket | "Any"> = ["Any", "Mega", "Large", "Mid"];
const peOptions: PeFilter[] = ["Any", "Under 25", "25-40", "40+"];
const sortOptions: ScreenerSort[] = ["Top Gainers", "Market Cap", "Lowest P/E"];

export default function ScreenerFilters({ filters, onChange }: ScreenerFiltersProps) {
  return (
    <div className="screener-filters" aria-label="Screener filters">
      <label>
        <span>Sector</span>
        <select
          value={filters.sector}
          onChange={(event) =>
            onChange({ ...filters, sector: event.target.value as ScreenerFiltersState["sector"] })
          }
        >
          {sectorOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Market Cap</span>
        <select
          value={filters.marketCap}
          onChange={(event) =>
            onChange({
              ...filters,
              marketCap: event.target.value as ScreenerFiltersState["marketCap"],
            })
          }
        >
          {marketCapOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>P/E</span>
        <select
          value={filters.pe}
          onChange={(event) => onChange({ ...filters, pe: event.target.value as PeFilter })}
        >
          {peOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Sort</span>
        <select
          value={filters.sort}
          onChange={(event) => onChange({ ...filters, sort: event.target.value as ScreenerSort })}
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
