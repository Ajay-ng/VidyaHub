import { Outlet } from "react-router"
import TeacherSidebar from "./TeacherSidebar"
import TeacherHeader from "./TeacherHeader"
import TeacherFooter from "./TeacherFooter"

export default function TeacherLayout() {
  return (
    <div>
      <TeacherSidebar />
      <div>
        <TeacherHeader />
        <main>
          <Outlet />
        </main>
        <TeacherFooter />
      </div>
    </div>
  )
}
