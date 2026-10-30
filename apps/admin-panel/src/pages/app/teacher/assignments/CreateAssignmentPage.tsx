import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  BookOpen,

  FileText,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CreateAssignmentPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleCreate = () => {
    console.log({
      title,
      subject,
      className,
      section,
      dueDate,
      instructions,
    });

    // TODO:
    // createAssignmentMutation.mutate(...)
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
              Create Assignment
            </h1>

            <p className="text-sm text-muted-foreground">
              Create a new assignment for students
            </p>

          </div>

        </div>

        <Badge className="bg-yellow-400 text-black hover:bg-yellow-500">
          New Assignment
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

          <div className="grid gap-5 md:grid-cols-2">

            <div className="space-y-2">

              <Label>
                Assignment Title
              </Label>

              <Input
                placeholder="Enter assignment title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

            </div>

            <div className="space-y-2">

              <Label>
                Subject
              </Label>

              <Input
                placeholder="Mathematics"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

            </div>

            <div className="space-y-2">

              <Label>
                Class
              </Label>

              <Input
                placeholder="10"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />

            </div>

            <div className="space-y-2">

              <Label>
                Section
              </Label>

              <Input
                placeholder="A"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              />

            </div>

            <div className="space-y-2 md:col-span-2">

              <Label>
                Due Date
              </Label>

              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />

            </div>

          </div>

        </CardContent>

      </Card>
            {/* Description & Instructions */}

      <Card>

        <CardHeader>

          <CardTitle>
            Assignment Details
          </CardTitle>

        </CardHeader>

        <CardContent className="space-y-6">

          <div className="space-y-2">

            <Label>
              Description
            </Label>

            <Textarea
              placeholder="Enter assignment description..."
              rows={4}
            />

          </div>

          <div className="space-y-2">

            <Label>
              Instructions
            </Label>

            <Textarea
              placeholder="Enter assignment instructions..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={6}
            />

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

          <div className="rounded-lg border-2 border-dashed p-8">

            <div className="flex flex-col items-center justify-center text-center">

              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">

                <Upload className="h-8 w-8 text-primary" />

              </div>

              <h3 className="font-semibold">
                Upload Assignment File
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                PDF, DOC, DOCX, PPT or ZIP (Maximum 10 MB)
              </p>

              <Button
                variant="outline"
                className="mt-5"
              >
                <FileText className="mr-2 h-4 w-4" />
                Choose File
              </Button>

            </div>

          </div>

        </CardContent>

      </Card>

      {/* Action Buttons */}

      <div className="flex justify-end gap-3">

        <Button
          variant="outline"
          onClick={() => navigate("/teacher/assignments")}
        >
          Cancel
        </Button>

        <Button
          onClick={handleCreate}
          className="bg-yellow-400 hover:bg-yellow-500 text-black"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Create Assignment
        </Button>

      </div>

    </div>
  );
}