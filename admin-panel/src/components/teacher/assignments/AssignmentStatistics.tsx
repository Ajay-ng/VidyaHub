import {
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileEdit,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

const statistics = [
  {
    title: "Total Assignments",
    value: "24",
    subtitle: "+3 this month",
    icon: ClipboardList,
  },
  {
    title: "Published",
    value: "18",
    subtitle: "Visible to Students",
    icon: CheckCircle2,
  },
  {
    title: "Draft",
    value: "4",
    subtitle: "Continue Editing",
    icon: FileEdit,
  },
  {
    title: "Overdue",
    value: "2",
    subtitle: "Need Review",
    icon: Clock3,
  },
];

export function AssignmentStatistics() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statistics.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className="border shadow-sm transition-all hover:shadow-md"
          >
            <CardContent className="flex items-start justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {item.value}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  {item.subtitle}
                </p>
              </div>

              <div className="rounded-lg border bg-muted p-3">
                <Icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}