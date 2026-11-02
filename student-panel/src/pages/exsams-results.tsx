import { useMemo, useState } from "react"
import {
  CalendarDays,
  Clock,
  Eye,
  GraduationCap,
  Search,
  Trophy,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

type ExamStatus = "Upcoming" | "Completed"

type Exam = {
  id: number
  subject: string
  code: string
  examName: string
  date: string
  time: string
  totalMarks: number
  obtainedMarks?: number
  status: ExamStatus
}

const exams: Exam[] = [
  {
    id: 1,
    subject: "Mathematics",
    code: "MAT101",
    examName: "Mid-Term Examination",
    date: "2026-11-02",
    time: "09:00 AM",
    totalMarks: 100,
    status: "Upcoming",
  },
  {
    id: 2,
    subject: "Computer Science",
    code: "CS201",
    examName: "Programming Assessment",
    date: "2026-11-04",
    time: "11:00 AM",
    totalMarks: 100,
    status: "Upcoming",
  },
  {
    id: 3,
    subject: "Electronics",
    code: "EC301",
    examName: "Internal Assessment",
    date: "2026-10-20",
    time: "10:00 AM",
    totalMarks: 100,
    obtainedMarks: 82,
    status: "Completed",
  },
  {
    id: 4,
    subject: "Physics",
    code: "PHY101",
    examName: "Unit Test 1",
    date: "2026-10-18",
    time: "09:30 AM",
    totalMarks: 100,
    obtainedMarks: 76,
    status: "Completed",
  },
  {
    id: 5,
    subject: "Data Structures",
    code: "CS202",
    examName: "Practical Examination",
    date: "2026-11-07",
    time: "02:00 PM",
    totalMarks: 50,
    status: "Upcoming",
  },
  {
    id: 6,
    subject: "Digital Systems",
    code: "EC302",
    examName: "Internal Assessment",
    date: "2026-10-15",
    time: "10:30 AM",
    totalMarks: 100,
    obtainedMarks: 91,
    status: "Completed",
  },
]

const filters = ["All", "Upcoming", "Completed"] as const
type ExamFilter = (typeof filters)[number]

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function getGrade(percentage: number) {
  if (percentage >= 90) return "A+"
  if (percentage >= 80) return "A"
  if (percentage >= 70) return "B"
  if (percentage >= 60) return "C"
  if (percentage >= 50) return "D"
  return "F"
}

export default function Results() {
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState<ExamFilter>("All")
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)

  const completedExams = exams.filter((exam) => exam.status === "Completed")

  const upcomingCount = exams.filter(
    (exam) => exam.status === "Upcoming"
  ).length

  const totalObtained = completedExams.reduce(
    (total, exam) => total + (exam.obtainedMarks ?? 0),
    0
  )

  const totalPossible = completedExams.reduce(
    (total, exam) => total + exam.totalMarks,
    0
  )

  const averageScore =
    totalPossible > 0 ? Math.round((totalObtained / totalPossible) * 100) : 0

  const filteredExams = useMemo(() => {
    const query = search.trim().toLowerCase()

    return exams.filter((exam) => {
      const matchesSearch =
        exam.subject.toLowerCase().includes(query) ||
        exam.code.toLowerCase().includes(query) ||
        exam.examName.toLowerCase().includes(query)

      const matchesFilter =
        activeFilter === "All" || exam.status === activeFilter

      return matchesSearch && matchesFilter
    })
  }, [search, activeFilter])

  const selectedPercentage =
    selectedExam && selectedExam.totalMarks > 0
      ? Math.round(
          ((selectedExam.obtainedMarks ?? 0) / selectedExam.totalMarks) * 100
        )
      : 0

  return (
    <main className="w-full min-w-0 space-y-5 overflow-x-hidden bg-background p-3 sm:space-y-6 sm:p-5 lg:p-8">
      {/* Page heading */}
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
            Exams & Results
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View your upcoming exams and academic performance.
          </p>
        </div>

        <Badge variant="outline" className="w-fit shrink-0 px-3 py-1">
          Academic Year 2026–27
        </Badge>
      </div>

      {/* Responsive summary cards */}
      <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
        <Card className="min-w-0 gap-0 py-0">
          <CardContent className="flex items-start gap-2 p-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
              <GraduationCap className="size-4 text-primary" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">
                Total Exams
              </p>
              <p className="mt-0.5 text-lg font-semibold tracking-tight tabular-nums">
                {exams.length}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                All scheduled exams
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0 gap-0 py-0">
          <CardContent className="flex items-start gap-2 p-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
              <CalendarDays className="size-4 text-blue-600" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">
                Upcoming
              </p>
              <p className="mt-0.5 text-lg font-semibold tracking-tight tabular-nums">
                {upcomingCount}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Exams to prepare for
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0 gap-0 py-0">
          <CardContent className="flex items-start gap-2 p-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Trophy className="size-4 text-green-600" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">
                Completed
              </p>
              <p className="mt-0.5 text-lg font-semibold tracking-tight tabular-nums">
                {completedExams.length}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Results available
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0 gap-0 py-0">
          <CardContent className="flex items-start gap-2 p-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Trophy className="size-4 text-amber-600" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">
                Average Score
              </p>
              <p className="mt-0.5 text-lg font-semibold tracking-tight tabular-nums">
                {averageScore}%
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Across completed exams
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search, filters and exam cards */}
      <Card className="min-w-0">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Exam History</CardTitle>
          <CardDescription>
            Search exams by subject, course code, or exam name.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 p-4 pt-0 sm:p-6 sm:pt-0">
          {/* Search */}
          <div className="relative w-full min-w-0">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search exams..."
              className="h-10 w-full pl-9"
            />
          </div>

          {/* Horizontally scrollable filters on narrow screens */}
          <div className="-mx-1 overflow-x-auto px-1 pb-1">
            <div className="flex w-max gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  type="button"
                  size="sm"
                  className="shrink-0"
                  variant={activeFilter === filter ? "default" : "outline"}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Exam cards */}
          {filteredExams.length === 0 ? (
            <div className="rounded-lg border border-dashed p-6 text-center sm:p-8">
              <Search className="mx-auto size-8 text-muted-foreground" />
              <p className="mt-3 font-medium">No exams found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or filter.
              </p>
            </div>
          ) : (
            <div className="grid min-w-0 grid-cols-1 gap-3 xl:grid-cols-2">
              {filteredExams.map((exam) => {
                const percentage =
                  exam.obtainedMarks !== undefined
                    ? Math.round((exam.obtainedMarks / exam.totalMarks) * 100)
                    : null

                return (
                  <div
                    key={exam.id}
                    className="min-w-0 rounded-xl border p-3 transition-shadow hover:shadow-sm sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold break-words sm:text-base">
                          {exam.subject}
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {exam.code}
                        </p>
                      </div>

                      <Badge
                        variant={
                          exam.status === "Completed" ? "default" : "secondary"
                        }
                        className="shrink-0 text-xs"
                      >
                        {exam.status}
                      </Badge>
                    </div>

                    <p className="mt-4 text-sm font-medium break-words">
                      {exam.examName}
                    </p>

                    <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                      <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
                        <CalendarDays className="size-4 shrink-0" />
                        <span>{formatDate(exam.date)}</span>
                      </div>

                      <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
                        <Clock className="size-4 shrink-0" />
                        <span>{exam.time}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          {exam.status === "Completed"
                            ? "Marks obtained"
                            : "Total marks"}
                        </p>
                        <p className="mt-1 font-semibold">
                          {exam.status === "Completed"
                            ? `${exam.obtainedMarks}/${exam.totalMarks}`
                            : exam.totalMarks}
                          {percentage !== null && (
                            <span className="ml-2 text-sm font-normal text-muted-foreground">
                              ({percentage}%)
                            </span>
                          )}
                        </p>
                      </div>

                      {exam.status === "Completed" && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="shrink-0"
                          onClick={() => setSelectedExam(exam)}
                        >
                          <Eye className="mr-2 size-4" />
                          View Result
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Responsive result popup */}
      <Dialog
        open={selectedExam !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedExam(null)
        }}
      >
        <DialogContent className="max-h-[85dvh] w-[calc(100%-1.5rem)] max-w-lg overflow-y-auto rounded-xl p-4 duration-300 ease-out data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:p-6">
          {selectedExam && (
            <>
              <DialogHeader className="pr-5">
                <DialogTitle className="text-lg sm:text-xl">
                  Exam Result Details
                </DialogTitle>
                <DialogDescription className="break-words">
                  {selectedExam.examName} · {selectedExam.subject}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="rounded-lg bg-muted/50 p-3 sm:p-4">
                  <p className="text-sm text-muted-foreground">Subject</p>
                  <p className="mt-1 font-semibold break-words">
                    {selectedExam.subject}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedExam.code}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="min-w-0 rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">
                      Marks Obtained
                    </p>
                    <p className="mt-2 text-xl font-semibold sm:text-2xl">
                      {selectedExam.obtainedMarks}
                    </p>
                  </div>

                  <div className="min-w-0 rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">Total Marks</p>
                    <p className="mt-2 text-xl font-semibold sm:text-2xl">
                      {selectedExam.totalMarks}
                    </p>
                  </div>

                  <div className="min-w-0 rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">Percentage</p>
                    <p className="mt-2 text-xl font-semibold sm:text-2xl">
                      {selectedPercentage}%
                    </p>
                  </div>

                  <div className="min-w-0 rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">Grade</p>
                    <p className="mt-2 text-xl font-semibold sm:text-2xl">
                      {getGrade(selectedPercentage)}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 rounded-lg border p-3 sm:p-4">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Exam Date</p>
                      <p className="text-sm font-medium break-words">
                        {formatDate(selectedExam.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Exam Time</p>
                      <p className="text-sm font-medium">{selectedExam.time}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 sm:p-4">
                  <p className="text-sm text-muted-foreground">
                    Result Summary
                  </p>
                  <p className="mt-1 text-sm font-semibold sm:text-base">
                    {selectedPercentage >= 50
                      ? "Congratulations! You have passed this exam."
                      : "You have not passed this exam. Keep practicing."}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
