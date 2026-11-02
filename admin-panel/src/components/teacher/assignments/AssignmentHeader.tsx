import { useNavigate } from "react-router-dom";
import {
  Download,
  FileUp,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function AssignmentHeader() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">

      {/* Heading */}
      <div>
        <p className="text-sm text-muted-foreground">
          Academic Management • Teacher Portal
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Assignments
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Create, manage and monitor assignments for your classes.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-card p-5">

        <div>
          <h2 className="text-lg font-semibold">
            Quick Actions
          </h2>

          <p className="text-sm text-muted-foreground">
            Manage assignments efficiently
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          <Button
  className="bg-yellow-400 hover:bg-yellow-500 text-black"
  onClick={() => navigate("/teacher/assignments/create")}
>
  <Plus className="mr-2 h-4 w-4" />
  Create Assignment
</Button>

          <Button variant="outline">
            <FileUp className="mr-2 h-4 w-4" />
            Upload
          </Button>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

        </div>

      </div>

    </div>
  );
}