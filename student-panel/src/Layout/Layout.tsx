import { SidebarInset } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Sidebar />

      <SidebarInset className="flex min-h-svh flex-col">
        <Header />

        <main className="flex-1 p-6 pb-24">
          <Outlet />
        </main>
      </SidebarInset>

      <Footer />
    </>
  );
}