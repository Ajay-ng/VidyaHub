import {
  ArrowLeft,
  CalendarDays,
  BookOpen,
  Users,
  Trash2,
  TriangleAlert,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const assignment = {
  id: 1,
  title: "Mathematics Worksheet",
  subject: "Mathematics",
  className: "10",
  section: "A",
  publishedDate: "10 Oct 2026",
  dueDate: "20 Oct 2026",
  status: "Live",
  totalStudents: 42,
};

export default function TeacherDeleteAssignmentPage() {
  const navigate = useNavigate();

  const handleDelete = () => {
    console.log("Delete Assignment:", assignment.id);

    // TODO
    // deleteAssignmentMutation.mutate(assignment.id);
  };

  return (
    <div className="space-y-6 p-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/teacher/assignments")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>

            <h1 className="text-2xl font-bold">
              Delete Assignment
            </h1>

            <p className="text-sm text-muted-foreground">
              Permanently remove assignment
            </p>

          </div>

        </div>

        <Badge
          variant="destructive"
          className="px-3 py-1"
        >
          Delete
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
                Assignment
              </p>

              <p className="font-semibold">
                {assignment.title}
              </p>

            </div>

            <div>

              <p className="text-sm text-muted-foreground">
                Subject
              </p>

              <div className="flex items-center gap-2">

                <BookOpen className="h-4 w-4 text-primary" />

                <span className="font-semibold">
                  {assignment.subject}
                </span>

              </div>

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
                Published Date
              </p>

              <div className="flex items-center gap-2">

                <CalendarDays className="h-4 w-4 text-primary" />

                <span className="font-semibold">
                  {assignment.publishedDate}
                </span>

              </div>

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
                Total Students
              </p>

              <div className="flex items-center gap-2">

                <Users className="h-4 w-4 text-primary" />

                <span className="font-semibold">
                  {assignment.totalStudents}
                </span>

              </div>

            </div>

          </div>

        </CardContent>

      </Card>
            {/* Warning Card */}

      <Card className="border-red-200">

        <CardHeader>

          <CardTitle className="flex items-center gap-2 text-red-600">

            <TriangleAlert className="h-5 w-5" />

            Delete Confirmation

          </CardTitle>

        </CardHeader>

        <CardContent className="space-y-5">

          <div className="rounded-lg border border-red-200 bg-red-50 p-5">

            <h3 className="mb-3 text-lg font-semibold text-red-700">
              Warning
            </h3>

            <p className="text-sm text-red-700">
              You are about to permanently delete this assignment.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-red-700">

              <li>
                Assignment details will be permanently removed.
              </li>

              <li>
                Student submissions linked to this assignment may also be removed.
              </li>

              <li>
                Marks and grading records related to this assignment may be lost.
              </li>

              <li>
                This action cannot be undone.
              </li>

            </ul>

          </div>

          <div className="rounded-lg border bg-muted/30 p-4">

            <p className="text-sm text-muted-foreground">
              Assignment to be deleted
            </p>

            <p className="mt-1 text-lg font-semibold">
              {assignment.title}
            </p>

          </div>

          <div className="flex justify-end gap-3">

            <Button
              variant="outline"
              onClick={() => navigate("/teacher/assignments")}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Assignment
            </Button>

          </div>

        </CardContent>

      </Card>

    </div>
  );
}