import { useState } from "react"
import { ArrowLeft, CalendarDays, Paperclip, Upload, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function TeacherEditAssignmentPage() {
  const [title, setTitle] = useState("Mathematics Worksheet")
  const [subject, setSubject] = useState("Mathematics")
  const [className, setClassName] = useState("10")
  const [section, setSection] = useState("A")
  const [type, setType] = useState("Homework")

  const [publishedDate, setPublishedDate] = useState("2026-10-10")
  const [dueDate, setDueDate] = useState("2026-10-20")

  const [description, setDescription] = useState(
    "Complete all worksheet questions from Chapter 5 and upload the answer sheet in PDF format."
  )

  const [instructions, setInstructions] = useState(
    `• Solve every question.

• Show all calculations.

• Submit before due date.

• PDF only.

• Late submissions are not accepted.`
  )

  const [status, setStatus] = useState("Live")

  const handleSave = () => {
    const payload = {
      title,
      subject,
      className,
      section,
      type,
      publishedDate,
      dueDate,
      description,
      instructions,
      status,
    }

    console.log(payload)

    alert("Assignment Updated Successfully")
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-2xl font-bold">Edit Assignment</h1>

            <p className="text-sm text-muted-foreground">
              Update assignment details
            </p>
          </div>
        </div>

        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
          Editing
        </Badge>
      </div>

      {/* Assignment Information */}
      <Card>
        <CardHeader>
          <CardTitle>Assignment Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Assignment Title</Label>

            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {/* Subject */}
            <div className="space-y-2">
              <Label>Subject</Label>

              <Select
                value={subject}
                onValueChange={(value) => setSubject(value ?? "")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>

                  <SelectItem value="Science">Science</SelectItem>

                  <SelectItem value="English">English</SelectItem>

                  <SelectItem value="Social">Social</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Class */}
            <div className="space-y-2">
              <Label>Class</Label>

              <Select
                value={className}
                onValueChange={(value) => setClassName(value ?? "")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="8">Class 8</SelectItem>
                  <SelectItem value="9">Class 9</SelectItem>
                  <SelectItem value="10">Class 10</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Section */}
            <div className="space-y-2">
              <Label>Section</Label>

              <Select
                value={section}
                onValueChange={(value) => setSection(value ?? "")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Assignment Type */}
            <div className="space-y-2">
              <Label>Assignment Type</Label>

              <Select
                value={type}
                onValueChange={(value) => setType(value ?? "")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Homework">Homework</SelectItem>

                  <SelectItem value="Worksheet">Worksheet</SelectItem>

                  <SelectItem value="Project">Project</SelectItem>

                  <SelectItem value="Quiz">Quiz</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Published Date</Label>

              <div className="relative">
                <CalendarDays className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />

                <Input
                  type="date"
                  className="pl-10"
                  value={publishedDate}
                  onChange={(e) => setPublishedDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Due Date</Label>

              <div className="relative">
                <CalendarDays className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />

                <Input
                  type="date"
                  className="pl-10"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>

            <Textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <Label>Instructions</Label>

            <Textarea
              rows={6}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Attachment */}
      <Card>
        <CardHeader>
          <CardTitle>Attachment</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Paperclip className="h-6 w-6 text-primary" />

                <div>
                  <p className="font-medium">Mathematics_Worksheet.pdf</p>

                  <p className="text-sm text-muted-foreground">PDF • 1.2 MB</p>
                </div>
              </div>

              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Change File
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      <Card>
        <CardHeader>
          <CardTitle>Assignment Status</CardTitle>
        </CardHeader>

        <CardContent>
          <RadioGroup
            value={status}
            onValueChange={setStatus}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Live" id="live" />
              <Label htmlFor="live">🟢 Live</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Draft" id="draft" />
              <Label htmlFor="draft">🟠 Draft</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Completed" id="completed" />
              <Label htmlFor="completed">🔵 Completed</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Footer Buttons */}
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline">Cancel</Button>

        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
