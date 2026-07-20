import SectionPage from "../../shared/components/SectionPage";
import type { SectionListItem, SectionMetric } from "../../shared/components/SectionPage";

const metrics: SectionMetric[] = [
  { label: "Margin used", value: "$4,250", detail: "42% of available" },
  { label: "Open positions", value: "5", detail: "3 calls, 2 puts" },
  { label: "Expiry P&L", value: "+$214", detail: "This week", positive: true },
  { label: "Risk level", value: "Moderate", detail: "Hedged with spreads" },
];

const items: SectionListItem[] = [
  { title: "NIFTY bull call spread", detail: "Defined-risk setup with limited downside.", value: "+$96" },
  {
    title: "BANKNIFTY hedge",
    detail: "Protects downside if financials reverse.",
    value: "Active",
    valueTone: "sage",
  },
  {
    title: "IV watch",
    detail: "Premiums are cooling before weekly expiry.",
    value: "Low",
    valueTone: "gold",
  },
];

export default function FAndOPage() {
  return (
    <SectionPage
      eyebrow="Derivatives desk"
      title="F&O positions"
      summary="Monitor option exposure, margin usage, and expiry risk from one clean command center."
      metrics={metrics}
      listTitle="Position monitor"
      items={items}
    />
  );
}
