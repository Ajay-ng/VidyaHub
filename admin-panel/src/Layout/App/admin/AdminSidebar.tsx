
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  LayoutDashboard,
  GraduationCap,
  Users,
  UserRound,
  School,
  CalendarCheck,
  ClipboardList,
  FileText,
  Wallet,
  Bus,
  Library,
  Bell,
  MessageSquare,
  ShieldCheck,
  CalendarDays,
  BriefcaseBusiness,
  CreditCard,
  LogOut,
} from "lucide-react"

import type { LucideIcon } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"

import packageJson from "../../../../package.json"

interface DAS {
  title: string
  url: string
  icon: LucideIcon
}

interface DASHBOARDPROPS {
  group: string
  items: DAS[]
}

function AdminSidebar() {
  const navigate = useNavigate()

  const adminSidebarOptions: DASHBOARDPROPS[] = [
    {
      group: "Overview",
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      group: "Academic Management",
      items: [
        {
          title: "Students",
          url: "/admin/student-management",
          icon: GraduationCap,
        },
        {
          title: "Teachers",
          url: "/admin/teachers",
          icon: Users,
        },
        {
          title: "Classes",
          url: "/admin/classes",
          icon: School,
        },
        {
          title: "Timetable",
          url: "/admin/timetable",
          icon: CalendarDays,
        },
        {
          title: "Examinations",
          url: "/admin/examinations",
          icon: ClipboardList,
        },
        {
          title: "Results & Grades",
          url: "/admin/results",
          icon: FileText,
        },
        {
          title: "Library",
          url: "/admin/library",
          icon: Library,
        },
      ],
    },
    {
      group: "People Management",
      items: [
        {
          title: "Parents & Guardians",
          url: "/admin/parents",
          icon: UserRound,
        },
        {
          title: "Staff",
          url: "/admin/staff",
          icon: BriefcaseBusiness,
        },
      ],
    },
    {
      group: "Attendance & Activities",
      items: [
        {
          title: "Attendance",
          url: "/admin/attendance",
          icon: CalendarCheck,
        },
        {
          title: "Assignments",
          url: "/admin/assignments",
          icon: ClipboardList,
        },
        {
          title: "Transport",
          url: "/admin/transport",
          icon: Bus,
        },
      ],
    },
    {
      group: "Finance",
      items: [
        {
          title: "Fee Management",
          url: "/admin/fees",
          icon: Wallet,
        },
        {
          title: "Payments",
          url: "/admin/payments",
          icon: CreditCard,
        },
      ],
    },
    {
      group: "Communication",
      items: [
        {
          title: "Announcements",
          url: "/admin/announcements",
          icon: Bell,
        },
        {
          title: "Messages",
          url: "/admin/messages",
          icon: MessageSquare,
        },
      ],
    },
    {
      group: "Administration",
      items: [
        {
          title: "User Management",
          url: "/admin/users",
          icon: Users,
        },
        {
          title: "Roles & Permissions",
          url: "/admin/roles",
          icon: ShieldCheck,
        },
      ],
    },
  ]

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")

    navigate("/auth/login", { replace: true })
  }

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="flex items-center justify-center p-4 shadow-sm">
        <p className="font-semibold">Admin Console</p>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        {adminSidebarOptions.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel>
              {group.group}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon

                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        asChild
                        className="cursor-pointer"
                      >
                        <NavLink
                          to={item.url}
                          end
                          className={({ isActive }) =>
                            `flex w-full flex-row items-center gap-2 px-4 py-2 ${
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted"
                            }`
                          }
                        >
                          <Icon />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="mt-auto border-t px-4 py-3 space-y-3">

        {/* Application Version */}
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-xs text-muted-foreground">
            School Management
          </span>

          <span className="shrink-0 text-xs text-muted-foreground">
            v{packageJson.version}
          </span>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>

      </SidebarFooter>
    </Sidebar>
  )
}

export default AdminSidebar
