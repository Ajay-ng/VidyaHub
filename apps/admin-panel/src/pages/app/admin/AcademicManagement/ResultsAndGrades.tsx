
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Download,
  GraduationCap,
  Search,
  Users,
  XCircle,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Student = {
  id: string;
  name: string;
  rollNumber: string;
  admissionNumber: string;
  marks: number;
  maxMarks: number;
};

type Section = {
  name: string;
  students: Student[];
};

type SchoolClass = {
  id: number;
  name: string;
  sections: Section[];
};

const examOptions = [
  "Unit Test 1",
  "Midterm Examination",
  "Final Examination",
];

const names = [
  "Aarav Sharma",
  "Diya Reddy",
  "Rahul Kumar",
  "Ananya Rao",
  "Ishaan Patel",
  "Meera Nair",
  "Arjun Gowda",
  "Saanvi Shetty",
  "Vivaan Das",
  "Aditi Verma",
  "Rohan Joshi",
  "Kavya Singh",
];

const markSets: Record<string, number[]> = {
  "Unit Test 1": [95, 92, 85, 62, 78, 88, 72, 68, 55, 81, 47, 90],
  "Midterm Examination": [475, 460, 425, 310, 390, 440, 360, 340, 275, 405, 230, 450],
  "Final Examination": [480, 465, 435, 325, 400, 445, 375, 350, 285, 415, 245, 455],
};

function createStudents(sectionCode: string): Student[] {
  const isUnitTest = false;

  return names.map((name, index) => ({
    id: `${sectionCode}-${index + 1}`,
    name,
    rollNumber: String(index + 1).padStart(3, "0"),
    admissionNumber: `VH${sectionCode.replace(/[^A-Z0-9]/gi, "")}${String(
      index + 1
    ).padStart(3, "0")}`,
    marks: 0,
    maxMarks: isUnitTest ? 100 : 500,
  }));
}

const classDefinitions = [
  { id: 6, sections: ["A", "B", "C"] },
  { id: 7, sections: ["A", "B", "C"] },
  { id: 8, sections: ["A", "B", "C"] },
  { id: 9, sections: ["A", "B", "C"] },
  { id: 10, sections: ["A", "B", "C"] },
  { id: 11, sections: ["A", "B"] },
  { id: 12, sections: ["A", "B"] },
];

const classes: SchoolClass[] = classDefinitions.map((item) => ({
  id: item.id,
  name: `Class ${item.id}`,
  sections: item.sections.map((section) => {
    const code = `C${item.id}${section}`;

    return {
      name: `Section ${section}`,
      students: createStudents(code),
    };
  }),
}));

function getMarks(
  student: Student,
  exam: string,
  studentIndex: number
): number {
  const values = markSets[exam] ?? markSets["Unit Test 1"];
  const raw = values[studentIndex % values.length];

  if (exam === "Unit Test 1") {
    return raw;
  }

  // Demo marks are scaled to a 500-mark examination.
  return raw;
}

function getGrade(percentage: number): string {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C";
  if (percentage >= 40) return "D";
  return "F";
}

function getResult(percentage: number): "Pass" | "Fail" {
  return percentage >= 35 ? "Pass" : "Fail";
}

export default function ResultsGrades() {
  const [selectedClass, setSelectedClass] = useState<SchoolClass | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [selectedExam, setSelectedExam] = useState("Midterm Examination");
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const isUnitTest = selectedExam === "Unit Test 1";
  const maxMarks = isUnitTest ? 100 : 500;

  const sectionResults = useMemo(() => {
    if (!selectedSection) return [];

    return selectedSection.students
      .map((student, index) => {
        const marks = getMarks(student, selectedExam, index);
        const percentage = (marks / maxMarks) * 100;

        return {
          ...student,
          marks,
          maxMarks,
          percentage,
          grade: getGrade(percentage),
          result: getResult(percentage),
        };
      })
      .sort((a, b) => b.percentage - a.percentage)
      .map((student, index) => ({
        ...student,
        rank: index + 1,
      }));
  }, [selectedSection, selectedExam, maxMarks]);

  const filteredResults = useMemo(() => {
    const query = search.trim().toLowerCase();

    return sectionResults.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.rollNumber.toLowerCase().includes(query) ||
        student.admissionNumber.toLowerCase().includes(query)
    );
  }, [sectionResults, search]);

  const passCount = sectionResults.filter(
    (student) => student.result === "Pass"
  ).length;

  const passPercentage = sectionResults.length
    ? (passCount / sectionResults.length) * 100
    : 0;

  const averagePercentage = sectionResults.length
    ? sectionResults.reduce((sum, student) => sum + student.percentage, 0) /
      sectionResults.length
    : 0;

  const publishedCount = sectionResults.length;

  function goBack() {
    if (selectedSection) {
      setSelectedSection(null);
    } else if (selectedClass) {
      setSelectedClass(null);
    }
    setSearch("");
  }

  function exportCSV() {
    const headers = [
      "Rank",
      "Student Name",
      "Roll Number",
      "Admission Number",
      "Marks",
      "Maximum Marks",
      "Percentage",
      "Grade",
      "Result",
    ];

    const rows = filteredResults.map((student) => [
      student.rank,
      student.name,
      student.rollNumber,
      student.admissionNumber,
      student.marks,
      student.maxMarks,
      student.percentage.toFixed(2),
      student.grade,
      student.result,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${selectedClass?.name}-${selectedSection?.name}-${selectedExam
      .replace(/\s+/g, "-")
      .toLowerCase()}-results.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  const statCards = [
    {
      label: "Total Students",
      value: sectionResults.length,
      icon: Users,
      description: "Students in this section",
    },
    {
      label: "Pass Percentage",
      value: `${passPercentage.toFixed(1)}%`,
      icon: CheckCircle2,
      description: `${passCount} students passed`,
    },
    {
      label: "Class Average",
      value: `${averagePercentage.toFixed(1)}%`,
      icon: Award,
      description: "Average student percentage",
    },
    {
      label: "Failed Students",
      value: sectionResults.length - passCount,
      icon: XCircle,
      description: "Students below passing criteria",
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          {(selectedClass || selectedSection) && (
            <Button
              variant="outline"
              size="icon"
              onClick={goBack}
              aria-label="Go back"
            >
              <ArrowLeft className="size-4" />
            </Button>
          )}

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Results & Grades
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {selectedSection
                ? `${selectedClass?.name} / ${selectedSection.name} — Student results`
                : selectedClass
                  ? `${selectedClass.name} — Select a section`
                  : "Select a class to view examination results."}
            </p>
          </div>
        </div>

        <div className="w-full sm:w-64">
          <Select
            value={selectedExam}
            onValueChange={(value) => setSelectedExam(value ?? "Midterm Examination")}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select examination" />
            </SelectTrigger>
            <SelectContent>
              {examOptions.map((exam) => (
                <SelectItem key={exam} value={exam}>
                  {exam}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <button
          className="hover:text-foreground"
          onClick={() => {
            setSelectedClass(null);
            setSelectedSection(null);
            setSearch("");
          }}
        >
          All Classes
        </button>
        {selectedClass && (
          <>
            <ChevronRight className="size-4" />
            <button
              className={
                selectedSection
                  ? "hover:text-foreground"
                  : "font-medium text-foreground"
              }
              onClick={() => {
                setSelectedSection(null);
                setSearch("");
              }}
            >
              {selectedClass.name}
            </button>
          </>
        )}
        {selectedSection && (
          <>
            <ChevronRight className="size-4" />
            <span className="font-medium text-foreground">
              {selectedSection.name}
            </span>
          </>
        )}
      </div>

      {/* Class selection */}
      {!selectedClass && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {classes.map((schoolClass) => {
              const studentCount = schoolClass.sections.reduce(
                (total, section) => total + section.students.length,
                0
              );

              return (
                <button
                  key={schoolClass.id}
                  onClick={() => setSelectedClass(schoolClass)}
                  className="text-left"
                >
                  <Card className="h-full transition-colors hover:border-primary hover:bg-accent/40">
                    <CardContent className="flex items-center gap-3 p-3">
                      <div className="rounded-xl bg-primary/20 p-2">
                        <GraduationCap className="size-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-lg font-semibold">
                          {schoolClass.name}
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {schoolClass.sections.length} sections · {studentCount} demo students
                        </p>
                        <p className="mt-2 text-sm font-medium">
                          View sections
                          <ChevronRight className="ml-1 inline size-4" />
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Section selection */}
      {selectedClass && !selectedSection && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">
              Sections in {selectedClass.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              Choose a section to view its student results.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {selectedClass.sections.map((section) => (
              <button
                key={section.name}
                onClick={() => {
                  setSelectedSection(section);
                  setSearch("");
                }}
                className="text-left"
              >
                <Card className="h-full transition-colors hover:border-primary hover:bg-accent/40">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="rounded-xl bg-primary/20 p-3">
                      <BookOpen className="size-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold">{section.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {section.students.length} demo students
                      </p>
                      <p className="mt-2 text-sm font-medium">
                        View results
                        <ChevronRight className="ml-1 inline size-4" />
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected section results */}
      {selectedClass && selectedSection && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statCards.map((stat) => {
              const Icon = stat.icon;

              return (
                <Card key={stat.label}>
                  <CardContent className="flex items-start justify-between gap-3 p-5">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="mt-2 text-2xl font-bold">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {stat.description}
                      </p>
                    </div>
                    <div className="rounded-lg bg-primary/20 p-3">
                      <Icon className="size-5" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader className="gap-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <CardTitle>Student Results</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {selectedClass.name} · {selectedSection.name} · {selectedExam}
                  </p>
                </div>

                <Button onClick={exportCSV} variant="outline">
                  <Download className="mr-2 size-4" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Search student, roll number..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Roll No.</TableHead>
                      <TableHead className="text-right">Marks</TableHead>
                      <TableHead className="text-right">Percentage</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredResults.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="h-28 text-center text-muted-foreground"
                        >
                          No students match your search.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredResults.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary/20 font-semibold">
                              {student.rank}
                            </span>
                          </TableCell>

                          <TableCell>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {student.admissionNumber}
                            </div>
                          </TableCell>

                          <TableCell>{student.rollNumber}</TableCell>

                          <TableCell className="text-right font-medium">
                            {student.marks}/{student.maxMarks}
                          </TableCell>

                          <TableCell className="text-right">
                            {student.percentage.toFixed(1)}%
                          </TableCell>

                          <TableCell>
                            <Badge
                              variant={
                                student.grade === "F"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {student.grade}
                            </Badge>
                          </TableCell>

                          <TableCell>
                            <Badge
                              variant={
                                student.result === "Pass"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {student.result}
                            </Badge>
                          </TableCell>

                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedStudent(student)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:justify-between">
                <span>
                  Showing {filteredResults.length} of {sectionResults.length} students
                </span>
                <span>
                  Ranking is based on percentage within this section.
                </span>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Student result dialog */}
      <Dialog
        open={selectedStudent !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedStudent(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          {selectedStudent && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedStudent.name}</DialogTitle>
                <DialogDescription>
                  {selectedClass?.name} · {selectedSection?.name} · {selectedExam}
                </DialogDescription>
              </DialogHeader>

              {(() => {
                const student = sectionResults.find(
                  (item) => item.id === selectedStudent.id
                );

                if (!student) return null;

                return (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border p-3">
                        <p className="text-sm text-muted-foreground">Rank</p>
                        <p className="mt-1 text-2xl font-bold">
                          #{student.rank}
                        </p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="text-sm text-muted-foreground">Grade</p>
                        <p className="mt-1 text-2xl font-bold">
                          {student.grade}
                        </p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="text-sm text-muted-foreground">Marks</p>
                        <p className="mt-1 text-xl font-semibold">
                          {student.marks}/{student.maxMarks}
                        </p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="text-sm text-muted-foreground">Percentage</p>
                        <p className="mt-1 text-xl font-semibold">
                          {student.percentage.toFixed(1)}%
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm text-muted-foreground">
                        Examination result
                      </span>
                      <Badge
                        variant={
                          student.result === "Pass"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {student.result}
                      </Badge>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Admission number: {student.admissionNumber}
                      <br />
                      Roll number: {student.rollNumber}
                    </div>
                  </div>
                );
              })()}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
