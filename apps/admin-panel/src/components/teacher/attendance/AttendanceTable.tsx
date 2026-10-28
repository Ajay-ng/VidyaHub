import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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

type AttendanceStatus = "Present" | "Absent" | "Late";

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
        <CardTitle>
          Student Attendance
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>

                <TableHead>Roll No</TableHead>

                <TableHead>Gender</TableHead>

                <TableHead>Status</TableHead>

                <TableHead>Remarks</TableHead>
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

                  <TableCell>
                    <div className="flex gap-2">
                      <Badge
                        onClick={() =>
                          updateAttendance(
                            student.id,
                            "Present"
                          )
                        }
                        className={`cursor-pointer ${
                          attendance[student.id] ===
                          "Present"
                            ? "bg-green-600"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        Present
                      </Badge>

                      <Badge
                        onClick={() =>
                          updateAttendance(
                            student.id,
                            "Absent"
                          )
                        }
                        className={`cursor-pointer ${
                          attendance[student.id] ===
                          "Absent"
                            ? "bg-red-600"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                      >
                        Absent
                      </Badge>

                      <Badge
                        onClick={() =>
                          updateAttendance(
                            student.id,
                            "Late"
                          )
                        }
                        className={`cursor-pointer ${
                          attendance[student.id] ===
                          "Late"
                            ? "bg-yellow-500 text-white"
                            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        }`}
                      >
                        Late
                      </Badge>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Input
                      placeholder="Remarks..."
                    />
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