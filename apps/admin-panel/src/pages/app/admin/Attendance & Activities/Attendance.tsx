
import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Download,
  Search,
  Users,
  XCircle,
  Pencil,
  Save,
  X,
} from "lucide-react";

type AttendanceStatus = "Present" | "Absent" | "Late" | "Leave";
type AttendanceType = "Student" | "Teacher";

type AttendanceRecord = {
  id: number;
  name: string;
  role: AttendanceType;
  className: string;
  section: string;
  date: string;
  status: AttendanceStatus;
  remarks: string;
};

const initialRecords: AttendanceRecord[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Student",
    className: "Class 8",
    section: "A",
    date: "2026-10-29",
    status: "Present",
    remarks: "",
  },
  {
    id: 2,
    name: "Ananya Rao",
    role: "Student",
    className: "Class 8",
    section: "A",
    date: "2026-10-29",
    status: "Absent",
    remarks: "Not informed",
  },
  {
    id: 3,
    name: "Rohan Kumar",
    role: "Student",
    className: "Class 8",
    section: "A",
    date: "2026-10-29",
    status: "Late",
    remarks: "Arrived late",
  },
  {
    id: 4,
    name: "Diya Patel",
    role: "Student",
    className: "Class 8",
    section: "B",
    date: "2026-10-29",
    status: "Present",
    remarks: "",
  },
  {
    id: 5,
    name: "Kabir Singh",
    role: "Student",
    className: "Class 9",
    section: "A",
    date: "2026-10-29",
    status: "Leave",
    remarks: "Approved leave",
  },
  {
    id: 6,
    name: "Priya Nair",
    role: "Teacher",
    className: "Staff",
    section: "-",
    date: "2026-10-29",
    status: "Present",
    remarks: "",
  },
  {
    id: 7,
    name: "Rahul Mehta",
    role: "Teacher",
    className: "Staff",
    section: "-",
    date: "2026-10-29",
    status: "Late",
    remarks: "",
  },
];

const statusStyles: Record<AttendanceStatus, string> = {
  Present: "bg-green-100 text-green-700",
  Absent: "bg-red-100 text-red-700",
  Late: "bg-amber-100 text-amber-700",
  Leave: "bg-blue-100 text-blue-700",
};

const control =
  "h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30";

export default function Attendance() {
  const [records, setRecords] =
    useState<AttendanceRecord[]>(initialRecords);
  const [role, setRole] = useState<AttendanceType>("Student");
  const [classFilter, setClassFilter] = useState("All");
  const [sectionFilter, setSectionFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("2026-10-29");
  const [editing, setEditing] =
    useState<AttendanceRecord | null>(null);
  const [message, setMessage] = useState("");

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesRole = record.role === role;
      const matchesDate = record.date === date;
      const matchesClass =
        classFilter === "All" ||
        record.className === classFilter;
      const matchesSection =
        sectionFilter === "All" ||
        record.section === sectionFilter;
      const matchesStatus =
        statusFilter === "All" ||
        record.status === statusFilter;
      const matchesSearch = record.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return (
        matchesRole &&
        matchesDate &&
        matchesClass &&
        matchesSection &&
        matchesStatus &&
        matchesSearch
      );
    });
  }, [
    records,
    role,
    date,
    classFilter,
    sectionFilter,
    statusFilter,
    search,
  ]);

  const total = filteredRecords.length;
  const present = filteredRecords.filter(
    (record) => record.status === "Present"
  ).length;
  const absent = filteredRecords.filter(
    (record) => record.status === "Absent"
  ).length;
  const late = filteredRecords.filter(
    (record) => record.status === "Late"
  ).length;
  const onLeave = filteredRecords.filter(
    (record) => record.status === "Leave"
  ).length;

  function changeRole(nextRole: AttendanceType) {
    setRole(nextRole);
    setClassFilter("All");
    setSectionFilter("All");
    setStatusFilter("All");
    setSearch("");
  }

  function updateStatus(
    id: number,
    status: AttendanceStatus
  ) {
    setRecords((current) =>
      current.map((record) =>
        record.id === id ? { ...record, status } : record
      )
    );
    setMessage("Attendance status updated.");
  }

  function saveEdit() {
    if (!editing) return;

    setRecords((current) =>
      current.map((record) =>
        record.id === editing.id ? editing : record
      )
    );

    setEditing(null);
    setMessage("Attendance details saved.");
  }

  function exportCSV() {
    const rows = [
      [
        "Name",
        "Role",
        "Class",
        "Section",
        "Date",
        "Status",
        "Remarks",
      ],
      ...filteredRecords.map((record) => [
        record.name,
        record.role,
        record.className,
        record.section,
        record.date,
        record.status,
        record.remarks,
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
    link.download = `attendance-${date}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  const summaryCards = [
    {
      label: "Total Records",
      value: total,
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Present",
      value: present,
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      label: "Absent",
      value: absent,
      icon: XCircle,
      color: "text-red-600",
    },
    {
      label: "Late / Leave",
      value: `${late} / ${onLeave}`,
      icon: Clock,
      color: "text-amber-600",
    },
  ];

  return (
    <div className="space-y-4 p-4 md:p-5">
      {/* Page heading */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Attendance Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track and manage daily student and teacher attendance.
          </p>
        </div>

        <button
          type="button"
          onClick={exportCSV}
          className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Feedback */}
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

      {/* Student / teacher tabs */}
      <div className="flex gap-2">
        {(["Student", "Teacher"] as AttendanceType[]).map(
          (item) => (
            <button
              key={item}
              type="button"
              onClick={() => changeRole(item)}
              className={`h-9 rounded-md px-4 text-sm font-medium ${
                role === item
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground hover:bg-muted"
              }`}
            >
              {item} Attendance
            </button>
          )
        )}
      </div>

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
        <div className="relative min-w-[190px] flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name..."
            className={`${control} w-full pl-9`}
          />
        </div>

        <label className="flex items-center gap-2">
          <CalendarDays
            size={16}
            className="text-muted-foreground"
          />
          <input
            aria-label="Attendance date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className={control}
          />
        </label>

        {role === "Student" && (
          <>
            <select
              aria-label="Filter by class"
              value={classFilter}
              onChange={(event) =>
                setClassFilter(event.target.value)
              }
              className={control}
            >
              <option value="All">All Classes</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 9">Class 9</option>
            </select>

            <select
              aria-label="Filter by section"
              value={sectionFilter}
              onChange={(event) =>
                setSectionFilter(event.target.value)
              }
              className={control}
            >
              <option value="All">All Sections</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
            </select>
          </>
        )}

        <select
          aria-label="Filter by attendance status"
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
          className={control}
        >
          <option value="All">All Statuses</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
          <option value="Leave">Leave</option>
        </select>
      </div>

      {/* Attendance table */}
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="font-medium text-foreground">
            {role} Attendance Records
          </h2>
          <span className="text-xs text-muted-foreground">
            {filteredRecords.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-muted/50 text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">
                  Class / Section
                </th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Remarks</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredRecords.map((record) => (
                <tr
                  key={record.id}
                  className="hover:bg-muted/20"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {record.name}
                  </td>

                  <td className="px-4 py-3 text-muted-foreground">
                    {record.className} / {record.section}
                  </td>

                  <td className="px-4 py-3">
                    <select
                      aria-label={`Attendance status for ${record.name}`}
                      value={record.status}
                      onChange={(event) =>
                        updateStatus(
                          record.id,
                          event.target.value as AttendanceStatus
                        )
                      }
                      className={`rounded-full border-0 px-2.5 py-1 text-xs font-medium outline-none ${statusStyles[record.status]}`}
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Late">Late</option>
                      <option value="Leave">Leave</option>
                    </select>
                  </td>

                  <td className="max-w-[180px] truncate px-4 py-3 text-muted-foreground">
                    {record.remarks || "—"}
                  </td>

                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setEditing({ ...record })}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted"
                    >
                      <Pencil size={13} />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {filteredRecords.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-muted-foreground"
                  >
                    No attendance records match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit attendance dialog */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-attendance-title"
            className="w-full max-w-md rounded-lg border border-border bg-card p-4 shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2
                id="edit-attendance-title"
                className="font-semibold text-foreground"
              >
                Edit Attendance
              </h2>
              <button
                type="button"
                onClick={() => setEditing(null)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mb-3 text-sm text-muted-foreground">
              {editing.name} · {editing.date}
            </p>

            <label className="mb-1 block text-sm font-medium">
              Attendance Status
            </label>
            <select
              value={editing.status}
              onChange={(event) =>
                setEditing({
                  ...editing,
                  status: event.target.value as AttendanceStatus,
                })
              }
              className={`${control} mb-3 w-full`}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
              <option value="Leave">Leave</option>
            </select>

            <label
              htmlFor="attendance-remarks"
              className="mb-1 block text-sm font-medium"
            >
              Remarks
            </label>
            <textarea
              id="attendance-remarks"
              value={editing.remarks}
              onChange={(event) =>
                setEditing({
                  ...editing,
                  remarks: event.target.value,
                })
              }
              rows={3}
              placeholder="Enter remarks..."
              className="w-full rounded-md border border-border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="h-9 rounded-md border border-border px-3 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEdit}
                className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm text-primary-foreground hover:opacity-90"
              >
                <Save size={15} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
