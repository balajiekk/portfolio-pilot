import { formatCompactCurrency, formatCurrency, formatPercent, trendOf } from "../../../shared/utils/formatters";
import { getSurprisePercent } from "../utils/surprise";
import type { EarningsEvent } from "../types/earnings";

const sessionLabels: Record<EarningsEvent["session"], string> = {
  BMO: "Before Open",
  AMC: "After Close",
  TNS: "Time TBD",
};

interface EarningsTableProps {
  events: EarningsEvent[];
}

export default function EarningsTable({ events }: EarningsTableProps) {
  if (events.length === 0) {
    return (
      <div className="empty-state" role="status">
        <strong>No earnings match these filters.</strong>
        <span>Try another day or session.</span>
      </div>
    );
  }

  return (
    <div className="holdings-surface" aria-label="Earnings calendar results">
      <div className="holding-row holding-row--header holding-row--earnings">
        <span>Company</span>
        <span>Session</span>
        <span>EPS Estimate</span>
        <span>EPS Reported</span>
        <span>Surprise</span>
        <span>Market Cap</span>
      </div>

      {events.map((event) => {
        const surprisePercent = getSurprisePercent(event);

        return (
          <article className="holding-row holding-row--earnings" key={event.id}>
            <div className="stock-identity">
              <span className={`stock-logo stock-logo--${event.logoTone}`} aria-hidden="true">
                {event.logoText}
              </span>
              <div className="stock-identity__text">
                <h2>{event.companyName}</h2>
                <span>{event.ticker}</span>
              </div>
            </div>

            <div className="holding-cell">
              <span className="cell-label">Session</span>
              <span
                className={`earnings-session-badge earnings-session-badge--${event.session.toLowerCase()}`}
              >
                {sessionLabels[event.session]}
              </span>
            </div>

            <div className="holding-cell">
              <span className="cell-label">EPS Estimate</span>
              <strong>{formatCurrency(event.epsEstimate)}</strong>
            </div>

            <div className="holding-cell">
              <span className="cell-label">EPS Reported</span>
              <strong>{event.epsReported === null ? "—" : formatCurrency(event.epsReported)}</strong>
            </div>

            <div className="holding-cell">
              <span className="cell-label">Surprise</span>
              {surprisePercent === null ? (
                <strong>—</strong>
              ) : (
                <span className={`trend trend--${trendOf(surprisePercent)}`}>
                  {formatPercent(surprisePercent, { signed: true })}
                </span>
              )}
            </div>

            <div className="holding-cell">
              <span className="cell-label">Market Cap</span>
              <strong>{formatCompactCurrency(event.marketCap)}</strong>
            </div>
          </article>
        );
      })}
    </div>
  );
}
