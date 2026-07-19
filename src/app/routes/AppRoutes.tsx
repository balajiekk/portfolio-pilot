import { Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Dashboard from "../../features/dashboard/Dashboard";
import DummyPage from "../../shared/components/DummyPage";

export default function AppRoutes() {
  const dashboard = (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );

  function dummyPage(title: string) {
    return (
      <MainLayout>
        <DummyPage title={title} />
      </MainLayout>
    );
  }

  return (
    <Routes>
      <Route path="/" element={dashboard} />
      <Route path="/my-bala" element={dummyPage("My Bala")} />
      <Route path="/bala-stocks" element={dummyPage("BalaStocks")} />
      <Route path="/f-and-o" element={dummyPage("F&O")} />
      <Route path="/investments/us-stocks/my-us-stocks" element={dashboard} />
      <Route path="/funds" element={dummyPage("Funds")} />
    </Routes>
  );
}
