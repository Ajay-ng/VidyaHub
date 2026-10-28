import { useState } from "react"
import { BookOpen, Clock, MapPin, Users, Search } from "lucide-react"

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

type Course = {
  id: number
  name: string
  code: string
  teacher: string
  schedule: string
  room: string
  students: number
  status: "Ongoing" | "Upcoming" | "Completed"
}

const courses: Course[] = [
  {
    id: 1,
    name: "Mathematics",
    code: "MAT101",
    teacher: "Mr. Kumar",
    schedule: "Monday · 09:00 AM",
    room: "Room 101",
    students: 45,
    status: "Ongoing",
  },
  {
    id: 2,
    name: "Computer Science",
    code: "CS201",
    teacher: "Mrs. Priya",
    schedule: "Monday · 11:00 AM",
    room: "Computer Lab 1",
    students: 40,
    status: "Ongoing",
  },
  {
    id: 3,
    name: "Electronics",
    code: "EC301",
    teacher: "Mr. Rajesh",
    schedule: "Tuesday · 10:00 AM",
    room: "Lab 204",
    students: 35,
    status: "Upcoming",
  },
  {
    id: 4,
    name: "Physics",
    code: "PHY101",
    teacher: "Mrs. Anitha",
    schedule: "Wednesday · 09:30 AM",
    room: "Room 103",
    students: 42,
    status: "Ongoing",
  },
  {
    id: 5,
    name: "Data Structures",
    code: "CS202",
    teacher: "Mr. Arjun",
    schedule: "Thursday · 02:00 PM",
    room: "Computer Lab 2",
    students: 38,
    status: "Upcoming",
  },
  {
    id: 6,
    name: "Digital Systems",
    code: "EC302",
    teacher: "Mrs. Meena",
    schedule: "Friday · 10:30 AM",
    room: "Lab 202",
    students: 36,
    status: "Completed",
  },
]

const filters = ["All", "Ongoing", "Upcoming", "Completed"] as const

export default function MyClasses() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<string>("All")

  const filteredCourses = courses.filter((course) => {
    const query = search.trim().toLowerCase()

    const matchesSearch =
      course.name.toLowerCase().includes(query) ||
      course.code.toLowerCase().includes(query) ||
      course.teacher.toLowerCase().includes(query)

    const matchesFilter = filter === "All" || course.status === filter

    return matchesSearch && matchesFilter
  })

  const ongoingCount = courses.filter(
    (course) => course.status === "Ongoing"
  ).length

  const upcomingCount = courses.filter(
    (course) => course.status === "Upcoming"
  ).length

  const completedCount = courses.filter(
    (course) => course.status === "Completed"
  ).length

  const summaryCards = [
    {
      label: "Ongoing Classes",
      count: ongoingCount,
      icon: BookOpen,
      iconClass: "text-blue-600",
    },
    {
      label: "Upcoming Classes",
      count: upcomingCount,
      icon: Clock,
      iconClass: "text-amber-600",
    },
    {
      label: "Completed Classes",
      count: completedCount,
      icon: BookOpen,
      iconClass: "text-emerald-600",
    },
  ]

  return (
    <div className="space-y-5 font-sans">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            My Classes
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            View your courses, schedules, and class status.
          </p>
        </div>

        <Badge
          variant="secondary"
          className="w-fit px-3 py-1 text-xs font-medium"
        >
          {courses.length} Total Courses
        </Badge>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:max-w-4xl">
        {summaryCards.map((item) => {
          const Icon = item.icon

          return (
            <Card key={item.label} className="min-w-0 gap-0 py-0">
              <CardContent className="flex items-center gap-2 p-3 sm:gap-3 sm:p-4">
                <Icon
                  className={`size-5 shrink-0 sm:size-6 ${item.iconClass}`}
                />

                <div className="min-w-0 space-y-1">
                  <p className="text-xs leading-tight font-medium text-muted-foreground sm:text-sm">
                    {item.label}
                  </p>
                  <p className="text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">
                    {item.count}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Search and filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search by course, code, or teacher..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="pl-9 text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status)}
              className="text-xs font-medium sm:text-sm"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Course cards */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="gap-0 py-0 transition-shadow hover:shadow-md"
            >
              <CardHeader className="space-y-0 p-3 pb-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 space-y-0.5">
                    <CardTitle className="text-base font-semibold tracking-tight sm:text-lg">
                      {course.name}
                    </CardTitle>

                    <CardDescription className="text-xs font-normal tracking-wide sm:text-sm">
                      {course.code}
                    </CardDescription>
                  </div>

                  <Badge
                    variant={
                      course.status === "Ongoing"
                        ? "default"
                        : course.status === "Upcoming"
                          ? "secondary"
                          : "outline"
                    }
                    className="shrink-0 text-[11px] font-medium sm:text-xs"
                  >
                    {course.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-2 p-3 pt-1">
                <div className="flex items-center gap-2 text-sm leading-5">
                  <Users className="size-4 shrink-0 text-muted-foreground" />
                  <span className="font-medium">{course.teacher}</span>
                </div>

                <div className="flex items-center gap-2 text-sm leading-5 text-muted-foreground">
                  <Clock className="size-4 shrink-0" />
                  <span>{course.schedule}</span>
                </div>

                <div className="flex items-center gap-2 text-sm leading-5 text-muted-foreground">
                  <MapPin className="size-4 shrink-0" />
                  <span>{course.room}</span>
                </div>

                <div className="flex items-center justify-between gap-2 border-t pt-2.5 text-sm">
                  <span className="text-muted-foreground">Class strength</span>

                  <span className="font-semibold tabular-nums">
                    {course.students} students
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="gap-0 py-0">
          <CardContent className="flex flex-col items-center justify-center px-4 py-10 text-center">
            <Search className="mb-3 size-9 text-muted-foreground" />
            <h3 className="text-base font-semibold">No classes found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try another search term or select a different status.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
