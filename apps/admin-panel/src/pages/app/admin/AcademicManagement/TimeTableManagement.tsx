import { useState } from "react"
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  GraduationCap,
  Pencil,
  Plus,
  Trash2,
  Users,
  X,
} from "lucide-react"

type Day =
  "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"

type EntryType = "period" | "break"

type TimetableEntry = {
  id: number
  className: string
  section: string
  day: Day
  subject: string
  teacher: string
  room: string
  startTime: string
  endTime: string
  type: EntryType
}

type ClassInfo = {
  name: string
  sections: string[]
}

type FormData = {
  day: Day
  subject: string
  teacher: string
  room: string
  startTime: string
  endTime: string
  type: EntryType
}

const DAYS: Day[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const CLASSES: ClassInfo[] = [
  { name: "Class 6", sections: ["A", "B"] },
  { name: "Class 7", sections: ["A", "B", "C"] },
  { name: "Class 8", sections: ["A", "B"] },
  { name: "Class 9", sections: ["A", "B", "C"] },
  { name: "Class 10", sections: ["A", "B"] },
  { name: "Class 11", sections: ["A", "B"] },
  { name: "Class 12", sections: ["A", "B"] },
]

const SUBJECTS = [
  "Mathematics",
  "English",
  "Science",
  "Social Studies",
  "Computer Science",
  "Physics",
  "Chemistry",
  "Biology",
  "Hindi",
  "Physical Education",
  "Economics",
  "Accountancy",
]

const INITIAL_ENTRIES: TimetableEntry[] = [
  {
    id: 1,
    className: "Class 6",
    section: "A",
    day: "Monday",
    subject: "Mathematics",
    teacher: "Mr. Kumar",
    room: "Room 101",
    startTime: "09:00",
    endTime: "09:45",
    type: "period",
  },
  {
    id: 2,
    className: "Class 6",
    section: "A",
    day: "Monday",
    subject: "English",
    teacher: "Mrs. Sharma",
    room: "Room 101",
    startTime: "09:45",
    endTime: "10:30",
    type: "period",
  },
  {
    id: 3,
    className: "Class 6",
    section: "A",
    day: "Monday",
    subject: "Short Break",
    teacher: "",
    room: "",
    startTime: "10:30",
    endTime: "10:45",
    type: "break",
  },
  {
    id: 4,
    className: "Class 6",
    section: "A",
    day: "Monday",
    subject: "Science",
    teacher: "Mr. Ramesh",
    room: "Science Lab",
    startTime: "10:45",
    endTime: "11:30",
    type: "period",
  },
  {
    id: 5,
    className: "Class 6",
    section: "A",
    day: "Monday",
    subject: "Social Studies",
    teacher: "Mrs. Priya",
    room: "Room 101",
    startTime: "11:30",
    endTime: "12:15",
    type: "period",
  },
  {
    id: 6,
    className: "Class 6",
    section: "A",
    day: "Monday",
    subject: "Lunch Break",
    teacher: "",
    room: "",
    startTime: "12:15",
    endTime: "13:00",
    type: "break",
  },
  {
    id: 7,
    className: "Class 6",
    section: "A",
    day: "Monday",
    subject: "Computer Science",
    teacher: "Mr. Ajay",
    room: "Computer Lab",
    startTime: "13:00",
    endTime: "13:45",
    type: "period",
  },
  {
    id: 8,
    className: "Class 6",
    section: "A",
    day: "Monday",
    subject: "Physical Education",
    teacher: "Mr. Raj",
    room: "Ground",
    startTime: "13:45",
    endTime: "14:30",
    type: "period",
  },
  {
    id: 9,
    className: "Class 6",
    section: "A",
    day: "Tuesday",
    subject: "English",
    teacher: "Mrs. Sharma",
    room: "Room 101",
    startTime: "09:00",
    endTime: "09:45",
    type: "period",
  },
  {
    id: 10,
    className: "Class 6",
    section: "A",
    day: "Tuesday",
    subject: "Mathematics",
    teacher: "Mr. Kumar",
    room: "Room 101",
    startTime: "09:45",
    endTime: "10:30",
    type: "period",
  },
  {
    id: 11,
    className: "Class 6",
    section: "A",
    day: "Wednesday",
    subject: "Science",
    teacher: "Mr. Ramesh",
    room: "Science Lab",
    startTime: "09:00",
    endTime: "09:45",
    type: "period",
  },
  {
    id: 12,
    className: "Class 7",
    section: "A",
    day: "Monday",
    subject: "Mathematics",
    teacher: "Mr. Kumar",
    room: "Room 201",
    startTime: "09:00",
    endTime: "09:45",
    type: "period",
  },
  {
    id: 13,
    className: "Class 7",
    section: "A",
    day: "Monday",
    subject: "Science",
    teacher: "Mr. Ramesh",
    room: "Room 202",
    startTime: "09:45",
    endTime: "10:30",
    type: "period",
  },
]

const EMPTY_FORM: FormData = {
  day: "Monday",
  subject: "",
  teacher: "",
  room: "",
  startTime: "09:00",
  endTime: "09:45",
  type: "period",
}

function formatTime(value: string) {
  const [hour, minute] = value.split(":").map(Number)
  const suffix = hour >= 12 ? "PM" : "AM"
  const displayHour = hour % 12 || 12

  return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`
}

function toMinutes(value: string) {
  const [hour, minute] = value.split(":").map(Number)
  return hour * 60 + minute
}

export default function TimetableManagement() {
  const [entries, setEntries] = useState<TimetableEntry[]>(INITIAL_ENTRIES)

  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSection, setSelectedSection] = useState("")
  const [selectedDay, setSelectedDay] = useState<Day>("Monday")

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [form, setForm] = useState<FormData>(EMPTY_FORM)
  const [error, setError] = useState("")

  const classInfo = CLASSES.find((item) => item.name === selectedClass)

  const sectionEntries = entries
    .filter(
      (entry) =>
        entry.className === selectedClass && entry.section === selectedSection
    )
    .sort(
      (a, b) =>
        DAYS.indexOf(a.day) - DAYS.indexOf(b.day) ||
        a.startTime.localeCompare(b.startTime)
    )

  const dayEntries = sectionEntries.filter((entry) => entry.day === selectedDay)

  function goBackToClasses() {
    setSelectedClass("")
    setSelectedSection("")
    setSelectedDay("Monday")
  }

  function goBackToSections() {
    setSelectedSection("")
    setSelectedDay("Monday")
  }

  function openAddDialog(day: Day = selectedDay) {
    setEditingId(null)
    setForm({ ...EMPTY_FORM, day })
    setError("")
    setDialogOpen(true)
  }

  function openEditDialog(entry: TimetableEntry) {
    setEditingId(entry.id)
    setForm({
      day: entry.day,
      subject: entry.subject,
      teacher: entry.teacher,
      room: entry.room,
      startTime: entry.startTime,
      endTime: entry.endTime,
      type: entry.type,
    })
    setError("")
    setDialogOpen(true)
  }

  function saveEntry() {
    setError("")

    if (toMinutes(form.endTime) <= toMinutes(form.startTime)) {
      setError("End time must be later than start time.")
      return
    }

    if (form.type === "period" && !form.subject.trim()) {
      setError("Please enter the subject.")
      return
    }

    if (form.type === "period" && !form.teacher.trim()) {
      setError("Please enter the teacher's name.")
      return
    }

    const conflict = entries.some((entry) => {
      if (entry.id === editingId || entry.day !== form.day) {
        return false
      }

      const overlaps =
        toMinutes(form.startTime) < toMinutes(entry.endTime) &&
        toMinutes(form.endTime) > toMinutes(entry.startTime)

      if (!overlaps) return false

      const sameSection =
        entry.className === selectedClass && entry.section === selectedSection

      const sameTeacher =
        form.type === "period" &&
        entry.type === "period" &&
        form.teacher.trim().toLowerCase() === entry.teacher.trim().toLowerCase()

      const sameRoom =
        form.type === "period" &&
        entry.type === "period" &&
        form.room.trim() !== "" &&
        form.room.trim().toLowerCase() === entry.room.trim().toLowerCase()

      return sameSection || sameTeacher || sameRoom
    })

    if (conflict) {
      setError(
        "This time conflicts with another period, teacher, or room. Choose another time."
      )
      return
    }

    const newEntry: TimetableEntry = {
      id: editingId ?? Date.now(),
      className: selectedClass,
      section: selectedSection,
      day: form.day,
      subject:
        form.type === "break"
          ? form.subject.trim() || "Break"
          : form.subject.trim(),
      teacher: form.type === "break" ? "" : form.teacher.trim(),
      room: form.type === "break" ? "" : form.room.trim(),
      startTime: form.startTime,
      endTime: form.endTime,
      type: form.type,
    }

    if (editingId !== null) {
      setEntries((current) =>
        current.map((entry) => (entry.id === editingId ? newEntry : entry))
      )
    } else {
      setEntries((current) => [...current, newEntry])
    }

    setDialogOpen(false)
  }

  function deleteEntry() {
    if (deleteId === null) return

    setEntries((current) => current.filter((entry) => entry.id !== deleteId))

    setDeleteId(null)
  }

  return (
    <div className="min-h-screen space-y-6 bg-background p-4 text-foreground sm:p-6 lg:p-8">
      {/* Page heading */}
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          Academic Management
          <ChevronRight className="h-4 w-4" />
          Timetable
        </div>

        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          Timetable Management
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Select a class and section to manage its weekly timetable.
        </p>
      </div>

      {/* Step 1: Select class */}
      {!selectedClass && (
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Select Class</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose a class to view its sections.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {CLASSES.map((item) => {
              const count = entries.filter(
                (entry) => entry.className === item.name
              ).length

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setSelectedClass(item.name)}
                  className="group rounded-xl border border-border bg-card p-5 text-left transition-colors hover:border-primary"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <GraduationCap className="h-6 w-6" />
                    </div>

                    <ChevronRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>

                  <h3 className="mt-4 font-semibold">{item.name}</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.sections.length} sections available
                  </p>

                  <p className="mt-3 text-xs text-muted-foreground">
                    {count} sample timetable entries
                  </p>
                </button>
              )
            })}
          </div>
        </section>
      )}

      {/* Step 2: Select section */}
      {selectedClass && !selectedSection && (
        <section className="space-y-5">
          <button
            type="button"
            onClick={goBackToClasses}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Classes
          </button>

          <div>
            <h2 className="text-lg font-semibold">{selectedClass} Sections</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Choose the section whose timetable you want to view.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(classInfo?.sections ?? []).map((section) => {
              const count = entries.filter(
                (entry) =>
                  entry.className === selectedClass &&
                  entry.section === section &&
                  entry.type === "period"
              ).length

              return (
                <button
                  key={section}
                  type="button"
                  onClick={() => setSelectedSection(section)}
                  className="group rounded-xl border border-border bg-card p-5 text-left transition-colors hover:border-primary"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Users className="h-6 w-6" />
                    </div>

                    <ChevronRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>

                  <h3 className="mt-4 font-semibold">Section {section}</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {count} scheduled periods
                  </p>
                </button>
              )
            })}
          </div>
        </section>
      )}

      {/* Step 3: View and manage timetable */}
      {selectedClass && selectedSection && (
        <section className="space-y-5">
          <button
            type="button"
            onClick={goBackToSections}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sections
          </button>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold">
                {selectedClass} · Section {selectedSection}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                View and manage the weekly timetable.
              </p>
            </div>

            <button
              type="button"
              onClick={() => openAddDialog()}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Add Period
            </button>
          </div>

          {/* Select day */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {DAYS.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedDay === day
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:bg-muted"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Selected day's periods */}
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border p-4">
              <div>
                <h3 className="font-semibold">{selectedDay}</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {dayEntries.length}{" "}
                  {dayEntries.length === 1 ? "entry" : "entries"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => openAddDialog(selectedDay)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>

            {dayEntries.length === 0 ? (
              <div className="p-10 text-center">
                <CalendarDays className="mx-auto h-9 w-9 text-muted-foreground/60" />

                <h3 className="mt-3 font-semibold">No periods scheduled</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Add a subject or break to this day.
                </p>

                <button
                  type="button"
                  onClick={() => openAddDialog(selectedDay)}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                >
                  <Plus className="h-4 w-4" />
                  Add Period
                </button>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {dayEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center gap-3 p-4 transition-colors hover:bg-muted/30 sm:gap-4"
                  >
                    <div className="min-w-24">
                      <p className="text-sm font-medium">
                        {formatTime(entry.startTime)}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatTime(entry.endTime)}
                      </p>
                    </div>

                    <div
                      className={`h-10 w-1 shrink-0 rounded-full ${
                        entry.type === "break"
                          ? "bg-muted-foreground/40"
                          : "bg-primary"
                      }`}
                    />

                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium">{entry.subject}</h4>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {entry.type === "break"
                          ? "Break"
                          : [entry.teacher, entry.room]
                              .filter(Boolean)
                              .join(" · ") || "No teacher or room assigned"}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => openEditDialog(entry)}
                        title="Edit entry"
                        className="rounded-lg p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteId(entry.id)}
                        title="Delete entry"
                        className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Add/Edit dialog */}
      {dialogOpen && selectedClass && selectedSection && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setDialogOpen(false)
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="period-dialog-title"
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl border border-border bg-card shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-border p-5">
              <div>
                <h2 id="period-dialog-title" className="font-semibold">
                  {editingId === null ? "Add Period" : "Edit Period"}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedClass} · Section {selectedSection}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                aria-label="Close dialog"
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 p-5">
              {error && (
                <p
                  role="alert"
                  className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
                >
                  {error}
                </p>
              )}

              <div>
                <label
                  htmlFor="period-day"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Day
                </label>

                <select
                  id="period-day"
                  value={form.day}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      day: event.target.value as Day,
                    }))
                  }
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                >
                  {DAYS.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="period-type"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Type
                </label>

                <select
                  id="period-type"
                  value={form.type}
                  onChange={(event) => {
                    const type = event.target.value as EntryType

                    setForm((current) => ({
                      ...current,
                      type,
                      subject:
                        type === "break"
                          ? "Short Break"
                          : ["Short Break", "Lunch Break", "Break"].includes(
                                current.subject
                              )
                            ? ""
                            : current.subject,
                    }))
                  }}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                >
                  <option value="period">Teaching Period</option>
                  <option value="break">Break</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="period-subject"
                  className="mb-1.5 block text-sm font-medium"
                >
                  {form.type === "break" ? "Break Name" : "Subject"}
                </label>

                {form.type === "period" ? (
                  <>
                    <input
                      id="period-subject"
                      list="subject-options"
                      value={form.subject}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          subject: event.target.value,
                        }))
                      }
                      placeholder="Select or enter subject"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                    />

                    <datalist id="subject-options">
                      {SUBJECTS.map((subject) => (
                        <option key={subject} value={subject} />
                      ))}
                    </datalist>
                  </>
                ) : (
                  <input
                    id="period-subject"
                    value={form.subject}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        subject: event.target.value,
                      }))
                    }
                    placeholder="e.g. Lunch Break"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="period-start"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Start Time
                  </label>

                  <input
                    id="period-start"
                    type="time"
                    value={form.startTime}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        startTime: event.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="period-end"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    End Time
                  </label>

                  <input
                    id="period-end"
                    type="time"
                    value={form.endTime}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        endTime: event.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              {form.type === "period" && (
                <>
                  <div>
                    <label
                      htmlFor="period-teacher"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Teacher
                    </label>

                    <input
                      id="period-teacher"
                      value={form.teacher}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          teacher: event.target.value,
                        }))
                      }
                      placeholder="Enter teacher name"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="period-room"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Room
                    </label>

                    <input
                      id="period-room"
                      value={form.room}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          room: event.target.value,
                        }))
                      }
                      placeholder="e.g. Room 101"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end gap-2 border-t border-border p-5">
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveEntry}
                className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                {editingId === null ? "Add Period" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setDeleteId(null)
            }
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full max-w-sm rounded-xl border border-border bg-card p-5 shadow-xl"
          >
            <h2 id="delete-title" className="font-semibold">
              Delete this entry?
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              This timetable entry will be removed.
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={deleteEntry}
                className="inline-flex items-center gap-2 rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
