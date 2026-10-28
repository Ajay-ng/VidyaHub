import {
  BookOpen,
  CalendarDays,
  Users,
  ChevronRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const assignments = [
  {
    title: "Mathematics Worksheet",
    className: "Class 10 - A",
    dueDate: "Today",
    submitted: 35,
    total: 40,
  },
  {
    title: "Science Project",
    className: "Class 9 - B",
    dueDate: "Tomorrow",
    submitted: 22,
    total: 30,
  },
  {
    title: "English Essay",
    className: "Class 8 - C",
    dueDate: "28 Oct",
    submitted: 18,
    total: 25,
  },
];

export function AssignmentOverview() {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">
            Assignment Overview
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Monitor active assignments and submissions.
          </p>
        </div>

        <Button size="sm">
          New Assignment
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {assignments.map((assignment) => {
          const progress =
            (assignment.submitted / assignment.total) * 100;

          return (
            <div
              key={assignment.title}
              className="rounded-lg border p-4 transition-all hover:bg-slate-50"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-600" />

                    <h4 className="font-semibold">
                      {assignment.title}
                    </h4>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {assignment.className}
                  </p>
                </div>

                <Badge variant="secondary">
                  {assignment.dueDate}
                </Badge>
              </div>

              <div className="mt-4 space-y-2">
                <Progress
                  value={progress}
                  className="h-2"
                />

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {assignment.submitted}/{assignment.total} Submitted
                  </div>

                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    Due {assignment.dueDate}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}