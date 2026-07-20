import { lazy, Suspense } from "react";
import type { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DummyPage from "../../shared/DummyPage";

const BalaStocksPage = lazy(() => import("../../features/bala-stocks/BalaStocksPage"));
const Dashboard = lazy(() => import("../../features/dashboard/Dashboard"));
const ExplorePage = lazy(() => import("../../features/explore/ExplorePage"));
const FAndOPage = lazy(() => import("../../features/f-and-o/FAndOPage"));
const FundsPage = lazy(() => import("../../features/funds/FundsPage"));
const MyBalaPage = lazy(() => import("../../features/my-bala/MyBalaPage"));

function withLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Suspense fallback={<div className="route-loading">Loading page...</div>}>{page}</Suspense>
    </MainLayout>
  );
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
      <Route path="/watchlist" element={withLayout(<DummyPage title="Watchlist" />)} />
      <Route path="/funds" element={withLayout(<FundsPage />)} />
    </Routes>
  );
}
