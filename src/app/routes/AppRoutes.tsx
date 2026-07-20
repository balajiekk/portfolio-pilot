import type { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import BalaStocksPage from "../../features/bala-stocks/BalaStocksPage";
import Dashboard from "../../features/dashboard/Dashboard";
import ExplorePage from "../../features/explore/ExplorePage";
import FAndOPage from "../../features/f-and-o/FAndOPage";
import FundsPage from "../../features/funds/FundsPage";
import MyBalaPage from "../../features/my-bala/MyBalaPage";
import DummyPage from "../../shared/DummyPage";

function withLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={withLayout(<Dashboard />)} />
      <Route path="/explore" element={withLayout(<ExplorePage />)} />
      <Route path="/my-bala" element={withLayout(<MyBalaPage />)} />
      <Route path="/bala-stocks" element={withLayout(<BalaStocksPage />)} />
      <Route path="/f-and-o" element={withLayout(<FAndOPage />)} />
      <Route path="/investments/us-stocks/my-us-stocks" element={withLayout(<Dashboard />)} />
      <Route path="/orders" element={withLayout(<DummyPage title="Orders" />)} />
      <Route path="/wallet-history" element={withLayout(<DummyPage title="Wallet History" />)} />
      <Route path="/funds" element={withLayout(<FundsPage />)} />
    </Routes>
  );
}
