import type { ReactNode } from "react";

import Sidebar from "../../shared/components/Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="content-shell">
        <main className="app-main">{children}</main>
      </div>
    </div>
  );
}
