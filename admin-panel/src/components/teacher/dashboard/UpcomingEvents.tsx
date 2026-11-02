import {
  CalendarDays,
  Clock3,
  MapPin,
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

const events = [
  {
    id: 1,
    title: "Parent-Teacher Meeting",
    date: "01 Nov 2026",
    time: "09:30 AM",
    location: "Conference Hall",
    type: "Meeting",
  },
  {
    id: 2,
    title: "Mid-Term Examination",
    date: "05 Nov 2026",
    time: "10:00 AM",
    location: "All Classrooms",
    type: "Exam",
  },
  {
    id: 3,
    title: "Science Exhibition",
    date: "12 Nov 2026",
    time: "11:00 AM",
    location: "School Auditorium",
    type: "Event",
  },
  {
    id: 4,
    title: "Sports Day Practice",
    date: "15 Nov 2026",
    time: "08:30 AM",
    location: "Playground",
    type: "Sports",
  },
];

export function UpcomingEvents() {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">
            Upcoming Events
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            School events and important schedules.
          </p>
        </div>

        <Button variant="outline" size="sm">
          View Calendar
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-start justify-between  border p-4 transition-all"
          >
            <div className="flex gap-3">
              <div className="flex h-11 w-11 items-center justify-center  bg-blue-100 text-blue-600">
                <CalendarDays className="h-5 w-5" />
              </div>

              <div>
                <h4 className="font-semibold">
                  {event.title}
                </h4>

                <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    {event.date}
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock3 className="h-4 w-4" />
                    {event.time}
                  </div>

                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                </div>
              </div>
            </div>

            <Badge variant="secondary">
              {event.type}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}