import { Card, CardContent } from "../ui/card"

interface DashboardStat {
  title: string
  value: string
  description: string
  trend?: string
  trendType?: "positive" | "negative" | "neutral"
}

export default function StudentTeacherInfoCards() {
  const dashboardStats: DashboardStat[] = [
    {
      title: "Total Students",
      value: "2,845",
      description: "1,490 boys / 1,355 girls",
      trend: "+8.2%",
      trendType: "positive",
    },
    {
      title: "Total Teachers",
      value: "184",
      description: "98.4% retention · 1:15 ratio",
      trend: "+5.4%",
      trendType: "positive",
    },
    {
      title: "Total Staff",
      value: "72",
      description: "Operational · Admin, Security & Transport",
      trendType: "neutral",
    },
    {
      title: "Attendance Today",
      value: "94.2%",
      description: "2,680 present / 112 absent / 53 late",
      trend: "+2.1%",
      trendType: "positive",
    },
  ]
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardStats.map((item) => (
        <Card key={item.title} className="h-full min-w-0 py-2">
          <CardContent className="flex h-full flex-col sm:p-5">
            <p className="text-xs font-medium text-muted-foreground">
              {item.title}
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight">
              {item.value}
            </h2>

            <p className="wrap-break-words mt-2 text-xs leading-5 text-muted-foreground">
              {item.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
