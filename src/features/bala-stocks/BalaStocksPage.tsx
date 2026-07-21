import SectionPage from "../../shared/components/SectionPage";
import type { SectionListItem, SectionMetric } from "../../shared/components/SectionPage";

const metrics: SectionMetric[] = [
  { label: "Watchlist", value: "18", detail: "6 moved today" },
  { label: "Top sector", value: "Financials", detail: "32% of ideas" },
  { label: "Day gainers", value: "7", detail: "Above 1% intraday", positive: true },
  { label: "Open orders", value: "3", detail: "Awaiting price trigger" },
];

const items: SectionListItem[] = [
  { title: "Reliance Industries", detail: "Energy and retail strength keeping trend positive.", value: "+1.2%" },
  {
    title: "HDFC Bank",
    detail: "Watching for breakout above recent resistance.",
    value: "Buy zone",
    valueTone: "gold",
  },
  { title: "Tata Motors", detail: "Auto momentum remains strong after volume pickup.", value: "+2.4%" },
];

export default function BalaStocksPage() {
  return (
    <SectionPage
      eyebrow="Indian stocks"
      title="Indian Stocks watch hub"
      summary="Track Indian equity ideas, watchlist moves, and sector exposure before placing an order."
      metrics={metrics}
      listTitle="Market focus"
      items={items}
    />
  );
}
