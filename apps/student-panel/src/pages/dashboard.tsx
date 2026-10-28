
import {
  CalendarCheck,
  Clock,
  BookOpen,
  ClipboardList,
  TrendingUp,
  CheckCircle2,
  CircleAlert,
  GraduationCap,
  MapPin,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Sample attendance data
const attendance = {
  percentage: 92,
  present: 46,
  total: 50,
};

// Sample subject marks
const subjects = [
  { name: "Database Management", marks: 88, total: 100 },
  { name: "Web Development", marks: 92, total: 100 },
  { name: "Data Structures", marks: 78, total: 100 },
];

// Sample assignments
const assignments = [
  {
    title: "Binary Trees Assignment",
    subject: "Data Structures",
    due: "Today, 5:00 PM",
    status: "Pending",
  },
  {
    title: "SQL Query Practice",
    subject: "Database Management",
    due: "Tomorrow, 11:59 PM",
    status: "In progress",
  },
  {
    title: "React Mini Project",
    subject: "Web Development",
    due: "Oct 29, 2026",
    status: "Submitted",
  },
];

// Sample daily classes
const classes = [
  {
    subject: "Database Management",
    time: "09:00 AM – 10:00 AM",
    room: "Room 204",
    status: "Completed",
  },
  {
    subject: "Web Development",
    time: "10:30 AM – 11:30 AM",
    room: "Computer Lab 2",
    status: "Active",
  },
  {
    subject: "Data Structures",
    time: "01:30 PM – 02:30 PM",
    room: "Room 108",
    status: "Upcoming",
  },
];

// Reusable summary card
function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <Card className="gap-2 py-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-3 py-0">
        <CardDescription>{title}</CardDescription>

        <div className="rounded-lg bg-primary/10 p-1 text-primary">
          <Icon className="size-6" />
        </div>
      </CardHeader>

      <CardContent className="px-3 py-0">
        <CardTitle className="text-2xl">{value}</CardTitle>

        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

// Reusable section heading
function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <CardTitle className="text-lg">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </>
  );
}

// Reusable status badge
function StatusBadge({ status }: { status: string }) {
  if (status === "Pending") {
    return <Badge variant="destructive">{status}</Badge>;
  }

  if (status === "Submitted" || status === "Completed") {
    return <Badge variant="default">{status}</Badge>;
  }

  if (status === "Active") {
    return (
      <Badge>
        <span className="mr-1 size-2 animate-pulse rounded-full bg-current" />
        {status}
      </Badge>
    );
  }

  return <Badge variant="secondary">{status}</Badge>;
}

export default function Dashboard() {
  const formattedDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const activeClasses = classes.filter(
    (item) => item.status === "Active"
  ).length;

  const pendingAssignments = assignments.filter(
    (item) => item.status !== "Submitted"
  ).length;

  const averageMarks = Math.round(
    subjects.reduce((sum, subject) => sum + subject.marks, 0) /
      subjects.length
  );

  return (
    <main className="min-h-full space-y-3 bg-background p-2 text-foreground">
      {/* Welcome section */}
      <section className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            {formattedDate}
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Hi, Hemanth
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back! Here is your academic overview.
          </p>
        </div>

        <Badge
          variant="outline"
          className="self-start gap-2 px-2 py-1.5"
        >
          <CalendarCheck className="size-4 text-primary" />
          Today&apos;s overview
        </Badge>
      </section>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Attendance"
          value={`${attendance.percentage}%`}
          description={`${attendance.present} of ${attendance.total} classes attended`}
          icon={CalendarCheck}
        />

        <SummaryCard
          title="Average Marks"
          value={`${averageMarks}%`}
          description="Across recent assessments"
          icon={TrendingUp}
        />

        <SummaryCard
          title="Assignments"
          value={String(pendingAssignments)}
          description="Not yet submitted"
          icon={ClipboardList}
        />

        <SummaryCard
          title="Active Classes"
          value={String(activeClasses)}
          description="Currently in progress"
          icon={BookOpen}
        />
      </section>

      {/* Attendance and marks */}
      <section className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        {/* Attendance overview */}
        <Card className="gap-3 py-4">
          <CardHeader className="px-4 py-0">
            <SectionHeading
              title="Attendance Overview"
              description="Your overall attendance summary"
            />
          </CardHeader>

          <CardContent className="px-4 py-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex size-24 shrink-0 items-center justify-center rounded-full border-8 border-primary/20">
                <div className="text-center">
                  <p className="text-xl font-bold">
                    {attendance.percentage}%
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Attendance
                  </p>
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Present</span>
                  <span className="font-semibold">
                    {attendance.present}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Total classes
                  </span>
                  <span className="font-semibold">
                    {attendance.total}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Attendance target
                    </span>
                    <span className="font-semibold">75%</span>
                  </div>

                  <Progress value={attendance.percentage} />
                </div>

                <Badge variant="secondary">
                  {attendance.percentage >= 75
                    ? "Above attendance target"
                    : "Below attendance target"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent marks */}
        <Card className="gap-3 py-4">
          <CardHeader className="px-4 py-0">
            <SectionHeading
              title="Recent Marks"
              description="Your latest subject performance"
            />
          </CardHeader>

          <CardContent className="space-y-4 px-4 py-0">
            {subjects.map((subject) => (
              <div key={subject.name} className="space-y-1.5">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="font-medium">{subject.name}</span>
                  <span className="font-semibold">
                    {subject.marks}/{subject.total}
                  </span>
                </div>

                <Progress
                  value={(subject.marks / subject.total) * 100}
                />
              </div>
            ))}

            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="size-4 text-primary" />
              Keep working toward your academic goals.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Assignments */}
      <Card className="gap-3 py-4">
        <CardHeader className="px-4 py-0">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">
                  Assignments
                </CardTitle>

                <CardDescription>
                  Track your coursework and deadlines
                </CardDescription>
              </div>

              <Badge variant="secondary" className="self-start sm:self-center">
                {pendingAssignments} pending
              </Badge>
            </div>

            <div className="h-px w-full bg-border" />
          </div>
        </CardHeader>

        <CardContent className="divide-y divide-border px-4 py-0">
          {assignments.map((assignment) => (
            <div
              key={assignment.title}
              className="flex flex-col justify-between gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <ClipboardList className="size-5" />
                </div>

                <div>
                  <p className="font-medium">{assignment.title}</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {assignment.subject}
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3.5" />
                    Due: {assignment.due}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                {assignment.status === "Submitted" ? (
                  <CheckCircle2 className="size-4 text-primary" />
                ) : (
                  <CircleAlert className="size-4 text-muted-foreground" />
                )}

                <StatusBadge status={assignment.status} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Today's classes */}
      <Card className="gap-3 py-4">
        <CardHeader className="px-4 py-0">
          <SectionHeading
            title="Today's Classes"
            description="Your daily class schedule and current status"
          />
        </CardHeader>

        <CardContent className="space-y-2 px-4 py-0">
          {classes.map((item) => (
            <div
              key={item.subject}
              className={`flex flex-col justify-between gap-2 rounded-lg border p-3 sm:flex-row sm:items-center ${
                item.status === "Active"
                  ? "border-primary/40 bg-primary/5"
                  : "border-border"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <GraduationCap className="size-5" />
                </div>

                <div>
                  <p className="font-semibold">{item.subject}</p>

                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="size-3.5" />
                    {item.time}
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="size-3.5" />
                    {item.room}
                  </p>
                </div>
              </div>

              <div className="self-start sm:self-center">
                <StatusBadge status={item.status} />
              </div>
            </div>
          ))}

          <p className="pt-1 text-sm text-muted-foreground">
            Class times and statuses currently use sample data.
            Connect your timetable API to show real-time information.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
