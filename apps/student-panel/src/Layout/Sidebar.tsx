import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  ListChecks,
  CalendarDays,
  ClipboardCheck,
  Settings,
  LogOut,
} from "lucide-react"

import { useLocation, useNavigate } from "react-router-dom"

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navigation = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "My Classes", path: "/classes", icon: BookOpen },
  { label: "Attendance", path: "/attendance", icon: CalendarCheck },
  { label: "Assignments", path: "/assignments", icon: ClipboardList },
  { label: "Exams & Results", path: "/results", icon: GraduationCap },
  { label: "Quiz", path: "/quiz", icon: ListChecks },
  { label: "Study Materials", path: "/materials", icon: BookOpen },
  { label: "Events & Calendar", path: "/events", icon: CalendarDays },
  { label: "Leave Requests", path: "/leave-requests", icon: ClipboardCheck },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <ShadcnSidebar collapsible="icon">
      {/* Logo */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="Vidyahub"
              onClick={() => navigate("/dashboard")}
            >
              <GraduationCap className="size-6" />
              <span className="font-bold">Vidyahub</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main menu</SidebarGroupLabel>

          <SidebarMenu>
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    tooltip={item.label}
                    onClick={() => navigate(item.path)}
                    className={
                      isActive
                        ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                        : ""
                    }
                  >
                    <Icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer navigation */}
      <SidebarFooter>
        <SidebarMenu>
          {/* Settings */}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Settings"
              onClick={() => navigate("/settings")}
              className={
                location.pathname === "/settings"
                  ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                  : ""
              }
            >
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Logout */}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              onClick={() => navigate("/auth/login")}
            >
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadcnSidebar>
  )
}
