import {
  CalendarDays,
  Eye,
  Users,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const history = [
  {
    id: 1,
    date: "28 Oct 2026",
    className: "Class 10 - A",
    subject: "Mathematics",
    total: 42,
    present: 39,
    absent: 3,
  },
  {
    id: 2,
    date: "27 Oct 2026",
    className: "Class 10 - A",
    subject: "Mathematics",
    total: 42,
    present: 40,
    absent: 2,
  },
  {
    id: 3,
    date: "26 Oct 2026",
    className: "Class 9 - B",
    subject: "Science",
    total: 38,
    present: 35,
    absent: 3,
  },
  {
    id: 4,
    date: "25 Oct 2026",
    className: "Class 8 - C",
    subject: "English",
    total: 36,
    present: 34,
    absent: 2,
  },
];

export function AttendanceHistory() {
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>Attendance History</CardTitle>

        <p className="text-sm text-muted-foreground">
          View previously submitted attendance records.
        </p>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Present</TableHead>
                <TableHead>Absent</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead className="text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {history.map((item) => {
                const percentage = Math.round(
                  (item.present / item.total) * 100
                );

                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-blue-600" />
                        {item.date}
                      </div>
                    </TableCell>

                    <TableCell>{item.className}</TableCell>

                    <TableCell>{item.subject}</TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-slate-500" />
                        {item.total}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        {item.present}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1 text-red-600">
                        <XCircle className="h-4 w-4" />
                        {item.absent}
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        {percentage}%
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}