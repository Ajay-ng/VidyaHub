
import type { ReactNode } from "react";
import { SidebarInset } from "@/components/ui/sidebar";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Sidebar />

      <SidebarInset>
        <Header />

        <main className="flex-1 p-6">
          {children}
        </main>
      </SidebarInset>
    </>
  );
}
