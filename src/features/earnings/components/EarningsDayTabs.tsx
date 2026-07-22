export interface EarningsDay {
  date: string;
  label: string;
  count: number;
}

interface EarningsDayTabsProps {
  days: EarningsDay[];
  selectedDate: string;
  onSelect: (date: string) => void;
}

export default function EarningsDayTabs({ days, selectedDate, onSelect }: EarningsDayTabsProps) {
  return (
    <div className="earnings-day-tabs" role="tablist" aria-label="Earnings by day">
      {days.map((day) => (
        <button
          key={day.date}
          type="button"
          role="tab"
          aria-selected={day.date === selectedDate}
          className={`earnings-day-tab${
            day.date === selectedDate ? " earnings-day-tab--active" : ""
          }`}
          onClick={() => onSelect(day.date)}
        >
          <span className="earnings-day-tab__label">{day.label}</span>
          <span className="earnings-day-tab__count">{day.count} earnings</span>
        </button>
      ))}
    </div>
  );
}
