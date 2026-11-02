
import { useMemo, useState, type FormEvent } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Mail,
  Plus,
  Search,
  Pencil,
  Trash2,
  MoreHorizontal,
  ShieldCheck,
  CalendarDays,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type UserStatus = "Active" | "Inactive" | "Pending";

type ManagedUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  department: string;
  createdAt: string;
  lastLogin: string;
};

const availableRoles = [
  "Super Admin",
  "School Admin",
  "Teacher",
  "Accountant",
  "Parent",
  "Student",
];

const initialUsers: ManagedUser[] = [
  {
    id: "USR-001",
    name: "Ananya Sharma",
    email: "ananya@example.com",
    role: "Teacher",
    status: "Active",
    department: "Mathematics",
    createdAt: "2026-09-01",
    lastLogin: "2026-10-29",
  },
  {
    id: "USR-002",
    name: "Rahul Kumar",
    email: "rahul@example.com",
    role: "Parent",
    status: "Active",
    department: "Primary School",
    createdAt: "2026-09-05",
    lastLogin: "2026-10-28",
  },
  {
    id: "USR-003",
    name: "Priya Reddy",
    email: "priya@example.com",
    role: "Accountant",
    status: "Active",
    department: "Finance",
    createdAt: "2026-09-10",
    lastLogin: "2026-10-27",
  },
  {
    id: "USR-004",
    name: "Arjun Mehta",
    email: "arjun@example.com",
    role: "Student",
    status: "Inactive",
    department: "Grade 10",
    createdAt: "2026-09-12",
    lastLogin: "Never",
  },
  {
    id: "USR-005",
    name: "Sneha Rao",
    email: "sneha@example.com",
    role: "Teacher",
    status: "Pending",
    department: "Science",
    createdAt: "2026-10-01",
    lastLogin: "Never",
  },
  {
    id: "USR-006",
    name: "Vikram Singh",
    email: "vikram@example.com",
    role: "School Admin",
    status: "Active",
    department: "Administration",
    createdAt: "2026-08-15",
    lastLogin: "2026-10-29",
  },
];

const emptyForm = {
  name: "",
  email: "",
  role: "Teacher",
  department: "",
  status: "Active" as UserStatus,
};

type UserFormValues = typeof emptyForm;

export default function UserManagement() {
  const [users, setUsers] = useState<ManagedUser[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<UserFormValues>(emptyForm);
  const [formError, setFormError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<ManagedUser | null>(null);
  const [notice, setNotice] = useState("");

  const activeCount = users.filter((user) => user.status === "Active").length;
  const inactiveCount = users.filter(
    (user) => user.status === "Inactive",
  ).length;
  const pendingCount = users.filter(
    (user) => user.status === "Pending",
  ).length;

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        [user.name, user.email, user.id, user.department]
          .some((value) => value.toLowerCase().includes(query));

      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  function openCreateForm() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setFormError("");
    setFormOpen(true);
  }

  function openEditForm(user: ManagedUser) {
    setEditingId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      status: user.status,
    });
    setFormError("");
    setFormOpen(true);
  }

  function handleSaveUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const department = form.department.trim();

    if (!name || !email || !department) {
      setFormError("Please complete all required fields.");
      return;
    }

    const duplicateEmail = users.some(
      (user) =>
        user.email.toLowerCase() === email && user.id !== editingId,
    );

    if (duplicateEmail) {
      setFormError("An account with this email address already exists.");
      return;
    }

    if (editingId) {
      setUsers((current) =>
        current.map((user) =>
          user.id === editingId
            ? {
                ...user,
                name,
                email,
                role: form.role,
                department,
                status: form.status,
              }
            : user,
        ),
      );
      setNotice("User details updated in this session.");
    } else {
      const newUser: ManagedUser = {
        id: `USR-${Date.now().toString().slice(-8)}`,
        name,
        email,
        role: form.role,
        department,
        status: form.status,
        createdAt: new Date().toISOString().slice(0, 10),
        lastLogin: "Never",
      };

      setUsers((current) => [newUser, ...current]);
      setNotice("User added to the current session.");
    }

    setFormOpen(false);
  }

  function toggleStatus(user: ManagedUser) {
    const nextStatus: UserStatus =
      user.status === "Active" ? "Inactive" : "Active";

    setUsers((current) =>
      current.map((item) =>
        item.id === user.id ? { ...item, status: nextStatus } : item,
      ),
    );

    setNotice(
      `${user.name}'s status changed to ${nextStatus}.`,
    );
  }

  function confirmDelete() {
    if (!deleteTarget) return;

    setUsers((current) =>
      current.filter((user) => user.id !== deleteTarget.id),
    );
    setNotice(`${deleteTarget.name}'s demo account was removed.`);
    setDeleteTarget(null);
  }

  function resetFilters() {
    setSearch("");
    setRoleFilter("all");
    setStatusFilter("all");
  }

  function statusBadge(status: UserStatus) {
    switch (status) {
      case "Active":
        return (
          <Badge className="border-transparent bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/10 dark:text-emerald-400">
            Active
          </Badge>
        );
      case "Inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "Pending":
        return (
          <Badge className="border-transparent bg-amber-500/10 text-amber-700 hover:bg-amber-500/10 dark:text-amber-400">
            Pending
          </Badge>
        );
    }
  }

  function initials(name: string) {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");
  }

  return (
    <div className="min-h-screen space-y-5 bg-background p-4 text-foreground md:p-6">
      {/* Page header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/10 p-3 text-primary">
            <Users className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              User Management
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage user accounts, roles, and application access.
            </p>
          </div>
        </div>

        <Button onClick={openCreateForm}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Users"
          value={users.length}
          description="All registered accounts"
          icon={<Users className="h-5 w-5" />}
        />
        <SummaryCard
          title="Active Users"
          value={activeCount}
          description="Enabled accounts"
          icon={<UserCheck className="h-5 w-5" />}
        />
        <SummaryCard
          title="Inactive Users"
          value={inactiveCount}
          description="Disabled accounts"
          icon={<UserX className="h-5 w-5" />}
        />
        <SummaryCard
          title="Pending Invitations"
          value={pendingCount}
          description="Awaiting activation"
          icon={<Mail className="h-5 w-5" />}
        />
      </div>

      {/* User table */}
      <Card className="gap-0 py-0">
        <CardHeader className="gap-4 border-b px-4 py-4 sm:px-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <CardTitle className="text-base">All Users</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                {filteredUsers.length} of {users.length} accounts
              </p>
            </div>

            <Button variant="outline" size="sm" onClick={resetFilters}>
              <RefreshCw className="mr-2 h-3.5 w-3.5" />
              Reset Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(220px,1fr)_190px_170px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search name, email, ID..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value ?? "all")}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {availableRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value ?? "all")}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[250px]">User</TableHead>
                <TableHead className="min-w-[140px]">Role</TableHead>
                <TableHead className="min-w-[145px]">Department</TableHead>
                <TableHead className="min-w-[110px]">Status</TableHead>
                <TableHead className="min-w-[125px]">Last Login</TableHead>
                <TableHead className="w-[65px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                          {initials(user.name)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="font-medium">{user.name}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {user.email}
                        </p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {user.id}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="text-sm">{user.role}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-sm">
                    {user.department}
                  </TableCell>

                  <TableCell>{statusBadge(user.status)}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                      {user.lastLogin === "Never"
                        ? "Never"
                        : user.lastLogin}
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Actions for ${user.name}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditForm(user)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => toggleStatus(user)}>
                          {user.status === "Active" ? (
                            <>
                              <UserX className="mr-2 h-4 w-4" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>

                        {user.status === "Pending" && (
                          <DropdownMenuItem
                            onClick={() =>
                              setNotice(
                                `Demo invitation reminder prepared for ${user.email}. Connect an email service to send it.`,
                              )
                            }
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Resend Invitation
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleteTarget(user)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}

              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No users found. Try changing the search or filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <CardContent className="flex flex-col justify-between gap-2 border-t px-4 py-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-5">
          <span>
            Showing {filteredUsers.length} of {users.length} users
          </span>
          <span>Sample data · Not connected to the backend</span>
        </CardContent>
      </Card>

      {/* Add / edit user dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <form onSubmit={handleSaveUser} className="space-y-4">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit User" : "Add New User"}
              </DialogTitle>
              <DialogDescription>
                Enter the account details and assign an application role.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-1.5">
              <label htmlFor="user-name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="user-name"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="Enter full name"
                maxLength={100}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="user-email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="user-email"
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                placeholder="name@example.com"
                maxLength={254}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Application Role</label>
                <Select
                    value={form.role}
                    onValueChange={(value) => {
                    if (value === null) return;

                    setForm((current) => ({
                    ...current,
                    role: value,
                    }));
                    }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRoles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Account Status</label>
                <Select
                  value={form.status}
                  onValueChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      status: value as UserStatus,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="user-department"
                className="text-sm font-medium"
              >
                Department / Class
              </label>
              <Input
                id="user-department"
                value={form.department}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    department: event.target.value,
                  }))
                }
                placeholder="e.g. Science, Grade 10, Finance"
                maxLength={100}
                required
              />
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
                {editingId ? "Save Changes" : "Create User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this user?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the demo account for{" "}
              <span className="font-medium text-foreground">
                {deleteTarget?.name}
              </span>{" "}
              from this page's current state. In production, verify the
              account's dependencies and authorization before deleting it.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Action feedback */}
      <Dialog open={Boolean(notice)} onOpenChange={() => setNotice("")}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Action status</DialogTitle>
            <DialogDescription>{notice}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setNotice("")}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="gap-0 py-0">
      <CardContent className="flex items-center gap-3 p-4">
        <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
