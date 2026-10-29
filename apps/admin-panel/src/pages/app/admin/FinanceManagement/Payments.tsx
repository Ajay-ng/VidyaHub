import { useMemo, useState, type FormEvent } from "react"
import {
  ArrowDownToLine,
  CheckCircle2,
  Clock3,
  CreditCard,
  Eye,
  FileText,
  IndianRupee,
  Plus,
  Printer,
  Search,
  Wallet,
  XCircle,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Payment {
  id: string
  studentId: string
  studentName: string
  className: string
  feeType: string
  amount: number
  method: string
  date: string
  status: "Success" | "Pending" | "Failed"
  transactionId: string
}

const initialPayments: Payment[] = [
  {
    id: "PAY-1024",
    studentId: "STU001",
    studentName: "Aarav Sharma",
    className: "10 - A",
    feeType: "Tuition Fee",
    amount: 15000,
    method: "UPI",
    date: "2026-10-29",
    status: "Success",
    transactionId: "TXN-UPI-1024",
  },
  {
    id: "PAY-1023",
    studentId: "STU002",
    studentName: "Priya Patel",
    className: "10 - B",
    feeType: "Term Fee",
    amount: 8000,
    method: "Razorpay",
    date: "2026-10-29",
    status: "Pending",
    transactionId: "TXN-RZP-1023",
  },
  {
    id: "PAY-1022",
    studentId: "STU003",
    studentName: "Rahul Verma",
    className: "9 - A",
    feeType: "Transport Fee",
    amount: 5000,
    method: "Cash",
    date: "2026-10-28",
    status: "Success",
    transactionId: "CASH-1022",
  },
  {
    id: "PAY-1021",
    studentId: "STU004",
    studentName: "Ananya Reddy",
    className: "11 - B",
    feeType: "Tuition Fee",
    amount: 12000,
    method: "Bank Transfer",
    date: "2026-10-27",
    status: "Failed",
    transactionId: "TXN-BANK-1021",
  },
  {
    id: "PAY-1020",
    studentId: "STU005",
    studentName: "Vikram Singh",
    className: "8 - C",
    feeType: "Exam Fee",
    amount: 2500,
    method: "UPI",
    date: "2026-10-26",
    status: "Success",
    transactionId: "TXN-UPI-1020",
  },
  {
    id: "PAY-1019",
    studentId: "STU006",
    studentName: "Sneha Kumar",
    className: "10 - A",
    feeType: "Tuition Fee",
    amount: 10000,
    method: "Card",
    date: "2026-10-25",
    status: "Success",
    transactionId: "TXN-CARD-1019",
  },
]

const students = [
  { id: "STU001", name: "Aarav Sharma", className: "10 - A" },
  { id: "STU002", name: "Priya Patel", className: "10 - B" },
  { id: "STU003", name: "Rahul Verma", className: "9 - A" },
  { id: "STU004", name: "Ananya Reddy", className: "11 - B" },
  { id: "STU005", name: "Vikram Singh", className: "8 - C" },
  { id: "STU006", name: "Sneha Kumar", className: "10 - A" },
]

const feeTypes = [
  "Tuition Fee",
  "Term Fee",
  "Transport Fee",
  "Exam Fee",
  "Admission Fee",
  "Library Fee",
]

const paymentMethods = ["UPI", "Cash", "Bank Transfer", "Card", "Razorpay"]

const classes = ["8 - C", "9 - A", "10 - A", "10 - B", "11 - B"]

const selectClass =
  "h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

function SummaryCard({
  title,
  value,
  description,
  icon,
}: {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
}) {
  return (
    <Card className="gap-0 py-4">
      <CardContent className="flex items-start justify-between gap-3 px-4">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>

        <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }: { status: Payment["status"] }) {
  const iconClass = "size-3"

  if (status === "Success") {
    return (
      <Badge variant="default" className="gap-1">
        <CheckCircle2 className={iconClass} />
        Success
      </Badge>
    )
  }

  if (status === "Pending") {
    return (
      <Badge variant="secondary" className="gap-1">
        <Clock3 className={iconClass} />
        Pending
      </Badge>
    )
  }

  return (
    <Badge variant="destructive" className="gap-1">
      <XCircle className={iconClass} />
      Failed
    </Badge>
  )
}

function PaymentAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
      {initials}
    </div>
  )
}

function FormField({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="min-w-0 space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  )
}

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments)

  const [search, setSearch] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedMethod, setSelectedMethod] = useState("all")
  const [selectedDate, setSelectedDate] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [formOpen, setFormOpen] = useState(false)
  const [receiptOpen, setReceiptOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)

  const [studentId, setStudentId] = useState("")
  const [feeType, setFeeType] = useState("Tuition Fee")
  const [amount, setAmount] = useState("")
  const [method, setMethod] = useState("UPI")
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().slice(0, 10)
  )
  const [transactionId, setTransactionId] = useState("")
  const [formError, setFormError] = useState("")

  const totalCollected = payments
    .filter((payment) => payment.status === "Success")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const pendingAmount = payments
    .filter((payment) => payment.status === "Pending")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const successfulCount = payments.filter(
    (payment) => payment.status === "Success"
  ).length

  const filteredPayments = useMemo(() => {
    const query = search.trim().toLowerCase()

    return payments.filter((payment) => {
      const matchesSearch =
        !query ||
        [
          payment.id,
          payment.studentId,
          payment.studentName,
          payment.transactionId,
          payment.feeType,
        ].some((value) => value.toLowerCase().includes(query))

      const matchesClass =
        selectedClass === "all" || payment.className === selectedClass

      const matchesStatus =
        selectedStatus === "all" || payment.status === selectedStatus

      const matchesMethod =
        selectedMethod === "all" || payment.method === selectedMethod

      const matchesDate = !selectedDate || payment.date === selectedDate

      return (
        matchesSearch &&
        matchesClass &&
        matchesStatus &&
        matchesMethod &&
        matchesDate
      )
    })
  }, [
    payments,
    search,
    selectedClass,
    selectedStatus,
    selectedMethod,
    selectedDate,
  ])

  const totalPages = Math.max(1, Math.ceil(filteredPayments.length / pageSize))

  const safeCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (safeCurrentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, filteredPayments.length)

  const paginatedPayments = filteredPayments.slice(startIndex, endIndex)

  function resetFilters() {
    setSearch("")
    setSelectedClass("all")
    setSelectedStatus("all")
    setSelectedMethod("all")
    setSelectedDate("")
    setCurrentPage(1)
  }

  function resetForm() {
    setStudentId("")
    setFeeType("Tuition Fee")
    setAmount("")
    setMethod("UPI")
    setPaymentDate(new Date().toISOString().slice(0, 10))
    setTransactionId("")
    setFormError("")
  }

  function openPaymentForm() {
    resetForm()
    setFormOpen(true)
  }

  function handleSavePayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError("")

    const student = students.find((item) => item.id === studentId)
    const numericAmount = Number(amount)

    if (!student) {
      setFormError("Please select a student.")
      return
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setFormError("Enter a valid payment amount.")
      return
    }

    if (!paymentDate) {
      setFormError("Please select the payment date.")
      return
    }

    if (method !== "Cash" && !transactionId.trim()) {
      setFormError("Enter the transaction or reference ID.")
      return
    }

    const newPayment: Payment = {
      id: `PAY-${Date.now().toString().slice(-6)}`,
      studentId: student.id,
      studentName: student.name,
      className: student.className,
      feeType,
      amount: numericAmount,
      method,
      date: paymentDate,
      status: "Success",
      transactionId: transactionId.trim() || `CASH-${Date.now()}`,
    }

    setPayments((current) => [newPayment, ...current])
    setCurrentPage(1)
    setFormOpen(false)
    resetForm()

    toast.success("Payment recorded successfully.", {
      description: `${formatCurrency(numericAmount)} recorded for ${student.name}.`,
    })
  }

  function downloadCsv() {
    if (filteredPayments.length === 0) {
      toast.error("No payment records available to export.")
      return
    }

    const headers = [
      "Payment ID",
      "Student ID",
      "Student Name",
      "Class",
      "Fee Type",
      "Amount",
      "Method",
      "Date",
      "Status",
      "Transaction ID",
    ]

    const rows = filteredPayments.map((payment) => [
      payment.id,
      payment.studentId,
      payment.studentName,
      payment.className,
      payment.feeType,
      payment.amount,
      payment.method,
      payment.date,
      payment.status,
      payment.transactionId,
    ])

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\r\n")

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    })

    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")

    anchor.href = url
    anchor.download = "vidyahub-payments.csv"
    anchor.click()

    URL.revokeObjectURL(url)
    toast.success("Payment report exported successfully.")
  }

  function printReceipt() {
    window.print()
  }

  return (
    <section className="w-full min-w-0 space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">
            AY 2026–2027 <span className="mx-1">•</span> CBSE Affiliation
          </p>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Payment Management
          </h1>

          <p className="max-w-2xl text-sm text-muted-foreground">
            Manage student fee collections, payment transactions, and receipts.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={downloadCsv} className="gap-2">
            <ArrowDownToLine className="size-4" />
            Export Report
          </Button>

          <Button onClick={openPaymentForm} className="gap-2">
            <Plus className="size-4" />
            Record Payment
          </Button>
        </div>
      </div>

      {/* Summary cards - same design as Student Directory */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Collected"
          value={formatCurrency(totalCollected)}
          description="Successful payments"
          icon={<Wallet className="size-5" />}
        />

        <SummaryCard
          title="Pending Amount"
          value={formatCurrency(pendingAmount)}
          description="Awaiting confirmation"
          icon={<Clock3 className="size-5" />}
        />

        <SummaryCard
          title="Successful Payments"
          value={successfulCount}
          description="Confirmed transactions"
          icon={<CheckCircle2 className="size-5" />}
        />

        <SummaryCard
          title="Total Transactions"
          value={payments.length}
          description="All recorded payments"
          icon={<CreditCard className="size-5" />}
        />
      </div>

      {/* Collection overview */}
      <Card className="gap-0 py-4">
        <CardContent className="space-y-4 px-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold">Collection Overview</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Overview of confirmed and pending transactions.
              </p>
            </div>

            <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
              <IndianRupee className="size-5" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-muted-foreground">
              Successful collections
            </span>
            <span className="font-semibold">
              {formatCurrency(totalCollected)}
            </span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{
                width: `${
                  totalCollected + pendingAmount > 0
                    ? (totalCollected / (totalCollected + pendingAmount)) * 100
                    : 0
                }%`,
              }}
            />
          </div>

          <div className="flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
            <span>Pending: {formatCurrency(pendingAmount)}</span>
            <span>Total: {formatCurrency(totalCollected + pendingAmount)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Payment directory */}
      <Card className="min-w-0 gap-0 py-0">
        <div className="flex flex-col gap-4 border-b p-4 sm:p-5">
          <div>
            <h2 className="text-base font-semibold">All Payments</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Search, filter, and manage student payment records.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_150px_150px_150px_auto]">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Search student, payment ID..."
                className="pl-9"
                aria-label="Search payments"
              />
            </div>

            <select
              className={selectClass}
              value={selectedClass}
              onChange={(event) => {
                setSelectedClass(event.target.value)
                setCurrentPage(1)
              }}
              aria-label="Filter by class"
            >
              <option value="all">All Classes</option>
              {classes.map((className) => (
                <option key={className} value={className}>
                  Class {className}
                </option>
              ))}
            </select>

            <select
              className={selectClass}
              value={selectedStatus}
              onChange={(event) => {
                setSelectedStatus(event.target.value)
                setCurrentPage(1)
              }}
              aria-label="Filter by status"
            >
              <option value="all">All Statuses</option>
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>

            <select
              className={selectClass}
              value={selectedMethod}
              onChange={(event) => {
                setSelectedMethod(event.target.value)
                setCurrentPage(1)
              }}
              aria-label="Filter by payment method"
            >
              <option value="all">All Methods</option>
              {paymentMethods.map((paymentMethod) => (
                <option key={paymentMethod} value={paymentMethod}>
                  {paymentMethod}
                </option>
              ))}
            </select>

            <Button variant="outline" onClick={resetFilters}>
              Reset
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label
              htmlFor="filter-payment-date"
              className="text-sm text-muted-foreground"
            >
              Payment date
            </label>

            <Input
              id="filter-payment-date"
              type="date"
              value={selectedDate}
              onChange={(event) => {
                setSelectedDate(event.target.value)
                setCurrentPage(1)
              }}
              className="w-auto"
            />

            <p className="text-xs text-muted-foreground">
              Showing {filteredPayments.length} of {payments.length} payments
            </p>
          </div>
        </div>

        {/* Payment table */}
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Payment ID</TableHead>
                <TableHead>Fee Type</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedPayments.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No payments found. Try changing your search or filters.
                  </TableCell>
                </TableRow>
              )}

              {paginatedPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div className="flex min-w-[170px] items-center gap-3">
                      <PaymentAvatar name={payment.studentName} />

                      <div className="min-w-0">
                        <p className="font-medium">{payment.studentName}</p>
                        <p className="text-xs text-muted-foreground">
                          {payment.studentId} · Class {payment.className}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="font-mono text-xs whitespace-nowrap">
                    {payment.id}
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    {payment.feeType}
                  </TableCell>

                  <TableCell className="text-sm whitespace-nowrap">
                    {payment.method}
                  </TableCell>

                  <TableCell className="text-sm whitespace-nowrap">
                    {formatDate(payment.date)}
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={payment.status} />
                  </TableCell>

                  <TableCell className="text-right font-medium">
                    {formatCurrency(payment.amount)}
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`View payment ${payment.id}`}
                        onClick={() => {
                          setSelectedPayment(payment)
                          setReceiptOpen(true)
                        }}
                      >
                        <Eye className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex flex-col gap-4 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {filteredPayments.length === 0 ? 0 : startIndex + 1}–
                  {endIndex}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {filteredPayments.length}
                </span>{" "}
                payments
              </p>

              <select
                className="h-8 rounded-md border border-input bg-background px-2 text-sm"
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value))
                  setCurrentPage(1)
                }}
                aria-label="Payments per page"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={safeCurrentPage <= 1}
                onClick={() =>
                  setCurrentPage((current) => Math.max(1, current - 1))
                }
              >
                Previous
              </Button>

              <span className="text-sm text-muted-foreground">
                Page {safeCurrentPage} of {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={safeCurrentPage >= totalPages}
                onClick={() =>
                  setCurrentPage((current) => Math.min(totalPages, current + 1))
                }
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Record payment dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>
              Record a payment already received by the school.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSavePayment} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Student *">
                <select
                  className={selectClass}
                  value={studentId}
                  onChange={(event) => setStudentId(event.target.value)}
                  required
                >
                  <option value="">Select student</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} — {student.className}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Fee Type *">
                <select
                  className={selectClass}
                  value={feeType}
                  onChange={(event) => setFeeType(event.target.value)}
                >
                  {feeTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Amount (₹) *">
                <Input
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  required
                />
              </FormField>

              <FormField label="Payment Method *">
                <select
                  className={selectClass}
                  value={method}
                  onChange={(event) => setMethod(event.target.value)}
                >
                  {paymentMethods.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Payment Date *">
                <Input
                  type="date"
                  value={paymentDate}
                  onChange={(event) => setPaymentDate(event.target.value)}
                  required
                />
              </FormField>

              <FormField label="Transaction / Reference ID">
                <Input
                  value={transactionId}
                  onChange={(event) => setTransactionId(event.target.value)}
                  placeholder={
                    method === "Cash"
                      ? "Optional for cash"
                      : "Enter reference ID"
                  }
                  required={method !== "Cash"}
                />
              </FormField>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Amount to record</p>
              <p className="mt-1 text-2xl font-bold tracking-tight">
                {formatCurrency(Number(amount) || 0)}
              </p>
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
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Plus className="mr-2 size-4" />
                Record Payment
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Receipt dialog */}
      <Dialog open={receiptOpen} onOpenChange={setReceiptOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Payment Receipt</DialogTitle>
            <DialogDescription>
              Vidyahub School Management System
            </DialogDescription>
          </DialogHeader>

          {selectedPayment && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 rounded-lg border p-4">
                <div className="rounded-lg bg-primary/10 p-3 text-primary">
                  <FileText className="size-6" />
                </div>
                <div>
                  <p className="font-semibold">Payment Details</p>
                  <p className="text-xs text-muted-foreground">
                    Receipt #{selectedPayment.id}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  ["Student", selectedPayment.studentName],
                  ["Student ID", selectedPayment.studentId],
                  ["Class", selectedPayment.className],
                  ["Fee Type", selectedPayment.feeType],
                  ["Payment Date", formatDate(selectedPayment.date)],
                  ["Payment Method", selectedPayment.method],
                  ["Transaction ID", selectedPayment.transactionId],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <span className="text-muted-foreground">{label}</span>
                    <span className="max-w-56 text-right font-medium break-all">
                      {value}
                    </span>
                  </div>
                ))}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <StatusBadge status={selectedPayment.status} />
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="mt-1 text-3xl font-bold tracking-tight">
                  {formatCurrency(selectedPayment.amount)}
                </p>
              </div>

              {selectedPayment.status === "Success" ? (
                <p className="text-center text-xs text-muted-foreground">
                  Keep this receipt for your records.
                </p>
              ) : (
                <p className="text-center text-xs text-muted-foreground">
                  This transaction is not confirmed as successful.
                </p>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setReceiptOpen(false)}>
              Close
            </Button>
            <Button onClick={() => window.print()}>
              <Printer className="mr-2 size-4" />
              Print Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
