
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  ShieldCheck,
  Plus,
  Search,
  Save,
  Trash2,
  Pencil,
  Users,
  LockKeyhole,
  CheckSquare,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
} from "@/components/ui/dialog";

type Action = "view" | "create" | "edit" | "delete" | "export" | "approve";

type ModuleItem = {
  id: string;
  label: string;
  group: string;
};

type Role = {
  id: string;
  name: string;
  description: string;
  system: boolean;
  permissions: Record<string, Action[]>;
};

const actions: { id: Action; label: string }[] = [
  { id: "view", label: "View" },
  { id: "create", label: "Create" },
  { id: "edit", label: "Edit" },
  { id: "delete", label: "Delete" },
  { id: "export", label: "Export" },
  { id: "approve", label: "Approve" },
];

const modules: ModuleItem[] = [
  { id: "dashboard", label: "Dashboard", group: "General" },
  { id: "students", label: "Students", group: "Academic Management" },
  { id: "teachers", label: "Teachers", group: "Academic Management" },
  { id: "classes", label: "Classes & Sections", group: "Academic Management" },
  { id: "subjects", label: "Subjects", group: "Academic Management" },
  { id: "attendance", label: "Attendance", group: "Academic Management" },
  { id: "assignments", label: "Assignments", group: "Academic Management" },
  { id: "exams", label: "Exams & Results", group: "Academic Management" },
  { id: "parents", label: "Parents", group: "People Management" },
  { id: "fees", label: "Fees & Payments", group: "Finance" },
  { id: "transport", label: "Transport", group: "Operations" },
  { id: "reports", label: "Reports", group: "Operations" },
  { id: "notifications", label: "Notifications", group: "Operations" },
  { id: "roles", label: "Roles & Permissions", group: "Administration" },
  { id: "settings", label: "Application Settings", group: "Administration" },
];

const allActions = actions.map((action) => action.id);
const groupNames = [...new Set(modules.map((module) => module.group))];

function emptyPermissions(): Record<string, Action[]> {
  return Object.fromEntries(modules.map((module) => [module.id, []]));
}

function makePermissions(
  allowedModules: string[],
  allowedActions: Action[],
): Record<string, Action[]> {
  return Object.fromEntries(
    modules.map((module) => [
      module.id,
      allowedModules.includes(module.id) ? [...allowedActions] : [],
    ]),
  );
}

const initialRoles: Role[] = [
  {
    id: "role-admin",
    name: "Super Admin",
    description: "Full access to all application modules.",
    system: true,
    permissions: makePermissions(
      modules.map((module) => module.id),
      allActions,
    ),
  },
  {
    id: "role-teacher",
    name: "Teacher",
    description: "Access to classroom and academic activities.",
    system: true,
    permissions: makePermissions(
      [
        "dashboard",
        "students",
        "classes",
        "subjects",
        "attendance",
        "assignments",
        "exams",
        "notifications",
        "reports",
      ],
      ["view", "create", "edit", "export"],
    ),
  },
  {
    id: "role-accountant",
    name: "Accountant",
    description: "Manage fees, payments, and financial reports.",
    system: true,
    permissions: makePermissions(
      ["dashboard", "students", "parents", "fees", "reports", "notifications"],
      ["view", "create", "edit", "export", "approve"],
    ),
  },
  {
    id: "role-parent",
    name: "Parent",
    description: "Read-only access to relevant student information.",
    system: true,
    permissions: makePermissions(
      [
        "dashboard",
        "students",
        "attendance",
        "assignments",
        "exams",
        "fees",
        "transport",
        "notifications",
      ],
      ["view"],
    ),
  },
];

export default function RolesPermissions() {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [selectedRoleId, setSelectedRoleId] = useState("role-admin");
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [message, setMessage] = useState("");

  const selectedRole = roles.find((role) => role.id === selectedRoleId);

  const filteredModules = useMemo(
    () =>
      modules.filter((module) =>
        `${module.label} ${module.group}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [search],
  );

  const visibleGroups = groupNames.filter((group) =>
    filteredModules.some((module) => module.group === group),
  );

  const enabledCount = selectedRole
    ? Object.values(selectedRole.permissions).reduce(
        (total, permissionList) => total + permissionList.length,
        0,
      )
    : 0;

  const totalPermissions = modules.length * actions.length;

  function updateRole(
    roleId: string,
    updater: (role: Role) => Role,
  ) {
    setRoles((current) =>
      current.map((role) => (role.id === roleId ? updater(role) : role)),
    );
    setMessage("");
  }

  function togglePermission(
    moduleId: string,
    action: Action,
    checked: boolean,
  ) {
    if (!selectedRole) return;

    updateRole(selectedRole.id, (role) => {
      const current = role.permissions[moduleId] ?? [];
      const next = checked
        ? [...new Set([...current, action])]
        : current.filter((item) => item !== action);

      return {
        ...role,
        permissions: { ...role.permissions, [moduleId]: next },
      };
    });
  }

  function toggleModule(moduleId: string, checked: boolean) {
    if (!selectedRole) return;

    updateRole(selectedRole.id, (role) => ({
      ...role,
      permissions: {
        ...role.permissions,
        [moduleId]: checked ? [...allActions] : [],
      },
    }));
  }

  function toggleGroup(group: string, checked: boolean) {
    if (!selectedRole) return;

    updateRole(selectedRole.id, (role) => {
      const nextPermissions = { ...role.permissions };

      modules
        .filter((module) => module.group === group)
        .forEach((module) => {
          nextPermissions[module.id] = checked ? [...allActions] : [];
        });

      return { ...role, permissions: nextPermissions };
    });
  }

  function toggleAll(checked: boolean) {
    if (!selectedRole) return;

    updateRole(selectedRole.id, (role) => ({
      ...role,
      permissions: checked
        ? makePermissions(
            modules.map((module) => module.id),
            allActions,
          )
        : emptyPermissions(),
    }));
  }

  function hasAllModuleActions(moduleId: string) {
    return (selectedRole?.permissions[moduleId]?.length ?? 0) === actions.length;
  }

  function hasAllGroupActions(group: string) {
    return modules
      .filter((module) => module.group === group)
      .every(
        (module) =>
          (selectedRole?.permissions[module.id]?.length ?? 0) === actions.length,
      );
  }

  function openCreateDialog() {
    setEditingRoleId(null);
    setRoleName("");
    setRoleDescription("");
    setDialogOpen(true);
  }

  function openEditDialog(role: Role) {
    setEditingRoleId(role.id);
    setRoleName(role.name);
    setRoleDescription(role.description);
    setDialogOpen(true);
  }

  function submitRole(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = roleName.trim();

    if (!name) return;

    const duplicate = roles.some(
      (role) =>
        role.name.toLowerCase() === name.toLowerCase() &&
        role.id !== editingRoleId,
    );

    if (duplicate) {
      window.alert("A role with this name already exists.");
      return;
    }

    if (editingRoleId) {
      updateRole(editingRoleId, (role) => ({
        ...role,
        name,
        description: roleDescription.trim(),
      }));
    } else {
      const newRole: Role = {
        id: `role-${Date.now()}`,
        name,
        description: roleDescription.trim(),
        system: false,
        permissions: emptyPermissions(),
      };

      setRoles((current) => [...current, newRole]);
      setSelectedRoleId(newRole.id);
      setMessage("");
    }

    setDialogOpen(false);
  }

  function deleteRole(role: Role) {
    if (role.system) {
      window.alert("System roles cannot be deleted.");
      return;
    }

    if (!window.confirm(`Delete the "${role.name}" role?`)) return;

    const remainingRoles = roles.filter((item) => item.id !== role.id);
    setRoles(remainingRoles);
    setSelectedRoleId(remainingRoles[0]?.id ?? "");
    setMessage("");
  }

  function savePermissions() {
    // Demo implementation: connect this handler to your backend API.
    setMessage(
      "Permissions updated in this session. Connect the backend API to save them permanently.",
    );
  }

  return (
    <div className="min-h-screen space-y-5 bg-background p-4 text-foreground md:p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/10 p-3 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Roles & Permissions
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage role-based access across the Vidyahub application.
            </p>
          </div>
        </div>

        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Create Role
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryCard
          icon={<Users className="h-5 w-5" />}
          label="Total Roles"
          value={roles.length}
        />
        <SummaryCard
          icon={<LockKeyhole className="h-5 w-5" />}
          label="Application Modules"
          value={modules.length}
        />
        <SummaryCard
          icon={<CheckSquare className="h-5 w-5" />}
          label="Enabled Permissions"
          value={`${enabledCount}/${totalPermissions}`}
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[270px_minmax(0,1fr)]">
        {/* Roles sidebar */}
        <Card className="gap-0 py-0">
          <CardHeader className="border-b px-4 py-4">
            <CardTitle className="text-base">Application Roles</CardTitle>
            <CardDescription>
              Select a role to configure its access.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-1 p-2">
            {roles.map((role) => {
              const selected = role.id === selectedRoleId;
              const permissionCount = Object.values(role.permissions).reduce(
                (total, items) => total + items.length,
                0,
              );

              return (
                <div
                  key={role.id}
                  className={`flex items-center gap-1 rounded-lg border p-2 ${
                    selected
                      ? "border-primary/40 bg-primary/5"
                      : "border-transparent hover:bg-muted/60"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRoleId(role.id);
                      setMessage("");
                    }}
                    className="min-w-0 flex-1 rounded-md p-1 text-left"
                  >
                    <span className="flex flex-wrap items-center gap-2 text-sm font-medium">
                      {role.name}
                      {role.system && (
                        <Badge variant="secondary" className="text-[10px]">
                          System
                        </Badge>
                      )}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {permissionCount} permissions
                    </span>
                  </button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={() => openEditDialog(role)}
                    aria-label={`Edit ${role.name}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  {!role.system && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0 text-destructive hover:text-destructive"
                      onClick={() => deleteRole(role)}
                      aria-label={`Delete ${role.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Permission matrix */}
        <Card className="min-w-0 gap-0 py-0">
          {selectedRole ? (
            <>
              <CardHeader className="gap-3 border-b px-4 py-4">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <CardTitle className="text-lg">
                      {selectedRole.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {selectedRole.description || "Configure role permissions."}
                    </CardDescription>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAll(true)}
                    >
                      Select All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleAll(false)}
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <div className="flex flex-col justify-between gap-3 border-b p-4 sm:flex-row sm:items-center">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search modules..."
                    className="pl-9"
                  />
                </div>

                <Badge variant="secondary" className="w-fit">
                  {enabledCount} permissions enabled
                </Badge>
              </div>

              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[230px]">
                        Application Module
                      </TableHead>
                      {actions.map((action) => (
                        <TableHead
                          key={action.id}
                          className="min-w-[76px] text-center"
                        >
                          {action.label}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>

                  {visibleGroups.map((group) => {
                    const groupModules = filteredModules.filter(
                      (module) => module.group === group,
                    );

                    return (
                      <TableBody key={group}>
                        <TableRow className="bg-muted/40 hover:bg-muted/40">
                          <TableCell colSpan={7} className="py-2.5">
                            <label className="flex cursor-pointer items-center gap-2 font-semibold">
                              <Checkbox
                                checked={hasAllGroupActions(group)}
                                onCheckedChange={(checked) =>
                                  toggleGroup(group, checked === true)
                                }
                                aria-label={`Select all permissions for ${group}`}
                              />
                              <span>{group}</span>
                              <span className="text-xs font-normal text-muted-foreground">
                                ({groupModules.length} modules)
                              </span>
                            </label>
                          </TableCell>
                        </TableRow>

                        {groupModules.map((module) => {
                          const modulePermissions =
                            selectedRole.permissions[module.id] ?? [];

                          return (
                            <TableRow key={module.id}>
                              <TableCell>
                                <label className="flex cursor-pointer items-center gap-2.5">
                                  <Checkbox
                                    checked={hasAllModuleActions(module.id)}
                                    onCheckedChange={(checked) =>
                                      toggleModule(module.id, checked === true)
                                    }
                                    aria-label={`Select all permissions for ${module.label}`}
                                  />
                                  <span className="text-sm">
                                    {module.label}
                                  </span>
                                </label>
                              </TableCell>

                              {actions.map((action) => (
                                <TableCell
                                  key={action.id}
                                  className="text-center"
                                >
                                  <div className="flex justify-center">
                                    <Checkbox
                                      checked={modulePermissions.includes(
                                        action.id,
                                      )}
                                      onCheckedChange={(checked) =>
                                        togglePermission(
                                          module.id,
                                          action.id,
                                          checked === true,
                                        )
                                      }
                                      aria-label={`${action.label} ${module.label}`}
                                    />
                                  </div>
                                </TableCell>
                              ))}
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    );
                  })}

                  {filteredModules.length === 0 && (
                    <TableBody>
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="h-24 text-center text-muted-foreground"
                        >
                          No modules match your search.
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </div>

              <CardContent className="flex flex-col justify-between gap-3 border-t p-4 sm:flex-row sm:items-center">
                <p className="text-xs text-muted-foreground">
                  Changes are not persisted until connected to the backend.
                </p>
                <Button onClick={savePermissions}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Permissions
                </Button>
              </CardContent>

              {message && (
                <div
                  role="status"
                  className="border-t bg-muted/30 px-4 py-3 text-sm text-muted-foreground"
                >
                  {message}
                </div>
              )}
            </>
          ) : (
            <CardContent className="p-10 text-center text-sm text-muted-foreground">
              Create or select a role to manage its permissions.
            </CardContent>
          )}
        </Card>
      </div>

      {/* Create / edit role dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={submitRole} className="space-y-4">
            <DialogHeader>
              <DialogTitle>
                {editingRoleId ? "Edit Role" : "Create New Role"}
              </DialogTitle>
              <DialogDescription>
                Define a role name and a short description. Configure its
                permissions in the permissions table after saving.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2">
              <label htmlFor="role-name" className="text-sm font-medium">
                Role Name
              </label>
              <Input
                id="role-name"
                value={roleName}
                onChange={(event) => setRoleName(event.target.value)}
                placeholder="e.g. Academic Coordinator"
                maxLength={60}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="role-description"
                className="text-sm font-medium"
              >
                Description
              </label>
              <Textarea
                id="role-description"
                value={roleDescription}
                onChange={(event) => setRoleDescription(event.target.value)}
                placeholder="Describe this role's responsibilities"
                maxLength={250}
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button type="submit">
                <Plus className="mr-2 h-4 w-4" />
                {editingRoleId ? "Update Role" : "Create Role"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <Card className="gap-0 py-0">
      <CardContent className="flex items-center gap-3 p-4">
        <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
          {icon}
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-1 text-xl font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
