
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  Users,
  UserCheck,
  UserMinus,
  UserX,
  UserPlus,
  Search,
  Download,
  MoreHorizontal,
  Mail,
  Phone,
  GraduationCap,
  BriefcaseBusiness,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type TeacherStatus = "Active" | "On Leave" | "Inactive";

type Teacher = {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  subject: string;
  designation: string;
  status: TeacherStatus;
  joiningDate: string;
};

type TeacherForm = {
  name: string;
  email: string;
  phone: string;
  department: string;
  subject: string;
  designation: string;
  joiningDate: string;
};

const initialTeachers: Teacher[] = [
  {
    id: "TCH-1001",
    name: "Ananya Sharma",
    email: "ananya.sharma@school.com",
    phone: "9876543210",
    department: "Mathematics",
    subject: "Mathematics",
    designation: "Senior Teacher",
    status: "Active",
    joiningDate: "2022-06-15",
  },
  {
    id: "TCH-1002",
    name: "Rahul Kumar",
    email: "rahul.kumar@school.com",
    phone: "9876543211",
    department: "Science",
    subject: "Physics",
    designation: "Teacher",
    status: "Active",
    joiningDate: "2023-01-10",
  },
  {
    id: "TCH-1003",
    name: "Priya Reddy",
    email: "priya.reddy@school.com",
    phone: "9876543212",
    department: "Languages",
    subject: "English",
    designation: "Senior Teacher",
    status: "On Leave",
    joiningDate: "2021-07-01",
  },
  {
    id: "TCH-1004",
    name: "Arjun Rao",
    email: "arjun.rao@school.com",
    phone: "9876543213",
    department: "Computer Science",
    subject: "Computer Science",
    designation: "Department Head",
    status: "Active",
    joiningDate: "2020-04-20",
  },
  {
    id: "TCH-1005",
    name: "Sneha Patel",
    email: "sneha.patel@school.com",
    phone: "9876543214",
    department: "Social Studies",
    subject: "History",
    designation: "Teacher",
    status: "Inactive",
    joiningDate: "2019-08-12",
  },
  {
    id: "TCH-1006",
    name: "Vikram Singh",
    email: "vikram.singh@school.com",
    phone: "9876543215",
    department: "Science",
    subject: "Chemistry",
    designation: "Teacher",
    status: "Active",
    joiningDate: "2024-02-05",
  },
];

const departments = [
  "Mathematics",
  "Science",
  "Languages",
  "Computer Science",
  "Social Studies",
];

const statusStyles: Record<TeacherStatus, string> = {
  Active:
    "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300",
  "On Leave":
    "border-yellow-300 bg-yellow-50 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-300",
  Inactive: "border-border bg-muted text-muted-foreground",
};

const emptyForm: TeacherForm = {
  name: "",
  email: "",
  phone: "",
  department: "",
  subject: "",
  designation: "",
  joiningDate: "",
};

export default function Teachers() {
  const [teachers, setTeachers] =
    useState<Teacher[]>(initialTeachers);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] =
    useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<TeacherForm>(emptyForm);
  const [formError, setFormError] = useState("");

  const stats = useMemo(
    () => [
      {
        title: "Total Teachers",
        value: teachers.length,
        description: "All registered teachers",
        icon: Users,
      },
      {
        title: "Active Teachers",
        value: teachers.filter(
          (teacher) => teacher.status === "Active",
        ).length,
        description: "Currently active",
        icon: UserCheck,
      },
      {
        title: "On Leave",
        value: teachers.filter(
          (teacher) => teacher.status === "On Leave",
        ).length,
        description: "Currently on leave",
        icon: UserMinus,
      },
      {
        title: "Inactive",
        value: teachers.filter(
          (teacher) => teacher.status === "Inactive",
        ).length,
        description: "Not currently active",
        icon: UserX,
      },
    ],
    [teachers],
  );

  const filteredTeachers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return teachers.filter((teacher) => {
      const matchesSearch = [
        teacher.name,
        teacher.id,
        teacher.email,
        teacher.subject,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesDepartment =
        departmentFilter === "all" ||
        teacher.department === departmentFilter;

      const matchesStatus =
        statusFilter === "all" ||
        teacher.status === statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [teachers, search, departmentFilter, statusFilter]);

  function handleAddTeacher(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setFormError("");

    const normalizedEmail = form.email.trim().toLowerCase();

    if (
      teachers.some(
        (teacher) =>
          teacher.email.toLowerCase() === normalizedEmail,
      )
    ) {
      setFormError(
        "A teacher with this email already exists.",
      );
      return;
    }

    const newTeacher: Teacher = {
      id: `TCH-${Date.now().toString().slice(-6)}`,
      name: form.name.trim(),
      email: normalizedEmail,
      phone: form.phone.trim(),
      department: form.department,
      subject: form.subject.trim(),
      designation: form.designation.trim(),
      status: "Active",
      joiningDate: form.joiningDate,
    };

    setTeachers((current) => [newTeacher, ...current]);
    setForm(emptyForm);
    setDialogOpen(false);
  }

  function updateTeacherStatus(
    id: string,
    status: TeacherStatus,
  ) {
    setTeachers((current) =>
      current.map((teacher) =>
        teacher.id === id ? { ...teacher, status } : teacher,
      ),
    );
  }

  function exportTeachers() {
    const headers = [
      "Employee ID",
      "Name",
      "Email",
      "Phone",
      "Department",
      "Subject",
      "Designation",
      "Status",
      "Joining Date",
    ];

    const rows = filteredTeachers.map((teacher) => [
      teacher.id,
      teacher.name,
      teacher.email,
      teacher.phone,
      teacher.department,
      teacher.subject,
      teacher.designation,
      teacher.status,
      teacher.joiningDate,
    ]);

    const escapeCsv = (value: string) =>
      `"${value.replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "teachers.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-full space-y-6 bg-background p-4 text-foreground md:p-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="size-5" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Teachers
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage teachers, departments and employment details.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={exportTeachers}>
            <Download className="mr-2 size-4" />
            Export CSV
          </Button>

          <Dialog
            open={dialogOpen}
            onOpenChange={(open) => {
              setDialogOpen(open);
              setFormError("");

              if (!open) {
                setForm(emptyForm);
              }
            }}
          >
            {/* Base UI uses render instead of asChild */}
            <DialogTrigger
              render={
                <Button>
                  <UserPlus className="mr-2 size-4" />
                  Add Teacher
                </Button>
              }
            />

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
                <DialogDescription>
                  Enter the teacher's details to add them to
                  the directory.
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={handleAddTeacher}
                className="space-y-5"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="teacher-name"
                      className="text-sm font-medium"
                    >
                      Full Name *
                    </label>
                    <Input
                      id="teacher-name"
                      value={form.name}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          name: event.target.value,
                        })
                      }
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="teacher-email"
                      className="text-sm font-medium"
                    >
                      Email Address *
                    </label>
                    <Input
                      id="teacher-email"
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          email: event.target.value,
                        })
                      }
                      placeholder="teacher@school.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="teacher-phone"
                      className="text-sm font-medium"
                    >
                      Phone Number *
                    </label>
                    <Input
                      id="teacher-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          phone: event.target.value,
                        })
                      }
                      placeholder="Enter phone number"
                      pattern="[0-9+() -]{7,20}"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="teacher-department"
                      className="text-sm font-medium"
                    >
                      Department *
                    </label>
<Select
  value={form.department}
  onValueChange={(value) =>
    setForm({
      ...form,
      department: value ?? "",
    })
  }
  required
>
                      <SelectTrigger id="teacher-department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((department) => (
                          <SelectItem
                            key={department}
                            value={department}
                          >
                            {department}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="teacher-subject"
                      className="text-sm font-medium"
                    >
                      Subject *
                    </label>
                    <Input
                      id="teacher-subject"
                      value={form.subject}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          subject: event.target.value,
                        })
                      }
                      placeholder="e.g. Mathematics"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="teacher-designation"
                      className="text-sm font-medium"
                    >
                      Designation *
                    </label>
                    <Input
                      id="teacher-designation"
                      value={form.designation}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          designation: event.target.value,
                        })
                      }
                      placeholder="e.g. Senior Teacher"
                      required
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label
                      htmlFor="teacher-joining-date"
                      className="text-sm font-medium"
                    >
                      Joining Date *
                    </label>
                    <Input
                      id="teacher-joining-date"
                      type="date"
                      value={form.joiningDate}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          joiningDate: event.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                {formError && (
                  <p className="text-sm text-destructive">
                    {formError}
                  </p>
                )}

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setDialogOpen(false);
                      setForm(emptyForm);
                      setFormError("");
                    }}
                  >
                    Cancel
                  </Button>

                  <Button type="submit">
                    <UserPlus className="mr-2 size-4" />
                    Save Teacher
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title} className="gap-3 py-5">
              <CardContent className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>

                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                  <Icon className="size-5 text-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Teacher directory */}
      <Card className="gap-0 overflow-hidden py-0">
        <CardHeader className="gap-4 py-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg">
                Teacher Directory
              </CardTitle>
              <CardDescription className="mt-1">
                View and manage teacher information.
              </CardDescription>
            </div>

            <Badge variant="secondary" className="w-fit">
              {filteredTeachers.length}{" "}
              {filteredTeachers.length === 1
                ? "teacher"
                : "teachers"}
            </Badge>
          </div>

          <Separator />

          <div className="grid gap-3 md:grid-cols-[minmax(200px,1fr)_200px_170px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, ID, email or subject..."
                className="pl-9"
                aria-label="Search teachers"
              />
            </div>

<Select
  value={departmentFilter}
  onValueChange={(value) => setDepartmentFilter(value ?? "all")}
>
              <SelectTrigger aria-label="Filter by department">
                <SelectValue placeholder="All departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  All Departments
                </SelectItem>
                {departments.map((department) => (
                  <SelectItem
                    key={department}
                    value={department}
                  >
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

<Select
  value={statusFilter}
  onValueChange={(value) => setStatusFilter(value ?? "all")}
>
              <SelectTrigger aria-label="Filter by status">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  All Statuses
                </SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="On Leave">
                  On Leave
                </SelectItem>
                <SelectItem value="Inactive">
                  Inactive
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="min-w-[250px]">
                    Teacher
                  </TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joining Date</TableHead>
                  <TableHead className="text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredTeachers.map((teacher) => {
                  const initials = teacher.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase();

                  return (
                    <TableRow key={teacher.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-10">
                            <AvatarFallback className="bg-primary/20 font-semibold text-foreground">
                              {initials}
                            </AvatarFallback>
                          </Avatar>

                          <div className="min-w-0 space-y-1">
                            <p className="font-medium">
                              {teacher.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {teacher.id}
                            </p>
                            <p className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Mail className="size-3 shrink-0" />
                              {teacher.email}
                            </p>
                            <p className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Phone className="size-3 shrink-0" />
                              {teacher.phone}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <span className="whitespace-nowrap">
                          {teacher.department}
                        </span>
                      </TableCell>

                      <TableCell>{teacher.subject}</TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <BriefcaseBusiness className="size-4 text-muted-foreground" />
                          {teacher.designation}
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={statusStyles[teacher.status]}
                        >
                          {teacher.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="whitespace-nowrap">
                        {new Date(
                          `${teacher.joiningDate}T00:00:00`,
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>

                      <TableCell className="text-right">
                        <DropdownMenu>
                          {/* Base UI uses render instead of asChild */}
                          <DropdownMenuTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label={`Actions for ${teacher.name}`}
                              >
                                <MoreHorizontal className="size-4" />
                              </Button>
                            }
                          />

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onSelect={() => {
                                window.location.href =
                                  `mailto:${teacher.email}`;
                              }}
                            >
                              <Mail className="mr-2 size-4" />
                              Send Email
                            </DropdownMenuItem>

                            {teacher.status !== "Active" && (
                              <DropdownMenuItem
                                onSelect={() =>
                                  updateTeacherStatus(
                                    teacher.id,
                                    "Active",
                                  )
                                }
                              >
                                <UserCheck className="mr-2 size-4" />
                                Mark Active
                              </DropdownMenuItem>
                            )}

                            {teacher.status !== "On Leave" && (
                              <DropdownMenuItem
                                onSelect={() =>
                                  updateTeacherStatus(
                                    teacher.id,
                                    "On Leave",
                                  )
                                }
                              >
                                <UserMinus className="mr-2 size-4" />
                                Mark On Leave
                              </DropdownMenuItem>
                            )}

                            {teacher.status !== "Inactive" && (
                              <DropdownMenuItem
                                onSelect={() =>
                                  updateTeacherStatus(
                                    teacher.id,
                                    "Inactive",
                                  )
                                }
                              >
                                <UserX className="mr-2 size-4" />
                                Mark Inactive
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {filteredTeachers.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-32 text-center"
                    >
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Users className="size-8" />
                        <p className="font-medium text-foreground">
                          No teachers found
                        </p>
                        <p className="text-sm">
                          Try changing your search or filters.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <Separator />

          <div className="flex flex-col gap-2 px-4 py-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {filteredTeachers.length} of{" "}
              {teachers.length} teachers
            </span>
            <span>Teacher Management</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
