import { useState } from "react"
import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  Search,
  BookOpen,
  Clock,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type AttendanceStatus = "Present" | "Absent"

type AttendanceRecord = {
  id: number
  date: string
  subject: string
  code: string
  time: string
  status: AttendanceStatus
}

const attendanceRecords: AttendanceRecord[] = [
  {
    id: 1,
    date: "2026-10-27",
    subject: "Mathematics",
    code: "MAT101",
    time: "09:00 AM",
    status: "Present",
  },
  {
    id: 2,
    date: "2026-10-27",
    subject: "Computer Science",
    code: "CS201",
    time: "11:00 AM",
    status: "Present",
  },
  {
    id: 3,
    date: "2026-10-26",
    subject: "Electronics",
    code: "EC301",
    time: "10:00 AM",
    status: "Absent",
  },
  {
    id: 4,
    date: "2026-10-26",
    subject: "Physics",
    code: "PHY101",
    time: "09:30 AM",
    status: "Present",
  },
  {
    id: 5,
    date: "2026-10-23",
    subject: "Mathematics",
    code: "MAT101",
    time: "09:00 AM",
    status: "Absent",
  },
  {
    id: 6,
    date: "2026-10-23",
    subject: "Data Structures",
    code: "CS202",
    time: "02:00 PM",
    status: "Present",
  },
  {
    id: 7,
    date: "2026-10-22",
    subject: "Computer Science",
    code: "CS201",
    time: "11:00 AM",
    status: "Absent",
  },
  {
    id: 8,
    date: "2026-10-22",
    subject: "Digital Systems",
    code: "EC302",
    time: "10:30 AM",
    status: "Present",
  },
]

const filters = ["All", "Present", "Absent"] as const

const statusVariant = {
  Present: "default",
  Absent: "destructive",
} as const

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export default function Attendance() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<string>("All")

  const totalClasses = attendanceRecords.length

  const presentCount = attendanceRecords.filter(
    (record) => record.status === "Present"
  ).length

  const absentCount = attendanceRecords.filter(
    (record) => record.status === "Absent"
  ).length

  const attendancePercentage =
    totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0

  const filteredRecords = attendanceRecords.filter((record) => {
    const query = search.trim().toLowerCase()

    const matchesSearch =
      record.subject.toLowerCase().includes(query) ||
      record.code.toLowerCase().includes(query)

    const matchesFilter = filter === "All" || record.status === filter

    return matchesSearch && matchesFilter
  })

  const summaryCards = [
    {
      label: "Total Classes",
      count: totalClasses,
      icon: BookOpen,
      iconClass: "text-blue-600",
      description: "Classes recorded",
    },
    {
      label: "Present",
      count: presentCount,
      icon: CheckCircle2,
      iconClass: "text-emerald-600",
      description: "Classes attended",
    },
    {
      label: "Absent",
      count: absentCount,
      icon: XCircle,
      iconClass: "text-red-600",
      description: "Classes missed",
    },
  ]

  return (
    <div className="space-y-5 font-sans">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Attendance
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Track your attendance and review your class history.
          </p>
        </div>

        <Badge variant="secondary" className="w-fit px-3 py-1 text-xs">
          {attendancePercentage}% Attendance
        </Badge>
      </div>

      {/* Attendance percentage card */}
      <Card className="gap-3 py-4">
        <CardContent className="space-y-3 px-4 sm:px-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Overall Attendance
              </p>

              <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">
                {attendancePercentage}%
              </p>
            </div>

            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <CalendarDays className="size-6 text-primary" />
            </div>
          </div>

          <div
            className="h-2.5 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-label="Overall attendance"
            aria-valuenow={attendancePercentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${attendancePercentage}%` }}
            />
          </div>

          <p className="text-xs text-muted-foreground">
            You attended {presentCount} out of {totalClasses} recorded classes.
            Sample data for demonstration.
          </p>
        </CardContent>
      </Card>

      {/* Summary cards */}
      <div className="grid grid-cols-1 justify-items-start gap-2 sm:grid-cols-3">
        {summaryCards.map((item) => {
          const Icon = item.icon

          return (
            <Card key={item.label} className="w-full max-w-sm gap-0 py-0">
              <CardContent className="flex items-center gap-2 p-2.5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon className={`size-4 ${item.iconClass}`} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">
                    {item.label}
                  </p>

                  <p className="mt-0.5 text-lg font-semibold tracking-tight tabular-nums">
                    {item.count}
                  </p>

                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Attendance history */}
      <Card className="gap-0 py-0">
        <CardHeader className="gap-1 p-4">
          <CardTitle className="text-base font-semibold sm:text-lg">
            Attendance History
          </CardTitle>

          <CardDescription className="text-sm">
            Review your attendance for each subject.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 p-4 pt-0">
          {/* Search and filters */}
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search by subject or course code..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant={filter === status ? "default" : "outline"}
                  onClick={() => setFilter(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          {/* Attendance records */}
          {filteredRecords.length > 0 ? (
            <div className="space-y-3">
              {filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <BookOpen className="size-5 text-muted-foreground" />
                    </div>

                    <div className="min-w-0 space-y-1">
                      <p className="truncate text-sm font-semibold">
                        {record.subject}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {record.code}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="size-3.5" />
                          {formatDate(record.date)}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock className="size-3.5" />
                          {record.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Badge
                    variant={statusVariant[record.status]}
                    className="w-fit shrink-0"
                  >
                    {record.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed px-4 py-10 text-center">
              <Search className="mx-auto mb-3 size-8 text-muted-foreground" />

              <p className="text-sm font-semibold">No records found</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Try another subject or attendance filter.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
