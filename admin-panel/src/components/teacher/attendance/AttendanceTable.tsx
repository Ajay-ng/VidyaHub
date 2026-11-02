import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

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

const students = [
  {
    id: 1,
    rollNo: "001",
    name: "Rahul Kumar",
    gender: "Male",
  },
  {
    id: 2,
    rollNo: "002",
    name: "Priya Sharma",
    gender: "Female",
  },
  {
    id: 3,
    rollNo: "003",
    name: "Arjun Reddy",
    gender: "Male",
  },
  {
    id: 4,
    rollNo: "004",
    name: "Sneha Patel",
    gender: "Female",
  },
  {
    id: 5,
    rollNo: "005",
    name: "Aman Verma",
    gender: "Male",
  },
];

type AttendanceStatus = "Present" | "Absent" | "";

export function AttendanceTable() {
  const [attendance, setAttendance] = useState<
    Record<number, AttendanceStatus>
  >({});

  const updateAttendance = (
    id: number,
    status: AttendanceStatus
  ) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>Student Attendance</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>

                <TableHead>Roll No</TableHead>

                <TableHead>Gender</TableHead>

                <TableHead className="w-24 text-center">
                  Present
                </TableHead>

                <TableHead className="w-24 text-center">
                  Absent
                </TableHead>

                <TableHead className="w-32 text-center">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <span className="font-medium">
                        {student.name}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    {student.rollNo}
                  </TableCell>

                  <TableCell>
                    {student.gender}
                  </TableCell>

                  {/* Present Checkbox */}
                  <TableCell className="w-24">
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={
                          attendance[student.id] ===
                          "Present"
                        }
                        onCheckedChange={() =>
                          updateAttendance(
                            student.id,
                            "Present"
                          )
                        }
                      />
                    </div>
                  </TableCell>

                  {/* Absent Checkbox */}
                  <TableCell className="w-24">
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={
                          attendance[student.id] ===
                          "Absent"
                        }
                        onCheckedChange={() =>
                          updateAttendance(
                            student.id,
                            "Absent"
                          )
                        }
                      />
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="text-center capitalize">
  {attendance[student.id] === "Present" ? (
    <Badge
      variant="outline"
      className="border-green-600 bg-green-50 text-green-700"
    >
      Present
    </Badge>
  ) : attendance[student.id] === "Absent" ? (
    <Badge
      variant="outline"
      className="border-red-600 bg-red-50 text-red-700"
    >
      Absent
    </Badge>
  ) : (
    <Badge
      variant="secondary"
      className="bg-gray-100 text-gray-600"
    >
      Not Marked
    </Badge>
  )}
</TableCell>
                  
                     
                     
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}