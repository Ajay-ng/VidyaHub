import { useMemo, useState } from "react"
import type { FormEvent, ReactNode } from "react"
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Mail,
  Pencil,
  Phone,
  Plus,
  Search,
  Trash2,
  UserCheck,
  Users,
  UserRound,
  X,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

type StaffCategory = "Teaching" | "Non-teaching"
type StaffStatus = "Active" | "On Leave" | "Inactive"
type EmploymentType = "Full-time" | "Part-time" | "Contract"

type Staff = {
  id: number
  employeeId: string
  name: string
  email: string
  phone: string
  designation: string
  department: string
  category: StaffCategory
  employmentType: EmploymentType
  joiningDate: string
  status: StaffStatus
  subjects: string
  classes: string
}

type StaffForm = Omit<Staff, "id">

type StaffView = "home" | "list" | "details"

const INITIAL_STAFF: Staff[] = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "Ananya Sharma",
    email: "ananya.sharma@vidyahub.edu",
    phone: "+91 98765 43210",
    designation: "Senior Mathematics Teacher",
    department: "Mathematics",
    category: "Teaching",
    employmentType: "Full-time",
    joiningDate: "2022-06-15",
    status: "Active",
    subjects: "Mathematics",
    classes: "Classes 9–12",
  },
  {
    id: 2,
    employeeId: "EMP002",
    name: "Rahul Kumar",
    email: "rahul.kumar@vidyahub.edu",
    phone: "+91 98765 43211",
    designation: "Science Teacher",
    department: "Science",
    category: "Teaching",
    employmentType: "Full-time",
    joiningDate: "2023-04-10",
    status: "Active",
    subjects: "Physics, Chemistry",
    classes: "Classes 8–10",
  },
  {
    id: 3,
    employeeId: "EMP003",
    name: "Priya Reddy",
    email: "priya.reddy@vidyahub.edu",
    phone: "+91 98765 43212",
    designation: "English Teacher",
    department: "Languages",
    category: "Teaching",
    employmentType: "Full-time",
    joiningDate: "2021-06-01",
    status: "On Leave",
    subjects: "English",
    classes: "Classes 6–8",
  },
  {
    id: 4,
    employeeId: "EMP004",
    name: "Suresh Patel",
    email: "suresh.patel@vidyahub.edu",
    phone: "+91 98765 43213",
    designation: "Administrative Officer",
    department: "Administration",
    category: "Non-teaching",
    employmentType: "Full-time",
    joiningDate: "2020-01-20",
    status: "Active",
    subjects: "",
    classes: "",
  },
  {
    id: 5,
    employeeId: "EMP005",
    name: "Meera Nair",
    email: "meera.nair@vidyahub.edu",
    phone: "+91 98765 43214",
    designation: "Librarian",
    department: "Library",
    category: "Non-teaching",
    employmentType: "Full-time",
    joiningDate: "2023-07-03",
    status: "Active",
    subjects: "",
    classes: "",
  },
  {
    id: 6,
    employeeId: "EMP006",
    name: "Arjun Singh",
    email: "arjun.singh@vidyahub.edu",
    phone: "+91 98765 43215",
    designation: "Physical Education Teacher",
    department: "Sports",
    category: "Teaching",
    employmentType: "Part-time",
    joiningDate: "2024-01-08",
    status: "Inactive",
    subjects: "Physical Education",
    classes: "Classes 6–10",
  },
]

const EMPTY_FORM: StaffForm = {
  employeeId: "",
  name: "",
  email: "",
  phone: "",
  designation: "",
  department: "",
  category: "Teaching",
  employmentType: "Full-time",
  joiningDate: "",
  status: "Active",
  subjects: "",
  classes: "",
}

const CATEGORY_CARDS = [
  {
    title: "Teaching Staff",
    description: "Teachers and academic staff",
    category: "Teaching" as const,
    icon: GraduationCap,
  },
  {
    title: "Non-teaching Staff",
    description: "Administration and support staff",
    category: "Non-teaching" as const,
    icon: BriefcaseBusiness,
  },
  {
    title: "Active Staff",
    description: "Employees currently working",
    category: "Active" as const,
    icon: UserCheck,
  },
  {
    title: "Staff on Leave",
    description: "Employees currently on leave",
    category: "On Leave" as const,
    icon: CalendarDays,
  },
]

function formatDate(date: string) {
  if (!date) return "—"

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

function StaffStatusBadge({ status }: { status: StaffStatus }) {
  return (
    <Badge
      variant={
        status === "Active"
          ? "secondary"
          : status === "Inactive"
            ? "destructive"
            : "outline"
      }
    >
      {status}
    </Badge>
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
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  )
}

function StaffDetail({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex min-w-0 gap-3">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-medium break-words">{value || "—"}</p>
      </div>
    </div>
  )
}

export default function StaffManagement() {
  const [staff, setStaff] = useState<Staff[]>(INITIAL_STAFF)
  const [view, setView] = useState<StaffView>("home")
  const [activeCategory, setActiveCategory] = useState<
    "Teaching" | "Non-teaching" | "Active" | "On Leave"
  >("Teaching")

  const [search, setSearch] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("All")

  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  const [dialog, setDialog] = useState<"add" | "edit" | "delete" | null>(null)

  const [form, setForm] = useState<StaffForm>(EMPTY_FORM)
  const [formError, setFormError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const departments = useMemo(
    () => Array.from(new Set(staff.map((person) => person.department))).sort(),
    [staff]
  )

  const categoryStaff = useMemo(() => {
    return staff.filter((person) => {
      if (activeCategory === "Teaching") {
        return person.category === "Teaching"
      }

      if (activeCategory === "Non-teaching") {
        return person.category === "Non-teaching"
      }

      if (activeCategory === "Active") {
        return person.status === "Active"
      }

      return person.status === "On Leave"
    })
  }, [staff, activeCategory])

  const filteredStaff = useMemo(() => {
    const query = search.trim().toLowerCase()

    return categoryStaff
      .filter((person) => {
        const matchesSearch =
          !query ||
          [
            person.name,
            person.employeeId,
            person.email,
            person.designation,
            person.department,
          ].some((value) => value.toLowerCase().includes(query))

        const matchesDepartment =
          departmentFilter === "All" || person.department === departmentFilter

        return matchesSearch && matchesDepartment
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [categoryStaff, search, departmentFilter])

  function openCategory(
    category: "Teaching" | "Non-teaching" | "Active" | "On Leave"
  ) {
    setActiveCategory(category)
    setSearch("")
    setDepartmentFilter("All")
    setView("list")
  }

  function openAddDialog() {
    setSelectedStaff(null)

    setForm({
      ...EMPTY_FORM,
      employeeId: `EMP${String(
        Math.max(0, ...staff.map((person) => person.id)) + 1
      ).padStart(3, "0")}`,
    })

    setFormError("")
    setDialog("add")
  }

  function openEditDialog(person: Staff) {
    setSelectedStaff(person)

    const { id: _id, ...details } = person

    setForm(details)
    setFormError("")
    setDialog("edit")
  }

  function updateForm<K extends keyof StaffForm>(key: K, value: StaffForm[K]) {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }))
  }

  function saveStaff(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError("")

    const employeeIdExists = staff.some(
      (person) =>
        person.employeeId.trim().toLowerCase() ===
          form.employeeId.trim().toLowerCase() &&
        person.id !== selectedStaff?.id
    )

    if (employeeIdExists) {
      setFormError("This employee ID already exists.")
      return
    }

    if (dialog === "edit" && selectedStaff) {
      setStaff((previous) =>
        previous.map((person) =>
          person.id === selectedStaff.id
            ? { ...form, id: selectedStaff.id }
            : person
        )
      )

      setSuccessMessage("Staff details updated successfully.")
    } else {
      setStaff((previous) => [
        ...previous,
        {
          ...form,
          id: Math.max(0, ...previous.map((person) => person.id)) + 1,
        },
      ])

      setSuccessMessage("Staff member added successfully.")
    }

    setDialog(null)
    setSelectedStaff(null)
  }

  function deleteStaff() {
    if (!selectedStaff) return

    setStaff((previous) =>
      previous.filter((person) => person.id !== selectedStaff.id)
    )

    setDialog(null)
    setSelectedStaff(null)
    setSuccessMessage("Staff member deleted successfully.")
  }

  function openStaffDetails(person: Staff) {
    setSelectedStaff(person)
    setView("details")
  }

  function returnToList() {
    setSelectedStaff(null)
    setView("list")
  }

  function returnHome() {
    setSelectedStaff(null)
    setView("home")
    setSearch("")
    setDepartmentFilter("All")
  }

  const teachingCount = staff.filter(
    (person) => person.category === "Teaching"
  ).length

  const nonTeachingCount = staff.filter(
    (person) => person.category === "Non-teaching"
  ).length

  const activeCount = staff.filter(
    (person) => person.status === "Active"
  ).length

  const onLeaveCount = staff.filter(
    (person) => person.status === "On Leave"
  ).length

  const categoryTitle =
    CATEGORY_CARDS.find((item) => item.category === activeCategory)?.title ??
    "Staff"

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Staff Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage school employees and staff profiles.
          </p>
        </div>

        <Button onClick={openAddDialog}>
          <Plus className="mr-2 size-4" />
          Add Staff Member
        </Button>
      </div>

      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <button
          type="button"
          onClick={returnHome}
          className={view === "home" ? "font-medium text-foreground" : ""}
        >
          Administration
        </button>

        <ChevronRight className="size-4" />

        {view !== "home" && (
          <>
            <button
              type="button"
              onClick={returnHome}
              className="hover:text-foreground"
            >
              Staff Categories
            </button>
            <ChevronRight className="size-4" />
          </>
        )}

        <span className="font-medium text-foreground">
          {view === "home"
            ? "Staff Categories"
            : view === "list"
              ? categoryTitle
              : selectedStaff?.name}
        </span>
      </div>

      {/* Success message */}
      {successMessage && (
        <div
          role="status"
          className="flex items-center justify-between gap-3 rounded-lg border p-3 text-sm"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-primary" />
            {successMessage}
          </span>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label="Dismiss message"
            onClick={() => setSuccessMessage("")}
          >
            <X className="size-4" />
          </Button>
        </div>
      )}

      {/* HOME: Show only staff category cards */}
      {view === "home" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {CATEGORY_CARDS.map((item) => {
              const Icon = item.icon

              const count =
                item.category === "Teaching"
                  ? teachingCount
                  : item.category === "Non-teaching"
                    ? nonTeachingCount
                    : item.category === "Active"
                      ? activeCount
                      : onLeaveCount

              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => openCategory(item.category)}
                  className="text-left"
                >
                  <Card className="h-full transition-colors hover:border-primary hover:bg-accent/40">
                    <CardContent className="flex items-start justify-between gap-3 p-5">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {item.title}
                        </p>

                        <p className="mt-2 text-2xl font-bold">{count}</p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {item.description}
                        </p>

                        <p className="mt-4 flex items-center text-sm font-medium">
                          View staff
                          <ChevronRight className="ml-1 size-4" />
                        </p>
                      </div>

                      <div className="rounded-lg bg-primary/20 p-3">
                        <Icon className="size-5" />
                      </div>
                    </CardContent>
                  </Card>
                </button>
              )
            })}
          </div>
        </>
      )}

      {/* STAFF LIST: Only show after a category is selected */}
      {view === "list" && (
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={returnHome}
                  aria-label="Back to staff categories"
                >
                  <ArrowLeft className="size-4" />
                </Button>

                <div>
                  <CardTitle>{categoryTitle}</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {activeCategory === "Active"
                      ? "Employees who are currently working."
                      : activeCategory === "On Leave"
                        ? "Employees currently on leave."
                        : `Browse ${categoryTitle.toLowerCase()}.`}
                  </p>
                </div>
              </div>

              <Badge variant="secondary">
                {filteredStaff.length} staff members
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Search staff..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Select
                  value={departmentFilter}
                  onValueChange={(value) => setDepartmentFilter(value ?? "All")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="All">All departments</SelectItem>
                    {departments.map((department) => (
                      <SelectItem key={department} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setSearch("")
                    setDepartmentFilter("All")
                  }}
                  aria-label="Clear filters"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>

            {filteredStaff.length === 0 ? (
              <div className="rounded-lg border py-12 text-center">
                <Users className="mx-auto size-8 text-muted-foreground" />
                <p className="mt-3 font-medium">No staff found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  No employees match this category and your filters.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredStaff.map((person) => (
                  <Card
                    key={person.id}
                    className="cursor-pointer transition-colors hover:border-primary hover:bg-accent/30"
                    role="button"
                    tabIndex={0}
                    onClick={() => openStaffDetails(person)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        openStaffDetails(person)
                      }
                    }}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold">
                          {getInitials(person.name)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="truncate font-semibold">
                                {person.name}
                              </h3>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {person.employeeId}
                              </p>
                            </div>

                            <StaffStatusBadge status={person.status} />
                          </div>

                          <p className="mt-3 text-sm text-muted-foreground">
                            {person.designation}
                          </p>

                          <Badge variant="outline" className="mt-3">
                            {person.department}
                          </Badge>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t pt-3">
                        <span className="text-xs text-muted-foreground">
                          Joined {formatDate(person.joiningDate)}
                        </span>
                        <span className="flex items-center text-sm font-medium">
                          View details
                          <ChevronRight className="ml-1 size-4" />
                        </span>
                      </div>

                      <div
                        className="mt-3 flex justify-end gap-2"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openStaffDetails(person)}
                        >
                          <UserRound className="mr-1 size-4" />
                          View
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(person)}
                        >
                          <Pencil className="mr-1 size-4" />
                          Edit
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          aria-label={`Delete ${person.name}`}
                          onClick={() => {
                            setSelectedStaff(person)
                            setDialog("delete")
                          }}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* INDIVIDUAL STAFF DETAILS */}
      {view === "details" && selectedStaff && (
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={returnToList}
                  aria-label="Back to staff list"
                >
                  <ArrowLeft className="size-4" />
                </Button>

                <div>
                  <CardTitle>Staff Details</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Complete employee profile.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => openEditDialog(selectedStaff)}
                >
                  <Pencil className="mr-2 size-4" />
                  Edit
                </Button>

                <Button variant="outline" onClick={() => setDialog("delete")}>
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/20 text-lg font-semibold">
                {getInitials(selectedStaff.name)}
              </div>

              <div className="min-w-0">
                <h2 className="text-xl font-bold">{selectedStaff.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedStaff.designation} · {selectedStaff.employeeId}
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  <StaffStatusBadge status={selectedStaff.status} />
                  <Badge variant="outline">{selectedStaff.category}</Badge>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Personal Information</h3>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <StaffDetail
                  icon={<Mail className="size-4" />}
                  label="Email"
                  value={selectedStaff.email}
                />
                <StaffDetail
                  icon={<Phone className="size-4" />}
                  label="Phone"
                  value={selectedStaff.phone}
                />
                <StaffDetail
                  icon={<BriefcaseBusiness className="size-4" />}
                  label="Department"
                  value={selectedStaff.department}
                />
                <StaffDetail
                  icon={<Users className="size-4" />}
                  label="Employment Type"
                  value={selectedStaff.employmentType}
                />
                <StaffDetail
                  icon={<CalendarDays className="size-4" />}
                  label="Joining Date"
                  value={formatDate(selectedStaff.joiningDate)}
                />
                <StaffDetail
                  icon={<UserRound className="size-4" />}
                  label="Employee ID"
                  value={selectedStaff.employeeId}
                />
              </div>
            </div>

            {selectedStaff.category === "Teaching" && (
              <div>
                <h3 className="mb-4 font-semibold">Academic Information</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <StaffDetail
                    icon={<GraduationCap className="size-4" />}
                    label="Subjects"
                    value={selectedStaff.subjects}
                  />
                  <StaffDetail
                    icon={<Users className="size-4" />}
                    label="Classes"
                    value={selectedStaff.classes}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* ADD / EDIT STAFF DIALOG */}
      <Dialog
        open={dialog === "add" || dialog === "edit"}
        onOpenChange={(open) => {
          if (!open) setDialog(null)
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {dialog === "edit" ? "Edit Staff Member" : "Add Staff Member"}
            </DialogTitle>
            <DialogDescription>
              Enter the employee details below.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={saveStaff} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Employee ID">
                <Input
                  required
                  value={form.employeeId}
                  onChange={(event) =>
                    updateForm("employeeId", event.target.value)
                  }
                  placeholder="EMP007"
                />
              </FormField>

              <FormField label="Full Name">
                <Input
                  required
                  value={form.name}
                  onChange={(event) => updateForm("name", event.target.value)}
                  placeholder="Full name"
                />
              </FormField>

              <FormField label="Email">
                <Input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) => updateForm("email", event.target.value)}
                  placeholder="name@vidyahub.edu"
                />
              </FormField>

              <FormField label="Phone">
                <Input
                  required
                  value={form.phone}
                  onChange={(event) => updateForm("phone", event.target.value)}
                  placeholder="Phone number"
                />
              </FormField>

              <FormField label="Designation">
                <Input
                  required
                  value={form.designation}
                  onChange={(event) =>
                    updateForm("designation", event.target.value)
                  }
                  placeholder="Job title"
                />
              </FormField>

              <FormField label="Department">
                <Input
                  required
                  value={form.department}
                  onChange={(event) =>
                    updateForm("department", event.target.value)
                  }
                  placeholder="Department"
                />
              </FormField>

              <FormField label="Staff Category">
                <Select
                  value={form.category}
                  onValueChange={(value) =>
                    updateForm(
                      "category",
                      (value ?? "Teaching") as StaffCategory
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Teaching">Teaching</SelectItem>
                    <SelectItem value="Non-teaching">Non-teaching</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Employment Type">
                <Select
                  value={form.employmentType}
                  onValueChange={(value) =>
                    updateForm(
                      "employmentType",
                      (value ?? "Full-time") as EmploymentType
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Joining Date">
                <Input
                  required
                  type="date"
                  value={form.joiningDate}
                  onChange={(event) =>
                    updateForm("joiningDate", event.target.value)
                  }
                />
              </FormField>

              <FormField label="Working Status">
                <Select
                  value={form.status}
                  onValueChange={(value) =>
                    updateForm("status", (value ?? "Active") as StaffStatus)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Subjects (optional)">
                <Input
                  value={form.subjects}
                  onChange={(event) =>
                    updateForm("subjects", event.target.value)
                  }
                  placeholder="e.g. Mathematics"
                />
              </FormField>

              <FormField label="Classes (optional)">
                <Input
                  value={form.classes}
                  onChange={(event) =>
                    updateForm("classes", event.target.value)
                  }
                  placeholder="e.g. Classes 9–12"
                />
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
                onClick={() => setDialog(null)}
              >
                Cancel
              </Button>

              <Button type="submit">
                {dialog === "edit" ? "Save Changes" : "Add Staff Member"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRMATION */}
      <Dialog
        open={dialog === "delete" && !!selectedStaff}
        onOpenChange={(open) => {
          if (!open) setDialog(null)
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Staff Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedStaff?.name}? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialog(null)}>
              Cancel
            </Button>

            <Button variant="destructive" onClick={deleteStaff}>
              <Trash2 className="mr-2 size-4" />
              Delete Staff
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
