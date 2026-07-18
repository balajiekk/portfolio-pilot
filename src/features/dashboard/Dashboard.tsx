import KpiCard from "./components/KpiCard";
import { kpis } from "./data/portfolioData";

export default function Dashboard() {
  return (
    <>
      <h1
        style={{
          marginBottom: "30px",
        }}
      >
        Portfolio Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "20px",
        }}
      >
        {kpis.map((item) => (
          <KpiCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}