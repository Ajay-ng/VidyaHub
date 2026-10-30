import {
  ArrowLeft,
  CalendarDays,
  GraduationCap,
  BookOpen,
  User,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const teacher = {
  name: "Mr. John David",
  subject: "Mathematics",
  employeeId: "EMP-1024",
  assignedClasses: [
    "10-A",
    "10-B",
    "9-A",
  ],
};

const timetable = [
  {
    time: "09:00 - 10:00",
    monday: "10-A",
    tuesday: "10-B",
    wednesday: "9-A",
    thursday: "10-A",
    friday: "Free",
  },
  {
    time: "10:00 - 11:00",
    monday: "Free",
    tuesday: "10-A",
    wednesday: "10-B",
    thursday: "9-A",
    friday: "10-B",
  },
  {
    time: "11:00 - 12:00",
    monday: "9-A",
    tuesday: "Free",
    wednesday: "10-A",
    thursday: "10-B",
    friday: "10-A",
  },
  {
    time: "12:00 - 01:00",
    monday: "Lunch",
    tuesday: "Lunch",
    wednesday: "Lunch",
    thursday: "Lunch",
    friday: "Lunch",
  },
  {
    time: "01:00 - 02:00",
    monday: "10-B",
    tuesday: "9-A",
    wednesday: "Free",
    thursday: "10-A",
    friday: "9-A",
  },
  {
    time: "02:00 - 03:00",
    monday: "Free",
    tuesday: "10-B",
    wednesday: "10-A",
    thursday: "Free",
    friday: "10-B",
  },
];

export default function TeacherTimetablePage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/teacher/dashboard")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>

            <h1 className="text-2xl font-bold">
              Teacher Timetable
            </h1>

            <p className="text-sm text-muted-foreground">
              Weekly class schedule
            </p>

          </div>

        </div>

        <Badge className="bg-yellow-400 hover:bg-yellow-500 text-black">
          Academic Year 2026
        </Badge>

      </div>

      {/* Teacher Information */}

      <Card>

        <CardHeader>

          <CardTitle>
            Teacher Information
          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="grid gap-5 md:grid-cols-3">

            <div>

              <p className="text-sm text-muted-foreground">
                Teacher Name
              </p>

              <div className="mt-2 flex items-center gap-2">

                <User className="h-4 w-4 text-primary" />

                <span className="font-semibold">
                  {teacher.name}
                </span>

              </div>

            </div>

            <div>

              <p className="text-sm text-muted-foreground">
                Subject
              </p>

              <div className="mt-2 flex items-center gap-2">

                <BookOpen className="h-4 w-4 text-primary" />

                <span className="font-semibold">
                  {teacher.subject}
                </span>

              </div>

            </div>

            <div>

              <p className="text-sm text-muted-foreground">
                Employee ID
              </p>

              <div className="mt-2 flex items-center gap-2">

                <GraduationCap className="h-4 w-4 text-primary" />

                <span className="font-semibold">
                  {teacher.employeeId}
                </span>

              </div>

            </div>

          </div>

        </CardContent>

      </Card>

      {/* Assigned Classes */}

      <Card>

        <CardHeader>

          <CardTitle>
            Assigned Classes
          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="flex flex-wrap gap-3">

            {teacher.assignedClasses.map((item) => (
              <Badge
                key={item}
                className="px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-100"
              >
                {item}
              </Badge>
            ))}

          </div>

        </CardContent>

      </Card>
            {/* Weekly Timetable */}

      <Card>

        <CardHeader>

          <div className="flex items-center justify-between">

            <CardTitle>
              Weekly Timetable
            </CardTitle>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">

              <CalendarDays className="h-4 w-4" />

              Monday - Friday

            </div>

          </div>

        </CardHeader>

        <CardContent>

          <div className="overflow-x-auto rounded-lg border">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-muted/50">

                  <th className="border px-4 py-3 text-left font-semibold">
                    Time
                  </th>

                  <th className="border px-4 py-3 text-center font-semibold">
                    Monday
                  </th>

                  <th className="border px-4 py-3 text-center font-semibold">
                    Tuesday
                  </th>

                  <th className="border px-4 py-3 text-center font-semibold">
                    Wednesday
                  </th>

                  <th className="border px-4 py-3 text-center font-semibold">
                    Thursday
                  </th>

                  <th className="border px-4 py-3 text-center font-semibold">
                    Friday
                  </th>

                </tr>

              </thead>

              <tbody>

                {timetable.map((row) => (

                  <tr
                    key={row.time}
                    className="hover:bg-muted/30"
                  >

                    <td className="border px-4 py-4 font-medium whitespace-nowrap">
                      {row.time}
                    </td>

                    <td className="border px-4 py-4 text-center">

                      <Badge
                        variant={
                          row.monday === "Free"
                            ? "secondary"
                            : row.monday === "Lunch"
                            ? "outline"
                            : "default"
                        }
                      >
                        {row.monday}
                      </Badge>

                    </td>

                    <td className="border px-4 py-4 text-center">

                      <Badge
                        variant={
                          row.tuesday === "Free"
                            ? "secondary"
                            : row.tuesday === "Lunch"
                            ? "outline"
                            : "default"
                        }
                      >
                        {row.tuesday}
                      </Badge>

                    </td>

                    <td className="border px-4 py-4 text-center">

                      <Badge
                        variant={
                          row.wednesday === "Free"
                            ? "secondary"
                            : row.wednesday === "Lunch"
                            ? "outline"
                            : "default"
                        }
                      >
                        {row.wednesday}
                      </Badge>

                    </td>

                    <td className="border px-4 py-4 text-center">

                      <Badge
                        variant={
                          row.thursday === "Free"
                            ? "secondary"
                            : row.thursday === "Lunch"
                            ? "outline"
                            : "default"
                        }
                      >
                        {row.thursday}
                      </Badge>

                    </td>

                    <td className="border px-4 py-4 text-center">

                      <Badge
                        variant={
                          row.friday === "Free"
                            ? "secondary"
                            : row.friday === "Lunch"
                            ? "outline"
                            : "default"
                        }
                      >
                        {row.friday}
                      </Badge>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </CardContent>

      </Card>
            {/* Today's Summary */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <Card>

          <CardContent className="flex items-center justify-between p-6">

            <div>

              <p className="text-sm text-muted-foreground">
                Total Classes
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                5
              </h2>

              <p className="mt-1 text-xs text-green-600">
                Scheduled Today
              </p>

            </div>

            <div className="rounded-full bg-blue-100 p-3">

              <BookOpen className="h-6 w-6 text-blue-600" />

            </div>

          </CardContent>

        </Card>

        <Card>

          <CardContent className="flex items-center justify-between p-6">

            <div>

              <p className="text-sm text-muted-foreground">
                Free Periods
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                2
              </h2>

              <p className="mt-1 text-xs text-green-600">
                Available
              </p>

            </div>

            <div className="rounded-full bg-green-100 p-3">

              <CalendarDays className="h-6 w-6 text-green-600" />

            </div>

          </CardContent>

        </Card>

        <Card>

          <CardContent className="flex items-center justify-between p-6">

            <div>

              <p className="text-sm text-muted-foreground">
                Assigned Classes
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {teacher.assignedClasses.length}
              </h2>

              <p className="mt-1 text-xs text-blue-600">
                Active Sections
              </p>

            </div>

            <div className="rounded-full bg-purple-100 p-3">

              <GraduationCap className="h-6 w-6 text-purple-600" />

            </div>

          </CardContent>

        </Card>

        <Card>

          <CardContent className="flex items-center justify-between p-6">

            <div>

              <p className="text-sm text-muted-foreground">
                Working Hours
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                6 Hrs
              </h2>

              <p className="mt-1 text-xs text-orange-600">
                School Timing
              </p>

            </div>

            <div className="rounded-full bg-orange-100 p-3">

              <User className="h-6 w-6 text-orange-600" />

            </div>

          </CardContent>

        </Card>

      </div>

    </div>
  );
}