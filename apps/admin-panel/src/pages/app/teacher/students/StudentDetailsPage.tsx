import { ArrowLeft, BarChart3, BookOpen, CalendarCheck, Mail, Phone, School, User } from "lucide-react";
import { useNavigate, useParams } from "react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const students = [
  {
    id: 1,
    name: "Rahul Kumar",
    rollNo: "10A001",
    className: "10-A",
    parent: "Ravi Kumar",
    phone: "+91 9876543210",
    email: "rahul@gmail.com",
    attendance: "96%",
    assignments: "9 / 10 Completed",
    performance: "A Grade",
  },
  {
    id: 2,
    name: "Priya Sharma",
    rollNo: "10A002",
    className: "10-A",
    parent: "Suresh Sharma",
    phone: "+91 9876543211",
    email: "priya@gmail.com",
    attendance: "92%",
    assignments: "10 / 10 Completed",
    performance: "A Grade",
  },
  {
    id: 3,
    name: "Arjun Reddy",
    rollNo: "10A003",
    className: "10-A",
    parent: "Ramesh Reddy",
    phone: "+91 9876543212",
    email: "arjun@gmail.com",
    attendance: "88%",
    assignments: "8 / 10 Completed",
    performance: "B Grade",
  },
  {
    id: 4,
    name: "Sneha Patel",
    rollNo: "10A004",
    className: "10-A",
    parent: "Mahesh Patel",
    phone: "+91 9876543213",
    email: "sneha@gmail.com",
    attendance: "98%",
    assignments: "10 / 10 Completed",
    performance: "A+ Grade",
  },
  {
    id: 5,
    name: "Kiran Kumar",
    rollNo: "10A005",
    className: "10-A",
    parent: "Shiva Kumar",
    phone: "+91 9876543214",
    email: "kiran@gmail.com",
    attendance: "91%",
    assignments: "10 / 10 Completed",
    performance: "A Grade",
  },
];

export default function StudentDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const student = students.find(
    (s) => s.id === Number(id)
  );

  if (!student) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold">
          Student not found
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">

      <Button
        variant="outline"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>
            Student Details
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Student Information */}
          <div>
            <h3 className="mb-3 font-semibold">
              Student Information
            </h3>

            <div className="space-y-3">

              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{student.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <School className="h-4 w-4 text-muted-foreground" />
                <span>
                  Roll No : {student.rollNo} | Class : {student.className}
                </span>
              </div>

            </div>
          </div>

          <Separator />

          {/* Parent */}
          <div>

            <h3 className="mb-3 font-semibold">
              Parent Information
            </h3>

            <div className="space-y-3">

              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{student.parent}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{student.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{student.email}</span>
              </div>

            </div>

          </div>

          <Separator />

          {/* Academic */}
          <div>

            <h3 className="mb-3 font-semibold">
              Academic Summary
            </h3>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span>Attendance</span>
                <Badge>{student.attendance}</Badge>
              </div>

              <div className="flex justify-between">
                <span>Assignments</span>
                <Badge variant="secondary">
                  {student.assignments}
                </Badge>
              </div>

              <div className="flex justify-between">
                <span>Performance</span>
                <Badge className="bg-green-600">
                  {student.performance}
                </Badge>
              </div>

            </div>

          </div>

          <Separator />

          {/* Quick Actions */}
          <div>
  <h3 className="mb-3 font-semibold">
    Quick Actions
  </h3>

  <div className="grid gap-3 sm:grid-cols-3">

    {/* Attendance */}
    <Button
      variant="outline"
      onClick={() => navigate("/teacher/attendance")}
    >
      <CalendarCheck className="mr-2 h-4 w-4" />
      Attendance
    </Button>

    {/* Assignments */}
    <Button
      variant="outline"
      onClick={() => navigate("/teacher/assignments")}
    >
      <BookOpen className="mr-2 h-4 w-4" />
      Assignments
    </Button>

    {/* Student Performance */}
    <Button
      variant="outline"
      onClick={() =>
        navigate(`/teacher/students/${student.id}/performance`)
      }
    >
      <BarChart3 className="mr-2 h-4 w-4" />
      Performance
    </Button>

  </div>
</div>
 </CardContent>
      </Card>

    </div>
  );
}