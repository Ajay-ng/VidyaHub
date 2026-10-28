import {
  ClipboardCheck,
  BookOpen,
  FileCheck,
  GraduationCap,
  CalendarClock,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const activities = [
  {
    id: 1,
    title: "Attendance Submitted",
    description: "Class 10 - A attendance has been marked.",
    time: "10 min ago",
    icon: ClipboardCheck,
    color: "bg-green-100 text-green-600",
    status: "Completed",
  },
  {
    id: 2,
    title: "Assignment Created",
    description: "Mathematics Worksheet uploaded for Class 9 - B.",
    time: "35 min ago",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600",
    status: "New",
  },
  {
    id: 3,
    title: "Assignment Submitted",
    description: "12 students submitted Science Project.",
    time: "1 hour ago",
    icon: FileCheck,
    color: "bg-purple-100 text-purple-600",
    status: "Updated",
  },
  {
    id: 4,
    title: "Marks Updated",
    description: "Unit Test marks published for Class 8 - C.",
    time: "2 hours ago",
    icon: GraduationCap,
    color: "bg-orange-100 text-orange-600",
    status: "Published",
  },
  {
    id: 5,
    title: "Timetable Updated",
    description: "Friday timetable has been revised.",
    time: "Yesterday",
    icon: CalendarClock,
    color: "bg-cyan-100 text-cyan-600",
    status: "Updated",
  },
];

export function RecentActivities() {
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">
          Recent Activities
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          Latest updates from your teaching activities.
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 rounded-lg border p-3 transition-all hover:bg-slate-50"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${activity.color}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-sm font-semibold">
                    {activity.title}
                  </h4>

                  <Badge variant="secondary">
                    {activity.status}
                  </Badge>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {activity.description}
                </p>

                <p className="mt-2 text-xs text-muted-foreground">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}