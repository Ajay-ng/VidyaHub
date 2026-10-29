
import { useMemo, useState } from "react";
import {
  Bus,
  MapPin,
  Users,
  Wrench,
  Plus,
  Search,
  Download,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  Clock,
  CheckCircle2,
} from "lucide-react";

type VehicleStatus = "Active" | "Inactive" | "Maintenance";
type RecordStatus = "Active" | "Inactive";
type MaintenanceStatus = "Scheduled" | "Completed" | "Overdue";

type Tab =
  | "Vehicles"
  | "Routes & Stops"
  | "Student Allocation"
  | "Drivers & Attendants"
  | "Maintenance";

type Vehicle = {
  id: number;
  number: string;
  model: string;
  capacity: number;
  driver: string;
  route: string;
  status: VehicleStatus;
};

type TransportRoute = {
  id: number;
  name: string;
  vehicle: string;
  stops: string;
  startTime: string;
  endTime: string;
  status: RecordStatus;
};

type Allocation = {
  id: number;
  student: string;
  className: string;
  route: string;
  stop: string;
  vehicle: string;
};

type TransportStaff = {
  id: number;
  name: string;
  role: "Driver" | "Attendant";
  phone: string;
  license: string;
  status: RecordStatus;
};

type Maintenance = {
  id: number;
  vehicle: string;
  service: string;
  dueDate: string;
  cost: number;
  status: MaintenanceStatus;
};

const initialVehicles: Vehicle[] = [
  {
    id: 1,
    number: "KA-01-AB-1234",
    model: "Tata Starbus",
    capacity: 40,
    driver: "Ramesh Kumar",
    route: "Route 1",
    status: "Active",
  },
  {
    id: 2,
    number: "KA-01-CD-5678",
    model: "Ashok Leyland",
    capacity: 35,
    driver: "Suresh Rao",
    route: "Route 2",
    status: "Active",
  },
  {
    id: 3,
    number: "KA-01-EF-9012",
    model: "Force Traveller",
    capacity: 20,
    driver: "Mahesh Babu",
    route: "Route 3",
    status: "Maintenance",
  },
];

const initialRoutes: TransportRoute[] = [
  {
    id: 1,
    name: "Route 1",
    vehicle: "KA-01-AB-1234",
    stops: "Hebbal, Yelahanka, School",
    startTime: "07:00",
    endTime: "08:15",
    status: "Active",
  },
  {
    id: 2,
    name: "Route 2",
    vehicle: "KA-01-CD-5678",
    stops: "Jakkur, Sahakara Nagar, School",
    startTime: "07:10",
    endTime: "08:20",
    status: "Active",
  },
  {
    id: 3,
    name: "Route 3",
    vehicle: "KA-01-EF-9012",
    stops: "Hennur, Kalyan Nagar, School",
    startTime: "07:00",
    endTime: "08:10",
    status: "Inactive",
  },
];

const initialAllocations: Allocation[] = [
  {
    id: 1,
    student: "Aarav Sharma",
    className: "Class 8",
    route: "Route 1",
    stop: "Hebbal",
    vehicle: "KA-01-AB-1234",
  },
  {
    id: 2,
    student: "Ananya Rao",
    className: "Class 8",
    route: "Route 1",
    stop: "Yelahanka",
    vehicle: "KA-01-AB-1234",
  },
  {
    id: 3,
    student: "Rohan Kumar",
    className: "Class 9",
    route: "Route 2",
    stop: "Jakkur",
    vehicle: "KA-01-CD-5678",
  },
];

const initialStaff: TransportStaff[] = [
  {
    id: 1,
    name: "Ramesh Kumar",
    role: "Driver",
    phone: "9876543210",
    license: "DL-12345",
    status: "Active",
  },
  {
    id: 2,
    name: "Suresh Rao",
    role: "Driver",
    phone: "9876543211",
    license: "DL-12346",
    status: "Active",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Attendant",
    phone: "9876543212",
    license: "N/A",
    status: "Active",
  },
];

const initialMaintenance: Maintenance[] = [
  {
    id: 1,
    vehicle: "KA-01-AB-1234",
    service: "Oil and filter change",
    dueDate: "2026-11-10",
    cost: 3500,
    status: "Scheduled",
  },
  {
    id: 2,
    vehicle: "KA-01-CD-5678",
    service: "Brake inspection",
    dueDate: "2026-10-20",
    cost: 5000,
    status: "Overdue",
  },
  {
    id: 3,
    vehicle: "KA-01-EF-9012",
    service: "Engine servicing",
    dueDate: "2026-10-25",
    cost: 12000,
    status: "Completed",
  },
];

const tabs: { label: Tab; icon: typeof Bus }[] = [
  { label: "Vehicles", icon: Bus },
  { label: "Routes & Stops", icon: MapPin },
  { label: "Student Allocation", icon: Users },
  { label: "Drivers & Attendants", icon: Users },
  { label: "Maintenance", icon: Wrench },
];

const inputClass =
  "h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30";

const vehicleStatusStyles: Record<VehicleStatus, string> = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-muted text-muted-foreground",
  Maintenance: "bg-amber-100 text-amber-700",
};

const maintenanceStatusStyles: Record<MaintenanceStatus, string> = {
  Scheduled: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Overdue: "bg-red-100 text-red-700",
};

const staffStatusStyles: Record<RecordStatus, string> = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-muted text-muted-foreground",
};

const emptyForm: Record<string, string> = {
  number: "",
  model: "",
  capacity: "40",
  driver: "",
  route: "",
  name: "",
  vehicle: "",
  stops: "",
  startTime: "07:00",
  endTime: "08:00",
  student: "",
  className: "Class 8",
  stop: "",
  role: "Driver",
  phone: "",
  license: "",
  service: "",
  dueDate: "",
  cost: "",
  status: "Active",
};

export default function Transport() {
  const [tab, setTab] = useState<Tab>("Vehicles");
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [routes, setRoutes] =
    useState<TransportRoute[]>(initialRoutes);
  const [allocations, setAllocations] =
    useState<Allocation[]>(initialAllocations);
  const [staff, setStaff] = useState<TransportStaff[]>(initialStaff);
  const [maintenance, setMaintenance] =
    useState<Maintenance[]>(initialMaintenance);

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Record<string, string>>({
    ...emptyForm,
  });

  const vehicleOptions = useMemo(
    () => vehicles.map((vehicle) => vehicle.number),
    [vehicles]
  );

  const routeOptions = useMemo(
    () => routes.map((route) => route.name),
    [routes]
  );

  const query = search.trim().toLowerCase();

  const filteredVehicles = useMemo(
    () =>
      vehicles.filter((vehicle) =>
        `${vehicle.number} ${vehicle.model} ${vehicle.driver} ${vehicle.route} ${vehicle.status}`
          .toLowerCase()
          .includes(query)
      ),
    [vehicles, query]
  );

  const filteredRoutes = useMemo(
    () =>
      routes.filter((route) =>
        `${route.name} ${route.vehicle} ${route.stops} ${route.status}`
          .toLowerCase()
          .includes(query)
      ),
    [routes, query]
  );

  const filteredAllocations = useMemo(
    () =>
      allocations.filter((allocation) =>
        `${allocation.student} ${allocation.className} ${allocation.route} ${allocation.stop} ${allocation.vehicle}`
          .toLowerCase()
          .includes(query)
      ),
    [allocations, query]
  );

  const filteredStaff = useMemo(
    () =>
      staff.filter((member) =>
        `${member.name} ${member.role} ${member.phone} ${member.status}`
          .toLowerCase()
          .includes(query)
      ),
    [staff, query]
  );

  const filteredMaintenance = useMemo(
    () =>
      maintenance.filter((record) =>
        `${record.vehicle} ${record.service} ${record.dueDate} ${record.status}`
          .toLowerCase()
          .includes(query)
      ),
    [maintenance, query]
  );

  const activeVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Active"
  ).length;

  const activeRoutes = routes.filter(
    (route) => route.status === "Active"
  ).length;

  const overdueMaintenance = maintenance.filter(
    (record) => record.status === "Overdue"
  ).length;

  const allocatedStudents = allocations.length;

  function showMessage(text: string) {
    setMessage(text);
  }

  function switchTab(nextTab: Tab) {
    setTab(nextTab);
    setSearch("");
    setShowForm(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  }

  function openCreate() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      vehicle: vehicleOptions[0] ?? "",
      route: routeOptions[0] ?? "",
    });
    setShowForm(true);
  }

  function openEdit(
    id: number,
    record: Vehicle | TransportRoute | Allocation | TransportStaff | Maintenance
  ) {
    const values: Record<string, string> = {};

    Object.entries(record).forEach(([key, value]) => {
      if (key !== "id") {
        values[key] = String(value);
      }
    });

    setEditingId(id);
    setForm({ ...emptyForm, ...values });
    setShowForm(true);
  }

  function deleteRecord(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (!confirmed) return;

    switch (tab) {
      case "Vehicles":
        setVehicles((current) =>
          current.filter((record) => record.id !== id)
        );
        break;
      case "Routes & Stops":
        setRoutes((current) =>
          current.filter((record) => record.id !== id)
        );
        break;
      case "Student Allocation":
        setAllocations((current) =>
          current.filter((record) => record.id !== id)
        );
        break;
      case "Drivers & Attendants":
        setStaff((current) =>
          current.filter((record) => record.id !== id)
        );
        break;
      case "Maintenance":
        setMaintenance((current) =>
          current.filter((record) => record.id !== id)
        );
        break;
    }

    showMessage("Record deleted successfully.");
  }

  function saveRecord(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const id = editingId ?? Date.now();

    switch (tab) {
      case "Vehicles": {
        const record: Vehicle = {
          id,
          number: form.number.trim(),
          model: form.model.trim(),
          capacity: Number(form.capacity),
          driver: form.driver.trim(),
          route: form.route,
          status: form.status as VehicleStatus,
        };

        setVehicles((current) =>
          editingId === null
            ? [record, ...current]
            : current.map((item) => (item.id === id ? record : item))
        );
        break;
      }

      case "Routes & Stops": {
        const record: TransportRoute = {
          id,
          name: form.name.trim(),
          vehicle: form.vehicle,
          stops: form.stops.trim(),
          startTime: form.startTime,
          endTime: form.endTime,
          status: form.status as RecordStatus,
        };

        setRoutes((current) =>
          editingId === null
            ? [record, ...current]
            : current.map((item) => (item.id === id ? record : item))
        );
        break;
      }

      case "Student Allocation": {
        const record: Allocation = {
          id,
          student: form.student.trim(),
          className: form.className,
          route: form.route,
          stop: form.stop.trim(),
          vehicle: form.vehicle,
        };

        setAllocations((current) =>
          editingId === null
            ? [record, ...current]
            : current.map((item) => (item.id === id ? record : item))
        );
        break;
      }

      case "Drivers & Attendants": {
        const record: TransportStaff = {
          id,
          name: form.name.trim(),
          role: form.role as TransportStaff["role"],
          phone: form.phone.trim(),
          license: form.license.trim() || "N/A",
          status: form.status as RecordStatus,
        };

        setStaff((current) =>
          editingId === null
            ? [record, ...current]
            : current.map((item) => (item.id === id ? record : item))
        );
        break;
      }

      case "Maintenance": {
        const record: Maintenance = {
          id,
          vehicle: form.vehicle,
          service: form.service.trim(),
          dueDate: form.dueDate,
          cost: Number(form.cost),
          status: form.status as MaintenanceStatus,
        };

        setMaintenance((current) =>
          editingId === null
            ? [record, ...current]
            : current.map((item) => (item.id === id ? record : item))
        );
        break;
      }
    }

    setShowForm(false);
    setEditingId(null);
    setForm({ ...emptyForm });
    showMessage(
      editingId === null
        ? "Record added successfully."
        : "Record updated successfully."
    );
  }

  function exportCSV() {
    let rows: (string | number)[][] = [];

    switch (tab) {
      case "Vehicles":
        rows = [
          ["Registration", "Model", "Capacity", "Driver", "Route", "Status"],
          ...filteredVehicles.map((record) => [
            record.number,
            record.model,
            record.capacity,
            record.driver,
            record.route,
            record.status,
          ]),
        ];
        break;

      case "Routes & Stops":
        rows = [
          ["Route", "Vehicle", "Stops", "Start Time", "End Time", "Status"],
          ...filteredRoutes.map((record) => [
            record.name,
            record.vehicle,
            record.stops,
            record.startTime,
            record.endTime,
            record.status,
          ]),
        ];
        break;

      case "Student Allocation":
        rows = [
          ["Student", "Class", "Route", "Pickup Stop", "Vehicle"],
          ...filteredAllocations.map((record) => [
            record.student,
            record.className,
            record.route,
            record.stop,
            record.vehicle,
          ]),
        ];
        break;

      case "Drivers & Attendants":
        rows = [
          ["Name", "Role", "Phone", "License / ID", "Status"],
          ...filteredStaff.map((record) => [
            record.name,
            record.role,
            record.phone,
            record.license,
            record.status,
          ]),
        ];
        break;

      case "Maintenance":
        rows = [
          ["Vehicle", "Service", "Due Date", "Cost", "Status"],
          ...filteredMaintenance.map((record) => [
            record.vehicle,
            record.service,
            record.dueDate,
            record.cost,
            record.status,
          ]),
        ];
        break;
    }

    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;",
      })
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = `transport-${tab
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function actions(
    id: number,
    record: Vehicle | TransportRoute | Allocation | TransportStaff | Maintenance
  ) {
    return (
      <div className="flex gap-1">
        <button
          type="button"
          title="Edit"
          onClick={() => openEdit(id, record)}
          className="rounded-md border border-border p-2 hover:bg-muted"
        >
          <Pencil size={14} />
        </button>

        <button
          type="button"
          title="Delete"
          onClick={() => deleteRecord(id)}
          className="rounded-md border border-border p-2 text-red-600 hover:bg-red-50"
        >
          <Trash2 size={14} />
        </button>
      </div>
    );
  }

  function statusBadge(status: VehicleStatus | RecordStatus | MaintenanceStatus) {
    let styles = "bg-muted text-muted-foreground";

    if (status in vehicleStatusStyles) {
      styles = vehicleStatusStyles[status as VehicleStatus];
    } else if (status in maintenanceStatusStyles) {
      styles = maintenanceStatusStyles[status as MaintenanceStatus];
    } else if (status in staffStatusStyles) {
      styles = staffStatusStyles[status as RecordStatus];
    }

    return (
      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles}`}>
        {status}
      </span>
    );
  }

  function renderFormFields() {
    switch (tab) {
      case "Vehicles":
        return (
          <>
            <FormField label="Registration Number" name="number" required />
            <FormField label="Vehicle Model" name="model" required />
            <FormField label="Capacity (seats)" name="capacity" type="number" required />
            <FormField label="Driver Name" name="driver" required />
            <FormField label="Route" name="route" />
            <FormSelect label="Status" name="status" options={["Active", "Inactive", "Maintenance"]} />
          </>
        );

      case "Routes & Stops":
        return (
          <>
            <FormField label="Route Name" name="name" required />
            <FormSelect label="Vehicle" name="vehicle" options={vehicleOptions} />
            <FormField label="Stops (comma-separated)" name="stops" required />
            <FormField label="Start Time" name="startTime" type="time" required />
            <FormField label="End Time" name="endTime" type="time" required />
            <FormSelect label="Status" name="status" options={["Active", "Inactive"]} />
          </>
        );

      case "Student Allocation":
        return (
          <>
            <FormField label="Student Name" name="student" required />
            <FormSelect
              label="Class"
              name="className"
              options={Array.from({ length: 12 }, (_, index) => `Class ${index + 1}`)}
            />
            <FormSelect label="Route" name="route" options={routeOptions} />
            <FormField label="Pickup Stop" name="stop" required />
            <FormSelect label="Vehicle" name="vehicle" options={vehicleOptions} />
          </>
        );

      case "Drivers & Attendants":
        return (
          <>
            <FormField label="Full Name" name="name" required />
            <FormSelect label="Role" name="role" options={["Driver", "Attendant"]} />
            <FormField label="Phone Number" name="phone" required />
            <FormField label="License / ID" name="license" />
            <FormSelect label="Status" name="status" options={["Active", "Inactive"]} />
          </>
        );

      case "Maintenance":
        return (
          <>
            <FormSelect label="Vehicle" name="vehicle" options={vehicleOptions} />
            <FormField label="Service Description" name="service" required />
            <FormField label="Due Date" name="dueDate" type="date" required />
            <FormField label="Estimated Cost (₹)" name="cost" type="number" required />
            <FormSelect label="Status" name="status" options={["Scheduled", "Completed", "Overdue"]} />
          </>
        );
    }
  }

  function FormField({
    label,
    name,
    type = "text",
    required = false,
  }: {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
  }) {
    return (
      <label className="block text-sm font-medium text-foreground">
        <span className="mb-1 block">
          {label}{required ? " *" : ""}
        </span>
        <input
          type={type}
          required={required}
          min={type === "number" ? 0 : undefined}
          value={form[name] ?? ""}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              [name]: event.target.value,
            }))
          }
          className={inputClass}
        />
      </label>
    );
  }

  function FormSelect({
    label,
    name,
    options,
  }: {
    label: string;
    name: string;
    options: string[];
  }) {
    const availableOptions = options.length > 0 ? options : [""];

    return (
      <label className="block text-sm font-medium text-foreground">
        <span className="mb-1 block">{label}</span>
        <select
          value={form[name] ?? availableOptions[0]}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              [name]: event.target.value,
            }))
          }
          className={inputClass}
        >
          {availableOptions.map((option) => (
            <option key={option} value={option}>
              {option || "No options available"}
            </option>
          ))}
        </select>
      </label>
    );
  }

  const recordCount =
    tab === "Vehicles"
      ? filteredVehicles.length
      : tab === "Routes & Stops"
        ? filteredRoutes.length
        : tab === "Student Allocation"
          ? filteredAllocations.length
          : tab === "Drivers & Attendants"
            ? filteredStaff.length
            : filteredMaintenance.length;

  return (
    <div className="space-y-4 p-4 md:p-5">
      {/* Heading */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Transport Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage vehicles, routes, student allocations, transport staff, and maintenance.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm hover:bg-muted"
          >
            <Download size={15} />
            Export CSV
          </button>

          <button
            type="button"
            onClick={openCreate}
            className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus size={16} />
            Add Record
          </button>
        </div>
      </div>

      {message && (
        <div className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm">
          <span>{message}</span>
          <button
            type="button"
            onClick={() => setMessage("")}
            aria-label="Dismiss message"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Total Vehicles", value: vehicles.length, icon: Bus },
          { label: "Active Vehicles", value: activeVehicles, icon: CheckCircle2 },
          { label: "Active Routes", value: activeRoutes, icon: MapPin },
          { label: "Students Allocated", value: allocatedStudents, icon: Users },
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-lg border border-border bg-card p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-muted-foreground">{label}</span>
              <Icon size={17} className="text-primary" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
          </div>
        ))}
      </div>

      {overdueMaintenance > 0 && (
        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          <AlertTriangle size={17} />
          {overdueMaintenance} maintenance record(s) require attention.
          <button
            type="button"
            onClick={() => switchTab("Maintenance")}
            className="ml-auto font-medium underline"
          >
            View
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto rounded-lg border border-border bg-card p-2">
        {tabs.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => switchTab(label)}
            className={`inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
              tab === label
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-3">
        <div className="relative min-w-[200px] flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={`Search ${tab.toLowerCase()}...`}
            className={`${inputClass} pl-9`}
          />
        </div>

        <span className="text-xs text-muted-foreground">
          {recordCount} record{recordCount === 1 ? "" : "s"}
        </span>
      </div>

      {/* Data table */}
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-muted/50 text-xs text-muted-foreground">
              {tab === "Vehicles" && (
                <tr>
                  <th className="px-4 py-3 font-medium">Registration / Model</th>
                  <th className="px-4 py-3 font-medium">Capacity</th>
                  <th className="px-4 py-3 font-medium">Driver</th>
                  <th className="px-4 py-3 font-medium">Route</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              )}

              {tab === "Routes & Stops" && (
                <tr>
                  <th className="px-4 py-3 font-medium">Route</th>
                  <th className="px-4 py-3 font-medium">Vehicle</th>
                  <th className="px-4 py-3 font-medium">Stops</th>
                  <th className="px-4 py-3 font-medium">Schedule</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              )}

              {tab === "Student Allocation" && (
                <tr>
                  <th className="px-4 py-3 font-medium">Student</th>
                  <th className="px-4 py-3 font-medium">Class</th>
                  <th className="px-4 py-3 font-medium">Route</th>
                  <th className="px-4 py-3 font-medium">Pickup Stop</th>
                  <th className="px-4 py-3 font-medium">Vehicle</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              )}

              {tab === "Drivers & Attendants" && (
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">License / ID</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              )}

              {tab === "Maintenance" && (
                <tr>
                  <th className="px-4 py-3 font-medium">Vehicle</th>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Due Date</th>
                  <th className="px-4 py-3 font-medium">Cost</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              )}
            </thead>

            <tbody className="divide-y divide-border">
              {tab === "Vehicles" &&
                filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{vehicle.number}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{vehicle.model}</p>
                    </td>
                    <td className="px-4 py-3">{vehicle.capacity} seats</td>
                    <td className="px-4 py-3">{vehicle.driver}</td>
                    <td className="px-4 py-3">{vehicle.route || "—"}</td>
                    <td className="px-4 py-3">{statusBadge(vehicle.status)}</td>
                    <td className="px-4 py-3">{actions(vehicle.id, vehicle)}</td>
                  </tr>
                ))}

              {tab === "Routes & Stops" &&
                filteredRoutes.map((route) => (
                  <tr key={route.id} className="hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium">{route.name}</td>
                    <td className="px-4 py-3">{route.vehicle || "—"}</td>
                    <td className="max-w-[230px] px-4 py-3 text-muted-foreground">{route.stops}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1">
                        <Clock size={13} />
                        {route.startTime} – {route.endTime}
                      </span>
                    </td>
                    <td className="px-4 py-3">{statusBadge(route.status)}</td>
                    <td className="px-4 py-3">{actions(route.id, route)}</td>
                  </tr>
                ))}

              {tab === "Student Allocation" &&
                filteredAllocations.map((allocation) => (
                  <tr key={allocation.id} className="hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium">{allocation.student}</td>
                    <td className="px-4 py-3">{allocation.className}</td>
                    <td className="px-4 py-3">{allocation.route}</td>
                    <td className="px-4 py-3">{allocation.stop}</td>
                    <td className="px-4 py-3">{allocation.vehicle}</td>
                    <td className="px-4 py-3">{actions(allocation.id, allocation)}</td>
                  </tr>
                ))}

              {tab === "Drivers & Attendants" &&
                filteredStaff.map((member) => (
                  <tr key={member.id} className="hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium">{member.name}</td>
                    <td className="px-4 py-3">{member.role}</td>
                    <td className="px-4 py-3">{member.phone}</td>
                    <td className="px-4 py-3">{member.license}</td>
                    <td className="px-4 py-3">{statusBadge(member.status)}</td>
                    <td className="px-4 py-3">{actions(member.id, member)}</td>
                  </tr>
                ))}

              {tab === "Maintenance" &&
                filteredMaintenance.map((record) => (
                  <tr key={record.id} className="hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium">{record.vehicle}</td>
                    <td className="px-4 py-3">{record.service}</td>
                    <td className="px-4 py-3">{record.dueDate}</td>
                    <td className="px-4 py-3">
                      ₹{record.cost.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3">{statusBadge(record.status)}</td>
                    <td className="px-4 py-3">{actions(record.id, record)}</td>
                  </tr>
                ))}

              {recordCount === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-muted-foreground"
                  >
                    No records found. Try changing your search or add a record.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / edit form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <form
            onSubmit={saveRecord}
            className="my-auto w-full max-w-lg rounded-lg border border-border bg-card p-5 shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-foreground">
                  {editingId === null ? "Add" : "Edit"}{" "}
                  {tab === "Routes & Stops"
                    ? "Route"
                    : tab === "Student Allocation"
                      ? "Student Allocation"
                      : tab === "Drivers & Attendants"
                        ? "Transport Staff"
                        : tab === "Maintenance"
                          ? "Maintenance Record"
                          : "Vehicle"}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Enter the details below.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                aria-label="Close form"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {renderFormFields()}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="h-9 rounded-md border border-border px-3 text-sm hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Save Record
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
