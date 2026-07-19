import SectionPage from "../../shared/components/SectionPage";
import type { SectionListItem, SectionMetric } from "../../shared/components/SectionPage";

const metrics: SectionMetric[] = [
  { label: "Current value", value: "$9,860.40", detail: "+18.4% absolute", positive: true },
  { label: "Monthly SIP", value: "$650", detail: "Next debit in 8 days" },
  { label: "XIRR", value: "14.7%", detail: "Since first investment", positive: true },
  { label: "Funds", value: "6", detail: "4 equity, 2 debt" },
];

const items: SectionListItem[] = [
  { title: "Flexi Cap Fund", detail: "Core equity allocation with broad market exposure.", value: "$250/mo" },
  { title: "Nifty 50 Index", detail: "Low-cost large-cap anchor for the portfolio.", value: "$200/mo" },
  { title: "Short Duration Debt", detail: "Keeps emergency allocation stable.", value: "$200/mo" },
];

export default function FundsPage() {
  return (
    <SectionPage
      eyebrow="Mutual funds"
      title="Fund portfolio"
      summary="See SIP health, category spread, and long-term fund performance without leaving Bala Money."
      metrics={metrics}
      listTitle="SIP lineup"
      items={items}
    />
  );
}
