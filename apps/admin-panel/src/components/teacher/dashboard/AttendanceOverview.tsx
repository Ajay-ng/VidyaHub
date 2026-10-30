import {
  UserCheck,
  UserX,
  Clock3,
  ClipboardCheck,
  ChevronRight,
} from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const attendance = {
  total: 248,
  present: 228,
  absent: 15,
  late: 5,
  percentage: 92,
};

export function AttendanceOverview() {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-lg">
            Attendance Overview
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Today's attendance summary
          </p>
        </div>

        <Button size="sm"
        className="bg-yellow-400 hover:bg-yellow-500 text-black"
>
           Mark Attendance
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Overall Attendance */}
        <div className="  p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">
              Overall Attendance
            </span>

            <span className="text-xl font-bold text-blue-600">
              {attendance.percentage}%
            </span>
          </div>

          <Progress
            value={attendance.percentage}
            className="h-2"
          />

          <p className="mt-2 text-xs text-muted-foreground">
            {attendance.present} of {attendance.total} students are present today.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-3">
          <div className=" border p-3">
            <div className="flex items-center gap-2">
              <div className=" bg-green-100 p-2 text-green-600">
                <UserCheck className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Present
                </p>

                <h3 className="text-lg font-bold">
                  {attendance.present}
                </h3>
              </div>
            </div>
          </div>

          <div className=" border p-3">
            <div className="flex items-center gap-2">
              <div className=" bg-red-100 p-2 text-red-600">
                <UserX className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Absent
                </p>

                <h3 className="text-lg font-bold">
                  {attendance.absent}
                </h3>
              </div>
            </div>
          </div>

          <div className=" border p-3">
            <div className="flex items-center gap-2">
              <div className=" bg-yellow-100 p-2 text-yellow-600">
                <Clock3 className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Late
                </p>

                <h3 className="text-lg font-bold">
                  {attendance.late}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2  border p-3">
          <ClipboardCheck className="h-5 w-5 text-blue-600" />

          <p className="text-sm text-blue-700">
            Attendance has been recorded for
            <span className="font-semibold">
              {" "}
              {attendance.present}
            </span>{" "}
            students.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}