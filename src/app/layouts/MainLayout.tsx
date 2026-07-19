import type { ReactNode } from "react";

import Header from "../../shared/components/Header";
import Sidebar from "../../shared/components/Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="content-shell">
        <Header />

        <main className="app-main">{children}</main>
      </div>
    </div>
  );
}
