import { useMemo, useState } from "react"
import {
  BookOpen,
  CalendarDays,
  Download,
  FileText,
  FileVideo,
  FileSpreadsheet,
  Search,
  Presentation,
  UserRound,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Toaster, toast } from "sonner"

type MaterialType = "PDF" | "Video" | "Document" | "Presentation"

type Material = {
  id: number
  title: string
  subject: string
  code: string
  teacher: string
  type: MaterialType
  uploadedAt: string
  size: string
  description: string
  fileUrl?: string
}

const materials: Material[] = [
  {
    id: 1,
    title: "Introduction to Algebra",
    subject: "Mathematics",
    code: "MAT101",
    teacher: "Mr. Kumar",
    type: "PDF",
    uploadedAt: "2026-10-25",
    size: "2.4 MB",
    description: "Basic algebra concepts, equations, and worked examples.",
  },
  {
    id: 2,
    title: "React Fundamentals",
    subject: "Computer Science",
    code: "CS201",
    teacher: "Mrs. Priya",
    type: "Video",
    uploadedAt: "2026-10-24",
    size: "45 min",
    description: "Introduction to React components, props, and state.",
  },
  {
    id: 3,
    title: "Fundamentals of Electronics",
    subject: "Electronics",
    code: "EC301",
    teacher: "Mr. Rajesh",
    type: "PDF",
    uploadedAt: "2026-10-23",
    size: "3.1 MB",
    description: "Electronic components, circuits, and basic principles.",
  },
  {
    id: 4,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    code: "PHY101",
    teacher: "Mrs. Anitha",
    type: "Document",
    uploadedAt: "2026-10-22",
    size: "1.2 MB",
    description: "Notes and examples covering the three laws of motion.",
  },
  {
    id: 5,
    title: "Data Structures Notes",
    subject: "Computer Science",
    code: "CS202",
    teacher: "Mr. Arjun",
    type: "PDF",
    uploadedAt: "2026-10-20",
    size: "4.5 MB",
    description: "Arrays, linked lists, stacks, queues, and trees.",
  },
  {
    id: 6,
    title: "Digital Logic Design",
    subject: "Electronics",
    code: "EC302",
    teacher: "Mrs. Meena",
    type: "Presentation",
    uploadedAt: "2026-10-18",
    size: "5.6 MB",
    description: "Logic gates, Boolean algebra, and digital circuits.",
  },
]

const subjects = [
  "All Subjects",
  "Mathematics",
  "Computer Science",
  "Electronics",
  "Physics",
] as const

const types = ["All Types", "PDF", "Video", "Document", "Presentation"] as const

type SubjectFilter = (typeof subjects)[number]
type TypeFilter = (typeof types)[number]

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function getMaterialIcon(type: MaterialType) {
  switch (type) {
    case "PDF":
      return FileText
    case "Video":
      return FileVideo
    case "Document":
      return FileSpreadsheet
    case "Presentation":
      return Presentation
  }
}

export default function MaterialsPage() {
  const [search, setSearch] = useState("")
  const [activeSubject, setActiveSubject] =
    useState<SubjectFilter>("All Subjects")
  const [activeType, setActiveType] = useState<TypeFilter>("All Types")
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null
  )

  const pdfCount = materials.filter((item) => item.type === "PDF").length
  const videoCount = materials.filter((item) => item.type === "Video").length

  const filteredMaterials = useMemo(() => {
    const query = search.trim().toLowerCase()

    return materials.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.subject.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query) ||
        item.teacher.toLowerCase().includes(query)

      const matchesSubject =
        activeSubject === "All Subjects" || item.subject === activeSubject

      const matchesType = activeType === "All Types" || item.type === activeType

      return matchesSearch && matchesSubject && matchesType
    })
  }, [search, activeSubject, activeType])

  function handleViewMaterial(material: Material) {
    setSelectedMaterial(material)
  }

  function handleDownloadMaterial(material: Material) {
    if (!material.fileUrl) {
      toast.error(
        `No downloadable file is available for "${material.title}" yet.`
      )
      return
    }

    const link = document.createElement("a")
    link.href = material.fileUrl
    link.download = material.title
    link.target = "_blank"
    link.rel = "noopener noreferrer"

    document.body.appendChild(link)
    link.click()
    link.remove()

    toast.success("Download started successfully!")
  }

  return (
    <>
      {/* Toast notifications */}
      <Toaster position="justify-center" richColors />

      <main className="w-full min-w-0 space-y-5 overflow-x-hidden bg-background p-3 sm:space-y-6 sm:p-5 lg:p-8">
        {/* Page heading */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Study Materials
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Access your course notes, videos, and learning resources.
            </p>
          </div>

          <Badge variant="outline" className="w-fit px-3 py-1">
            Academic Year 2026–27
          </Badge>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          <Card className="min-w-0 gap-0 py-0">
            <CardContent className="flex items-start gap-3 p-3 sm:p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                <BookOpen className="size-5 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                  Total Materials
                </p>
                <p className="mt-1 text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">
                  {materials.length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="min-w-0 gap-0 py-0">
            <CardContent className="flex items-start gap-3 p-3 sm:p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                <FileText className="size-5 text-red-600" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                  PDF Notes
                </p>
                <p className="mt-1 text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">
                  {pdfCount}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="min-w-0 gap-0 py-0">
            <CardContent className="flex items-start gap-3 p-3 sm:p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                <FileVideo className="size-5 text-blue-600" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                  Video Lessons
                </p>
                <p className="mt-1 text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">
                  {videoCount}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="min-w-0 gap-0 py-0">
            <CardContent className="flex items-start gap-3 p-3 sm:p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                <BookOpen className="size-5 text-green-600" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                  Subjects
                </p>
                <p className="mt-1 text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">
                  {new Set(materials.map((item) => item.subject)).size}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and filters */}
        <Card className="min-w-0">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle>Learning Resources</CardTitle>
            <CardDescription>
              Search and filter materials by subject or file type.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 p-4 pt-0 sm:p-6 sm:pt-0">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search materials, subjects, or teachers..."
                className="h-10 pl-9"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <select
                  value={activeSubject}
                  onChange={(event) =>
                    setActiveSubject(event.target.value as SubjectFilter)
                  }
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Material Type</label>
                <select
                  value={activeType}
                  onChange={(event) =>
                    setActiveType(event.target.value as TypeFilter)
                  }
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
              <span>
                Showing {filteredMaterials.length} of {materials.length}{" "}
                materials
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearch("")
                  setActiveSubject("All Subjects")
                  setActiveType("All Types")
                }}
              >
                Clear filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Material cards */}
        {filteredMaterials.length === 0 ? (
          <div className="rounded-xl border border-dashed p-8 text-center">
            <Search className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-3 font-medium">No materials found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try another search term or change your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {filteredMaterials.map((material) => {
              const MaterialIcon = getMaterialIcon(material.type)

              return (
                <Card
                  key={material.id}
                  className="min-w-0 transition-shadow hover:shadow-sm"
                >
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 rounded-xl bg-primary/10 p-3">
                        <MaterialIcon className="size-6 text-primary" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h3 className="font-semibold break-words">
                            {material.title}
                          </h3>
                          <Badge variant="secondary">{material.type}</Badge>
                        </div>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {material.subject} · {material.code}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      {material.description}
                    </p>

                    <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <UserRound className="size-4 shrink-0" />
                        <span>{material.teacher}</span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CalendarDays className="size-4 shrink-0" />
                        <span>{formatDate(material.uploadedAt)}</span>
                      </div>

                      <div className="text-muted-foreground">
                        {material.type === "Video" ? "Duration" : "File size"}:{" "}
                        <span className="font-medium text-foreground">
                          {material.size}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-2 border-t pt-4 sm:flex-row sm:justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => handleViewMaterial(material)}
                      >
                        <BookOpen className="mr-2 size-4" />
                        View Material
                      </Button>

                      {material.type !== "Video" && (
                        <Button
                          type="button"
                          className="w-full sm:w-auto"
                          onClick={() => handleDownloadMaterial(material)}
                        >
                          <Download className="mr-2 size-4" />
                          Download
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Material viewing dialog */}
        <Dialog
          open={selectedMaterial !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedMaterial(null)
          }}
        >
          <DialogContent className="max-h-[85dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-xl">
            <DialogHeader>
              <DialogTitle>{selectedMaterial?.title}</DialogTitle>
              <DialogDescription>
                {selectedMaterial?.subject} · {selectedMaterial?.code}
              </DialogDescription>
            </DialogHeader>

            {selectedMaterial && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="mt-1 text-sm">{selectedMaterial.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Teacher</p>
                    <p className="font-medium">{selectedMaterial.teacher}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Material Type</p>
                    <p className="font-medium">{selectedMaterial.type}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Uploaded Date</p>
                    <p className="font-medium">
                      {formatDate(selectedMaterial.uploadedAt)}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">
                      {selectedMaterial.type === "Video"
                        ? "Duration"
                        : "File Size"}
                    </p>
                    <p className="font-medium">{selectedMaterial.size}</p>
                  </div>
                </div>

                {selectedMaterial.fileUrl ? (
                  selectedMaterial.type === "PDF" ? (
                    <iframe
                      src={selectedMaterial.fileUrl}
                      title={selectedMaterial.title}
                      className="h-[50dvh] w-full rounded-md border"
                    />
                  ) : selectedMaterial.type === "Video" ? (
                    <video
                      src={selectedMaterial.fileUrl}
                      controls
                      className="max-h-[50dvh] w-full rounded-md border"
                    />
                  ) : (
                    <a
                      href={selectedMaterial.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary underline"
                    >
                      Open material file
                    </a>
                  )
                ) : (
                  <div className="rounded-md border border-dashed p-6 text-center">
                    <FileText className="mx-auto size-8 text-muted-foreground" />
                    <p className="mt-2 font-medium">No file attached</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      An actual file URL is required to preview this material.
                    </p>
                  </div>
                )}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedMaterial(null)}
                >
                  Close
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </>
  )
}
