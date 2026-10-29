import { useMemo, useState, type FormEvent, type ReactNode } from "react"
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Users,
  GraduationCap,
  UserRoundCheck,
  Eye,
  ChevronLeft,
  ChevronRight,
  Layers3,
  School,
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

interface ClassSection {
  id: string
  grade: number
  section: string
  teacher: string
  capacity: number
  enrolled: number
  room: string
  academicYear: string
  status: "Active" | "Inactive"
}

const initialSections: ClassSection[] = [
  {
    id: "1",
    grade: 6,
    section: "A",
    teacher: "Mr. Kumar",
    capacity: 40,
    enrolled: 40,
    room: "Room 101",
    academicYear: "2026-2027",
    status: "Active",
  },
  {
    id: "2",
    grade: 6,
    section: "B",
    teacher: "Mrs. Priya",
    capacity: 40,
    enrolled: 18,
    room: "Room 102",
    academicYear: "2026-2027",
    status: "Active",
  },
  {
    id: "3",
    grade: 7,
    section: "A",
    teacher: "Mr. Rajesh",
    capacity: 40,
    enrolled: 35,
    room: "Room 201",
    academicYear: "2026-2027",
    status: "Active",
  },
  {
    id: "4",
    grade: 7,
    section: "B",
    teacher: "Mrs. Anitha",
    capacity: 40,
    enrolled: 28,
    room: "Room 202",
    academicYear: "2026-2027",
    status: "Active",
  },
  {
    id: "5",
    grade: 8,
    section: "A",
    teacher: "Mr. Arjun",
    capacity: 40,
    enrolled: 38,
    room: "Room 301",
    academicYear: "2026-2027",
    status: "Active",
  },
  {
    id: "6",
    grade: 8,
    section: "B",
    teacher: "Mrs. Meena",
    capacity: 40,
    enrolled: 24,
    room: "Room 302",
    academicYear: "2026-2027",
    status: "Active",
  },
]

const teacherOptions = [
  "Mr. Kumar",
  "Mrs. Priya",
  "Mr. Rajesh",
  "Mrs. Anitha",
  "Mr. Arjun",
  "Mrs. Meena",
  "Unassigned",
]

const sectionOptions = ["A", "B", "C", "D", "E", "F"]

const selectClass =
  "h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"

const emptySection: Omit<ClassSection, "id"> = {
  grade: 6,
  section: "A",
  teacher: "Unassigned",
  capacity: 40,
  enrolled: 0,
  room: "",
  academicYear: "2026-2027",
  status: "Active",
}

export default function ClassesManagement() {
  const [sections, setSections] = useState<ClassSection[]>(initialSections)

  const [search, setSearch] = useState("")
  const [selectedGrade, setSelectedGrade] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const [formOpen, setFormOpen] = useState(false)
  const [editingSection, setEditingSection] = useState<ClassSection | null>(
    null
  )

  const [viewingSection, setViewingSection] = useState<ClassSection | null>(
    null
  )

  const [deleteSection, setDeleteSection] = useState<ClassSection | null>(null)

  const [formData, setFormData] =
    useState<Omit<ClassSection, "id">>(emptySection)

  const [formError, setFormError] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Grades are derived from the available sections.
  // A grade is retained while at least one section exists.
  const grades = useMemo(
    () =>
      [...new Set(sections.map((item) => item.grade))].sort((a, b) => a - b),
    [sections]
  )

  const filteredSections = useMemo(() => {
    const query = search.trim().toLowerCase()

    return sections.filter((item) => {
      const matchesSearch =
        !query ||
        [
          `Grade ${item.grade}`,
          `Class ${item.grade}`,
          item.section,
          item.teacher,
          item.room,
          item.academicYear,
        ].some((value) => value.toLowerCase().includes(query))

      const matchesGrade =
        selectedGrade === "all" || item.grade === Number(selectedGrade)

      const matchesStatus =
        selectedStatus === "all" || item.status === selectedStatus

      return matchesSearch && matchesGrade && matchesStatus
    })
  }, [sections, search, selectedGrade, selectedStatus])

  const totalStudents = sections.reduce(
    (total, item) => total + item.enrolled,
    0
  )

  const totalCapacity = sections.reduce(
    (total, item) => total + item.capacity,
    0
  )

  const activeSections = sections.filter(
    (item) => item.status === "Active"
  ).length

  const assignedTeachers = new Set(
    sections
      .filter((item) => item.teacher !== "Unassigned")
      .map((item) => item.teacher)
  ).size

  const totalPages = Math.max(1, Math.ceil(filteredSections.length / pageSize))

  const safeCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (safeCurrentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, filteredSections.length)

  const paginatedSections = filteredSections.slice(startIndex, endIndex)

  function updateField<K extends keyof Omit<ClassSection, "id">>(
    field: K,
    value: Omit<ClassSection, "id">[K]
  ) {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  function openCreateDialog(defaultGrade?: number) {
    setEditingSection(null)
    setFormError("")

    setFormData({
      ...emptySection,
      grade: defaultGrade ?? (grades.length ? grades[grades.length - 1] : 6),
      section: "A",
    })

    setFormOpen(true)
  }

  function openEditDialog(item: ClassSection) {
    setEditingSection(item)

    const { id: _id, ...rest } = item
    setFormData(rest)
    setFormError("")
    setFormOpen(true)
  }

  function handleSaveSection(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError("")

    if (
      !Number.isInteger(formData.grade) ||
      formData.grade < 1 ||
      formData.grade > 12
    ) {
      setFormError("Enter a grade between 1 and 12.")
      return
    }

    if (!Number.isInteger(formData.capacity) || formData.capacity < 1) {
      setFormError("Student capacity must be at least 1.")
      return
    }

    if (!Number.isInteger(formData.enrolled) || formData.enrolled < 0) {
      setFormError("Enrolled students cannot be negative.")
      return
    }

    if (formData.enrolled > formData.capacity) {
      setFormError("Enrolled students cannot exceed the section capacity.")
      return
    }

    const duplicate = sections.some(
      (item) =>
        item.grade === formData.grade &&
        item.section === formData.section &&
        item.id !== editingSection?.id &&
        item.academicYear === formData.academicYear
    )

    if (duplicate) {
      setFormError(
        `Grade ${formData.grade} - Section ${formData.section} already exists for this academic year.`
      )
      return
    }

    if (editingSection) {
      setSections((current) =>
        current.map((item) =>
          item.id === editingSection.id
            ? { ...formData, id: editingSection.id }
            : item
        )
      )
    } else {
      setSections((current) => [
        ...current,
        { ...formData, id: crypto.randomUUID() },
      ])
    }

    setCurrentPage(1)
    setFormOpen(false)
    setEditingSection(null)
  }

  function handleDeleteSection() {
    if (!deleteSection) return

    setSections((current) =>
      current.filter((item) => item.id !== deleteSection.id)
    )

    setDeleteSection(null)
    setCurrentPage(1)
  }

  function resetFilters() {
    setSearch("")
    setSelectedGrade("all")
    setSelectedStatus("all")
    setCurrentPage(1)
  }

  return (
    <section className="w-full min-w-0 space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">
            AY 2026–2027 <span className="mx-1">•</span> School Administration
          </p>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Grade & Section Management
          </h1>

          <p className="max-w-2xl text-sm text-muted-foreground">
            Extend school grades, create sections, manage student capacity, and
            assign class teachers.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => openCreateDialog()}
          >
            <Layers3 className="size-4" />
            Add Section
          </Button>

          <Button
            className="gap-2"
            onClick={() =>
              openCreateDialog(
                grades.length ? grades[grades.length - 1] + 1 : 1
              )
            }
          >
            <Plus className="size-4" />
            Add Grade
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Grades Offered"
          value={grades.length}
          description={
            grades.length
              ? `Grade ${grades[0]} to Grade ${grades[grades.length - 1]}`
              : "No grades created"
          }
          icon={<GraduationCap className="size-5" />}
        />

        <SummaryCard
          title="Total Sections"
          value={sections.length}
          description="Across all grades"
          icon={<School className="size-5" />}
        />

        <SummaryCard
          title="Enrolled Students"
          value={totalStudents}
          description={`${Math.max(totalCapacity - totalStudents, 0)} seats available`}
          icon={<Users className="size-5" />}
        />

        <SummaryCard
          title="Assigned Teachers"
          value={assignedTeachers}
          description={`${activeSections} active sections`}
          icon={<UserRoundCheck className="size-5" />}
        />
      </div>

      {/* Grade overview */}
      <Card className="gap-0 py-0">
        <div className="border-b p-4 sm:p-5">
          <h2 className="text-base font-semibold">Grade Overview</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            See how many sections and student seats are available in each grade.
          </p>
        </div>

        <CardContent className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {grades.map((grade) => {
            const gradeSections = sections.filter(
              (item) => item.grade === grade
            )

            const enrolled = gradeSections.reduce(
              (total, item) => total + item.enrolled,
              0
            )

            const capacity = gradeSections.reduce(
              (total, item) => total + item.capacity,
              0
            )

            const isFull = capacity > 0 && enrolled >= capacity

            return (
              <div
                key={grade}
                className="rounded-xl border p-4 transition-colors hover:bg-muted/30"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <GraduationCap className="size-5" />
                  </div>

                  <Badge variant={isFull ? "destructive" : "secondary"}>
                    {isFull ? "Full" : "Available"}
                  </Badge>
                </div>

                <h3 className="mt-4 font-semibold">Grade {grade}</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {gradeSections.length}{" "}
                  {gradeSections.length === 1 ? "section" : "sections"}
                  {" · "}
                  {enrolled}/{capacity} students
                </p>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{
                      width: `${capacity ? Math.min((enrolled / capacity) * 100, 100) : 0}%`,
                    }}
                  />
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full gap-2"
                  onClick={() => openCreateDialog(grade)}
                >
                  <Plus className="size-4" />
                  Add Section
                </Button>
              </div>
            )
          })}

          <button
            type="button"
            onClick={() =>
              openCreateDialog(
                grades.length ? grades[grades.length - 1] + 1 : 1
              )
            }
            className="flex min-h-44 flex-col items-center justify-center rounded-xl border border-dashed p-4 text-center transition-colors hover:bg-muted/30"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-muted">
              <Plus className="size-5" />
            </div>
            <p className="mt-3 text-sm font-semibold">Extend School Grades</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Add the next grade and create its first section.
            </p>
          </button>
        </CardContent>
      </Card>

      {/* Sections directory */}
      <Card className="min-w-0 gap-0 py-0">
        <div className="flex flex-col gap-4 border-b p-4 sm:p-5">
          <div>
            <h2 className="text-base font-semibold">All Sections</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Search, view, edit, and manage your school's sections.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_160px_160px_auto]">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Search grade, section, teacher..."
                className="pl-9"
                aria-label="Search sections"
              />
            </div>

            <select
              className={selectClass}
              value={selectedGrade}
              onChange={(event) => {
                setSelectedGrade(event.target.value)
                setCurrentPage(1)
              }}
              aria-label="Filter by grade"
            >
              <option value="all">All Grades</option>
              {grades.map((grade) => (
                <option key={grade} value={String(grade)}>
                  Grade {grade}
                </option>
              ))}
            </select>

            <select
              className={selectClass}
              value={selectedStatus}
              onChange={(event) => {
                setSelectedStatus(event.target.value)
                setCurrentPage(1)
              }}
              aria-label="Filter by status"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Showing {filteredSections.length} of {sections.length} sections
          </p>
        </div>

        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Grade & Section</TableHead>
                <TableHead>Class Teacher</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Academic Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedSections.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No sections found. Try changing your search or filters.
                  </TableCell>
                </TableRow>
              )}

              {paginatedSections.map((item) => {
                const full = item.enrolled >= item.capacity

                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex min-w-36 items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                          {item.grade}
                          {item.section}
                        </div>
                        <div>
                          <p className="font-medium">
                            Grade {item.grade} – {item.section}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {full ? "Capacity reached" : "Class section"}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-sm whitespace-nowrap">
                      {item.teacher}
                    </TableCell>

                    <TableCell className="min-w-36">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full ${full ? "bg-destructive" : "bg-primary"}`}
                            style={{
                              width: `${Math.min((item.enrolled / item.capacity) * 100, 100)}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm whitespace-nowrap">
                          {item.enrolled}/{item.capacity}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-sm whitespace-nowrap">
                      {item.room || "Not assigned"}
                    </TableCell>

                    <TableCell className="text-sm whitespace-nowrap">
                      {item.academicYear}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          item.status === "Active"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
                            : "border-muted-foreground/30 text-muted-foreground"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`View Grade ${item.grade} Section ${item.section}`}
                          onClick={() => setViewingSection(item)}
                        >
                          <Eye className="size-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Edit Grade ${item.grade} Section ${item.section}`}
                          onClick={() => openEditDialog(item)}
                        >
                          <Pencil className="size-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Delete Grade ${item.grade} Section ${item.section}`}
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteSection(item)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex flex-col gap-4 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {filteredSections.length === 0 ? 0 : startIndex + 1}–
                  {endIndex}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {filteredSections.length}
                </span>{" "}
                sections
              </p>

              <select
                className="h-8 rounded-md border border-input bg-background px-2 text-sm"
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value))
                  setCurrentPage(1)
                }}
                aria-label="Sections per page"
              >
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>

            <div className="flex items-center gap-1">
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

              <span className="px-3 text-sm text-muted-foreground">
                Page {safeCurrentPage} of {totalPages}
              </span>

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

      {/* Add / Edit section dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingSection ? "Edit Section" : "Create Grade or Section"}
            </DialogTitle>
            <DialogDescription>
              Add a new grade, create another section, or update its details.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveSection} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Grade *">
                <select
                  className={selectClass}
                  value={formData.grade}
                  onChange={(event) =>
                    updateField("grade", Number(event.target.value))
                  }
                  required
                >
                  {Array.from({ length: 12 }, (_, index) => index + 1).map(
                    (grade) => (
                      <option key={grade} value={grade}>
                        Grade {grade}
                      </option>
                    )
                  )}
                </select>
              </FormField>

              <FormField label="Section *">
                <select
                  className={selectClass}
                  value={formData.section}
                  onChange={(event) =>
                    updateField("section", event.target.value)
                  }
                  required
                >
                  {sectionOptions.map((section) => (
                    <option key={section} value={section}>
                      Section {section}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Class Teacher">
                <select
                  className={selectClass}
                  value={formData.teacher}
                  onChange={(event) =>
                    updateField("teacher", event.target.value)
                  }
                >
                  {teacherOptions.map((teacher) => (
                    <option key={teacher} value={teacher}>
                      {teacher}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Room Number">
                <Input
                  value={formData.room}
                  onChange={(event) => updateField("room", event.target.value)}
                  placeholder="e.g. Room 105"
                />
              </FormField>

              <FormField label="Student Capacity *">
                <Input
                  type="number"
                  min={1}
                  value={formData.capacity}
                  onChange={(event) =>
                    updateField("capacity", Number(event.target.value))
                  }
                  required
                />
              </FormField>

              <FormField label="Currently Enrolled">
                <Input
                  type="number"
                  min={0}
                  max={formData.capacity}
                  value={formData.enrolled}
                  onChange={(event) =>
                    updateField("enrolled", Number(event.target.value))
                  }
                  required
                />
              </FormField>

              <FormField label="Academic Year">
                <Input
                  value={formData.academicYear}
                  onChange={(event) =>
                    updateField("academicYear", event.target.value)
                  }
                  placeholder="2026-2027"
                  required
                />
              </FormField>

              <FormField label="Status">
                <select
                  className={selectClass}
                  value={formData.status}
                  onChange={(event) =>
                    updateField(
                      "status",
                      event.target.value as ClassSection["status"]
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
                {editingSection ? "Save Changes" : "Create Section"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View section details dialog */}
      <Dialog
        open={Boolean(viewingSection)}
        onOpenChange={(open) => {
          if (!open) setViewingSection(null)
        }}
      >
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Section Details</DialogTitle>
            <DialogDescription>
              Grade, capacity, teacher, and academic year information.
            </DialogDescription>
          </DialogHeader>

          {viewingSection && (
            <div className="space-y-5">
              <div className="flex items-center gap-4 rounded-xl border p-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <School className="size-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">
                    Grade {viewingSection.grade} – Section{" "}
                    {viewingSection.section}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {viewingSection.academicYear}
                  </p>
                  <Badge
                    variant={
                      viewingSection.status === "Active"
                        ? "default"
                        : "secondary"
                    }
                    className="mt-2"
                  >
                    {viewingSection.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <DetailItem
                  label="Class Teacher"
                  value={viewingSection.teacher}
                />
                <DetailItem
                  label="Room Number"
                  value={viewingSection.room || "Not assigned"}
                />
                <DetailItem
                  label="Enrolled Students"
                  value={String(viewingSection.enrolled)}
                />
                <DetailItem
                  label="Maximum Capacity"
                  value={String(viewingSection.capacity)}
                />
                <DetailItem
                  label="Available Seats"
                  value={String(
                    Math.max(
                      viewingSection.capacity - viewingSection.enrolled,
                      0
                    )
                  )}
                />
                <DetailItem
                  label="Academic Year"
                  value={viewingSection.academicYear}
                />
              </div>

              <div className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-sm font-medium">Section Capacity</p>
                  <p className="text-sm text-muted-foreground">
                    {Math.round(
                      (viewingSection.enrolled / viewingSection.capacity) * 100
                    )}
                    % filled
                  </p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${Math.min(
                        (viewingSection.enrolled / viewingSection.capacity) *
                          100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setViewingSection(null)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    const item = viewingSection
                    setViewingSection(null)
                    openEditDialog(item)
                  }}
                >
                  <Pencil className="mr-2 size-4" />
                  Edit Section
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={Boolean(deleteSection)}
        onOpenChange={(open) => {
          if (!open) setDeleteSection(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this section?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove Grade {deleteSection?.grade} – Section{" "}
              {deleteSection?.section} from the current demo list. It does not
              delete a database record. In a real school system, check student
              enrollments before deleting a section.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
              onClick={handleDeleteSection}
            >
              Delete Section
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
  icon: ReactNode
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
  children: ReactNode
}) {
  return (
    <div className="min-w-0 space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  )
}
