import { useMemo, useState } from "react";

import EarningsDayTabs from "./components/EarningsDayTabs";
import type { EarningsDay } from "./components/EarningsDayTabs";
import EarningsFilters from "./components/EarningsFilters";
import EarningsTable from "./components/EarningsTable";
import { earningsEvents } from "./data/earningsData";
import type { EarningsSessionFilter } from "./types/earnings";

const dayLabelFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

function buildDays(): EarningsDay[] {
  const dates = Array.from(new Set(earningsEvents.map((event) => event.date))).sort();

  return dates.map((date) => ({
    date,
    label: dayLabelFormatter.format(new Date(`${date}T00:00:00`)),
    count: earningsEvents.filter((event) => event.date === date).length,
  }));
}

const days = buildDays();
// earningsEvents is always non-empty, so buildDays() always returns at least one day.
const firstDay = days[0]!;

export default function EarningsPage() {
  const [selectedDate, setSelectedDate] = useState(firstDay.date);
  const [session, setSession] = useState<EarningsSessionFilter>("All");

  const visibleEvents = useMemo(() => {
    return earningsEvents.filter((event) => {
      const matchesDay = event.date === selectedDate;
      const matchesSession = session === "All" || event.session === session;

      return matchesDay && matchesSession;
    });
  }, [selectedDate, session]);

  return (
    <section className="earnings-page" aria-labelledby="earnings-page-title">
      <div className="earnings-page__header">
        <span>Markets</span>
        <h1 id="earnings-page-title">Earnings Calendar</h1>
        <p>
          Track who&rsquo;s reporting this week, before the open and after the close, with EPS
          estimates versus results.
        </p>
      </div>

      <EarningsDayTabs days={days} selectedDate={selectedDate} onSelect={setSelectedDate} />
      <EarningsFilters session={session} onChange={setSession} />
      <EarningsTable events={visibleEvents} />
    </section>
  );
}
