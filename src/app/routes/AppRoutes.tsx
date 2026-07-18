import { Routes, Route } from "react-router-dom";

function Dashboard() {
  return (
    <div
      style={{
        padding: "40px",
        fontSize: "32px",
        fontWeight: "bold",
      }}
    >
      📈 PortfolioPilot Dashboard
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}