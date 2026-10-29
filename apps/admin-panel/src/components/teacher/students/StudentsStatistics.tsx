import {
  BarChart3,
  ClipboardList,
  UserCheck,
  Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const statistics = [
  {
    title: "Students",
    value: "42",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Present",
    value: "39",
    icon: UserCheck,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Pending",
    value: "8",
    icon: ClipboardList,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "Avg Attendance",
    value: "91%",
    icon: BarChart3,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

export function StudentsStatistics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statistics.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title} className="border shadow-sm">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {item.title}
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {item.value}
                </h2>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.iconBg}`}
              >
                <Icon className={`h-5 w-5 ${item.iconColor}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}