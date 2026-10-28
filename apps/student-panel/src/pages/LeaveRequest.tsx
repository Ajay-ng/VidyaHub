import { useMemo, useState } from "react"
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Plus,
  Search,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type LeaveStatus = "Pending" | "Approved" | "Rejected"

type LeaveRequest = {
  id: number
  type: string
  from: string
  to: string
  days: number
  reason: string
  appliedOn: string
  status: LeaveStatus
}

const initialRequests: LeaveRequest[] = [
  {
    id: 1,
    type: "Medical Leave",
    from: "2026-10-05",
    to: "2026-10-06",
    days: 2,
    reason: "Fever and medical rest",
    appliedOn: "2026-10-02",
    status: "Approved",
  },
  {
    id: 2,
    type: "Personal Leave",
    from: "2026-10-30",
    to: "2026-10-30",
    days: 1,
    reason: "Family function",
    appliedOn: "2026-10-27",
    status: "Pending",
  },
  {
    id: 3,
    type: "Emergency Leave",
    from: "2026-09-15",
    to: "2026-09-16",
    days: 2,
    reason: "Urgent family matter",
    appliedOn: "2026-09-14",
    status: "Rejected",
  },
  {
    id: 4,
    type: "Personal Leave",
    from: "2026-08-20",
    to: "2026-08-20",
    days: 1,
    reason: "Personal work",
    appliedOn: "2026-08-18",
    status: "Approved",
  },
]

const leaveTypes = [
  "Medical Leave",
  "Personal Leave",
  "Emergency Leave",
  "Other",
]

type FilterType = "All" | LeaveStatus

function formatDate(date: string) {
  if (!date) return "—"

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function getLeaveDays(from: string, to: string) {
  if (!from || !to) return 0

  const start = new Date(`${from}T00:00:00`)
  const end = new Date(`${to}T00:00:00`)

  return Math.round((end.getTime() - start.getTime()) / 86400000) + 1
}

function StatusBadge({ status }: { status: LeaveStatus }) {
  if (status === "Approved") {
    return (
      <Badge className="gap-1 bg-emerald-600 text-white hover:bg-emerald-600">
        <CheckCircle2 className="size-3" />
        Approved
      </Badge>
    )
  }

  if (status === "Rejected") {
    return (
      <Badge variant="destructive" className="gap-1">
        <XCircle className="size-3" />
        Rejected
      </Badge>
    )
  }

  return (
    <Badge variant="secondary" className="gap-1">
      <Clock3 className="size-3" />
      Pending
    </Badge>
  )
}

export default function LeaveRequestPage() {
  const [requests, setRequests] = useState<LeaveRequest[]>(initialRequests)

  const [filter, setFilter] = useState<FilterType>("All")
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)

  const [leaveType, setLeaveType] = useState("Medical Leave")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [reason, setReason] = useState("")
  const [error, setError] = useState("")

  const today = new Date().toLocaleDateString("en-CA")

  const stats = useMemo(() => {
    return {
      total: requests.length,
      approved: requests.filter((r) => r.status === "Approved").length,
      pending: requests.filter((r) => r.status === "Pending").length,
      rejected: requests.filter((r) => r.status === "Rejected").length,
      approvedDays: requests
        .filter((r) => r.status === "Approved")
        .reduce((sum, r) => sum + r.days, 0),
    }
  }, [requests])

  const filteredRequests = requests.filter((request) => {
    const matchesStatus = filter === "All" || request.status === filter

    const searchText =
      `${request.type} ${request.reason} ${request.status}`.toLowerCase()

    return matchesStatus && searchText.includes(search.toLowerCase())
  })

  function resetForm() {
    setLeaveType("Medical Leave")
    setFrom("")
    setTo("")
    setReason("")
    setError("")
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    if (!from || !to || !reason.trim()) {
      setError("Please complete all required fields.")
      return
    }

    if (from < today) {
      setError("The start date cannot be in the past.")
      return
    }

    if (to < from) {
      setError("The end date must be on or after the start date.")
      return
    }

    const overlaps = requests.some((request) => {
      if (request.status === "Rejected") return false

      return from <= request.to && to >= request.from
    })

    if (overlaps) {
      setError(
        "These dates overlap with an existing pending or approved leave."
      )
      return
    }

    const newRequest: LeaveRequest = {
      id: Date.now(),
      type: leaveType,
      from,
      to,
      days: getLeaveDays(from, to),
      reason: reason.trim(),
      appliedOn: today,
      status: "Pending",
    }

    setRequests((previous) => [newRequest, ...previous])
    setFilter("All")
    setSearch("")
    resetForm()
    setShowForm(false)
  }

  return (
    <main className="space-y-6 bg-background p-2 text-foreground">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Leave Requests
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Apply for leave and track your application status.
          </p>
        </div>

        <Button onClick={() => setShowForm((previous) => !previous)}>
          <Plus className="mr-2 size-4" />
          {showForm ? "Close Form" : "Apply for Leave"}
        </Button>
      </section>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="min-w-0 gap-0 py-0">
          <CardContent className="flex items-center gap-2 p-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
              <FileText className="size-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">
                Total Applied
              </p>
              <p className="mt-0.5 text-lg font-semibold tabular-nums">
                {stats.total}
              </p>
              <p className="text-[11px] text-muted-foreground">
                All leave applications
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0 gap-0 py-0">
          <CardContent className="flex items-center gap-2 p-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
              <CheckCircle2 className="size-4 text-emerald-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">
                Approved
              </p>
              <p className="mt-0.5 text-lg font-semibold tabular-nums">
                {stats.approved}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {stats.approvedDays} approved calendar days
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0 gap-0 py-0">
          <CardContent className="flex items-center gap-2 p-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Clock3 className="size-4 text-amber-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">
                Pending
              </p>
              <p className="mt-0.5 text-lg font-semibold tabular-nums">
                {stats.pending}
              </p>
              <p className="text-[11px] text-muted-foreground">
                Waiting for a decision
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0 gap-0 py-0">
          <CardContent className="flex items-center gap-2 p-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
              <XCircle className="size-4 text-destructive" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">
                Rejected
              </p>
              <p className="mt-0.5 text-lg font-semibold tabular-nums">
                {stats.rejected}
              </p>
              <p className="text-[11px] text-muted-foreground">
                Applications not approved
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
      {/* Apply form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Apply for Leave</CardTitle>
            <CardDescription>
              Enter your leave details. Your application will be marked as
              pending until it is reviewed.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="leaveType">Leave Type</Label>
                  <select
                    id="leaveType"
                    value={leaveType}
                    onChange={(event) => setLeaveType(event.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    {leaveTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="leaveReason">Reason for Leave</Label>
                  <Input
                    id="leaveReason"
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                    placeholder="Enter your reason"
                    maxLength={300}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fromDate">Start Date</Label>
                  <Input
                    id="fromDate"
                    type="date"
                    value={from}
                    min={today}
                    onChange={(event) => setFrom(event.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toDate">End Date</Label>
                  <Input
                    id="toDate"
                    type="date"
                    value={to}
                    min={from || today}
                    onChange={(event) => setTo(event.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="details">Additional Details</Label>
                  <Textarea
                    id="details"
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                    placeholder="Explain why you need leave..."
                    maxLength={300}
                    rows={3}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    {reason.length}/300 characters
                  </p>
                </div>
              </div>

              {from && to && to >= from && (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="size-4" />
                  Requested duration: {getLeaveDays(from, to)} calendar day(s)
                </p>
              )}

              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                <Button type="submit">Submit Application</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetForm()
                    setShowForm(false)
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Leave history */}
      <Card>
        <CardHeader>
          <CardTitle>Leave History</CardTitle>
          <CardDescription>
            Review your applications, dates, and approval status.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search leave requests..."
                className="pl-9"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {(["All", "Pending", "Approved", "Rejected"] as const).map(
                (item) => (
                  <Button
                    key={item}
                    type="button"
                    size="sm"
                    variant={filter === item ? "default" : "outline"}
                    onClick={() => setFilter(item)}
                  >
                    {item}
                  </Button>
                )
              )}
            </div>
          </div>

          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Applied On</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        {request.type}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {formatDate(request.from)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {formatDate(request.to)}
                      </TableCell>
                      <TableCell>{request.days}</TableCell>
                      <TableCell className="max-w-48">
                        <span className="line-clamp-2">{request.reason}</span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {formatDate(request.appliedOn)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={request.status} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No leave requests found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
