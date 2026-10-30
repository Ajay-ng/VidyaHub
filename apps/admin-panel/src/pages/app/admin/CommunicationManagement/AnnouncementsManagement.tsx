import { useMemo, useState, type FormEvent} from "react"
import {
  Archive,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  FileText,
  Megaphone,
  Pencil,
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

type AnnouncementStatus = "Published" | "Scheduled" | "Draft" | "Archived"
type AnnouncementPriority = "Normal" | "Important" | "Urgent"

type Announcement = {
  id: number
  title: string
  description: string
  category: string
  audience: string
  priority: AnnouncementPriority
  status: AnnouncementStatus
  publishDate: string
  expiryDate: string
  createdBy: string
  createdAt: string
}

type AnnouncementForm = {
  title: string
  description: string
  category: string
  audience: string
  priority: AnnouncementPriority
  publishDate: string
  expiryDate: string
}

const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Annual Sports Day 2026",
    description:
      "Our annual sports day will be held on campus. Students should arrive in their respective house uniforms. Parents are welcome to attend the event.",
    category: "Events",
    audience: "Everyone",
    priority: "Important",
    status: "Published",
    publishDate: "2026-10-28",
    expiryDate: "2026-11-15",
    createdBy: "Admin",
    createdAt: "2026-10-27",
  },
  {
    id: 2,
    title: "Mid-Term Examination Schedule",
    description:
      "The mid-term examination schedule has been released. Students are advised to review the timetable and prepare according to the subjects listed.",
    category: "Examination",
    audience: "Students",
    priority: "Urgent",
    status: "Published",
    publishDate: "2026-10-25",
    expiryDate: "2026-11-20",
    createdBy: "Academic Admin",
    createdAt: "2026-10-24",
  },
  {
    id: 3,
    title: "Parent-Teacher Meeting",
    description:
      "A parent-teacher meeting will be organized to discuss student performance, attendance, and academic progress.",
    category: "Meeting",
    audience: "Parents",
    priority: "Important",
    status: "Scheduled",
    publishDate: "2026-11-05",
    expiryDate: "2026-11-12",
    createdBy: "Admin",
    createdAt: "2026-10-28",
  },
  {
    id: 4,
    title: "Library Book Return Reminder",
    description:
      "Students who have borrowed library books are requested to return or renew them before the due date.",
    category: "Academic",
    audience: "Students",
    priority: "Normal",
    status: "Published",
    publishDate: "2026-10-20",
    expiryDate: "2026-11-10",
    createdBy: "Library Admin",
    createdAt: "2026-10-19",
  },
  {
    id: 5,
    title: "Teacher Training Workshop",
    description:
      "A professional development workshop will be conducted for teaching staff. Please confirm your participation with the administration.",
    category: "Staff",
    audience: "Teachers",
    priority: "Normal",
    status: "Draft",
    publishDate: "2026-11-10",
    expiryDate: "2026-11-15",
    createdBy: "Academic Admin",
    createdAt: "2026-10-28",
  },
  {
    id: 6,
    title: "School Holiday Notice",
    description:
      "The school will remain closed on the announced holiday. Regular classes will resume on the next working day.",
    category: "Holiday",
    audience: "Everyone",
    priority: "Important",
    status: "Archived",
    publishDate: "2026-09-20",
    expiryDate: "2026-09-25",
    createdBy: "Admin",
    createdAt: "2026-09-19",
  },
  {
    id: 7,
    title: "Science Exhibition Registration",
    description:
      "Students interested in participating in the science exhibition should register with their respective science teachers.",
    category: "Events",
    audience: "Students",
    priority: "Normal",
    status: "Published",
    publishDate: "2026-10-27",
    expiryDate: "2026-11-08",
    createdBy: "Science Department",
    createdAt: "2026-10-26",
  },
  {
    id: 8,
    title: "Staff Meeting Agenda",
    description:
      "The upcoming staff meeting will cover academic planning, attendance reviews, and upcoming school activities.",
    category: "Meeting",
    audience: "Teachers",
    priority: "Normal",
    status: "Draft",
    publishDate: "2026-11-12",
    expiryDate: "2026-11-13",
    createdBy: "Admin",
    createdAt: "2026-10-29",
  },
]

const emptyForm: AnnouncementForm = {
  title: "",
  description: "",
  category: "General",
  audience: "Everyone",
  priority: "Normal",
  publishDate: new Date().toLocaleDateString("en-CA"),
  expiryDate: "",
}

const categories = [
  "General",
  "Academic",
  "Events",
  "Examination",
  "Holiday",
  "Meeting",
  "Staff",
]

const audiences = ["Everyone", "Students", "Teachers", "Parents", "Staff"]

const statusOptions = [
  "All Statuses",
  "Published",
  "Scheduled",
  "Draft",
  "Archived",
]

const priorityOptions = ["All Priorities", "Normal", "Important", "Urgent"]

function formatDate(date: string) {
  if (!date) return "—"

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function getStatusVariant(status: AnnouncementStatus) {
  switch (status) {
    case "Published":
      return "default" as const
    case "Scheduled":
      return "secondary" as const
    case "Draft":
      return "outline" as const
    case "Archived":
      return "secondary" as const
  }
}

function getPriorityVariant(priority: AnnouncementPriority) {
  switch (priority) {
    case "Urgent":
      return "destructive" as const
    case "Important":
      return "secondary" as const
    case "Normal":
      return "outline" as const
  }
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string
  value: string | number
  description: string
  icon: typeof Megaphone
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

function AnnouncementStatusBadge({ status }: { status: AnnouncementStatus }) {
  return <Badge variant={getStatusVariant(status)}>{status}</Badge>
}

function AnnouncementPriorityBadge({
  priority,
}: {
  priority: AnnouncementPriority
}) {
  return <Badge variant={getPriorityVariant(priority)}>{priority}</Badge>
}

export default function AnnouncementManagement() {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>(initialAnnouncements)

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Statuses")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [audienceFilter, setAudienceFilter] = useState("All Audiences")
  const [priorityFilter, setPriorityFilter] = useState("All Priorities")

  const [page, setPage] = useState(1)
  const pageSize = 5

  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<AnnouncementForm>(emptyForm)

  const [viewOpen, setViewOpen] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null)

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const today = new Date().toLocaleDateString("en-CA")

  const summary = useMemo(() => {
    const activeAnnouncements = announcements.filter(
      (item) => item.status !== "Archived"
    )

    return {
      total: activeAnnouncements.length,
      published: activeAnnouncements.filter(
        (item) => item.status === "Published"
      ).length,
      scheduled: activeAnnouncements.filter(
        (item) => item.status === "Scheduled"
      ).length,
      drafts: activeAnnouncements.filter((item) => item.status === "Draft")
        .length,
    }
  }, [announcements])

  const filteredAnnouncements = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return announcements.filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        item.title.toLowerCase().includes(normalizedSearch) ||
        item.description.toLowerCase().includes(normalizedSearch) ||
        item.category.toLowerCase().includes(normalizedSearch) ||
        item.audience.toLowerCase().includes(normalizedSearch) ||
        item.createdBy.toLowerCase().includes(normalizedSearch)

      const matchesStatus =
        statusFilter === "All Statuses" || item.status === statusFilter

      const matchesCategory =
        categoryFilter === "All Categories" || item.category === categoryFilter

      const matchesAudience =
        audienceFilter === "All Audiences" || item.audience === audienceFilter

      const matchesPriority =
        priorityFilter === "All Priorities" || item.priority === priorityFilter

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory &&
        matchesAudience &&
        matchesPriority
      )
    })
  }, [
    announcements,
    search,
    statusFilter,
    categoryFilter,
    audienceFilter,
    priorityFilter,
  ])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAnnouncements.length / pageSize)
  )

  const paginatedAnnouncements = filteredAnnouncements.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  function resetFilters() {
    setSearch("")
    setStatusFilter("All Statuses")
    setCategoryFilter("All Categories")
    setAudienceFilter("All Audiences")
    setPriorityFilter("All Priorities")
    setPage(1)
  }

  function openCreateDialog() {
    setEditingId(null)
    setForm({
      ...emptyForm,
      publishDate: new Date().toLocaleDateString("en-CA"),
    })
    setFormOpen(true)
  }

  function openEditDialog(announcement: Announcement) {
    setEditingId(announcement.id)
    setForm({
      title: announcement.title,
      description: announcement.description,
      category: announcement.category,
      audience: announcement.audience,
      priority: announcement.priority,
      publishDate: announcement.publishDate,
      expiryDate: announcement.expiryDate,
    })
    setFormOpen(true)
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Please enter an announcement title and description.")
      return
    }

    if (form.expiryDate && form.expiryDate < form.publishDate) {
      toast.error("Expiry date cannot be before the publish date.")
      return
    }

    if (editingId !== null) {
      setAnnouncements((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...form,
                title: form.title.trim(),
                description: form.description.trim(),
              }
            : item
        )
      )

      toast.success("Announcement updated successfully.")
    } else {
      const newAnnouncement: Announcement = {
        id: Math.max(0, ...announcements.map((item) => item.id)) + 1,
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        status: "Draft",
        createdBy: "Admin",
        createdAt: today,
      }

      setAnnouncements((current) => [newAnnouncement, ...current])
      setPage(1)
      toast.success("Announcement saved as draft.")
    }

    setFormOpen(false)
    setEditingId(null)
  }

  function publishAnnouncement(id: number) {
    const announcement = announcements.find((item) => item.id === id)
    if (!announcement) return

    if (announcement.status === "Archived") {
      toast.error("Restore the announcement before publishing it.")
      return
    }

    const nextStatus: AnnouncementStatus =
      announcement.publishDate > today ? "Scheduled" : "Published"

    setAnnouncements((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: nextStatus } : item
      )
    )

    toast.success(
      nextStatus === "Scheduled"
        ? "Announcement scheduled successfully."
        : "Announcement published successfully."
    )
  }

  function unpublishAnnouncement(id: number) {
    setAnnouncements((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: "Draft" } : item
      )
    )

    toast.success("Announcement moved to drafts.")
  }

  function archiveAnnouncement(id: number) {
    setAnnouncements((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: "Archived" } : item
      )
    )

    toast.success("Announcement archived successfully.")
  }

  function restoreAnnouncement(id: number) {
    setAnnouncements((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: "Draft" } : item
      )
    )

    toast.success("Announcement restored as draft.")
  }

  function confirmDelete() {
    if (deleteId === null) return

    setAnnouncements((current) =>
      current.filter((item) => item.id !== deleteId)
    )

    setDeleteOpen(false)
    setDeleteId(null)
    toast.success("Announcement deleted successfully.")
  }

  function exportCsv() {
    if (filteredAnnouncements.length === 0) {
      toast.error("There are no announcements to export.")
      return
    }

    const headers = [
      "ID",
      "Title",
      "Description",
      "Category",
      "Audience",
      "Priority",
      "Status",
      "Publish Date",
      "Expiry Date",
      "Created By",
    ]

    const escapeCsv = (value: string | number) =>
      `"${String(value).replace(/"/g, '""')}"`

    const rows = filteredAnnouncements.map((item) => [
      item.id,
      item.title,
      item.description,
      item.category,
      item.audience,
      item.priority,
      item.status,
      item.publishDate,
      item.expiryDate,
      item.createdBy,
    ])

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\r\n")

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "school-announcements.csv"
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)

    toast.success("Announcements exported successfully.")
  }

  function viewAnnouncement(announcement: Announcement) {
    setSelectedAnnouncement(announcement)
    setViewOpen(true)
  }

  function updateForm<K extends keyof AnnouncementForm>(
    key: K,
    value: AnnouncementForm[K]
  ) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function clearDeleteDialog() {
    setDeleteOpen(false)
    setDeleteId(null)
  }

  return (
    <section className="w-full min-w-0 space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>AY 2026–2027</span>
            <span>•</span>
            <span>School Administration</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Announcement Management
          </h1>

          <p className="text-sm text-muted-foreground">
            Create, manage, and publish important school announcements.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={exportCsv}>
            <FileText className="mr-2 size-4" />
            Export CSV
          </Button>

          <Button onClick={openCreateDialog}>
            <Plus className="mr-2 size-4" />
            Create Announcement
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Announcements"
          value={summary.total}
          description="Active announcements"
          icon={Megaphone}
        />

        <SummaryCard
          title="Published"
          value={summary.published}
          description="Currently published"
          icon={CheckCircle2}
        />

        <SummaryCard
          title="Scheduled"
          value={summary.scheduled}
          description="Awaiting publication"
          icon={Clock3}
        />

        <SummaryCard
          title="Drafts"
          value={summary.drafts}
          description="Not yet published"
          icon={FileText}
        />
      </div>

      {/* Overview */}
      <Card className="gap-0 py-0">
        <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="space-y-1">
            <h2 className="font-semibold tracking-tight">
              Announcement Overview
            </h2>
            <p className="text-sm text-muted-foreground">
              Review publication status and manage school communications.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="size-4" />
            <span>{announcements.length} total records</span>
          </div>
        </div>

        <CardContent className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 sm:p-5">
          <div className="flex items-start gap-3 rounded-lg border p-4">
            <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
              <Send className="size-5" />
            </div>
            <div className="min-w-0 space-y-1">
              <p className="text-sm font-medium">School-wide Updates</p>
              <p className="text-xs text-muted-foreground">
                Share notices with the entire school community.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border p-4">
            <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
              <CalendarDays className="size-5" />
            </div>
            <div className="min-w-0 space-y-1">
              <p className="text-sm font-medium">Scheduled Notices</p>
              <p className="text-xs text-muted-foreground">
                Prepare announcements for future publication.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border p-4">
            <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
              <Bell className="size-5" />
            </div>
            <div className="min-w-0 space-y-1">
              <p className="text-sm font-medium">Priority Notices</p>
              <p className="text-xs text-muted-foreground">
                Highlight important and urgent school information.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Announcement directory */}
      <Card className="min-w-0 gap-0 py-0">
        <div className="space-y-4 border-b p-4 sm:p-5">
          <div className="space-y-1">
            <h2 className="font-semibold tracking-tight">
              Announcement Directory
            </h2>
            <p className="text-sm text-muted-foreground">
              Search announcements, filter records, and manage publication.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <div className="relative min-w-0">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                  setPage(1)
                }}
                placeholder="Search announcements..."
                className="pl-9"
                aria-label="Search announcements"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value)
                setPage(1)
              }}
              className="h-9 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Filter by status"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={categoryFilter}
              onChange={(event) => {
                setCategoryFilter(event.target.value)
                setPage(1)
              }}
              className="h-9 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Filter by category"
            >
              {["All Categories", ...categories].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={audienceFilter}
              onChange={(event) => {
                setAudienceFilter(event.target.value)
                setPage(1)
              }}
              className="h-9 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Filter by audience"
            >
              {["All Audiences", ...audiences].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={priorityFilter}
              onChange={(event) => {
                setPriorityFilter(event.target.value)
                setPage(1)
              }}
              className="h-9 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Filter by priority"
            >
              {priorityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <Button variant="outline" onClick={resetFilters}>
              <X className="mr-2 size-4" />
              Clear Filters
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
            <span>
              Showing{" "}
              {filteredAnnouncements.length === 0
                ? 0
                : (page - 1) * pageSize + 1}
              {"–"}
              {Math.min(page * pageSize, filteredAnnouncements.length)} of{" "}
              {filteredAnnouncements.length} announcements
            </span>

            <span>
              {filteredAnnouncements.length !== announcements.length
                ? "Filtered results"
                : "All announcements"}
            </span>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors">
                <th className="h-11 min-w-[240px] px-4 text-left align-middle font-medium text-muted-foreground sm:px-5">
                  Announcement
                </th>
                <th className="h-11 px-4 text-left align-middle font-medium whitespace-nowrap text-muted-foreground">
                  Audience
                </th>
                <th className="h-11 px-4 text-left align-middle font-medium whitespace-nowrap text-muted-foreground">
                  Priority
                </th>
                <th className="h-11 px-4 text-left align-middle font-medium whitespace-nowrap text-muted-foreground">
                  Publish Date
                </th>
                <th className="h-11 px-4 text-left align-middle font-medium whitespace-nowrap text-muted-foreground">
                  Status
                </th>
                <th className="h-11 px-4 text-right align-middle font-medium whitespace-nowrap text-muted-foreground sm:px-5">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="[&_tr:last-child]:border-0">
              {paginatedAnnouncements.map((announcement) => (
                <tr
                  key={announcement.id}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  <td className="max-w-[320px] px-4 py-4 align-middle sm:px-5">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="mt-0.5 shrink-0 rounded-lg bg-primary/10 p-2 text-primary">
                        <Megaphone className="size-4" />
                      </div>

                      <div className="min-w-0 space-y-1">
                        <button
                          type="button"
                          onClick={() => viewAnnouncement(announcement)}
                          className="block max-w-full truncate text-left font-medium hover:underline"
                          title={announcement.title}
                        >
                          {announcement.title}
                        </button>

                        <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">
                          {announcement.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <Badge variant="outline">
                            {announcement.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            By {announcement.createdBy}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 align-middle whitespace-nowrap">
                    <span className="text-sm">{announcement.audience}</span>
                  </td>

                  <td className="px-4 py-4 align-middle whitespace-nowrap">
                    <AnnouncementPriorityBadge
                      priority={announcement.priority}
                    />
                  </td>

                  <td className="px-4 py-4 align-middle whitespace-nowrap">
                    <div className="space-y-1">
                      <p>{formatDate(announcement.publishDate)}</p>
                      <p className="text-xs text-muted-foreground">
                        Expires {formatDate(announcement.expiryDate)}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-4 align-middle whitespace-nowrap">
                    <AnnouncementStatusBadge status={announcement.status} />
                  </td>

                  <td className="px-4 py-4 align-middle sm:px-5">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => viewAnnouncement(announcement)}
                        title="View announcement"
                        aria-label="View announcement"
                      >
                        <Eye className="size-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(announcement)}
                        title="Edit announcement"
                        aria-label="Edit announcement"
                      >
                        <Pencil className="size-4" />
                      </Button>

                      {announcement.status === "Published" ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => unpublishAnnouncement(announcement.id)}
                          title="Move to drafts"
                          aria-label="Move announcement to drafts"
                        >
                          <FileText className="size-4" />
                        </Button>
                      ) : announcement.status === "Archived" ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => restoreAnnouncement(announcement.id)}
                          title="Restore announcement"
                          aria-label="Restore announcement"
                        >
                          <Archive className="size-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => publishAnnouncement(announcement.id)}
                          title="Publish announcement"
                          aria-label="Publish announcement"
                        >
                          <Send className="size-4" />
                        </Button>
                      )}

                      {announcement.status !== "Archived" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => archiveAnnouncement(announcement.id)}
                          title="Archive announcement"
                          aria-label="Archive announcement"
                        >
                          <Archive className="size-4" />
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setDeleteId(announcement.id)
                          setDeleteOpen(true)
                        }}
                        title="Delete announcement"
                        aria-label="Delete announcement"
                      >
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {paginatedAnnouncements.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <div className="mx-auto flex max-w-sm flex-col items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-3 text-primary">
                        <Megaphone className="size-5" />
                      </div>

                      <p className="font-medium">No announcements found</p>
                      <p className="text-sm text-muted-foreground">
                        Try changing your search or filters, or create a new
                        announcement.
                      </p>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetFilters}
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

        {/* Pagination */}
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

      {/* Create / Edit Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingId !== null ? "Edit Announcement" : "Create Announcement"}
            </DialogTitle>

            <DialogDescription>
              Add the announcement details and choose who should receive it.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="announcement-title"
                className="text-sm font-medium"
              >
                Announcement Title *
              </label>

              <Input
                id="announcement-title"
                value={form.title}
                onChange={(event) => updateForm("title", event.target.value)}
                placeholder="Enter announcement title"
                maxLength={150}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="announcement-description"
                className="text-sm font-medium"
              >
                Description *
              </label>

              <textarea
                id="announcement-description"
                value={form.description}
                onChange={(event) =>
                  updateForm("description", event.target.value)
                }
                placeholder="Write the announcement details..."
                rows={5}
                maxLength={5000}
                required
                className="flex min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              />

              <p className="text-right text-xs text-muted-foreground">
                {form.description.length}/5000 characters
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="announcement-category"
                  className="text-sm font-medium"
                >
                  Category
                </label>

                <select
                  id="announcement-category"
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
                  htmlFor="announcement-audience"
                  className="text-sm font-medium"
                >
                  Target Audience
                </label>

                <select
                  id="announcement-audience"
                  value={form.audience}
                  onChange={(event) =>
                    updateForm("audience", event.target.value)
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
                <label
                  htmlFor="announcement-priority"
                  className="text-sm font-medium"
                >
                  Priority
                </label>

                <select
                  id="announcement-priority"
                  value={form.priority}
                  onChange={(event) =>
                    updateForm(
                      "priority",
                      event.target.value as AnnouncementPriority
                    )
                  }
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="Normal">Normal</option>
                  <option value="Important">Important</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="announcement-publish-date"
                  className="text-sm font-medium"
                >
                  Publish Date
                </label>

                <Input
                  id="announcement-publish-date"
                  type="date"
                  value={form.publishDate}
                  onChange={(event) =>
                    updateForm("publishDate", event.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor="announcement-expiry-date"
                  className="text-sm font-medium"
                >
                  Expiry Date
                </label>

                <Input
                  id="announcement-expiry-date"
                  type="date"
                  min={form.publishDate || undefined}
                  value={form.expiryDate}
                  onChange={(event) =>
                    updateForm("expiryDate", event.target.value)
                  }
                />

                <p className="text-xs text-muted-foreground">
                  Optional. Leave blank if the announcement has no expiry date.
                </p>
              </div>
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
                {editingId !== null ? "Save Changes" : "Save as Draft"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Announcement Preview */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          {selectedAnnouncement && (
            <>
              <DialogHeader>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant="outline">
                    {selectedAnnouncement.category}
                  </Badge>

                  <AnnouncementStatusBadge
                    status={selectedAnnouncement.status}
                  />

                  <AnnouncementPriorityBadge
                    priority={selectedAnnouncement.priority}
                  />
                </div>

                <DialogTitle className="text-xl">
                  {selectedAnnouncement.title}
                </DialogTitle>

                <DialogDescription>
                  Published for {selectedAnnouncement.audience.toLowerCase()}.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <p className="text-sm leading-6 whitespace-pre-wrap">
                    {selectedAnnouncement.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">
                      Publish Date
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      {formatDate(selectedAnnouncement.publishDate)}
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Expiry Date</p>
                    <p className="mt-1 text-sm font-medium">
                      {formatDate(selectedAnnouncement.expiryDate)}
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Created By</p>
                    <p className="mt-1 text-sm font-medium">
                      {selectedAnnouncement.createdBy}
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Created On</p>
                    <p className="mt-1 text-sm font-medium">
                      {formatDate(selectedAnnouncement.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setViewOpen(false)}>
                  Close
                </Button>

                <Button
                  onClick={() => {
                    setViewOpen(false)
                    openEditDialog(selectedAnnouncement)
                  }}
                >
                  <Pencil className="mr-2 size-4" />
                  Edit Announcement
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          if (!open) clearDeleteDialog()
          else setDeleteOpen(true)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete announcement?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. The announcement will be permanently
              removed from this demo directory.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={clearDeleteDialog}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={confirmDelete}
              className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
            >
              Delete Announcement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}
