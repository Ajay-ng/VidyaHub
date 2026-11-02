import { GraduationCap, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function StudentsHeader() {
  return (
    <Card className="border shadow-sm">
      <CardContent className="flex items-center justify-between px-4 py-3">
        {/* Left */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100">
            <GraduationCap className="h-4 w-4 text-blue-600" />
          </div>

          <div>
            <h1 className="text-base font-semibold leading-none">
              Students
            </h1>

            <p className="mt-1 text-xs text-muted-foreground">
              View students from your assigned classes.
            </p>
          </div>
        </div>

        {/* Right */}
        <Badge
          variant="secondary"
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs"
        >
          <Users className="h-3.5 w-3.5" />
          42 Students
        </Badge>
      </CardContent>
    </Card>
  );
}