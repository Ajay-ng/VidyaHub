import {
  ClipboardCheck,
  CalendarClock,
  BookOpen,
  GraduationCap,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const actions = [
  {
    title: "Attendance",
    icon: ClipboardCheck,
  },
  {
    title: "Timetable",
    icon: CalendarClock,
  },
  {
    title: "Assignments",
    icon: BookOpen,
  },
  {
    title: "Exams & Marks",
    icon: GraduationCap,
  },
];

export function QuickActions() {
  return (
    <Card className=" shadow-sm">
      <CardContent className="flex flex-wrap items-center justify-between gap-3 p-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Button
              key={action.title}
              variant="outline"
              className="group flex flex-1 min-w-[180px] items-center justify-center gap-2  border   px-4 py-3 transition-all duration-200 capitalize"
            >
              <Icon className="h-5 w-5 text-blue-600" />

              <span className="text-sm font-medium text-slate-700">
                {action.title}
              </span>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}