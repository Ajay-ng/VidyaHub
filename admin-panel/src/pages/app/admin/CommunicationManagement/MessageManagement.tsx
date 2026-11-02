import { useMemo, useState, type FormEvent } from "react"
import {
  Bell,
  CalendarDays,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  GraduationCap,
  Mail,
  Megaphone,
  Plus,
  Search,
  Send,
  Trash2,
  Users,
  X,
} from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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

type Audience = "Students" | "Teachers" | "Students & Teachers"
type MessageStatus = "Sent" | "Scheduled" | "Draft" | "Cancelled"
type Priority = "Normal" | "Important" | "Urgent"

type SchoolMessage = {
  id: number
  title: string
  message: string
  category: string
  audience: Audience
  target: string
  priority: Priority
  status: MessageStatus
  createdAt: string
  scheduledAt: string
  sentAt: string
  recipients: number
}

type MessageForm = {
  title: string
  message: string
  category: string
  audience: Audience
  target: string
  priority: Priority
  delivery: "now" | "scheduled"
  scheduledAt: string
}

const today = () => {
  const date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date.toISOString().slice(0, 10)
}

const currentDateTime = () => {
  const date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date.toISOString().slice(0, 16)
}

const audiences: Audience[] = ["Students", "Teachers", "Students & Teachers"]

const categories = [
  "General Notice",
  "Examination",
  "Attendance",
  "Holiday",
  "Event",
  "Meeting",
  "Staff Notice",
  "Emergency",
]

const targets: Record<Audience, string[]> = {
  Students: [
    "All Classes",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
  ],
  Teachers: ["All Teachers"],
  "Students & Teachers": ["All Classes & Teachers"],
}

const recipientCounts: Record<string, number> = {
  "All Classes": 498,
  "Class 1": 38,
  "Class 2": 42,
  "Class 3": 40,
  "Class 4": 41,
  "Class 5": 39,
  "Class 6": 45,
  "Class 7": 43,
  "Class 8": 60,
  "Class 9": 50,
  "Class 10": 45,
  "Class 11": 35,
  "Class 12": 20,
  "All Teachers": 42,
  "All Classes & Teachers": 540,
}

const emptyForm: MessageForm = {
  title: "",
  message: "",
  category: "General Notice",
  audience: "Students",
  target: "All Classes",
  priority: "Normal",
  delivery: "now",
  scheduledAt: "",
}

const initialMessages: SchoolMessage[] = [
  {
    id: 1,
    title: "Mid-Term Examination Reminder",
    message:
      "The mid-term examinations begin next week. Students are requested to review the examination timetable and arrive at school on time. Teachers should ensure all examination preparations are completed.",
    category: "Examination",
    audience: "Students & Teachers",
    target: "All Classes & Teachers",
    priority: "Urgent",
    status: "Sent",
    createdAt: "2026-10-28",
    scheduledAt: "",
    sentAt: "2026-10-28 09:30",
    recipients: 540,
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting Preparation",
    message:
      "Teachers are requested to update student progress records before the upcoming parent-teacher meeting.",
    category: "Meeting",
    audience: "Teachers",
    target: "All Teachers",
    priority: "Important",
    status: "Sent",
    createdAt: "2026-10-27",
    scheduledAt: "",
    sentAt: "2026-10-27 11:00",
    recipients: 42,
  },
  {
    id: 3,
    title: "School Holiday Notice",
    message:
      "The school will remain closed on the announced holiday. Regular classes will resume on the next working day.",
    category: "Holiday",
    audience: "Students",
    target: "All Classes",
    priority: "Important",
    status: "Scheduled",
    createdAt: "2026-10-29",
    scheduledAt: "2026-11-01T08:00",
    sentAt: "",
    recipients: 498,
  },
  {
    id: 4,
    title: "Attendance Submission",
    message:
      "All class teachers must verify and submit attendance records before the end of the school day.",
    category: "Attendance",
    audience: "Teachers",
    target: "All Teachers",
    priority: "Normal",
    status: "Sent",
    createdAt: "2026-10-26",
    scheduledAt: "",
    sentAt: "2026-10-26 14:00",
    recipients: 42,
  },
  {
    id: 5,
    title: "Science Exhibition Registration",
    message:
      "Students interested in participating in the science exhibition should register with their science teacher.",
    category: "Event",
    audience: "Students",
    target: "Class 8",
    priority: "Normal",
    status: "Draft",
    createdAt: "2026-10-29",
    scheduledAt: "",
    sentAt: "",
    recipients: 60,
  },
  {
    id: 6,
    title: "Staff Training Workshop",
    message:
      "A staff development workshop is planned for teaching staff. Please review the agenda and prepare any questions.",
    category: "Staff Notice",
    audience: "Teachers",
    target: "All Teachers",
    priority: "Important",
    status: "Draft",
    createdAt: "2026-10-29",
    scheduledAt: "",
    sentAt: "",
    recipients: 42,
  },
]

function formatDate(value: string) {
  if (!value) return "—"

  const date = new Date(value.includes("T") ? value : value.replace(" ", "T"))

  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(value.includes("T") || value.includes(":")
      ? { hour: "2-digit", minute: "2-digit" }
      : {}),
  })
}

function StatusBadge({ status }: { status: MessageStatus }) {
  if (status === "Sent") return <Badge>{status}</Badge>
  if (status === "Scheduled") return <Badge variant="secondary">{status}</Badge>
  if (status === "Cancelled")
    return <Badge variant="destructive">{status}</Badge>

  return <Badge variant="outline">{status}</Badge>
}

function PriorityBadge({ priority }: { priority: Priority }) {
  if (priority === "Urgent")
    return <Badge variant="destructive">{priority}</Badge>
  if (priority === "Important")
    return <Badge variant="secondary">{priority}</Badge>

  return <Badge variant="outline">{priority}</Badge>
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string
  value: number
  description: string
  icon: typeof Bell
}) {
  return (
    <Card className="gap-0 py-4">
      <CardContent className="flex items-start justify-between gap-3 px-4">
        <div className="min-w-0 space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
          <Icon className="size-5" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function MessageManagement() {
  const [messages, setMessages] = useState<SchoolMessage[]>(initialMessages)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Statuses")
  const [audienceFilter, setAudienceFilter] = useState("All Audiences")
  const [priorityFilter, setPriorityFilter] = useState("All Priorities")
  const [page, setPage] = useState(1)
  const pageSize = 5

  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<MessageForm>(emptyForm)
  const [viewMessage, setViewMessage] = useState<SchoolMessage | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const summary = useMemo(
    () => ({
      total: messages.length,
      sent: messages.filter((item) => item.status === "Sent").length,
      scheduled: messages.filter((item) => item.status === "Scheduled").length,
      drafts: messages.filter((item) => item.status === "Draft").length,
    }),
    [messages]
  )

  const filteredMessages = useMemo(() => {
    const term = search.trim().toLowerCase()

    return messages.filter((item) => {
      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.message.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.target.toLowerCase().includes(term)

      return (
        matchesSearch &&
        (statusFilter === "All Statuses" || item.status === statusFilter) &&
        (audienceFilter === "All Audiences" ||
          item.audience === audienceFilter) &&
        (priorityFilter === "All Priorities" ||
          item.priority === priorityFilter)
      )
    })
  }, [messages, search, statusFilter, audienceFilter, priorityFilter])

  const totalPages = Math.max(1, Math.ceil(filteredMessages.length / pageSize))
  const visibleMessages = filteredMessages.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  function updateForm<K extends keyof MessageForm>(
    key: K,
    value: MessageForm[K]
  ) {
    setForm((current) => {
      const updated = { ...current, [key]: value }

      if (key === "audience") {
        updated.target = targets[value as Audience][0]
      }

      return updated
    })
  }

  function openCreate(audience: Audience = "Students") {
    setEditingId(null)
    setForm({
      ...emptyForm,
      audience,
      target: targets[audience][0],
    })
    setFormOpen(true)
  }

  function openEdit(item: SchoolMessage) {
    setEditingId(item.id)
    setForm({
      title: item.title,
      message: item.message,
      category: item.category,
      audience: item.audience,
      target: item.target,
      priority: item.priority,
      delivery: item.status === "Scheduled" ? "scheduled" : "now",
      scheduledAt: item.scheduledAt,
    })
    setFormOpen(true)
  }

  function saveMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!form.title.trim() || !form.message.trim()) {
      toast.error("Enter a message title and message.")
      return
    }

    if (
      form.delivery === "scheduled" &&
      (!form.scheduledAt || new Date(form.scheduledAt) <= new Date())
    ) {
      toast.error("Choose a future date and time for scheduling.")
      return
    }

    const recipients = recipientCounts[form.target] ?? 0

    if (editingId !== null) {
      setMessages((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                title: form.title.trim(),
                message: form.message.trim(),
                category: form.category,
                audience: form.audience,
                target: form.target,
                priority: form.priority,
                recipients,
                scheduledAt:
                  form.delivery === "scheduled" ? form.scheduledAt : "",
                status:
                  item.status === "Sent"
                    ? "Sent"
                    : form.delivery === "scheduled"
                      ? "Scheduled"
                      : "Draft",
              }
            : item
        )
      )

      toast.success("Message updated successfully.")
    } else {
      const status: MessageStatus =
        form.delivery === "scheduled" ? "Scheduled" : "Draft"

      const newMessage: SchoolMessage = {
        id: Math.max(0, ...messages.map((item) => item.id)) + 1,
        title: form.title.trim(),
        message: form.message.trim(),
        category: form.category,
        audience: form.audience,
        target: form.target,
        priority: form.priority,
        status,
        createdAt: today(),
        scheduledAt: form.delivery === "scheduled" ? form.scheduledAt : "",
        sentAt: "",
        recipients,
      }

      setMessages((current) => [newMessage, ...current])
      setPage(1)

      toast.success(
        status === "Scheduled"
          ? "Message scheduled successfully."
          : "Message saved as draft."
      )
    }

    setFormOpen(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  function sendMessage(id: number) {
    const item = messages.find((message) => message.id === id)
    if (!item) return

    if (item.status === "Sent") {
      toast.info("This message has already been sent.")
      return
    }

    if (item.status === "Cancelled") {
      toast.error("A cancelled message cannot be sent.")
      return
    }

    if (
      item.status === "Scheduled" &&
      new Date(item.scheduledAt) > new Date()
    ) {
      toast.error("This message is scheduled for a future time.")
      return
    }

    setMessages((current) =>
      current.map((message) =>
        message.id === id
          ? {
              ...message,
              status: "Sent",
              sentAt: currentDateTime().replace("T", " "),
              scheduledAt: "",
            }
          : message
      )
    )

    toast.success(`Message sent to ${item.recipients} recipients (demo).`)
  }

  function cancelScheduled(id: number) {
    setMessages((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: "Cancelled", scheduledAt: "" }
          : item
      )
    )

    toast.success("Scheduled message cancelled.")
  }

  function deleteMessage() {
    if (deleteId === null) return

    setMessages((current) => current.filter((item) => item.id !== deleteId))
    setDeleteOpen(false)
    setDeleteId(null)
    toast.success("Message deleted successfully.")
  }

  function clearFilters() {
    setSearch("")
    setStatusFilter("All Statuses")
    setAudienceFilter("All Audiences")
    setPriorityFilter("All Priorities")
    setPage(1)
  }

  return (
    <div className="min-h-screen space-y-6 bg-background p-4 text-foreground sm:p-6 lg:p-8">
      {/* Page heading */}
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          Academic Management
          <ChevronRight className="h-4 w-4" />
          Message Management
        </div>

        <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Message Management
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Send important notices and alerts to students and teachers.
            </p>
          </div>

          <Button onClick={() => openCreate()}>
            <Plus className="mr-2 size-4" />
            Compose Message
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Messages"
          value={summary.total}
          description="All message records"
          icon={Mail}
        />
        <SummaryCard
          title="Sent"
          value={summary.sent}
          description="Messages sent (demo)"
          icon={CheckCircle2}
        />
        <SummaryCard
          title="Scheduled"
          value={summary.scheduled}
          description="Waiting for send time"
          icon={CalendarClock}
        />
        <SummaryCard
          title="Drafts"
          value={summary.drafts}
          description="Ready for review"
          icon={FileText}
        />
      </div>

      {/* Audience cards */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Send a Message</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose who should receive your message.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[
            {
              title: "Students",
              description:
                "Send examination alerts, attendance reminders, and student updates.",
              audience: "Students" as Audience,
              count: "498 students",
              icon: GraduationCap,
            },
            {
              title: "Teachers",
              description:
                "Share staff notices, meeting updates, and task reminders.",
              audience: "Teachers" as Audience,
              count: "42 teachers",
              icon: Users,
            },
            {
              title: "Students & Teachers",
              description:
                "Send important announcements to the whole school community.",
              audience: "Students & Teachers" as Audience,
              count: "540 recipients",
              icon: Megaphone,
            },
          ].map((item) => {
            const Icon = item.icon

            return (
              <button
                key={item.audience}
                type="button"
                onClick={() => openCreate(item.audience)}
                className="group rounded-xl border border-border bg-card p-5 text-left transition-colors hover:border-primary"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>

                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-1 min-h-10 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {item.count}
                </p>
                <p className="mt-3 text-sm font-medium text-primary">
                  Compose message
                </p>
              </button>
            )
          })}
        </div>
      </section>

      {/* Message history */}
      <Card className="min-w-0 gap-0 py-0">
        <div className="space-y-4 border-b p-4 sm:p-5">
          <div>
            <h2 className="font-semibold tracking-tight">Message History</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Review previous messages and manage drafts and scheduled notices.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="relative min-w-0">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                  setPage(1)
                }}
                placeholder="Search messages..."
                className="pl-9"
                aria-label="Search messages"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value)
                setPage(1)
              }}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Filter by status"
            >
              {["All Statuses", "Sent", "Scheduled", "Draft", "Cancelled"].map(
                (status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                )
              )}
            </select>

            <select
              value={audienceFilter}
              onChange={(event) => {
                setAudienceFilter(event.target.value)
                setPage(1)
              }}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Filter by audience"
            >
              {["All Audiences", ...audiences].map((audience) => (
                <option key={audience} value={audience}>
                  {audience}
                </option>
              ))}
            </select>

            <select
              value={priorityFilter}
              onChange={(event) => {
                setPriorityFilter(event.target.value)
                setPage(1)
              }}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Filter by priority"
            >
              {["All Priorities", "Normal", "Important", "Urgent"].map(
                (priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
            <span>
              Showing{" "}
              {filteredMessages.length === 0 ? 0 : (page - 1) * pageSize + 1}
              {"–"}
              {Math.min(page * pageSize, filteredMessages.length)} of{" "}
              {filteredMessages.length} messages
            </span>

            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="mr-2 size-4" />
              Clear Filters
            </Button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="h-11 min-w-[250px] px-4 text-left font-medium text-muted-foreground sm:px-5">
                  Message
                </th>
                <th className="h-11 px-4 text-left font-medium whitespace-nowrap text-muted-foreground">
                  Recipients
                </th>
                <th className="h-11 px-4 text-left font-medium whitespace-nowrap text-muted-foreground">
                  Priority
                </th>
                <th className="h-11 px-4 text-left font-medium whitespace-nowrap text-muted-foreground">
                  Status
                </th>
                <th className="h-11 px-4 text-left font-medium whitespace-nowrap text-muted-foreground">
                  Date
                </th>
                <th className="h-11 px-5 text-right font-medium whitespace-nowrap text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {visibleMessages.map((item) => (
                <tr
                  key={item.id}
                  className="border-b transition-colors last:border-0 hover:bg-muted/50"
                >
                  <td className="max-w-[340px] px-4 py-4 align-middle sm:px-5">
                    <button
                      type="button"
                      className="block max-w-full truncate text-left font-medium hover:underline"
                      onClick={() => setViewMessage(item)}
                      title={item.title}
                    >
                      {item.title}
                    </button>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                      {item.message}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{item.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {item.target}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4 align-middle whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Users className="size-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{item.recipients}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.audience}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 align-middle whitespace-nowrap">
                    <PriorityBadge priority={item.priority} />
                  </td>

                  <td className="px-4 py-4 align-middle whitespace-nowrap">
                    <StatusBadge status={item.status} />
                  </td>

                  <td className="px-4 py-4 align-middle whitespace-nowrap">
                    <p>
                      {formatDate(
                        item.status === "Scheduled"
                          ? item.scheduledAt
                          : item.status === "Sent"
                            ? item.sentAt
                            : item.createdAt
                      )}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.status === "Scheduled"
                        ? "Scheduled for"
                        : item.status === "Sent"
                          ? "Sent on"
                          : "Created on"}
                    </p>
                  </td>

                  <td className="px-4 py-4 align-middle sm:px-5">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewMessage(item)}
                      >
                        View
                      </Button>

                      {(item.status === "Draft" ||
                        item.status === "Scheduled") && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(item)}
                          title="Edit message"
                          aria-label="Edit message"
                        >
                          <FileText className="size-4" />
                        </Button>
                      )}

                      {(item.status === "Draft" ||
                        item.status === "Scheduled") && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => sendMessage(item.id)}
                          title="Send message"
                          aria-label="Send message"
                        >
                          <Send className="size-4" />
                        </Button>
                      )}

                      {item.status === "Scheduled" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => cancelScheduled(item.id)}
                          title="Cancel scheduled message"
                          aria-label="Cancel scheduled message"
                        >
                          <CalendarClock className="size-4" />
                        </Button>
                      )}

                      {item.status !== "Sent" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setDeleteId(item.id)
                            setDeleteOpen(true)
                          }}
                          title="Delete message"
                          aria-label="Delete message"
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {visibleMessages.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <div className="mx-auto flex max-w-sm flex-col items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-3 text-primary">
                        <Mail className="size-5" />
                      </div>
                      <p className="font-medium">No messages found</p>
                      <p className="text-sm text-muted-foreground">
                        Try different filters or compose a new message.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              <ChevronLeft className="mr-1 size-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
            >
              Next
              <ChevronRight className="ml-1 size-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Compose / edit dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingId !== null ? "Edit Message" : "Compose Message"}
            </DialogTitle>
            <DialogDescription>
              Write an important notice and select its recipients.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={saveMessage} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="message-title" className="text-sm font-medium">
                Message Title *
              </label>
              <Input
                id="message-title"
                value={form.title}
                onChange={(event) => updateForm("title", event.target.value)}
                placeholder="e.g. Important examination notice"
                maxLength={150}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message-body" className="text-sm font-medium">
                Message *
              </label>
              <textarea
                id="message-body"
                value={form.message}
                onChange={(event) => updateForm("message", event.target.value)}
                placeholder="Write the message you want to send..."
                rows={5}
                maxLength={5000}
                required
                className="flex min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              />
              <p className="text-right text-xs text-muted-foreground">
                {form.message.length}/5000 characters
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="message-category"
                  className="text-sm font-medium"
                >
                  Category
                </label>
                <select
                  id="message-category"
                  value={form.category}
                  onChange={(event) =>
                    updateForm("category", event.target.value)
                  }
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message-priority"
                  className="text-sm font-medium"
                >
                  Priority
                </label>
                <select
                  id="message-priority"
                  value={form.priority}
                  onChange={(event) =>
                    updateForm("priority", event.target.value as Priority)
                  }
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {(["Normal", "Important", "Urgent"] as Priority[]).map(
                    (priority) => (
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message-audience"
                  className="text-sm font-medium"
                >
                  Send To *
                </label>
                <select
                  id="message-audience"
                  value={form.audience}
                  onChange={(event) =>
                    updateForm("audience", event.target.value as Audience)
                  }
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {audiences.map((audience) => (
                    <option key={audience} value={audience}>
                      {audience}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message-target" className="text-sm font-medium">
                  Class / Group
                </label>
                <select
                  id="message-target"
                  value={form.target}
                  onChange={(event) => updateForm("target", event.target.value)}
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {targets[form.audience].map((target) => (
                    <option key={target} value={target}>
                      {target}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Users className="size-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Estimated Recipients</p>
                  <p className="text-2xl font-bold">
                    {recipientCounts[form.target] ?? 0}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Dummy count for the selected recipient group.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">Delivery Option</p>

              <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3">
                <input
                  type="radio"
                  name="delivery"
                  value="now"
                  checked={form.delivery === "now"}
                  onChange={() => updateForm("delivery", "now")}
                  className="mt-1 accent-primary"
                />
                <span>
                  <span className="block text-sm font-medium">Send now</span>
                  <span className="block text-xs text-muted-foreground">
                    Save as a draft first, then send from the message history.
                  </span>
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3">
                <input
                  type="radio"
                  name="delivery"
                  value="scheduled"
                  checked={form.delivery === "scheduled"}
                  onChange={() => updateForm("delivery", "scheduled")}
                  className="mt-1 accent-primary"
                />
                <span>
                  <span className="block text-sm font-medium">
                    Schedule for later
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    Choose a future date and time.
                  </span>
                </span>
              </label>

              {form.delivery === "scheduled" && (
                <div className="space-y-2">
                  <label htmlFor="scheduled-at" className="text-sm font-medium">
                    Scheduled Date & Time *
                  </label>
                  <Input
                    id="scheduled-at"
                    type="datetime-local"
                    min={currentDateTime()}
                    value={form.scheduledAt}
                    onChange={(event) =>
                      updateForm("scheduledAt", event.target.value)
                    }
                    required
                  />
                </div>
              )}
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingId !== null
                  ? "Save Changes"
                  : form.delivery === "scheduled"
                    ? "Schedule Message"
                    : "Save as Draft"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Message details */}
      <Dialog
        open={viewMessage !== null}
        onOpenChange={(open) => {
          if (!open) setViewMessage(null)
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          {viewMessage && (
            <>
              <DialogHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{viewMessage.category}</Badge>
                  <StatusBadge status={viewMessage.status} />
                  <PriorityBadge priority={viewMessage.priority} />
                </div>
                <DialogTitle className="text-xl">
                  {viewMessage.title}
                </DialogTitle>
                <DialogDescription>
                  To {viewMessage.audience} · {viewMessage.target}
                </DialogDescription>
              </DialogHeader>

              <div className="rounded-lg border p-4">
                <p className="text-sm leading-6 whitespace-pre-wrap">
                  {viewMessage.message}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Recipients</p>
                  <p className="mt-1 font-semibold">{viewMessage.recipients}</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Created On</p>
                  <p className="mt-1 text-sm font-medium">
                    {formatDate(viewMessage.createdAt)}
                  </p>
                </div>
                <div className="col-span-2 rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">
                    {viewMessage.status === "Scheduled"
                      ? "Scheduled For"
                      : viewMessage.status === "Sent"
                        ? "Sent At"
                        : "Delivery"}
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {viewMessage.status === "Scheduled"
                      ? formatDate(viewMessage.scheduledAt)
                      : viewMessage.sentAt
                        ? formatDate(viewMessage.sentAt)
                        : "Not sent"}
                  </p>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setViewMessage(null)}>
                  Close
                </Button>

                {(viewMessage.status === "Draft" ||
                  viewMessage.status === "Scheduled") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      const item = viewMessage
                      setViewMessage(null)
                      openEdit(item)
                    }}
                  >
                    Edit Message
                  </Button>
                )}

                {(viewMessage.status === "Draft" ||
                  viewMessage.status === "Scheduled") && (
                  <Button
                    onClick={() => {
                      sendMessage(viewMessage.id)
                      setViewMessage(null)
                    }}
                  >
                    <Send className="mr-2 size-4" />
                    Send Message
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open)
          if (!open) setDeleteId(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this message?</AlertDialogTitle>
            <AlertDialogDescription>
              This message will be permanently removed from the demo history.
              Messages that have already been sent cannot be deleted here.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteMessage}
              className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
            >
              Delete Message
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
