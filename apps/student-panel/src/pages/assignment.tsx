import { useState } from "react"
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  CalendarDays,
  BookOpen,
  FileText,
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

type AssignmentStatus = "Pending" | "Submitted" | "Overdue"

type Assignment = {
  id: number
  title: string
  subject: string
  code: string
  description: string
  assignedDate: string
  dueDate: string
  status: AssignmentStatus
  marks?: number
  totalMarks: number
}

const assignments: Assignment[] = [
  {
    id: 1,
    title: "Algebra Problem Set",
    subject: "Mathematics",
    code: "MAT101",
    description: "Solve the assigned algebra equations and show your steps.",
    assignedDate: "2026-10-20",
    dueDate: "2026-10-29",
    status: "Pending",
    totalMarks: 20,
  },
  {
    id: 2,
    title: "React Components",
    subject: "Computer Science",
    code: "CS201",
    description: "Build reusable React components using props and state.",
    assignedDate: "2026-10-18",
    dueDate: "2026-10-25",
    status: "Submitted",
    marks: 18,
    totalMarks: 20,
  },
  {
    id: 3,
    title: "Electronic Circuits",
    subject: "Electronics",
    code: "EC301",
    description: "Draw and explain basic electronic circuit diagrams.",
    assignedDate: "2026-10-15",
    dueDate: "2026-10-22",
    status: "Overdue",
    totalMarks: 25,
  },
  {
    id: 4,
    title: "Physics Lab Report",
    subject: "Physics",
    code: "PHY101",
    description: "Prepare a lab report with observations and calculations.",
    assignedDate: "2026-10-23",
    dueDate: "2026-10-30",
    status: "Pending",
    totalMarks: 15,
  },
  {
    id: 5,
    title: "Data Structures Analysis",
    subject: "Data Structures",
    code: "CS202",
    description: "Explain stack and queue operations with examples.",
    assignedDate: "2026-10-12",
    dueDate: "2026-10-20",
    status: "Submitted",
    marks: 16,
    totalMarks: 20,
  },
  {
    id: 6,
    title: "Digital Logic Design",
    subject: "Digital Systems",
    code: "EC302",
    description: "Design truth tables and simplify Boolean expressions.",
    assignedDate: "2026-10-24",
    dueDate: "2026-11-02",
    status: "Pending",
    totalMarks: 25,
  },
]

const filters = ["All", "Pending", "Submitted", "Overdue"] as const

const statusVariant = {
  Pending: "secondary",
  Submitted: "default",
  Overdue: "destructive",
} as const

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export default function Assignments() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<string>("All")

  const totalAssignments = assignments.length

  const pendingCount = assignments.filter(
    (assignment) => assignment.status === "Pending"
  ).length

  const submittedCount = assignments.filter(
    (assignment) => assignment.status === "Submitted"
  ).length

  const overdueCount = assignments.filter(
    (assignment) => assignment.status === "Overdue"
  ).length

  const filteredAssignments = assignments.filter((assignment) => {
    const query = search.trim().toLowerCase()

    const matchesSearch =
      assignment.title.toLowerCase().includes(query) ||
      assignment.subject.toLowerCase().includes(query) ||
      assignment.code.toLowerCase().includes(query)

    const matchesFilter = filter === "All" || assignment.status === filter

    return matchesSearch && matchesFilter
  })

  const summaryCards = [
    {
      label: "Total Assignments",
      count: totalAssignments,
      icon: ClipboardList,
      iconClass: "text-blue-600",
      description: "All assigned work",
    },
    {
      label: "Pending",
      count: pendingCount,
      icon: Clock,
      iconClass: "text-amber-600",
      description: "Awaiting submission",
    },
    {
      label: "Submitted",
      count: submittedCount,
      icon: CheckCircle2,
      iconClass: "text-emerald-600",
      description: "Work submitted",
    },
    {
      label: "Overdue",
      count: overdueCount,
      icon: AlertCircle,
      iconClass: "text-red-600",
      description: "Past due date",
    },
  ]

  return (
    <div className="space-y-5 font-sans">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Assignments
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            View your coursework, track deadlines, and check submission status.
          </p>
        </div>

        <Badge variant="secondary" className="w-fit px-3 py-1 text-xs">
          {pendingCount} Pending
        </Badge>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {summaryCards.map((item) => {
          const Icon = item.icon

          return (
            <Card key={item.label} className="gap-0 py-0">
              <CardContent className="flex items-start gap-3 p-3 sm:p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <Icon className={`size-5 ${item.iconClass}`} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">
                    {item.count}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Assignment list */}
      <Card className="gap-0 py-0">
        <CardHeader className="gap-1 p-4">
          <CardTitle className="text-base font-semibold sm:text-lg">
            My Assignments
          </CardTitle>
          <CardDescription className="text-sm">
            Search and filter assignments by their current status.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 p-4 pt-0">
          {/* Search */}
          <div className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by assignment, subject, or code..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-9"
            />
          </div>

          {/* Filters */}
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

          {/* Assignment cards */}
          {filteredAssignments.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {filteredAssignments.map((assignment) => (
                <Card
                  key={assignment.id}
                  className="gap-0 py-0 transition-shadow hover:shadow-md"
                >
                  <CardContent className="space-y-4 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                          <FileText className="size-5 text-muted-foreground" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-sm leading-5 font-semibold sm:text-base">
                            {assignment.title}
                          </h3>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {assignment.subject} · {assignment.code}
                          </p>
                        </div>
                      </div>

                      <Badge
                        variant={statusVariant[assignment.status]}
                        className="shrink-0 text-xs"
                      >
                        {assignment.status}
                      </Badge>
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {assignment.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/50 p-3">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Assigned date
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 text-xs font-medium sm:text-sm">
                          <CalendarDays className="size-3.5 shrink-0" />
                          {formatDate(assignment.assignedDate)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Due date
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 text-xs font-medium sm:text-sm">
                          <Clock className="size-3.5 shrink-0" />
                          {formatDate(assignment.dueDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 border-t pt-3">
                      <span className="text-xs text-muted-foreground">
                        {assignment.marks !== undefined
                          ? "Marks obtained"
                          : "Maximum marks"}
                      </span>

                      <span className="text-sm font-semibold tabular-nums">
                        {assignment.marks !== undefined
                          ? `${assignment.marks} / ${assignment.totalMarks}`
                          : `${assignment.totalMarks} marks`}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed px-4 py-10 text-center">
              <Search className="mx-auto mb-3 size-8 text-muted-foreground" />
              <p className="text-sm font-semibold">No assignments found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try another search term or status filter.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
