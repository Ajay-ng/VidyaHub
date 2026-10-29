import { useNavigate } from "react-router";

import {
  CheckCircle2,
  Clock3,
  Eye,
  MoreHorizontal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    rollNo: "10A001",
    name: "Rahul Kumar",
    attendance: "96%",
    assignment: "1 Pending",
    pending: true,
  },
  {
    id: 2,
    rollNo: "10A002",
    name: "Priya Sharma",
    attendance: "92%",
    assignment: "Completed",
    pending: false,
  },
  {
    id: 3,
    rollNo: "10A003",
    name: "Arjun Reddy",
    attendance: "88%",
    assignment: "2 Pending",
    pending: true,
  },
  {
    id: 4,
    rollNo: "10A004",
    name: "Sneha Patel",
    attendance: "98%",
    assignment: "Completed",
    pending: false,
  },
  {
    id: 5,
    rollNo: "10A005",
    name: "Kiran Kumar",
    attendance: "91%",
    assignment: "Completed",
    pending: false,
  },
];

export function StudentsTable() {
  const navigate = useNavigate();

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Roll No</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Assignments</TableHead>
              <TableHead className="w-28 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">
                  {student.rollNo}
                </TableCell>

                <TableCell>{student.name}</TableCell>

                <TableCell>
                  <Badge variant="secondary">
                    {student.attendance}
                  </Badge>
                </TableCell>

                <TableCell>
                  {student.pending ? (
                    <Badge
                      variant="outline"
                      className="border-orange-300 text-orange-600"
                    >
                      <Clock3 className="mr-1 h-3 w-3" />
                      {student.assignment}
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="border-green-300 text-green-600"
                    >
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      {student.assignment}
                    </Badge>
                  )}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {/* Eye Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        navigate(`/teacher/students/${student.id}`)
                      }
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                   {/* More Menu */}
<DropdownMenu>
  <DropdownMenuTrigger> 
    <Button
      variant="ghost"
      size="icon"
    >
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent align="end">

    <DropdownMenuItem
      onClick={() =>
        navigate(`/teacher/students/${student.id}`)
      }
    >
      View Profile
    </DropdownMenuItem>

    <DropdownMenuItem
  onClick={() => navigate("/teacher/attendance")}
>
  Attendance History
</DropdownMenuItem>

    <DropdownMenuItem
  onClick={() => navigate("/teacher/assignments")}
>
  Assignments
</DropdownMenuItem>

    <DropdownMenuItem
  onClick={() => navigate("/teacher/performance")}
>
  Performance
</DropdownMenuItem>

        </DropdownMenuContent>
          </DropdownMenu>
                          
                        
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}