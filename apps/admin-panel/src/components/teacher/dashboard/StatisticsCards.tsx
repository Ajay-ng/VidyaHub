import {
  Users,
  ClipboardCheck,
  BookOpen,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const statistics = [
  {
    title: "Total Students",
    value: "248",
    subtitle: "Assigned Classes",
    icon: Users,
    progress: 100,
  },
  {
    title: "Attendance",
    value: "92%",
    subtitle: "228 Present",
    icon: ClipboardCheck,
    progress: 92,
  },
  {
    title: "Assignments",
    value: "12",
    subtitle: "4 Due",
    icon: BookOpen,
    progress: 68,
  },
  {
    title: "Today's Classes",
    value: "6",
    subtitle: "4 Remaining",
    icon: CalendarDays,
    progress: 35,
  },
];

export function StatisticsCards() {
  return (
    <section className="space-y-3">
      <div>
        <h3 className="text-lg font-semibold">
          Dashboard Overview
        </h3>

        <p className="text-sm text-muted-foreground">
          Quick summary of today's activities.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="border shadow-sm transition-all hover:shadow-md"
            >
              <CardContent className="space-y-3 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      {item.title}
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      {item.value}
                    </h2>
                  </div>

                  <div className="rounded-md bg-blue-50 p-2 text-blue-600">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <Progress
                  value={item.progress}
                  className="h-1.5"
                />

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">
                    {item.subtitle}
                  </span>

                  <ArrowUpRight className="h-3.5 w-3.5 text-green-600" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}