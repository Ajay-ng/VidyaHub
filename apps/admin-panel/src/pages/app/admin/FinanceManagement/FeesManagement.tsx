import { useMemo, useState } from "react"
import type { FormEvent, ReactNode } from "react"
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  IndianRupee,
  Pencil,
  Plus,
  Receipt,
  Search,
  Trash2,
  Wallet,
  X,
  ChartNoAxesCombined,
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

type FeeStatus = "Paid" | "Partial" | "Pending" | "Overdue"
type FeeView = "home" | "structure" | "collection" | "pending" | "reports"

type FeeRecord = {
  id: number
  studentId: string
  studentName: string
  className: string
  section: string
  feeType: string
  academicYear: string
  totalAmount: number
  paidAmount: number
  dueDate: string
  lastPaymentDate: string
  paymentMethod: string
}

type FeeStructure = {
  id: number
  name: string
  className: string
  academicYear: string
  amount: number
  dueDate: string
}

type FeeForm = Omit<FeeRecord, "id">

type StructureForm = Omit<FeeStructure, "id">

const INITIAL_FEES: FeeRecord[] = [
  {
    id: 1,
    studentId: "STU001",
    studentName: "Aarav Sharma",
    className: "Class 8",
    section: "A",
    feeType: "Tuition Fee",
    academicYear: "2026-2027",
    totalAmount: 30000,
    paidAmount: 30000,
    dueDate: "2026-06-15",
    lastPaymentDate: "2026-06-10",
    paymentMethod: "UPI",
  },
  {
    id: 2,
    studentId: "STU002",
    studentName: "Ananya Kumar",
    className: "Class 7",
    section: "B",
    feeType: "Tuition Fee",
    academicYear: "2026-2027",
    totalAmount: 28000,
    paidAmount: 15000,
    dueDate: "2026-06-15",
    lastPaymentDate: "2026-06-12",
    paymentMethod: "Online",
  },
  {
    id: 3,
    studentId: "STU003",
    studentName: "Vihaan Reddy",
    className: "Class 9",
    section: "A",
    feeType: "Tuition Fee",
    academicYear: "2026-2027",
    totalAmount: 35000,
    paidAmount: 0,
    dueDate: "2026-08-15",
    lastPaymentDate: "",
    paymentMethod: "—",
  },
  {
    id: 4,
    studentId: "STU004",
    studentName: "Diya Patel",
    className: "Class 6",
    section: "C",
    feeType: "Transport Fee",
    academicYear: "2026-2027",
    totalAmount: 12000,
    paidAmount: 0,
    dueDate: "2026-09-15",
    lastPaymentDate: "",
    paymentMethod: "—",
  },
  {
    id: 5,
    studentId: "STU005",
    studentName: "Ishaan Nair",
    className: "Class 8",
    section: "A",
    feeType: "Tuition Fee",
    academicYear: "2026-2027",
    totalAmount: 30000,
    paidAmount: 10000,
    dueDate: "2026-08-15",
    lastPaymentDate: "2026-08-05",
    paymentMethod: "Cash",
  },
  {
    id: 6,
    studentId: "STU006",
    studentName: "Meera Singh",
    className: "Class 5",
    section: "B",
    feeType: "Examination Fee",
    academicYear: "2026-2027",
    totalAmount: 2500,
    paidAmount: 2500,
    dueDate: "2026-10-15",
    lastPaymentDate: "2026-10-01",
    paymentMethod: "UPI",
  },
]

const INITIAL_STRUCTURES: FeeStructure[] = [
  {
    id: 1,
    name: "Tuition Fee",
    className: "Class 8",
    academicYear: "2026-2027",
    amount: 30000,
    dueDate: "2026-06-15",
  },
  {
    id: 2,
    name: "Transport Fee",
    className: "Class 6",
    academicYear: "2026-2027",
    amount: 12000,
    dueDate: "2026-09-15",
  },
  {
    id: 3,
    name: "Examination Fee",
    className: "Class 5",
    academicYear: "2026-2027",
    amount: 2500,
    dueDate: "2026-10-15",
  },
]

const EMPTY_FEE_FORM: FeeForm = {
  studentId: "",
  studentName: "",
  className: "Class 1",
  section: "A",
  feeType: "Tuition Fee",
  academicYear: "2026-2027",
  totalAmount: 0,
  paidAmount: 0,
  dueDate: "",
  lastPaymentDate: "",
  paymentMethod: "UPI",
}

const EMPTY_STRUCTURE_FORM: StructureForm = {
  name: "",
  className: "Class 1",
  academicYear: "2026-2027",
  amount: 0,
  dueDate: "",
}

const CLASS_OPTIONS = [
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
]

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(date: string) {
  if (!date) return "—"

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function getFeeStatus(fee: FeeRecord): FeeStatus {
  if (fee.paidAmount >= fee.totalAmount) return "Paid"
  if (fee.paidAmount > 0) return "Partial"

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const dueDate = new Date(`${fee.dueDate}T00:00:00`)

  if (fee.dueDate && dueDate < today) return "Overdue"

  return "Pending"
}

function FeeStatusBadge({ status }: { status: FeeStatus }) {
  return (
    <Badge
      variant={
        status === "Paid"
          ? "secondary"
          : status === "Overdue"
            ? "destructive"
            : status === "Partial"
              ? "outline"
              : "secondary"
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

export default function FeesManagement() {
  const [fees, setFees] = useState<FeeRecord[]>(INITIAL_FEES)
  const [structures, setStructures] =
    useState<FeeStructure[]>(INITIAL_STRUCTURES)

  const [view, setView] = useState<FeeView>("home")
  const [search, setSearch] = useState("")
  const [classFilter, setClassFilter] = useState("All")

  const [selectedFee, setSelectedFee] = useState<FeeRecord | null>(null)
  const [selectedStructure, setSelectedStructure] =
    useState<FeeStructure | null>(null)

  const [dialog, setDialog] = useState<
    "fee" | "structure" | "payment" | "delete-fee" | "delete-structure" | null
  >(null)

  const [feeForm, setFeeForm] = useState<FeeForm>(EMPTY_FEE_FORM)
  const [structureForm, setStructureForm] =
    useState<StructureForm>(EMPTY_STRUCTURE_FORM)

  const [formError, setFormError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("UPI")
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().slice(0, 10)
  )

  const totalFees = fees.reduce((sum, fee) => sum + fee.totalAmount, 0)
  const totalCollected = fees.reduce((sum, fee) => sum + fee.paidAmount, 0)
  const totalPending = Math.max(0, totalFees - totalCollected)

  const pendingCount = fees.filter((fee) => {
    const status = getFeeStatus(fee)
    return status === "Pending" || status === "Partial" || status === "Overdue"
  }).length

  const overdueCount = fees.filter(
    (fee) => getFeeStatus(fee) === "Overdue"
  ).length

  const paidCount = fees.filter((fee) => getFeeStatus(fee) === "Paid").length

  const filteredFees = useMemo(() => {
    const query = search.trim().toLowerCase()

    return fees.filter((fee) => {
      const matchesSearch =
        !query ||
        [
          fee.studentName,
          fee.studentId,
          fee.className,
          fee.section,
          fee.feeType,
        ].some((value) => value.toLowerCase().includes(query))

      const matchesClass =
        classFilter === "All" || fee.className === classFilter

      const status = getFeeStatus(fee)

      const matchesView =
        view === "collection"
          ? fee.paidAmount > 0
          : view === "pending"
            ? status !== "Paid"
            : true

      return matchesSearch && matchesClass && matchesView
    })
  }, [fees, search, classFilter, view])

  function navigateTo(nextView: FeeView) {
    setSearch("")
    setClassFilter("All")
    setView(nextView)
    setSelectedFee(null)
    setSelectedStructure(null)
  }

  function updateFeeForm<K extends keyof FeeForm>(key: K, value: FeeForm[K]) {
    setFeeForm((previous) => ({
      ...previous,
      [key]: value,
    }))
  }

  function updateStructureForm<K extends keyof StructureForm>(
    key: K,
    value: StructureForm[K]
  ) {
    setStructureForm((previous) => ({
      ...previous,
      [key]: value,
    }))
  }

  function openAddFee() {
    setSelectedFee(null)
    setFeeForm({ ...EMPTY_FEE_FORM })
    setFormError("")
    setDialog("fee")
  }

  function openEditFee(fee: FeeRecord) {
    setSelectedFee(fee)

    const { id: _id, ...details } = fee

    setFeeForm(details)
    setFormError("")
    setDialog("fee")
  }

  function saveFee(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError("")

    if (feeForm.totalAmount <= 0) {
      setFormError("Total fee must be greater than zero.")
      return
    }

    if (feeForm.paidAmount < 0 || feeForm.paidAmount > feeForm.totalAmount) {
      setFormError("Paid amount must be between zero and the total fee.")
      return
    }

    if (selectedFee) {
      setFees((previous) =>
        previous.map((fee) =>
          fee.id === selectedFee.id ? { ...feeForm, id: selectedFee.id } : fee
        )
      )
      setSuccessMessage("Fee record updated successfully.")
    } else {
      setFees((previous) => [
        ...previous,
        {
          ...feeForm,
          id: Math.max(0, ...previous.map((fee) => fee.id)) + 1,
        },
      ])
      setSuccessMessage("Fee record added successfully.")
    }

    setDialog(null)
    setSelectedFee(null)
  }

  function openAddStructure() {
    setSelectedStructure(null)
    setStructureForm({ ...EMPTY_STRUCTURE_FORM })
    setFormError("")
    setDialog("structure")
  }

  function openEditStructure(structure: FeeStructure) {
    setSelectedStructure(structure)

    const { id: _id, ...details } = structure

    setStructureForm(details)
    setFormError("")
    setDialog("structure")
  }

  function saveStructure(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError("")

    if (structureForm.amount <= 0) {
      setFormError("Fee amount must be greater than zero.")
      return
    }

    if (selectedStructure) {
      setStructures((previous) =>
        previous.map((structure) =>
          structure.id === selectedStructure.id
            ? { ...structureForm, id: selectedStructure.id }
            : structure
        )
      )
      setSuccessMessage("Fee structure updated successfully.")
    } else {
      setStructures((previous) => [
        ...previous,
        {
          ...structureForm,
          id: Math.max(0, ...previous.map((item) => item.id)) + 1,
        },
      ])
      setSuccessMessage("Fee structure added successfully.")
    }

    setDialog(null)
    setSelectedStructure(null)
  }

  function openPaymentDialog(fee: FeeRecord) {
    setSelectedFee(fee)
    setPaymentAmount("")
    setPaymentMethod("UPI")
    setPaymentDate(new Date().toISOString().slice(0, 10))
    setFormError("")
    setDialog("payment")
  }

  function recordPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError("")

    if (!selectedFee) return

    const amount = Number(paymentAmount)
    const remaining = selectedFee.totalAmount - selectedFee.paidAmount

    if (!Number.isFinite(amount) || amount <= 0) {
      setFormError("Enter a valid payment amount.")
      return
    }

    if (amount > remaining) {
      setFormError(
        `Payment cannot exceed the remaining balance of ${formatCurrency(remaining)}.`
      )
      return
    }

    setFees((previous) =>
      previous.map((fee) =>
        fee.id === selectedFee.id
          ? {
              ...fee,
              paidAmount: fee.paidAmount + amount,
              lastPaymentDate: paymentDate,
              paymentMethod,
            }
          : fee
      )
    )

    setDialog(null)
    setSelectedFee(null)
    setSuccessMessage("Payment recorded successfully.")
  }

  function deleteFee() {
    if (!selectedFee) return

    setFees((previous) => previous.filter((fee) => fee.id !== selectedFee.id))

    setDialog(null)
    setSelectedFee(null)
    setSuccessMessage("Fee record deleted successfully.")
  }

  function deleteStructure() {
    if (!selectedStructure) return

    setStructures((previous) =>
      previous.filter((item) => item.id !== selectedStructure.id)
    )

    setDialog(null)
    setSelectedStructure(null)
    setSuccessMessage("Fee structure deleted successfully.")
  }

  const pageTitle: Record<FeeView, string> = {
    home: "Fees Management",
    structure: "Fee Structure",
    collection: "Fee Collection",
    pending: "Pending Fees",
    reports: "Fee Reports",
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {pageTitle[view]}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage student fees, payments, and outstanding balances.
          </p>
        </div>

        {view === "structure" ? (
          <Button onClick={openAddStructure}>
            <Plus className="mr-2 size-4" />
            Add Fee Structure
          </Button>
        ) : view === "collection" || view === "pending" ? (
          <Button onClick={openAddFee}>
            <Plus className="mr-2 size-4" />
            Add Fee Record
          </Button>
        ) : null}
      </div>

      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <button
          type="button"
          onClick={() => navigateTo("home")}
          className="hover:text-foreground"
        >
          Administration
        </button>
        <ChevronRight className="size-4" />
        <span className="font-medium text-foreground">{pageTitle[view]}</span>
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
            size="icon"
            variant="ghost"
            aria-label="Dismiss message"
            onClick={() => setSuccessMessage("")}
          >
            <X className="size-4" />
          </Button>
        </div>
      )}

      {/* HOME: category cards only */}
      {view === "home" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Fee Structure",
                description: "Manage class-wise fee amounts",
                value: structures.length,
                icon: Wallet,
                target: "structure" as FeeView,
              },
              {
                title: "Fee Collection",
                description: "View payments received",
                value: paidCount,
                icon: Receipt,
                target: "collection" as FeeView,
              },
              {
                title: "Pending Fees",
                description: "Unpaid and partially paid fees",
                value: pendingCount,
                icon: Clock,
                target: "pending" as FeeView,
              },
              {
                title: "Fee Reports",
                description: "Collection and outstanding totals",
                value: overdueCount,
                icon: ChartNoAxesCombined,
                target: "reports" as FeeView,
              },
            ].map((item) => {
              const Icon = item.icon

              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => navigateTo(item.target)}
                  className="text-left"
                >
                  <Card className="h-full transition-colors hover:border-primary hover:bg-accent/40">
                    <CardContent className="flex items-start justify-between gap-3 p-5">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {item.title}
                        </p>
                        <p className="mt-2 text-2xl font-bold">{item.value}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {item.description}
                        </p>
                        <p className="mt-4 flex items-center text-sm font-medium">
                          View details
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

          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <IndianRupee className="size-4" />
                  Total Fees
                </div>
                <p className="mt-2 text-2xl font-bold">
                  {formatCurrency(totalFees)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4" />
                  Collected
                </div>
                <p className="mt-2 text-2xl font-bold">
                  {formatCurrency(totalCollected)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="size-4" />
                  Outstanding
                </div>
                <p className="mt-2 text-2xl font-bold">
                  {formatCurrency(totalPending)}
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* FEE STRUCTURE */}
      {view === "structure" && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateTo("home")}
                aria-label="Back"
              >
                <ArrowLeft className="size-4" />
              </Button>
              <div>
                <CardTitle>Fee Structure</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Configure fee types, classes, and due dates.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {structures.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">
                No fee structures added yet.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {structures.map((structure) => (
                  <Card key={structure.id}>
                    <CardContent className="space-y-4 p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold">{structure.name}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {structure.className}
                          </p>
                        </div>
                        <Badge variant="outline">
                          {structure.academicYear}
                        </Badge>
                      </div>

                      <p className="text-2xl font-bold">
                        {formatCurrency(structure.amount)}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Due date: {formatDate(structure.dueDate)}
                      </p>

                      <div className="flex justify-end gap-2 border-t pt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditStructure(structure)}
                        >
                          <Pencil className="mr-1 size-4" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label={`Delete ${structure.name}`}
                          onClick={() => {
                            setSelectedStructure(structure)
                            setDialog("delete-structure")
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

      {/* COLLECTION AND PENDING LIST */}
      {(view === "collection" || view === "pending") && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateTo("home")}
                aria-label="Back"
              >
                <ArrowLeft className="size-4" />
              </Button>
              <div>
                <CardTitle>
                  {view === "collection" ? "Fee Collection" : "Pending Fees"}
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  {view === "collection"
                    ? "Student records with payments received."
                    : "Students with unpaid, partial, or overdue fees."}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Search student or fee..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              <Select
                value={classFilter}
                onValueChange={(value) => setClassFilter(value ?? "All")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All classes</SelectItem>
                  {CLASS_OPTIONS.map((className) => (
                    <SelectItem key={className} value={className}>
                      {className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr className="border-b text-left">
                    <th className="p-3 font-medium">Student</th>
                    <th className="p-3 font-medium">Class</th>
                    <th className="p-3 font-medium">Fee Type</th>
                    <th className="p-3 font-medium">Total</th>
                    <th className="p-3 font-medium">Paid</th>
                    <th className="p-3 font-medium">Balance</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredFees.map((fee) => {
                    const balance = Math.max(
                      0,
                      fee.totalAmount - fee.paidAmount
                    )

                    return (
                      <tr key={fee.id} className="border-b last:border-0">
                        <td className="p-3">
                          <p className="font-medium">{fee.studentName}</p>
                          <p className="text-xs text-muted-foreground">
                            {fee.studentId}
                          </p>
                        </td>
                        <td className="p-3">
                          {fee.className} - {fee.section}
                        </td>
                        <td className="p-3">{fee.feeType}</td>
                        <td className="p-3">
                          {formatCurrency(fee.totalAmount)}
                        </td>
                        <td className="p-3">
                          {formatCurrency(fee.paidAmount)}
                        </td>
                        <td className="p-3">{formatCurrency(balance)}</td>
                        <td className="p-3">
                          <FeeStatusBadge status={getFeeStatus(fee)} />
                        </td>
                        <td className="p-3">
                          <div className="flex justify-end gap-2">
                            {balance > 0 && (
                              <Button
                                size="sm"
                                onClick={() => openPaymentDialog(fee)}
                              >
                                <CreditCard className="mr-1 size-4" />
                                Pay
                              </Button>
                            )}
                            <Button
                              size="icon"
                              variant="outline"
                              aria-label={`Edit ${fee.studentName}`}
                              onClick={() => openEditFee(fee)}
                            >
                              <Pencil className="size-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              aria-label={`Delete ${fee.studentName} fee`}
                              onClick={() => {
                                setSelectedFee(fee)
                                setDialog("delete-fee")
                              }}
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}

                  {filteredFees.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="p-10 text-center text-muted-foreground"
                      >
                        No fee records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* REPORTS */}
      {view === "reports" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Total Fees",
                amount: totalFees,
                icon: Wallet,
              },
              {
                label: "Total Collected",
                amount: totalCollected,
                icon: CheckCircle2,
              },
              {
                label: "Outstanding",
                amount: totalPending,
                icon: Clock,
              },
              {
                label: "Overdue Records",
                amount: overdueCount,
                icon: CalendarDays,
                count: true,
              },
            ].map((report) => {
              const Icon = report.icon

              return (
                <Card key={report.label}>
                  <CardContent className="p-5">
                    <Icon className="size-5 text-muted-foreground" />
                    <p className="mt-3 text-sm text-muted-foreground">
                      {report.label}
                    </p>
                    <p className="mt-2 text-2xl font-bold">
                      {"count" in report && report.count
                        ? report.amount
                        : formatCurrency(report.amount)}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Collection Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <div className="mb-2 flex justify-between gap-3 text-sm">
                  <span>Fees collected</span>
                  <span className="font-medium">
                    {totalFees > 0
                      ? Math.round((totalCollected / totalFees) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{
                      width: `${
                        totalFees > 0
                          ? Math.min(100, (totalCollected / totalFees) * 100)
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">
                    Students with paid fees
                  </p>
                  <p className="mt-2 text-xl font-bold">{paidCount}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">
                    Students with outstanding fees
                  </p>
                  <p className="mt-2 text-xl font-bold">{pendingCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* ADD / EDIT FEE RECORD */}
      <Dialog
        open={dialog === "fee"}
        onOpenChange={(open) => {
          if (!open) setDialog(null)
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedFee ? "Edit Fee Record" : "Add Fee Record"}
            </DialogTitle>
            <DialogDescription>
              Enter the student's fee information.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={saveFee} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Student ID">
                <Input
                  required
                  value={feeForm.studentId}
                  onChange={(event) =>
                    updateFeeForm("studentId", event.target.value)
                  }
                  placeholder="STU007"
                />
              </FormField>

              <FormField label="Student Name">
                <Input
                  required
                  value={feeForm.studentName}
                  onChange={(event) =>
                    updateFeeForm("studentName", event.target.value)
                  }
                  placeholder="Student full name"
                />
              </FormField>

              <FormField label="Class">
                <Select
                  value={feeForm.className}
                  onValueChange={(value) =>
                    updateFeeForm("className", value ?? "Class 1")
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CLASS_OPTIONS.map((className) => (
                      <SelectItem key={className} value={className}>
                        {className}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Section">
                <Input
                  required
                  value={feeForm.section}
                  onChange={(event) =>
                    updateFeeForm("section", event.target.value)
                  }
                  placeholder="A"
                />
              </FormField>

              <FormField label="Fee Type">
                <Select
                  value={feeForm.feeType}
                  onValueChange={(value) =>
                    updateFeeForm("feeType", value ?? "Tuition Fee")
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tuition Fee">Tuition Fee</SelectItem>
                    <SelectItem value="Transport Fee">Transport Fee</SelectItem>
                    <SelectItem value="Examination Fee">
                      Examination Fee
                    </SelectItem>
                    <SelectItem value="Library Fee">Library Fee</SelectItem>
                    <SelectItem value="Other Fee">Other Fee</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Academic Year">
                <Input
                  required
                  value={feeForm.academicYear}
                  onChange={(event) =>
                    updateFeeForm("academicYear", event.target.value)
                  }
                  placeholder="2026-2027"
                />
              </FormField>

              <FormField label="Total Fee (₹)">
                <Input
                  required
                  type="number"
                  min="1"
                  value={feeForm.totalAmount || ""}
                  onChange={(event) =>
                    updateFeeForm("totalAmount", Number(event.target.value))
                  }
                />
              </FormField>

              <FormField label="Already Paid (₹)">
                <Input
                  required
                  type="number"
                  min="0"
                  value={feeForm.paidAmount}
                  onChange={(event) =>
                    updateFeeForm("paidAmount", Number(event.target.value))
                  }
                />
              </FormField>

              <FormField label="Due Date">
                <Input
                  required
                  type="date"
                  value={feeForm.dueDate}
                  onChange={(event) =>
                    updateFeeForm("dueDate", event.target.value)
                  }
                />
              </FormField>

              <FormField label="Last Payment Date">
                <Input
                  type="date"
                  value={feeForm.lastPaymentDate}
                  onChange={(event) =>
                    updateFeeForm("lastPaymentDate", event.target.value)
                  }
                />
              </FormField>

              <FormField label="Payment Method">
                <Select
                  value={feeForm.paymentMethod}
                  onValueChange={(value) =>
                    updateFeeForm("paymentMethod", value ?? "UPI")
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Card">Card</SelectItem>
                    <SelectItem value="—">Not paid</SelectItem>
                  </SelectContent>
                </Select>
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
                {selectedFee ? "Save Changes" : "Add Fee Record"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ADD / EDIT FEE STRUCTURE */}
      <Dialog
        open={dialog === "structure"}
        onOpenChange={(open) => {
          if (!open) setDialog(null)
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedStructure ? "Edit Fee Structure" : "Add Fee Structure"}
            </DialogTitle>
            <DialogDescription>
              Configure a fee amount for a class and academic year.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={saveStructure} className="space-y-4">
            <FormField label="Fee Name">
              <Input
                required
                value={structureForm.name}
                onChange={(event) =>
                  updateStructureForm("name", event.target.value)
                }
                placeholder="Tuition Fee"
              />
            </FormField>

            <FormField label="Class">
              <Select
                value={structureForm.className}
                onValueChange={(value) =>
                  updateStructureForm("className", value ?? "Class 1")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CLASS_OPTIONS.map((className) => (
                    <SelectItem key={className} value={className}>
                      {className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Academic Year">
              <Input
                required
                value={structureForm.academicYear}
                onChange={(event) =>
                  updateStructureForm("academicYear", event.target.value)
                }
                placeholder="2026-2027"
              />
            </FormField>

            <FormField label="Amount (₹)">
              <Input
                required
                type="number"
                min="1"
                value={structureForm.amount || ""}
                onChange={(event) =>
                  updateStructureForm("amount", Number(event.target.value))
                }
              />
            </FormField>

            <FormField label="Due Date">
              <Input
                required
                type="date"
                value={structureForm.dueDate}
                onChange={(event) =>
                  updateStructureForm("dueDate", event.target.value)
                }
              />
            </FormField>

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
                {selectedStructure ? "Save Changes" : "Add Structure"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* RECORD PAYMENT */}
      <Dialog
        open={dialog === "payment"}
        onOpenChange={(open) => {
          if (!open) setDialog(null)
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Record Fee Payment</DialogTitle>
            <DialogDescription>
              {selectedFee?.studentName} · Remaining balance{" "}
              {selectedFee
                ? formatCurrency(
                    selectedFee.totalAmount - selectedFee.paidAmount
                  )
                : ""}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={recordPayment} className="space-y-4">
            <FormField label="Payment Amount (₹)">
              <Input
                required
                type="number"
                min="1"
                value={paymentAmount}
                onChange={(event) => setPaymentAmount(event.target.value)}
                placeholder="Enter amount"
              />
            </FormField>

            <FormField label="Payment Date">
              <Input
                required
                type="date"
                value={paymentDate}
                onChange={(event) => setPaymentDate(event.target.value)}
              />
            </FormField>

            <FormField label="Payment Method">
              <Select
                value={paymentMethod}
                onValueChange={(value) => setPaymentMethod(value ?? "UPI")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

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
                <CreditCard className="mr-2 size-4" />
                Record Payment
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* DELETE FEE RECORD */}
      <Dialog
        open={dialog === "delete-fee"}
        onOpenChange={(open) => {
          if (!open) setDialog(null)
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Fee Record</DialogTitle>
            <DialogDescription>
              Delete the fee record for {selectedFee?.studentName}? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialog(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteFee}>
              <Trash2 className="mr-2 size-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE FEE STRUCTURE */}
      <Dialog
        open={dialog === "delete-structure"}
        onOpenChange={(open) => {
          if (!open) setDialog(null)
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Fee Structure</DialogTitle>
            <DialogDescription>
              Delete {selectedStructure?.name} for{" "}
              {selectedStructure?.className}? Existing fee records will not be
              deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialog(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteStructure}>
              <Trash2 className="mr-2 size-4" />
              Delete Structure
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
