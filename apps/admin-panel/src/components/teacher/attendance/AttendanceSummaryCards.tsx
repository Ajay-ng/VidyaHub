import {
  Users,
  UserCheck,
  UserX,
  Clock3,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

const summary = [
  {
    title: "Total Students",
    value: 42,
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Present",
    value: 38,
    icon: UserCheck,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Absent",
    value: 3,
    icon: UserX,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    title: "Late",
    value: 1,
    icon: Clock3,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
];

export function AttendanceSummaryCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {summary.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className="border shadow-sm"
          >
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">
                  {item.title}
                </p>

                <h2 className="mt-1 text-3xl font-bold">
                  {item.value}
                </h2>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg ${item.iconBg}`}
              >
                <Icon
                  className={`h-6 w-6 ${item.iconColor}`}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}