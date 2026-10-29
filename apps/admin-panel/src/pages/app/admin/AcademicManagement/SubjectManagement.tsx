// import { useMemo, useState, type FormEvent } from "react"
// import {
//   BookOpen,
//   BookPlus,
//   CheckCircle2,
//   ClipboardList,
//   GraduationCap,
//   Pencil,
//   Plus,
//   Search,
//   Trash2,
//   Users,
//   Eye,
//   AlertCircle,
// } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// type Status = "Active" | "Inactive"

// interface Subject {
//   id: string
//   name: string
//   code: string
//   description: string
//   status: Status
// }

// interface Assignment {
//   id: string
//   subjectId: string
//   classSection: string
//   teacher: string
//   academicYear: string
//   totalChapters: number
//   completedChapters: number
// }

// const initialSubjects: Subject[] = [
//   {
//     id: "sub-1",
//     name: "Mathematics",
//     code: "MAT001",
//     description: "Numbers, algebra, geometry and problem solving.",
//     status: "Active",
//   },
//   {
//     id: "sub-2",
//     name: "Science",
//     code: "SCI001",
//     description: "Physics, chemistry and biology fundamentals.",
//     status: "Active",
//   },
//   {
//     id: "sub-3",
//     name: "English",
//     code: "ENG001",
//     description: "Grammar, reading, writing and communication.",
//     status: "Active",
//   },
//   {
//     id: "sub-4",
//     name: "Social Studies",
//     code: "SOC001",
//     description: "History, geography and civics.",
//     status: "Active",
//   },
//   {
//     id: "sub-5",
//     name: "Computer Science",
//     code: "CS001",
//     description: "Computer fundamentals and programming basics.",
//     status: "Active",
//   },
// ]

// const initialAssignments: Assignment[] = [
//   {
//     id: "a-1",
//     subjectId: "sub-1",
//     classSection: "6-A",
//     teacher: "Mr. Kumar",
//     academicYear: "2026-2027",
//     totalChapters: 12,
//     completedChapters: 8,
//   },
//   {
//     id: "a-2",
//     subjectId: "sub-2",
//     classSection: "6-A",
//     teacher: "Mrs. Priya",
//     academicYear: "2026-2027",
//     totalChapters: 10,
//     completedChapters: 7,
//   },
//   {
//     id: "a-3",
//     subjectId: "sub-3",
//     classSection: "6-A",
//     teacher: "Ms. Anitha",
//     academicYear: "2026-2027",
//     totalChapters: 9,
//     completedChapters: 9,
//   },
//   {
//     id: "a-4",
//     subjectId: "sub-4",
//     classSection: "6-A",
//     teacher: "",
//     academicYear: "2026-2027",
//     totalChapters: 8,
//     completedChapters: 3,
//   },
//   {
//     id: "a-5",
//     subjectId: "sub-1",
//     classSection: "6-B",
//     teacher: "Mrs. Meena",
//     academicYear: "2026-2027",
//     totalChapters: 12,
//     completedChapters: 6,
//   },
//   {
//     id: "a-6",
//     subjectId: "sub-2",
//     classSection: "6-B",
//     teacher: "Mr. Rajesh",
//     academicYear: "2026-2027",
//     totalChapters: 10,
//     completedChapters: 5,
//   },
//   {
//     id: "a-7",
//     subjectId: "sub-1",
//     classSection: "7-A",
//     teacher: "Mr. Kumar",
//     academicYear: "2026-2027",
//     totalChapters: 14,
//     completedChapters: 9,
//   },
//   {
//     id: "a-8",
//     subjectId: "sub-5",
//     classSection: "8-A",
//     teacher: "Mr. Arjun",
//     academicYear: "2026-2027",
//     totalChapters: 6,
//     completedChapters: 2,
//   },
// ]

// const classOptions = [
//   "1-A",
//   "1-B",
//   "2-A",
//   "2-B",
//   "3-A",
//   "3-B",
//   "4-A",
//   "4-B",
//   "5-A",
//   "5-B",
//   "6-A",
//   "6-B",
//   "7-A",
//   "7-B",
//   "8-A",
//   "8-B",
//   "9-A",
//   "9-B",
//   "10-A",
//   "10-B",
//   "11-A",
//   "11-B",
//   "12-A",
//   "12-B",
// ]

// const teachers = [
//   "Mr. Kumar",
//   "Mrs. Priya",
//   "Ms. Anitha",
//   "Mr. Rajesh",
//   "Mrs. Meena",
//   "Mr. Arjun",
// ]

// const emptySubject = {
//   name: "",
//   code: "",
//   description: "",
//   status: "Active" as Status,
// }

// const emptyAssignment = {
//   subjectId: "",
//   classSection: "6-A",
//   teacher: "",
//   academicYear: "2026-2027",
//   totalChapters: 10,
//   completedChapters: 0,
// }

// export default function SubjectsManagement() {
//   const [subjects, setSubjects] = useState<Subject[]>(initialSubjects)
//   const [assignments, setAssignments] =
//     useState<Assignment[]>(initialAssignments)

//   const [activeTab, setActiveTab] = useState("subjects")
//   const [search, setSearch] = useState("")
//   const [classFilter, setClassFilter] = useState("all")
//   const [statusFilter, setStatusFilter] = useState("all")

//   const [subjectDialog, setSubjectDialog] = useState(false)
//   const [assignmentDialog, setAssignmentDialog] = useState(false)
//   const [viewDialog, setViewDialog] = useState(false)
//   const [deleteDialog, setDeleteDialog] = useState(false)

//   const [editingSubject, setEditingSubject] = useState<Subject | null>(null)
//   const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(
//     null
//   )
//   const [viewingAssignment, setViewingAssignment] = useState<Assignment | null>(
//     null
//   )
//   const [deletingSubject, setDeletingSubject] = useState<Subject | null>(null)

//   const [subjectForm, setSubjectForm] = useState({ ...emptySubject })
//   const [assignmentForm, setAssignmentForm] = useState({
//     ...emptyAssignment,
//   })
//   const [error, setError] = useState("")

//   const filteredSubjects = useMemo(() => {
//     const query = search.trim().toLowerCase()

//     return subjects.filter((subject) => {
//       const matchesSearch =
//         subject.name.toLowerCase().includes(query) ||
//         subject.code.toLowerCase().includes(query) ||
//         subject.description.toLowerCase().includes(query)

//       const matchesStatus =
//         statusFilter === "all" || subject.status === statusFilter

//       return matchesSearch && matchesStatus
//     })
//   }, [subjects, search, statusFilter])

//   const filteredAssignments = useMemo(() => {
//     const query = search.trim().toLowerCase()

//     return assignments.filter((assignment) => {
//       const subject = subjects.find((item) => item.id === assignment.subjectId)

//       const matchesSearch =
//         subject?.name.toLowerCase().includes(query) ||
//         subject?.code.toLowerCase().includes(query) ||
//         assignment.classSection.toLowerCase().includes(query) ||
//         assignment.teacher.toLowerCase().includes(query)

//       const matchesClass =
//         classFilter === "all" || assignment.classSection === classFilter

//       const matchesStatus =
//         statusFilter === "all" ||
//         (statusFilter === "Active" && subject?.status === "Active") ||
//         (statusFilter === "Inactive" && subject?.status === "Inactive")

//       return matchesSearch && matchesClass && matchesStatus
//     })
//   }, [assignments, subjects, search, classFilter, statusFilter])

//   const totalChapters = assignments.reduce(
//     (total, item) => total + item.totalChapters,
//     0
//   )

//   const completedChapters = assignments.reduce(
//     (total, item) => total + item.completedChapters,
//     0
//   )

//   const progress =
//     totalChapters > 0
//       ? Math.round((completedChapters / totalChapters) * 100)
//       : 0

//   const teacherCount = new Set(
//     assignments.map((item) => item.teacher).filter(Boolean)
//   ).size

//   const unassignedCount = assignments.filter(
//     (item) => !item.teacher.trim()
//   ).length

//   function openCreateSubject() {
//     setEditingSubject(null)
//     setSubjectForm({ ...emptySubject })
//     setError("")
//     setSubjectDialog(true)
//   }

//   function openEditSubject(subject: Subject) {
//     setEditingSubject(subject)
//     setSubjectForm({
//       name: subject.name,
//       code: subject.code,
//       description: subject.description,
//       status: subject.status,
//     })
//     setError("")
//     setSubjectDialog(true)
//   }

//   function saveSubject(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault()
//     setError("")

//     const name = subjectForm.name.trim()
//     const code = subjectForm.code.trim()

//     if (!name || !code) {
//       setError("Subject name and subject code are required.")
//       return
//     }

//     const duplicate = subjects.some(
//       (item) =>
//         item.id !== editingSubject?.id &&
//         (item.name.toLowerCase() === name.toLowerCase() ||
//           item.code.toLowerCase() === code.toLowerCase())
//     )

//     if (duplicate) {
//       setError("A subject with this name or code already exists.")
//       return
//     }

//     if (editingSubject) {
//       setSubjects((current) =>
//         current.map((item) =>
//           item.id === editingSubject.id
//             ? { ...item, ...subjectForm, name, code }
//             : item
//         )
//       )
//     } else {
//       setSubjects((current) => [
//         ...current,
//         {
//           id: crypto.randomUUID(),
//           ...subjectForm,
//           name,
//           code,
//         },
//       ])
//     }

//     setSubjectDialog(false)
//   }

//   function openCreateAssignment() {
//     setEditingAssignment(null)
//     setAssignmentForm({
//       ...emptyAssignment,
//       subjectId: subjects.find((item) => item.status === "Active")?.id ?? "",
//     })
//     setError("")
//     setAssignmentDialog(true)
//   }

//   function openEditAssignment(assignment: Assignment) {
//     setEditingAssignment(assignment)
//     setAssignmentForm({
//       subjectId: assignment.subjectId,
//       classSection: assignment.classSection,
//       teacher: assignment.teacher,
//       academicYear: assignment.academicYear,
//       totalChapters: assignment.totalChapters,
//       completedChapters: assignment.completedChapters,
//     })
//     setError("")
//     setAssignmentDialog(true)
//   }

//   function saveAssignment(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault()
//     setError("")

//     if (!assignmentForm.subjectId) {
//       setError("Please select a subject.")
//       return
//     }

//     if (
//       !Number.isInteger(assignmentForm.totalChapters) ||
//       assignmentForm.totalChapters < 1 ||
//       !Number.isInteger(assignmentForm.completedChapters) ||
//       assignmentForm.completedChapters < 0 ||
//       assignmentForm.completedChapters > assignmentForm.totalChapters
//     ) {
//       setError(
//         "Enter valid chapter counts. Completed chapters cannot exceed total chapters."
//       )
//       return
//     }

//     const duplicate = assignments.some(
//       (item) =>
//         item.id !== editingAssignment?.id &&
//         item.subjectId === assignmentForm.subjectId &&
//         item.classSection === assignmentForm.classSection &&
//         item.academicYear === assignmentForm.academicYear
//     )

//     if (duplicate) {
//       setError(
//         "This subject is already assigned to that class for this academic year."
//       )
//       return
//     }

//     if (editingAssignment) {
//       setAssignments((current) =>
//         current.map((item) =>
//           item.id === editingAssignment.id
//             ? { ...assignmentForm, id: editingAssignment.id }
//             : item
//         )
//       )
//     } else {
//       setAssignments((current) => [
//         ...current,
//         { ...assignmentForm, id: crypto.randomUUID() },
//       ])
//     }

//     setAssignmentDialog(false)
//   }

//   function deleteSubject() {
//     if (!deletingSubject) return

//     setSubjects((current) =>
//       current.filter((item) => item.id !== deletingSubject.id)
//     )

//     setAssignments((current) =>
//       current.filter((item) => item.subjectId !== deletingSubject.id)
//     )

//     setDeletingSubject(null)
//     setDeleteDialog(false)
//   }

//   function subjectName(subjectId: string) {
//     return subjects.find((item) => item.id === subjectId)?.name ?? "Unavailable"
//   }

//   function subjectCode(subjectId: string) {
//     return subjects.find((item) => item.id === subjectId)?.code ?? "—"
//   }

//   function subjectStatus(subjectId: string) {
//     return subjects.find((item) => item.id === subjectId)?.status ?? "Inactive"
//   }

//   function progressFor(assignment: Assignment) {
//     return assignment.totalChapters > 0
//       ? Math.round(
//           (assignment.completedChapters / assignment.totalChapters) * 100
//         )
//       : 0
//   }

//   return (
//     <div className="min-h-screen space-y-6 bg-background p-4 md:p-6 lg:p-8">
//       {/* Heading */}
//       <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//         <div className="space-y-1">
//           <p className="text-sm font-medium text-muted-foreground">
//             ACADEMIC YEAR 2026–2027
//           </p>
//           <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
//             Subject Management
//           </h1>
//           <p className="text-sm text-muted-foreground">
//             Manage school subjects, class assignments, teachers and syllabus.
//           </p>
//         </div>

//         <Button
//           onClick={() => {
//             if (activeTab === "subjects") {
//               openCreateSubject()
//             } else {
//               openCreateAssignment()
//             }
//           }}
//           className="gap-2"
//         >
//           <Plus className="size-4" />
//           {activeTab === "subjects" ? "Add Subject" : "Assign Subject"}
//         </Button>
//       </div>

//       {/* Summary cards */}
//       <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         <Card>
//           <CardContent className="flex items-center justify-between p-5">
//             <div className="space-y-1">
//               <p className="text-sm text-muted-foreground">Total Subjects</p>
//               <p className="text-2xl font-bold">
//                 {subjects.filter((item) => item.status === "Active").length}
//               </p>
//               <p className="text-xs text-muted-foreground">
//                 Active school subjects
//               </p>
//             </div>
//             <div className="rounded-lg bg-primary/10 p-3">
//               <BookOpen className="size-6 text-primary" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="flex items-center justify-between p-5">
//             <div className="space-y-1">
//               <p className="text-sm text-muted-foreground">Class Assignments</p>
//               <p className="text-2xl font-bold">{assignments.length}</p>
//               <p className="text-xs text-muted-foreground">
//                 Subject-to-class mappings
//               </p>
//             </div>
//             <div className="rounded-lg bg-blue-500/10 p-3">
//               <GraduationCap className="size-6 text-blue-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="flex items-center justify-between p-5">
//             <div className="space-y-1">
//               <p className="text-sm text-muted-foreground">Teachers Needed</p>
//               <p className="text-2xl font-bold">{unassignedCount}</p>
//               <p className="text-xs text-muted-foreground">
//                 Assignments without teachers
//               </p>
//             </div>
//             <div className="rounded-lg bg-amber-500/10 p-3">
//               <Users className="size-6 text-amber-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="flex items-center justify-between p-5">
//             <div className="space-y-1">
//               <p className="text-sm text-muted-foreground">Syllabus Progress</p>
//               <p className="text-2xl font-bold">{progress}%</p>
//               <p className="text-xs text-muted-foreground">
//                 {completedChapters} of {totalChapters} chapters
//               </p>
//             </div>
//             <div className="rounded-lg bg-emerald-500/10 p-3">
//               <ClipboardList className="size-6 text-emerald-600" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Tabs */}
//       <Tabs
//         value={activeTab}
//         onValueChange={setActiveTab}
//         className="space-y-5"
//       >
//         <TabsList className="grid h-auto w-full grid-cols-2 gap-1 sm:grid-cols-4">
//           <TabsTrigger value="subjects" className="gap-2 py-2">
//             <BookOpen className="size-4" />
//             All Subjects
//           </TabsTrigger>
//           <TabsTrigger value="assignments" className="gap-2 py-2">
//             <GraduationCap className="size-4" />
//             Class Assignments
//           </TabsTrigger>
//           <TabsTrigger value="teachers" className="gap-2 py-2">
//             <Users className="size-4" />
//             Teacher Assignments
//           </TabsTrigger>
//           <TabsTrigger value="syllabus" className="gap-2 py-2">
//             <ClipboardList className="size-4" />
//             Syllabus Tracking
//           </TabsTrigger>
//         </TabsList>

//         {/* Shared filters */}
//         <Card>
//           <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
//             <div>
//               <h2 className="font-semibold">
//                 {activeTab === "subjects"
//                   ? "Subject Directory"
//                   : activeTab === "assignments"
//                     ? "Class Subject Mapping"
//                     : activeTab === "teachers"
//                       ? "Teacher Assignments"
//                       : "Syllabus Progress"}
//               </h2>
//               <p className="mt-1 text-sm text-muted-foreground">
//                 {activeTab === "subjects"
//                   ? "Create and maintain the school's subject directory."
//                   : "Search and monitor subjects assigned to each class section."}
//               </p>
//             </div>

//             <div className="flex flex-col gap-2 sm:flex-row">
//               <div className="relative sm:w-60">
//                 <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   value={search}
//                   onChange={(event) => setSearch(event.target.value)}
//                   placeholder="Search subjects, classes..."
//                   className="pl-9"
//                 />
//               </div>

//               {activeTab !== "subjects" && (
//                 <Select value={classFilter} onValueChange={setClassFilter}>
//                   <SelectTrigger className="sm:w-36">
//                     <SelectValue placeholder="All classes" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All classes</SelectItem>
//                     {classOptions.map((item) => (
//                       <SelectItem key={item} value={item}>
//                         Class {item}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               )}

//               <Select value={statusFilter} onValueChange={setStatusFilter}>
//                 <SelectTrigger className="sm:w-36">
//                   <SelectValue placeholder="All statuses" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All statuses</SelectItem>
//                   <SelectItem value="Active">Active</SelectItem>
//                   <SelectItem value="Inactive">Inactive</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <CardContent className="p-0">
//             {/* All Subjects */}
//             <TabsContent value="subjects" className="m-0">
//               <div className="overflow-x-auto">
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Subject</TableHead>
//                       <TableHead>Subject Code</TableHead>
//                       <TableHead>Description</TableHead>
//                       <TableHead>Classes</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead className="text-right">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {filteredSubjects.map((subject) => (
//                       <TableRow key={subject.id}>
//                         <TableCell>
//                           <div className="flex items-center gap-3">
//                             <div className="rounded-lg bg-primary/10 p-2.5">
//                               <BookOpen className="size-5 text-primary" />
//                             </div>
//                             <span className="font-medium whitespace-nowrap">
//                               {subject.name}
//                             </span>
//                           </div>
//                         </TableCell>
//                         <TableCell className="font-mono text-sm">
//                           {subject.code}
//                         </TableCell>
//                         <TableCell className="max-w-xs min-w-48 text-sm text-muted-foreground">
//                           {subject.description || "No description"}
//                         </TableCell>
//                         <TableCell>
//                           {
//                             new Set(
//                               assignments
//                                 .filter((item) => item.subjectId === subject.id)
//                                 .map((item) => item.classSection)
//                             ).size
//                           }{" "}
//                           sections
//                         </TableCell>
//                         <TableCell>
//                           <Badge
//                             variant={
//                               subject.status === "Active"
//                                 ? "default"
//                                 : "secondary"
//                             }
//                           >
//                             {subject.status}
//                           </Badge>
//                         </TableCell>
//                         <TableCell>
//                           <div className="flex justify-end gap-1">
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               title="View assignments"
//                               onClick={() => {
//                                 setSearch(subject.name)
//                                 setActiveTab("assignments")
//                               }}
//                             >
//                               <Eye className="size-4" />
//                             </Button>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               title="Edit subject"
//                               onClick={() => openEditSubject(subject)}
//                             >
//                               <Pencil className="size-4" />
//                             </Button>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               title="Delete subject"
//                               onClick={() => {
//                                 setDeletingSubject(subject)
//                                 setDeleteDialog(true)
//                               }}
//                             >
//                               <Trash2 className="size-4 text-destructive" />
//                             </Button>
//                           </div>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                     {filteredSubjects.length === 0 && (
//                       <TableRow>
//                         <TableCell colSpan={6} className="h-28 text-center">
//                           No subjects found.
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </TableBody>
//                 </Table>
//               </div>
//             </TabsContent>

//             {/* Class Assignments */}
//             <TabsContent value="assignments" className="m-0">
//               <div className="overflow-x-auto">
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Subject</TableHead>
//                       <TableHead>Class & Section</TableHead>
//                       <TableHead>Academic Year</TableHead>
//                       <TableHead>Teacher</TableHead>
//                       <TableHead>Chapters</TableHead>
//                       <TableHead className="text-right">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {filteredAssignments.map((item) => (
//                       <TableRow key={item.id}>
//                         <TableCell>
//                           <p className="font-medium">
//                             {subjectName(item.subjectId)}
//                           </p>
//                           <p className="text-xs text-muted-foreground">
//                             {subjectCode(item.subjectId)}
//                           </p>
//                         </TableCell>
//                         <TableCell>
//                           <Badge variant="outline">
//                             Class {item.classSection}
//                           </Badge>
//                         </TableCell>
//                         <TableCell>{item.academicYear}</TableCell>
//                         <TableCell>
//                           {item.teacher || (
//                             <Badge variant="destructive">Not assigned</Badge>
//                           )}
//                         </TableCell>
//                         <TableCell>
//                           {item.completedChapters}/{item.totalChapters}
//                         </TableCell>
//                         <TableCell>
//                           <div className="flex justify-end gap-1">
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               title="View details"
//                               onClick={() => {
//                                 setViewingAssignment(item)
//                                 setViewDialog(true)
//                               }}
//                             >
//                               <Eye className="size-4" />
//                             </Button>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               title="Edit assignment"
//                               onClick={() => openEditAssignment(item)}
//                             >
//                               <Pencil className="size-4" />
//                             </Button>
//                           </div>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                     {filteredAssignments.length === 0 && (
//                       <TableRow>
//                         <TableCell colSpan={6} className="h-28 text-center">
//                           No class assignments found.
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </TableBody>
//                 </Table>
//               </div>
//             </TabsContent>

//             {/* Teacher Assignments */}
//             <TabsContent value="teachers" className="m-0">
//               <div className="overflow-x-auto">
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Teacher</TableHead>
//                       <TableHead>Subject</TableHead>
//                       <TableHead>Class</TableHead>
//                       <TableHead>Academic Year</TableHead>
//                       <TableHead>Assignment Status</TableHead>
//                       <TableHead className="text-right">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {filteredAssignments.map((item) => (
//                       <TableRow key={item.id}>
//                         <TableCell className="font-medium">
//                           {item.teacher || "Unassigned"}
//                         </TableCell>
//                         <TableCell>{subjectName(item.subjectId)}</TableCell>
//                         <TableCell>Class {item.classSection}</TableCell>
//                         <TableCell>{item.academicYear}</TableCell>
//                         <TableCell>
//                           {item.teacher ? (
//                             <Badge variant="default">
//                               <CheckCircle2 className="mr-1 size-3" />
//                               Assigned
//                             </Badge>
//                           ) : (
//                             <Badge variant="destructive">
//                               <AlertCircle className="mr-1 size-3" />
//                               Needs teacher
//                             </Badge>
//                           )}
//                         </TableCell>
//                         <TableCell>
//                           <div className="flex justify-end">
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() => openEditAssignment(item)}
//                             >
//                               <Pencil className="mr-2 size-4" />
//                               Assign
//                             </Button>
//                           </div>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                     {filteredAssignments.length === 0 && (
//                       <TableRow>
//                         <TableCell colSpan={6} className="h-28 text-center">
//                           No teacher assignments found.
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </TableBody>
//                 </Table>
//               </div>
//             </TabsContent>

//             {/* Syllabus Tracking */}
//             <TabsContent value="syllabus" className="m-0">
//               <div className="space-y-4 p-4">
//                 <div className="rounded-xl border p-4">
//                   <div className="flex items-center justify-between gap-3">
//                     <div>
//                       <p className="text-sm text-muted-foreground">
//                         Overall syllabus completion
//                       </p>
//                       <p className="mt-1 text-2xl font-bold">{progress}%</p>
//                     </div>
//                     <ClipboardList className="size-8 text-primary" />
//                   </div>
//                   <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted">
//                     <div
//                       className="h-full rounded-full bg-primary transition-all"
//                       style={{ width: `${progress}%` }}
//                     />
//                   </div>
//                   <p className="mt-2 text-xs text-muted-foreground">
//                     {completedChapters} completed out of {totalChapters} total
//                     chapter assignments.
//                   </p>
//                 </div>

//                 <div className="overflow-x-auto">
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>Subject</TableHead>
//                         <TableHead>Class</TableHead>
//                         <TableHead>Teacher</TableHead>
//                         <TableHead>Chapters Completed</TableHead>
//                         <TableHead>Progress</TableHead>
//                         <TableHead className="text-right">Actions</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {filteredAssignments.map((item) => {
//                         const percentage = progressFor(item)

//                         return (
//                           <TableRow key={item.id}>
//                             <TableCell className="font-medium">
//                               {subjectName(item.subjectId)}
//                             </TableCell>
//                             <TableCell>Class {item.classSection}</TableCell>
//                             <TableCell>
//                               {item.teacher || "Unassigned"}
//                             </TableCell>
//                             <TableCell>
//                               {item.completedChapters} of {item.totalChapters}
//                             </TableCell>
//                             <TableCell className="min-w-36">
//                               <div className="space-y-2">
//                                 <div className="flex justify-between text-xs">
//                                   <span>{percentage}%</span>
//                                   <span className="text-muted-foreground">
//                                     {item.totalChapters -
//                                       item.completedChapters}{" "}
//                                     remaining
//                                   </span>
//                                 </div>
//                                 <div className="h-2 overflow-hidden rounded-full bg-muted">
//                                   <div
//                                     className="h-full rounded-full bg-primary"
//                                     style={{ width: `${percentage}%` }}
//                                   />
//                                 </div>
//                               </div>
//                             </TableCell>
//                             <TableCell>
//                               <div className="flex justify-end">
//                                 <Button
//                                   variant="outline"
//                                   size="sm"
//                                   onClick={() => openEditAssignment(item)}
//                                 >
//                                   Update
//                                 </Button>
//                               </div>
//                             </TableCell>
//                           </TableRow>
//                         )
//                       })}
//                       {filteredAssignments.length === 0 && (
//                         <TableRow>
//                           <TableCell colSpan={6} className="h-28 text-center">
//                             No syllabus records found.
//                           </TableCell>
//                         </TableRow>
//                       )}
//                     </TableBody>
//                   </Table>
//                 </div>
//               </div>
//             </TabsContent>
//           </CardContent>
//         </Card>
//       </Tabs>

//       {/* Add / edit subject */}
//       <Dialog open={subjectDialog} onOpenChange={setSubjectDialog}>
//         <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
//           <DialogHeader>
//             <DialogTitle>
//               {editingSubject ? "Edit Subject" : "Create Subject"}
//             </DialogTitle>
//             <DialogDescription>
//               Maintain the school's subject directory. Class assignments are
//               managed separately.
//             </DialogDescription>
//           </DialogHeader>

//           <form onSubmit={saveSubject} className="space-y-4">
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Subject Name *</label>
//               <Input
//                 value={subjectForm.name}
//                 onChange={(event) =>
//                   setSubjectForm({
//                     ...subjectForm,
//                     name: event.target.value,
//                   })
//                 }
//                 placeholder="e.g. Mathematics"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium">Subject Code *</label>
//               <Input
//                 value={subjectForm.code}
//                 onChange={(event) =>
//                   setSubjectForm({
//                     ...subjectForm,
//                     code: event.target.value,
//                   })
//                 }
//                 placeholder="e.g. MAT001"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium">Description</label>
//               <textarea
//                 value={subjectForm.description}
//                 onChange={(event) =>
//                   setSubjectForm({
//                     ...subjectForm,
//                     description: event.target.value,
//                   })
//                 }
//                 placeholder="Enter subject description..."
//                 rows={3}
//                 className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium">Status</label>
//               <Select
//                 value={subjectForm.status}
//                 onValueChange={(value) =>
//                   setSubjectForm({
//                     ...subjectForm,
//                     status: value as Status,
//                   })
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Active">Active</SelectItem>
//                   <SelectItem value="Inactive">Inactive</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {error && <p className="text-sm text-destructive">{error}</p>}

//             <DialogFooter>
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setSubjectDialog(false)}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit">
//                 {editingSubject ? "Save Changes" : "Create Subject"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* Add / edit class assignment */}
//       <Dialog open={assignmentDialog} onOpenChange={setAssignmentDialog}>
//         <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
//           <DialogHeader>
//             <DialogTitle>
//               {editingAssignment ? "Edit Assignment" : "Assign Subject"}
//             </DialogTitle>
//             <DialogDescription>
//               Choose a subject, class section, teacher and syllabus details.
//             </DialogDescription>
//           </DialogHeader>

//           <form onSubmit={saveAssignment} className="space-y-4">
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Subject *</label>
//               <Select
//                 value={assignmentForm.subjectId}
//                 onValueChange={(value) =>
//                   setAssignmentForm({
//                     ...assignmentForm,
//                     subjectId: value,
//                   })
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select subject" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {subjects
//                     .filter(
//                       (subject) =>
//                         subject.status === "Active" ||
//                         subject.id === assignmentForm.subjectId
//                     )
//                     .map((subject) => (
//                       <SelectItem key={subject.id} value={subject.id}>
//                         {subject.name} ({subject.code})
//                       </SelectItem>
//                     ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="grid gap-4 sm:grid-cols-2">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Class & Section *</label>
//                 <Select
//                   value={assignmentForm.classSection}
//                   onValueChange={(value) =>
//                     setAssignmentForm({
//                       ...assignmentForm,
//                       classSection: value,
//                     })
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select class" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {classOptions.map((item) => (
//                       <SelectItem key={item} value={item}>
//                         Class {item}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Assign Teacher</label>
//                 <Select
//                   value={assignmentForm.teacher || "unassigned"}
//                   onValueChange={(value) =>
//                     setAssignmentForm({
//                       ...assignmentForm,
//                       teacher: value === "unassigned" ? "" : value,
//                     })
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select teacher" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="unassigned">Not assigned</SelectItem>
//                     {teachers.map((teacher) => (
//                       <SelectItem key={teacher} value={teacher}>
//                         {teacher}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Total Chapters</label>
//                 <Input
//                   type="number"
//                   min={1}
//                   value={assignmentForm.totalChapters}
//                   onChange={(event) =>
//                     setAssignmentForm({
//                       ...assignmentForm,
//                       totalChapters: Number(event.target.value),
//                     })
//                   }
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium">
//                   Completed Chapters
//                 </label>
//                 <Input
//                   type="number"
//                   min={0}
//                   max={assignmentForm.totalChapters}
//                   value={assignmentForm.completedChapters}
//                   onChange={(event) =>
//                     setAssignmentForm({
//                       ...assignmentForm,
//                       completedChapters: Number(event.target.value),
//                     })
//                   }
//                   required
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium">Academic Year *</label>
//               <Input
//                 value={assignmentForm.academicYear}
//                 onChange={(event) =>
//                   setAssignmentForm({
//                     ...assignmentForm,
//                     academicYear: event.target.value,
//                   })
//                 }
//                 placeholder="2026-2027"
//                 required
//               />
//             </div>

//             {error && <p className="text-sm text-destructive">{error}</p>}

//             <DialogFooter>
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setAssignmentDialog(false)}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit">
//                 {editingAssignment ? "Save Changes" : "Assign Subject"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* View assignment */}
//       <Dialog open={viewDialog} onOpenChange={setViewDialog}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Class Subject Details</DialogTitle>
//             <DialogDescription>
//               Review the subject assignment and syllabus progress.
//             </DialogDescription>
//           </DialogHeader>

//           {viewingAssignment && (
//             <div className="space-y-4">
//               <div className="rounded-lg border p-4">
//                 <p className="text-lg font-semibold">
//                   {subjectName(viewingAssignment.subjectId)}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   {subjectCode(viewingAssignment.subjectId)}
//                 </p>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div className="rounded-lg bg-muted/50 p-3">
//                   <p className="text-xs text-muted-foreground">Class</p>
//                   <p className="mt-1 font-medium">
//                     {viewingAssignment.classSection}
//                   </p>
//                 </div>
//                 <div className="rounded-lg bg-muted/50 p-3">
//                   <p className="text-xs text-muted-foreground">Teacher</p>
//                   <p className="mt-1 font-medium">
//                     {viewingAssignment.teacher || "Not assigned"}
//                   </p>
//                 </div>
//                 <div className="rounded-lg bg-muted/50 p-3">
//                   <p className="text-xs text-muted-foreground">Completed</p>
//                   <p className="mt-1 font-medium">
//                     {viewingAssignment.completedChapters} chapters
//                   </p>
//                 </div>
//                 <div className="rounded-lg bg-muted/50 p-3">
//                   <p className="text-xs text-muted-foreground">Remaining</p>
//                   <p className="mt-1 font-medium">
//                     {viewingAssignment.totalChapters -
//                       viewingAssignment.completedChapters}{" "}
//                     chapters
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">
//                     Syllabus completion
//                   </span>
//                   <span className="font-medium">
//                     {progressFor(viewingAssignment)}%
//                   </span>
//                 </div>
//                 <div className="h-2 overflow-hidden rounded-full bg-muted">
//                   <div
//                     className="h-full rounded-full bg-primary"
//                     style={{
//                       width: `${progressFor(viewingAssignment)}%`,
//                     }}
//                   />
//                 </div>
//               </div>

//               <p className="text-sm text-muted-foreground">
//                 Academic year: {viewingAssignment.academicYear}
//               </p>

//               <DialogFooter>
//                 <Button variant="outline" onClick={() => setViewDialog(false)}>
//                   Close
//                 </Button>
//                 <Button
//                   onClick={() => {
//                     const item = viewingAssignment
//                     setViewDialog(false)
//                     openEditAssignment(item)
//                   }}
//                 >
//                   <Pencil className="mr-2 size-4" />
//                   Edit Assignment
//                 </Button>
//               </DialogFooter>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Delete subject */}
//       <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Delete this subject?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This will delete{" "}
//               <span className="font-semibold">{deletingSubject?.name}</span> and
//               all of its class assignments from this demo. This action cannot be
//               undone.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel onClick={() => setDeletingSubject(null)}>
//               Cancel
//             </AlertDialogCancel>
//             <AlertDialogAction
//               onClick={deleteSubject}
//               className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
//             >
//               <Trash2 className="mr-2 size-4" />
//               Delete Subject
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   )
// }
