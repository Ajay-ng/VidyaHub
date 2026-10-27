import { Outlet } from "react-router"
import AdminFooter from "./AdminFooter"
import AdminHeader from "./AdminHeader"
import AdminSidebar from "./AdminSidebar"

export default function AdminLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <aside>
        <AdminSidebar />
      </aside>

      {/* Main content area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <AdminHeader />

        {/* Page content */}
        <main className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <AdminFooter />
      </div>
    </div>
  )
}
