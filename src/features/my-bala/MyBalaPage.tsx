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
    title: "Review US stock gains",
    detail: "MRVL and MLTX are both above 100% returns.",
    value: "2 alerts",
    icon: "chart",
  },
  {
    title: "Diversify healthcare exposure",
    detail: "UNH and MRK are driving most defensive allocation.",
    value: "38%",
    icon: "lightbulb",
  },
  {
    title: "Keep cash ready",
    detail: "Cash can cover your next three planned orders.",
    value: "$2.8k",
    icon: "wallet",
  },
];

export default function MyBalaPage() {
  return (
    <SectionPage
      eyebrow="Net worth snapshot"
      title="Good morning, Bala"
      summary="A quick view of your tracked money across stocks, funds, cash, and open trading activity."
      metrics={metrics}
      listTitle="Suggested next steps"
      items={items}
    />
  );
}
