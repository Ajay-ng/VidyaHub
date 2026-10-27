
import { SidebarInset } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <Sidebar />

      <SidebarInset>
        <Header />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </>
  );
}
