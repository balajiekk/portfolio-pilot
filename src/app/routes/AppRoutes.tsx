import { Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Dashboard from "../../features/dashboard/Dashboard";

export default function AppRoutes() {
  const dashboard = (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );

  return (
    <Routes>
      <Route path="/" element={dashboard} />
      <Route path="/investments/us-stocks/my-us-stocks" element={dashboard} />
    </Routes>
  );
}
