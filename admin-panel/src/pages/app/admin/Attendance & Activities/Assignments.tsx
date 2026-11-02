
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Download,
  Pencil,
  Trash2,
  X,
  ClipboardList,
  CheckCircle2,
  Clock,
 
  CalendarDays,
  Users,
} from "lucide-react";

type AssignmentStatus = "Draft" | "Published" | "Archived";

type Assignment = {
  id: number;
  title: string;
  subject: string;
  className: string;
  teacher: string;
  dueDate: string;
  status: AssignmentStatus;
  submissions: number;
  totalStudents: number;
  description: string;
  createdAt: string;
};

type AssignmentForm = {
  title: string;
  subject: string;
  className: string;
  teacher: string;
  dueDate: string;
  description: string;
  totalStudents: string;
};

const initialAssignments: Assignment[] = [
  {
    id: 1,
    title: "Algebra Worksheet",
    subject: "Mathematics",
    className: "Class 8",
    teacher: "Priya Nair",
    dueDate: "2026-11-05",
    status: "Published",
    submissions: 24,
    totalStudents: 30,
    description: "Complete exercises 1–20 from Chapter 4.",
    createdAt: "2026-10-20",
  },
  {
    id: 2,
    title: "Essay Writing",
    subject: "English",
    className: "Class 9",
    teacher: "Rahul Mehta",
    dueDate: "2026-11-08",
    status: "Published",
    submissions: 18,
    totalStudents: 28,
    description: "Write an essay on environmental protection.",
    createdAt: "2026-10-21",
  },
  {
    id: 3,
    title: "Science Project",
    subject: "Science",
    className: "Class 8",
    teacher: "Anita Rao",
    dueDate: "2026-11-12",
    status: "Draft",
    submissions: 0,
    totalStudents: 30,
    description: "Prepare a project on renewable energy.",
    createdAt: "2026-10-25",
  },
  {
    id: 4,
    title: "History Notes",
    subject: "Social Science",
    className: "Class 10",
    teacher: "Vikram Das",
    dueDate: "2026-10-20",
    status: "Archived",
    submissions: 27,
    totalStudents: 29,
    description: "Submit notes for the assigned chapter.",
    createdAt: "2026-10-10",
  },
  {
    id: 5,
    title: "Computer Practical",
    subject: "Computer Science",
    className: "Class 10",
    teacher: "Arun Kumar",
    dueDate: "2026-11-15",
    status: "Published",
    submissions: 12,
    totalStudents: 29,
    description: "Complete the practical exercises and submit screenshots.",
    createdAt: "2026-10-27",
  },
];

const emptyForm: AssignmentForm = {
  title: "",
  subject: "Mathematics",
  className: "Class 8",
  teacher: "",
  dueDate: "",
  description: "",
  totalStudents: "30",
};

const statusStyles: Record<AssignmentStatus, string> = {
  Draft: "bg-amber-100 text-amber-700",
  Published: "bg-green-100 text-green-700",
  Archived: "bg-muted text-muted-foreground",
};

const inputClass =
  "h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30";

export default function Assignments() {
  const [assignments, setAssignments] =
    useState<Assignment[]>(initialAssignments);

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<AssignmentForm>({
    ...emptyForm,
  });
  const [message, setMessage] = useState("");

  const filteredAssignments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return assignments.filter((assignment) => {
      const matchesSearch =
        assignment.title.toLowerCase().includes(query) ||
        assignment.teacher.toLowerCase().includes(query) ||
        assignment.subject.toLowerCase().includes(query);

      const matchesClass =
        classFilter === "All" ||
        assignment.className === classFilter;

      const matchesSubject =
        subjectFilter === "All" ||
        assignment.subject === subjectFilter;

      const matchesStatus =
        statusFilter === "All" ||
        assignment.status === statusFilter;

      return (
        matchesSearch &&
        matchesClass &&
        matchesSubject &&
        matchesStatus
      );
    });
  }, [
    assignments,
    search,
    classFilter,
    subjectFilter,
    statusFilter,
  ]);

  const totalAssignments = assignments.length;

  const publishedCount = assignments.filter(
    (assignment) => assignment.status === "Published"
  ).length;

  const draftCount = assignments.filter(
    (assignment) => assignment.status === "Draft"
  ).length;

  const archivedCount = assignments.filter(
    (assignment) => assignment.status === "Archived"
  ).length;

  const totalSubmissions = assignments.reduce(
    (total, assignment) => total + assignment.submissions,
    0
  );

  const selectClass =
    "h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30";

  function openCreateForm() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setShowForm(true);
  }

  function openEditForm(assignment: Assignment) {
    setEditingId(assignment.id);

    setForm({
      title: assignment.title,
      subject: assignment.subject,
      className: assignment.className,
      teacher: assignment.teacher,
      dueDate: assignment.dueDate,
      description: assignment.description,
      totalStudents: String(assignment.totalStudents),
    });

    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  }

  function saveAssignment(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const totalStudents = Number(form.totalStudents);

    if (!Number.isFinite(totalStudents) || totalStudents < 1) {
      setMessage("Total students must be at least 1.");
      return;
    }

    if (editingId !== null) {
      setAssignments((current) =>
        current.map((assignment) => {
          if (assignment.id !== editingId) {
            return assignment;
          }

          return {
            ...assignment,
            title: form.title.trim(),
            subject: form.subject,
            className: form.className,
            teacher: form.teacher.trim(),
            dueDate: form.dueDate,
            description: form.description.trim(),
            totalStudents,
            submissions: Math.min(
              assignment.submissions,
              totalStudents
            ),
          };
        })
      );

      setMessage("Assignment updated successfully.");
    } else {
      const newAssignment: Assignment = {
        id: Date.now(),
        title: form.title.trim(),
        subject: form.subject,
        className: form.className,
        teacher: form.teacher.trim(),
        dueDate: form.dueDate,
        status: "Draft",
        submissions: 0,
        totalStudents,
        description: form.description.trim(),
        createdAt: new Date().toISOString().slice(0, 10),
      };

      setAssignments((current) => [
        newAssignment,
        ...current,
      ]);

      setMessage("Assignment created as a draft.");
    }

    closeForm();
  }

  function changeStatus(
    id: number,
    status: AssignmentStatus
  ) {
    setAssignments((current) =>
      current.map((assignment) =>
        assignment.id === id
          ? { ...assignment, status }
          : assignment
      )
    );

    setMessage(`Assignment status changed to ${status}.`);
  }

  function deleteAssignment(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this assignment?"
    );

    if (!confirmed) return;

    setAssignments((current) =>
      current.filter((assignment) => assignment.id !== id)
    );

    setMessage("Assignment deleted successfully.");
  }

  function exportCSV() {
    const rows: (string | number)[][] = [
      [
        "Title",
        "Subject",
        "Class",
        "Teacher",
        "Due Date",
        "Status",
        "Submissions",
        "Total Students",
        "Description",
      ],
      ...filteredAssignments.map((assignment) => [
        assignment.title,
        assignment.subject,
        assignment.className,
        assignment.teacher,
        assignment.dueDate,
        assignment.status,
        assignment.submissions,
        assignment.totalStudents,
        assignment.description,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map(
            (value) =>
              `"${String(value).replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;",
      })
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = "assignments.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  const summaryCards = [
    {
      label: "Total Assignments",
      value: totalAssignments,
      icon: ClipboardList,
      color: "text-primary",
    },
    {
      label: "Published",
      value: publishedCount,
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      label: "Drafts",
      value: draftCount,
      icon: Clock,
      color: "text-amber-600",
    },
    {
      label: "Total Submissions",
      value: totalSubmissions,
      icon: Users,
      color: "text-blue-600",
    },
  ];

  return (
    <div className="space-y-4 p-4 md:p-5">
      {/* Page heading */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Assignments
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create, publish, and manage student assignments.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm hover:bg-muted"
          >
            <Download size={15} />
            Export CSV
          </button>

          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus size={16} />
            New Assignment
          </button>
        </div>
      </div>

      {/* Feedback message */}
      {message && (
        <div className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm">
          <span>{message}</span>
          <button
            type="button"
            onClick={() => setMessage("")}
            aria-label="Dismiss message"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {summaryCards.map(
          ({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="rounded-lg border border-border bg-card p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-muted-foreground">
                  {label}
                </span>
                <Icon size={17} className={color} />
              </div>

              <p className="mt-2 text-2xl font-semibold text-foreground">
                {value}
              </p>
            </div>
          )
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-3">
        <div className="relative min-w-[200px] flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search assignment, subject, or teacher..."
            className={`${inputClass} pl-9`}
          />
        </div>

        <select
          aria-label="Filter by class"
          value={classFilter}
          onChange={(event) => setClassFilter(event.target.value)}
          className={selectClass}
        >
          <option value="All">All Classes</option>
          {Array.from(
            { length: 12 },
            (_, index) => `Class ${index + 1}`
          ).map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </select>

        <select
          aria-label="Filter by subject"
          value={subjectFilter}
          onChange={(event) =>
            setSubjectFilter(event.target.value)
          }
          className={selectClass}
        >
          <option value="All">All Subjects</option>
          <option value="Mathematics">Mathematics</option>
          <option value="English">English</option>
          <option value="Science">Science</option>
          <option value="Social Science">Social Science</option>
          <option value="Computer Science">Computer Science</option>
        </select>

        <select
          aria-label="Filter by status"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className={selectClass}
        >
          <option value="All">All Statuses</option>
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
          <option value="Archived">Archived</option>
        </select>

        <button
          type="button"
          onClick={() => {
            setSearch("");
            setClassFilter("All");
            setSubjectFilter("All");
            setStatusFilter("All");
          }}
          className="h-9 rounded-md border border-border px-3 text-sm hover:bg-muted"
        >
          Reset
        </button>
      </div>

      {/* Assignment table */}
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
          <h2 className="font-medium text-foreground">
            Assignment List
          </h2>
          <span className="text-xs text-muted-foreground">
            {filteredAssignments.length} assignments
            {archivedCount > 0 && ` · ${archivedCount} archived total`}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-muted/50 text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Assignment</th>
                <th className="px-4 py-3 font-medium">Class / Subject</th>
                <th className="px-4 py-3 font-medium">Teacher</th>
                <th className="px-4 py-3 font-medium">Due Date</th>
                <th className="px-4 py-3 font-medium">Submissions</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredAssignments.map((assignment) => {
                const progress =
                  assignment.totalStudents > 0
                    ? Math.min(
                        100,
                        (assignment.submissions /
                          assignment.totalStudents) *
                          100
                      )
                    : 0;

                return (
                  <tr
                    key={assignment.id}
                    className="hover:bg-muted/20"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">
                        {assignment.title}
                      </p>
                      <p className="mt-1 max-w-[230px] truncate text-xs text-muted-foreground">
                        {assignment.description || "No description"}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p>{assignment.className}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {assignment.subject}
                      </p>
                    </td>

                    <td className="px-4 py-3 text-muted-foreground">
                      {assignment.teacher || "Not assigned"}
                    </td>

                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays
                          size={14}
                          className="text-muted-foreground"
                        />
                        {assignment.dueDate}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-sm">
                        <span className="font-medium">
                          {assignment.submissions}
                        </span>
                        <span className="text-muted-foreground">
                          / {assignment.totalStudents}
                        </span>
                      </div>

                      <div className="mt-1.5 h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <select
                        aria-label={`Status for ${assignment.title}`}
                        value={assignment.status}
                        onChange={(event) =>
                          changeStatus(
                            assignment.id,
                            event.target.value as AssignmentStatus
                          )
                        }
                        className={`rounded-full border-0 px-2.5 py-1 text-xs font-medium outline-none ${statusStyles[assignment.status]}`}
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          type="button"
                          title="Edit assignment"
                          onClick={() => openEditForm(assignment)}
                          className="rounded-md border border-border p-2 hover:bg-muted"
                        >
                          <Pencil size={14} />
                        </button>

                        <button
                          type="button"
                          title="Delete assignment"
                          onClick={() => deleteAssignment(assignment.id)}
                          className="rounded-md border border-border p-2 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredAssignments.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-muted-foreground"
                  >
                    No assignments found. Change your filters or create an assignment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / edit dialog */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <form
            onSubmit={saveAssignment}
            className="my-auto w-full max-w-lg space-y-3 rounded-lg border border-border bg-card p-5 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-foreground">
                  {editingId !== null
                    ? "Edit Assignment"
                    : "Create Assignment"}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Fill in the assignment details below.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                aria-label="Close form"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <label
                htmlFor="assignment-title"
                className="mb-1 block text-sm font-medium"
              >
                Assignment Title *
              </label>
              <input
                id="assignment-title"
                required
                maxLength={120}
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
                placeholder="Enter assignment title"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="assignment-subject"
                  className="mb-1 block text-sm font-medium"
                >
                  Subject *
                </label>
                <select
                  id="assignment-subject"
                  required
                  value={form.subject}
                  onChange={(event) =>
                    setForm({ ...form, subject: event.target.value })
                  }
                  className={inputClass}
                >
                  <option>Mathematics</option>
                  <option>English</option>
                  <option>Science</option>
                  <option>Social Science</option>
                  <option>Computer Science</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="assignment-class"
                  className="mb-1 block text-sm font-medium"
                >
                  Class *
                </label>
                <select
                  id="assignment-class"
                  required
                  value={form.className}
                  onChange={(event) =>
                    setForm({ ...form, className: event.target.value })
                  }
                  className={inputClass}
                >
                  {Array.from(
                    { length: 12 },
                    (_, index) => `Class ${index + 1}`
                  ).map((className) => (
                    <option key={className} value={className}>
                      {className}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="assignment-teacher"
                  className="mb-1 block text-sm font-medium"
                >
                  Teacher
                </label>
                <input
                  id="assignment-teacher"
                  maxLength={100}
                  value={form.teacher}
                  onChange={(event) =>
                    setForm({ ...form, teacher: event.target.value })
                  }
                  placeholder="Teacher name"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="assignment-due-date"
                  className="mb-1 block text-sm font-medium"
                >
                  Due Date *
                </label>
                <input
                  id="assignment-due-date"
                  required
                  type="date"
                  value={form.dueDate}
                  onChange={(event) =>
                    setForm({ ...form, dueDate: event.target.value })
                  }
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="assignment-students"
                className="mb-1 block text-sm font-medium"
              >
                Total Students *
              </label>
              <input
                id="assignment-students"
                required
                min={1}
                max={1000}
                type="number"
                value={form.totalStudents}
                onChange={(event) =>
                  setForm({
                    ...form,
                    totalStudents: event.target.value,
                  })
                }
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="assignment-description"
                className="mb-1 block text-sm font-medium"
              >
                Instructions
              </label>
              <textarea
                id="assignment-description"
                maxLength={2000}
                rows={3}
                value={form.description}
                onChange={(event) =>
                  setForm({
                    ...form,
                    description: event.target.value,
                  })
                }
                placeholder="Describe the assignment and submission requirements..."
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <p className="text-xs text-muted-foreground">
              New assignments are created as drafts. Change their status
              in the table when they are ready to publish.
            </p>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={closeForm}
                className="h-9 rounded-md border border-border px-3 text-sm hover:bg-muted"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                {editingId !== null
                  ? "Save Changes"
                  : "Create Assignment"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
