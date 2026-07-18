import type { Kpi } from "../types/dashboard";

interface Props {
  item: Kpi;
}

export default function KpiCard({ item }: Props) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        minHeight: "120px",
      }}
    >
      <p
        style={{
          color: "#6B7280",
          fontSize: "14px",
          marginBottom: "12px",
        }}
      >
        {item.title}
      </p>

      <h2
        style={{
          marginBottom: "10px",
        }}
      >
        {item.value}
      </h2>

      <span
        style={{
          color: item.positive ? "#16A34A" : "#DC2626",
          fontWeight: "bold",
        }}
      >
        {item.change}
      </span>
    </div>
  );
}