import SectionPage from "../../shared/components/SectionPage";
import type { SectionListItem, SectionMetric } from "../../shared/components/SectionPage";

const metrics: SectionMetric[] = [
  { label: "Total value", value: "$18,426.96", detail: "+$928.82 overall", positive: true },
  { label: "Invested", value: "$14,598.14", detail: "Across 4 asset classes" },
  { label: "Today", value: "+$86.29", detail: "+0.47% movement", positive: true },
  { label: "Cash balance", value: "$2,840.00", detail: "Ready to invest" },
];

const items: SectionListItem[] = [
  {
    title: "Marvell Technology Inc.",
    detail: "MRVL",
    value: "+$192.52",
  },
  {
    title: "Merck & Co. Inc.",
    detail: "MRK",
    value: "+$143.86",
  },
];

export default function MyBalaPage() {
  return (
    <SectionPage
      eyebrow="Net worth snapshot"
      title="Good morning"
      summary="A quiet view of your tracked money across stocks, funds, cash, and open trading activity."
      metrics={metrics}
      listTitle="Top movers"
      items={items}
    />
  );
}
