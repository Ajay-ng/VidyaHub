import { CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function AttendanceHeader() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card>
      <CardContent className="flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center">
        <div>
          <Badge>Teacher Panel</Badge>

          <h1 className="mt-3 text-2xl font-bold">
            Student Attendance
          </h1>

          <p className="text-sm text-muted-foreground">
            Mark and manage attendance for your assigned classes.
          </p>
        </div>

        <div className="rounded-lg border px-4 py-3">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-blue-600" />

            <div>
              <p className="text-xs text-muted-foreground">
                Today
              </p>

              <p className="text-sm font-medium">
                {today}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}