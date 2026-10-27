type DashboardCardProps = {
  title: string
  value: string
  description: string
}

function DashboardCard({ title, value, description }: DashboardCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <h2 className="text-lg font-semibold">{title}</h2>

      <p className="mt-3 text-3xl font-bold">{value}</p>

      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to Vidyahub</h1>

      <p className="mt-2 text-muted-foreground">
        Here is your student dashboard.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <DashboardCard
          title="Attendance"
          value="92%"
          description="Overall attendance"
        />

        <DashboardCard
          title="Assignments"
          value="3"
          description="Pending assignments"
        />

        <DashboardCard title="Exams" value="2" description="Upcoming exams" />
      </div>
    </div>
  )
}
