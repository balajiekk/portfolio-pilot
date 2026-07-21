import type { Kpi } from "../types/dashboard";
import { formatCurrency, formatPercent, trendOf } from "../../../shared/utils/formatters";

interface Props {
  item: Kpi;
}

export default function KpiCard({ item }: Props) {
  const changeTrend = item.changePercent === null ? null : trendOf(item.changePercent);

  return (
    <div className="kpi-card">
      <p className="kpi-card__title">{item.title}</p>

      <strong className="kpi-card__value">
        {formatCurrency(item.value, { signed: item.signedValue })}
      </strong>

      {item.changePercent !== null ? (
        <span className={`kpi-card__change kpi-card__change--${changeTrend}`}>
          {formatPercent(item.changePercent, { signed: true })}
        </span>
      ) : null}
    </div>
  );
}
