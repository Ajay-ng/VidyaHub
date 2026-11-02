import { useLocation, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  ListChecks,
  CalendarDays,
  ClipboardCheck,
  LogOut,
} from "lucide-react"

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
  {
    label: "Leave Requests",
    path: "/leave-requests",
    icon: ClipboardCheck,
  },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  function handleLogout() {
    localStorage.removeItem("isLoggedIn")
    navigate("/login", { replace: true })
  }

  const activeClass =
    "bg-blue-600 font-medium text-white hover:bg-blue-700 hover:text-white"

  const inactiveClass =
    "text-foreground hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950 dark:hover:text-blue-300"

  return (
    <ShadcnSidebar collapsible="icon" className="pb-12">
      {/* Sidebar header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="Vidyahub"
              onClick={() => navigate("/dashboard")}
              className={
                location.pathname === "/dashboard" ? activeClass : inactiveClass
              }
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
                    className={isActive ? activeClass : inactiveClass}
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
          {/* <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Settings"
              onClick={() => navigate("/settings")}
              className={
                location.pathname === "/settings"
                  ? activeClass
                  : inactiveClass
              }
            >
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem> */}

          {/* Logout */}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              onClick={handleLogout}
              className={inactiveClass}
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
