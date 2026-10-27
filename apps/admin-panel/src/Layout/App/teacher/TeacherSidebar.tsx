import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  BookOpen,
  Calendar,
  User,
  LogOut,
  GraduationCap,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/teacher/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    url: "/teacher/profile",
    icon: User,
  },
  {
    title: "Students",
    url: "/teacher/students",
    icon: Users,
  },
  {
    title: "Attendance",
    url: "/teacher/attendance",
    icon: ClipboardCheck,
  },
  {
    title: "Assignments",
    url: "/teacher/assignments",
    icon: BookOpen,
  },
  {
    title: "Timetable",
    url: "/teacher/timetable",
    icon: Calendar,
  },
];

export default function TeacherSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className=" px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-sky-600 p-2 text-white">
            <GraduationCap className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-lg font-bold">Vidyahub</h2>
            <p className="text-xs text-muted-foreground">
              Teacher Portal
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 mx-2 transition ${
                    isActive
                      ? "bg-sky-600 text-white"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className=" p-4">
        <NavLink
          to="/auth/login"
          className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </NavLink>
      </SidebarFooter>
    </Sidebar>
  );
}