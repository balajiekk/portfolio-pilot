import { ArrowDownRight, ArrowUpRight, Lightbulb, TrendingUp, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SectionMetric {
  label: string;
  value: string;
  detail: string;
  positive?: boolean;
}

type SectionListIcon = "chart" | "lightbulb" | "wallet";

export interface SectionListItem {
  title: string;
  detail: string;
  value: string;
  icon?: SectionListIcon;
}

const sectionListIcons: Record<SectionListIcon, LucideIcon> = {
  chart: TrendingUp,
  lightbulb: Lightbulb,
  wallet: Wallet,
};

interface SectionPageProps {
  eyebrow: string;
  title: string;
  summary: string;
  metrics: SectionMetric[];
  listTitle: string;
  items: SectionListItem[];
}

export default function SectionPage({
  eyebrow,
  title,
  summary,
  metrics,
  listTitle,
  items,
}: SectionPageProps) {
  return (
    <section className="section-page" aria-labelledby="section-page-title">
      <div className="section-page__header">
        <span>{eyebrow}</span>
        <h1 id="section-page-title">{title}</h1>
        <p>{summary}</p>
      </div>

      <div className="section-metrics" aria-label={`${title} metrics`}>
        {metrics.map((metric) => {
          const hasTrend = typeof metric.positive === "boolean";
          const TrendIcon = metric.positive ? ArrowUpRight : ArrowDownRight;

          return (
            <article className="section-metric" key={metric.label}>
              <span>{metric.label}</span>
              <strong
                className={
                  hasTrend
                    ? metric.positive
                      ? "section-metric__positive"
                      : "section-metric__negative"
                    : undefined
                }
              >
                {metric.value}
              </strong>
              <small
                className={
                  hasTrend
                    ? metric.positive
                      ? "section-metric__detail-positive"
                      : "section-metric__detail-negative"
                    : undefined
                }
              >
                {hasTrend ? <TrendIcon aria-hidden="true" size={14} strokeWidth={2.5} /> : null}
                {metric.detail}
              </small>
            </article>
          );
        })}
      </div>

      <section className="section-panel" aria-labelledby="section-list-title">
        <div className="section-panel__heading">
          <h2 id="section-list-title">{listTitle}</h2>
          <button type="button">View all</button>
        </div>

        <div className="section-list">
          {items.map((item) => {
            const Icon = item.icon ? sectionListIcons[item.icon] : null;

            return (
              <article
                className={`section-list__item${Icon ? " section-list__item--with-icon" : ""}`}
                key={item.title}
              >
                {Icon ? (
                  <span className="section-list__icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={2.3} />
                  </span>
                ) : null}

                <div className="section-list__content">
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
                <strong>{item.value}</strong>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}
