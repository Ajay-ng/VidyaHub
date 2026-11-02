import { useMemo, useState } from "react"
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Users,
  GraduationCap,
  UserRoundCheck,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Student {
  id: string
  admissionNo: string
  name: string
  email: string
  guardian: string
  phone: string
  className: string
  section: string
  gender: "Male" | "Female"
  status: "Active" | "Inactive"
}

const initialStudents: Student[] = [
  {
    id: "1",
    admissionNo: "ADM2026001",
    name: "Aarav Sharma",
    email: "aarav@example.com",
    guardian: "Rajesh Sharma",
    phone: "9876543210",
    className: "11",
    section: "A",
    gender: "Male",
    status: "Active",
  },
  {
    id: "2",
    admissionNo: "ADM2026002",
    name: "Priya Patel",
    email: "priya@example.com",
    guardian: "Amit Patel",
    phone: "9876543211",
    className: "10",
    section: "B",
    gender: "Female",
    status: "Active",
  },
  {
    id: "3",
    admissionNo: "ADM2026003",
    name: "Rahul Verma",
    email: "rahul@example.com",
    guardian: "Suresh Verma",
    phone: "9876543212",
    className: "9",
    section: "A",
    gender: "Male",
    status: "Active",
  },
  {
    id: "4",
    admissionNo: "ADM2026004",
    name: "Ananya Reddy",
    email: "ananya@example.com",
    guardian: "Kiran Reddy",
    phone: "9876543213",
    className: "11",
    section: "B",
    gender: "Female",
    status: "Inactive",
  },
  {
    id: "5",
    admissionNo: "ADM2026005",
    name: "Vikram Singh",
    email: "vikram@example.com",
    guardian: "Manoj Singh",
    phone: "9876543214",
    className: "8",
    section: "C",
    gender: "Male",
    status: "Active",
  },
  {
    id: "6",
    admissionNo: "ADM2026006",
    name: "Sneha Kumar",
    email: "sneha@example.com",
    guardian: "Ramesh Kumar",
    phone: "9876543215",
    className: "10",
    section: "A",
    gender: "Female",
    status: "Active",
  },
]

const classes = ["6", "7", "8", "9", "10", "11", "12"]
const sections = ["A", "B", "C", "D"]

const emptyStudent: Omit<Student, "id"> = {
  admissionNo: "",
  name: "",
  email: "",
  guardian: "",
  phone: "",
  className: "10",
  section: "A",
  gender: "Male",
  status: "Active",
}

const selectClass =
  "h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"

const demoStudents: Student[] = Array.from({ length: 30 }, (_, index) => {
  const number = index + 7

  const firstNames = [
    "Aditya",
    "Diya",
    "Arjun",
    "Meera",
    "Karthik",
    "Ishita",
    "Rohan",
    "Kavya",
    "Vivek",
    "Ananya",
  ]

  const lastNames = ["Sharma", "Patel", "Reddy", "Kumar", "Verma", "Singh"]

  const firstName = firstNames[index % firstNames.length]
  const lastName = lastNames[index % lastNames.length]

  return {
    id: String(number),
    admissionNo: `ADM2026${String(number).padStart(3, "0")}`,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}${number}@example.com`,
    guardian: `Parent of ${firstName}`,
    phone: `98765${String(10000 + number).slice(-5)}`,
    className: classes[index % classes.length],
    section: sections[index % sections.length],
    gender: index % 2 === 0 ? "Male" : "Female",
    status: index % 7 === 0 ? "Inactive" : "Active",
  }
})

export default function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([
    ...initialStudents,
    ...demoStudents,
  ])
  const [search, setSearch] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedSection, setSelectedSection] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [formOpen, setFormOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [deleteStudent, setDeleteStudent] = useState<Student | null>(null)
  const [formData, setFormData] = useState<Omit<Student, "id">>(emptyStudent)
  const [formError, setFormError] = useState("")

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase()

    return students.filter((student) => {
      const matchesSearch =
        !query ||
        [
          student.name,
          student.admissionNo,
          student.email,
          student.guardian,
          student.phone,
        ].some((value) => value.toLowerCase().includes(query))

      const matchesClass =
        selectedClass === "all" || student.className === selectedClass

      const matchesSection =
        selectedSection === "all" || student.section === selectedSection

      const matchesStatus =
        selectedStatus === "all" || student.status === selectedStatus

      return matchesSearch && matchesClass && matchesSection && matchesStatus
    })
  }, [students, search, selectedClass, selectedSection, selectedStatus])

  const activeCount = students.filter(
    (student) => student.status === "Active"
  ).length

  function openCreateDialog() {
    setEditingStudent(null)
    setFormData({
      ...emptyStudent,
      admissionNo: `ADM${Date.now().toString().slice(-8)}`,
    })
    setFormError("")
    setFormOpen(true)
  }

  function openEditDialog(student: Student) {
    setEditingStudent(student)

    const { ...studentData } = student
    setFormData(studentData)
    setFormError("")
    setFormOpen(true)
  }

  function handleSaveStudent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError("")

    const admissionNo = formData.admissionNo.trim()
    const name = formData.name.trim()
    const phone = formData.phone.trim()

    if (!admissionNo || !name || !phone || !formData.guardian.trim()) {
      setFormError("Please fill in all required fields.")
      return
    }

    const duplicateAdmission = students.some(
      (student) =>
        student.admissionNo.toLowerCase() === admissionNo.toLowerCase() &&
        student.id !== editingStudent?.id
    )

    if (duplicateAdmission) {
      setFormError("This admission number already exists.")
      return
    }

    if (editingStudent) {
      setStudents((current) =>
        current.map((student) =>
          student.id === editingStudent.id
            ? { ...formData, id: editingStudent.id }
            : student
        )
      )
    } else {
      setStudents((current) => [
        { ...formData, id: crypto.randomUUID() },
        ...current,
      ])
    }

    setFormOpen(false)
    setEditingStudent(null)
  }

  function handleDeleteStudent() {
    if (!deleteStudent) return

    setStudents((current) =>
      current.filter((student) => student.id !== deleteStudent.id)
    )

    setDeleteStudent(null)
  }

  function updateField<K extends keyof Omit<Student, "id">>(
    field: K,
    value: Omit<Student, "id">[K]
  ) {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  const totalStudents = filteredStudents.length

  const totalPages = Math.max(1, Math.ceil(totalStudents / pageSize))

  // Keep the displayed page valid after deleting records.
  const safeCurrentPage = Math.min(currentPage, totalPages)

  const startIndex = (safeCurrentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalStudents)

  const paginatedStudents = filteredStudents.slice(startIndex, endIndex)

  const resetPagination = () => {
    setCurrentPage(1)
  }

  return (
    <section className="w-full min-w-0 space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">
            AY 2026–2027 <span className="mx-1">•</span> CBSE Affiliation
          </p>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Student Directory
          </h1>

          <p className="max-w-2xl text-sm text-muted-foreground">
            Manage student records, class placements, and guardian information.
          </p>
        </div>

        <Button onClick={openCreateDialog} className="gap-2">
          <Plus className="size-4" />
          Add Student
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Total Students"
          value={students.length}
          description="Across all classes"
          icon={<Users className="size-5" />}
        />

        <SummaryCard
          title="Active Students"
          value={activeCount}
          description="Currently enrolled"
          icon={<UserRoundCheck className="size-5" />}
        />

        <SummaryCard
          title="Classes"
          value={classes.length}
          description="Classes 6–12"
          icon={<GraduationCap className="size-5" />}
        />
      </div>

      {/* Directory and filters */}
      <Card className="min-w-0 gap-0 py-0">
        <div className="flex flex-col gap-4 border-b p-4 sm:p-5">
          <div>
            <h2 className="text-base font-semibold">All Students</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Search, filter, and manage student records.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_150px_150px_150px_auto]">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                  resetPagination()
                }}
                placeholder="Search name, admission no..."
                className="pl-9"
                aria-label="Search students"
              />
            </div>

            <select
              className={selectClass}
              value={selectedClass}
              onChange={(event) => {
                setSelectedClass(event.target.value)
                setSelectedSection("all")
              }}
              aria-label="Filter by class"
            >
              <option value="all">All Classes</option>
              {classes.map((className) => (
                <option key={className} value={className}>
                  Class {className}
                </option>
              ))}
            </select>

            <select
              className={selectClass}
              value={selectedSection}
              onChange={(event) => setSelectedSection(event.target.value)}
              aria-label="Filter by section"
            >
              <option value="all">All Sections</option>
              {sections.map((section) => (
                <option key={section} value={section}>
                  Section {section}
                </option>
              ))}
            </select>

            <select
              className={selectClass}
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              aria-label="Filter by status"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                setSearch("")
                setSelectedClass("all")
                setSelectedSection("all")
                setSelectedStatus("all")
              }}
            >
              <Filter className="size-4" />
              Reset
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Showing {filteredStudents.length} of {students.length} students
          </p>
        </div>

        {/* Student table */}
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Admission No.</TableHead>
                <TableHead>Class & Section</TableHead>
                <TableHead>Guardian</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedStudents.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No students found. Try changing your search or filters.
                  </TableCell>
                </TableRow>
              )}
              {paginatedStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex min-w-[170px] items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {student.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="font-medium">{student.name}</p>
                        <p className="max-w-[180px] truncate text-xs text-muted-foreground">
                          {student.email || "No email provided"}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-sm whitespace-nowrap">
                    {student.admissionNo}
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    <Badge variant="secondary">
                      Class {student.className} – {student.section}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-sm whitespace-nowrap">
                    {student.guardian}
                  </TableCell>

                  <TableCell className="text-sm whitespace-nowrap">
                    {student.phone}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        student.status === "Active"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
                          : "border-muted-foreground/30 text-muted-foreground"
                      }
                    >
                      {student.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`View ${student.name}`}
                        onClick={() => setViewingStudent(student)}
                      >
                        <Eye className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Edit ${student.name}`}
                        onClick={() => openEditDialog(student)}
                      >
                        <Pencil className="size-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Delete ${student.name}`}
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeleteStudent(student)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No students found. Try changing your search or filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex flex-col gap-4 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {totalStudents === 0 ? 0 : startIndex + 1}–{endIndex}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {totalStudents}
                </span>{" "}
                students
              </p>

              <select
                className="h-8 rounded-md border border-input bg-background px-2 text-sm"
                value={pageSize}
                onChange={(event) => setPageSize(Number(event.target.value))}
                aria-label="Students per page"
              >
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                disabled={safeCurrentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                aria-label="Previous page"
              >
                <ChevronLeft className="size-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - safeCurrentPage) <= 1
                )
                .reduce<(number | "...")[]>(
                  (pages, page, index, visiblePages) => {
                    if (index > 0 && page - visiblePages[index - 1] > 1) {
                      pages.push("...")
                    }

                    pages.push(page)
                    return pages
                  },
                  []
                )
                .map((page, index) =>
                  page === "..." ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-1 text-sm text-muted-foreground"
                    >
                      …
                    </span>
                  ) : (
                    <Button
                      key={page}
                      variant={safeCurrentPage === page ? "default" : "outline"}
                      size="icon"
                      className="size-8"
                      onClick={() => setCurrentPage(page)}
                      aria-label={`Page ${page}`}
                      aria-current={
                        safeCurrentPage === page ? "page" : undefined
                      }
                    >
                      {page}
                    </Button>
                  )
                )}

              <Button
                variant="outline"
                size="icon"
                className="size-8"
                disabled={safeCurrentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                aria-label="Next page"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Create / Edit dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingStudent ? "Edit Student" : "Add New Student"}
            </DialogTitle>
            <DialogDescription>
              Enter the student's details and class placement.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveStudent} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Admission Number *">
                <Input
                  required
                  value={formData.admissionNo}
                  onChange={(event) =>
                    updateField("admissionNo", event.target.value)
                  }
                  placeholder="ADM2026007"
                />
              </FormField>

              <FormField label="Student Name *">
                <Input
                  required
                  value={formData.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Full name"
                />
              </FormField>

              <FormField label="Email">
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="student@example.com"
                />
              </FormField>

              <FormField label="Guardian Name *">
                <Input
                  required
                  value={formData.guardian}
                  onChange={(event) =>
                    updateField("guardian", event.target.value)
                  }
                  placeholder="Parent or guardian"
                />
              </FormField>

              <FormField label="Phone Number *">
                <Input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="Phone number"
                />
              </FormField>

              <FormField label="Gender">
                <select
                  className={selectClass}
                  value={formData.gender}
                  onChange={(event) =>
                    updateField(
                      "gender",
                      event.target.value as Student["gender"]
                    )
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </FormField>

              <FormField label="Class">
                <select
                  className={selectClass}
                  value={formData.className}
                  onChange={(event) =>
                    updateField("className", event.target.value)
                  }
                >
                  {classes.map((className) => (
                    <option key={className} value={className}>
                      Class {className}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Section">
                <select
                  className={selectClass}
                  value={formData.section}
                  onChange={(event) =>
                    updateField("section", event.target.value)
                  }
                >
                  {sections.map((section) => (
                    <option key={section} value={section}>
                      Section {section}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Status">
                <select
                  className={selectClass}
                  value={formData.status}
                  onChange={(event) =>
                    updateField(
                      "status",
                      event.target.value as Student["status"]
                    )
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </FormField>
            </div>

            {formError && (
              <p role="alert" className="text-sm text-destructive">
                {formError}
              </p>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingStudent ? "Save Changes" : "Create Student"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={Boolean(deleteStudent)}
        onOpenChange={(open) => {
          if (!open) setDeleteStudent(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete student?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove {deleteStudent?.name} from this displayed student
              list. This demo does not delete a database record.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
              onClick={handleDeleteStudent}
            >
              Delete Student
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={Boolean(viewingStudent)}
        onOpenChange={(open) => {
          if (!open) setViewingStudent(null)
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
            <DialogDescription>
              Complete student and guardian information.
            </DialogDescription>
          </DialogHeader>

          {viewingStudent && (
            <div className="space-y-5">
              {/* Student profile */}
              <div className="flex items-center gap-4 rounded-xl border p-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                  {viewingStudent.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{viewingStudent.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {viewingStudent.admissionNo}
                  </p>
                  <Badge
                    variant={
                      viewingStudent.status === "Active"
                        ? "default"
                        : "secondary"
                    }
                    className="mt-2"
                  >
                    {viewingStudent.status}
                  </Badge>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <DetailItem
                  label="Class"
                  value={`Class ${viewingStudent.className} – ${viewingStudent.section}`}
                />

                <DetailItem label="Gender" value={viewingStudent.gender} />

                <DetailItem
                  label="Email Address"
                  value={viewingStudent.email || "Not provided"}
                />

                <DetailItem label="Phone Number" value={viewingStudent.phone} />

                <DetailItem
                  label="Guardian Name"
                  value={viewingStudent.guardian}
                />

                <DetailItem
                  label="Admission Number"
                  value={viewingStudent.admissionNo}
                />
              </div>

              <div className="flex flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
                <Button
                  variant="outline"
                  onClick={() => setViewingStudent(null)}
                >
                  Close
                </Button>

                <Button
                  onClick={() => {
                    const student = viewingStudent
                    setViewingStudent(null)
                    openEditDialog(student)
                  }}
                >
                  <Pencil className="mr-2 size-4" />
                  Edit Student
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

function SummaryCard({
  title,
  value,
  description,
  icon,
}: {
  title: string
  value: number
  description: string
  icon: React.ReactNode
}) {
  return (
    <Card className="gap-0 py-4">
      <CardContent className="flex items-start justify-between gap-3 px-4">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>

        <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-medium break-words">{value}</p>
    </div>
  )
}

function FormField({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="min-w-0 space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  )
}
