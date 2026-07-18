import type { ReactNode } from "react";

import Header from "../../shared/components/Header";
import Sidebar from "../../shared/components/Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({
  children,
}: MainLayoutProps) {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />

        <main
          style={{
            flex: 1,
            padding: "30px",
            background: "#f4f6f9",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}