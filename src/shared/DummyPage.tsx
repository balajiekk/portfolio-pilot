interface PageMetric {
  label: string;
  value: string;
  detail: string;
  positive?: boolean;
}

interface PageListItem {
  title: string;
  detail: string;
  value: string;
}

interface PageContent {
  eyebrow: string;
  title: string;
  summary: string;
  metrics: PageMetric[];
  listTitle: string;
  items: PageListItem[];
}

const pages: Record<string, PageContent> = {
  "My Bala": {
    eyebrow: "Net worth snapshot",
    title: "Good morning, Bala",
    summary:
      "A quick view of your tracked money across stocks, funds, cash, and open trading activity.",
    metrics: [
      { label: "Total value", value: "$18,426.96", detail: "+$928.82 overall", positive: true },
      { label: "Invested", value: "$14,598.14", detail: "Across 4 asset classes" },
      { label: "Today", value: "+$86.29", detail: "+0.47% movement", positive: true },
      { label: "Cash balance", value: "$2,840.00", detail: "Ready to invest" },
    ],
    listTitle: "Suggested next steps",
    items: [
      { title: "Review US stock gains", detail: "MRVL and MLTX are both above 100% returns.", value: "2 alerts" },
      { title: "Diversify healthcare exposure", detail: "UNH and MRK are driving most defensive allocation.", value: "38%" },
      { title: "Keep cash ready", detail: "Cash can cover your next three planned orders.", value: "$2.8k" },
    ],
  },
  BalaStocks: {
    eyebrow: "Indian stocks",
    title: "BalaStocks watch hub",
    summary:
      "Track Indian equity ideas, watchlist moves, and sector exposure before placing an order.",
    metrics: [
      { label: "Watchlist", value: "18", detail: "6 moved today" },
      { label: "Top sector", value: "Financials", detail: "32% of ideas" },
      { label: "Day gainers", value: "7", detail: "Above 1% intraday", positive: true },
      { label: "Open orders", value: "3", detail: "Awaiting price trigger" },
    ],
    listTitle: "Market focus",
    items: [
      { title: "Reliance Industries", detail: "Energy and retail strength keeping trend positive.", value: "+1.2%" },
      { title: "HDFC Bank", detail: "Watching for breakout above recent resistance.", value: "Buy zone" },
      { title: "Tata Motors", detail: "Auto momentum remains strong after volume pickup.", value: "+2.4%" },
    ],
  },
  "F&O": {
    eyebrow: "Derivatives desk",
    title: "F&O positions",
    summary:
      "Monitor option exposure, margin usage, and expiry risk from one clean command center.",
    metrics: [
      { label: "Margin used", value: "$4,250", detail: "42% of available" },
      { label: "Open positions", value: "5", detail: "3 calls, 2 puts" },
      { label: "Expiry P&L", value: "+$214", detail: "This week", positive: true },
      { label: "Risk level", value: "Moderate", detail: "Hedged with spreads" },
    ],
    listTitle: "Position monitor",
    items: [
      { title: "NIFTY bull call spread", detail: "Defined-risk setup with limited downside.", value: "+$96" },
      { title: "BANKNIFTY hedge", detail: "Protects downside if financials reverse.", value: "Active" },
      { title: "IV watch", detail: "Premiums are cooling before weekly expiry.", value: "Low" },
    ],
  },
  Orders: {
    eyebrow: "Activity history",
    title: "Orders",
    summary:
      "Review recent buy and sell orders, open requests, and completed trades from the US stocks desk.",
    metrics: [
      { label: "Open orders", value: "3", detail: "Awaiting execution" },
      { label: "Completed", value: "18", detail: "Last 30 days", positive: true },
      { label: "Cancelled", value: "2", detail: "Price moved away" },
      { label: "Avg. fill", value: "99.4%", detail: "Near target price", positive: true },
    ],
    listTitle: "Recent orders",
    items: [
      { title: "MRK buy order", detail: "Filled at target during market open.", value: "Complete" },
      { title: "UNH limit order", detail: "Waiting for price to revisit your limit.", value: "Open" },
      { title: "CROX partial buy", detail: "One tranche completed, one remaining.", value: "Partial" },
    ],
  },
  "Wallet History": {
    eyebrow: "Cash movement",
    title: "Wallet history",
    summary:
      "Track deposits, withdrawals, settled cash, and pending wallet activity across your portfolio.",
    metrics: [
      { label: "Cash balance", value: "$2,840", detail: "Available to invest" },
      { label: "Deposits", value: "$1,200", detail: "This month", positive: true },
      { label: "Withdrawals", value: "$0", detail: "No recent exits" },
      { label: "Pending", value: "$300", detail: "Settles next day" },
    ],
    listTitle: "Recent cash flow",
    items: [
      { title: "Bank deposit", detail: "Added cash for planned US stock orders.", value: "+$800" },
      { title: "Dividend credit", detail: "Cash dividend settled into wallet.", value: "+$24" },
      { title: "FX conversion", detail: "Converted funds for US market purchases.", value: "$300" },
    ],
  },
  Watchlist: {
    eyebrow: "Market shortlist",
    title: "Watchlist",
    summary:
      "Keep high-conviction stocks close at hand before they move into orders or your portfolio.",
    metrics: [
      { label: "Tracked stocks", value: "12", detail: "Across US markets" },
      { label: "Price alerts", value: "5", detail: "Near target zones" },
      { label: "Today movers", value: "4", detail: "Above 1% change", positive: true },
      { label: "New ideas", value: "2", detail: "Added this week" },
    ],
    listTitle: "Current watchlist",
    items: [
      { title: "NVIDIA Corp.", detail: "Waiting for a pullback before adding exposure.", value: "Alert" },
      { title: "Apple Inc.", detail: "Watching service revenue momentum after earnings.", value: "Core" },
      { title: "Tesla Inc.", detail: "Volatility remains high; keep order size small.", value: "Watch" },
    ],
  },
  Funds: {
    eyebrow: "Mutual funds",
    title: "Fund portfolio",
    summary:
      "See SIP health, category spread, and long-term fund performance without leaving Bala Money.",
    metrics: [
      { label: "Current value", value: "$9,860.40", detail: "+18.4% absolute", positive: true },
      { label: "Monthly SIP", value: "$650", detail: "Next debit in 8 days" },
      { label: "XIRR", value: "14.7%", detail: "Since first investment", positive: true },
      { label: "Funds", value: "6", detail: "4 equity, 2 debt" },
    ],
    listTitle: "SIP lineup",
    items: [
      { title: "Flexi Cap Fund", detail: "Core equity allocation with broad market exposure.", value: "$250/mo" },
      { title: "Nifty 50 Index", detail: "Low-cost large-cap anchor for the portfolio.", value: "$200/mo" },
      { title: "Short Duration Debt", detail: "Keeps emergency allocation stable.", value: "$200/mo" },
    ],
  },
};

interface DummyPageProps {
  title: string;
}

export default function DummyPage({ title }: DummyPageProps) {
  const page = pages[title] ?? pages["My Bala"];

  return (
    <section className="section-page" aria-labelledby="section-page-title">
      <div className="section-page__header">
        <span>{page.eyebrow}</span>
        <h1 id="section-page-title">{page.title}</h1>
        <p>{page.summary}</p>
      </div>

      <div className="section-metrics" aria-label={`${page.title} metrics`}>
        {page.metrics.map((metric) => (
          <article className="section-metric" key={metric.label}>
            <span>{metric.label}</span>
            <strong className={metric.positive ? "section-metric__positive" : undefined}>
              {metric.value}
            </strong>
            <small>{metric.detail}</small>
          </article>
        ))}
      </div>

      <section className="section-panel" aria-labelledby="section-list-title">
        <div className="section-panel__heading">
          <h2 id="section-list-title">{page.listTitle}</h2>
          <button type="button">View all</button>
        </div>

        <div className="section-list">
          {page.items.map((item) => (
            <article className="section-list__item" key={item.title}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
