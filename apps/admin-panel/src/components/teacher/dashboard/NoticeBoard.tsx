import {
  Bell,
  CalendarDays,
  Megaphone,
  School,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const notices = [
  {
    id: 1,
    title: "Staff Meeting",
    description:
      "Monthly staff meeting will be held in the conference hall at 4:00 PM.",
    date: "Today",
    priority: "High",
    icon: School,
    color: "bg-red-100 text-red-600",
  },
  {
    id: 2,
    title: "Mid-Term Examination",
    description:
      "Exam timetable has been published for Classes 8 to 10.",
    date: "28 Oct",
    priority: "Important",
    icon: CalendarDays,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    title: "Holiday Notice",
    description:
      "School will remain closed on Friday due to a public holiday.",
    date: "30 Oct",
    priority: "Info",
    icon: Bell,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 4,
    title: "Parent-Teacher Meeting",
    description:
      "Parents are invited for the PTM on Saturday from 9:30 AM.",
    date: "01 Nov",
    priority: "Upcoming",
    icon: Megaphone,
    color: "bg-orange-100 text-orange-600",
  },
];

export function NoticeBoard() {
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">
          Notice Board
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          Latest school announcements and updates.
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {notices.map((notice) => {
          const Icon = notice.icon;

          return (
            <div
              key={notice.id}
              className="flex items-start gap-4 rounded-lg border p-3 transition-all hover:bg-slate-50"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${notice.color}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-semibold">
                      {notice.title}
                    </h4>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {notice.description}
                    </p>
                  </div>

                  <Badge variant="secondary">
                    {notice.priority}
                  </Badge>
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  {notice.date}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}