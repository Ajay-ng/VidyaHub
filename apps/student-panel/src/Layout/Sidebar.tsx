
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
} from "lucide-react";

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
} from "@/components/ui/sidebar";


const navigation = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "My Classes", icon: BookOpen },
  { label: "Attendance", icon: CalendarCheck },
  { label: "Assignments", icon: ClipboardList },
  { label: "Exams & Results", icon: GraduationCap },
  { label: "Quiz", icon: ListChecks },
  { label: "Study Materials", icon: BookOpen },
  { label: "Events & Calendar", icon: CalendarDays },
  { label: "Leave Requests", icon: ClipboardCheck },
];

export default function Sidebar() {
  return (
    <ShadcnSidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="Vidyahub">
              <GraduationCap className="size-6" />
              <span className="font-bold">Vidyahub</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main menu</SidebarGroupLabel>

          <SidebarMenu>
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton tooltip={item.label}>
                    <Icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Logout">
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
