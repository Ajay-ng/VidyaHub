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

export default function MyClasses() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.code.toLowerCase().includes(search.toLowerCase()) ||
      course.teacher.toLowerCase().includes(search.toLowerCase())

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

  return (
    <div className="space-y-4">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            My Classes
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View your courses, schedules, and class status.
          </p>
        </div>

        <Badge variant="secondary" className="w-fit px-3 py-1">
          {courses.length} Total Courses
        </Badge>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-2 p-3 sm:gap-4 sm:p-5">
            <div className="rounded-lg p-1 text-primary sm:p-3">
              <BookOpen className="size-5 sm:size-6" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground sm:text-sm">
                Ongoing Classes
              </p>
              <p className="text-xl font-bold sm:text-2xl">{ongoingCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-2 p-3 sm:gap-4 sm:p-5">
            <div className="rounded-lg bg-amber-100 p-1 text-amber-700 sm:p-3">
              <Clock className="size-5 sm:size-6" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground sm:text-sm">
                Upcoming Classes
              </p>
              <p className="text-xl font-bold sm:text-2xl">{upcomingCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-2 p-3 sm:gap-4 sm:p-5">
            <div className="rounded-lg p-1 text-amber-700 sm:p-3">
              <Clock className="size-5 sm:size-6" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground sm:text-sm">
                Completed Classes
              </p>
              <p className="text-xl font-bold sm:text-2xl">{completedCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by course, code, or teacher..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["All", "Ongoing", "Upcoming", "Completed"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Course cards */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="transition-shadow hover:shadow-md">
              <CardHeader className="space-y-0 pb-0">
                <div className="flex items-center justify-between gap-1">
                  <div className="min-w-0">
                    <CardTitle className="text-lg">{course.name}</CardTitle>
                    <CardDescription className="mt-0">
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
                  >
                    {course.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="size-2 shrink-0 text-muted-foreground" />
                  <span>{course.teacher}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="size-4 shrink-0 text-muted-foreground" />
                  <span>{course.schedule}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="size-4 shrink-0 text-muted-foreground" />
                  <span>{course.room}</span>
                </div>

                <div className="flex items-center justify-between border-t pt-3 text-sm">
                  <span className="text-muted-foreground">Class strength</span>
                  <span className="font-semibold">
                    {course.students} students
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="mb-3 size-10 text-muted-foreground" />
            <h3 className="font-semibold">No classes found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try another search term or select a different status.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
