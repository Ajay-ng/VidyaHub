import {
  Activity,
  CalendarDays,
  GraduationCap,
  CreditCard,
  UserCheck,
  MapPin,
  Megaphone,
  Clock,
  ArrowUpRight,
  AlertTriangle,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

const activities = [
  {
    title: "New student Aarav Sharma registered in Grade 11–A (Science)",
    time: "12 min ago",
    department: "Admissions Cell (Counter #2)",
    icon: GraduationCap,
    color: "text-blue-600 bg-blue-500/10",
  },
  {
    title: "Fee payment of ₹45,000 cleared via UPI · INV-2026-8942",
    time: "28 min ago",
    department: "Accounts Division",
    icon: CreditCard,
    color: "text-emerald-600 bg-emerald-500/10",
  },
  {
    title: "Sarah Wilson assigned as Class Teacher for Grade 9–B",
    time: "1 hr ago",
    department: "Principal’s Office",
    icon: UserCheck,
    color: "text-violet-600 bg-violet-500/10",
  },
  {
    title: "Grade 10 Physics Mid-Term rescheduled to Hall B",
    time: "2 hrs ago",
    department: "Examination Committee",
    icon: MapPin,
    color: "text-amber-600 bg-amber-500/10",
  },
  {
    title: "Annual Science Exhibition announcement dispatched to all parents",
    time: "3 hrs ago",
    department: "SMS & Mobile App Broadcast",
    icon: Megaphone,
    color: "text-pink-600 bg-pink-500/10",
  },
]

const deadlines = [
  {
    day: "12",
    month: "OCT",
    title: "Parent-Teacher Conference",
    time: "09:30 AM–04:00 PM",
    location: "Main Auditorium",
    priority: "High",
  },
  {
    day: "18",
    month: "OCT",
    title: "CBSE Mid-Term Exams Begin",
    time: "08:30 AM",
    location: "Hall A, B, C & D",
    priority: "High",
  },
  {
    day: "25",
    month: "OCT",
    title: "Inter-School Sports Meet",
    time: "Full day",
    location: "Main Complex",
    priority: "Medium",
  },
]

export default function RecentActivitiesDeadlines() {
  return (
    <div className="mt-5 grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-2">
      {/* Recent Administrative Activities */}
      <Card className="min-w-0 gap-0 border-border/70 shadow-sm">
        <CardHeader className="flex flex-row items-start justify-between gap-3 pb-4">
          <div className="min-w-0 space-y-1">
            <CardTitle className="flex items-center gap-2 text-base font-semibold capitalize sm:text-lg">
              <Activity className="size-5 text-primary" />
              Recent Administrative Activities
            </CardTitle>

            <CardDescription className="text-xs sm:text-sm">
              Latest 5 of 124 actions logged today
            </CardDescription>
          </div>

          <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            Today
          </span>
        </CardHeader>

        <CardContent className="px-4 pb-4 sm:px-6">
          <div className="divide-y">
            {activities.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="flex gap-3 py-4 first:pt-1 last:pb-1"
                >
                  <div className="relative shrink-0">
                    <div
                      className={`flex size-9 items-center justify-center rounded-lg ${item.color}`}
                    >
                      <Icon className="size-4" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="wrap-break-words text-sm leading-5 font-medium">
                      {item.title}
                    </p>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {item.time}
                      </span>

                      <span>{item.department}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            View all activities
            <ArrowUpRight className="size-4" />
          </button>
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <Card className="min-w-0 gap-0 border-border/70 shadow-sm">
        <CardHeader className="flex flex-row items-start justify-between gap-3 pb-4">
          <div className="min-w-0 space-y-1">
            <CardTitle className="flex items-center gap-2 text-base font-semibold capitalize sm:text-lg">
              <CalendarDays className="size-5 text-primary" />
              Upcoming Deadlines
            </CardTitle>

            <CardDescription className="text-xs sm:text-sm">
              Academic calendar · 3 high priority
            </CardDescription>
          </div>

          <span className="flex shrink-0 items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-600">
            <AlertTriangle className="size-3.5" />
            Priority
          </span>
        </CardHeader>

        <CardContent className="px-4 pb-4 sm:px-6">
          <div className="space-y-3">
            {deadlines.map((item) => (
              <div
                key={item.title}
                className="flex gap-3 rounded-xl border p-3 transition-colors hover:bg-muted/40 sm:gap-4 sm:p-4"
              >
                <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-lg border bg-muted/50">
                  <span className="text-lg leading-5 font-bold">
                    {item.day}
                  </span>
                  <span className="mt-1 text-[10px] font-semibold tracking-wider text-muted-foreground">
                    {item.month}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-sm leading-5 font-semibold">
                      {item.title}
                    </h3>

                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        item.priority === "High"
                          ? "bg-red-500/10 text-red-600"
                          : "bg-amber-500/10 text-amber-600"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {item.time}
                    </span>

                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      {item.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            View academic calendar
            <ArrowUpRight className="size-4" />
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
