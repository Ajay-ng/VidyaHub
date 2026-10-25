import { Outlet } from "react-router"
import AdminFooter from "./AdminFooter"
import AdminHeader from "./AdminHeader"
import AdminSidebar from "./AdminSidebar"

function AdminLayout() {
  return (
    <div>
      <AdminSidebar />
      <div>
        <AdminHeader />
        <main>
          <Outlet />
        </main>
        <AdminFooter />
      </div>
    </div>
  )
}

export default AdminLayout
