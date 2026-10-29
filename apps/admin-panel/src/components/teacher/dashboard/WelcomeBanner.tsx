import { CalendarDays, Clock3, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function WelcomeBanner() {
  const teacher = {
    name: "Mr. John Doe",
  };

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const currentTime = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card className="-mt-3  shadow-sm">
      <CardContent className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between ">
        {/* Left */}
        <div className="space-y-2">
          <Badge
            variant="secondary"
            className="w-fit gap-1 px-2 py-1 text-xs"
          >
            <Sparkles className="h-3 w-3" />
            Teacher Dashboard
          </Badge>

          <div>
            <h2 className="text-xl font-semibold">
              Welcome back, {teacher.name}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage attendance, assignments and today's classes.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2  border bg-slate-50 px-3 py-2 text-sm text-slate-600">
            <CalendarDays className="h-4 w-4" />
            {currentDate}
          </div>

          <div className="flex items-center gap-2 border bg-slate-50 px-3 py-2 text-sm text-slate-600">
            <Clock3 className="h-4 w-4" />
            {currentTime}
          </div>

          <Button className="bg-yellow-400 text-black px-5 hover:bg-yellow-500">
            View Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}