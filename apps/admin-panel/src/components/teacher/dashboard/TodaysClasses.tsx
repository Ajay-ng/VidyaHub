import {
  BookOpen,
  Clock3,
  ChevronRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const classes = [
  {
    subject: "Mathematics",
    className: "Class 10 - A",
    time: "09:00 AM - 09:45 AM",
    room: "Room 201",
    status: "Ongoing",
  },
  {
    subject: "Science",
    className: "Class 9 - B",
    time: "10:00 AM - 10:45 AM",
    room: "Room 203",
    status: "Upcoming",
  },
  {
    subject: "English",
    className: "Class 8 - C",
    time: "11:15 AM - 12:00 PM",
    room: "Room 105",
    status: "Upcoming",
  },
  {
    subject: "Mathematics",
    className: "Class 7 - A",
    time: "02:00 PM - 02:45 PM",
    room: "Room 202",
    status: "Upcoming",
  },
];

export function TodayClasses() {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-lg">
            Today's Classes
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Your class schedule for today
          </p>
        </div>

        <Button variant="outline" size="sm">
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-3">
        {classes.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border p-3 transition-all "
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-blue-100 text-blue-600">
                <BookOpen className="h-5 w-5" />
              </div>

              <div>
                <h4 className="text-sm font-semibold">
                  {item.subject}
                </h4>

                <p className="text-xs text-muted-foreground">
                  {item.className} • {item.room}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden text-right md:block">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock3 className="h-4 w-4" />
                  {item.time}
                </div>
              </div>

              <Badge
                variant={
                  item.status === "Ongoing"
                    ? "default"
                    : "secondary"
                }
              >
                {item.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}