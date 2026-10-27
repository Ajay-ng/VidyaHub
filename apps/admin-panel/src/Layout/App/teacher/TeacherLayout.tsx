import { Outlet } from "react-router";
import TeacherSidebar from "./TeacherSidebar";
import TeacherHeader from "./TeacherHeader";
import TeacherFooter from "./TeacherFooter";

import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";

export default function TeacherLayout() {
  return (
    <SidebarProvider>
      <TeacherSidebar />

      <SidebarInset>
        <div className="flex min-h-screen flex-col">
          <TeacherHeader />

          <main className="flex-1 p-6">
            <Outlet />
          </main>

          <TeacherFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}