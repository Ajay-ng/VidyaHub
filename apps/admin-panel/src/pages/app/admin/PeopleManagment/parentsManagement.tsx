
import { useMemo, useState, type FormEvent } from "react";
import {
  Users,
  UserRoundPlus,
  Search,
  Download,
  Eye,
  Pencil,
  Mail,
  Phone,
  GraduationCap,
  ShieldCheck,
  Link2,
  MoreHorizontal,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Guardian = {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
  children: string[];
  verified: boolean;
  portalStatus: "Active" | "Invited" | "Inactive";
};

const studentOptions = [
  { id: "STU1001", name: "Aarav Sharma", className: "Class 8 - A" },
  { id: "STU1002", name: "Diya Reddy", className: "Class 9 - B" },
  { id: "STU1003", name: "Rahul Kumar", className: "Class 10 - A" },
  { id: "STU1004", name: "Ananya Rao", className: "Class 7 - C" },
  { id: "STU1005", name: "Ishaan Patel", className: "Class 8 - B" },
  { id: "STU1006", name: "Meera Nair", className: "Class 5 - A" },
];

const initialGuardians: Guardian[] = [
  {
    id: "GDN-1001",
    name: "Ravi Sharma",
    relationship: "Father",
    phone: "9876543210",
    email: "ravi.sharma@example.com",
    address: "Bengaluru, Karnataka",
    children: ["STU1001", "STU1006"],
    verified: true,
    portalStatus: "Active",
  },
  {
    id: "GDN-1002",
    name: "Priya Reddy",
    relationship: "Mother",
    phone: "9876543211",
    email: "priya.reddy@example.com",
    address: "Bengaluru, Karnataka",
    children: ["STU1002"],
    verified: true,
    portalStatus: "Active",
  },
  {
    id: "GDN-1003",
    name: "Suresh Kumar",
    relationship: "Guardian",
    phone: "9876543212",
    email: "suresh.kumar@example.com",
    address: "Mysuru, Karnataka",
    children: ["STU1003"],
    verified: false,
    portalStatus: "Invited",
  },
  {
    id: "GDN-1004",
    name: "Meena Rao",
    relationship: "Mother",
    phone: "9876543213",
    email: "meena.rao@example.com",
    address: "Bengaluru, Karnataka",
    children: ["STU1004"],
    verified: true,
    portalStatus: "Inactive",
  },
  {
    id: "GDN-1005",
    name: "Kiran Patel",
    relationship: "Father",
    phone: "9876543214",
    email: "kiran.patel@example.com",
    address: "Tumakuru, Karnataka",
    children: ["STU1005"],
    verified: false,
    portalStatus: "Active",
  },
];

const emptyForm = {
  name: "",
  relationship: "Father",
  phone: "",
  email: "",
  address: "",
  children: [] as string[],
  portalStatus: "Invited" as Guardian["portalStatus"],
};

export default function ParentsGuardians() {
  const [guardians, setGuardians] =
    useState<Guardian[]>(initialGuardians);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] =
    useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedGuardian, setSelectedGuardian] =
    useState<Guardian | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const stats = useMemo(() => {
    const verified = guardians.filter(
      (guardian) => guardian.verified
    ).length;

    const linkedStudentIds = new Set(
      guardians.flatMap((guardian) => guardian.children)
    );

    return {
      total: guardians.length,
      verified,
      linkedStudents: linkedStudentIds.size,
      pending: guardians.filter(
        (guardian) =>
          !guardian.verified ||
          guardian.portalStatus === "Invited"
      ).length,
    };
  }, [guardians]);

  const filteredGuardians = useMemo(() => {
    const query = search.trim().toLowerCase();

    return guardians.filter((guardian) => {
      const matchesSearch =
        guardian.name.toLowerCase().includes(query) ||
        guardian.id.toLowerCase().includes(query) ||
        guardian.phone.includes(query) ||
        guardian.email.toLowerCase().includes(query) ||
        guardian.children.some((id) => {
          const student = studentOptions.find(
            (item) => item.id === id
          );
          return student?.name.toLowerCase().includes(query);
        });

      const matchesClass =
        classFilter === "all" ||
        guardian.children.some((id) => {
          const student = studentOptions.find(
            (item) => item.id === id
          );
          return student?.className === classFilter;
        });

      const matchesStatus =
        statusFilter === "all" ||
        guardian.portalStatus === statusFilter;

      const matchesVerification =
        verificationFilter === "all" ||
        (verificationFilter === "verified" &&
          guardian.verified) ||
        (verificationFilter === "unverified" &&
          !guardian.verified);

      return (
        matchesSearch &&
        matchesClass &&
        matchesStatus &&
        matchesVerification
      );
    });
  }, [
    guardians,
    search,
    classFilter,
    statusFilter,
    verificationFilter,
  ]);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
  }

  function openAddDialog() {
    resetForm();
    setDialogOpen(true);
  }

  function openEditDialog(guardian: Guardian) {
    setEditingId(guardian.id);
    setForm({
      name: guardian.name,
      relationship: guardian.relationship,
      phone: guardian.phone,
      email: guardian.email,
      address: guardian.address,
      children: [...guardian.children],
      portalStatus: guardian.portalStatus,
    });
    setError("");
    setDialogOpen(true);
    setDetailsOpen(false);
  }

  function handleSaveGuardian(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const normalizedEmail = form.email.trim().toLowerCase();
    const normalizedPhone = form.phone.trim();

    if (
      !form.name.trim() ||
      !normalizedPhone ||
      !normalizedEmail ||
      !form.relationship
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(normalizedPhone)) {
      setError("Enter a valid phone number.");
      return;
    }

    const duplicateEmail = guardians.some(
      (guardian) =>
        guardian.email.toLowerCase() === normalizedEmail &&
        guardian.id !== editingId
    );

    if (duplicateEmail) {
      setError("A guardian with this email already exists.");
      return;
    }

    if (editingId) {
      setGuardians((previous) =>
        previous.map((guardian) =>
          guardian.id === editingId
            ? {
                ...guardian,
                name: form.name.trim(),
                relationship: form.relationship,
                phone: normalizedPhone,
                email: normalizedEmail,
                address: form.address.trim(),
                children: form.children,
                portalStatus: form.portalStatus,
              }
            : guardian
        )
      );
    } else {
      const newGuardian: Guardian = {
        id: `GDN-${Date.now()}`,
        name: form.name.trim(),
        relationship: form.relationship,
        phone: normalizedPhone,
        email: normalizedEmail,
        address: form.address.trim(),
        children: form.children,
        verified: false,
        portalStatus: form.portalStatus,
      };

      setGuardians((previous) => [
        newGuardian,
        ...previous,
      ]);
    }

    setDialogOpen(false);
    resetForm();
  }

  function toggleStudent(studentId: string) {
    setForm((previous) => ({
      ...previous,
      children: previous.children.includes(studentId)
        ? previous.children.filter((id) => id !== studentId)
        : [...previous.children, studentId],
    }));
  }

  function toggleVerification(guardian: Guardian) {
    setGuardians((previous) =>
      previous.map((item) =>
        item.id === guardian.id
          ? { ...item, verified: !item.verified }
          : item
      )
    );
  }

  function togglePortalStatus(guardian: Guardian) {
    setGuardians((previous) =>
      previous.map((item) =>
        item.id === guardian.id
          ? {
              ...item,
              portalStatus:
                item.portalStatus === "Inactive"
                  ? "Active"
                  : "Inactive",
            }
          : item
      )
    );

    if (selectedGuardian?.id === guardian.id) {
      setSelectedGuardian({
        ...guardian,
        portalStatus:
          guardian.portalStatus === "Inactive"
            ? "Active"
            : "Inactive",
      });
    }
  }

  function exportCSV() {
    const headers = [
      "Guardian ID",
      "Name",
      "Relationship",
      "Phone",
      "Email",
      "Linked Students",
      "Portal Status",
      "Verified",
    ];

    const rows = filteredGuardians.map((guardian) => [
      guardian.id,
      guardian.name,
      guardian.relationship,
      guardian.phone,
      guardian.email,
      guardian.children
        .map(
          (id) =>
            studentOptions.find((student) => student.id === id)
              ?.name ?? id
        )
        .join("; "),
      guardian.portalStatus,
      guardian.verified ? "Yes" : "No",
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "parents-guardians.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  const statCards = [
    {
      label: "Total Guardians",
      value: stats.total,
      description: "Registered guardian profiles",
      icon: Users,
    },
    {
      label: "Verified Contacts",
      value: stats.verified,
      description: "Contacts marked verified",
      icon: ShieldCheck,
    },
    {
      label: "Linked Students",
      value: stats.linkedStudents,
      description: "Unique students linked",
      icon: GraduationCap,
    },
    {
      label: "Pending Actions",
      value: stats.pending,
      description: "Verification or invitations",
      icon: UserRoundPlus,
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Parents & Guardians
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage guardian profiles, linked students and portal access.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={exportCSV}>
            <Download className="mr-2 size-4" />
            Export CSV
          </Button>

          <Button onClick={openAddDialog}>
            <UserRoundPlus className="mr-2 size-4" />
            Add Guardian
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.label}>
              <CardContent className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-2xl font-bold">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
                <div className="rounded-lg bg-primary/20 p-2">
                  <Icon className="size-5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Directory */}
      <Card>
        <CardContent className="space-y-4 p-4 md:p-5">
          <div>
            <h2 className="text-lg font-semibold">
              Guardian Directory
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Search guardians, view their children and manage access.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="relative xl:col-span-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search name, phone, email..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <Select
              value={classFilter}
              onValueChange={(value) =>
                setClassFilter(value ?? "all")
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {[...new Set(studentOptions.map((s) => s.className))]
                  .sort()
                  .map((className) => (
                    <SelectItem key={className} value={className}>
                      {className}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value ?? "all")
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Portal Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Portal Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Invited">Invited</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={verificationFilter}
              onValueChange={(value) =>
                setVerificationFilter(value ?? "all")
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Contacts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Contacts</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="unverified">Unverified</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guardian</TableHead>
                  <TableHead>Relationship</TableHead>
                  <TableHead>Linked Students</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Portal</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredGuardians.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-28 text-center text-muted-foreground"
                    >
                      No guardians found. Try changing your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredGuardians.map((guardian) => {
                    const children = guardian.children
                      .map((id) =>
                        studentOptions.find(
                          (student) => student.id === id
                        )
                      )
                      .filter(
                        (student): student is (typeof studentOptions)[number] =>
                          Boolean(student)
                      );

                    return (
                      <TableRow key={guardian.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold">
                              {guardian.name
                                .split(" ")
                                .map((part) => part[0])
                                .slice(0, 2)
                                .join("")
                                .toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium">
                                {guardian.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {guardian.id}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge variant="secondary">
                            {guardian.relationship}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          {children.length > 0 ? (
                            <div className="space-y-1">
                              {children.slice(0, 2).map((student) => (
                                <p
                                  key={student.id}
                                  className="text-sm"
                                >
                                  {student.name}
                                  <span className="ml-1 text-xs text-muted-foreground">
                                    ({student.className})
                                  </span>
                                </p>
                              ))}
                              {children.length > 2 && (
                                <p className="text-xs text-muted-foreground">
                                  +{children.length - 2} more
                                </p>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              No student linked
                            </span>
                          )}
                        </TableCell>

                        <TableCell>
                          <div className="space-y-1 text-sm">
                            <p className="flex items-center gap-2">
                              <Phone className="size-3.5 text-muted-foreground" />
                              {guardian.phone}
                            </p>
                            <p className="flex max-w-48 items-center gap-2">
                              <Mail className="size-3.5 shrink-0 text-muted-foreground" />
                              <span className="truncate">
                                {guardian.email}
                              </span>
                            </p>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant={
                              guardian.portalStatus === "Active"
                                ? "secondary"
                                : guardian.portalStatus === "Invited"
                                  ? "outline"
                                  : "destructive"
                            }
                          >
                            {guardian.portalStatus}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <button
                            type="button"
                            onClick={() => toggleVerification(guardian)}
                            title="Toggle demo verification status"
                            className="inline-flex items-center gap-1.5 text-sm"
                          >
                            <span
                              className={
                                guardian.verified
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }
                            >
                              {guardian.verified
                                ? "Verified"
                                : "Unverified"}
                            </span>
                            <span
                              className={
                                guardian.verified
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }
                            >
                              <ShieldCheck className="size-4" />
                            </span>
                          </button>
                        </TableCell>

                        <TableCell>
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label={`View ${guardian.name}`}
                              onClick={() => {
                                setSelectedGuardian(guardian);
                                setDetailsOpen(true);
                              }}
                            >
                              <Eye className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label={`Edit ${guardian.name}`}
                              onClick={() => openEditDialog(guardian)}
                            >
                              <Pencil className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label={`Toggle portal access for ${guardian.name}`}
                              title={
                                guardian.portalStatus === "Inactive"
                                  ? "Activate demo access"
                                  : "Deactivate demo access"
                              }
                              onClick={() => togglePortalStatus(guardian)}
                            >
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredGuardians.length} of {guardians.length} guardians
          </div>
        </CardContent>
      </Card>

      {/* Add / Edit Guardian dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(value) => {
          setDialogOpen(value);
          if (!value) resetForm();
        }}
      >
        <DialogTrigger
          render={<span className="hidden" />}
        />
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Guardian" : "Add Parent / Guardian"}
            </DialogTitle>
            <DialogDescription>
              Enter the guardian's contact information and link their children.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveGuardian} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="guardian-name">Full Name *</Label>
                <Input
                  id="guardian-name"
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Relationship *</Label>
                <Select
                  value={form.relationship}
                  onValueChange={(value) =>
                    setForm({
                      ...form,
                      relationship: value ?? "Father",
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Father">Father</SelectItem>
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="Legal Guardian">
                      Legal Guardian
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guardian-phone">Phone Number *</Label>
                <Input
                  id="guardian-phone"
                  value={form.phone}
                  onChange={(event) =>
                    setForm({ ...form, phone: event.target.value })
                  }
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="guardian-email">Email Address *</Label>
                <Input
                  id="guardian-email"
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="guardian-address">Address</Label>
                <Input
                  id="guardian-address"
                  value={form.address}
                  onChange={(event) =>
                    setForm({ ...form, address: event.target.value })
                  }
                  placeholder="City, state"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Link Students</Label>
              <div className="max-h-44 space-y-2 overflow-y-auto rounded-lg border p-3">
                {studentOptions.map((student) => (
                  <label
                    key={student.id}
                    className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-accent"
                  >
                    <input
                      type="checkbox"
                      className="size-4 accent-primary"
                      checked={form.children.includes(student.id)}
                      onChange={() => toggleStudent(student.id)}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">
                        {student.name}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {student.id} · {student.className}
                      </span>
                    </span>
                    <Link2 className="size-4 text-muted-foreground" />
                  </label>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Select one or more students. You can also save a guardian
                without linking a student yet.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Portal Status</Label>
              <Select
                value={form.portalStatus}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    portalStatus:
                      (value as Guardian["portalStatus"]) ?? "Invited",
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select portal status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Invited">Invited</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingId ? "Save Changes" : "Add Guardian"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Guardian details dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-lg">
          {selectedGuardian && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedGuardian.name}</DialogTitle>
                <DialogDescription>
                  Guardian profile · {selectedGuardian.id}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    {selectedGuardian.relationship}
                  </Badge>
                  <Badge
                    variant={
                      selectedGuardian.portalStatus === "Active"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    Portal: {selectedGuardian.portalStatus}
                  </Badge>
                  <Badge variant="outline">
                    {selectedGuardian.verified
                      ? "Verified"
                      : "Unverified"}
                  </Badge>
                </div>

                <div className="space-y-3 rounded-lg border p-3">
                  <p className="flex items-center gap-3 text-sm">
                    <Phone className="size-4 text-muted-foreground" />
                    {selectedGuardian.phone}
                  </p>
                  <p className="flex items-center gap-3 text-sm">
                    <Mail className="size-4 text-muted-foreground" />
                    {selectedGuardian.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Address: {selectedGuardian.address || "Not provided"}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 font-semibold">Linked Students</h3>
                  {selectedGuardian.children.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No students linked to this guardian.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {selectedGuardian.children.map((id) => {
                        const student = studentOptions.find(
                          (item) => item.id === id
                        );

                        if (!student) return null;

                        return (
                          <div
                            key={id}
                            className="flex items-center gap-3 rounded-lg border p-3"
                          >
                            <div className="rounded-lg bg-primary/20 p-2">
                              <GraduationCap className="size-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {student.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {student.id} · {student.className}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => toggleVerification(selectedGuardian)}
                  >
                    {selectedGuardian.verified
                      ? "Mark Unverified"
                      : "Mark Verified"}
                  </Button>
                  <Button
                    onClick={() => openEditDialog(selectedGuardian)}
                  >
                    <Pencil className="mr-2 size-4" />
                    Edit Guardian
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
