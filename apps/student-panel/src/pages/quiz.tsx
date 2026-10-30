import { useMemo, useState } from "react"
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  Search,
  Trophy,
  XCircle,
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
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type QuizStatus = "Available" | "Completed" | "Upcoming"

type Quiz = {
  id: number
  title: string
  subject: string
  code: string
  questions: number
  duration: number
  totalMarks: number
  date: string
  status: QuizStatus
  score?: number
}

const quizzes: Quiz[] = [
  {
    id: 1,
    title: "Algebra Basics",
    subject: "Mathematics",
    code: "MAT101",
    questions: 10,
    duration: 15,
    totalMarks: 10,
    date: "2026-10-29",
    status: "Available",
  },
  {
    id: 2,
    title: "Introduction to Programming",
    subject: "Computer Science",
    code: "CS201",
    questions: 15,
    duration: 20,
    totalMarks: 15,
    date: "2026-10-30",
    status: "Available",
  },
  {
    id: 3,
    title: "Basic Electronics",
    subject: "Electronics",
    code: "EC301",
    questions: 10,
    duration: 15,
    totalMarks: 10,
    date: "2026-10-27",
    status: "Completed",
    score: 8,
  },
  {
    id: 4,
    title: "Mechanics Quiz",
    subject: "Physics",
    code: "PHY101",
    questions: 20,
    duration: 30,
    totalMarks: 20,
    date: "2026-10-25",
    status: "Completed",
    score: 16,
  },
  {
    id: 5,
    title: "Data Structures Basics",
    subject: "Computer Science",
    code: "CS202",
    questions: 15,
    duration: 25,
    totalMarks: 15,
    date: "2026-11-02",
    status: "Upcoming",
  },
  {
    id: 6,
    title: "Digital Logic",
    subject: "Electronics",
    code: "EC302",
    questions: 12,
    duration: 20,
    totalMarks: 12,
    date: "2026-11-04",
    status: "Upcoming",
  },
]

const filters = ["All", "Available", "Upcoming", "Completed"] as const

type QuizFilter = (typeof filters)[number]

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function getPercentage(score: number, totalMarks: number) {
  if (totalMarks <= 0) return 0
  return Math.round((score / totalMarks) * 100)
}

function getGrade(percentage: number) {
  if (percentage >= 90) return "A+"
  if (percentage >= 80) return "A"
  if (percentage >= 70) return "B"
  if (percentage >= 60) return "C"
  if (percentage >= 50) return "D"
  return "F"
}

export default function QuizPage() {
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState<QuizFilter>("All")

  // Stores the quiz selected for each dialog.
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [startQuiz, setStartQuiz] = useState<Quiz | null>(null)

  const availableCount = quizzes.filter(
    (quiz) => quiz.status === "Available"
  ).length

  const completedQuizzes = quizzes.filter((quiz) => quiz.status === "Completed")

  // const upcomingCount = quizzes.filter(
  //   (quiz) => quiz.status === "Upcoming"
  // ).length

  const averageScore =
    completedQuizzes.length > 0
      ? Math.round(
          completedQuizzes.reduce(
            (total, quiz) =>
              total + getPercentage(quiz.score ?? 0, quiz.totalMarks),
            0
          ) / completedQuizzes.length
        )
      : 0

  const filteredQuizzes = useMemo(() => {
    const query = search.trim().toLowerCase()

    return quizzes.filter((quiz) => {
      const matchesSearch =
        quiz.title.toLowerCase().includes(query) ||
        quiz.subject.toLowerCase().includes(query) ||
        quiz.code.toLowerCase().includes(query)

      const matchesFilter =
        activeFilter === "All" || quiz.status === activeFilter

      return matchesSearch && matchesFilter
    })
  }, [search, activeFilter])

  function handleQuizAction(quiz: Quiz) {
    if (quiz.status === "Completed") {
      setSelectedQuiz(quiz)
      return
    }

    if (quiz.status === "Available") {
      setStartQuiz(quiz)
    }
  }

  function handleStartNow() {
    if (!startQuiz) return

    // Placeholder until the actual quiz-taking screen is implemented.
    alert(`Starting quiz: ${startQuiz.title}`)
    setStartQuiz(null)
  }

  return (
    <main className="w-full min-w-0 space-y-5 overflow-x-hidden bg-background p-3 sm:space-y-6 sm:p-5 lg:p-8">
      {/* Page heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            My Quizzes
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Practice your subjects and track your quiz performance.
          </p>
        </div>

        <Badge variant="outline" className="w-fit px-3 py-1">
          Academic Year 2026–27
        </Badge>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
        <Card className="min-w-0 gap-0 py-0">
          <CardContent className="flex items-center gap-2 p-3 sm:gap-3 sm:p-4">
            <BookOpen className="size-5 shrink-0 text-primary sm:size-6" />

            <div className="min-w-0 space-y-1">
              <p className="text-xs leading-tight font-medium text-muted-foreground sm:text-sm">
                Total Quizzes
              </p>
              <p className="text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">
                {quizzes.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0 gap-0 py-0">
          <CardContent className="flex items-center gap-2 p-3 sm:gap-3 sm:p-4">
            <Clock className="size-5 shrink-0 text-blue-600 sm:size-6" />

            <div className="min-w-0 space-y-1">
              <p className="text-xs leading-tight font-medium text-muted-foreground sm:text-sm">
                Available
              </p>
              <p className="text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">
                {availableCount}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0 gap-0 py-0">
          <CardContent className="flex items-center gap-2 p-3 sm:gap-3 sm:p-4">
            <CheckCircle2 className="size-5 shrink-0 text-green-600 sm:size-6" />

            <div className="min-w-0 space-y-1">
              <p className="text-xs leading-tight font-medium text-muted-foreground sm:text-sm">
                Completed
              </p>
              <p className="text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">
                {completedQuizzes.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0 gap-0 py-0">
          <CardContent className="flex items-center gap-2 p-3 sm:gap-3 sm:p-4">
            <Trophy className="size-5 shrink-0 text-amber-600 sm:size-6" />

            <div className="min-w-0 space-y-1">
              <p className="text-xs leading-tight font-medium text-muted-foreground sm:text-sm">
                Average Score
              </p>
              <p className="text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">
                {averageScore}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Quiz list */}
      <Card className="min-w-0">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle>Quiz List</CardTitle>
          <CardDescription>
            Find a quiz, check its status, and view your results.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 p-4 pt-0 sm:p-6 sm:pt-0">
          {/* Search */}
          <div className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by quiz, subject, or code..."
              className="h-10 pl-9"
            />
          </div>

          {/* Filters */}
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

          {/* Quiz cards */}
          {filteredQuizzes.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <Search className="mx-auto size-8 text-muted-foreground" />
              <p className="mt-3 font-medium">No quizzes found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different search term or filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {filteredQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="min-w-0 rounded-xl border p-4 transition-shadow hover:shadow-sm sm:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-semibold break-words">
                        {quiz.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {quiz.subject} · {quiz.code}
                      </p>
                    </div>

                    <Badge
                      className="shrink-0"
                      variant={
                        quiz.status === "Completed"
                          ? "default"
                          : quiz.status === "Available"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {quiz.status}
                    </Badge>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BookOpen className="size-4 shrink-0" />
                      <span>{quiz.questions} questions</span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="size-4 shrink-0" />
                      <span>{quiz.duration} minutes</span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Trophy className="size-4 shrink-0" />
                      <span>{quiz.totalMarks} marks</span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarDays className="size-4 shrink-0" />
                      <span>{formatDate(quiz.date)}</span>
                    </div>
                  </div>

                  {quiz.status === "Completed" && (
                    <div className="mt-4 rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">
                        Your score
                      </p>
                      <p className="mt-1 font-semibold">
                        {quiz.score}/{quiz.totalMarks}
                        <span className="ml-2 text-sm font-normal text-muted-foreground">
                          {getPercentage(quiz.score ?? 0, quiz.totalMarks)}%
                        </span>
                      </p>
                    </div>
                  )}

                  <div className="mt-4 flex justify-end border-t pt-4">
                    <Button
                      type="button"
                      size="sm"
                      variant={
                        quiz.status === "Upcoming" ? "outline" : "default"
                      }
                      disabled={quiz.status === "Upcoming"}
                      onClick={() => handleQuizAction(quiz)}
                    >
                      {quiz.status === "Completed"
                        ? "View Result"
                        : quiz.status === "Upcoming"
                          ? "Not Available Yet"
                          : "Start Quiz"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Start Quiz confirmation dialog */}
      <Dialog
        open={startQuiz !== null}
        onOpenChange={(open) => {
          if (!open) setStartQuiz(null)
        }}
      >
        <DialogContent className="max-h-[85dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-xl p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Start {startQuiz?.title}?
            </DialogTitle>
            <DialogDescription>
              Please review the quiz details before starting.
            </DialogDescription>
          </DialogHeader>

          {startQuiz && (
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <p className="font-medium">{startQuiz.subject}</p>
                <p className="text-sm text-muted-foreground">
                  {startQuiz.code}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Questions</p>
                    <p className="font-semibold">{startQuiz.questions}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold">
                      {startQuiz.duration} minutes
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Total Marks</p>
                    <p className="font-semibold">{startQuiz.totalMarks}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Quiz Date</p>
                    <p className="font-semibold">
                      {formatDate(startQuiz.date)}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Make sure you are ready before starting. The quiz is designed to
                be completed within the allotted time.
              </p>

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStartQuiz(null)}
                >
                  Cancel
                </Button>

                <Button type="button" onClick={handleStartNow}>
                  Start Now
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Result dialog */}
      <Dialog
        open={selectedQuiz !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedQuiz(null)
        }}
      >
        <DialogContent className="max-h-[85dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-xl p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedQuiz?.title} — Quiz Result
            </DialogTitle>
            <DialogDescription>
              Your performance summary for this quiz.
            </DialogDescription>
          </DialogHeader>

          {selectedQuiz && (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">Subject</p>
                <p className="font-semibold">{selectedQuiz.subject}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedQuiz.code}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <p className="text-sm text-muted-foreground">
                    Marks Obtained
                  </p>
                  <p className="mt-1 text-2xl font-bold">
                    {selectedQuiz.score ?? 0}/{selectedQuiz.totalMarks}
                  </p>
                </div>

                <div className="rounded-lg border p-3">
                  <p className="text-sm text-muted-foreground">Percentage</p>
                  <p className="mt-1 text-2xl font-bold">
                    {getPercentage(
                      selectedQuiz.score ?? 0,
                      selectedQuiz.totalMarks
                    )}
                    %
                  </p>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  {getPercentage(
                    selectedQuiz.score ?? 0,
                    selectedQuiz.totalMarks
                  ) >= 50 ? (
                    <CheckCircle2 className="size-6 shrink-0 text-green-600" />
                  ) : (
                    <XCircle className="size-6 shrink-0 text-destructive" />
                  )}

                  <div>
                    <p className="font-semibold">
                      Grade:{" "}
                      {getGrade(
                        getPercentage(
                          selectedQuiz.score ?? 0,
                          selectedQuiz.totalMarks
                        )
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {getPercentage(
                        selectedQuiz.score ?? 0,
                        selectedQuiz.totalMarks
                      ) >= 50
                        ? "Passed"
                        : "Needs improvement"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">
                    {formatDate(selectedQuiz.date)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Questions</span>
                  <span className="font-medium">{selectedQuiz.questions}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">
                    {selectedQuiz.duration} minutes
                  </span>
                </div>
              </div>

              <Button
                type="button"
                className="w-full"
                onClick={() => setSelectedQuiz(null)}
              >
                Close Result
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
