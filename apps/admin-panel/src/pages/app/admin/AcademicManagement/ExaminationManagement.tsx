import { useMemo, useState, type FormEvent, type ReactNode } from "react"
import {
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  FileText,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react"

type ExamStatus = "Upcoming" | "Ongoing" | "Completed"

type ExamScope =
  "school" | "class_range" | "selected_classes" | "selected_sections"

type ClassInfo = {
  name: string
  grade: number
  sections: string[]
}

type Exam = {
  id: number
  name: string
  academicYear: string
  scope: ExamScope
  classNames: string[]
  sectionsByClass: Record<string, string[]>
  startDate: string
  endDate: string
}

type ExamFormData = {
  name: string
  academicYear: string
  scope: ExamScope
  fromClass: string
  toClass: string
  selectedClasses: string[]
  selectedClassForSections: string
  sections: string[]
  startDate: string
  endDate: string
}

const CLASSES: ClassInfo[] = [
  { name: "Class 6", grade: 6, sections: ["A", "B", "C"] },
  { name: "Class 7", grade: 7, sections: ["A", "B", "C"] },
  { name: "Class 8", grade: 8, sections: ["A", "B", "C"] },
  { name: "Class 9", grade: 9, sections: ["A", "B", "C"] },
  { name: "Class 10", grade: 10, sections: ["A", "B", "C"] },
  { name: "Class 11", grade: 11, sections: ["A", "B"] },
  { name: "Class 12", grade: 12, sections: ["A", "B"] },
]

const CLASS_NAMES = CLASSES.map((item) => item.name)
const ACADEMIC_YEARS = ["2026-2027", "2027-2028", "2025-2026"]

const EMPTY_FORM: ExamFormData = {
  name: "",
  academicYear: "2026-2027",
  scope: "school",
  fromClass: "6",
  toClass: "10",
  selectedClasses: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
  selectedClassForSections: "Class 6",
  sections: ["A"],
  startDate: "",
  endDate: "",
}

const INITIAL_EXAMS: Exam[] = [
  {
    id: 1,
    name: "First Unit Test",
    academicYear: "2026-2027",
    scope: "selected_sections",
    classNames: ["Class 6"],
    sectionsByClass: { "Class 6": ["A"] },
    startDate: "2026-11-05",
    endDate: "2026-11-08",
  },
  {
    id: 2,
    name: "Mid-Term Examination",
    academicYear: "2026-2027",
    scope: "school",
    classNames: [...CLASS_NAMES],
    sectionsByClass: Object.fromEntries(
      CLASSES.map((item) => [item.name, [...item.sections]])
    ),
    startDate: "2026-09-10",
    endDate: "2026-09-18",
  },
  {
    id: 3,
    name: "Quarterly Examination",
    academicYear: "2026-2027",
    scope: "selected_sections",
    classNames: ["Class 8"],
    sectionsByClass: { "Class 8": ["A", "B"] },
    startDate: "2026-11-15",
    endDate: "2026-11-22",
  },
  {
    id: 4,
    name: "First Unit Test",
    academicYear: "2026-2027",
    scope: "class_range",
    classNames: ["Class 10"],
    sectionsByClass: { "Class 10": ["A", "B", "C"] },
    startDate: "2026-10-28",
    endDate: "2026-11-02",
  },
]

function getClassInfo(className: string) {
  return CLASSES.find((item) => item.name === className)
}

function getClassRange(fromClass: string, toClass: string) {
  const from = Number(fromClass)
  const to = Number(toClass)

  if (!Number.isFinite(from) || !Number.isFinite(to) || from > to) {
    return []
  }

  return CLASSES.filter((item) => item.grade >= from && item.grade <= to).map(
    (item) => item.name
  )
}

function getExamStatus(startDate: string, endDate: string): ExamStatus {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const start = new Date(`${startDate}T00:00:00`)
  const end = new Date(`${endDate}T00:00:00`)

  if (today < start) return "Upcoming"
  if (today > end) return "Completed"
  return "Ongoing"
}

function formatDate(date: string) {
  if (!date) return "—"

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function getScopeLabel(scope: ExamScope) {
  const labels: Record<ExamScope, string> = {
    school: "Entire School / College",
    class_range: "Class Range",
    selected_classes: "Selected Classes",
    selected_sections: "Selected Sections",
  }

  return labels[scope]
}

function getAssignmentLabel(exam: Exam) {
  if (exam.scope === "school") {
    return "Entire School / College"
  }

  if (exam.scope === "class_range") {
    const grades = exam.classNames
      .map((name) => getClassInfo(name)?.grade)
      .filter((grade): grade is number => grade !== undefined)
      .sort((a, b) => a - b)

    if (!grades.length) return "No classes assigned"

    return grades.length === 1
      ? `Class ${grades[0]}`
      : `Classes ${grades[0]}–${grades[grades.length - 1]}`
  }

  if (exam.scope === "selected_classes") {
    return `${exam.classNames.length} selected ${
      exam.classNames.length === 1 ? "class" : "classes"
    }`
  }

  return exam.classNames
    .map(
      (className) =>
        `${className} (${(exam.sectionsByClass[className] ?? []).join(", ")})`
    )
    .join(", ")
}

function getInitialForm(exam?: Exam): ExamFormData {
  if (!exam) {
    return {
      ...EMPTY_FORM,
      selectedClasses: [...EMPTY_FORM.selectedClasses],
      sections: [...EMPTY_FORM.sections],
    }
  }

  const grades = exam.classNames
    .map((name) => getClassInfo(name)?.grade)
    .filter((grade): grade is number => grade !== undefined)
    .sort((a, b) => a - b)

  const sectionClass =
    exam.classNames.find(
      (name) => (exam.sectionsByClass[name] ?? []).length > 0
    ) ?? "Class 6"

  return {
    name: exam.name,
    academicYear: exam.academicYear,
    scope: exam.scope,
    fromClass: String(grades[0] ?? 6),
    toClass: String(grades[grades.length - 1] ?? 10),
    selectedClasses: [...exam.classNames],
    selectedClassForSections: sectionClass,
    sections: [...(exam.sectionsByClass[sectionClass] ?? ["A"])],
    startDate: exam.startDate,
    endDate: exam.endDate,
  }
}

function getAssignedClassNames(form: ExamFormData) {
  switch (form.scope) {
    case "school":
      return [...CLASS_NAMES]

    case "class_range":
      return getClassRange(form.fromClass, form.toClass)

    case "selected_classes":
      return CLASSES.filter((item) =>
        form.selectedClasses.includes(item.name)
      ).map((item) => item.name)

    case "selected_sections":
      return form.sections.length ? [form.selectedClassForSections] : []
  }
}

function getAssignedSections(
  form: ExamFormData,
  classNames: string[]
): Record<string, string[]> {
  const result: Record<string, string[]> = {}

  for (const className of classNames) {
    const classInfo = getClassInfo(className)
    if (!classInfo) continue

    result[className] =
      form.scope === "selected_sections"
        ? [...form.sections].sort()
        : [...classInfo.sections]
  }

  return result
}

function StatusBadge({ status }: { status: ExamStatus }) {
  const styles: Record<ExamStatus, string> = {
    Upcoming: "border-border bg-muted text-muted-foreground",
    Ongoing: "border-primary/50 bg-primary/10 text-foreground",
    Completed: "border-border bg-card text-muted-foreground",
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}

function Modal({
  title,
  description,
  onClose,
  children,
  size = "max-w-2xl",
}: {
  title: string
  description?: string
  onClose: () => void
  children: ReactNode
  size?: string
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`max-h-[90vh] w-full ${size} overflow-y-auto rounded-xl border border-border bg-card text-card-foreground shadow-xl`}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-border bg-card px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-md p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}

export default function ExaminationManagement() {
  const [exams, setExams] = useState<Exam[]>(INITIAL_EXAMS)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [classFilter, setClassFilter] = useState("All")
  const [showForm, setShowForm] = useState(false)
  const [editingExam, setEditingExam] = useState<Exam | null>(null)
  const [deletingExam, setDeletingExam] = useState<Exam | null>(null)
  const [form, setForm] = useState<ExamFormData>(getInitialForm())
  const [formError, setFormError] = useState("")

  const assignedClassNames = getAssignedClassNames(form)

  const currentExams = useMemo(
    () =>
      exams.map((exam) => ({
        ...exam,
        status: getExamStatus(exam.startDate, exam.endDate),
      })),
    [exams]
  )

  const filteredExams = useMemo(() => {
    const query = search.trim().toLowerCase()

    return currentExams.filter((exam) => {
      const matchesSearch =
        exam.name.toLowerCase().includes(query) ||
        exam.academicYear.toLowerCase().includes(query) ||
        getAssignmentLabel(exam).toLowerCase().includes(query) ||
        exam.classNames.some((name) => name.toLowerCase().includes(query))

      const matchesStatus =
        statusFilter === "All" || exam.status === statusFilter

      const matchesClass =
        classFilter === "All" || exam.classNames.includes(classFilter)

      return matchesSearch && matchesStatus && matchesClass
    })
  }, [currentExams, search, statusFilter, classFilter])

  const summary = useMemo(
    () => ({
      total: currentExams.length,
      upcoming: currentExams.filter((exam) => exam.status === "Upcoming")
        .length,
      ongoing: currentExams.filter((exam) => exam.status === "Ongoing").length,
      completed: currentExams.filter((exam) => exam.status === "Completed")
        .length,
    }),
    [currentExams]
  )

  function openAddDialog() {
    setEditingExam(null)
    setForm(getInitialForm())
    setFormError("")
    setShowForm(true)
  }

  function openEditDialog(exam: Exam) {
    setEditingExam(exam)
    setForm(getInitialForm(exam))
    setFormError("")
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingExam(null)
    setFormError("")
  }

  function updateForm<K extends keyof ExamFormData>(
    field: K,
    value: ExamFormData[K]
  ) {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  function changeScope(scope: ExamScope) {
    setForm((previous) => {
      const next = { ...previous, scope }

      if (scope === "school") {
        next.selectedClasses = [...CLASS_NAMES]
      }

      if (scope === "class_range") {
        next.fromClass = "6"
        next.toClass = "10"
      }

      if (
        scope === "selected_classes" &&
        previous.selectedClasses.length === 0
      ) {
        next.selectedClasses = ["Class 6"]
      }

      if (scope === "selected_sections") {
        const sections =
          getClassInfo(previous.selectedClassForSections)?.sections ?? []
        next.sections = sections.includes("A") ? ["A"] : []
      }

      return next
    })
  }

  function changeFromClass(value: string) {
    setForm((previous) => ({
      ...previous,
      fromClass: value,
      toClass:
        Number(previous.toClass) < Number(value) ? value : previous.toClass,
    }))
  }

  function changeToClass(value: string) {
    setForm((previous) => ({
      ...previous,
      toClass: value,
      fromClass:
        Number(previous.fromClass) > Number(value) ? value : previous.fromClass,
    }))
  }

  function toggleSelectedClass(className: string) {
    setForm((previous) => {
      const selected = previous.selectedClasses.includes(className)

      return {
        ...previous,
        selectedClasses: selected
          ? previous.selectedClasses.filter((name) => name !== className)
          : [...previous.selectedClasses, className].sort(
              (a, b) =>
                (getClassInfo(a)?.grade ?? 0) - (getClassInfo(b)?.grade ?? 0)
            ),
      }
    })
  }

  function changeSectionClass(className: string) {
    const sections = getClassInfo(className)?.sections ?? []

    setForm((previous) => ({
      ...previous,
      selectedClassForSections: className,
      sections: sections.includes("A") ? ["A"] : [],
    }))
  }

  function toggleSection(section: string) {
    setForm((previous) => {
      const selected = previous.sections.includes(section)

      return {
        ...previous,
        sections: selected
          ? previous.sections.filter((item) => item !== section)
          : [...previous.sections, section].sort(),
      }
    })
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError("")

    if (!form.name.trim()) {
      setFormError("Please enter an examination name.")
      return
    }

    if (!form.startDate || !form.endDate) {
      setFormError("Please select both the start and end dates.")
      return
    }

    if (form.endDate < form.startDate) {
      setFormError("End date cannot be earlier than start date.")
      return
    }

    const classNames = getAssignedClassNames(form)

    if (classNames.length === 0) {
      setFormError("Please select at least one class.")
      return
    }

    if (form.scope === "selected_sections" && form.sections.length === 0) {
      setFormError("Please select at least one section.")
      return
    }

    const examData: Omit<Exam, "id"> = {
      name: form.name.trim(),
      academicYear: form.academicYear,
      scope: form.scope,
      classNames,
      sectionsByClass: getAssignedSections(form, classNames),
      startDate: form.startDate,
      endDate: form.endDate,
    }

    if (editingExam) {
      setExams((previous) =>
        previous.map((exam) =>
          exam.id === editingExam.id ? { ...exam, ...examData } : exam
        )
      )
    } else {
      setExams((previous) => [
        ...previous,
        {
          id: Math.max(0, ...previous.map((exam) => exam.id)) + 1,
          ...examData,
        },
      ])
    }

    closeForm()
  }

  function handleDelete() {
    if (!deletingExam) return

    setExams((previous) =>
      previous.filter((exam) => exam.id !== deletingExam.id)
    )

    setDeletingExam(null)
  }

  const inputClass =
    "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"

  const labelClass = "block text-sm font-medium text-foreground"

  return (
    <div className="min-h-screen bg-background p-4 text-foreground sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <span>Academics</span>
              <span>/</span>
              <span className="text-foreground">Examination Management</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Examination Management
            </h1>

            <p className="mt-1.5 text-sm text-muted-foreground">
              Schedule examinations for your entire institution, selected
              classes, or specific sections.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddDialog}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Plus size={18} />
            Schedule Examination
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Examinations",
              value: summary.total,
              icon: FileText,
            },
            {
              label: "Upcoming",
              value: summary.upcoming,
              icon: CalendarDays,
            },
            {
              label: "Ongoing",
              value: summary.ongoing,
              icon: Clock,
            },
            {
              label: "Completed",
              value: summary.completed,
              icon: Check,
            },
          ].map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.label}
                className="rounded-xl border border-border bg-card p-5 text-card-foreground"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-2 text-3xl font-bold">{item.value}</p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-foreground">
                    <Icon size={21} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Examination table */}
        <div className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground">
          <div className="border-b border-border p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-lg font-semibold">Examination Schedule</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  View and manage examinations across classes and sections.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search exams..."
                    className="w-full rounded-md border border-input bg-background py-2.5 pr-3 pl-9 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                <div className="relative">
                  <select
                    value={classFilter}
                    onChange={(event) => setClassFilter(event.target.value)}
                    className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2.5 pr-9 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="All">All Classes</option>
                    {CLASSES.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
                  />
                </div>

                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2.5 pr-9 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-muted/50 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  <th className="px-6 py-4">Examination</th>
                  <th className="px-6 py-4">Conduct Exam For</th>
                  <th className="px-6 py-4">Assigned Classes / Sections</th>
                  <th className="px-6 py-4">Academic Year</th>
                  <th className="px-6 py-4">Exam Dates</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {filteredExams.map((exam) => (
                  <tr key={exam.id} className="transition hover:bg-muted/30">
                    <td className="px-6 py-4">
                      <div className="font-semibold">{exam.name}</div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        EXM-{String(exam.id).padStart(3, "0")}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-md border border-border bg-muted/50 px-2.5 py-1.5 text-xs font-medium">
                        {getScopeLabel(exam.scope)}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="max-w-[260px] text-sm leading-6 font-medium">
                        {getAssignmentLabel(exam)}
                      </div>
                      <div className="mt-1 text-xs leading-5 text-muted-foreground">
                        {exam.classNames
                          .map(
                            (className) =>
                              `${className}: ${(
                                exam.sectionsByClass[className] ?? []
                              )
                                .map((section) => `Section ${section}`)
                                .join(", ")}`
                          )
                          .join(" · ")}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {exam.academicYear}
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm font-medium">
                        {formatDate(exam.startDate)}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        to {formatDate(exam.endDate)}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge
                        status={getExamStatus(exam.startDate, exam.endDate)}
                      />
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditDialog(exam)}
                          title="Edit examination"
                          aria-label={`Edit ${exam.name}`}
                          className="rounded-md border border-border p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeletingExam(exam)}
                          title="Delete examination"
                          aria-label={`Delete ${exam.name}`}
                          className="rounded-md border border-border p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredExams.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <Search size={21} />
                      </div>
                      <p className="mt-3 font-medium">No examinations found</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col justify-between gap-2 border-t border-border px-6 py-4 text-sm text-muted-foreground sm:flex-row sm:items-center">
            <span>
              Showing {filteredExams.length} of {currentExams.length}{" "}
              examinations
            </span>
            <span>Academic Year: 2026–2027</span>
          </div>
        </div>
      </div>

      {/* Add / Edit examination dialog */}
      {showForm && (
        <Modal
          title={editingExam ? "Edit Examination" : "Schedule Examination"}
          description="Choose who should take the examination and set its dates."
          onClose={closeForm}
        >
          <form onSubmit={handleSave} className="space-y-5 p-6">
            <div>
              <label className={labelClass}>
                Examination Name <span className="text-destructive">*</span>
              </label>
              <input
                required
                value={form.name}
                onChange={(event) => updateForm("name", event.target.value)}
                placeholder="e.g. Annual Examination"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Academic Year</label>
              <select
                value={form.academicYear}
                onChange={(event) =>
                  updateForm("academicYear", event.target.value)
                }
                className={inputClass}
              >
                {ACADEMIC_YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Exam scope */}
            <div>
              <label className={labelClass}>
                Conduct Exam For <span className="text-destructive">*</span>
              </label>

              <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {(
                  [
                    {
                      value: "school",
                      title: "Entire School / College",
                      description: "All classes and all sections",
                    },
                    {
                      value: "class_range",
                      title: "Class Range",
                      description: "For example, Classes 6 to 10",
                    },
                    {
                      value: "selected_classes",
                      title: "Selected Classes",
                      description: "Choose any combination of classes",
                    },
                    {
                      value: "selected_sections",
                      title: "Selected Sections",
                      description: "Choose sections within a class",
                    },
                  ] as const
                ).map((option) => {
                  const selected = form.scope === option.value

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => changeScope(option.value)}
                      className={`rounded-lg border p-4 text-left transition ${
                        selected
                          ? "border-primary bg-primary/10 ring-1 ring-primary"
                          : "border-border bg-card hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold">
                          {option.title}
                        </span>
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                            selected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border"
                          }`}
                        >
                          {selected && <Check size={10} />}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Entire institution */}
            {form.scope === "school" && (
              <div className="rounded-lg border border-border bg-muted/40 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      Entire institution selected
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      The examination will be assigned to all {CLASSES.length}{" "}
                      classes and every section within them.
                    </p>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      {CLASSES.map(
                        (item) => `${item.name} (${item.sections.join(", ")})`
                      ).join(" · ")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Class range */}
            {form.scope === "class_range" && (
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm font-semibold">Select Class Range</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Every class between the selected grades will be included,
                  along with all its sections.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>From Class</label>
                    <select
                      value={form.fromClass}
                      onChange={(event) => changeFromClass(event.target.value)}
                      className={inputClass}
                    >
                      {CLASSES.map((item) => (
                        <option key={item.grade} value={item.grade}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>To Class</label>
                    <select
                      value={form.toClass}
                      onChange={(event) => changeToClass(event.target.value)}
                      className={inputClass}
                    >
                      {CLASSES.map((item) => (
                        <option key={item.grade} value={item.grade}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 rounded-md bg-muted/50 p-3">
                  <p className="text-sm font-medium">
                    {assignedClassNames.length > 0
                      ? `${assignedClassNames[0]} to ${
                          assignedClassNames[assignedClassNames.length - 1]
                        }`
                      : "No classes selected"}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {assignedClassNames
                      .map((name) => {
                        const info = getClassInfo(name)
                        return `${name}: ${info?.sections.join(", ") ?? ""}`
                      })
                      .join(" · ")}
                  </p>
                </div>
              </div>
            )}

            {/* Individual classes */}
            {form.scope === "selected_classes" && (
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">Choose Classes</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Each selected class includes all its sections.
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                    {form.selectedClasses.length} selected
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {CLASSES.map((item) => {
                    const checked = form.selectedClasses.includes(item.name)

                    return (
                      <label
                        key={item.name}
                        className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition ${
                          checked
                            ? "border-primary bg-primary/10"
                            : "border-border hover:bg-muted/50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleSelectedClass(item.name)}
                          className="mt-0.5 h-4 w-4 accent-[var(--primary)]"
                        />
                        <span>
                          <span className="block text-sm font-medium">
                            {item.name}
                          </span>
                          <span className="mt-1 block text-xs text-muted-foreground">
                            Sections {item.sections.join(", ")}
                          </span>
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Specific sections */}
            {form.scope === "selected_sections" && (
              <div className="rounded-lg border border-border p-4">
                <div>
                  <label className={labelClass}>Choose Class</label>
                  <select
                    value={form.selectedClassForSections}
                    onChange={(event) => changeSectionClass(event.target.value)}
                    className={inputClass}
                  >
                    {CLASSES.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">Choose Sections</p>
                  <span className="text-xs font-medium text-muted-foreground">
                    {form.sections.length} selected
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {(
                    getClassInfo(form.selectedClassForSections)?.sections ?? []
                  ).map((section) => {
                    const checked = form.sections.includes(section)

                    return (
                      <label
                        key={section}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${
                          checked
                            ? "border-primary bg-primary/10"
                            : "border-border hover:bg-muted/50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleSection(section)}
                          className="h-4 w-4 accent-[var(--primary)]"
                        />
                        <span className="text-sm font-medium">
                          Section {section}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Assignment summary */}
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-sm font-semibold">Assignment Summary</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {getScopeLabel(form.scope)}
              </p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {assignedClassNames.length > 0
                  ? assignedClassNames
                      .map((name) => {
                        const sections =
                          form.scope === "selected_sections"
                            ? form.sections
                            : (getClassInfo(name)?.sections ?? [])

                        return `${name}: ${
                          sections.length > 0
                            ? sections
                                .map((section) => `Section ${section}`)
                                .join(", ")
                            : "No sections selected"
                        }`
                      })
                      .join(" · ")
                  : "Select classes or sections to see the assignment."}
              </p>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>
                  Start Date <span className="text-destructive">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={form.startDate}
                  onChange={(event) =>
                    updateForm("startDate", event.target.value)
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  End Date <span className="text-destructive">*</span>
                </label>
                <input
                  type="date"
                  required
                  min={form.startDate || undefined}
                  value={form.endDate}
                  onChange={(event) =>
                    updateForm("endDate", event.target.value)
                  }
                  className={inputClass}
                />
              </div>
            </div>

            {formError && (
              <div
                role="alert"
                className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              >
                {formError}
              </div>
            )}

            <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-md border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <Check size={16} />
                {editingExam ? "Save Changes" : "Schedule Exam"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete confirmation dialog */}
      {deletingExam && (
        <Modal
          title="Delete Examination"
          description="This action cannot be undone."
          onClose={() => setDeletingExam(null)}
          size="max-w-md"
        >
          <div className="p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                <Trash2 size={19} />
              </div>
              <div>
                <p className="text-sm leading-6">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold">{deletingExam.name}</span>?
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {getScopeLabel(deletingExam.scope)} —{" "}
                  {getAssignmentLabel(deletingExam)}.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeletingExam(null)}
                className="rounded-md border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <Trash2 size={16} />
                Delete Examination
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
