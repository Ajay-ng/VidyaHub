import DashboardCharts from "@/components/dashboard/DashboardCharts"
import InstentOperationButtons from "@/components/dashboard/InstentOperationButtons"
import RecentActivitiesDeadlines from "@/components/dashboard/RecentActivitiesDeadlines"
import StudentTeacherInfoCards from "@/components/dashboard/StudentTeacherInfoCards"

export default function AdminDashboard() {
  return (
    <div className="w-full">
      {/* header  */}
      <div>
        <p className="text-xs text-muted-foreground">
          <span>AY 2026-2027</span> <span>&bull;</span>{" "}
          <span>CBSE Affiliation</span>
        </p>

        <h1>Executive Dashboard</h1>

        <p className="text-xs text-muted-foreground">
          Real-time overview of academic operations, enrollment metrics, and
          institutional performance.
        </p>
      </div>

      {/* instent operstions buttons */}
      <InstentOperationButtons />

      {/* Cards of the total numbers */}
      <StudentTeacherInfoCards />

      {/* Graph Respsentation of the studend */}
      <DashboardCharts />

      {/* nothification and todo */}
      <RecentActivitiesDeadlines />
    </div>
  )
}
