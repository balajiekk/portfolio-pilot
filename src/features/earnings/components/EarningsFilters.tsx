import type { EarningsSessionFilter } from "../types/earnings";

interface SessionOption {
  value: EarningsSessionFilter;
  label: string;
}

const sessionOptions: SessionOption[] = [
  { value: "All", label: "All Sessions" },
  { value: "BMO", label: "Before Open" },
  { value: "AMC", label: "After Close" },
  { value: "TNS", label: "Time TBD" },
];

interface EarningsFiltersProps {
  session: EarningsSessionFilter;
  onChange: (session: EarningsSessionFilter) => void;
}

export default function EarningsFilters({ session, onChange }: EarningsFiltersProps) {
  return (
    <div className="earnings-session-filters" aria-label="Filter by earnings session">
      {sessionOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={session === option.value}
          className={`earnings-session-pill${
            session === option.value ? " earnings-session-pill--active" : ""
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
