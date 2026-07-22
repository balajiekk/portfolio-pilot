import type {
  DividendFiltersState,
  DividendSector,
  DividendSort,
  MinYieldFilter,
} from "../types/dividend";

interface DividendFiltersProps {
  filters: DividendFiltersState;
  onChange: (filters: DividendFiltersState) => void;
}

const sectorOptions: Array<DividendSector | "All"> = [
  "All",
  "Financials",
  "Energy",
  "Utilities",
  "REIT",
  "Consumer",
  "Healthcare",
];
const minYieldOptions: MinYieldFilter[] = ["Any", "4%+", "6%+", "8%+"];
const sortOptions: DividendSort[] = ["Highest Yield", "Highest Annual Dividend", "Market Cap"];

export default function DividendFilters({ filters, onChange }: DividendFiltersProps) {
  return (
    <div className="screener-filters" aria-label="Dividend filters">
      <label>
        <span>Sector</span>
        <select
          value={filters.sector}
          onChange={(event) =>
            onChange({ ...filters, sector: event.target.value as DividendFiltersState["sector"] })
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
        <span>Minimum Yield</span>
        <select
          value={filters.minYield}
          onChange={(event) =>
            onChange({ ...filters, minYield: event.target.value as MinYieldFilter })
          }
        >
          {minYieldOptions.map((option) => (
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
          onChange={(event) => onChange({ ...filters, sort: event.target.value as DividendSort })}
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
