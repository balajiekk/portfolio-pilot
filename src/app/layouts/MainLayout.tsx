import type { ReactNode } from "react";

import Header from "../../shared/components/Header";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="app-shell">
      <div className="content-shell">
        <Header />

        <main className="app-main">{children}</main>
      </div>
    </div>
  );
}
