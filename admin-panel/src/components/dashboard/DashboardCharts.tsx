import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

const enrollmentData = [
  { year: "2022", students: 1450 },
  { year: "2023", students: 1820 },
  { year: "2024", students: 2140 },
  { year: "2025", students: 2520 },
  { year: "2026 (AY)", students: 2845 },
]

const attendanceData = [
  { session: "Morning", attendance: 88 },
  { session: "Mid-morning", attendance: 91 },
  { session: "Afternoon", attendance: 90 },
  { session: "Late afternoon", attendance: 93 },
  { session: "Today", attendance: 94.2 },
]

export default function DashboardCharts() {
  return (
    <div className="mt-4 grid grid-cols-1 gap-5 xl:grid-cols-2">
      {/* Student Enrollment Trends */}
      <Card className="min-w-0 border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle className="text-md font-semibold tracking-tight capitalize sm:text-xl">
            Student Enrollment Trends
          </CardTitle>

          <CardDescription className="text-sm sm:text-base">
            Year-on-year expansion · AY 2022 to 2026
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0 pb-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground sm:text-sm">
              New admissions / total enrolled
            </p>

            <p className="shrink-0 text-sm font-semibold">2,845 students</p>
          </div>

          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={enrollmentData}
                margin={{ top: 5, right: 8, left: 0, bottom: 0 }}
                barCategoryGap="42%"
              >
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  dy={8}
                />

                <YAxis hide domain={[0, 3200]} />

                <Bar
                  dataKey="students"
                  radius={[5, 5, 0, 0]}
                  barSize={40}
                  fill="var(--primary)"
                  activeBar={false}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Real-Time Attendance Overview */}
      <Card className="min-w-0 border-border/70 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold tracking-tight capitalize">
            Real-Time Attendance Overview
          </CardTitle>

          <CardDescription className="text-sm sm:text-base">
            Student check-in breakdown by session · Today
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0 pb-4">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={attendanceData}
                margin={{ top: 5, right: 5, left: 5, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="attendanceGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--primary)"
                      stopOpacity={0.12}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--primary)"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>

                <XAxis dataKey="session" hide />
                <YAxis hide domain={[85, 100]} />

                <Area
                  type="monotone"
                  dataKey="attendance"
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  fill="url(#attendanceGradient)"
                  isAnimationActive={false}
                  dot={false}
                  activeDot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 border-t pt-4 sm:grid-cols-3">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <span className="size-2 shrink-0 rounded-full bg-blue-600" />
              Present 94.2%
            </p>

            <p className="flex items-center gap-2 text-sm font-semibold sm:justify-center">
              <span className="size-2 shrink-0 rounded-full bg-amber-600" />
              Late arrivals 1.9%
            </p>

            <p className="flex items-center gap-2 text-sm font-semibold sm:justify-end">
              <span className="size-2 shrink-0 rounded-full bg-red-600" />
              Absent 3.9%
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
