import {
  CheckCircle2,
  Download,
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export function AttendanceActions() {
  return (
    <Card className="border shadow-sm">
      <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-end">
        <Button
          variant="outline"
          className="w-full sm:w-auto"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>

        <Button
          variant="outline"
          className="w-full sm:w-auto"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>

        <Button className="w-full bg-yellow-400 hover:bg-yellow-500 sm:w-auto text-black">
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Save Attendance
        </Button>
      </CardContent>
    </Card>
  );
}