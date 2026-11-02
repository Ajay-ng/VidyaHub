import { ArrowLeft, CalendarDays, Users, UserCheck, UserX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const assignment = {
  title: "Mathematics Chapter 5 Worksheet",
  subject: "Mathematics",
  className: "10",
  section: "A",
  dueDate: "20 Oct 2026",
  createdDate: "10 Oct 2026",
  status: "Live",
  totalStudents: 42,
  submittedStudents: 34,
  pendingStudents: 8,
};

export default function AssignmentDetailsPage() {
  const progress =
    (assignment.submittedStudents / assignment.totalStudents) * 100;

  return (
    <div className="space-y-6 p-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-2xl font-bold">
              {assignment.title}
            </h1>

            <p className="text-sm text-muted-foreground">
              Assignment Details
            </p>
          </div>

        </div>

        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          {assignment.status}
        </Badge>

      </div>

      {/* Assignment Information */}

      <Card>

        <CardHeader>

          <CardTitle>
            Assignment Information
          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            <div>
              <p className="text-sm text-muted-foreground">
                Subject
              </p>

              <p className="font-semibold">
                {assignment.subject}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Class
              </p>

              <p className="font-semibold">
                Class {assignment.className} - {assignment.section}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Due Date
              </p>

              <div className="flex items-center gap-2">

                <CalendarDays className="h-4 w-4 text-primary" />

                <span className="font-semibold">
                  {assignment.dueDate}
                </span>

              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Created Date
              </p>

              <p className="font-semibold">
                {assignment.createdDate}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Status
              </p>

              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                {assignment.status}
              </Badge>
            </div>

          </div>

        </CardContent>

      </Card>

      {/* Submission Summary */}

      <Card>

        <CardHeader>

          <CardTitle>
            Submission Summary
          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="grid gap-4 md:grid-cols-4">

            <Card>

              <CardContent className="flex items-center gap-3 p-5">

                <Users className="h-8 w-8 text-primary" />

                <div>

                  <p className="text-sm text-muted-foreground">
                    Total Students
                  </p>

                  <h2 className="text-2xl font-bold">
                    {assignment.totalStudents}
                  </h2>

                </div>

              </CardContent>

            </Card>

            <Card>

              <CardContent className="flex items-center gap-3 p-5">

                <UserCheck className="h-8 w-8 text-green-600" />

                <div>

                  <p className="text-sm text-muted-foreground">
                    Submitted
                  </p>

                  <h2 className="text-2xl font-bold">
                    {assignment.submittedStudents}
                  </h2>

                </div>

              </CardContent>

            </Card>

            <Card>

              <CardContent className="flex items-center gap-3 p-5">

                <UserX className="h-8 w-8 text-red-500" />

                <div>

                  <p className="text-sm text-muted-foreground">
                    Pending
                  </p>

                  <h2 className="text-2xl font-bold">
                    {assignment.pendingStudents}
                  </h2>

                </div>

              </CardContent>

            </Card>

            <Card>

              <CardContent className="space-y-3 p-5">

                <div className="flex justify-between">

                  <span className="text-sm text-muted-foreground">
                    Progress
                  </span>

                  <span className="font-semibold">
                    {progress.toFixed(0)}%
                  </span>

                </div>

                <div className="h-3 rounded-full bg-muted overflow-hidden">

                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

              </CardContent>

            </Card>

          </div>

        </CardContent>

      </Card>
            {/* Attachment */}

      <Card>

        <CardHeader>

          <CardTitle>
            Attachment
          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="flex items-center justify-between rounded-lg border p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">

                📄

              </div>

              <div>

                <p className="font-medium">
                  Mathematics_Worksheet.pdf
                </p>

                <p className="text-sm text-muted-foreground">
                  PDF • 1.2 MB
                </p>

              </div>

            </div>

            <Button>
              Download
            </Button>

          </div>

        </CardContent>

      </Card>

      {/* Instructions */}

      <Card>

        <CardHeader>

          <CardTitle>
            Instructions
          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="space-y-3 text-sm leading-7">

            <p>
              • Complete all questions carefully.
            </p>

            <p>
              • Show all calculation steps.
            </p>

            <p>
              • Submit the worksheet before the due date.
            </p>

            <p>
              • Late submissions will not be accepted.
            </p>

            <p>
              • Upload your assignment in PDF format only.
            </p>

          </div>

        </CardContent>

      </Card>

      {/* Student Submission Table */}

      <Card>

        <CardHeader>

          <CardTitle>
            Student Submissions
          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>

                <tr className="border-b">

                  <th className="py-3 text-left">
                    Roll No
                  </th>

                  <th className="text-left">
                    Student Name
                  </th>

                  <th className="text-left">
                    Status
                  </th>

                  <th className="text-left">
                    Submitted Time
                  </th>

                  <th className="text-left">
                    Marks
                  </th>

                  <th className="text-right">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr className="border-b">

                  <td className="py-4">
                    01
                  </td>

                  <td>
                    Rahul Kumar
                  </td>

                  <td>

                    <Badge className="bg-green-100 text-green-700">
                      Submitted
                    </Badge>

                  </td>

                  <td>
                    18 Oct 2026 10:20 AM
                  </td>

                  <td>
                    19 / 20
                  </td>

                  <td className="text-right">

                    <Button
                      variant="outline"
                      size="sm"
                    >
                      View
                    </Button>

                  </td>

                </tr>

                <tr className="border-b">

                  <td className="py-4">
                    02
                  </td>

                  <td>
                    Priya Sharma
                  </td>

                  <td>

                    <Badge variant="secondary">
                      Pending
                    </Badge>

                  </td>

                  <td>
                    --
                  </td>

                  <td>
                    --
                  </td>

                  <td className="text-right">

                    <Button
                      variant="outline"
                      size="sm"
                    >
                      View
                    </Button>

                  </td>

                </tr>

                <tr>

                  <td className="py-4">
                    03
                  </td>

                  <td>
                    Arjun Patel
                  </td>

                  <td>

                    <Badge className="bg-green-100 text-green-700">
                      Submitted
                    </Badge>

                  </td>

                  <td>
                    18 Oct 2026 11:45 AM
                  </td>

                  <td>
                    20 / 20
                  </td>

                  <td className="text-right">

                    <Button
                      variant="outline"
                      size="sm"
                    >
                      View
                    </Button>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </CardContent>

      </Card>
          </div>
  );
}